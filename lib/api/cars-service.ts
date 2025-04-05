import type { Car } from "@/lib/domain/models/car"

// Mock data for cars
const mockCars: Car[] = [
  {
    id: "1",
    brand: "Chevrolet",
    model: "Cruze",
    year: 2019,
    price: 18989900,
    engine: "1.8 LT",
    bodyType: "Sedan",
    imageUrl: "/placeholder.svg?height=300&width=400",
    description:
      "Chevrolet Cruze 1.8 LT, excelente estado, único dueño, mantenciones al día, aire acondicionado, dirección asistida, cierre centralizado, alzavidrios eléctricos.",
    features: [
      "Aire acondicionado",
      "Dirección asistida",
      "Cierre centralizado",
      "Alzavidrios eléctricos",
      "Airbags",
      "Frenos ABS",
      "Bluetooth",
      "Cámara de retroceso",
    ],
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    price: 21500000,
    engine: "1.8 XEI",
    bodyType: "Sedan",
    imageUrl: "/placeholder.svg?height=300&width=400",
    description: "Toyota Corolla 1.8 XEI, excelente estado, único dueño, mantenciones al día en concesionario oficial.",
    features: [
      "Aire acondicionado",
      "Dirección asistida",
      "Cierre centralizado",
      "Alzavidrios eléctricos",
      "Airbags",
      "Frenos ABS",
      "Bluetooth",
      "Cámara de retroceso",
    ],
  },
  {
    id: "3",
    brand: "Nissan",
    model: "Qashqai",
    year: 2021,
    price: 25990000,
    engine: "2.0 Advance",
    bodyType: "SUV",
    imageUrl: "/placeholder.svg?height=300&width=400",
    description:
      "Nissan Qashqai 2.0 Advance, excelente estado, único dueño, mantenciones al día en concesionario oficial.",
    features: [
      "Aire acondicionado",
      "Dirección asistida",
      "Cierre centralizado",
      "Alzavidrios eléctricos",
      "Airbags",
      "Frenos ABS",
      "Bluetooth",
      "Cámara de retroceso",
    ],
  },
  {
    id: "4",
    brand: "BMW",
    model: "X3",
    year: 2022,
    price: 45990000,
    engine: "2.0 xDrive",
    bodyType: "SUV",
    imageUrl: "/placeholder.svg?height=300&width=400",
    description: "BMW X3 2.0 xDrive, excelente estado, único dueño, mantenciones al día en concesionario oficial.",
    features: [
      "Aire acondicionado",
      "Dirección asistida",
      "Cierre centralizado",
      "Alzavidrios eléctricos",
      "Airbags",
      "Frenos ABS",
      "Bluetooth",
      "Cámara de retroceso",
    ],
  },
  {
    id: "5",
    brand: "Audi",
    model: "A3",
    year: 2021,
    price: 32990000,
    engine: "1.4 TFSI",
    bodyType: "Hatchback",
    imageUrl: "/placeholder.svg?height=300&width=400",
    description: "Audi A3 1.4 TFSI, excelente estado, único dueño, mantenciones al día en concesionario oficial.",
    features: [
      "Aire acondicionado",
      "Dirección asistida",
      "Cierre centralizado",
      "Alzavidrios eléctricos",
      "Airbags",
      "Frenos ABS",
      "Bluetooth",
      "Cámara de retroceso",
    ],
  },
  {
    id: "6",
    brand: "Alfa Romeo",
    model: "Giulia",
    year: 2020,
    price: 38990000,
    engine: "2.0 Turbo",
    bodyType: "Sedan",
    imageUrl: "/placeholder.svg?height=300&width=400",
    description:
      "Alfa Romeo Giulia 2.0 Turbo, excelente estado, único dueño, mantenciones al día en concesionario oficial.",
    features: [
      "Aire acondicionado",
      "Dirección asistida",
      "Cierre centralizado",
      "Alzavidrios eléctricos",
      "Airbags",
      "Frenos ABS",
      "Bluetooth",
      "Cámara de retroceso",
    ],
  },
]

// Available body types
const bodyTypes = ["Sedan", "SUV", "Hatchback", "Pickup", "Coupé", "Convertible"]

interface FetchCarsParams {
  brands?: string[] // Cambiado a un arreglo para admitir múltiples marcas
  minPrice?: number
  maxPrice?: number
  yearFrom?: number
  yearTo?: number
  bodyTypes?: string[] // Cambiado a un arreglo para admitir múltiples tipos de carrocería
}

// Function to fetch cars with filters
export async function fetchCars(params: FetchCarsParams = {}): Promise<Car[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Filter cars based on params
  return mockCars.filter((car) => {
    // Filter by brands
    if (params.brands && params.brands.length > 0 && !params.brands.includes(car.brand)) {
      return false
    }

    // Filter by price range
    if (params.minPrice && car.price < params.minPrice) {
      return false
    }
    if (params.maxPrice && car.price > params.maxPrice) {
      return false
    }

    // Filter by year range
    if (params.yearFrom && car.year < params.yearFrom) {
      return false
    }
    if (params.yearTo && car.year > params.yearTo) {
      return false
    }

    // Filter by body types
    if (params.bodyTypes && params.bodyTypes.length > 0 && !params.bodyTypes.includes(car.bodyType)) {
      return false
    }

    return true
  })
}

// Function to fetch a car by ID
export async function fetchCarById(id: string): Promise<Car | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const car = mockCars.find((car) => car.id === id)
  return car || null
}

// Function to fetch available body types
export async function fetchBodyTypes(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return bodyTypes
}

