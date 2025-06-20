"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
  duration?: number
}

export function AnimatedStat({ value, label, suffix = "", duration = 2000 }: AnimatedStatProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLParagraphElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const end = Math.min(value, 999)
          const step = Math.ceil(end / (duration / 16))

          const timer = setInterval(() => {
            start += step
            if (start > end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [value, duration, hasAnimated])

  return (
    <div className="text-center">
      <p ref={countRef} className="text-3xl sm:text-4xl font-bold text-gray-800">
        {count}
        {suffix}
      </p>
      <p className="text-sm sm:text-base text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
