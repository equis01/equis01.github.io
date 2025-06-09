const TMDB_API = "6f712d2bf184acc19c28200f263b5220";
let allData = [], index = 0, chunk = 4;

const results = document.getElementById("results");
const loadMoreBtn = document.getElementById("loadMore");
const searchInput = document.getElementById("search");

function renderChunk() {
  const slice = allData.slice(index, index + chunk);
  for (const item of slice) {
    const title = item.title || item.name;
    const img = item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : '';
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${img}" alt="${title}">
      <h2>${title}</h2>
      <p>${(item.release_date || item.first_air_date || '').split('-')[0] || ''}</p>
      <a href="detalle.html?title=${encodeURIComponent(title)}">Ver más</a>
    `;
    results.appendChild(card);
  }
  index += chunk;
  if (index >= allData.length) loadMoreBtn.style.display = "none";
}

async function fetchPopular() {
  results.innerHTML = "⏳ Cargando...";
  const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API}&language=es-MX`);
  const data = await res.json();
  allData = data.results;
  index = 0;
  results.innerHTML = "";
  renderChunk();
}

searchInput.addEventListener("input", async (e) => {
  const q = e.target.value.trim();
  if (q.length < 3) return;
  const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API}&query=${q}&language=es-MX`);
  const data = await res.json();
  allData = data.results;
  index = 0;
  results.innerHTML = "";
  renderChunk();
});

loadMoreBtn.onclick = renderChunk;

fetchPopular();
