import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindscss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react({}), tsConfigPaths(), tailwindscss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/*\/api/, '')
      }
    }
  },
})
