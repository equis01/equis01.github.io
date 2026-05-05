// Año dinámico
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Botón compartir
function shareProfile() {
  if (navigator.share) {
    navigator.share({
      title: 'Eduardo Vázquez',
      text: 'Explora el perfil personal de Eduardo en su web.',
      url: window.location.href
    }).catch(console.error);
  } else {
    alert('Tu navegador no admite compartir.');
  }
}

// Oculta loader cuando la página está lista
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = 0;
  setTimeout(() => loader.style.display = "none", 500);
});
