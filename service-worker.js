const CACHE_NAME = "todo-cache-v1";

const urlsToCache = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
self.addEventListener('sync', event => {
  if (event.tag === 'sync-tasks') {
    console.log("Syncing tasks...");
  }
});