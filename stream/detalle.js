const TMDB_API = "6f712d2bf184acc19c28200f263b5220";
const WATCHMODE_API = "FKEtVUe2E8fwCj420sJfpR7jMKkhUBH7ENQ8SNOX";
const params = new URLSearchParams(location.search);
const title = params.get("title");

async function getDetails() {
  try {
    const tmdbRes = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API}&query=${encodeURIComponent(title)}&language=es-MX`);
    const tmdbData = await tmdbRes.json();
    const item = tmdbData.results?.[0];
    if (!item) throw new Error("No encontrado");

    const img = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '';
    const name = item.title || item.name || 'Sin título';
    const overview = item.overview || 'Sin descripción.';
    const year = (item.release_date || item.first_air_date || '').split('-')[0] || 'Sin año';

    document.title = name;

    const wmRes = await fetch(`https://api.watchmode.com/v1/search/?apiKey=${WATCHMODE_API}&search_value=${encodeURIComponent(name)}&search_field=name`);
    const wmData = await wmRes.json();
    const wmId = wmData.title_results?.[0]?.id;

    let platforms = "No disponible en plataformas.";
    if (wmId) {
      const sourcesRes = await fetch(`https://api.watchmode.com/v1/title/${wmId}/sources/?apiKey=${WATCHMODE_API}`);
      const sources = await sourcesRes.json();
      const filtered = sources.filter(s => ["Netflix", "Disney+", "YouTube"].includes(s.name));
      const shown = new Set();
      platforms = filtered
        .filter(p => !shown.has(p.name) && shown.add(p.name))
        .map(p => `<a href="${p.web_url}" target="_blank">Ver en ${p.name}</a>`)
        .join("<br>") || "No disponible en streaming.";
    }

    document.getElementById("details").innerHTML = `
      <img src="${img}" alt="${name}" class="big-img">
      <h2>${name}</h2>
      <p><strong>Año:</strong> ${year}</p>
      <p>${overview}</p>
      <div class="plataformas">${platforms}</div>
      <p><a class="share" href="https://wa.me/?text=Estoy viendo: ${encodeURIComponent(name)}">📲 Compartir</a></p>
    `;
  } catch (err) {
    document.getElementById("details").innerHTML = "❌ No se pudo cargar.";
  }
}

getDetails();
