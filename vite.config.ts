import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5005, // Replace with your desired port number
    strictPort: true, // Optional: if true, Vite will exit if the port is already in use
  }
})
