import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    define: {
    'process.env': process.env
  },
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/Play-to-Secure',
})
