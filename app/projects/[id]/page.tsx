"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Clock,
  Code,
  ExternalLink,
  AlertCircle,
  Home,
  CheckCircle,
  Target,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import ScrollToTop from "@/components/scroll-to-top"
import { useLanguage } from "@/contexts/language-context"
import { ImageSlider } from "@/components/image-slider"
import { getProjectById, getProjects, type Project } from "@/data/projects"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

// Safe text helper function
const getSafeText = (text: any, maxLength = 120, fallback = ""): string => {
  try {
    if (!text || typeof text !== "string") {
      return fallback
    }
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  } catch (error) {
    console.warn("Error processing text:", error)
    return fallback
  }
}

// Safe array helper function
const getSafeArray = (arr: any): any[] => {
  try {
    return Array.isArray(arr) ? arr : []
  } catch (error) {
    console.warn("Error processing array:", error)
    return []
  }
}

// Error Boundary Component
const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  const { dir } = useLanguage()

  return (
    <div className="min-h-screen bg-white pt-20 flex items-center justify-center" dir={dir}>
      <div className="text-center p-8 max-w-md mx-auto">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#3A3A3C] mb-4">
          {dir === "rtl" ? "حدث خطأ غير متوقع" : "Something went wrong"}
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {dir === "rtl"
            ? "نعتذر، حدث خطأ أثناء تحميل تفاصيل المشروع. يرجى المحاولة مرة أخرى أو العودة إلى صفحة المشاريع."
            : "Sorry, an error occurred while loading the project details. Please try again or return to the projects page."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={resetError} className="bg-[#1996CE] hover:bg-[#1580B8] text-white flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {dir === "rtl" ? "حاول مرة أخرى" : "Try Again"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects" className="flex items-center gap-2">
              {dir === "rtl" ? "العودة للمشاريع" : "Back to Projects"}
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              {dir === "rtl" ? "الرئيسية" : "Home"}
            </Link>
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              {dir === "rtl" ? "تفاصيل الخطأ (للمطورين)" : "Error Details (for developers)"}
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">{error.message}</pre>
          </details>
        )}
      </div>
    </div>
  )
}

// Not Found Component
const ProjectNotFound = () => {
  const { dir } = useLanguage()
  const ArrowIcon = dir === "rtl" ? ArrowRight : ArrowLeft

  return (
    <div className="min-h-screen bg-white pt-20 flex items-center justify-center" dir={dir}>
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-3xl font-bold text-[#3A3A3C] mb-4">
          {dir === "rtl" ? "المشروع غير موجود" : "Project Not Found"}
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {dir === "rtl"
            ? "عذراً، لم نتمكن من العثور على المشروع المطلوب. ربما تم حذفه أو تغيير رابطه."
            : "Sorry, we couldn't find the requested project. It may have been deleted or its link changed."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#1996CE] hover:bg-[#1580B8] text-white">
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowIcon className="w-4 h-4" />
              {dir === "rtl" ? "عرض جميع المشاريع" : "View All Projects"}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              {dir === "rtl" ? "الصفحة الرئيسية" : "Home Page"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { t, dir } = useLanguage()
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<Project | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const ArrowIcon = dir === "rtl" ? ArrowRight : ArrowLeft

  useEffect(() => {
    try {
      // Validate params
      if (!params?.id || typeof params.id !== "string") {
        throw new Error("Invalid project ID")
      }

      // Load project data
      const projectData = getProjectById(params.id)

      if (!projectData) {
        setProject(null)
        setIsLoading(false)
        return
      }

      // Validate project data structure
      if (!projectData.title || !projectData.description || !projectData.details) {
        throw new Error("Invalid project data structure")
      }

      setProject(projectData)

      // Load related projects safely
      try {
        const allProjects = getProjects()
        const related = getSafeArray(allProjects)
          .filter((p) => p && p.id && p.id !== projectData.id)
          .slice(0, 3)
        setRelatedProjects(related)
      } catch (relatedError) {
        console.warn("Error loading related projects:", relatedError)
        setRelatedProjects([])
      }

      setIsLoading(false)
    } catch (err) {
      console.error("Error loading project:", err)
      setError(err as Error)
      setIsLoading(false)
    }
  }, [params.id])

  if (error) {
    return <ErrorFallback error={error} resetError={() => setError(null)} />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1996CE] mx-auto mb-4"></div>
          <p className="text-[#3A3A3C] text-lg">{dir === "rtl" ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return <ProjectNotFound />
  }
const lang = dir === "rtl" ? "ar" : "en";
  // Safe getters for project data
  const getProjectTitle = () => {
    try {
      return project.title?.[lang] || project.title?.ar || project.title?.en || "مشروع"
    } catch {
      return "مشروع"
    }
  }

  const getProjectDescription = () => {
    try {
      return project.description?.[lang] || project.description?.ar || project.description?.en || "وصف المشروع"
    } catch {
      return "وصف المشروع"
    }
  }

  const getProjectDetails = () => {
    try {
      return project.details?.[lang] || project.details?.ar || project.details?.en || "تفاصيل المشروع"
    } catch {
      return "تفاصيل المشروع"
    }
  }

  const getProjectCategory = () => {
    try {
      return project.category?.[lang] || project.category?.ar || project.category?.en || "مشروع"
    } catch {
      return "مشروع"
    }
  }

  const getProjectStatus = () => {
    try {
      return project.status?.[lang] || project.status?.ar || project.status?.en || "قيد التطوير"
    } catch {
      return "قيد التطوير"
    }
  }

  const getProjectFeatures = () => {
    try {
      return getSafeArray(project.features?.[lang] || project.features?.ar || project.features?.en)
    } catch {
      return []
    }
  }

  const getProjectObjectives = () => {
    try {
      return getSafeArray(project.objectives?.[lang] || project.objectives?.ar || project.objectives?.en)
    } catch {
      return []
    }
  }

  const getProjectImages = () => {
    try {
      return getSafeArray(project.images)
    } catch {
      return ["/placeholder.svg?height=400&width=600&text=مشروع"]
    }
  }

  const getProjectTechnologies = () => {
    try {
      return getSafeArray(project.technologies)
    } catch {
      return []
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20" dir={dir}>
      <ScrollToTop />

      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-[#1996CE] via-[#2BA3D4] to-[#3A3A3C] text-white py-20 md:py-32 px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <Button asChild variant="ghost" className="text-white hover:bg-white/20 mb-8 rounded-full">
              <Link href="/projects" className="flex items-center gap-2">
                <ArrowIcon className="w-5 h-5" />
                {t("common.back_to_projects")}
              </Link>
            </Button>
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-2 mb-8 rounded-full">
              {getProjectCategory()}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">{getProjectTitle()}</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">{getProjectDescription()}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Project Details */}
      <motion.section
        className="py-20 px-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} className="mb-12">
                <h2 className="text-3xl font-black text-[#3A3A3C] mb-6">{t("common.project_gallery")}</h2>
                <ImageSlider
                  images={getProjectImages()}
                  alt={getProjectTitle()}
                  className="h-96 lg:h-[500px] shadow-2xl"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-12">
                <Card className="shadow-2xl border-0">
                  <CardHeader className="bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] text-white p-8">
                    <CardTitle className="text-3xl font-black">
                      {dir === "rtl" ? "تفاصيل المشروع" : "Project Details"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-[#3A3A3C] text-xl leading-relaxed mb-8">{getProjectDetails()}</p>
                    </div>

                    {getProjectTechnologies().length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-[#3A3A3C] mb-4">
                          {dir === "rtl" ? "التقنيات المستخدمة" : "Technologies Used"}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {getProjectTechnologies().map((tech, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-[#1996CE] border-[#1996CE] text-lg px-4 py-2"
                            >
                              <Code className="w-4 h-4 mr-2" />
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {getProjectFeatures().length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-[#3A3A3C] mb-4">
                          {dir === "rtl" ? "المميزات الرئيسية" : "Key Features"}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {getProjectFeatures().map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-[#3A3A3C] font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {getProjectObjectives().length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold text-[#3A3A3C] mb-4">
                          {dir === "rtl" ? "أهداف المشروع" : "Project Objectives"}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {getProjectObjectives().map((objective, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                              <Target className="w-5 h-5 text-[#1996CE] flex-shrink-0" />
                              <span className="text-[#3A3A3C] font-medium">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div variants={fadeInUp} className="sticky top-24">
                <Card className="shadow-2xl border-0 mb-8">
                  <CardHeader className="bg-gradient-to-r from-[#3A3A3C] to-[#4A4A4E] text-white p-6">
                    <CardTitle className="text-2xl font-bold">
                      {dir === "rtl" ? "معلومات المشروع" : "Project Information"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {project.year && (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1996CE]/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-[#1996CE]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">{dir === "rtl" ? "السنة" : "Year"}</p>
                          <p className="text-lg font-bold text-[#3A3A3C]">{project.year}</p>
                        </div>
                      </div>
                    )}

                    {project.duration && (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1996CE]/10 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-[#1996CE]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">{dir === "rtl" ? "المدة" : "Duration"}</p>
                          <p className="text-lg font-bold text-[#3A3A3C]">{project.duration}</p>
                        </div>
                      </div>
                    )}

                    {project.client && (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1996CE]/10 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-[#1996CE]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">{dir === "rtl" ? "العميل" : "Client"}</p>
                          <p className="text-lg font-bold text-[#3A3A3C]">{project.client}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <Badge
                        className={`${
                          getProjectStatus() === "مكتمل" || getProjectStatus() === "Completed"
                            ? "bg-green-500"
                            : getProjectStatus() === "نشط" || getProjectStatus() === "Active"
                              ? "bg-blue-500"
                              : "bg-orange-500"
                        } text-white text-lg px-4 py-2 w-full justify-center`}
                      >
                        {getProjectStatus()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-2xl border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#3A3A3C] mb-4">
                      {dir === "rtl" ? "هل تحتاج مشروع مشابه؟" : "Need a Similar Project?"}
                    </h3>
                    <p className="text-[#3A3A3C] mb-6">
                      {dir === "rtl"
                        ? "تواصل معنا لمناقشة مشروعك والحصول على استشارة مجانية"
                        : "Contact us to discuss your project and get a free consultation"}
                    </p>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] hover:from-[#1580B8] hover:to-[#1996CE] text-white font-bold py-3 rounded-full"
                    >
                      <Link href="/contact" className="flex items-center justify-center gap-2">
                        {t("common.contact_us")}
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <motion.section
          className="py-20 px-4 bg-gray-50"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">
                {dir === "rtl" ? "مشاريع أخرى" : "Other Projects"}
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => {
                // Safe getters for related project data
                const getRelatedTitle = () => {
                  try {
                    return (
                      relatedProject.title?.[dir] || relatedProject.title?.ar || relatedProject.title?.en || "مشروع"
                    )
                  } catch {
                    return "مشروع"
                  }
                }

                const getRelatedDescription = () => {
                  try {
                    const desc =
                      relatedProject.description?.[dir] ||
                      relatedProject.description?.ar ||
                      relatedProject.description?.en ||
                      "وصف المشروع"
                    return getSafeText(desc, 120, "وصف المشروع")
                  } catch {
                    return "وصف المشروع"
                  }
                }

                const getRelatedCategory = () => {
                  try {
                    return (
                      relatedProject.category?.[dir] ||
                      relatedProject.category?.ar ||
                      relatedProject.category?.en ||
                      "مشروع"
                    )
                  } catch {
                    return "مشروع"
                  }
                }

                const getRelatedImages = () => {
                  try {
                    const images = getSafeArray(relatedProject.images)
                    return images.length > 0 ? [images[0]] : ["/placeholder.svg?height=400&width=600&text=مشروع"]
                  } catch {
                    return ["/placeholder.svg?height=400&width=600&text=مشروع"]
                  }
                }

                return (
                  <motion.div
                    key={relatedProject.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.03, y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="overflow-hidden shadow-2xl border-0 hover:shadow-3xl transition-all duration-500">
                      <div className="relative h-48 overflow-hidden">
                        <ImageSlider images={getRelatedImages()} alt={getRelatedTitle()} className="h-full" />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-[#3A3A3C] font-semibold">{getRelatedCategory()}</Badge>
                        </div>
                      </div>
                      <CardHeader className="p-6">
                        <CardTitle className="text-xl font-bold text-[#3A3A3C] mb-2">{getRelatedTitle()}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <CardDescription className="text-[#3A3A3C] leading-relaxed mb-4">
                          {getRelatedDescription()}
                        </CardDescription>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-[#1996CE] text-[#1996CE] hover:bg-[#1996CE] hover:text-white"
                        >
                          <Link
                            href={`/projects/${relatedProject.id}`}
                            className="flex items-center justify-center gap-2"
                          >
                            {t("common.view_details")}
                            <ArrowIcon className="w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  )
}
