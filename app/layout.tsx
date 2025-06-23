import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Bini Metal – Konstruksione Metalike në Kosovë | Çati Çeliku, Ura, Depo Industriale",
    template: "%s | Bini Metal",
  },
  description:
    "Bini Metal është lider në ndërtimin e strukturave metalike në Kosovë, duke përfshirë ura çeliku, çati industriale dhe depo moderne. Mbi 50 vite përvojë familjare.",
  keywords: [
    "konstruksione metalike",
    "çati çeliku",
    "ura metalike",
    "depo industriale",
    "kompani ndërtimi metalik",
    "Prishtinë",
    "Kosovë",
    "fabrikim çeliku",
    "struktura metalike",
    "çati metalike",
    "fasada metalike",
    "Bini Metal",
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
    title: "Bini Metal – Konstruksione Metalike në Kosovë | Çati Çeliku, Ura, Depo Industriale",
    description:
      "Bini Metal është lider në ndërtimin e strukturave metalike në Kosovë, duke përfshirë ura çeliku, çati industriale dhe depo moderne. Mbi 50 vite përvojë familjare.",
    url: "https://binimetal.com",
    siteName: "Bini Metal",
    locale: "sq_AL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bini Metal – Konstruksione Metalike, Çati Çeliku, Ura, Depo Industriale në Kosovë",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bini Metal – Konstruksione Metalike në Kosovë | Çati Çeliku, Ura, Depo Industriale",
    description:
      "Bini Metal është lider në ndërtimin e strukturave metalike në Kosovë, duke përfshirë ura çeliku, çati industriale dhe depo moderne. Mbi 50 vite përvojë familjare.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/logo.png" }, // Changed to directly use logo.png
      // You can keep these if you want to provide specific sizes,
      // or remove them if you only want the browser to infer from logo.png
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
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
