// sw.js - Ultra-robust offline PWA support (enhanced error handling + opaque response skip)
const CACHE_NAME = 'guildgame-offline-v5';  // Bumped version to force refresh

// Critical local files only (all must exist — no icons until added)
const PRECACHE_URLS = [
  'index.html',
  'style.css',
  'javascript.js',
  'constants.js',
  'player2_config.js',
  'translations.js',
  'player2.js',
  'quests.js',
  'openrouter.js',          // Keep only if file exists
  'manifest.json'
  // Add confirmed-existing images/sounds here if desired, e.g.:
  // 'Images/main_char.png',
  // 'Images/ルナ.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.allSettled(  // Use allSettled to never fail entire install
          PRECACHE_URLS.map(url => cache.add(url).catch(err => {
            console.warn(`Precaching skipped (failed): ${url}`, err);
          }))
        );
      })
      .then(() => self.skipWaiting())
      .catch(err => {
        console.error('Install phase error (non-fatal):', err);
      })
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

  // Network-only for external APIs (AI features)
  if (url.includes('api.player2.game') ||
      url.includes('openrouter.ai') ||
      url.includes('generativelanguage.googleapis.com') ||
      url.includes('cdn.jsdelivr.net') ||     // Optional: skip caching CDN (they reload fine)
      url.includes('cdnjs.cloudflare.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response('Offline - Feature unavailable')));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        // Cache hit: serve immediately
        if (cached) {
          // Background update (fire-and-forget with full error handling)
          fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200 && 
                  (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, networkResponse.clone()))
                  .catch(err => console.warn('Background cache put failed:', err));
              }
            })
            .catch(() => {});  // Offline/network fail = ignore
          return cached;
        }

        // Cache miss: network first
        return fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200 && 
                (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, clone))
                .catch(err => console.warn('Cache put failed:', err));
            }
            return networkResponse;
          })
          .catch(err => {
            console.warn('Network fetch failed:', err);
            // Fallback to index.html for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('index.html');
            }
            return new Response('Offline - Resource unavailable', { status: 503 });
          });
      })
      .catch(err => {
        console.error('Cache match error:', err);
        return new Response('Service Worker error', { status: 500 });
      })
  );
});