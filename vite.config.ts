import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base + hash routing: the build works from any subpath (e.g. GitHub Pages).
export default defineConfig({
  base: './',
  plugins: [react()],
})
