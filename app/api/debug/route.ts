import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Get the public directory
    const publicDir = path.join(process.cwd(), "public")

    // Check if it exists
    const publicDirExists = fs.existsSync(publicDir)

    // List files in public directory
    const files = publicDirExists ? fs.readdirSync(publicDir) : []

    // Check for specific problematic files
    const problematicFiles = [
      "commercial-steel-frame.jpg",
      "metal-staircase.jpg",
      "metal-facade.jpg",
      "metal-construction-hero.jpg",
      "metal-workshop.jpg",
      "industrial-metal-structure.jpg",
      "architectural-metalwork.jpg",
      "steel-framework.jpg",
    ]

    const fileStatus = problematicFiles.map((file) => {
      const filePath = path.join(publicDir, file)
      return {
        file,
        exists: fs.existsSync(filePath),
        size: fs.existsSync(filePath) ? fs.statSync(filePath).size : 0,
      }
    })

    return NextResponse.json({
      publicDirExists,
      files,
      fileStatus,
      cwd: process.cwd(),
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
