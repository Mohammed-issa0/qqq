"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import React from "react"

interface ImageSliderProps {
  images: string[]
  alt: string
  className?: string
}

export const ImageSlider = ({ images, alt, className = "" }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const { dir } = useLanguage()

  // Ensure images is always an array and filter out invalid entries
  const safeImages = React.useMemo(() => {
    try {
      if (!images || !Array.isArray(images)) {
        return ["/placeholder.svg?height=400&width=600&text=مشروع"]
      }

      const validImages = images.filter((img) => img && typeof img === "string" && img.trim() !== "")
      return validImages.length > 0 ? validImages : ["/placeholder.svg?height=400&width=600&text=مشروع"]
    } catch (error) {
      console.warn("Error processing images:", error)
      return ["/placeholder.svg?height=400&width=600&text=مشروع"]
    }
  }, [images])

  // Filter out broken images
  const validImages = safeImages.filter((_, index) => !imageErrors[index])

  useEffect(() => {
    setCurrentIndex(0)
    setImageErrors({})
    setIsLoading(true)
  }, [safeImages])

  const handleImageError = (index: number) => {
    console.warn(`Failed to load image at index ${index}:`, safeImages[index])
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const nextImage = () => {
    if (validImages.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % validImages.length)
    }
  }

  const prevImage = () => {
    if (validImages.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
    }
  }

  const goToImage = (index: number) => {
    if (index >= 0 && index < validImages.length) {
      setCurrentIndex(index)
    }
  }

  // If no valid images, show placeholder
  if (validImages.length === 0) {
    return (
      <div
        className={`relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}
      >
        <div className="text-center text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg font-medium">{dir === "rtl" ? "لا توجد صور متاحة" : "No images available"}</p>
        </div>
      </div>
    )
  }

  // Get current valid image with fallback
  const currentImage = validImages[currentIndex] || validImages[0] || "/placeholder.svg?height=400&width=600&text=مشروع"

  return (
    <div className={`relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden ${className}`}>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1996CE]"></div>
        </div>
      )}

      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentIndex}-${currentImage}`}
          initial={{ opacity: 0, x: dir === "rtl" ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir === "rtl" ? 100 : -100 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={`${alt} - ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => handleImageError(currentIndex)}
            onLoad={handleImageLoad}
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {validImages.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 z-20"
            onClick={dir === "rtl" ? nextImage : prevImage}
            aria-label={dir === "rtl" ? "الصورة التالية" : "Previous image"}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 z-20"
            onClick={dir === "rtl" ? prevImage : nextImage}
            aria-label={dir === "rtl" ? "الصورة السابقة" : "Next image"}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
{/*       {validImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`${dir === "rtl" ? "اذهب للصورة" : "Go to image"} ${index + 1}`}
            />
          ))}
        </div>
      )} */}

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
          {currentIndex + 1} / {validImages.length}
        </div>
      )}
    </div>
  )
}
