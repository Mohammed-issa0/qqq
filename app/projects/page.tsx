"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Database, Satellite, Building, CheckCircle, Star, Award, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import ScrollToTop from "@/components/scroll-to-top"
import { useLanguage } from "@/contexts/language-context"
import { ImageSlider } from "@/components/image-slider"
import { projects } from "@/data/projects"

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

export default function ProjectsPage() {
  const { t, dir } = useLanguage()
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight

  const projectStats = [
    { number: "5", label: dir === "rtl" ? "مشروع رئيسي" : "Main Projects", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "50+", label: dir === "rtl" ? "صورة توضيحية" : "Showcase Images", icon: <Star className="w-6 h-6" /> },
    { number: "4", label: dir === "rtl" ? "قطاع مختلف" : "Different Sectors", icon: <Database className="w-6 h-6" /> },
    { number: "100%", label: dir === "rtl" ? "معدل النجاح" : "Success Rate", icon: <Award className="w-6 h-6" /> },
  ]

  const researchProjects = [
    {
      icon: <Database className="w-8 h-8" />,
      title: dir === "rtl" ? "برمجة تطبيقات جمع البيانات" : "Data Collection Applications Programming",
      description:
        dir === "rtl"
          ? "تطوير تطبيقات متخصصة لجمع البيانات المكانية من الميدان باستخدام أحدث التقنيات"
          : "Developing specialized applications for collecting spatial data from the field using the latest technologies",
      color: "text-blue-500",
      status: dir === "rtl" ? "مستمر" : "Ongoing",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: dir === "rtl" ? "تصميم وتهيئة قواعد البيانات" : "Database Design and Configuration",
      description:
        dir === "rtl"
          ? "إنشاء قواعد بيانات جغرافية متقدمة ومحسنة للأداء مع ضمان الأمان والموثوقية"
          : "Creating advanced geographic databases optimized for performance with security and reliability assurance",
      color: "text-green-500",
      status: dir === "rtl" ? "مكتمل" : "Completed",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: dir === "rtl" ? "نمذجة البيانات المكانية" : "Spatial Data Modeling",
      description:
        dir === "rtl"
          ? "تطوير نماذج رياضية متقدمة لتحليل البيانات المكانية واستخراج الأنماط"
          : "Developing advanced mathematical models for spatial data analysis and pattern extraction",
      color: "text-purple-500",
      status: dir === "rtl" ? "قيد التطوير" : "In Development",
    },
    {
      icon: <Satellite className="w-8 h-8" />,
      title: dir === "rtl" ? "تحليل مرئيات الأقمار الصناعية" : "Satellite Imagery Analysis",
      description:
        dir === "rtl"
          ? "معالجة وتحليل صور الأقمار الصناعية لاستخراج المعلومات الجغرافية الدقيقة"
          : "Processing and analyzing satellite images to extract accurate geographic information",
      color: "text-orange-500",
      status: dir === "rtl" ? "مستمر" : "Ongoing",
    },
  ]
const lang = dir === "rtl" ? "ar" : "en";
  return (
    <div className="min-h-screen bg-white" dir={dir}>
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
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-2 mb-8 rounded-full">
              <Building className="w-5 h-5 mr-2" />
              {t("projects.badge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">{t("projects.title")}</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {dir === "rtl"
                ? "استكشف مجموعة من المشاريع المبتكرة والحلول التقنية المتقدمة التي نفخر بإنجازها"
                : "Explore a collection of innovative projects and advanced technical solutions we're proud to have accomplished"}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Project Stats */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="text-center shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-[#1996CE] mb-4 flex justify-center">{stat.icon}</div>
                    <div className="text-4xl font-black text-[#3A3A3C] mb-2">{stat.number}</div>
                    <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Projects */}
      <motion.section
        className="py-20 px-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1996CE]/10 text-[#1996CE] border-[#1996CE]/20 text-lg px-6 py-2 mb-6">
              {dir === "rtl" ? "مشاريعنا الرئيسية" : "Our Main Projects"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("projects.title")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className={`${index % 2 === 1 ? "md:flex-row-reverse" : "flex-row-reverse"} flex flex-col md:flex-row items-center gap-12`}
              >
                <div className="w-full md:w-1/2">
                  <ImageSlider
                    images={project.images}
                    alt={project.title[lang]}
                    className="shadow-2xl hover:shadow-3xl transition-all duration-500"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Card className="shadow-2xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500">
                    <CardHeader className="bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] text-white p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                          <Building className="w-8 h-8" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold ">{project.title[lang]}</CardTitle>
                          <div className="flex gap-2 mt-2">
                            <Badge className="bg-white/20 text-white">{project.category[lang]}</Badge>
                            <Badge
                              className={`${
                                project.status[lang] === "مكتمل" || project.status[lang] === "Completed"
                                  ? "bg-green-500"
                                  : project.status[lang] === "نشط" || project.status[lang] === "Active"
                                    ? "bg-blue-500"
                                    : "bg-orange-500"
                              } text-white`}
                            >
                              {project.status[lang]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <CardDescription className="text-[#3A3A3C] text-lg leading-relaxed mb-6 ">
                        {project.title[lang]}
                      </CardDescription>

                      {project.technologies && (
                        <div className="mb-6">
                          <h4 className="font-bold text-[#3A3A3C] mb-3 text-lg">
                            {dir === "rtl" ? "التقنيات المستخدمة:" : "Technologies Used:"}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-[#1996CE] border-[#1996CE]">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          asChild
                          className="bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] hover:from-[#1580B8] hover:to-[#1996CE] text-white font-bold px-6 py-3 rounded-full"
                        >
                          <Link href={`/projects/${project.id}`} className="flex items-center gap-2">
                            {t("common.view_details")}
                            <ArrowIcon className="w-5 h-5" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Research Projects */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#3A3A3C]/10 text-[#3A3A3C] border-[#3A3A3C]/20 text-lg px-6 py-2 mb-6">
              {dir === "rtl" ? "البحث والتطوير" : "Research & Development"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">
              {dir === "rtl" ? "مشاريع بحثية" : "Research Projects"}
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
              {dir === "rtl"
                ? "نعمل على تطوير حلول تقنية متقدمة في مجال البحث والتطوير لمواكبة أحدث التطورات العالمية"
                : "We work on developing advanced technical solutions in research and development to keep pace with the latest global developments"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full text-center shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="p-8">
                    <div className={`mx-auto mb-4 ${project.color} bg-gray-50 p-4 rounded-2xl w-fit`}>
                      {project.icon}
                    </div>
                    <CardTitle className="text-lg text-[#3A3A3C] font-bold mb-2">{project.title}</CardTitle>
                    <Badge
                      className={`${
                        project.status === "مكتمل" || project.status === "Completed"
                          ? "bg-green-500"
                          : project.status === "مستمر" || project.status === "Ongoing"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      } text-white`}
                    >
                      {project.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-[#3A3A3C] leading-relaxed">{project.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-r from-[#1996CE] via-[#2BA3D4] to-[#3A3A3C] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-2 mb-8 rounded-full">
              {dir === "rtl" ? "انضم إلى قائمة عملائنا الناجحين" : "Join Our Successful Clients List"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {dir === "rtl" ? "هل لديك مشروع في ذهنك؟" : "Do You Have a Project in Mind?"}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {dir === "rtl"
                ? "دعنا نساعدك في تحويل فكرتك إلى واقع باستخدام أحدث التقنيات وأفضل الممارسات"
                : "Let us help you turn your idea into reality using the latest technologies and best practices"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1996CE] hover:bg-gray-100 text-xl px-8 py-4 rounded-full font-bold shadow-2xl"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    {dir === "rtl" ? "ابدأ مشروعك معنا" : "Start Your Project With Us"}
                    <ArrowIcon className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1996CE] text-xl px-8 py-4 rounded-full font-bold"
                >
                  <Link href="/services">{t("services.view_all")}</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
