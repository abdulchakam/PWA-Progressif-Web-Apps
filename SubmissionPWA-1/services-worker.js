const CACHE_NAME = "MAC-Dev v1.1";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/profile.html",
    "/pages/contact.html",
    "/pages/gallery.html",
    "/pages/home.html",
    "/materialize/css/materialize.min.css",
    "/materialize/css/style.css",
    "/materialize/js/materialize.min.js",
    "/materialize/js/nav.js",
    "/images/avatar.png",
    "/images/github.png",
    "/images/fb.png",
    "/images/wa.png",
    "/images/phone.png",
    "/images/location.png",
    "/images/ig.png",
    "/images/email.png",
    "/images/icon.png",
    "/images/1.jpeg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/foto.jpg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker : Gunakan Aset Dari Cache", response.url);
                    return response;
                }
                console.log(
                    "ServiceWorker : Memuat Aset Dari Server : ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

// Menghapus Cache yang Lama
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});