"use client"

import { useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, Send } from "lucide-react"
import { sendEmail } from "@/app/actions/send-email"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full rounded-md py-6 group" disabled={pending}>
      {pending ? (
        "Duke dërguar..."
      ) : (
        <>
          Dërgo Mesazhin
          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </Button>
  )
}

export function ContactForm() {
  const [formState, setFormState] = useState<{
    success?: boolean
    message?: string
    fieldErrors?: Record<string, string>
  }>({})

  const formRef = useRef<HTMLFormElement>(null)

  async function clientAction(formData: FormData) {
    try {
      const result = await sendEmail(formData)
      setFormState(result)

      if (result.success && formRef.current) {
        formRef.current.reset()
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormState({
        success: false,
        message: "Ndodhi një gabim i papritur. Ju lutemi provoni përsëri.",
      })
    }
  }

  return (
    <form ref={formRef} action={clientAction} className="space-y-5">
      {formState.message && (
        <div
          className={`p-4 rounded-lg ${
            formState.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          } animate-fade-in`}
        >
          <div className="flex items-center gap-2">
            {formState.success ? (
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <p>{formState.message}</p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Emri
          </label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Arben"
            className="rounded-md focus:ring-2 focus:ring-primary/50"
            aria-invalid={formState.fieldErrors?.firstName ? "true" : "false"}
          />
          {formState.fieldErrors?.firstName && (
            <p className="text-sm text-red-600">{formState.fieldErrors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Mbiemri
          </label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Krasniqi"
            className="rounded-md focus:ring-2 focus:ring-primary/50"
            aria-invalid={formState.fieldErrors?.lastName ? "true" : "false"}
          />
          {formState.fieldErrors?.lastName && <p className="text-sm text-red-600">{formState.fieldErrors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="arben.krasniqi@example.com"
          className="rounded-md focus:ring-2 focus:ring-primary/50"
          aria-invalid={formState.fieldErrors?.email ? "true" : "false"}
        />
        {formState.fieldErrors?.email && <p className="text-sm text-red-600">{formState.fieldErrors.email}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Telefon
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(+355) 123-4567"
          className="rounded-md focus:ring-2 focus:ring-primary/50"
          aria-invalid={formState.fieldErrors?.phone ? "true" : "false"}
        />
        {formState.fieldErrors?.phone && <p className="text-sm text-red-600">{formState.fieldErrors.phone}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="projectType" className="text-sm font-medium">
          Lloji i Projektit
        </label>
        <select
          id="projectType"
          name="projectType"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Zgjidhni një lloj projekti</option>
          <option value="Fabrikim i Çelikut Strukturor">Fabrikim i Çelikut Strukturor</option>
          <option value="Çati & Fasada Metalike">Çati & Fasada Metalike</option>
          <option value="Fabrikim Metalik me Porosi">Fabrikim Metalik me Porosi</option>
          <option value="Shkallë & Parmakë Metalikë">Shkallë & Parmakë Metalikë</option>
          <option value="Punime Metalike Arkitekturore">Punime Metalike Arkitekturore</option>
          <option value="Sisteme Ndërtesash Metalike">Sisteme Ndërtesash Metalike</option>
          <option value="Tjetër">Tjetër</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Mesazhi
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Na tregoni për projektin tuaj..."
          className="min-h-[120px] resize-y rounded-md focus:ring-2 focus:ring-primary/50"
          aria-invalid={formState.fieldErrors?.message ? "true" : "false"}
        />
        {formState.fieldErrors?.message && <p className="text-sm text-red-600">{formState.fieldErrors.message}</p>}
      </div>

      <SubmitButton />
    </form>
  )
}
