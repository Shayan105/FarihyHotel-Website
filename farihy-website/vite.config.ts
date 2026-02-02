import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
   sourcemap: false, // This prevents .tsx files from being visible in production
  },	


  server: {
    host: true, // Listen on all network interfaces
    port: 3000,
    allowedHosts: ['farihy.spotiphi.org','farihy-hotel.com','www.farihy-hotel.com'], // Allow your specific domain
    hmr: false 
  }
})
