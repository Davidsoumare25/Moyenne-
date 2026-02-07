const CACHE_NAME = 'moyenne-sn-v3'; // Change v1 en v2 ici
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Installation et mise en cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  // Force la nouvelle version à s'installer immédiatement
  self.skipWaiting(); 
});

// Nettoyage des anciens caches pour les utilisateurs
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
