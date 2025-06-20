const fs = require("fs")
const path = require("path")
const glob = require("glob")

// List of problematic images
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

// Function to check a file for references to problematic images
function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const references = []

    for (const image of problematicImages) {
      const regex = new RegExp(image.replace(/\./g, "\\."), "g")
      let match

      while ((match = regex.exec(content)) !== null) {
        const lineNumber = content.substring(0, match.index).split("\n").length
        const line = content.split("\n")[lineNumber - 1]

        references.push({
          image,
          lineNumber,
          line: line.trim(),
        })
      }
    }

    if (references.length > 0) {
      console.log(`\nFile: ${filePath}`)
      for (const ref of references) {
        console.log(`  Line ${ref.lineNumber}: ${ref.image}`)
        console.log(`    ${ref.line}`)
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
  console.log("Checking for references to problematic images...")

  // Get all source files
  const files = glob.sync("**/*.{js,jsx,ts,tsx,css,scss,html,md,json,py}", {
    ignore: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "scripts/check-problematic-images.js",
      "scripts/fix-missing-images.js",
    ],
  })

  let totalReferences = 0

  // Check each file
  for (const file of files) {
    const references = checkFile(file)
    totalReferences += references.length
  }

  if (totalReferences === 0) {
    console.log("No references to problematic images found in the codebase.")
  } else {
    console.log(`\nFound ${totalReferences} references to problematic images.`)
    console.log("Please update these references to use the logo.png or remove them.")
  }
}

main().catch(console.error)
