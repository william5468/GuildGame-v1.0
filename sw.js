// sw.js - Robust offline support for GuildGame
const CACHE_NAME = 'guildgame-offline-v3'; // ゲーム更新時はバージョンを上げる（古いキャッシュ削除）

const PRECACHE_URLS = [
  './',                                   // ルート
  'index.html',
  'style.css',
  'javascript.js',
  'constants.js',
  'player2_config.js',
  'translations.js',
  'player2.js',
  'quests.js',
  'openrouter.js',
  'manifest.json',
  'favicon.png',
  // CDN assets (初回オンライン時にキャッシュされ、オフラインでも利用可能に)
  'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
  'https://cdn.jsdelivr.net/npm/toastify-js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
  // アイコン類があればここに追加（例: 'apple-touch-icon.png', 'icon-192.png'）
];

// インストール時に重要なファイルをプリキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// アクティベート時に古いキャッシュを削除
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

// フェッチ処理：キャッシュ優先 → ネットワーク（キャッシュ更新） → オフライン時キャッシュ使用
self.addEventListener('fetch', event => {
  // API呼び出し（Player2, OpenRouter, Geminiなど）はネットワークのみ（オフライン時はエラーになるが自然）
  if (event.request.url.includes('api.player2.game') || 
      event.request.url.includes('openrouter.ai') || 
      event.request.url.includes('generativelanguage.googleapis.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response('Offline - AI features unavailable')));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // キャッシュがあれば即返却（バックグラウンドで更新）
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
          }
        }).catch(() => {}); // ネットワーク失敗してもキャッシュ使用
        return cachedResponse;
      }

      // キャッシュなし → ネットワーク取得＆キャッシュ保存
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        // 完全オフラインで未キャッシュの場合のフォールバック（シンプルなメッセージ）
        if (event.request.destination === 'document') {
          return caches.match('index.html');
        }
        return new Response('Offline - Resource not cached yet', { status: 504 });
      });
    })
  );
});