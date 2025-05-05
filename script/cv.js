function shareProfile() {
  if (navigator.share) {
    navigator.share({
      title: 'Eduardo Vázquez – CV',
      text: 'Consulta el CV de Eduardo Vázquez',
      url: window.location.href
    }).catch(console.error);
  } else {
    alert('Tu navegador no admite compartir.');
  }
}
