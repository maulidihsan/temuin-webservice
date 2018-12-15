var dataCacheName = 'weatherData-v1';
var cacheName = 'temuin-ch';
var filesToCache = [
  '/',
  '/public/js/dist/main.js',
  '/public/js/dist/app.js',
  '/public/css/style.css',
  '/public/img/LogoWhite.png',
  '/public/img/LogoWhite.png',
  '/public/img/user.png',
  '/public/css/uikit.min.css',
  '/public/css/vuetify.min.css',
  '/public/font/Gibson-Regular.ttf',
  '/public/font/Gibson-RegularItalic.ttf',
  '/public/font/NexaBold.otf'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      for(var i = 0; i < filesToCache.length; i++){
        cache.add(filesToCache[i]);
      }
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});
