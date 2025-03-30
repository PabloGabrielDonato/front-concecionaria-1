import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DesktopBanner() {
  return (
    <div className="hidden md:block relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
      <Image src="/placeholder.svg?height=400&width=1200" alt="Banner promocional" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-12">
        <h2 className="text-4xl font-light mb-4 max-w-md">Descubre tu próximo vehículo con nosotros</h2>
        <p className="text-gray-300 mb-6 max-w-md">
          Ofrecemos una amplia selección de vehículos de calidad con financiamiento personalizado.
        </p>
        <div className="flex gap-4">
          <Button asChild className="bg-white hover:bg-gray-200 text-black transition-colors">
            <Link href="/autos">Ver catálogo</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/contacto">Contáctanos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

