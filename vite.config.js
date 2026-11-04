import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset paths
  resolve: {
    // preserveSymlinks is only needed for local Windows sandbox environment
    preserveSymlinks: process.platform === 'win32',
  },
})
