console.log('started')

const startedAt = new Date()


addEventListener("fetch", (event) => {
  const response = new Response(JSON.stringify({
    status: "✅ Started!",
    startedAt,
    upTime: ((new Date().getTime() - startedAt.getTime()) / 1000*60*60).toFixed(1) + 'h.'
  }), { headers: { "content-type": "application/json" } })
  
  event.respondWith(response)
})
