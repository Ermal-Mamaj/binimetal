import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectCarousel } from "@/components/project-carousel"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"

// Import centralized data
import { projectsData, siteContent, companyInfo } from "@/data/content"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-20 md:py-24">
        <div className="container">
          <SectionHeader
            title={siteContent.projects.title}
            subtitle="Shikoni koleksionin tonë të projekteve të ndërtimit dhe fabrikimit metalik të realizuara me sukses"
            centered={true}
          />
          <div className="mt-8 flex justify-center">
            <Link href="/">
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kthehu në Faqen Kryesore
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="container py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectsData.categories.map((category) => (
            <Button key={category} variant="outline" className="rounded-full">
              {category}
            </Button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.all.map((project) => (
            <ProjectCarousel
              key={project.id}
              title={project.title}
              description={project.description}
              location={project.location}
              images={project.images}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-20 md:py-24 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
        <div className="container text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{siteContent.cta.title}</h2>
          <p className="mt-6 mx-auto max-w-[700px] text-lg">{siteContent.cta.subtitle}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-base">
                {siteContent.cta.primaryButton}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-primary rounded-full px-8 py-6 text-base"
              asChild
            >
              <a href={`tel:${companyInfo.phone}`}>{siteContent.cta.secondaryButton}</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
