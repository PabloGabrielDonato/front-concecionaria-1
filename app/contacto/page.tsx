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
    <main className="flex flex-col pb-8 md:pb-0">
      
      <div className="p-4 space-y-6 md:container md:mx-auto md:pt-8">
        <div className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0">
          <div className="clean-card rounded-lg p-5 pb-8">
            <h2 className="text-xl font-light mb-4">Información de Contacto</h2>

            <div className="flex h-full flex-col space-y-2 md:space-y-0 md:justify-between">
              <div className="flex items-start h-full">
                <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Dirección</p>
                  <p className="text-gray-400 text-sm">Av. Lope de Vega 2481, Capital Federal, Devoto</p>
                </div>
              </div>

              <div className="flex items-start h-full">
                <Clock className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Horario de Atención</p>
                  <p className="text-gray-400 text-sm">Lunes a Viernes: 10:00 - 19:00</p>
                  <p className="text-gray-400 text-sm">Sábado: 10:00 - 17:00</p>
                </div>
              </div>
              
              <div className="flex items-start h-full">
                <Phone className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Teléfono</p>
                  <p className="text-gray-400 text-sm">+54 9 11 7368-2567</p>
                </div>
              </div>

              <div className="flex items-start h-full">
                <Mail className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-gray-400 text-sm">cpmautomotoresvd@gmail.com</p>
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
      </div>

      <WhatsAppFab phoneNumber="+54 9 11 7368-2567" message="Hola, estoy interesado en conocer más sobre sus vehículos" />
    </main>
  )
}

