/**
 * Quarternary Triangular Mesh (QTM) implementation in TypeScript
 * Original Python implementation by Paulo Raposo and Randall Brown
 * Based on Geoffrey Dutton's conception
 */

import { Point, Polygon } from 'geojson';

interface Vertex {
    lat: number;
    lon: number;
}

interface Facet {
    vertices: Vertex[];
    orientation?: 'u' | 'd';
    isNorth?: boolean;
}

function findCrossedMeridiansByLatitude(vert1: Vertex, vert2: Vertex, newLat: number): [number, number] {
    const theta = newLat * Math.PI / 180;
    const theta1 = vert1.lat * Math.PI / 180;
    const lamb1 = vert1.lon * Math.PI / 180;
    const theta2 = vert2.lat * Math.PI / 180;
    const lamb2 = vert2.lon * Math.PI / 180;

    const dlamb = lamb2 - lamb1;

    const x = Math.sin(theta1) * Math.cos(theta2) * Math.cos(theta) * Math.sin(dlamb);
    const y = Math.sin(theta1) * Math.cos(theta2) * Math.cos(theta) * Math.cos(dlamb) - Math.cos(theta1) * Math.sin(theta2) * Math.cos(theta);
    const z = Math.cos(theta1) * Math.cos(theta2) * Math.sin(theta) * Math.sin(dlamb);

    if (z * z > x * x + y * y) {
        throw new Error("Great circle doesn't reach latitude.");
    }

    const lambm = Math.atan2(-y, x);
    const dlambI = Math.acos(z / Math.sqrt(x * x + y * y));

    const lambI1 = lamb1 + lambm - dlambI;
    const lambI2 = lamb1 + lambm + dlambI;

    const lon1 = ((lambI1 * 180 / Math.PI) + 540) % 360 - 180;
    const lon2 = ((lambI2 * 180 / Math.PI) + 540) % 360 - 180;

    return [lon1, lon2];
}

function lonCheck(lon1: number, lon2: number, pointlon1: number, pointlon2: number): number {
    const [lesser, greater] = [pointlon1, pointlon2].sort((a, b) => a - b);
    return (lon1 > lesser && lon1 < greater) ? lon1 : lon2;
}

function getMidpoint(vert1: Vertex, vert2: Vertex): Vertex {
    return {
        lat: (vert1.lat + vert2.lat) / 2,
        lon: (vert1.lon + vert2.lon) / 2
    };
}

function constructGeometry(facet: Facet): Polygon {
    const coordinates = facet.vertices.map(v => [v.lon, v.lat]);
    // Close the ring if it's not already closed
    if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] || 
        coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
        coordinates.push(coordinates[0]);
    }
    return {
        type: 'Polygon',
        coordinates: [coordinates]
    };
}

function divideFacet(aFacet: Facet): Facet[] {
    const newFacets: Facet[] = [];
    const newVerts: Vertex[] = [];

    if (aFacet.orientation) {
        // This is a triangle facet
        for (let i = 0; i < 3; i++) {
            if (aFacet.vertices[i].lat === aFacet.vertices[i + 1].lat || 
                aFacet.vertices[i].lon === aFacet.vertices[i + 1].lon) {
                newVerts.push(getMidpoint(aFacet.vertices[i], aFacet.vertices[i + 1]));
            } else {
                const newLat = (aFacet.vertices[i].lat + aFacet.vertices[i + 1].lat) / 2;
                const [newLon1, newLon2] = findCrossedMeridiansByLatitude(
                    aFacet.vertices[i], 
                    aFacet.vertices[i + 1], 
                    newLat
                );
                const newLon = lonCheck(
                    newLon1, 
                    newLon2, 
                    aFacet.vertices[i].lon, 
                    aFacet.vertices[i + 1].lon
                );
                newVerts.push({ lat: newLat, lon: newLon });
            }
        }

        if (aFacet.orientation === 'u') {
            newFacets.push(
                { vertices: [newVerts[0], newVerts[1], newVerts[2], newVerts[0]], orientation: 'd' },
                { vertices: [newVerts[2], newVerts[1], aFacet.vertices[2], newVerts[2]], orientation: 'u' },
                { vertices: [aFacet.vertices[0], newVerts[0], newVerts[2], aFacet.vertices[0]], orientation: 'u' },
                { vertices: [newVerts[0], aFacet.vertices[1], newVerts[1], newVerts[0]], orientation: 'u' }
            );
        } else {
            newFacets.push(
                { vertices: [newVerts[2], newVerts[0], newVerts[1], newVerts[2]], orientation: 'u' },
                { vertices: [aFacet.vertices[0], newVerts[0], newVerts[2], aFacet.vertices[0]], orientation: 'd' },
                { vertices: [newVerts[2], newVerts[1], aFacet.vertices[2], newVerts[2]], orientation: 'd' },
                { vertices: [newVerts[0], aFacet.vertices[1], newVerts[1], newVerts[0]], orientation: 'd' }
            );
        }
    } else {
        // This is a rectangle facet
        if (aFacet.isNorth) {
            for (let i = 0; i < 4; i++) {
                if (i !== 2) {
                    if (aFacet.vertices[i].lat === aFacet.vertices[i + 1].lat || 
                        aFacet.vertices[i].lon === aFacet.vertices[i + 1].lon) {
                        newVerts.push(getMidpoint(aFacet.vertices[i], aFacet.vertices[i + 1]));
                    } else {
                        const newLat = (aFacet.vertices[i].lat + aFacet.vertices[i + 1].lat) / 2;
                        const [newLon1, newLon2] = findCrossedMeridiansByLatitude(
                            aFacet.vertices[i], 
                            aFacet.vertices[i + 1], 
                            newLat
                        );
                        const newLon = lonCheck(
                            newLon1, 
                            newLon2, 
                            aFacet.vertices[i].lon, 
                            aFacet.vertices[i + 1].lon
                        );
                        newVerts.push({ lat: newLat, lon: newLon });
                    }
                }
            }

            newFacets.push(
                { vertices: [newVerts[0], newVerts[1], newVerts[2], newVerts[0]], orientation: 'd' },
                { vertices: [newVerts[2], newVerts[1], aFacet.vertices[2], aFacet.vertices[3], newVerts[2]], isNorth: true },
                { vertices: [aFacet.vertices[0], newVerts[0], newVerts[2], aFacet.vertices[0]], orientation: 'u' },
                { vertices: [newVerts[0], aFacet.vertices[1], newVerts[1], newVerts[0]], orientation: 'u' }
            );
        } else {
            for (let i = 0; i < 4; i++) {
                if (i !== 0) {
                    if (aFacet.vertices[i].lat === aFacet.vertices[i + 1].lat || 
                        aFacet.vertices[i].lon === aFacet.vertices[i + 1].lon) {
                        newVerts.push(getMidpoint(aFacet.vertices[i], aFacet.vertices[i + 1]));
                    } else {
                        const newLat = (aFacet.vertices[i].lat + aFacet.vertices[i + 1].lat) / 2;
                        const [newLon1, newLon2] = findCrossedMeridiansByLatitude(
                            aFacet.vertices[i], 
                            aFacet.vertices[i + 1], 
                            newLat
                        );
                        const newLon = lonCheck(
                            newLon1, 
                            newLon2, 
                            aFacet.vertices[i].lon, 
                            aFacet.vertices[i + 1].lon
                        );
                        newVerts.push({ lat: newLat, lon: newLon });
                    }
                }
            }

            newFacets.push(
                { vertices: [newVerts[2], newVerts[0], newVerts[1], newVerts[2]], orientation: 'u' },
                { vertices: [aFacet.vertices[0], aFacet.vertices[1], newVerts[0], newVerts[2], aFacet.vertices[0]], isNorth: false },
                { vertices: [newVerts[2], newVerts[1], aFacet.vertices[3], newVerts[2]], orientation: 'd' },
                { vertices: [newVerts[1], newVerts[0], aFacet.vertices[2], newVerts[1]], orientation: 'd' }
            );
        }
    }

    return newFacets;
}

// Base octahedral face definitions
const BASE_FACETS: Facet[] = [
    // North pole triangle
    {
        vertices: [
            { lat: 90, lon: 0 },
            { lat: 0, lon: 0 },
            { lat: 0, lon: 90 },
            { lat: 90, lon: 0 }
        ],
        orientation: 'u'
    },
    // South pole triangle
    {
        vertices: [
            { lat: -90, lon: 0 },
            { lat: 0, lon: 0 },
            { lat: 0, lon: 90 },
            { lat: -90, lon: 0 }
        ],
        orientation: 'd'
    },
    // East pole triangle
    {
        vertices: [
            { lat: 0, lon: 90 },
            { lat: 0, lon: 0 },
            { lat: 0, lon: 180 },
            { lat: 0, lon: 90 }
        ],
        orientation: 'u'
    },
    // West pole triangle
    {
        vertices: [
            { lat: 0, lon: -90 },
            { lat: 0, lon: 0 },
            { lat: 0, lon: 90 },
            { lat: 0, lon: -90 }
        ],
        orientation: 'd'
    }
];

export function qtmIdToFacet(qtmId: string): Facet {
    // Implementation of qtm_id_to_facet
    // This would need to be implemented based on your specific QTM ID format
    throw new Error("Not implemented");
}

export function latlonToQtmId(lat: number, lon: number, resolution: number): string {
    // Implementation of latlon_to_qtm_id
    // This would need to be implemented based on your specific QTM ID format
    throw new Error("Not implemented");
}

export function qtmIdToLatlon(qtmId: string): Vertex {
    // Implementation of qtm_id_to_latlon
    // This would need to be implemented based on your specific QTM ID format
    throw new Error("Not implemented");
}

export function qtmParent(qtmId: string): string {
    if (!qtmId || qtmId.length <= 1) {
        throw new Error("Cannot get parent of an empty or single-character QTM ID.");
    }
    return qtmId.slice(0, -1);
}

export function qtmChildren(qtmId: string, resolution?: number): string[] {
    if (resolution !== undefined && qtmId.length >= resolution) {
        return qtmId.length === resolution ? [qtmId] : [];
    }

    // Implementation of qtm_children
    // This would need to be implemented based on your specific QTM ID format
    throw new Error("Not implemented");
} 