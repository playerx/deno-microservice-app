import { createHash } from "https://deno.land/std@0.97.0/hash/mod.ts";

const startedAt = new Date()

console.log('✅ Microservice started', startedAt)


addEventListener("fetch", (event) => {
  console.log('WEBHOOK', event.request.url)
  
  var t = new URL(event.request.url)
  
  const id = t.searchParams.get('id')
  const deviceId = t.searchParams.get('uid')
  const amount = t.searchParams.get('amount')
  const currency = t.searchParams.get('currency')
  const customId = t.searchParams.get('custom_id')
  const zoneId = t.searchParams.get('zone')
  const verifier = t.searchParams.get('verifier')
  
  const secret = {
    'vz7d670a134e7f4077b5': 'v4vc3d439dec4188415d9f',
    'vze9b314abc8804a54ac': 'v4vc3d439dec4188415d9f',
  }[zoneId]
  
  if (!secret) {
    console.log('secret not found', zoneId)
    event.respondWith(new Response('vc_decline'))
    return
  }
  
  const checkString = `${id}${deviceId}${amount}${currency}${secret}${customId}`
  
  const hash = createHash("md5");
  
  hash.update(checkString)
  
  const checkHash = hash.toString()
  if (checkHash !== verifier) {
    console.log('check failed', checkString, checkHash, verifier)
    event.respondWith(new Response('vc_decline'))
    return
  }
  
  console.log('SUCCESS! TOKENS GIVEN', currency, amount, customId)
  
  event.respondWith(new Response('vc_success'))
})
