
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('mi-catalogo-v5-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
