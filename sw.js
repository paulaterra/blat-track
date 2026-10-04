const CACHE='blat-al-dia-v18';
const ASSETS=['./','./index.html','./styles.css?v=19','./config.js?v=18','./app.js?v=18','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const dynamic=u.pathname.endsWith('/')||u.pathname.endsWith('.html')||u.pathname.endsWith('.css')||u.pathname.endsWith('.js');
  if(dynamic){
    e.respondWith(fetch(e.request).then(resp=>{const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return resp}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return resp})));
});
