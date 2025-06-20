import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 hover-lift border overflow-hidden group text-center">
      <CardContent className="p-6 pt-8">
        <div className="mb-6 rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300 mx-auto">
          <Icon className="h-8 w-8 text-gray-700" />
        </div>
        <h3 className="text-xl font-bold group-hover:text-gray-700 transition-colors duration-300">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
