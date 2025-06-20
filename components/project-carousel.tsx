"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { FallbackImage } from "@/components/fallback-image"
import { Button } from "@/components/ui/button"

interface ProjectImage {
  src: string
  alt: string
}

interface ProjectCarouselProps {
  title: string
  description: string
  location: string
  images: ProjectImage[]
}

export function ProjectCarousel({ title, description, location, images }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Default to logo if no images provided
  const displayImages = images.length > 0 ? images : [{ src: "/logo.png", alt: "Bini Metal Logo" }]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayImages.length) % displayImages.length)
  }

  return (
    <div className="group overflow-hidden rounded-lg border shadow-md hover:shadow-xl transition-all duration-300 hover-lift">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {/* Image */}
        <div className="w-full h-full flex items-center justify-center">
          <FallbackImage
            src={displayImages[currentIndex].src}
            alt={displayImages[currentIndex].alt}
            width={400}
            height={225}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Navigation arrows - only show if more than one image */}
        {displayImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold group-hover:text-gray-700 transition-colors duration-300">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  )
}
