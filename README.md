# Eduardo Vázquez - Portafolio Profesional 🌌

Bienvenido a mi ecosistema digital. Este proyecto ha sido migrado a una arquitectura moderna potenciada por **Vite**, optimizada para el rendimiento, seguridad y una experiencia de usuario premium con diseño **Aurora Glassmorphism**.

## 🛠️ Tecnologías Utilizadas

- **Core**: HTML5 semántico, CSS3 (Vanilla) con variables.
- **Build System**: [Vite](https://vitejs.dev/) para optimización de assets y hot-reload.
- **Efectos**: Glassmorphism, animaciones Aurora y micro-interacciones premium.
- **Seguridad**: Sistema de protección anti-inspección con Web Share API integrado.

## 📦 Gestión de Contenido Dinámico

Para actualizar el contenido sin tocar el HTML, edita los archivos en `src/data/`:

- `portfolio.json`: Controla los proyectos y herramientas que aparecen en el Hub.
- `templates.json`: Gestiona el catálogo de la tienda (precios, imágenes, URLs de preview).
- `experiencia.json`: Actualiza tu trayectoria profesional en el timeline.

## 🛡️ Seguridad y Protección

El sitio cuenta con un script de protección (`src/js/utils/protection.js`) que:
- Bloquea el clic derecho y teclas de inspección (F12, Ctrl+U, etc.).
- Al intentar inspeccionar, se dispara automáticamente la opción de **compartir el perfil** o copia el enlace al portapapeles como fallback.

## 💻 Desarrollo Local

Para ejecutar el proyecto localmente:

1. Instalar dependencias: `npm install`
2. Iniciar servidor de desarrollo: `npm run dev`
3. Construir para producción: `npm run build`

---
© 2026 Eduardo Vázquez
