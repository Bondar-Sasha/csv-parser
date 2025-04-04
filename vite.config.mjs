import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.js'),
      output: {
        entryFileNames: 'index.js',
      }
    }
  }
})