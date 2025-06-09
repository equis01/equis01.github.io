const CACHE_NAME = "mi-catalogo-v1";
const urlsToCache = [
  "/stream/",
  "/stream/index.html",
  "/stream/detalle.html",
  "/stream/stream.css",
  "/stream/manifest.json",
  "/stream/x_bg_black.png"
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