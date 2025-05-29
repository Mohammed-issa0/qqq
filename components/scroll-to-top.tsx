"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="cursor w-14 h-14 bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] hover:from-[#1580B8] hover:to-[#1996CE] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronUp className="w-6 h-6" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
