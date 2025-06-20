const fs = require("fs")
const path = require("path")
const glob = require("glob")

// Define the public directory
const publicDir = path.join(process.cwd(), "public")

// Ensure the public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
  console.log("Created public directory")
}

// List of essential files to keep
const essentialFiles = [
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

// Step 1: Remove all image files from the public directory
console.log("Step 1: Removing all image files from the public directory...")
const files = fs.readdirSync(publicDir)
for (const file of files) {
  const filePath = path.join(publicDir, file)

  // Check if it's a file (not a directory) and if it's an image file
  if (fs.statSync(filePath).isFile() && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) {
    // Keep essential files
    if (essentialFiles.includes(file)) {
      console.log(`  Keeping essential file: ${file}`)
      continue
    }

    // Delete the file
    fs.unlinkSync(filePath)
    console.log(`  Deleted image file: ${file}`)
  }
}

// Step 2: Find all image references in the codebase
console.log("\nStep 2: Finding all image references in the codebase...")
const sourceFiles = glob.sync("**/*.{js,jsx,ts,tsx,css,scss,html,md,json,py}", {
  ignore: ["node_modules/**", ".next/**", "out/**", "scripts/purge-and-create-placeholders.js"],
})

const imageReferences = new Set()

// Function to find image references in a file
function findImageReferences(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")

    // Different regex patterns to find image references
    const patterns = [
      // src="/image.jpg" or src="image.jpg"
      /src=["']([^"']+\.(jpg|jpeg|png|svg|gif|webp))["']/g,

      // import ... from "/image.jpg" or import ... from "image.jpg"
      /import\s+.*?from\s+["']([^"']+\.(jpg|jpeg|png|svg|gif|webp))["']/g,

      // url("/image.jpg") or url("image.jpg") or url(/image.jpg) or url(image.jpg)
      /url$$["']?([^"')]+\.(jpg|jpeg|png|svg|gif|webp))["']?$$/g,

      // "/image.jpg" or "image.jpg" (general string references)
      /["']([^"']+\.(jpg|jpeg|png|svg|gif|webp))["']/g,
    ]

    for (const pattern of patterns) {
      let match
      while ((match = pattern.exec(content)) !== null) {
        // Extract the image path
        let imagePath = match[1]

        // Skip if it's a data URL
        if (imagePath.startsWith("data:")) {
          continue
        }

        // Normalize the path
        if (imagePath.startsWith("/")) {
          imagePath = imagePath.substring(1)
        }

        // Skip external URLs
        if (imagePath.startsWith("http")) {
          continue
        }

        // Skip if it's already in the essential files list
        if (essentialFiles.includes(imagePath)) {
          continue
        }

        imageReferences.add(imagePath)
      }
    }
  } catch (error) {
    console.error(`  Error reading file ${filePath}:`, error.message)
  }
}

// Find image references in all files
for (const file of sourceFiles) {
  findImageReferences(file)
}

console.log(`  Found ${imageReferences.size} unique image references`)

// Step 3: Create empty placeholder files for all referenced images
console.log("\nStep 3: Creating empty placeholder files for all referenced images...")
const placeholderContent = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
)

for (const imagePath of imageReferences) {
  const fullPath = path.join(publicDir, imagePath)

  // Create directory if it doesn't exist
  const dir = path.dirname(fullPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Create empty placeholder file
  fs.writeFileSync(fullPath, placeholderContent)
  console.log(`  Created placeholder for: ${imagePath}`)
}

console.log("\nImage cleanup and placeholder creation complete!")
