import type { MetadataRoute } from "next"
import { projectsData } from "@/data/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://binimetal.com" // Replace with your actual domain

  const projectEntries: MetadataRoute.Sitemap = projectsData.all.map((project) => ({
    url: `${baseUrl}/projektet#${project.id}`, // Link to specific project section on projects page
    lastModified: new Date(), // You might want to use a project-specific last modified date if available
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projektet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Add other static pages if you have them, e.g., /about, /services
    // For now, we'll rely on the main page's sections and the projects page
    ...projectEntries,
  ]
}
