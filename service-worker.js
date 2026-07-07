// Service worker — Paie Cocottes. Cache-first : l'app marche même sans réseau.
const CACHE = "paie-cocottes-v1";
const FICHIERS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((hit) => hit ||
      fetch(e.request).then((rep) => {
        if (e.request.method === "GET" && rep.ok && new URL(e.request.url).origin === location.origin) {
          const clone = rep.clone(); caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return rep;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
