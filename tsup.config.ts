import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['dggs/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [/^internal/],
  noExternal: ['gl-matrix'],
  globalName: 'vgridjs',
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