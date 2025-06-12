/**
 * Geohash implementation in TypeScript
 * Original Python implementation by Hiroaki Kawai <kawai@iij.ad.jp>
 */

const _base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
const _base32Map: { [key: string]: number } = {};
for (let i = 0; i < _base32.length; i++) {
    _base32Map[_base32[i]] = i;
}

interface BBox {
    s: number;
    w: number;
    n: number;
    e: number;
}

interface DecodeResult {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
}

function _floatHexToInt(f: number): [number, number] | null {
    if (f < -1.0 || f >= 1.0) {
        return null;
    }

    if (f === 0.0) {
        return [1, 1];
    }

    const h = f.toString(16);
    const x = h.indexOf("0x1.");
    if (x < 0) return null;
    const p = h.indexOf("p");
    if (p <= 0) return null;

    const halfLen = h.slice(x + 4, p).length * 4 - parseInt(h.slice(p + 1));
    let r: number;
    if (x === 0) {
        r = (1 << halfLen) + ((1 << (h.slice(x + 4, p).length * 4)) + parseInt(h.slice(x + 4, p), 16));
    } else {
        r = (1 << halfLen) - ((1 << (h.slice(x + 4, p).length * 4)) + parseInt(h.slice(x + 4, p), 16));
    }

    return [r, halfLen + 1];
}

function _intToFloatHex(i: number, l: number): number {
    if (l === 0) {
        return -1.0;
    }

    const half = 1 << (l - 1);
    const s = Math.floor((l + 3) / 4);
    if (i >= half) {
        i = i - half;
        return parseFloat(`0x0.${(i << (s * 4 - l)).toString(16).padStart(s, '0')}p1`);
    } else {
        i = half - i;
        return parseFloat(`-0x0.${(i << (s * 4 - l)).toString(16).padStart(s, '0')}p1`);
    }
}

function _encodeI2c(lat: number, lon: number, latLength: number, lonLength: number): string {
    const precision = Math.floor((latLength + lonLength) / 5);
    let a: number, b: number;
    if (latLength < lonLength) {
        a = lon;
        b = lat;
    } else {
        a = lat;
        b = lon;
    }

    const boost = [0, 1, 4, 5, 16, 17, 20, 21];
    let ret = '';
    for (let i = 0; i < precision; i++) {
        ret += _base32[(boost[a & 7] + (boost[b & 3] << 1)) & 0x1F];
        const t = a >> 3;
        a = b >> 2;
        b = t;
    }

    return ret.split('').reverse().join('');
}

export function encode(latitude: number, longitude: number, precision: number = 12): string {
    if (latitude >= 90.0 || latitude < -90.0) {
        throw new Error("Invalid latitude.");
    }
    while (longitude < -180.0) {
        longitude += 360.0;
    }
    while (longitude >= 180.0) {
        longitude -= 360.0;
    }

    const xprecision = precision + 1;
    let latLength = Math.floor(xprecision * 5 / 2);
    let lonLength = latLength;
    if (xprecision % 2 === 1) {
        lonLength += 1;
    }

    const a = _floatHexToInt(latitude / 90.0);
    const o = _floatHexToInt(longitude / 180.0);
    if (!a || !o) {
        throw new Error("Invalid coordinates");
    }

    let ai: number, oi: number;
    if (a[1] > latLength) {
        ai = a[0] >> (a[1] - latLength);
    } else {
        ai = a[0] << (latLength - a[1]);
    }

    if (o[1] > lonLength) {
        oi = o[0] >> (o[1] - lonLength);
    } else {
        oi = o[0] << (lonLength - o[1]);
    }

    return _encodeI2c(ai, oi, latLength, lonLength).slice(0, precision);
}

function _decodeC2i(hashcode: string): [number, number, number, number] {
    let lon = 0;
    let lat = 0;
    let bitLength = 0;
    let latLength = 0;
    let lonLength = 0;

    for (const i of hashcode) {
        const t = _base32Map[i];
        if (bitLength % 2 === 0) {
            lon = lon << 3;
            lat = lat << 2;
            lon += (t >> 2) & 4;
            lat += (t >> 2) & 2;
            lon += (t >> 1) & 2;
            lat += (t >> 1) & 1;
            lon += t & 1;
            lonLength += 3;
            latLength += 2;
        } else {
            lon = lon << 2;
            lat = lat << 3;
            lat += (t >> 2) & 4;
            lon += (t >> 2) & 2;
            lat += (t >> 1) & 2;
            lon += (t >> 1) & 1;
            lat += t & 1;
            lonLength += 2;
            latLength += 3;
        }
        bitLength += 5;
    }

    return [lat, lon, latLength, lonLength];
}

export function decode(hashcode: string, delta: boolean = false): DecodeResult {
    const [lat, lon, latLength, lonLength] = _decodeC2i(hashcode);

    const latitudeDelta = 90.0 / (1 << latLength);
    const longitudeDelta = 180.0 / (1 << lonLength);
    const latitude = _intToFloatHex(lat, latLength) * 90.0 + latitudeDelta;
    const longitude = _intToFloatHex(lon, lonLength) * 180.0 + longitudeDelta;

    if (delta) {
        return { latitude, longitude, latitudeDelta, longitudeDelta };
    }
    return { latitude, longitude };
}

export function decodeExactly(hashcode: string): DecodeResult {
    return decode(hashcode, true);
}

export function bbox(hashcode: string): BBox {
    const [lat, lon, latLength, lonLength] = _decodeC2i(hashcode);
    const latitudeDelta = 180.0 / (1 << latLength);
    const longitudeDelta = 360.0 / (1 << lonLength);
    const latitude = _intToFloatHex(lat, latLength) * 90.0;
    const longitude = _intToFloatHex(lon, lonLength) * 180.0;

    return {
        s: latitude,
        w: longitude,
        n: latitude + latitudeDelta,
        e: longitude + longitudeDelta
    };
}

export function neighbors(hashcode: string): string[] {
    const [lat, lon, latLength, lonLength] = _decodeC2i(hashcode);
    const ret: string[] = [];
    let tlat = lat;

    for (const tlon of [lon - 1, lon + 1]) {
        const code = _encodeI2c(tlat, tlon, latLength, lonLength);
        if (code) {
            ret.push(code);
        }
    }

    tlat = lat + 1;
    if (!(tlat >> latLength)) {
        for (const tlon of [lon - 1, lon, lon + 1]) {
            ret.push(_encodeI2c(tlat, tlon, latLength, lonLength));
        }
    }

    tlat = lat - 1;
    if (tlat >= 0) {
        for (const tlon of [lon - 1, lon, lon + 1]) {
            ret.push(_encodeI2c(tlat, tlon, latLength, lonLength));
        }
    }

    return ret;
}

export function expand(hashcode: string): string[] {
    const ret = neighbors(hashcode);
    ret.push(hashcode);
    return ret;
}

// Vgrid specific functions
export function geohashParent(geohashId: string): string {
    if (!geohashId || geohashId.length <= 1) {
        throw new Error("Cannot get parent of an empty or single-character geohash.");
    }
    return geohashId.slice(0, -1);
}

export function geohashChildren(geohashId: string, resolution: number): string[] {
    if (geohashId.length >= resolution) {
        return geohashId.length === resolution ? [geohashId] : [];
    }

    let children = [geohashId];
    while (children[0].length < resolution) {
        children = children.flatMap(c => _base32.split('').map(ch => c + ch));
    }
    return children;
}
