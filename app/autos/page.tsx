"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useSearchParams, useRouter } from "next/navigation"
import { fetchCars, setCars, getCars } from "@/lib/api/cars-service"
import type { Car } from "@/lib/domain/models/car"
import WhatsAppFab from "@/components/whatsapp-fab"
import { useMobile } from "@/hooks/use-mobile"
import Fuse from "fuse.js"; // Importar Fuse.js

const capitalize = (text: string) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function AutosPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isMobile = useMobile()
  const [cars, setCarsState] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, Infinity]) // Cambiar el rango inicial

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])

  const [brands, setBrands] = useState<string[]>([])
  const [bodyTypes, setBodyTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>(""); // Estado inicial vacío
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true)
      try {
        // Load all cars without filters
        const result = await fetchCars({})
        const carsData = result
        setCarsState(carsData) // Initially display all cars

        // Extract unique brands and body types
        const uniqueBrands: string[] = Array.from(new Set(carsData.map((car: Car) => car.brand_name)))
        const uniqueBodyTypes: string[] = Array.from(new Set(carsData.map((car: Car) => car.bodywork)))

        setBrands(uniqueBrands)
        setBodyTypes(uniqueBodyTypes)

        // Apply filters based on URL parameters
        const marcaParam = searchParams.getAll("marca")
        const carroceriaParam = searchParams.getAll("carroceria")

        // Update selected brands and body types from URL parameters
        setSelectedBrands(marcaParam)
        setSelectedBodyTypes(carroceriaParam)

        if (marcaParam.length > 0 || carroceriaParam.length > 0) {
          const filteredCars = carsData.filter((car) => {
            const matchesBrand = marcaParam.length === 0 || marcaParam.includes(car.brand_name)
            const matchesBodyType = carroceriaParam.length === 0 || carroceriaParam.includes(car.bodywork)
            return matchesBrand && matchesBodyType
          })
          setCarsState(filteredCars)
        }
      } catch (error) {
        console.error("Error fetching cars:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [searchParams])

  useEffect(() => {
    // Crear un nuevo array con un campo combinado de marca y modelo
    const carsWithCombinedFields = getCars().map((car) => ({
      ...car,
      combinedField: `${car.brand_name} ${car.model}`.toLowerCase(), // Campo combinado
    }));

    // Configuración de Fuse.js
    const fuse = new Fuse(carsWithCombinedFields, {
      keys: ["combinedField"], // Buscar en el campo combinado
      threshold: 0.3, // Margen de error permitido
    });

    // Filtrar autos con Fuse.js solo si hay texto en el buscador
    const filteredCars = searchText
      ? fuse.search(searchText).map((result) => result.item)
      : carsWithCombinedFields; // Si no hay texto, usa todos los autos

    // Aplicar otros filtros (marca, carrocería, precio)
    const finalFilteredCars = filteredCars.filter((car) => {
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand_name);
      const matchesBodyType = selectedBodyTypes.length === 0 || selectedBodyTypes.includes(car.bodywork);
      const matchesPrice = car.sale_price >= priceRange[0] && car.sale_price <= priceRange[1];
      return matchesBrand && matchesBodyType && matchesPrice;
    });

    const sortedCars = sortCars(finalFilteredCars, sortBy);
    setCarsState(sortedCars);
  }, [selectedBrands, selectedBodyTypes, priceRange, sortBy, searchText]); // Agregar searchText como dependencia

  const sortCars = (cars: Car[], criterion: string) => {
    switch (criterion) {
      case "price":
        return [...cars].sort((a, b) => a.sale_price - b.sale_price)
      case "brand":
        return [...cars].sort((a, b) => a.brand_name.localeCompare(b.brand_name))
      case "added":
        return [...cars].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      case "mileage":
        return [...cars].sort((a, b) => a.mileage - b.mileage)
      default:
        return cars
    }
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }

  const handleBrandSelect = (brand: string) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]

    setSelectedBrands(newSelectedBrands)
    updateUrlParams(newSelectedBrands, selectedBodyTypes)
  }

  const handleBodyTypeSelect = (bodyType: string) => {
    const newSelectedBodyTypes = selectedBodyTypes.includes(bodyType)
      ? selectedBodyTypes.filter((b) => b !== bodyType)
      : [...selectedBodyTypes, bodyType]

    setSelectedBodyTypes(newSelectedBodyTypes)
    updateUrlParams(selectedBrands, newSelectedBodyTypes)
  }

  const updateUrlParams = (brands: string[], bodyTypes: string[]) => {
    const params = new URLSearchParams()

    brands.forEach((brand) => params.append("marca", brand))
    bodyTypes.forEach((bodyType) => params.append("carroceria", bodyType))

    router.push(`/autos${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedBodyTypes([])
    setPriceRange([2000000, Infinity])
    setSearchText("")
    router.push("/autos")
  }

  return (
    <main className="flex flex-col min-h-screen pb-16 md:pb-0">
    
      {isMobile && (
        <div className="flex items-center p-4 bg-black bg-opacity-80 backdrop-blur-md">
          <div className="flex w-1/3">
          <Link href="/">
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl mb-1 md:text-3xl md:block font-extrabold">Catálogo de Autos</h1>

          <div className="flex items-center space-x-4">
            {(selectedBrands.length > 0 || selectedBodyTypes.length > 0) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
                Limpiar filtros
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}

            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-black text-white px-4 py-2 rounded-sm"
            >
              <option value="" disabled>
                Ordenar vehículos
              </option>
              <option value="price">Ordenar por Precio</option>
              <option value="brand">Ordenar por Marca</option>
              <option value="added">Ordenar por Añadido</option>
              <option value="mileage">Ordenar por Kilometraje</option>
            </select>

            
          </div>
        </div>

        <div className="clean-card rounded-lg p-5 space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-3">Buscar:</p>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar por marca o modelo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
                  {capitalize(brand)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-3">Precio:</p>
            <div className="px-2">
              <Slider
                defaultValue={priceRange}
                value={priceRange}
                min={0}
                max={100000000} // Máximo del slider
                step={1000000}
                onValueChange={(value) => {
                  // Si el valor máximo del slider es alcanzado, establece Infinity
                  setPriceRange([value[0], value[1] === 100000000 ? Infinity : value[1]]);
                }}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{priceRange[0] === 0 ? "Sin mínimo" : `$${(priceRange[0] / 1000000).toFixed(1)}M`}</span>
                <span>{priceRange[1] === Infinity ? "Sin límite" : `$${(priceRange[1] / 1000000).toFixed(1)}M`}</span>
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
                  {capitalize(type)}
                </button>
              ))}
            </div>
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
                          src={car.images[0] || "/placeholder.svg?height=300&width=400"}
                          alt={car.model}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded">
                        <p className="text-white font-medium">${parseInt(car.sale_price).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg">
                        {car.brand_name} {car.model}
                        <span className="font-light text-sm text-gray-500 ml-4">
                          {car.mileage_at_sale.toLocaleString()} km
                        </span>
                      </h3>
                      <p className="text-sm text-gray-400">
                        {car.version} • {car.year} • {car.bodywork}
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

      <WhatsAppFab phoneNumber="+54 9 11 7368-2567" message="Hola, estoy interesado en conocer más sobre sus vehículos" />
    </main>
  )
}

