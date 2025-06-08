self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open('mi-catalogo-v1').then(cache =>
      cache.addAll([
        './',
        './index.html',
        './detalle.html',
        './manifest.json',
        './service-worker.js'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});