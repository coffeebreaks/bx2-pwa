const CACHE_NAME = 'bx2-cache';

const urlsToCache = [
  '/',
  'index.html',
  'icon-500.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Loaded from cache:', event.request.url);
          return response;
        }
        console.log('Loaded from network:', event.request.url);
        return fetch(event.request);
      })
  );
});
