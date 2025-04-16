"use client"

import { useEffect, useState } from "react"
import { fetchCars, getCars } from "@/lib/api/cars-service"
import type { Car } from "@/lib/domain/models/car"
import Image from "next/image"
import Link from "next/link"
import WhatsAppFab from "@/components/whatsapp-fab"
import Header from "@/components/header"
import DesktopBanner from "@/components/desktop-banner"

export default function Home() {
  const [latestCars, setLatestCars] = useState<Car[]>([])
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    async function loadCars() {
      await fetchCars()
      const cars = getCars()
      setLatestCars(cars.slice(-3)) // Obtén los últimos 3 autos

      // Extraer marcas únicas de los autos y filtrar las que contengan símbolos, puntos o espacios
      const uniqueBrands = Array.from(
        new Set(cars.map((car) => car.brand_name))
      ).filter((brand) => /^[a-zA-Z]+$/.test(brand)) // Solo marcas con letras
      setBrands(uniqueBrands)
    }
    loadCars()
  }, [])

  // Función para capitalizar la primera letra de una marca
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

  return (
    <main className="flex flex-col min-h-screen pb-16 md:pb-0">
      <div className="md:hidden">
        <Header />
      </div>

      <div className="p-4 space-y-8 md:pt-8 md:container md:mx-auto">
        <DesktopBanner />
        
        <div className="space-y-8">
          <div className="clean-card rounded-lg p-6">
            <div className="flex gap-3 justify-around overflow-x-auto pb-2 ">
              {brands.map((brand) => (
                <Link
                  key={brand}
                  href={`/autos?marca=${brand}`}
                  className="
                    group
                    flex flex-col
                    items-center
                    justify-center
                    w-20 h-20
                    flex-shrink-0
                    bg-black bg-opacity-40
                    rounded-full
                    border-2 border-amber-500
                    text-[0.65rem] whitespace-nowrap 
                    hover:bg-amber-500 hover:text-black transition-colors"
                >
                  <Image
                    src={`/logos-marcas/${brand.toLowerCase()}.svg`}
                    alt={`Logo de ${brand}`}
                    width={40}
                    height={40}
                    className="filter invert group-hover:invert-0 max-h-10 min-h10"
                  />
                  {capitalize(brand)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">Ultimos ingresos</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/autos/${car.id}`}
                  className="block clean-card rounded-lg overflow-hidden subtle-hover"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={car.images[0] || "/placeholder.jpg"} // Usa una imagen por defecto si no hay imagen
                      alt={`Imagen de ${car.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{`${car.brand_name} ${car.model}`}</h3>
                    <p className="text-gray-400 text-sm">{`${car.version} • ${car.model} • ${car.year}`}</p>
                    <p className="font-medium mt-2">{`$${car.sale_price.toLocaleString()}`}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WhatsAppFab phoneNumber="+54 9 11 7368-2567" message="Hola, estoy interesado en conocer más sobre sus vehículos" />
    </main>
  )
}

