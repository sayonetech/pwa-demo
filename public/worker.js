// Flag for enabling cache in production
var doCache = true;
var CACHE_NAME = 'pwa-app-cache';
// Delete old caches
self.addEventListener('activate', event => {
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        }))
      )
  );
});
// This triggers when user starts the app
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          fetch('asset-manifest.json')
            .then(response => {
              // response.json();
              console.log("response", response);
              const urlsToCache = [
                '/',
                // assets['main.js']
                response.url['main.js']
              ];
              cache.addAll(urlsToCache);
            })
            // .then(assets => {
            //   console.log(assets);
            //   // We will cache initial page and the main.js
            //   // We could also cache assets like CSS and images
            //   const urlsToCache = [
            //     '/',
            //     // assets['main.js']
            //     response.url['main.js']
            //   ];
            //   cache.addAll(urlsToCache);
            // })
        })
    );
  }
});


self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

    }).catch(function(error) {

      return caches.match('index.html');

    })
  );
});
