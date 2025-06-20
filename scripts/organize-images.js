const fs = require("fs")
const path = require("path")

// Create the projects directory structure
const publicDir = path.join(process.cwd(), "public")
const projectsDir = path.join(publicDir, "projects")

// Ensure the projects directory exists
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true })
  console.log("✅ Created /public/projects directory")
}

// List of expected project images based on the data file
const expectedImages = [
  "project1-frame1.jpeg",
  "project1-frame2.jpeg",
  "project1-frame3.jpeg",
  "project1-frame4.jpeg",
  "project2-stadium1.jpeg",
  "project2-stadium2.jpeg",
  "project3-sunset1.jpeg",
  "project3-sunset2.jpeg",
  "metal-tanks-project.jpeg",
  "metal-framework.jpeg",
  "red-facade-building.jpeg",
  "parking-structure.jpeg",
  "stadium-structure.jpeg",
]

// Create placeholder files for missing images
const placeholderContent = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
)

console.log("📁 Organizing project images...")

expectedImages.forEach((imageName) => {
  const imagePath = path.join(projectsDir, imageName)

  if (!fs.existsSync(imagePath)) {
    fs.writeFileSync(imagePath, placeholderContent)
    console.log(`📷 Created placeholder: /public/projects/${imageName}`)
  } else {
    console.log(`✅ Image exists: /public/projects/${imageName}`)
  }
})

console.log("\n🎉 Image organization complete!")
console.log("\n📝 Next steps:")
console.log("1. Replace the placeholder images in /public/projects/ with your actual project images")
console.log("2. Make sure your image file names match exactly what's in the data/content.ts file")
console.log("3. Edit data/content.ts to change any text content or add new projects")
