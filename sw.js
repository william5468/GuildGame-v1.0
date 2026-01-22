const CACHE_NAME = 'guildgame-v1';
const urlsToCache = [
  '/GuildGame-v1.0/',
  '/GuildGame-v1.0/index.html',
  '/GuildGame-v1.0/style.css',
  '/GuildGame-v1.0/javascript.js',
  // Add more: '/GuildGame-v1.0/Audio/bgm.mp3', '/GuildGame-v1.0/Images/Guild_bg.jpg', etc.
  // List all critical files for offline start
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});