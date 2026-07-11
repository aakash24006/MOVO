'use client'

import { useEffect, useState } from 'react'

import {

  MapContainer,
  TileLayer,
  Marker,
  Popup

} from 'react-leaflet'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

import { useMap } from 'react-leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'

})



export default function StoreMap() {

  const [mounted, setMounted] = useState(false)

  const [userPosition, setUserPosition] = useState([48.1351, 11.5820])

  const [stores, setStores] = useState([])

  function RecenterMap({ position }) {

  const map = useMap()

  useEffect(() => {

    map.setView(position, 14)

  }, [position, map])

  return null

}

  useEffect(() => {

    console.log('StoreMap mounted')

    setMounted(true)

    navigator.geolocation.getCurrentPosition(

      async (position) => {

  const lat = position.coords.latitude
  const lng = position.coords.longitude

  console.log('Latitude:', lat)
console.log('Longitude:', lng)

setUserPosition([lat, lng])

try {

  const response = await fetch('/api/stores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lat,
      lng
    })
  })

  const data = await response.json()

  console.log('Elements:', data.elements)

  const supermarketNames = [
    'Lidl',
    'ALDI',
    'Netto',
    'Kaufland',
    'REWE',
    'EDEKA',
    'PENNY',
    'Norma'
  ]

  const realStores = (data.elements || [])
    .filter((store) => {
      const name = store.tags?.name || ''

      return supermarketNames.some((market) =>
        name.toLowerCase().includes(market.toLowerCase())
      )
    })
    .map((store) => ({
      id: store.id,
      name: store.tags?.name,
      lat: store.lat || store.center?.lat,
      lon: store.lon || store.center?.lon
    }))

  console.log('Filtered stores:', realStores)

  setStores(realStores)

} catch (error) {

  console.error('FETCH ERROR:', error)

}},

    )

  }, [])

  if (!mounted) return null

  return (

    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5">

      <h2 className="text-3xl font-black text-[#34d399] mb-5">

        Nearby Stores

      </h2>

      <div className="overflow-hidden rounded-lg">

        <MapContainer

        

          center={userPosition}

          zoom={13}

          scrollWheelZoom={true}

          style={{
            height: '320px',
            width: '100%'
          }}
        >
          <RecenterMap position={userPosition} />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={userPosition}>

            <Popup>

              <div className="text-black font-semibold">

                You are here

              </div>

            </Popup>

          </Marker>

        {stores.map((store) => (

  <Marker
    key={store.id}
    position={[store.lat, store.lon]}
  >

    <Popup>

      <div className="text-black">

        <p className="font-bold">
          {store.name}
        </p>

        <button
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lon}`,
              '_blank'
            )
          }
          className="
            mt-2
            px-3
            py-1
            bg-green-500
            text-white
            rounded
          "
        >
          Navigate
        </button>

      </div>

    </Popup>

  </Marker>

))}

        </MapContainer>

      </div>

    </div>

  )

}