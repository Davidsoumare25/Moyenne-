self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force la mise à jour immédiate
    // ... ton code de mise en cache habituel ...
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim()); // Prend le contrôle des pages immédiatement
});

const CACHE_NAME = 'moyenne-sn-v5'; // Change le v4 à chaque grosse modif
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/190/190411.png'
];

// Installation
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activation & Nettoyage
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// CRUCIAL POUR L'INSTALLATION : La stratégie réseau
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// Gestion des clics sur notifications
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
});
