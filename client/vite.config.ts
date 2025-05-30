import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  
  build: {
    chunkSizeWarningLimit: 1000, // Aumenta limite de aviso para 1MB

    rollupOptions: {
      output: {
        manualChunks: {
          // Separar grandes dependências em chunks
          react: ['react', 'react-dom'],
          vendor: ['react-router-dom'],
        },
      },
    },
  },

  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'node_modules'],
  },
});
