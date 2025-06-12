/**
 * Tilecode implementation in TypeScript
 * Based on the original Python implementation
 * Includes merged mercantile functionality for tile calculations
 */

export interface Tile {
    x: number;
    y: number;
    z: number;
}

export interface Bounds {
    west: number;
    south: number;
    east: number;
    north: number;
}

const MAX_ZOOM = 32;
const MIN_ZOOM = 0;

/**
 * Convert longitude/latitude to tile coordinates
 * @param lng Longitude in degrees
 * @param lat Latitude in degrees
 * @param zoom Zoom level
 * @returns Tile coordinates
 */
function tile(lng: number, lat: number, zoom: number): Tile {
    if (zoom < MIN_ZOOM || zoom > MAX_ZOOM) {
        throw new Error(`Invalid zoom level: ${zoom}`);
    }

    if (lng < -180 || lng > 180) {
        throw new Error(`Invalid longitude: ${lng}`);
    }

    if (lat < -90 || lat > 90) {
        throw new Error(`Invalid latitude: ${lat}`);
    }

    const n = Math.pow(2, zoom);
    const xtile = Math.floor((lng + 180) / 360 * n);
    const ytile = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);

    return { x: xtile, y: ytile, z: zoom };
}

/**
 * Convert tile coordinates to longitude/latitude bounds
 * @param x Tile X coordinate
 * @param y Tile Y coordinate
 * @param z Zoom level
 * @returns Bounds object with west, south, east, north in degrees
 */
function bounds(x: number, y: number, z: number): Bounds {
    if (z < MIN_ZOOM || z > MAX_ZOOM) {
        throw new Error(`Invalid zoom level: ${z}`);
    }

    const n = Math.pow(2, z);
    const west = x / n * 360 - 180;
    const east = (x + 1) / n * 360 - 180;
    const north = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
    const south = Math.atan(Math.sinh(Math.PI * (1 - 2 * (y + 1) / n))) * 180 / Math.PI;

    return { west, south, east, north };
}

/**
 * Convert tile coordinates to quadkey
 * @param tile Tile object
 * @returns Quadkey string
 */
function quadkey(tile: Tile): string {
    let quadkey = '';
    for (let i = tile.z; i > 0; i--) {
        let digit = 0;
        const mask = 1 << (i - 1);
        if ((tile.x & mask) !== 0) digit += 1;
        if ((tile.y & mask) !== 0) digit += 2;
        quadkey += digit.toString();
    }
    return quadkey;
}

/**
 * Convert quadkey to tile coordinates
 * @param quadkey Quadkey string
 * @returns Tile object
 */
function quadkeyToTile(quadkey: string): Tile {
    let x = 0;
    let y = 0;
    const z = quadkey.length;

    for (let i = z; i > 0; i--) {
        const mask = 1 << (i - 1);
        const digit = parseInt(quadkey[z - i]);
        if (digit & 1) x |= mask;
        if (digit & 2) y |= mask;
    }

    return { x, y, z };
}

/**
 * Convert latitude/longitude to tilecode
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @param zoom Zoom level
 * @returns Tilecode string in format 'zXxYyZ'
 */
export function latlon2tilecode(lat: number, lon: number, zoom: number): string {
    const t = tile(lon, lat, zoom);
    return `z${t.z}x${t.x}y${t.y}`;
}

/**
 * Convert latitude/longitude to quadkey
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @param zoom Zoom level
 * @returns Quadkey string
 */
export function latlon2quadkey(lat: number, lon: number, zoom: number): string {
    const t = tile(lon, lat, zoom);
    return quadkey(t);
}

/**
 * Convert quadkey to latitude/longitude
 * @param quadkey_id Quadkey string
 * @returns [latitude, longitude] in degrees
 */
export function quadkey2latlon(quadkey_id: string): [number, number] {
    const t = quadkeyToTile(quadkey_id);
    const b = bounds(t.x, t.y, t.z);
    const center_lat = (b.south + b.north) / 2;
    const center_lon = (b.west + b.east) / 2;
    return [center_lat, center_lon];
}

/**
 * Convert tilecode to latitude/longitude
 * @param tilecode_id Tilecode string in format 'zXxYyZ'
 * @returns [latitude, longitude] in degrees
 */
export function tilecode2latlon(tilecode_id: string): [number, number] {
    const match = tilecode_id.match(/z(\d+)x(\d+)y(\d+)/);
    if (!match) throw new Error("Invalid tilecode format. Expected format: 'zXxYyZ'");
    const z = parseInt(match[1]);
    const x = parseInt(match[2]);
    const y = parseInt(match[3]);
    const b = bounds(x, y, z);
    const center_lat = (b.south + b.north) / 2;
    const center_lon = (b.west + b.east) / 2;
    return [center_lat, center_lon];
}

/**
 * Convert tilecode to quadkey
 * @param tilecode_id Tilecode string in format 'zXxYyZ'
 * @returns Quadkey string
 */
export function tilecode2quadkey(tilecode_id: string): string {
    const match = tilecode_id.match(/z(\d+)x(\d+)y(\d+)/);
    if (!match) throw new Error("Invalid tilecode format. Expected format: 'zXxYyZ'");
    const z = parseInt(match[1]);
    const x = parseInt(match[2]);
    const y = parseInt(match[3]);
    return quadkey({ x, y, z });
}

/**
 * Convert quadkey to tilecode
 * @param quadkey_id Quadkey string
 * @returns Tilecode string in format 'zXxYyZ'
 */
export function quadkey2tilecode(quadkey_id: string): string {
    const t = quadkeyToTile(quadkey_id);
    return `z${t.z}x${t.x}y${t.y}`;
}

/**
 * Calculate the length of a tile's edge in meters
 * @param tilecode_id Tilecode string in format 'zXxYyZ'
 * @returns Edge length in meters
 */
export function tilecodeCellLength(tilecode_id: string): number {
    const match = tilecode_id.match(/z(\d+)x(\d+)y(\d+)/);
    if (!match) throw new Error("Invalid tilecode format. Expected format: 'zXxYyZ'");
    const z = parseInt(match[1]);
    const x = parseInt(match[2]);
    const y = parseInt(match[3]);
    const b = bounds(x, y, z);
    
    // Calculate the length of the edge in meters at the equator
    const earthCircumference = 40075016.686; // Earth's circumference in meters
    const tileSize = earthCircumference / Math.pow(2, z);
    
    // Adjust for latitude
    const lat = (b.south + b.north) / 2;
    const adjustedTileSize = tileSize * Math.cos(lat * Math.PI / 180);
    
    return adjustedTileSize;
}

/**
 * Convert tilecode to WKT polygon
 * @param tilecode_id Tilecode string in format 'zXxYyZ'
 * @returns WKT polygon string
 */
export function tilecode2wktbound(tilecode_id: string): string {
    const match = tilecode_id.match(/z(\d+)x(\d+)y(\d+)/);
    if (!match) throw new Error("Invalid tilecode format. Expected format: 'zXxYyZ'");
    const z = parseInt(match[1]);
    const x = parseInt(match[2]);
    const y = parseInt(match[3]);
    const b = bounds(x, y, z);
    return `POLYGON((${b.west} ${b.south}, ${b.west} ${b.north}, ${b.east} ${b.north}, ${b.east} ${b.south}, ${b.west} ${b.south}))`;
} 