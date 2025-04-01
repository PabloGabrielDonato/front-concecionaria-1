"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import WhatsAppFab from "@/components/whatsapp-fab"
import { useMobile } from "@/hooks/use-mobile"

export default function ContactoPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const isMobile = useMobile()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

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
        <h1 className="text-2xl font-light mb-6 md:text-3xl">Contacto</h1>

        <div className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0">
          <div className="clean-card rounded-lg p-5 space-y-4">
            <h2 className="text-xl font-light mb-4">Información de Contacto</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Dirección</p>
                  <p className="text-gray-400 text-sm">Av. Lope de Vega 2481, Capital Federal, Devoto</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Teléfono</p>
                  <p className="text-gray-400 text-sm">+54 9 11 7368-2567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-gray-400 text-sm">cpmautomotoresvd@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Horario de Atención</p>
                  <p className="text-gray-400 text-sm">Lunes a Viernes: 10:00 - 19:00</p>
                  <p className="text-gray-400 text-sm">Sábado: 10:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

            <div className="aspect-video relative rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.433830301183!2d-58.52167852376382!3d-34.618475572949045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc828f6444fe9%3A0x99a3398e056cbd2!2sCPM%20Autos%20S.%20R.%20L.!5e0!3m2!1ses-419!2sar!4v1743436782523!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
            </div>
        </div>

        <div className="clean-card rounded-lg p-5">
          <h2 className="text-xl font-light mb-4">Envíanos un Mensaje</h2>

          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-900 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Mensaje Enviado</h3>
              <p className="text-gray-400 text-sm">Gracias por contactarnos. Te responderemos a la brevedad.</p>
              <Button className="mt-4" variant="outline" onClick={() => setSubmitted(false)}>
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="bg-black bg-opacity-40 border-gray-800"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="bg-black bg-opacity-40 border-gray-800"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="bg-black bg-opacity-40 border-gray-800"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-1">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-black bg-opacity-40 border-gray-800"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white hover:bg-gray-200 text-black transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          )}
        </div>
      </div>

      <WhatsAppFab phoneNumber="+54 9 11 7368-2567" message="Hola, estoy interesado en conocer más sobre sus vehículos" />
    </main>
  )
}

