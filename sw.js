// sw.js - Ultra-robust offline PWA support (enhanced error handling + opaque response skip)
const CACHE_NAME = 'guildgame-offline-v7';  // Bumped version to force refresh after adding audio

// Critical local files + essential images + all audio files
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
  'manifest.json',

  // === Critical Images (from previous update) ===
  'Images/Cursor_Default.png',
  'Images/placeholder.png',
  'Images/main_char.png',
  'Images/ルナ.png',
  'Images/カイト.png',
  'Images/農夫.png',
  'Images/酒場主人.png',
  'Images/錬金術師.png',
  'Images/料理人.png',
  'Images/村長.png',
  'Images/おばあさん.png',

  // PWA icons
  'icon-192x192.png',
  'icon-512x512.png',
  'apple-touch-icon.png',

  // === All Audio Files from your Audio folder ===
  'Audio/battle.mp3',
  'Audio/battle2.mp3',
  'Audio/bgm.mp3',
  'Audio/Button_Click.mp3',
  'Audio/CounterAttack_F.mp3',
  'Audio/CounterAttack_M.mp3',
  'Audio/CounterAttack_trigger.mp3',
  'Audio/Defense_F.mp3',
  'Audio/Defense_M.mp3',
  'Audio/DEX_heavyAttack.mp3',
  'Audio/DEX_lightAttack.mp3',
  'Audio/DEX_Stunning.mp3',
  'Audio/dialogue_bgm.mp3',
  'Audio/Gameover.mp3',
  'Audio/levelup.mp3',
  'Audio/LUC_Blessing.mp3',
  'Audio/LUC_Evade.mp3',
  'Audio/LUC_Fortunestrike.mp3',
  'Audio/LUC_lightAttack.mp3',
  'Audio/main_screen_bgm.mp3',
  'Audio/QuestEndDialogue_bgm.mp3',
  'Audio/STR_heavyAttack.mp3',
  'Audio/STR_lightAttack.mp3',
  'Audio/STR_Protect.mp3',
  'Audio/WIS_Explosion.mp3',
  'Audio/WIS_heavyAttack.mp3',
  'Audio/WIS_lightAttack.mp3',
  'Audio/yume.mp3',

  // === Optional: Add more assets if confirmed ===
  // 'Images/items.png',               // item spritesheet if exists
  // 'Images/Shop_bg.jpg',             // background image if used
  // Breathing spritesheets if you have them
  // 'Images/ルナ_breathing.png',
  // 'Images/カイト_breathing.png',
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

// Fetch handler remains unchanged
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Network-only for external APIs (AI features)
  if (url.includes('api.player2.game') ||
      url.includes('openrouter.ai') ||
      url.includes('generativelanguage.googleapis.com') ||
      url.includes('cdn.jsdelivr.net') ||     
      url.includes('cdnjs.cloudflare.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response('Offline - Feature unavailable')));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200 && 
                  (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, networkResponse.clone()))
                  .catch(err => console.warn('Background cache put failed:', err));
              }
            })
            .catch(() => {});
          return cached;
        }

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