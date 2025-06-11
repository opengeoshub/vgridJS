// Geohash module for vgridjs
export interface GeohashOptions {
  precision?: number;
}

export class Geohash {
  constructor(options?: GeohashOptions) {
    this.precision = options?.precision ?? 6;
  }

  private precision: number;

  // Add your geohash implementation here
} 