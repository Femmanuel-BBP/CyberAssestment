import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // Base path relativo para que funcione embebido en cualquier carpeta
  base: './',
  build: {
    // Generar sourcemaps para debugging (opcional, quitar en producción final)
    sourcemap: false,
    // Nombre de la carpeta de salida
    outDir: 'dist',
    // Limpiar la carpeta antes de build
    emptyOutDir: true,
  }
})
