'use client'

import { useEffect, useState } from 'react'

export default function NearbyStores() {

  const [stores, setStores] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      try {

        const lat = position.coords.latitude
        const lon = position.coords.longitude

        console.log('Location:', lat, lon)

const response = await fetch('/api/stores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ lat, lng: lon })
})

const data = await response.json()

console.log('Stores:', data.elements)

const supermarkets = data.elements.filter(
  item =>
    item.tags?.shop === 'supermarket'
)

setStores(supermarkets)

setLoading(false)

      } catch (error) {

        console.log(error)

      }

    },

    (error) => {

      console.log(error)

    }

  )

}, [])

if (loading) {

  return (

    <div className="text-center py-10">

      <p className="text-slate-400">
        Finding nearby supermarkets...
      </p>

    </div>

  )

}

  return (

    <div className="space-y-4">

  {stores.slice(0, 5).map((store, index) => (

    <div
      key={store.id}
      className="
        bg-white/[0.04] backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-5
        flex items-center justify-between
        hover:border-[#34d399]
        hover:scale-[1.01]
        transition-all duration-300
      "
    >

      <div>

        <h4 className="text-lg font-bold">
          {store.tags?.name || 'Supermarket'}
        </h4>

        <p className="text-slate-400 text-sm">
          Recovery products available
        </p>

      </div>

      <div className="text-right">

        <p className="text-[#34d399] font-bold">
          {(0.8 + index * 0.5).toFixed(1)} km
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
    px-4
    py-2
    rounded-xl
    bg-[#34d399]
    text-black
    font-bold
    hover:scale-105
    transition-all
  "
>
  Navigate
</button>

      </div>

    </div>

  ))}

</div>
  )

}
