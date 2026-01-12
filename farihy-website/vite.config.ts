import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 80,
    allowedHosts: ['farihy.spotiphi.org'],
    watch: {
       usePolling: true, // Recommended for Linux/SSH environments
    }
  }
})