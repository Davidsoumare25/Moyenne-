self.addEventListener('push', function(event) {
    const options = {
        body: event.data.text(),
        icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
        vibrate: [200, 100, 200]
    };
    event.waitUntil(self.registration.showNotification('Calculateur Sénégal Pro', options));
});

