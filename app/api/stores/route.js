export async function POST(req) {

  try {

    const { lat, lng } = await req.json()
const query = `
[out:json];
(
  node["shop"](around:10000,${lat},${lng});
  way["shop"](around:10000,${lat},${lng});
);
out center;
`

    const response = await fetch(
  'https://overpass.kumi.systems/api/interpreter',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'User-Agent': 'MOVO/1.0'
    },
    body: query
  }
)

    const text = await response.text()

console.log('OVERPASS RESPONSE:')
console.log(text)

const data = JSON.parse(text)

    return Response.json(data)

  } catch (error) {

    console.error(error)

    return Response.json(
      { error: error.message },
      { status: 500 }
    )

  }

}