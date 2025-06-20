"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface FallbackImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function FallbackImage({ src, fallbackSrc = "/logo.png", alt, ...rest }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      console.log(`Image failed to load: ${src}, using fallback`)
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  return <Image src={imgSrc || fallbackSrc} alt={alt} onError={handleError} {...rest} />
}
