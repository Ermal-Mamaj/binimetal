import { MapPin } from "lucide-react"
import { FallbackImage } from "@/components/fallback-image"

interface ProjectCardProps {
  title: string
  description: string
  location: string
  altText: string
}

export function ProjectCard({ title, description, location, altText }: ProjectCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border shadow-md hover:shadow-xl transition-all duration-300 hover-lift">
      <div className="relative aspect-video overflow-hidden bg-gray-100 flex items-center justify-center">
        <FallbackImage src="/logo.png" alt={altText} width={200} height={200} className="object-contain" />
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
