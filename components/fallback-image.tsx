"use client"

import { useState, useEffect } from "react" // Import useEffect
import Image, { type ImageProps } from "next/image"

interface FallbackImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function FallbackImage({ src, fallbackSrc = "/logo.png", alt, ...rest }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Add useEffect to reset state when the parent's src prop changes
  useEffect(() => {
    setImgSrc(src) // Always try to use the new src from the parent
    setHasError(false) // Reset error state for the new image
  }, [src]) // Re-run this effect whenever the src prop changes

  const handleError = () => {
    if (!hasError) {
      // Only set fallback once per image load attempt
      console.log(`Image failed to load: ${src}, using fallback`)
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  return <Image src={imgSrc || fallbackSrc} alt={alt} onError={handleError} {...rest} />
}
