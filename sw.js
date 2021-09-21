const CACHE_NAME_CORE = 'cache-v1';
const CACHE_FILES_CORE =[
    'img/iconoBeankeeper.svg',
    'css/errores.css',
    'css/style.css',
    'index.html',
    'img/logoJU.svg',
    '/',
    'favicon/favicon.ico',
    'errores/pag404.html',
    'errores/pag403.html',
    'errores/pag500.html',
    'img/iconoTopOffice.svg',
    'img/persona.svg',
    'img/telefono.svg'
];

const CACHE_NAME_DYNAMIC = 'dynamic-v1';

const CACHE_NAME_INMUTABLE = 'inmutable-v1';
const CACHE_FILES_INMUTABLE =[
    'https://kit.fontawesome.com/55c5a64615.js'
];

self.addEventListener('install', (event) => {
    const guardandoCache = caches.open(CACHE_NAME_CORE)
    .then(cache => cache.addAll(CACHE_FILES_CORE))
    .catch(err => console.error(err.message));
    const guardandoCacheInmutable = caches.open(CACHE_NAME_INMUTABLE)
    .then(cache => cache.addAll(CACHE_FILES_INMUTABLE))
    .catch(err => console.error(err.message));
    self.skipWaiting();
    event.waitUntil(Promise.all([guardandoCache, guardandoCacheInmutable]));
});
self.addEventListener('activate', (event) => {
    //eliminando caches obsoletos
    const obtenerCaches = caches.keys()
        .then(allCaches => allCaches.filter(cache => ![CACHE_NAME_CORE, CACHE_NAME_INMUTABLE, CACHE_NAME_DYNAMIC].includes(cache)).filter(cacheName => caches.delete(cacheName)))
        .catch(err => console.error(err.message))
    console.info('[SW] Cache limpiado exitosamente...');
    event.waitUntil(obtenerCaches);
});
self.addEventListener('fetch', (event) => {
    if(!(event.request.url.indexOf('http')===0)){
        return;
    }

    //primera estrategia: solo cache
    /* const soloCache = caches.match(event.request);
    event.respondWith(soloCache); */

    //segunda estrategia: solo red
    /* const soloRed = fetch(event.request);
    event.respondWith(soloRed); */

    /* //tercera estrategia: cache pidiendo ayuda a red
    const cacheAyudaRed = caches.match(event.request)
        .then(page => page || fetch(event.request)); //si es que no hay en cache, pide a red
    event.respondWith(cacheAyudaRed); */

    /*const cacheAyudaRed = caches.match(event.request)
        .then(page => page || fetch(event.request)
        .then(eventRequest => {
            return caches.open(CACHE_NAME_DYNAMIC).then(cache => {
                if(![].concat(CACHE_FILES_CORE, CACHE_FILES_INMUTABLE).indexOf(event.request.url) || eventRequest.type==='opaque'){
                    cache.put(event.request,eventRequest.clone())
                }
                return eventRequest;
            })
        }));
        event.respondWith(cacheAyudaRed);
        console.log("[SW] Archivos guardados..")*/

    //cuarta estrategia: red pidiendo ayuda a cache
    /* const respuesta = new Response("Esta es la parte que fallo");
    const redAyudaCache = fetch(event.request)
        .then(page => page)
        .catch(murioInternet => {
            return caches.math(event.request)
                .then(archivoBuscado => archivoBuscado.status !== 200)
                .catch(archivo => respuesta);
        });
    event.respondWith(redAyudaCache); */

    //estrategia final: cache y luego red
    const chaceLuegoRed = caches.open(CACHE_NAME_DYNAMIC)
        .then(cache => {
            return fetch(event.request)
                .then(response =>{
                    if(![].concat(CACHE_FILES_CORE, CACHE_FILES_INMUTABLE).indexOf(event.request.clone().url)){
                        cache.put(event.request,response.clone());
                    }
                    return response;
                })
        });
        event.respondWith(chaceLuegoRed);
        console.log("SW archivos guardados");
});