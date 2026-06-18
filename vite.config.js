import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  // Desactivamos el mapeo automático de public para que funcione 
  // con rutas relativas manuales como /public/img/...
  publicDir: false, 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        experiencia: resolve(__dirname, 'experiencia/index.html'),
        portafolio: resolve(__dirname, 'portafolio/index.html'),
        cuidado: resolve(__dirname, 'public/analytics/animal/cuidado.html'),
        privacidadCuidado: resolve(__dirname, 'public/analytics/animal/privacidad.html'),
        tratamientoDatosCuidado: resolve(__dirname, 'public/analytics/animal/tratamiento-datos.html'),
        tours: resolve(__dirname, 'public/analytics/tours/index.html'),
        privacidadTours: resolve(__dirname, 'public/analytics/tours/privacidad.html'),
        shop: resolve(__dirname, 'portafolio/shop/index.html'),
        viewer: resolve(__dirname, 'portafolio/shop/viewer.html'),
        cv: resolve(__dirname, 'cv/index.html'),
        qr: resolve(__dirname, 'portafolio/herramientas/qr-gen/index.html'),
        chula: resolve(__dirname, 'portafolio/proyectos/chula/index.html'),
        404: resolve(__dirname, '404.html'),
      }
    }
  }
});
