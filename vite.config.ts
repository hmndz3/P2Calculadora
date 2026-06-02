import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    // sin jsdom porque los tests son funciones puras
    environment: 'node',
    setupFiles: [],
  },
})
