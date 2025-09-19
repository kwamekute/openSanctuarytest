import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      // All requests starting with /signup will be forwarded to your API
      '/signup': 'http://localhost:3000',
      // Or forward everything under /api
      '/api': 'http://localhost:3000'
    }
  }
});