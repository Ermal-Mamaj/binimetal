"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FallbackImage } from "@/components/fallback-image"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHomePage = pathname === "/"

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="flex items-center gap-3">
              <FallbackImage src="/logo.png" alt="Bini Metal Logo" width={50} height={50} className="object-contain" />
              <span className="text-xl font-bold">Bini Metal</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          {isHomePage ? (
            <>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Rreth Nesh
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Shërbimet
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Projektet
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Kontakt
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            </>
          ) : (
            <>
              <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors relative group">
                Rreth Nesh
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/#services"
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Shërbimet
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/projektet"
                className={`text-sm font-medium hover:text-primary transition-colors relative group ${
                  pathname === "/projektet" ? "text-primary" : ""
                }`}
              >
                Projektet
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                    pathname === "/projektet" ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Kontakt
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </nav>
        {isHomePage ? (
          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden md:inline-flex bg-primary hover:bg-primary/90 transition-all duration-300"
          >
            Kërko Ofertë
          </Button>
        ) : (
          <Link href="/#contact">
            <Button className="hidden md:inline-flex bg-primary hover:bg-primary/90 transition-all duration-300">
              Kërko Ofertë
            </Button>
          </Link>
        )}

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Hap menunë</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <FallbackImage
                    src="/logo.png"
                    alt="Bini Metal Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-lg font-bold">Bini Metal</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-6">
                {isHomePage ? (
                  <>
                    <button
                      onClick={() => scrollToSection("about")}
                      className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors text-left"
                    >
                      Rreth Nesh
                    </button>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors text-left"
                    >
                      Shërbimet
                    </button>
                    <button
                      onClick={() => scrollToSection("projects")}
                      className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors text-left"
                    >
                      Projektet
                    </button>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors text-left"
                    >
                      Kontakt
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/#about"
                      className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Rreth Nesh
                    </Link>
                    <Link
                      href="/#services"
                      className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Shërbimet
                    </Link>
                    <Link
                      href="/projektet"
                      className={`flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors ${
                        pathname === "/projektet" ? "text-primary" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Projektet
                    </Link>
                    <Link
                      href="/#contact"
                      className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Kontakt
                    </Link>
                  </>
                )}
              </nav>
              <div className="mt-auto pt-8">
                {isHomePage ? (
                  <Button onClick={() => scrollToSection("contact")} className="w-full">
                    Kërko Ofertë
                  </Button>
                ) : (
                  <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Kërko Ofertë</Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
