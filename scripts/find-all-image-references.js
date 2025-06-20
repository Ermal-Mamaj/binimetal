const fs = require("fs")
const path = require("path")
const glob = require("glob")

// Function to find all image references in a file
function findImageReferences(filePath) {
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

    // Arrays of image paths
    /\[[^\]]*["']([^"']+\.(jpg|jpeg|png|svg|gif|webp))["'][^\]]*\]/g,
  ]

  const references = []

  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(content)) !== null) {
      // Extract the image path
      const imagePath = match[1]

      // Skip if it's logo.png or a data URL
      if (imagePath === "logo.png" || imagePath.startsWith("data:")) {
        continue
      }

      // Skip if it's a placeholder or favicon
      if (imagePath.includes("favicon") || imagePath.includes("placeholder")) {
        continue
      }

      references.push({
        file: filePath,
        imagePath,
        context: content.substring(Math.max(0, match.index - 50), match.index + match[0].length + 50),
      })
    }
  }

  return references
}

// Main function
async function main() {
  // Get all source files
  const files = glob.sync("**/*.{js,jsx,ts,tsx,css,scss,html,md,json}", {
    ignore: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "scripts/find-all-image-references.js",
      "scripts/cleanup-public.js",
    ],
  })

  let allReferences = []

  // Find image references in all files
  for (const file of files) {
    const references = findImageReferences(file)
    allReferences = [...allReferences, ...references]
  }

  // Print the results
  if (allReferences.length > 0) {
    console.log(`Found ${allReferences.length} image references in the codebase:`)
    console.log("----------------------------------------------------")

    for (const ref of allReferences) {
      console.log(`File: ${ref.file}`)
      console.log(`Image: ${ref.imagePath}`)
      console.log(`Context: ${ref.context.trim()}`)
      console.log("----------------------------------------------------")
    }
  } else {
    console.log("No image references found in the codebase.")
  }
}

main().catch(console.error)
