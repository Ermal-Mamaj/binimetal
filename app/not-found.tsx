import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Faqja nuk u gjet</h2>
        <p className="text-gray-600">
          Faqja që kërkuat nuk ekziston. Ju lutemi kontrolloni URL-në ose kthehuni në faqen kryesore.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Kthehu në Faqen Kryesore</Link>
        </Button>
      </div>
    </div>
  )
}
