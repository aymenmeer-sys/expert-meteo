const CACHE_NAME = 'meteoexpert-v3'
const SHELL_CACHE = ['/', '/manifest.webmanifest', '/icon-light-32x32.png', '/icon-dark-32x32.png', '/apple-icon.png']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_CACHE)))
  self.skipWaiting()
})
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
self.addEventListener('push', (event) => {
  const data = event.data?.json?.() ?? { title: 'MétéoExpert', body: 'Nouvelle alerte météo' }
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: '/icon-light-32x32.png', badge: '/icon-light-32x32.png' }))
})
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => windows[0]?.focus() ?? clients.openWindow('/')))
})
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/api/weather')) {
    event.respondWith(fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)); return response }).catch(() => caches.match(event.request)))
    return
  }
  if (url.pathname.startsWith('/_next/static') || url.pathname.startsWith('/icons/')) {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)); return response })))
    return
  }
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then((cached) => cached || caches.match('/'))))
})
