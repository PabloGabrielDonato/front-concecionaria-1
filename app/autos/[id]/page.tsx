"use client"

import { use, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchCarById } from "@/lib/api/cars-service"
import type { Car } from "@/lib/domain/models/car"
import { useMobile } from "@/hooks/use-mobile"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const handleContactClick = (phoneNumber: string, message: string) => {
  const formattedPhone = phoneNumber.replace(/\D/g, "");
  const currentUrl = window.location.href; // Obtiene la URL actual
  const fullMessage = `${message}\n\nPuedes ver más detalles aquí: ${currentUrl}`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(fullMessage)}`;
  window.open(whatsappUrl, "_blank");
};

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // Desenvuelve la promesa de `params`

  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const isMobile = useMobile()

  useEffect(() => {
    const loadCar = async () => {
      setLoading(true)
      try {
        const result = await fetchCarById(id) // Usa `id` directamente
          setCar(result)
              } catch (error) {
        console.error("Error fetching car details:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCar()
  }, [id])

  useEffect(() => {
    if (car) {
      document.title = `CPM Autos | ${car.brand_name} ${car.model}`
    }
  }, [car])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-2 border-white rounded-full border-t-transparent"></div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-xl mb-4">Auto no encontrado</p>
        <Link href="/autos">
          <Button>Volver a la lista</Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="flex flex-col pb-8 md:pb-0">
      {isMobile && (
        <div className="flex items-center p-4 bg-black bg-opacity-80 backdrop-blur-md">
          <div className="flex w-1/3">
          <Link href="/autos">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          </div>
          <Link href="/" className="flex items-center justify-center w-1/3">
          <div className="relative h-8">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-full object-contain"
            />
          </div>
        </Link>
        <span className="p-8 flex w-1/3"/>
      </div>
      )}

      <div className="p-4 space-y-6 md:container md:mx-auto md:pt-8">
        <h1 className="text-2xl font-light uppercase mb-4 md:text-3xl">
          {car.brand_name} {car.model}
          <p className="text-sm text-gray-400">
            {car.version} • {car.year} • {car.bodywork}
          </p>
        </h1>

        <div className="md:flex md:gap-8">
          <div className="md:w-3/5">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-6">
              <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
                {car.images.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3]">
                    <Image
                      src={image || "/placeholder.svg?height=400&width=600"}
                      alt={`${car.model} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="md:w-2/5">
            <div className="clean-card rounded-lg p-5 space-y-6">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
                <div>
                  <p className="text-gray-400 text-sm">Marca</p>
                  <p className="font-medium">{car.brand_name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Versión</p>
                  <p className="font-medium">{car.version}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Año</p>
                  <p className="font-medium">{car.year}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Carrocería</p>
                  <p className="font-medium">{car.bodywork}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Modelo</p>
                  <p className="font-medium">{car.model}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Kilometraje</p>
                  <p className="font-medium">{car.mileage_at_sale.toLocaleString()} km</p>
                </div>
              </div>

              <div className="pt-2 bg-slate-900 bg-opacity-10 backdrop-blur-md rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-3xl font-semibold mb-1">$ {parseInt(car.sale_price).toLocaleString()}</h2>
                <p className="text-xs text-gray-500">Precio sujeto a modificación</p>
              </div>
            </div>

            <Button
              className="w-full bg-white hover:bg-gray-200 text-black py-6 rounded-lg my-6 transition-colors"
              onClick={() =>
                handleContactClick(
                  "+54 9 11 7368-2567",
                  `Hola, estoy interesado en el ${car.brand_name} ${car.model} (${car.year}) que aparece en su catálogo.`
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Contáctanos
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

