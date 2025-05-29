"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Project page error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
      <div className="text-center p-8 max-w-md mx-auto">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-[#3A3A3C] mb-4">حدث خطأ غير متوقع</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          نعتذر، حدث خطأ أثناء تحميل تفاصيل المشروع. يرجى المحاولة مرة أخرى أو العودة إلى صفحة المشاريع.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="bg-[#1996CE] hover:bg-[#1580B8] text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            حاول مرة أخرى
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects" className="flex items-center gap-2">
              العودة للمشاريع
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              الرئيسية
            </Link>
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">تفاصيل الخطأ (للمطورين)</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">{error.message}</pre>
          </details>
        )}
      </div>
    </div>
  )
}
