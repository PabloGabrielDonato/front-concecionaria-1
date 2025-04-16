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
        <h1 className="text-2xl font-light mb-6 md:text-3xl">Nosotros</h1>
        <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
          <Image src="/fachada.jpg" alt="Equipo GPM" fill className="object-cover" />
        </div>

        <div className="clean-card rounded-lg p-5 space-y-4">
          <h2 className="text-xl font-light">Nuestra Historia</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Con más de 15 años de trayectoria en el mercado automotriz argentino, nuestra empresa se especializa en la
            comercialización de vehículos usados premium meticulosamente seleccionados. Ofrecemos servicios de financiación con
            créditos prendarios, los cuales pueden ser de formato <b>tradicional</b> o <b>uva</b>. Valoramos y aceptamos su
            vehículo actual como parte de pago, brindando tasaciones justas y competitivas. Contamos con servicio integral de
            gestoría y seguros del automotor, trabajando con empresas líderes y personal altamente calificado. Nuestra ubicación
            estratégica en el barrio de Villa Devoto, a solo 10 cuadras de la General Paz, permite un acceso rápido y
            conveniente desde cualquier punto de CABA y el Gran Buenos Aires.
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
              Argentina, estableciendo nuevos estándares en la industria automotriz a través de la innovación, la integridad
              y la excelencia.
            </p>
          </div>
        </div>

        <div className="clean-card rounded-lg p-5 space-y-4">
          <h2 className="text-xl font-light">¿Por qué elegir CPM Autos?</h2>
          <ul className="text-gray-300 text-sm leading-relaxed space-y-3">
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">Vehículos Premium Seleccionados</span> - Cada automóvil en nuestro inventario pasa
                por un riguroso proceso de inspección y certificación para garantizar la más alta calidad.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">Financiación Flexible</span> - Ofrecemos múltiples opciones de créditos prendarios
                adaptados a sus necesidades financieras, con tasas competitivas y plazos convenientes.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">Tasaciones Justas</span> - Valoramos su vehículo actual al mejor precio del
                mercado, facilitando el proceso de renovación de su automóvil.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">Gestoría Integral</span> - Nos encargamos de todos los trámites administrativos
                relacionados con su compra, ahorrándole tiempo y complicaciones.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">Garantía y Respaldo</span> - Todos nuestros vehículos cuentan con garantía
                mecánica para su tranquilidad y confianza en su inversión.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">Atención Personalizada</span> - Nuestro equipo de profesionales le brindará
                asesoramiento especializado durante todo el proceso de compra.
              </div>
            </li>
          </ul>
        </div>



        <div className="clean-card rounded-lg p-5 space-y-4">
          <h2 className="text-xl font-light">Nuestro Equipo</h2>
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
            {[
              { name: "Thiago Villarreal", role: "Sector Ventas" },
              { name: "Luca Villarreal", role: "Sector Ventas" },
              { name: "Tomás Nieto", role: "Sector Ventas" },
              { name: "Pablo Donato", role: "Comunnity Manager" },
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

