# Bini Metal Website - Content Management Guide

This guide explains how to easily manage all content and images on your website.

## 📁 File Structure

\`\`\`
bini-metal/
├── data/
│   └── content.ts          # 🎯 EDIT THIS FILE FOR ALL TEXT CONTENT
├── public/
│   ├── logo.png           # Company logo
│   └── projects/          # 📷 PUT ALL PROJECT IMAGES HERE
│       ├── project1-frame1.jpeg
│       ├── project1-frame2.jpeg
│       └── ...
└── scripts/
    └── organize-images.js  # Run this to organize images
\`\`\`

## 🎯 How to Change Text Content

**ALL TEXT CONTENT** is managed in one file: `data/content.ts`

### To change any text on the website:
1. Open `data/content.ts`
2. Find the section you want to change
3. Edit the text
4. Save the file

### Examples:

**Change the main title:**
\`\`\`typescript
hero: {
  title: "Your New Title Here",
  subtitle: "Your new subtitle here"
}
\`\`\`

**Change about section:**
\`\`\`typescript
about: {
  title: "About Our Company",
  paragraphs: [
    "Your first paragraph here...",
    "Your second paragraph here...",
  ]
}
\`\`\`

**Change contact information:**
\`\`\`typescript
contact: {
  address: "Your new address",
  phone: "Your new phone number"
}
\`\`\`

## 📷 How to Manage Project Images

### Step 1: Organize Your Images
1. Put ALL project images in the `/public/projects/` folder
2. Name them descriptively (e.g., `office-building-front.jpeg`)

### Step 2: Run the Organization Script
\`\`\`bash
node scripts/organize-images.js
\`\`\`

### Step 3: Update Image References
In `data/content.ts`, update the image paths:

\`\`\`typescript
images: [
  { src: "/projects/your-image-name.jpeg", alt: "Description of the image" }
]
\`\`\`

## 🏗️ How to Add a New Project

### Step 1: Add Your Project Images
1. Put your project images in `/public/projects/`
2. Name them clearly (e.g., `new-project-view1.jpeg`)

### Step 2: Add Project Data
In `data/content.ts`, add to both `featured` and `all` arrays:

\`\`\`typescript
{
  id: "project9", // Use next available number
  title: "Your Project Title",
  description: "Description of your project",
  location: "Location | Client: Client Name",
  category: "Komerciale", // Choose existing or create new
  images: [
    { src: "/projects/new-project-view1.jpeg", alt: "Description" },
    { src: "/projects/new-project-view2.jpeg", alt: "Description" },
    // Add more images for carousel
  ],
}
\`\`\`

### Step 3: Featured Projects (Homepage)
- Only the first 4 projects in `projectsData.featured` show on homepage
- To change which projects appear on homepage, reorder the `featured` array

## 🎠 How the Carousel Works

The carousel automatically:
- Shows all images in a project's `images` array
- Displays navigation arrows when there are multiple images
- Shows dots at the bottom for each image
- Works on mobile with touch/swipe

### To add multiple images to a project carousel:
\`\`\`typescript
images: [
  { src: "/projects/project-view1.jpeg", alt: "First view" },
  { src: "/projects/project-view2.jpeg", alt: "Second view" },
  { src: "/projects/project-view3.jpeg", alt: "Third view" },
  // Add as many as you want
]
\`\`\`

## 🔧 Quick Tasks

### Change Homepage Featured Projects
Edit `projectsData.featured` in `data/content.ts` - only first 4 show on homepage

### Change All Projects Page
Edit `projectsData.all` in `data/content.ts` - all projects show here

### Change Company Information
Edit `companyInfo` section in `data/content.ts`

### Change Services
Edit `siteContent.services.items` in `data/content.ts`

### Change Testimonials
Edit `siteContent.testimonials.items` in `data/content.ts`

## 📋 Checklist for Adding New Content

- [ ] Images added to `/public/projects/`
- [ ] Image names match what's in `data/content.ts`
- [ ] Project added to `projectsData.all` array
- [ ] If featured project: added to `projectsData.featured` array (max 4)
- [ ] Alt text provided for all images
- [ ] Text content updated in appropriate section

## 🚨 Important Notes

1. **Image file names are case-sensitive** - make sure they match exactly
2. **Only edit `data/content.ts`** for text changes - don't edit the page files directly
3. **Featured projects limit** - only first 4 in `featured` array show on homepage
4. **Image format** - use JPEG, PNG, or WebP formats
5. **Image size** - recommended 1200x675 pixels (16:9 aspect ratio)

## 🆘 Troubleshooting

**Images not showing?**
- Check file names match exactly (case-sensitive)
- Verify images are in `/public/projects/` folder
- Run `node scripts/organize-images.js`

**Text changes not appearing?**
- Make sure you edited `data/content.ts`
- Check for syntax errors (missing commas, quotes)
- Restart the development server

**Carousel not working?**
- Verify image paths are correct
- Check that images array has proper format
- Make sure images exist in the projects folder
\`\`\`

Finally, let's update the package.json to include the new script:

```typescriptreact file="package.json"
[v0-no-op-code-block-prefix]{
  "name": "bini-metal-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "npm run fix-missing-images && next dev",
    "build": "npm run fix-missing-images && next build",
    "start": "next start",
    "lint": "next lint",
    "organize-images": "node scripts/organize-images.js",
    "generate-favicons": "npx real-favicon generate faviconDescription.json faviconData.json public",
    "verify-public": "node scripts/verify-public.js",
    "create-placeholders": "node scripts/create-placeholder-images.js",
    "verify-images": "node scripts/verify-image-references.js",
    "cleanup-public": "node scripts/cleanup-public.js",
    "find-image-refs": "node scripts/find-all-image-references.js",
    "deep-image-search": "node scripts/deep-image-search.js",
    "remove-images": "node scripts/remove-image-files.js",
    "purge-and-create-placeholders": "node scripts/purge-and-create-placeholders.js",
    "fix-missing-images": "node scripts/fix-missing-images.js",
    "check-problematic-images": "node scripts/check-problematic-images.js"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-slot": "^1.0.2",
    "@vercel/kv": "^0.2.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "glob": "^10.3.10",
    "lucide-react": "^0.363.0",
    "next": "14.2.0",
    "nodemailer": "^6.9.9",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.2",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.30",
    "@types/nodemailer": "^6.4.14",
    "@types/react": "^18.2.67",
    "@types/react-dom": "^18.2.22",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.4.5"
  }
}
