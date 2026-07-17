export async function POST(req) {
  const { lat, lng } = await req.json()

  const query = `
[out:json][timeout:25];
(
  node["shop"="supermarket"](around:5000,${lat},${lng});
  way["shop"="supermarket"](around:5000,${lat},${lng});
);
out center;
`

  // Try multiple Overpass mirrors; use whichever answers first
  const mirrors = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  ]

  for (const url of mirrors) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 12000) // 12s cap

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain', 'User-Agent': 'MOVO/1.0' },
        body: query,
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (!response.ok) continue          // try next mirror on 406/429/5xx
      const data = await response.json()
      return Response.json(data)          // success — return immediately
    } catch (err) {
      console.error(`Overpass mirror failed (${url}):`, err.message)
      continue                            // timeout/network — try next mirror
    }
  }

  // All mirrors failed
  return Response.json({ elements: [] }, { status: 200 })
}
