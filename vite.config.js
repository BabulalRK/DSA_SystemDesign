import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'brotliCompress' }),
    viteCompression({ algorithm: 'gzip' }),
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
          'vendor-mermaid': ['mermaid'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore']
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
