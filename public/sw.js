const CACHE_NAME = "cache-v1";
const assetToCache = [
  // "/",
  // "/saved",
  // "/login",
  // "/logout",
  // "/register",
  // "/contact",
  // "/history",
  "/css/style.css",
  "/scripts/script.js",
  "/imgs/Add color state 1.svg",
  "/imgs/Add color state 2.svg",
  "/imgs/Color Icon.svg",
  "/imgs/face-192.png",
  "/imgs/face.png",
  "/imgs/Light Icon.svg",
  "/imgs/Saturation Icon.svg",
  "/imgs/Save state 1.svg",
  "/imgs/Save state 2.svg",
  "/imgs/Undo state 1.svg",
  "/imgs/Undo state 2.svg",
  "/imgs/w-note.svg",
  "/imgs/x.svg"
];
self.addEventListener("install", function(event) {
  console.log("installing");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(assetToCache);
      })
      .catch(console.error)
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response; //return the matching entry found
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('push', function(e){
  
  var data = e.data.json();
  console.log(data);
  self.registration.showNotification(data.title,{
    // title: 'title',
    body:'notified by sw.js',
    icon: '/imgs/face-192.png'
  });
});