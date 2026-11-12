import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works at a domain root, in a subfolder,
// or opened straight from the dist folder.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
});
