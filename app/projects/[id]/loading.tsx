"use client"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-br from-[#1996CE] via-[#2BA3D4] to-[#3A3A3C] py-20 md:py-32 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded-full w-32 mx-auto mb-8"></div>
            <div className="h-12 bg-white/20 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-white/20 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Image Skeleton */}
              <div className="mb-12">
                <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
              </div>

              {/* Content Skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
