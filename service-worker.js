// Service worker — Paie Cocottes.
// HTML en network-first (toujours la dernière version en ligne), reste en cache-first. Marche hors ligne.
const CACHE = "paie-cocottes-v3";
const FICHIERS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const estHTML = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html");
  if (estHTML) {
    // Network-first : la dernière version prime, cache en secours si hors ligne.
    e.respondWith(
      fetch(req).then((rep) => {
        if (rep.ok && url.origin === location.origin) { const clone = rep.clone(); caches.open(CACHE).then((c) => c.put(req, clone)); }
        return rep;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
    );
    return;
  }
  // Cache-first pour les assets statiques (icônes, manifest).
  e.respondWith(
    caches.match(req).then((hit) => hit ||
      fetch(req).then((rep) => {
        if (rep.ok && url.origin === location.origin) { const clone = rep.clone(); caches.open(CACHE).then((c) => c.put(req, clone)); }
        return rep;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
