const fs = require("fs")
const path = require("path")
const glob = require("glob")

// Function to extract image paths from files
function extractImagePaths(content) {
  // Match patterns like src="/image.jpg", src="image.jpg", etc.
  const srcRegex = /src=["']([^"']+\.(jpg|jpeg|png|svg|gif|webp))["']/g
  const importRegex = /import\s+.*?from\s+["']([^"']+\.(jpg|jpeg|png|svg|gif|webp))["']/g
  const urlRegex = /url$$["']?([^"')]+\.(jpg|jpeg|png|svg|gif|webp))["']?$$/g

  const paths = []
  let match

  // Extract src attributes
  while ((match = srcRegex.exec(content)) !== null) {
    paths.push(match[1])
  }

  // Extract import statements
  while ((match = importRegex.exec(content)) !== null) {
    paths.push(match[1])
  }

  // Extract CSS url() functions
  while ((match = urlRegex.exec(content)) !== null) {
    paths.push(match[1])
  }

  return paths
}

// Function to normalize paths
function normalizePath(imagePath) {
  // Remove query parameters
  imagePath = imagePath.split("?")[0]

  // Handle relative paths
  if (imagePath.startsWith("/")) {
    return imagePath.substring(1) // Remove leading slash for public directory
  }

  // Handle absolute URLs
  if (imagePath.startsWith("http")) {
    return null // Skip external URLs
  }

  return imagePath
}

// Main function
async function main() {
  // Get all source files
  const files = glob.sync("**/*.{js,jsx,ts,tsx,css,scss}", {
    ignore: ["node_modules/**", ".next/**", "out/**", "scripts/**"],
  })

  const imageReferences = new Set()

  // Extract image references from all files
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8")
    const paths = extractImagePaths(content)

    for (const path of paths) {
      const normalizedPath = normalizePath(path)
      if (normalizedPath) {
        imageReferences.add(normalizedPath)
      }
    }
  }

  console.log("Found image references:")
  for (const ref of imageReferences) {
    console.log(`- ${ref}`)
  }

  // Check if the referenced images exist in the public directory
  const publicDir = path.join(process.cwd(), "public")
  const missingImages = []

  for (const ref of imageReferences) {
    // Skip logo.png since we know it exists
    if (ref === "logo.png") continue

    const imagePath = path.join(publicDir, ref)
    if (!fs.existsSync(imagePath)) {
      missingImages.push(ref)
    }
  }

  if (missingImages.length > 0) {
    console.log("\nMissing images:")
    for (const img of missingImages) {
      console.log(`- ${img}`)
    }

    console.log("\nWARNING: The above images are referenced in the code but don't exist in the public folder.")
    console.log("Please either add these images to the public folder or remove the references from the code.")
  } else {
    console.log("\nAll referenced images exist in the public directory.")
  }
}

main().catch(console.error)
