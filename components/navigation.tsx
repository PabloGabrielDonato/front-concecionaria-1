"use client"

import { Home, Car, Users, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function   Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Autos",
      href: "/autos",
      icon: Car,
    },
    {
      name: "Nosotros",
      href: "/nosotros",
      icon: Users,
    },
  ]

  // Mobile bottom navigation
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-900 bg-black bg-opacity-80 backdrop-blur-md z-50">
        <nav className="flex justify-around py-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center text-xs transition-colors",
                pathname === item.href ? "text-white" : "text-gray-500 hover:text-gray-300",
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    )
  }

  // Desktop horizontal navigation
  return (
    <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          </Link>

          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors",
                  pathname === item.href ? "text-white" : "text-amber-500 hover:text-white",
                )}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

