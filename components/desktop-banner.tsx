import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DesktopBanner() {
  return (
    <div className="hidden md:block relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
      <Image src="/fachada.jpg" alt="Banner promocional" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-12">
        <h2 className="text-4xl font-light mb-4 max-w-md">Descubrí tu próximo vehículo con nosotros</h2>
        <p className="text-gray-300 mb-6 max-w-md">
          Ofrecemos una amplia selección de vehículos de calidad con financiamiento personalizado.
        </p>
        <div className="flex gap-4">
          <Button asChild className="bg-amber-500 hover:bg-amber-500/10 text-black transition-colors">
            <Link className="text-white" href="/autos">Ver Stock</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-amber-500/10">
            <Link href="/contacto">Contactanos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

