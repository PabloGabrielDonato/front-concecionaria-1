"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { Car } from "@/lib/domain/models/car"

interface RandomCarButtonProps {
  cars: Car[]
  className?: string
}

export default function RandomCarButton({ cars, className }: RandomCarButtonProps) {
  const router = useRouter()

  const goToRandomCar = () => {
    if (cars.length > 0) {
      const randomCar = cars[Math.floor(Math.random() * cars.length)]
      router.push(`/autos/${randomCar.id}`)
    }
  }

  return (
    <button
      onClick={goToRandomCar}
      className={cn(
        "fixed bottom-40 right-10 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white text-black shadow-lg hover:bg-amber-500 transition-all duration-200",
        className
      )}
    >
      <Image
        src="/dice.svg"
        alt="Random Car"
        width={22}
        height={22}
      />
    </button>
  )
}