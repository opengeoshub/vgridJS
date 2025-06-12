/**
 * GEOREF implementation in TypeScript
 * Adapted from GeographicLib's GEOREF code
 * Original C++ version by Charles Karney (2015-2020) <charles@karney.com>
 * Licensed under the MIT/X11 License
 */

const digits = "0123456789";
const lontile = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const lattile = "ABCDEFGHJKLMM"; // Repeat the last M for 90 degrees which rounds up - Prevents extra checks in the code
const degrees = "ABCDEFGHJKLMNPQ";
const tile = 15;
const lonorig = -180;
const latorig = -90;
const base = 10;
const baselen = 4;
const maxprec = 11;
const maxlen = baselen + 2 * maxprec;

export class GeorefException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GeorefException';
    }
}

function findFirstNotOf(s: string, sSet: string): number {
    for (let i = 0; i < s.length; i++) {
        if (!sSet.includes(s[i])) {
            return i;
        }
    }
    return -1;
}

function lookup(s: string, c: string): number {
    const r = s.indexOf(c);
    return r < 0 ? -1 : r;
}

export function encode(lat: number, lon: number, prec: number): string {
    if (lat > 90 || lat < -90) {
        throw new GeorefException('Latitude not in -90 to 90 range');
    }
    if (lon < -180 || lon > 360) {
        throw new GeorefException('Longitude is out of range');
    }
    if (lon >= 180) { // make longitude in the range -180, 180
        lon = lon - 360;
    }

    if (lat === 90) {
        lat = lat - Number.EPSILON;
    }
    prec = Math.max(-1, Math.min(Math.floor(maxprec), prec));

    if (prec === 1) {
        prec = prec + 1;  // Disallow prec = 1
    }
    const m = 60000000000;
    const x = Math.floor(lon * m) - lonorig * m;
    const y = Math.floor(lat * m) - latorig * m;
    const ilon = Math.floor(x / m);
    const ilat = Math.floor(y / m);
    const georef1: string[] = new Array(maxlen).fill("");
    georef1[0] = lontile[Math.floor(ilon / tile)];
    georef1[1] = lattile[Math.floor(ilat / tile)];
    if (prec >= 0) {
        georef1[2] = degrees[ilon % tile];
        georef1[3] = degrees[ilat % tile];
        if (prec > 0) {
            let x1 = Math.floor(x - m * ilon);
            let y1 = Math.floor(y - m * ilat);
            const d = Math.pow(base, maxprec - prec);
            x1 = Math.floor(x1 / d);
            y1 = Math.floor(y1 / d);
            let c = prec;
            while (c) {
                georef1[baselen + c] = digits[x1 % base];
                x1 = Math.floor(x1 / base);
                georef1[baselen + c + prec] = digits[y1 % base];
                y1 = Math.floor(y1 / base);
                c = c - 1;
            }
        }
    }
    return georef1.join('');
}

export function decode(georef: string, centerp: boolean = false): [number, number, number] {
    if (!georef) {
        throw new GeorefException('Invalid Georef string: None');
    }
    georef = georef.toUpperCase();
    const leng = georef.length;
    if (leng >= 3 && georef[0] === 'I' && georef[1] === 'N' && georef[2] === 'V') {
        throw new GeorefException('Invalid Georef string');
    }
    if (leng < baselen - 2) {
        throw new GeorefException(`Georef must start with at least 2 letters: ${georef}`);
    }
    const prec1 = Math.floor((2 + leng - baselen) / 2 - 1);
    let k = lookup(lontile, georef[0]);
    if (k < 0) {
        throw new GeorefException(`Bad longitude tile letter in georef: ${georef}`);
    }
    let lon1 = k + lonorig / tile;
    k = lookup(lattile, georef[1]);
    if (k < 0) {
        throw new GeorefException(`Bad latitude tile letter in georef: ${georef}`);
    }
    let lat1 = k + latorig / tile;
    let unit = 1;
    if (leng > 2) {
        unit = unit * tile;
        k = lookup(degrees, georef[2]);
        if (k < 0) {
            throw new GeorefException(`Bad longitude degree letter in georef: ${georef}`);
        }
        lon1 = lon1 * tile + k;
        if (leng < 4) {
            throw new GeorefException(`Missing latitude degree letter in georef: ${georef}`);
        }
        k = lookup(degrees, georef[3]);
        if (k < 0) {
            throw new GeorefException(`Bad latitude degree letter in georef: ${georef}`);
        }
        lat1 = lat1 * tile + k;
        if (prec1 > 0) {
            if (findFirstNotOf(georef.slice(baselen), digits) !== -1) {
                throw new GeorefException(`Non digits in trailing portion of georef: ${georef.slice(baselen)}`);
            }
            if (leng % 2) {
                throw new GeorefException(`Georef must end with an even number of digits: ${georef.slice(baselen)}`);
            }
            if (prec1 === 1) {
                throw new GeorefException(`Georef needs at least 4 digits for minutes: ${georef.slice(baselen)}`);
            }
            if (prec1 > maxprec) {
                throw new GeorefException(`More than ${2 * maxprec} digits in georef: ${georef.slice(baselen)}`);
            }
            let i = 0;
            while (i < prec1) {
                const m = i ? base : 6;
                unit = unit * m;
                const x = lookup(digits, georef[baselen + i]);
                const y = lookup(digits, georef[baselen + i + prec1]);
                if (!(i || (x < m && y < m))) {
                    throw new GeorefException(`Minutes terms in georef must be less than 60: ${georef.slice(baselen)}`);
                }
                lon1 = m * lon1 + x;
                lat1 = m * lat1 + y;
                i = i + 1;
            }
        }
    }
    if (centerp) {
        unit = unit * 2;
        lat1 = 2 * lat1 + 1;
        lon1 = 2 * lon1 + 1;
    }
    const lat = (tile * lat1) / unit;
    const lon = (tile * lon1) / unit;
    const prec = prec1;
    return [lat, lon, prec];
}

// Vgrid specific functions
export function georefCell(georefId: string): [number, number, number, number, number, number, number] {
    // Decode the GEOREF code to get the center coordinates and resolution
    const [centerLat, centerLon, resolution] = decode(georefId, true); // true for center point, not bottom-left
    let gridSize: number;
    
    switch (resolution) {
        case 0:
            gridSize = 15;
            break;
        case 1:
            gridSize = 1;
            break;
        case 2:
            gridSize = 1/60;
            break;
        case 3:
            gridSize = 1/600;
            break;
        case 4:
            gridSize = 1/6000;
            break;
        case 5:
            gridSize = 1/60000;
            break;
        default:
            throw new GeorefException(`Invalid resolution: ${resolution}`);
    }

    const minLon = Math.floor(centerLon / gridSize) * gridSize;
    const maxLon = minLon + gridSize;
    const minLat = Math.floor(centerLat / gridSize) * gridSize;
    const maxLat = minLat + gridSize;

    return [centerLat, centerLon, minLat, minLon, maxLat, maxLon, resolution];
} 