import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    // 'dggs/index.ts',
    'dggs/tilecode.ts',
    'dggs/qtm.ts',
    'dggs/olc.ts',
    'dggs/mercantile.ts',
    'dggs/maidenhead.ts',
    'dggs/georef.ts',
    'dggs/geohash.ts'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [/^internal/],
  noExternal: ['gl-matrix'],
  target: 'es2020',
  esbuildOptions(options) {
    options.supported = {
      'bigint': true
    }
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : format === 'iife' ? '.umd.js' : '.js',
    }
  }
}) 