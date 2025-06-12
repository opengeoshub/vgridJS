/**
 * Maidenhead grid system implementation in TypeScript
 * Converts between latitude/longitude and Maidenhead grid locators
 */

const MAIDENHEAD_FIELD = 'ABCDEFGHIJKLMNOPQRSTUVWX';
const MAIDENHEAD_SQUARE = '0123456789ABCDEFGHIJKLMNOPQRSTUVWX';
const MAIDENHEAD_SUBSQUARE = 'abcdefghijklmnopqrstuvwx';

export class MaidenheadException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MaidenheadException';
    }
}

/**
 * Converts latitude and longitude to a Maidenhead grid locator
 * @param lat Latitude in degrees (-90 to 90)
 * @param lon Longitude in degrees (-180 to 180)
 * @param precision Precision level (1-3)
 * @returns Maidenhead grid locator string
 */
export function encode(lat: number, lon: number, precision: number = 2): string {
    if (lat < -90 || lat > 90) {
        throw new MaidenheadException('Latitude must be between -90 and 90 degrees');
    }
    if (lon < -180 || lon > 180) {
        throw new MaidenheadException('Longitude must be between -180 and 180 degrees');
    }
    if (precision < 1 || precision > 3) {
        throw new MaidenheadException('Precision must be between 1 and 3');
    }

    // Normalize coordinates
    lon = (lon + 180) % 360;
    lat = (lat + 90) % 180;

    let locator = '';

    // Field (first two characters)
    const fieldLon = Math.floor(lon / 20);
    const fieldLat = Math.floor(lat / 10);
    locator += MAIDENHEAD_FIELD[fieldLon];
    locator += MAIDENHEAD_FIELD[fieldLat];

    if (precision >= 2) {
        // Square (next two characters)
        const squareLon = Math.floor((lon % 20) / 2);
        const squareLat = Math.floor((lat % 10) / 1);
        locator += MAIDENHEAD_SQUARE[squareLon];
        locator += MAIDENHEAD_SQUARE[squareLat];

        if (precision >= 3) {
            // Subsquare (next two characters)
            const subsquareLon = Math.floor((lon % 2) * 12);
            const subsquareLat = Math.floor((lat % 1) * 24);
            locator += MAIDENHEAD_SUBSQUARE[subsquareLon];
            locator += MAIDENHEAD_SUBSQUARE[subsquareLat];
        }
    }

    return locator;
}

/**
 * Converts a Maidenhead grid locator to latitude and longitude
 * @param locator Maidenhead grid locator string
 * @returns [latitude, longitude] in degrees
 */
export function decode(locator: string): [number, number] {
    if (!locator) {
        throw new MaidenheadException('Empty locator string');
    }

    locator = locator.toUpperCase();
    const len = locator.length;

    if (len < 2 || len > 6 || len % 2 !== 0) {
        throw new MaidenheadException('Invalid locator length');
    }

    // Field
    const fieldLon = MAIDENHEAD_FIELD.indexOf(locator[0]);
    const fieldLat = MAIDENHEAD_FIELD.indexOf(locator[1]);

    if (fieldLon === -1 || fieldLat === -1) {
        throw new MaidenheadException('Invalid field characters');
    }

    let lon = fieldLon * 20 - 180;
    let lat = fieldLat * 10 - 90;

    if (len >= 4) {
        // Square
        const squareLon = MAIDENHEAD_SQUARE.indexOf(locator[2]);
        const squareLat = MAIDENHEAD_SQUARE.indexOf(locator[3]);

        if (squareLon === -1 || squareLat === -1) {
            throw new MaidenheadException('Invalid square characters');
        }

        lon += squareLon * 2;
        lat += squareLat * 1;

        if (len >= 6) {
            // Subsquare
            const subsquareLon = MAIDENHEAD_SUBSQUARE.indexOf(locator[4].toLowerCase());
            const subsquareLat = MAIDENHEAD_SUBSQUARE.indexOf(locator[5].toLowerCase());

            if (subsquareLon === -1 || subsquareLat === -1) {
                throw new MaidenheadException('Invalid subsquare characters');
            }

            lon += subsquareLon / 12;
            lat += subsquareLat / 24;
        }
    }

    return [lat, lon];
}

/**
 * Vgrid specific function to get cell boundaries
 * @param maidenheadId Maidenhead grid locator
 * @returns [centerLat, centerLon, minLat, minLon, maxLat, maxLon, precision]
 */
export function maidenheadCell(maidenheadId: string): [number, number, number, number, number, number, number] {
    const [centerLat, centerLon] = decode(maidenheadId);
    const precision = Math.floor(maidenheadId.length / 2);
    
    let gridSize: number;
    switch (precision) {
        case 1:
            gridSize = 10; // Field size
            break;
        case 2:
            gridSize = 1;  // Square size
            break;
        case 3:
            gridSize = 1/24; // Subsquare size
            break;
        default:
            throw new MaidenheadException(`Invalid precision: ${precision}`);
    }

    const minLon = Math.floor(centerLon / gridSize) * gridSize;
    const maxLon = minLon + gridSize;
    const minLat = Math.floor(centerLat / gridSize) * gridSize;
    const maxLat = minLat + gridSize;

    return [centerLat, centerLon, minLat, minLon, maxLat, maxLon, precision];
} 