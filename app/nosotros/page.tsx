"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppFab from "@/components/whatsapp-fab"
import { useMobile } from "@/hooks/use-mobile"

export default function NosotrosPage() {
  const isMobile = useMobile()

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
        <h1 className="text-2xl font-light mb-6 md:text-3xl">Nosotros</h1>

        <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
          <Image src="/placeholder.svg?height=300&width=600" alt="Equipo GPM" fill className="object-cover" />
        </div>

        <div className="clean-card rounded-lg p-5 space-y-4">
          <h2 className="text-xl font-light">Nuestra Historia</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Fundada en 2010, GPM Automotriz nació con la visión de transformar la experiencia de compra de vehículos en
            Chile. Comenzamos como un pequeño concesionario familiar y hemos crecido hasta convertirnos en uno de los
            distribuidores más respetados del país, manteniendo siempre nuestros valores de honestidad, calidad y
            servicio excepcional.
          </p>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0">
          <div className="clean-card rounded-lg p-5 space-y-4">
            <h2 className="text-xl font-light">Misión</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nuestra misión es proporcionar a nuestros clientes una experiencia de compra transparente y sin
              complicaciones, ofreciendo vehículos de alta calidad a precios competitivos, respaldados por un servicio
              al cliente excepcional.
            </p>
          </div>

          <div className="clean-card rounded-lg p-5 space-y-4">
            <h2 className="text-xl font-light">Visión</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Aspiramos a ser reconocidos como el concesionario de automóviles más confiable y centrado en el cliente de
              Chile, estableciendo nuevos estándares en la industria automotriz a través de la innovación, la integridad
              y la excelencia.
            </p>
          </div>
        </div>

        <div className="clean-card rounded-lg p-5 space-y-4">
          <h2 className="text-xl font-light">Nuestro Equipo</h2>
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
            {[
              { name: "Carlos Mendoza", role: "Gerente General" },
              { name: "Ana Martínez", role: "Directora Comercial" },
              { name: "Roberto Silva", role: "Jefe de Ventas" },
              { name: "Daniela Rojas", role: "Atención al Cliente" },
            ].map((member, index) => (
              <div key={index} className="text-center p-4 bg-black bg-opacity-40 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-800">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=${member.name.charAt(0)}`}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-sm">{member.name}</h3>
                <p className="text-gray-400 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WhatsAppFab phoneNumber="+123456789" message="Hola, me gustaría conocer más sobre GPM Automotriz" />
    </main>
  )
}

