"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useSearchParams, useRouter } from "next/navigation"
import { fetchCars, fetchBodyTypes } from "@/lib/api/cars-service"
import type { Car } from "@/lib/domain/models/car"
import WhatsAppFab from "@/components/whatsapp-fab"
import { useMobile } from "@/hooks/use-mobile"

export default function AutosPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isMobile = useMobile()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([15000000, 29000000])

  // Update state to handle arrays of selected values
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [bodyTypes, setBodyTypes] = useState<string[]>([])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])

  const brands = ["Alfa Romeo", "Audi", "BMW", "Chevrolet", "Nissan", "Toyota"]

  // Parse URL parameters on initial load
  useEffect(() => {
    const marcaParam = searchParams.getAll("marca")
    const carroceriaParam = searchParams.getAll("carroceria")

    if (marcaParam.length > 0) {
      setSelectedBrands(marcaParam)
    }

    if (carroceriaParam.length > 0) {
      setSelectedBodyTypes(carroceriaParam)
    }
  }, [searchParams])

  useEffect(() => {
    // Cargar tipos de carrocería
    const loadBodyTypes = async () => {
      try {
        const types = await fetchBodyTypes()
        setBodyTypes(types)
      } catch (error) {
        console.error("Error fetching body types:", error)
      }
    }

    loadBodyTypes()
  }, [])

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true)
      try {
        // Fetch cars with no brand filter if none selected, otherwise filter by the selected brands
        const result = await fetchCars({
          brand: selectedBrands.length > 0 ? selectedBrands[0] : null, // API only supports one brand for now
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          yearFrom: 2010,
          bodyType: selectedBodyTypes.length > 0 ? selectedBodyTypes[0] : null, // API only supports one body type for now
        })

        // Client-side filtering for multiple brands and body types
        const filteredCars = result.filter((car) => {
          // If no brands selected, include all cars
          const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(car.brand)

          // If no body types selected, include all cars
          const bodyTypeMatch = selectedBodyTypes.length === 0 || selectedBodyTypes.includes(car.bodyType)

          return brandMatch && bodyTypeMatch
        })

        setCars(filteredCars)
      } catch (error) {
        console.error("Error fetching cars:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [selectedBrands, priceRange, selectedBodyTypes])

  const handleBrandSelect = (brand: string) => {
    let newSelectedBrands: string[]

    if (selectedBrands.includes(brand)) {
      // Remove brand if already selected
      newSelectedBrands = selectedBrands.filter((b) => b !== brand)
    } else {
      // Add brand if not already selected
      newSelectedBrands = [...selectedBrands, brand]
    }

    setSelectedBrands(newSelectedBrands)
    updateUrlParams(newSelectedBrands, selectedBodyTypes)
  }

  const handleBodyTypeSelect = (bodyType: string) => {
    let newSelectedBodyTypes: string[]

    if (selectedBodyTypes.includes(bodyType)) {
      // Remove body type if already selected
      newSelectedBodyTypes = selectedBodyTypes.filter((b) => b !== bodyType)
    } else {
      // Add body type if not already selected
      newSelectedBodyTypes = [...selectedBodyTypes, bodyType]
    }

    setSelectedBodyTypes(newSelectedBodyTypes)
    updateUrlParams(selectedBrands, newSelectedBodyTypes)
  }

  // Helper function to update URL parameters
  const updateUrlParams = (brands: string[], bodyTypes: string[]) => {
    const params = new URLSearchParams()

    // Add each brand as a separate marca parameter
    brands.forEach((brand) => {
      params.append("marca", brand)
    })

    // Add each body type as a separate carroceria parameter
    bodyTypes.forEach((bodyType) => {
      params.append("carroceria", bodyType)
    })

    router.push(`/autos${params.toString() ? `?${params.toString()}` : ""}`)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedBodyTypes([])
    setPriceRange([15000000, 29000000])
    router.push("/autos")
  }

  return (
    <main className="flex flex-col min-h-screen pb-16 md:pb-0">
      {isMobile && (
        <div className="flex items-center p-4 bg-black bg-opacity-80 backdrop-blur-md">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/" className="flex items-center justify-center w-full">
            <div className="relative h-8">
              <span className="gold-gradient text-xl">GPM</span>
            </div>
          </Link>
        </div>
      )}

      <div className="p-4 space-y-6 md:container md:mx-auto md:pt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-light mb-6 md:text-3xl md:block">Catálogo de Autos</h1>

          {(selectedBrands.length > 0 || selectedBodyTypes.length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
              Limpiar filtros
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="clean-card rounded-lg p-5 space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-3">Marca:</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedBrands.includes(brand)
                      ? "bg-white text-black"
                      : "bg-black bg-opacity-40 hover:bg-opacity-60"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {selectedBrands.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                <p className="text-xs text-gray-400">Seleccionados:</p>
                {selectedBrands.map((brand) => (
                  <span key={brand} className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center">
                    {brand}
                    <button onClick={() => handleBrandSelect(brand)} className="ml-1 text-gray-400 hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-3">Precio:</p>
            <div className="px-2">
              <Slider
                defaultValue={priceRange}
                value={priceRange}
                min={5000000}
                max={50000000}
                step={1000000}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>${(priceRange[0] / 1000000).toFixed(1)}M</span>
                <span>${(priceRange[1] / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-3">Carrocería:</p>
            <div className="flex flex-wrap gap-2">
              {bodyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleBodyTypeSelect(type)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedBodyTypes.includes(type)
                      ? "bg-white text-black"
                      : "bg-black bg-opacity-40 hover:bg-opacity-60"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {selectedBodyTypes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                <p className="text-xs text-gray-400">Seleccionados:</p>
                {selectedBodyTypes.map((type) => (
                  <span key={type} className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center">
                    {type}
                    <button onClick={() => handleBodyTypeSelect(type)} className="ml-1 text-gray-400 hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-8 w-8 border-2 border-white rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-6 mt-6">
            {cars.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <Link
                    key={car.id}
                    href={`/autos/${car.id}`}
                    className="block clean-card rounded-lg overflow-hidden subtle-hover"
                  >
                    <div className="relative">
                      <div className="aspect-[4/3] relative rounded-t-lg overflow-hidden">
                        <Image
                          src={car.imageUrl || "/placeholder.svg?height=300&width=400"}
                          alt={car.model}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded">
                        <p className="text-white font-medium">${car.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {car.engine} • {car.year} • {car.bodyType}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 clean-card rounded-lg">
                <p>No se encontraron autos con estos filtros</p>
              </div>
            )}
          </div>
        )}
      </div>

      <WhatsAppFab phoneNumber="+123456789" message="Hola, estoy interesado en conocer más sobre sus vehículos" />
    </main>
  )
}

