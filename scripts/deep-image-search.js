const fs = require("fs")
const path = require("path")
const glob = require("glob")

// Function to find all image references in a file
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

      // Arrays of image paths
      /\[[^\]]*["']([^"']+\.(jpg|jpeg|png|svg|gif|webp))["'][^\]]*\]/g,

      // Direct file paths
      /[a-zA-Z0-9_-]+\.(jpg|jpeg|png|svg|gif|webp)/g,

      // public/image.jpg
      /public\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|svg|gif|webp)/g,

      // static/images/image.jpg
      /static\/images\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|svg|gif|webp)/g,
    ]

    const references = []

    for (const pattern of patterns) {
      let match
      while ((match = pattern.exec(content)) !== null) {
        // Extract the image path
        const imagePath = match[0].includes("=") || match[0].includes("(") ? match[1] : match[0]

        // Skip if it's logo.png or a data URL
        if (imagePath.includes("logo.png") || imagePath.startsWith("data:")) {
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
          lineNumber: content.substring(0, match.index).split("\n").length,
        })
      }
    }

    return references
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
    return []
  }
}

// Main function
async function main() {
  // Get all source files
  const files = glob.sync("**/*.{js,jsx,ts,tsx,css,scss,html,md,json,py}", {
    ignore: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "scripts/deep-image-search.js",
      "scripts/cleanup-public.js",
      "scripts/find-all-image-references.js",
      "scripts/remove-image-files.js",
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
      console.log(`Line: ${ref.lineNumber}`)
      console.log(`Image: ${ref.imagePath}`)
      console.log(`Context: ${ref.context.trim()}`)
      console.log("----------------------------------------------------")
    }

    // Group by file for easier fixing
    const fileGroups = {}
    for (const ref of allReferences) {
      if (!fileGroups[ref.file]) {
        fileGroups[ref.file] = []
      }
      fileGroups[ref.file].push(ref)
    }

    console.log("\nGrouped by file:")
    for (const file in fileGroups) {
      console.log(`\nFile: ${file}`)
      for (const ref of fileGroups[file]) {
        console.log(`  Line ${ref.lineNumber}: ${ref.imagePath}`)
      }
    }
  } else {
    console.log("No image references found in the codebase.")
  }
}

main().catch(console.error)
