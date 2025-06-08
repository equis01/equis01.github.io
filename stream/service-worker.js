
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('mi-catalogo-cache-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './x_bg_black.png'
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
