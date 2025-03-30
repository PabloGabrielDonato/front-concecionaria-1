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
      {showBackButton && (
        <Link href={backUrl}>
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
      )}
      <Link href="/" className="flex items-center justify-center w-full">
        <div className="relative h-8">
          <span className="gold-gradient text-xl">GPM</span>
        </div>
      </Link>
    </div>
  )
}

