import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  preview: {
    allowedHosts: ['api-service-webapp-ls673.kinsta.app', 'localhost', '0.0.0.0']
  }
}); 