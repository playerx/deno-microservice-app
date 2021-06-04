
const startedAt = new Date()

console.log('✅ Microservice started', startedAt)


addEventListener("fetch", (event) => {
  console.log('WEBHOOK', event.request.url)
  
//   const response = new Response(JSON.stringify({
//     startedAt,
//     request: event.request,
//     upTime: ((new Date().getTime() - startedAt.getTime()) / 1000*60*60*24).toFixed(1) + 'h.'
//   }), { headers: { "content-type": "application/json" } })
  
  event.respondWith(new Response('vc_success'))
})
