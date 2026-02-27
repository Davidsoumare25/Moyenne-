self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force le nouveau service worker à s'activer
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Prend le contrôle des pages immédiatement
});

