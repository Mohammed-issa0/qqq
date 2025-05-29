"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#1996CE] border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[#3A3A3C] text-lg font-medium"
        >
          جاري تحميل المشاريع...
        </motion.p>
      </div>
    </div>
  )
}
