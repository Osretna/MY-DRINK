const CACHE_NAME = 'buffet-v' + Date.now(); // تغيير الاسم عند كل تحديث

self.addEventListener('install', (event) => {
    self.skipWaiting(); // إجبار السيرفس وركر الجديد على التفعيل فوراً
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache); // مسح الكاش القديم تماماً
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request)); // اسحب دائماً من الشبكة أولاً
});