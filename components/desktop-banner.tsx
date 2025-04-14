import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DesktopBanner() {
  return (
    <div className="md:block relative w-full h-[600px] mb-8 rounded-lg overflow-hidden">
      <Image src="/fachada.jpg" alt="Banner promocional" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-around p-12">
        <div>
          <h2 className="text-5xl font-extrabold shadow-lg mb-4">Descubrí tu próximo vehículo</h2>
          <p className="text-gray-300 mb-6 max-w-xl">
            En <strong>CPM Autos</strong> tenemos el vehiculo ideal para vos.
            Estamos listos para ayudarte con tus consultas. Ofreciendo una amplia variedad de modelos
            y el financiamiento que mejor se adapte a tus necesidades.
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild className="bg-amber-500 hover:bg-amber-500/10 text-black transition-colors">
            <Link className="text-white" href="/autos">Ver Stock</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-amber-500/10">
            <Link href="/nosotros">Nosotros</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

