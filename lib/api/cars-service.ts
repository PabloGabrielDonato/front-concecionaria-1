import type { Car } from "@/lib/domain/models/car"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
let cars: Cars[] = [] // Initialize with an empty array

// Available body types
const bodyTypes: string[] = []

interface FetchCarsParams {
  brands?: string[]
  minPrice?: number
  maxPrice?: number
  yearFrom?: number
  yearTo?: number
  bodyTypes?: string[]
}

// Function to fetch cars with filters
export async function fetchCars(params: FetchCarsParams = {}): Promise<Car[]> {
  const response = await fetch(`${API_BASE_URL}/cars`)
  cars = await response.json()
  return cars
}

// Function to store cars
export function setCars(carList: Car[]): void {
  cars = carList
}

// Function to get stored cars
export function getCars(): Car[] {
  return cars
}

// Function to fetch a car by ID
export async function fetchCarById(id: string): Promise<Car | null> {
  if (!cars.data || cars.data.length === 0) {
    await fetchCars().then() // Ensure cars are fetched before searching
  }
    // Find the car with the given ID
    const car = cars.data.find((car) => car.id === Number(id))
    return car || null
  }

// Function to fetch available body types
export async function fetchBodyTypes(): Promise<string[]> {
  return bodyTypes
}
