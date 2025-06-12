import { describe, it, expect } from 'vitest'
import {
    latlon2tilecode,
    latlon2quadkey,
    quadkey2latlon,
    tilecode2latlon,
    tilecode2quadkey,
    quadkey2tilecode,
    tilecodeCellLength,
    tilecode2wktbound
} from 'dggs/tilecode'

describe('Tilecode Functions', () => {
    // Test coordinates for New York City
    const NYC_LAT = 40.7128
    const NYC_LON = -74.0060
    const NYC_ZOOM = 12
    const NYC_TILECODE = 'z12x1204y1852'
    const NYC_QUADKEY = '030232231132'

    describe('latlon2tilecode', () => {
        it('should convert lat/lon to tilecode', () => {
            expect(latlon2tilecode(NYC_LAT, NYC_LON, NYC_ZOOM)).toBe(NYC_TILECODE)
        })

        it('should throw error for invalid zoom level', () => {
            expect(() => latlon2tilecode(NYC_LAT, NYC_LON, 33)).toThrow('Invalid zoom level')
            expect(() => latlon2tilecode(NYC_LAT, NYC_LON, -1)).toThrow('Invalid zoom level')
        })

        it('should throw error for invalid coordinates', () => {
            expect(() => latlon2tilecode(91, NYC_LON, NYC_ZOOM)).toThrow('Invalid latitude')
            expect(() => latlon2tilecode(NYC_LAT, 181, NYC_ZOOM)).toThrow('Invalid longitude')
        })
    })

    describe('latlon2quadkey', () => {
        it('should convert lat/lon to quadkey', () => {
            expect(latlon2quadkey(NYC_LAT, NYC_LON, NYC_ZOOM)).toBe(NYC_QUADKEY)
        })
    })

    describe('quadkey2latlon', () => {
        it('should convert quadkey to lat/lon', () => {
            const [lat, lon] = quadkey2latlon(NYC_QUADKEY)
            expect(lat).toBeCloseTo(NYC_LAT, 1)
            expect(lon).toBeCloseTo(NYC_LON, 1)
        })
    })

    describe('tilecode2latlon', () => {
        it('should convert tilecode to lat/lon', () => {
            const [lat, lon] = tilecode2latlon(NYC_TILECODE)
            expect(lat).toBeCloseTo(NYC_LAT, 1)
            expect(lon).toBeCloseTo(NYC_LON, 1)
        })

        it('should throw error for invalid tilecode format', () => {
            expect(() => tilecode2latlon('invalid')).toThrow('Invalid tilecode format')
        })
    })

    describe('tilecode2quadkey', () => {
        it('should convert tilecode to quadkey', () => {
            expect(tilecode2quadkey(NYC_TILECODE)).toBe(NYC_QUADKEY)
        })

        it('should throw error for invalid tilecode format', () => {
            expect(() => tilecode2quadkey('invalid')).toThrow('Invalid tilecode format')
        })
    })

    describe('quadkey2tilecode', () => {
        it('should convert quadkey to tilecode', () => {
            expect(quadkey2tilecode(NYC_QUADKEY)).toBe(NYC_TILECODE)
        })
    })

    describe('tilecodeCellLength', () => {
        it('should calculate cell length in meters', () => {
            const length = tilecodeCellLength(NYC_TILECODE)
            expect(length).toBeGreaterThan(0)
            expect(length).toBeLessThan(100000) // Should be less than 100km at zoom 12
        })

        it('should throw error for invalid tilecode format', () => {
            expect(() => tilecodeCellLength('invalid')).toThrow('Invalid tilecode format')
        })
    })

    describe('tilecode2wktbound', () => {
        it('should convert tilecode to WKT polygon', () => {
            const wkt = tilecode2wktbound(NYC_TILECODE)
            expect(wkt).toMatch(/^POLYGON\(\(.*\)\)$/)
            expect(wkt).toContain(NYC_LON.toString())
            expect(wkt).toContain(NYC_LAT.toString())
        })

        it('should throw error for invalid tilecode format', () => {
            expect(() => tilecode2wktbound('invalid')).toThrow('Invalid tilecode format')
        })
    })

    // Additional test cases for edge cases
    describe('Edge Cases', () => {
        it('should handle coordinates at the equator', () => {
            const tilecode = latlon2tilecode(0, 0, 1)
            expect(tilecode).toBe('z1x1y1')
        })

        it('should handle coordinates at the poles', () => {
            const tilecode = latlon2tilecode(89.9, 0, 1)
            expect(tilecode).toBe('z1x1y0')
        })

        it('should handle coordinates at the international date line', () => {
            const tilecode = latlon2tilecode(0, 179.9, 1)
            expect(tilecode).toBe('z1x3y1')
        })
    })
}) 