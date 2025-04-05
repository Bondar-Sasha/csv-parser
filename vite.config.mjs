import {defineConfig} from 'vite'
import path from 'path'

export default defineConfig({
  outDir: 'dist',
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.js'),
      output: {
        entryFileNames: 'index.mjs',
      },
    },
  },
})
