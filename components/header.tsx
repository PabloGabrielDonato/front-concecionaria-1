import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  showBackButton?: boolean
  backUrl?: string
}

export default function Header({ showBackButton = false, backUrl = "/" }: HeaderProps) {
  return (
    <div className="flex items-center p-4 bg-black bg-opacity-80 backdrop-blur-md">
      <div className="flex w-1/3">
      {showBackButton && (

        <Link href={backUrl}>
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
      )}
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
  )
}

