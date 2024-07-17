import path, { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        sungraeInfo: resolve(__dirname, 'src/sungraeInfo.html'),
        jeongkiInfo: resolve(__dirname, 'src/jeongkiInfo.html'),
      },
    },
  },
})
