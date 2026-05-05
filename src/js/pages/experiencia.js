export async function loadExperience() {
  try {
    const response = await fetch('/src/data/experiencia.json');
    const data = await response.json();
    
    const container = document.getElementById('experience-container');
    if (!container) return;
    
    container.innerHTML = ''; // Limpiar por si acaso
    
    data.experiencia.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
      div.innerHTML = `
        <div class="timeline-content glass">
          <span class="periodo">${item.periodo}</span>
          <h3>${item.puesto}</h3>
          <h4>${item.empresa}</h4>
          <p>${item.descripcion}</p>
        </div>
      `;
      container.appendChild(div);
    });

    // Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
    
  } catch (err) {
    console.error("Error cargando experiencia:", err);
  }
}

// Auto-ejecutar si no se importa como módulo
if (import.meta.url === window.location.href) {
  document.addEventListener('DOMContentLoaded', loadExperience);
}
