const fs = require("fs")
const path = require("path")

// Function to check if a directory exists
function directoryExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch (err) {
    return false
  }
}

// Function to list files in a directory
function listFiles(dirPath) {
  try {
    return fs.readdirSync(dirPath)
  } catch (err) {
    return []
  }
}

// Check if public directory exists
const publicPath = path.join(process.cwd(), "public")
if (directoryExists(publicPath)) {
  console.log("✅ Public directory exists")

  // List files in public directory
  const files = listFiles(publicPath)
  console.log(`Found ${files.length} files in public directory:`)
  files.forEach((file) => {
    console.log(`- ${file}`)
  })
} else {
  console.error("❌ Public directory does not exist!")
}

// If running in Docker, check the expected location
if (process.env.NODE_ENV === "production") {
  console.log("\nChecking production paths:")

  // Check standalone public directory
  const standalonePath = path.join(process.cwd(), "public")
  if (directoryExists(standalonePath)) {
    console.log("✅ Standalone public directory exists")

    // List files in standalone public directory
    const files = listFiles(standalonePath)
    console.log(`Found ${files.length} files in standalone public directory:`)
    files.forEach((file) => {
      console.log(`- ${file}`)
    })
  } else {
    console.error("❌ Standalone public directory does not exist!")
  }
}
