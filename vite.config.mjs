import {defineConfig} from 'vite'
import path from 'path'

export default defineConfig({
  outDir: 'dist',
  build: {
    rollupOptions: {
      external: ['node:stream'],
      input: path.resolve(__dirname, 'src/index.mjs'),
      output: {
        entryFileNames: 'index.mjs',
      },
    },
  },
})
