"use client"

import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="text-8xl mb-6">🔍</div>
        <h2 className="text-3xl font-bold text-[#3A3A3C] mb-4">المشروع غير موجود</h2>
        <p className="text-gray-600 mb-8 leading">المشروع غير موجود</p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          عذراً، لم نتمكن من العثور على المشروع المطلوب. ربما تم حذفه أو تغيير رابطه.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#1996CE] hover:bg-[#1580B8] text-white">
            <Link href="/projects" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              عرض جميع المشاريع
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              الصفحة الرئيسية
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
