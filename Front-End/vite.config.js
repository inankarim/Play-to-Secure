import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // On Vercel, deploy at the root URL:
  base: '/',                // or simply omit `base`
  // NOTE: only VITE_* envs are exposed client-side: import.meta.env.VITE_*
})
