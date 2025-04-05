import Image from "next/image"
import Link from "next/link"
import WhatsAppFab from "@/components/whatsapp-fab"
import Header from "@/components/header"
import DesktopBanner from "@/components/desktop-banner"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen pb-16 md:pb-0">
      <div className="md:hidden">
        <Header />
      </div>

      <div className="p-4 space-y-8 md:pt-8 md:container md:mx-auto">
        <DesktopBanner />
        
        <div className="space-y-8">
          <div className="clean-card rounded-lg p-6">
            <div className="flex gap-3 justify-around overflow-x-auto pb-2">
              {["Chevrolet", "Toyota", "Nissan", "Ford", "BMW", "Audi"].map((brand) => (
                <Link
                  key={brand}
                  href={`/autos?marca=${brand}`}
                  className="
                    group
                    flex flex-col
                    items-center
                    justify-center
                    w-20 h-20
                    flex-shrink-0
                    bg-black bg-opacity-40
                    rounded-full
                    border-2 border-amber-500
                    text-xs whitespace-nowrap 
                    hover:bg-amber-500 hover:text-black transition-colors"
                >
                  <Image
                    src={`/${brand.toLowerCase()}.svg`} // Asegúrate de tener las imágenes en la carpeta /public
                    alt={`Logo de ${brand}`}
                    width={40} // Ajusta el tamaño del logo
                    height={40}
                    className="filter invert group-hover:invert-0" // Cambia a negro al hacer hover
                  />
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">Ultimos ingresos</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <Link
                  key={item}
                  href={`/autos/${item}`}
                  className="block clean-card rounded-lg overflow-hidden subtle-hover"
                >
                  <div className="aspect-video relative">
                    <Image
                      src="/cruze.jpeg"
                      alt="Auto destacado"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Chevrolet Cruze - 1.8 LT</h3>
                    <p className="text-gray-400 text-sm">2013 • Automático • Gasolina</p>
                    <p className="font-medium mt-2">$18.989.900</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WhatsAppFab phoneNumber="+54 9 11 7368-2567" message="Hola, estoy interesado en conocer más sobre sus vehículos" />
    </main>
  )
}

