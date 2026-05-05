import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        experiencia: resolve(__dirname, 'experiencia/index.html'),
        portafolio: resolve(__dirname, 'portafolio/index.html'),
        shop: resolve(__dirname, 'portafolio/shop/index.html'),
        viewer: resolve(__dirname, 'portafolio/shop/viewer.html'),
        cv: resolve(__dirname, 'cv/index.html'),
        qr: resolve(__dirname, 'portafolio/herramientas/qr-gen/index.html'),
        chula: resolve(__dirname, 'portafolio/proyectos/chula/index.html'),
        404: resolve(__dirname, '404.html'),
      }
    }
  },
  publicDir: 'src/assets',
});
