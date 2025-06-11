import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      'dggs': path.resolve(__dirname, 'dggs'),
      'dggs/geohash': path.resolve(__dirname, 'dggs/geohash')
    }
  }
}) 