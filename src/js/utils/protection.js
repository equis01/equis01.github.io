/**
 * Protección Anti-Inspección Reforzada con Fallback
 */

export async function triggerShare() {
  const shareData = {
    title: 'Eduardo Vázquez',
    text: 'Explora el perfil personal de Eduardo en su web.',
    url: window.location.origin
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      throw new Error('Web Share not supported');
    }
  } catch (err) {
    // Fallback: Copiar al portapapeles y avisar
    try {
      await navigator.clipboard.writeText(window.location.origin);
      alert("¡Enlace copiado al portapapeles! 🚀\nGracias por compartir mi portafolio.");
    } catch (clipErr) {
      alert(`¡Comparte este sitio!: ${window.location.origin}`);
    }
  }
}

export function initProtection() {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    triggerShare();
  });

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;

    if (e.key === 'F12' || 
        (ctrl && key === 'u') || 
        (ctrl && shift && (key === 'i' || key === 'j' || key === 'c')) ||
        (ctrl && key === 's') ||
        (ctrl && shift && key === 'k')) {
      e.preventDefault();
      triggerShare();
    }
  });
}
