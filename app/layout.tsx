import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Bini Metal - Ekselencë në Ndërtimin Metalik",
    template: "%s | Bini Metal",
  },
  description: "Ofrojmë zgjidhje cilësore të fabrikimit dhe ndërtimit metalik për më shumë se 15 vjet",
  keywords: [
    "ndërtim metalik",
    "fabrikim çeliku",
    "struktura metalike",
    "çati metalike",
    "fasada metalike",
    "Bini Metal",
    "Kosovë",
  ],
  authors: [{ name: "Bini Metal" }],
  creator: "Bini Metal",
  publisher: "Bini Metal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://binimetal.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bini Metal - Ekselencë në Ndërtimin Metalik",
    description: "Ofrojmë zgjidhje cilësore të fabrikimit dhe ndërtimit metalik për më shumë se 15 vjet",
    url: "https://binimetal.com",
    siteName: "Bini Metal",
    locale: "sq_AL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bini Metal - Ekselencë në Ndërtimin Metalik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bini Metal - Ekselencë në Ndërtimin Metalik",
    description: "Ofrojmë zgjidhje cilësore të fabrikimit dhe ndërtimit metalik për më shumë se 15 vjet",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq">
      <body className={inter.className}>
        <MainNav />
        {children}
      </body>
    </html>
  )
}
