"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <div className="space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-gray-900">Diçka shkoi keq!</h1>
        <p className="text-gray-600">
          Na vjen keq, por ndodhi një gabim i papritur. Ju lutemi provoni përsëri ose kthehuni në faqen kryesore.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()} variant="default">
            Provo Përsëri
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Kthehu në Faqen Kryesore</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
