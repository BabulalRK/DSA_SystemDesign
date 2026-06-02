import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'redirect-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/DSA_SystemDesign') {
            res.statusCode = 301;
            res.setHeader('Location', '/DSA_SystemDesign/');
            res.end();
          } else {
            next();
          }
        });
      }
    }
  ],
  base: '/DSA_SystemDesign/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mermaid': ['mermaid']
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './tests/setup.js',
  },
})
