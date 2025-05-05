function shareProfile() {
  if (navigator.share) {
    navigator.share({
      title: 'Currículum Vitae',
      text: 'Te comparto el CV de Eduardo Vázquez. Conoce más sobre él.',
      url: window.location.href
    }).catch(console.error);
  } else {
    alert('Tu navegador no admite compartir.');
  }
}
