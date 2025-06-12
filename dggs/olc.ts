/**
 * OLC (Open Location Code / Plus Codes) implementation in TypeScript
 * Based on the original Python implementation
 */

// You may want to use an existing OLC library for encode/decode, but here is a basic structure:

export class OlcException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'OlcException';
    }
}

// Placeholder for a real OLC decode function
export function decode(olc: string): {
    latitudeLo: number,
    latitudeHi: number,
    longitudeLo: number,
    longitudeHi: number,
    latitudeCenter: number,
    longitudeCenter: number,
    codeLength: number
} {
    // TODO: Implement or use a library for OLC decode
    throw new OlcException('OLC decode not implemented. Use a library or implement this function.');
}

/**
 * Vgrid specific function to get the center lat/lon from an OLC code
 * @param olc_id OLC code
 * @returns [center_lat, center_lng]
 */
export function olcToLatLon(olc_id: string): [number, number] {
    const codeArea = decode(olc_id);
    const center_lat = (codeArea.latitudeLo + codeArea.latitudeHi) / 2;
    const center_lng = (codeArea.longitudeLo + codeArea.longitudeHi) / 2;
    return [center_lat, center_lng];
} 