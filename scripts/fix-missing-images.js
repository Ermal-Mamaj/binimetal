const fs = require("fs")
const path = require("path")

// Define the public directory
const publicDir = path.join(process.cwd(), "public")

// Ensure the public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
  console.log("Created public directory")
}

// List of problematic images that are causing errors
const problematicImages = [
  "commercial-steel-frame.jpg",
  "metal-staircase.jpg",
  "metal-facade.jpg",
  "metal-construction-hero.jpg",
  "metal-workshop.jpg",
  "industrial-metal-structure.jpg",
  "architectural-metalwork.jpg",
  "steel-framework.jpg",
]

// Create a simple 1x1 transparent PNG as placeholder
const placeholderContent = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
)

// Create placeholder files for all problematic images
console.log("Creating placeholder files for problematic images...")
for (const imageName of problematicImages) {
  const imagePath = path.join(publicDir, imageName)
  fs.writeFileSync(imagePath, placeholderContent)
  console.log(`Created placeholder for: ${imageName}`)
}

console.log("Placeholder creation complete!")
