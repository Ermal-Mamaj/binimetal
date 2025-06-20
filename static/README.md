# Bini Metal Website - Comprehensive Guide

This is a detailed guide for managing and customizing the Bini Metal website. This document provides step-by-step instructions for all aspects of the website, from adding new projects to modifying content and deploying changes.

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Getting Started](#getting-started)
4. [Managing Projects](#managing-projects)
   - [Adding New Projects](#adding-new-projects)
   - [Modifying Existing Projects](#modifying-existing-projects)
   - [Project Carousel Images](#project-carousel-images)
   - [Featured Projects on Homepage](#featured-projects-on-homepage)
5. [Content Management](#content-management)
   - [Modifying Hero Section](#modifying-hero-section)
   - [About Section](#about-section)
   - [Services Section](#services-section)
   - [Testimonials Section](#testimonials-section)
   - [Contact Information](#contact-information)
6. [Navigation and Layout](#navigation-and-layout)
7. [Styling and Design](#styling-and-design)
8. [Email Functionality](#email-functionality)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)
11. [Technical Details](#technical-details)

## Project Overview

The Bini Metal website is built using Next.js, React, and Tailwind CSS. It features:

- Responsive design for all device sizes
- Project showcase with image carousel
- Contact form with email functionality
- Multiple sections for services, testimonials, and company information
- Albanian language content

## File Structure

Here's a breakdown of the most important files and directories:

\`\`\`
bini-metal/
├── app/                      # Main application code
│   ├── actions/              # Server actions (e.g., email sending)
│   │   └── send-email.ts     # Email functionality
│   ├── api/                  # API routes
│   ├── projektet/            # Projects page
│   │   └── page.tsx          # Projects listing page
│   ├── globals.css           # Global CSS styles
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Homepage component
├── components/               # Reusable React components
│   ├── animated-stat.tsx     # Animated statistics component
│   ├── contact-form.tsx      # Contact form component
│   ├── fallback-image.tsx    # Image component with fallback
│   ├── main-nav.tsx          # Main navigation component
│   ├── project-carousel.tsx  # Project image carousel component
│   ├── section-header.tsx    # Section header component
│   ├── service-card.tsx      # Service card component
│   └── ui/                   # UI components (buttons, cards, etc.)
├── public/                   # Static assets
│   ├── logo.png              # Company logo
│   ├── project1-frame1.jpeg  # Project images
│   ├── project1-frame2.jpeg
│   └── ...                   # Other images and assets
├── scripts/                  # Utility scripts
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # This file
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd bini-metal
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   \`\`\`
   WEBSITE_EMAIL=binimetalwebapp@gmail.com
   EMAIL_PASSWORD=your-app-password-here
   FORWARD_EMAIL=binimetal.shpk@gmail.com
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Managing Projects

### Adding New Projects

Projects are defined in two places:

1. **Homepage featured projects**: Located in `app/page.tsx`
2. **All projects**: Located in `app/projektet/page.tsx`

To add a new project to the full projects page:

1. Open `app/projektet/page.tsx`
2. Find the `projects` array (around line 15)
3. Add a new project object with the following structure:

\`\`\`javascript
{
  id: "project9",  // Unique identifier (increment from the last one)
  title: "Your Project Title",
  description: "Detailed description of the project.",
  location: "Location, Kosovë | Klient: Client Name",
  category: "Category",  // Choose from existing or create a new category
  images: [
    { src: "/your-image-1.jpeg", alt: "Description of image 1" },
    { src: "/your-image-2.jpeg", alt: "Description of image 2" },
    // Add as many images as needed
  ],
}
\`\`\`

### Modifying Existing Projects

To modify an existing project:

1. Find the project in either `app/page.tsx` (for homepage featured projects) or `app/projektet/page.tsx` (for all projects)
2. Update the properties as needed (title, description, location, category, images)

### Project Carousel Images

The project carousel displays images for each project. Here's how to manage them:

#### Adding Images to the Carousel

1. **Prepare your images**:
   - Resize images to a consistent size (recommended: 1200x675 pixels or 16:9 aspect ratio)
   - Optimize images for web (use tools like [TinyPNG](https://tinypng.com/))
   - Name files descriptively (e.g., `project-name-view1.jpeg`)

2. **Add images to the public folder**:
   - Place your image files in the `/public` directory
   - You can create subdirectories for organization (e.g., `/public/projects/`)

3. **Reference images in the project data**:
   - In the project object, add entries to the `images` array:
   \`\`\`javascript
   images: [
     { src: "/your-image-1.jpeg", alt: "Descriptive alt text for image 1" },
     { src: "/your-image-2.jpeg", alt: "Descriptive alt text for image 2" },
   ]
   \`\`\`
   - The `src` should be the path relative to the `/public` directory
   - The `alt` text should describe the image for accessibility

#### Carousel Behavior

The carousel component (`components/project-carousel.tsx`) automatically:

- Displays navigation arrows when there are multiple images
- Shows dot indicators for each image
- Handles touch/swipe gestures on mobile
- Falls back to the logo if no images are provided

#### Customizing the Carousel

To modify the carousel behavior or appearance:

1. Open `components/project-carousel.tsx`
2. You can adjust:
   - Transition speed (change the `transition-all duration-300` classes)
   - Arrow appearance (modify the Button components)
   - Dot indicators (modify the styling in the dots section)

### Featured Projects on Homepage

The homepage displays a limited number of featured projects. To manage these:

1. Open `app/page.tsx`
2. Find the `projects` array (around line 70)
3. Modify the existing projects or replace them with different ones
4. The homepage is set to display 4 projects by default (2x2 grid)

To change the number of featured projects displayed:

1. In `app/page.tsx`, modify the grid layout in the JSX:
   \`\`\`jsx
   <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
   \`\`\`
   - Change `lg:grid-cols-2` to `lg:grid-cols-3` for 3 columns, etc.

## Content Management

### Modifying Hero Section

The hero section is the first section visitors see. To modify it:

1. Open `app/page.tsx`
2. Find the "Hero Section" (around line 70)
3. Update the heading, subheading, and button text as needed:
   \`\`\`jsx
   <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-tight">
     Ekselencë në <span className="text-gray-200">Ndërtimin Metalik</span>
   </h1>
   <p className="mt-6 max-w-[700px] text-base text-gray-200 md:text-lg lg:text-xl px-4 sm:px-0">
     Ofrojmë zgjidhje cilësore të fabrikimit dhe ndërtimit metalik për më shumë se 15 vjet
   </p>
   \`\`\`

To change the background:

1. The hero currently uses a gradient background:
   \`\`\`jsx
   <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900 to-blue-700">
     <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
   </div>
   \`\`\`

2. To use an image background instead:
   \`\`\`jsx
   <div className="absolute inset-0 z-0">
     <Image 
       src="/your-hero-image.jpg" 
       alt="Hero background" 
       fill 
       className="object-cover"
       priority
     />
     <div className="absolute inset-0 bg-black/50"></div>
   </div>
   \`\`\`
   (Remember to import Image from 'next/image' at the top of the file)

### About Section

To modify the About section:

1. Open `app/page.tsx`
2. Find the "About Section" (around line 110)
3. Update the heading, paragraphs, and statistics:
   \`\`\`jsx
   <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Rreth Bini Metal</h2>
   <div className="mt-8 space-y-6">
     <p className="text-base md:text-lg">
       E themeluar në vitin 2008, Bini Metal është vendosur si lider në industrinë e ndërtimit metalik...
     </p>
     // Additional paragraphs
   </div>
   \`\`\`

4. To change the statistics, modify the AnimatedStat components:
   \`\`\`jsx
   <AnimatedStat value={15} label="Vite Eksperiencë" suffix="+" />
   <AnimatedStat value={500} label="Projekte të Përfunduara" suffix="+" />
   <AnimatedStat value={100} label="Kënaqësi Klienti" suffix="%" />
   \`\`\`

### Services Section

To modify the Services section:

1. Open `app/page.tsx`
2. Find the "Services Section" (around line 160)
3. Update the section header:
   \`\`\`jsx
   <SectionHeader
     title="Shërbimet Tona"
     subtitle="Ne ofrojmë një gamë të gjerë shërbimesh të ndërtimit dhe fabrikimit metalik"
   />
   \`\`\`

4. Modify the service cards:
   \`\`\`jsx
   <ServiceCard
     icon={Building2}
     title="Fabrikim i Çelikut Strukturor"
     description="Fabrikim me porosi i komponentëve të çelikut strukturor për ndërtesa komerciale dhe industriale."
   />
   \`\`\`
   - Change the icon by importing a different icon from 'lucide-react'
   - Update the title and description text

5. To add a new service, copy an existing ServiceCard component and modify it
6. To remove a service, delete the corresponding ServiceCard component

### Testimonials Section

To modify the Testimonials section:

1. Open `app/page.tsx`
2. Find the "Testimonials Section" (around line 260)
3. Update the section header:
   \`\`\`jsx
   <SectionHeader
     title="Çfarë Thonë Klientët Tanë"
     subtitle="Dëgjoni nga disa prej klientëve tanë të kënaqur rreth përvojës së tyre të punës me Bini Metal"
   />
   \`\`\`

4. Modify the testimonial cards:
   \`\`\`jsx
   <Card className="shadow-md hover:shadow-lg transition-all duration-300 hover-lift">
     <CardContent className="p-8">
       <div className="flex items-center gap-4">
         <div className="relative h-16 w-16 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
           <span className="text-xl font-bold text-primary">AK</span>
         </div>
         <div>
           <p className="font-semibold">Arben Krasniqi</p>
           <p className="text-sm text-muted-foreground">Menaxher Projekti, ABC Ndërtim</p>
         </div>
       </div>
       <div className="mt-6 relative">
         <svg className="absolute -top-4 -left-4 h-8 w-8 text-primary/20" fill="currentColor" viewBox="0 0 32 32">
           <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
         </svg>
         <p className="italic text-base">
           "Bini Metal ofroi cilësi të jashtëzakonshme në projektin tonë të ndërtesës komerciale..."
         </p>
       </div>
     </CardContent>
   </Card>
   \`\`\`
   - Update the initials (`AK`), name, position, and testimonial text
   - To add a new testimonial, copy an existing Card component and modify it
   - To remove a testimonial, delete the corresponding Card component

### Contact Information

To update contact information:

1. Open `app/page.tsx`
2. Find the "Contact Section" (around line 330)
3. Update the address, phone, and social media links:
   \`\`\`jsx
   <div className="flex items-center gap-4">
     <div className="rounded-full bg-gray-100 p-4 flex items-center justify-center">
       <MapPin className="h-6 w-6 text-gray-700 flex-shrink-0" />
     </div>
     <div>
       <h3 className="font-medium">Adresa</h3>
       <p className="text-base text-muted-foreground">Suharek/Mushtisht/Rruga Xhele Esati</p>
     </div>
   </div>
   \`\`\`

4. Update the working hours:
   \`\`\`jsx
   <div className="bg-background p-5 rounded-lg shadow-sm border border-border/50">
     <p className="font-medium">E Hënë - E Premte</p>
     <p className="text-muted-foreground">8:00 - 17:00</p>
   </div>
   \`\`\`

5. Also update the same information in the footer section (around line 480)

## Navigation and Layout

### Main Navigation

The main navigation is defined in `components/main-nav.tsx`. To modify it:

1. Open `components/main-nav.tsx`
2. Update the navigation links as needed:
   \`\`\`jsx
   <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors relative group">
     Rreth Nesh
     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
   </Link>
   \`\`\`

3. To add a new page to the navigation:
   - Create the new page in the `app` directory (e.g., `app/new-page/page.tsx`)
   - Add a new Link component to the navigation:
   \`\`\`jsx
   <Link href="/new-page" className="text-sm font-medium hover:text-primary transition-colors relative group">
     New Page
     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
   </Link>
   \`\`\`

### Footer

To modify the footer:

1. Open `app/page.tsx`
2. Find the "Footer" section (around line 480)
3. Update the content as needed:
   \`\`\`jsx
   <div className="flex items-center gap-3">
     <FallbackImage
       src="/logo.png"
       alt="Bini Metal Logo"
       width={50}
       height={50}
       className="object-contain"
     />
     <span className="text-xl font-bold">Bini Metal</span>
   </div>
   \`\`\`

4. Update the copyright year if needed:
   \`\`\`jsx
   <p className="text-xs text-muted-foreground">
     &copy; {new Date().getFullYear()} Bini Metal. Të gjitha të drejtat e rezervuara.
   </p>
   \`\`\`

## Styling and Design

### Colors and Theme

The website uses Tailwind CSS for styling. The main colors are defined in `tailwind.config.js`:

1. Open `tailwind.config.js`
2. Find the `colors` section:
   \`\`\`javascript
   colors: {
     border: "hsl(var(--border))",
     input: "hsl(var(--input))",
     ring: "hsl(var(--ring))",
     background: "hsl(var(--background))",
     foreground: "hsl(var(--foreground))",
     primary: {
       DEFAULT: "hsl(var(--primary))",
       foreground: "hsl(var(--primary-foreground))",
     },
     // ...other colors
   }
   \`\`\`

3. The actual color values are defined in `app/globals.css`:
   \`\`\`css
   :root {
     --background: 0 0% 100%;
     --foreground: 222.2 84% 4.9%;
     --card: 0 0% 100%;
     --card-foreground: 222.2 84% 4.9%;
     --popover: 0 0% 100%;
     --popover-foreground: 222.2 84% 4.9%;
     --primary: 221.2 83.2% 53.3%;
     --primary-foreground: 210 40% 98%;
     // ...other colors
   }
   \`\`\`

4. To change the primary color, modify the `--primary` value in `app/globals.css`
   - The format is `hue saturation lightness`
   - For example, to change to a green color: `--primary: 142 76% 36%;`

### Typography

To modify typography:

1. The website uses the Inter font, defined in `app/layout.tsx`:
   \`\`\`javascript
   const inter = Inter({ subsets: ["latin"] })
   \`\`\`

2. To change the font:
   - Import a different font from 'next/font/google'
   - Replace the Inter font with your chosen font

3. Font sizes and weights are controlled by Tailwind classes in the components:
   - `text-sm`, `text-base`, `text-lg`, `text-xl`, etc. for size
   - `font-normal`, `font-medium`, `font-bold`, etc. for weight

### Responsive Design

The website is fully responsive. Key breakpoints are:

- `sm`: 640px and above
- `md`: 768px and above
- `lg`: 1024px and above
- `xl`: 1280px and above
- `2xl`: 1536px and above

To modify responsive behavior, adjust the Tailwind classes in the components:

\`\`\`jsx
<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
\`\`\`
- This creates a 1-column grid on mobile, 2-column on small screens, and 3-column on large screens

## Email Functionality

The contact form sends emails using Nodemailer. To configure it:

1. Open `app/actions/send-email.ts`
2. The email functionality is defined in the `sendEmail` function
3. Configure the email content:
   \`\`\`javascript
   const mailOptions = {
     from: `Bini Metal Website <${process.env.WEBSITE_EMAIL || "noreply@binimetal.com"}>`,
     to: process.env.FORWARD_EMAIL || "umalmamaj@gmail.com",
     subject: `Kontakt nga ${validatedData.firstName} ${validatedData.lastName} - Bini Metal`,
     text: `
   Dërguar nga: ${validatedData.firstName} ${validatedData.lastName}
   Email: ${validatedData.email}
   Telefoni: ${validatedData.phone}
   Lloji i projektit: ${validatedData.projectType || "N/A"}

   Mesazhi:
   ${validatedData.message}
     `,
     html: `
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
     <h2 style="color: #2563eb;">Mesazh i ri nga faqja e internetit</h2>
     <p><strong>Emri:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
     <p><strong>Email:</strong> ${validatedData.email}</p>
     <p><strong>Telefon:</strong> ${validatedData.phone}</p>
     <p><strong>Lloji i Projektit:</strong> ${validatedData.projectType || "Nuk është specifikuar"}</p>
     <h3 style="margin-top: 20px; color: #374151;">Mesazhi:</h3>
     <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
       ${validatedData.message.replace(/\n/g, "<br>")}
     </div>
   </div>
     `,
     replyTo: validatedData.email,
   }
   \`\`\`

4. Update the environment variables in `.env.local`:
   \`\`\`
   WEBSITE_EMAIL=binimetalwebapp@gmail.com
   EMAIL_PASSWORD=your-app-password-here
   FORWARD_EMAIL=binimetal.shpk@gmail.com
   \`\`\`

### Gmail Configuration

For the email functionality to work with Gmail:

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)" and create a password for "Bini Metal Website"
   - Use this password in your EMAIL_PASSWORD environment variable

## Deployment

### Vercel Deployment

The easiest way to deploy the website is with Vercel:

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Configure the project:
   - Set the Framework Preset to "Next.js"
   - Add the environment variables:
     - WEBSITE_EMAIL
     - EMAIL_PASSWORD
     - FORWARD_EMAIL
5. Click "Deploy"

### Custom Domain

To use a custom domain (e.g., binimetal.com):

1. In your Vercel project dashboard, go to "Domains"
2. Add your domain
3. Follow the instructions to configure your DNS settings

### Other Deployment Options

#### Docker Deployment

1. Build the Docker image:
   \`\`\`bash
   docker build -t bini-metal-website .
   \`\`\`

2. Run the container:
   \`\`\`bash
   docker run -p 3000:3000 \
     -e WEBSITE_EMAIL=binimetalwebapp@gmail.com \
     -e EMAIL_PASSWORD=your-app-password-here \
     -e FORWARD_EMAIL=binimetal.shpk@gmail.com \
     bini-metal-website
   \`\`\`

#### Traditional Hosting

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. The output will be in the `.next` directory
3. Deploy this directory to your hosting provider
4. Make sure to set up the environment variables on your hosting provider

## Troubleshooting

### Common Issues

#### Images Not Loading

1. Check that the image files exist in the `/public` directory
2. Verify the file paths in your code match the actual file names (case-sensitive)
3. Make sure the image format is supported (JPEG, PNG, GIF, WebP)
4. Try using the `FallbackImage` component instead of the regular `Image` component

#### Email Not Working

1. Verify your environment variables are set correctly
2. Check that your Gmail account has 2-Step Verification enabled
3. Verify you're using an App Password, not your regular password
4. Check your spam folder for test emails
5. Look for errors in the server logs

#### Carousel Not Working

1. Check that the image paths in the project data are correct
2. Verify that the images exist in the `/public` directory
3. Make sure the `images` array in the project data is properly formatted

#### Deployment Issues

1. Check for build errors in the Vercel deployment logs
2. Verify that all environment variables are set in the Vercel project settings
3. Make sure all dependencies are properly installed

### Debugging

To debug issues:

1. Check the browser console for JavaScript errors
2. Look at the Network tab in browser DevTools to see if images or API requests are failing
3. Add console.log statements to your code to trace execution
4. Use the `debugger` statement to pause execution and inspect variables

## Technical Details

### Project Structure

The website uses the Next.js App Router, which follows a file-based routing system:

- `app/page.tsx` is the homepage
- `app/projektet/page.tsx` is the projects page
- `app/layout.tsx` is the root layout that wraps all pages

### Component Architecture

The website uses a component-based architecture:

- `components/` contains reusable components
- Each component is responsible for a specific piece of functionality
- Components are composed together to build pages

### State Management

The website uses React's built-in state management:

- `useState` for component-level state
- `useEffect` for side effects
- No global state management library is used

### Server Actions

The website uses Next.js Server Actions for form submissions:

- `app/actions/send-email.ts` contains the server action for sending emails
- The contact form submits directly to this server action

### Image Optimization

The website uses Next.js Image component for optimized images:

- `FallbackImage` is a wrapper around the Next.js Image component that adds fallback functionality
- Images are automatically optimized for different screen sizes
- Lazy loading is enabled by default

### Styling

The website uses Tailwind CSS for styling:

- Utility classes are used for most styling
- Custom components from shadcn/ui are used for UI elements
- Global styles are defined in `app/globals.css`

### SEO

SEO metadata is defined in `app/layout.tsx`:

- Title and description
- Open Graph tags
- Twitter card
- Favicon and other icons

### Accessibility

The website follows accessibility best practices:

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Proper color contrast
- Alt text for images

### Performance

The website is optimized for performance:

- Server components for faster initial load
- Image optimization
- Code splitting
- Font optimization
- Minimal JavaScript

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Lucide Icons](https://lucide.dev/icons/)

## Features

- Responsive design
- Contact form with email functionality
- Project showcase
- Service information
- Testimonials
- SEO optimized
- Security headers
- Rate limiting
- Error handling

## Image Handling

The website currently uses only the logo image. All other images have been removed and will need to be added manually later.

### Required Images

The only required image is:

\`\`\`
public/logo.png - Company logo
\`\`\`

### Fixing Missing Image Errors

If you're experiencing runtime errors due to missing images, run:

\`\`\`
npm run fix-missing-images
\`\`\`

This script creates empty placeholder files for specific problematic images that might be causing runtime errors. It's automatically run before `npm run dev` and `npm run build`.

### Finding Problematic Image References

To find references to problematic images in the codebase, run:

\`\`\`
npm run check-problematic-images
\`\`\`

This will help you identify and fix any remaining references to specific problematic images.

### Purging and Creating Placeholders

To completely purge all image files and create empty placeholders for any referenced images:

\`\`\`
npm run purge-and-create-placeholders
\`\`\`

### Finding All Image References

To find all image references in the codebase, run:

\`\`\`
npm run deep-image-search
\`\`\`

### Adding Your Own Images

To add your own images:

1. Place the images in the `public` directory
2. Update the references in the code to point to your images

## Rate Limiting

The contact form includes rate limiting to prevent abuse. By default, it limits to 5 submissions per email address per hour.

- In production environments with Vercel KV configured, it uses Vercel KV for rate limiting
- In preview/development environments or when Vercel KV is not configured, it uses an in-memory store for rate limiting

### Configuring Vercel KV (Optional)

To use Vercel KV for rate limiting in production:

1. Create a Vercel KV database in your Vercel dashboard
2. Add the KV environment variables to your project:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

If these variables are not provided, the application will automatically fall back to using in-memory rate limiting.

## Email Functionality

The contact form sends emails using Nodemailer with Gmail. This will work when the website is deployed to your domain, but may not work in Vercel preview environments due to DNS lookup limitations.

### Gmail Configuration

Make sure your Gmail account is properly configured:

1. Enable 2-Step Verification on your Google account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use this App Password in your EMAIL_PASSWORD environment variable

## Standard Deployment Instructions

1. **Install dependencies:**
   \`\`\`
   npm install
   \`\`\`

2. **Set up environment variables:**
   Create a `.env.local` file with the following variables:
   \`\`\`
   WEBSITE_EMAIL=binimetalwebapp@gmail.com
   EMAIL_PASSWORD=your-app-password-here
   FORWARD_EMAIL=binimetal.shpk@gmail.com
   \`\`\`

Note: The email functionality may not work in Vercel preview environments due to DNS lookup limitations, but it will work when deployed to your domain.

3. **Gmail App Password:**
   - Enable 2-Step Verification on your Google account
   - Generate an App Password at https://myaccount.google.com/apppasswords
   - Use this App Password in your EMAIL_PASSWORD environment variable

4. **Build and start the application:**
   \`\`\`
   npm run build
   npm start
   \`\`\`

## Docker Deployment

### Using Docker

1. **Build the Docker image:**
   \`\`\`
   docker build -t bini-metal-website .
   \`\`\`

2. **Run the container:**
   \`\`\`
   docker run -p 3000:3000 \
     -e WEBSITE_EMAIL=binimetalwebapp@gmail.com \
     -e EMAIL_PASSWORD=your-app-password-here \
     -e FORWARD_EMAIL=binimetal.shpk@gmail.com \
     bini-metal-website
   \`\`\`

3. **Verify public folder:**
   After deploying, you can verify that the public folder is correctly included by running:
   \`\`\`
   docker exec -it [container_id] npm run verify-public
   \`\`\`

### Using Docker Compose

1. **Create a `.env` file with your environment variables:**
   \`\`\`
   WEBSITE_EMAIL=binimetalwebapp@gmail.com
   EMAIL_PASSWORD=your-app-password-here
   FORWARD_EMAIL=binimetal.shpk@gmail.com
   \`\`\`

2. **Start the application:**
   \`\`\`
   docker-compose up -d
   \`\`\`

### Troubleshooting Public Folder Issues

If you're experiencing issues with the public folder not being included in your deployment:

1. **Verify the Dockerfile**: Ensure the Dockerfile correctly copies the public folder to the standalone output.

2. **Use volume mounting**: The docker-compose.yml file is configured to mount the public folder as a volume.

3. **Manual copy**: If needed, you can manually copy the public folder to the container:
   \`\`\`
   docker cp ./public [container_id]:/app/
   \`\`\`

4. **Check file permissions**: Ensure the files have the correct permissions:
   \`\`\`
   docker exec -it [container_id] chown -R nextjs:nodejs /app/public
   \`\`\`

## Production Optimizations

### SEO

The website includes:
- Proper metadata
- Open Graph tags
- Twitter card support
- Sitemap.xml
- Robots.txt
- Structured data

### Security

- Content Security Policy
- XSS protection headers
- Rate limiting for the contact form
- HTTPS enforcement
- Secure cookie handling

### Performance

- Image optimization
- Code splitting
- Server-side rendering
- Static generation where possible
- Docker multi-stage builds

### Monitoring and Error Handling

- Custom error pages
- Loading states
- Error boundaries

## Deployment to Cloud Platforms

### Vercel

1. Connect your GitHub repository to Vercel
2. Add the environment variables in the Vercel dashboard
3. Deploy

### AWS Elastic Beanstalk with Docker

1. Install the EB CLI
2. Initialize your EB application:
   \`\`\`
   eb init
   \`\`\`
3. Create an environment and deploy:
   \`\`\`
   eb create
   \`\`\`
4. Set environment variables:
   \`\`\`
   eb setenv WEBSITE_EMAIL=binimetalwebapp@gmail.com EMAIL_PASSWORD=your-app-password-here FORWARD_EMAIL=binimetal.shpk@gmail.com
   \`\`\`

### Google Cloud Run

1. Build and push the Docker image to Google Container Registry:
   \`\`\`
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/bini-metal-website
   \`\`\`
2. Deploy to Cloud Run:
   \`\`\`
   gcloud run deploy bini-metal-website \
     --image gcr.io/YOUR_PROJECT_ID/bini-metal-website \
     --platform managed \
     --set-env-vars WEBSITE_EMAIL=binimetalwebapp@gmail.com,EMAIL_PASSWORD=your-app-password-here,FORWARD_EMAIL=binimetal.shpk@gmail.com
   \`\`\`

## Email Configuration

The contact form uses two different email sending methods:

### Production (Nodemailer with Gmail)

Make sure your Gmail account is properly configured:

1. Enable 2-Step Verification on your Google account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use this App Password in your EMAIL_PASSWORD environment variable

## Technologies Used

- Next.js 14
- React
- Tailwind CSS
- TypeScript
- Nodemailer for email functionality in production
- Docker for containerization
- Vercel KV for rate limiting (optional)

## Available Scripts

- `npm run dev`: Start the development server (automatically runs fix-missing-images first)
- `npm run build`: Build the application for production (automatically runs fix-missing-images first)
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code issues
- `npm run verify-public`: Verify that the public directory exists and contains the necessary files
- `npm run create-placeholders`: Create placeholder images for essential files
- `npm run verify-images`: Verify that all referenced images exist in the public directory
- `npm run cleanup-public`: Clean up the public directory by removing unnecessary files
- `npm run find-image-refs`: Find all image references in the codebase
- `npm run deep-image-search`: Perform a deep search for all image references in the codebase
- `npm run remove-images`: Remove all image files from the public directory except for essential files
- `npm run purge-and-create-placeholders`: Purge all image files and create empty placeholders for referenced images
- `npm run fix-missing-images`: Create placeholder files for specific problematic images
- `npm run check-problematic-images`: Check for references to problematic images in the codebase
