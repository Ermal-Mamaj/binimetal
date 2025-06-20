"use client"
import {
  MapPin,
  Phone,
  ArrowRight,
  Building2,
  Warehouse,
  Wrench,
  StepBackIcon as Stairs,
  Landmark,
  Factory,
  Instagram,
  Facebook,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image" // NEW: Import Image component

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import { SectionHeader } from "@/components/section-header"
import { AnimatedStat } from "@/components/animated-stat"
import { ServiceCard } from "@/components/service-card"
import { FallbackImage } from "@/components/fallback-image"
import { ProjectCarousel } from "@/components/project-carousel"

// Import centralized data
import { siteContent, projectsData, companyInfo } from "@/data/content"

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Service icons mapping
  const serviceIcons = [Building2, Warehouse, Wrench, Stairs, Landmark, Factory]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          {/* NEW: Use Image component for background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={siteContent.hero.backgroundImage || "/placeholder.svg"}
              alt="Hero background"
              fill
              className="object-cover"
              priority // Load this image with high priority
              sizes="(max-width: 768px) 100vw, 100vw" // Responsive sizing
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </div>
          <div className="container relative z-10 flex flex-col items-center justify-center py-24 text-center text-white md:py-32 lg:py-40">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-tight">
                {siteContent.hero.title}
              </h1>
              <p className="mt-6 max-w-[700px] text-base text-gray-200 md:text-lg lg:text-xl px-4 sm:px-0">
                {siteContent.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row px-4 sm:px-0 justify-center">
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 rounded-full"
                >
                  {siteContent.hero.primaryButton}
                </Button>
                <Button
                  onClick={() => scrollToSection("projects")}
                  size="lg"
                  variant="outline"
                  className="border-white bg-white text-black hover:bg-white/90 hover:text-black font-medium px-8 py-6 rounded-full"
                >
                  {siteContent.hero.secondaryButton}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-24 lg:py-28 scroll-mt-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-dots-pattern opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-dots-pattern opacity-10"></div>
          <div className="container px-4 sm:px-6">
            <div className="flex flex-col gap-16 md:flex-row">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{siteContent.about.title}</h2>
                <div className="mt-8 space-y-6">
                  {siteContent.about.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-10 grid grid-cols-3 gap-8">
                  {siteContent.about.stats.map((stat, index) => (
                    <AnimatedStat key={index} value={stat.value} label={stat.label} suffix={stat.suffix} />
                  ))}
                </div>
              </div>
              <div className="relative mt-8 md:mt-0 md:w-1/2">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg"></div>
                <div className="rounded-lg bg-gray-100 w-full h-[400px] flex items-center justify-center shadow-lg relative z-10">
                  {/* NEW: Use aboutImage from companyInfo */}
                  <FallbackImage
                    src={companyInfo.aboutImage}
                    alt="About Bini Metal"
                    width={400} // Adjust width/height as needed for your image
                    height={400}
                    className="object-cover w-full h-full rounded-lg" // Use object-cover to fill the space
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-muted py-20 md:py-24 lg:py-28 scroll-mt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
          <div className="container px-4 sm:px-6 relative z-10">
            <SectionHeader title={siteContent.services.title} subtitle={siteContent.services.subtitle} />

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {siteContent.services.items.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={serviceIcons[index]}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 md:py-24 lg:py-28 scroll-mt-20">
          <div className="container px-4 sm:px-6">
            <SectionHeader title={siteContent.projects.title} subtitle={siteContent.projects.subtitle} />

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {projectsData.featured.map((project) => (
                <ProjectCarousel
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  location={project.location}
                  images={project.images}
                />
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link href="/projektet">
                <Button size="lg" className="rounded-full px-8 group">
                  {siteContent.projects.viewAllButton}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted py-20 md:py-24 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
          <div className="container px-4 sm:px-6 relative z-10">
            <SectionHeader title={siteContent.testimonials.title} subtitle={siteContent.testimonials.subtitle} />

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {siteContent.testimonials.items.map((testimonial, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300 hover-lift">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">{testimonial.initials}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="mt-6 relative">
                      <svg
                        className="absolute -top-4 -left-4 h-8 w-8 text-primary/20"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="italic text-base">"{testimonial.text}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-24 lg:py-28 scroll-mt-20">
          <div className="container px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {siteContent.contact.title}
                </h2>
                <p className="mt-6 text-muted-foreground text-lg">{siteContent.contact.subtitle}</p>
                <div className="mt-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-gray-100 p-4 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-gray-700 flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="font-medium">Adresa</h3>
                      <p className="text-base text-muted-foreground">{siteContent.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-gray-100 p-4 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-gray-700 flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="font-medium">Telefon</h3>
                      <p className="text-base text-muted-foreground">{siteContent.contact.phone}</p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <a
                    href={companyInfo.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="rounded-full bg-gray-100 p-4 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Instagram className="h-6 w-6 text-gray-700 flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="font-medium">Instagram</h3>
                      <p className="text-base text-muted-foreground group-hover:text-gray-700 transition-colors">
                        {siteContent.contact.instagram}
                      </p>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a
                    href={companyInfo.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="rounded-full bg-gray-100 p-4 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Facebook className="h-6 w-6 text-gray-700 flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="font-medium">Facebook</h3>
                      <p className="text-base text-muted-foreground group-hover:text-gray-700 transition-colors">
                        {siteContent.contact.facebook}
                      </p>
                    </div>
                  </a>
                </div>
                <div className="mt-12">
                  <h3 className="text-xl font-bold">{siteContent.contact.workingHours.title}</h3>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-background p-5 rounded-lg shadow-sm border border-border/50">
                      <p className="font-medium">{siteContent.contact.workingHours.weekdays.days}</p>
                      <p className="text-muted-foreground">{siteContent.contact.workingHours.weekdays.hours}</p>
                    </div>
                    <div className="bg-background p-5 rounded-lg shadow-sm border border-border/50">
                      <p className="font-medium">{siteContent.contact.workingHours.saturday.days}</p>
                      <p className="text-muted-foreground">{siteContent.contact.workingHours.saturday.hours}</p>
                    </div>
                    <div className="bg-background p-5 rounded-lg shadow-sm border border-border/50">
                      <p className="font-medium">{siteContent.contact.workingHours.sunday.days}</p>
                      <p className="text-muted-foreground">{siteContent.contact.workingHours.sunday.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <Card className="shadow-lg border overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold">{siteContent.contact.formTitle}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{siteContent.contact.formSubtitle}</p>
                    <div className="mt-6">
                      <ContactForm />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-800 text-white py-20 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
          <div className="container text-center px-4 sm:px-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{siteContent.cta.title}</h2>
            <p className="mt-6 mx-auto max-w-[700px] text-lg">{siteContent.cta.subtitle}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-base">
                {siteContent.cta.primaryButton}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-primary rounded-full px-8 py-6 text-base"
              >
                {siteContent.cta.secondaryButton}
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted">
        <div className="container py-16 md:py-20 px-4 sm:px-6">
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <FallbackImage
                  src={companyInfo.logo}
                  alt={`${companyInfo.name} Logo`}
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <span className="text-xl font-bold">{companyInfo.name}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{siteContent.footer.description}</p>
              <div className="mt-6 flex gap-4">
                <a
                  href={companyInfo.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-200 p-3 hover:bg-gray-300 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6 text-gray-700" />
                </a>
                <a
                  href={companyInfo.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-200 p-3 hover:bg-gray-300 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-gray-700" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">{siteContent.footer.quickLinks}</h3>
              <nav className="mt-4 flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {siteContent.about.title}
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {siteContent.services.title}
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {siteContent.projects.title}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {siteContent.contact.title}
                </button>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-medium">{siteContent.footer.services}</h3>
              <nav className="mt-4 flex flex-col gap-3">
                {siteContent.services.items.slice(0, 4).map((service, index) => (
                  <button
                    key={index}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    {service.title}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-medium">{siteContent.footer.contact}</h3>
              <div className="mt-4 space-y-3">
                <p className="text-sm text-muted-foreground">{companyInfo.address}</p>
                <p className="text-sm text-muted-foreground">{companyInfo.phone}</p>
                <a
                  href={companyInfo.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Instagram: {companyInfo.instagram.handle}
                </a>
                <a
                  href={companyInfo.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Facebook: {companyInfo.facebook.name}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {companyInfo.name}. {siteContent.footer.copyright}
            </p>
            <div className="flex gap-6">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {siteContent.footer.privacyPolicy}
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {siteContent.footer.termsOfService}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
