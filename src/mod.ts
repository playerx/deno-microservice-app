
const startedAt = new Date()

console.log('✅ Microservice started', startedAt)


addEventListener("fetch", (event) => {
  console.log('received event', event)
  
  const response = new Response(JSON.stringify({
    startedAt,
    upTime: ((new Date().getTime() - startedAt.getTime()) / 1000*60*60*24).toFixed(1) + 'h.'
  }), { headers: { "content-type": "application/json" } })
  
  event.respondWith(response)
})
