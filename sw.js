// sw.js - Robust offline PWA support (error-tolerant precaching)
const CACHE_NAME = 'guildgame-offline-v4';  // Bump version when updating files

// Only critical local files — add/remove exact filenames that exist in your repo root
const PRECACHE_URLS = [
  'index.html',
  'style.css',
  'javascript.js',
  'constants.js',
  'player2_config.js',
  'translations.js',
  'player2.js',
  'quests.js',
  'openrouter.js',          // If this file exists
  'manifest.json',
  'favicon.png',
  'apple-touch-icon.png',   // If you added it
  'icon-192.png',           // If you added icons
  'icon-512.png',
  // Add key images if you want them guaranteed (optional, e.g. common ones)
  'Images/main_char.png',
  'Images/ルナ.png',
  'Images/カイト.png',
  'Images/Quest.png',
   'Images/Card.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache one-by-one with error skipping
        return Promise.all(
          PRECACHE_URLS.map(url => {
            return cache.add(url).catch(err => {
              console.warn(`Failed to precache: ${url}`, err);
              // Continue even if one fails
            });
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Skip external APIs (AI features) — network only
  if (url.includes('api.player2.game') ||
      url.includes('openrouter.ai') ||
      url.includes('generativelanguage.googleapis.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response('Offline - AI features unavailable')));
    return;
  }

  // Cache-first for everything else (includes Images/, Audio/, and CDN on first use)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Serve cache + update in background
        fetch(event.request).then(net => {
          if (net && net.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, net.clone()));
          }
        }).catch(() => {});
        return cached;
      }

      // Network first, then cache
      return fetch(event.request).then(net => {
        if (net && net.status === 200) {
          const clone = net.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return net;
      }).catch(() => {
        // Fallback for HTML requests
        if (event.request.destination === 'document') {
          return caches.match('index.html');
        }
        return new Response('Offline - Resource unavailable', { status: 504 });
      });
    })
  );
});