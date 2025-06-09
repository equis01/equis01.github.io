const CACHE_NAME = "mi-catalogo-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./detalle.html",
  "./stream.css",
  "./app.js",
  "./detalle.js",
  "./manifest.json",
  "./x_bg_black.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
