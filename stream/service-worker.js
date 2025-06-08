
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open('mi-catalogo-v7').then(cache =>
    cache.addAll(['./', './index.html', './manifest.json'])
  ));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
