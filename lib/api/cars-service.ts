import type { Car } from "@/lib/domain/models/car"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
let cars: Car[] = []

// Available body types
const bodyTypes = ["Sedan", "SUV", "Hatchback", "Pickup", "Coupé", "Convertible"]

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
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
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
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const car = cars.find((car) => car.id === Number(id))
  return car || null
}

// Function to fetch available body types
export async function fetchBodyTypes(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return bodyTypes
}

