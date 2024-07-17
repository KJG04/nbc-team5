import path, { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  publicDir: path.resolve(__dirname, 'public'),
  base: '/nbc-team5/',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        sungraeInfo: resolve(__dirname, 'src/sungraeInfo.html'),
        jingeunInfo: resolve(__dirname, 'src/jingeunInfo.html'),
        jeongkiInfo: resolve(__dirname, 'src/jeongkiInfo.html'),
      },
    },
  },
})
