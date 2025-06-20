const fs = require("fs")
const path = require("path")

// Define the public directory
const publicDir = path.join(process.cwd(), "public")

// Ensure the public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
  console.log("Created public directory")
}

// List of files to keep
const filesToKeep = [
  "logo.png",
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "og-image.jpg",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
]

// Get all files in the public directory
const files = fs.readdirSync(publicDir)

// Delete files that are not in the filesToKeep list
for (const file of files) {
  if (!filesToKeep.includes(file)) {
    const filePath = path.join(publicDir, file)

    // Check if it's a file (not a directory)
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath)
      console.log(`Deleted ${file}`)
    }
  }
}

console.log("Public folder cleanup complete")
