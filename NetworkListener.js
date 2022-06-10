self.addEventListener("fetch", function(e){
    console.log("se solicito algo");
    e.respondWith(new Response("Hola mundo"));
});