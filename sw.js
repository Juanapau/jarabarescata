// La app del panel ahora vive en /panel/. Este archivo solo borra la versión vieja
// que quedó instalada en la raíz del sitio, para que la página pública siempre se vea actualizada.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(cs => cs.forEach(c => c.navigate(c.url)))
  );
});
