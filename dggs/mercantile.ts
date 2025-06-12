/**
 * Mercantile implementation in TypeScript
 * Provides functions for working with web mercator tiles
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
export function tile(lng: number, lat: number, zoom: number): Tile {
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
export function bounds(x: number, y: number, z: number): Bounds {
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
export function quadkey(tile: Tile): string {
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
export function quadkeyToTile(quadkey: string): Tile {
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
 * Get the parent tile of a tile
 * @param tile Tile object
 * @returns Parent tile
 */
export function parent(tile: Tile): Tile {
    if (tile.z === 0) {
        throw new Error('Cannot get parent of zoom level 0');
    }
    return {
        x: Math.floor(tile.x / 2),
        y: Math.floor(tile.y / 2),
        z: tile.z - 1
    };
}

/**
 * Get the children tiles of a tile
 * @param tile Tile object
 * @returns Array of child tiles
 */
export function children(tile: Tile): Tile[] {
    const z = tile.z + 1;
    const x = tile.x * 2;
    const y = tile.y * 2;
    return [
        { x, y, z },
        { x: x + 1, y, z },
        { x, y: y + 1, z },
        { x: x + 1, y: y + 1, z }
    ];
}

/**
 * Get the sibling tiles of a tile
 * @param tile Tile object
 * @returns Array of sibling tiles
 */
export function siblings(tile: Tile): Tile[] {
    const parentTile = parent(tile);
    return children(parentTile).filter(t => 
        t.x !== tile.x || t.y !== tile.y || t.z !== tile.z
    );
}

/**
 * Get the tile coordinates for a point in web mercator coordinates
 * @param x Web mercator X coordinate
 * @param y Web mercator Y coordinate
 * @param zoom Zoom level
 * @returns Tile coordinates
 */
export function xyTile(x: number, y: number, zoom: number): Tile {
    const n = Math.pow(2, zoom);
    const xtile = Math.floor((x + 1) / 2 * n);
    const ytile = Math.floor((1 - (y + 1) / 2) * n);
    return { x: xtile, y: ytile, z: zoom };
}

/**
 * Convert tile coordinates to web mercator coordinates
 * @param tile Tile object
 * @returns Web mercator coordinates [x, y]
 */
export function tileToXY(tile: Tile): [number, number] {
    const n = Math.pow(2, tile.z);
    const x = (tile.x / n) * 2 - 1;
    const y = 1 - (tile.y / n) * 2;
    return [x, y];
}

/**
 * Convert longitude/latitude to web mercator coordinates
 * @param lng Longitude in degrees
 * @param lat Latitude in degrees
 * @returns Web mercator coordinates [x, y]
 */
export function lngLatToXY(lng: number, lat: number): [number, number] {
    const x = lng / 180;
    const y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / Math.PI;
    return [x, y];
}

/**
 * Convert web mercator coordinates to longitude/latitude
 * @param x Web mercator X coordinate
 * @param y Web mercator Y coordinate
 * @returns Longitude/latitude coordinates [lng, lat]
 */
export function xyToLngLat(x: number, y: number): [number, number] {
    const lng = x * 180;
    const lat = 90 - 360 * Math.atan(Math.exp(-y * Math.PI)) / Math.PI;
    return [lng, lat];
} 