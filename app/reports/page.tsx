"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  TrendingUp,
  PieChart,
  Activity,
  FileText,
  Eye,
  Users,
  Database,
  Globe,
  Download,
  Calendar,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import ScrollToTop from "@/components/scroll-to-top"
import { useLanguage } from "@/contexts/language-context"

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

export default function ReportsPage() {
  const { t, dir } = useLanguage()

  const reportStats = [
    { number: "500+", label: t("reports.completed_reports"), icon: <FileText className="w-6 h-6" /> },
    { number: "50+", label: t("reports.satisfied_clients"), icon: <Users className="w-6 h-6" /> },
    { number: "99%", label: t("reports.data_accuracy"), icon: <Database className="w-6 h-6" /> },
    { number: "24/7", label: t("reports.continuous_updates"), icon: <Activity className="w-6 h-6" /> },
  ]

  const reportTypes = [
    {
      icon: <BarChart className="w-12 h-12" />,
      title: t("reports.business_performance"),
      description: t("reports.business_performance_desc"),
      features: [
        t("reports.business_performance_feature1"),
        t("reports.business_performance_feature2"),
        t("reports.business_performance_feature3"),
        t("reports.business_performance_feature4"),
      ],
      color: "from-blue-500 to-cyan-500",
      deliverables: [
        t("reports.business_performance_deliverable1"),
        t("reports.business_performance_deliverable2"),
        t("reports.business_performance_deliverable3"),
      ],
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: t("reports.competitive_analysis"),
      description: t("reports.competitive_analysis_desc"),
      features: [
        t("reports.competitive_analysis_feature1"),
        t("reports.competitive_analysis_feature2"),
        t("reports.competitive_analysis_feature3"),
        t("reports.competitive_analysis_feature4"),
      ],
      color: "from-green-500 to-emerald-500",
      deliverables: [
        t("reports.competitive_analysis_deliverable1"),
        t("reports.competitive_analysis_deliverable2"),
        t("reports.competitive_analysis_deliverable3"),
      ],
    },
    {
      icon: <PieChart className="w-12 h-12" />,
      title: t("reports.spatial_data"),
      description: t("reports.spatial_data_desc"),
      features: [
        t("reports.spatial_data_feature1"),
        t("reports.spatial_data_feature2"),
        t("reports.spatial_data_feature3"),
        t("reports.spatial_data_feature4"),
      ],
      color: "from-purple-500 to-pink-500",
      deliverables: [
        t("reports.spatial_data_deliverable1"),
        t("reports.spatial_data_deliverable2"),
        t("reports.spatial_data_deliverable3"),
      ],
    },
    {
      icon: <Activity className="w-12 h-12" />,
      title: t("reports.performance_monitoring"),
      description: t("reports.performance_monitoring_desc"),
      features: [
        t("reports.performance_monitoring_feature1"),
        t("reports.performance_monitoring_feature2"),
        t("reports.performance_monitoring_feature3"),
        t("reports.performance_monitoring_feature4"),
      ],
      color: "from-orange-500 to-red-500",
      deliverables: [
        t("reports.performance_monitoring_deliverable1"),
        t("reports.performance_monitoring_deliverable2"),
        t("reports.performance_monitoring_deliverable3"),
      ],
    },
  ]

  const sampleReports = [
    {
      title: t("reports.sample_report1_title"),
      description: t("reports.sample_report1_desc"),
      type: t("reports.sample_report1_type"),
      date: t("reports.sample_report1_date"),
      pages: t("reports.sample_report1_pages"),
      highlights: [
        t("reports.sample_report1_highlight1"),
        t("reports.sample_report1_highlight2"),
        t("reports.sample_report1_highlight3"),
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t("reports.sample_report2_title"),
      description: t("reports.sample_report2_desc"),
      type: t("reports.sample_report2_type"),
      date: t("reports.sample_report2_date"),
      pages: t("reports.sample_report2_pages"),
      highlights: [
        t("reports.sample_report2_highlight1"),
        t("reports.sample_report2_highlight2"),
        t("reports.sample_report2_highlight3"),
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("reports.sample_report3_title"),
      description: t("reports.sample_report3_desc"),
      type: t("reports.sample_report3_type"),
      date: t("reports.sample_report3_date"),
      pages: t("reports.sample_report3_pages"),
      highlights: [
        t("reports.sample_report3_highlight1"),
        t("reports.sample_report3_highlight2"),
        t("reports.sample_report3_highlight3"),
      ],
      color: "from-purple-500 to-pink-500",
    },
  ]

  const reportFeatures = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: t("reports.feature1_title"),
      description: t("reports.feature1_desc"),
      color: "text-blue-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t("reports.feature2_title"),
      description: t("reports.feature2_desc"),
      color: "text-green-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("reports.feature3_title"),
      description: t("reports.feature3_desc"),
      color: "text-purple-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t("reports.feature4_title"),
      description: t("reports.feature4_desc"),
      color: "text-orange-500",
    },
  ]

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
              <BarChart className="w-5 h-5 mr-2" />
              {t("reports.badge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">{t("reports.title")}</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">{t("reports.description")}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Report Stats */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {reportStats.map((stat, index) => (
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

      {/* Report Types */}
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
              {t("reports.report_types_badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("reports.report_types_title")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {reportTypes.map((report, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full shadow-2xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500">
                  <CardHeader className={`bg-gradient-to-r ${report.color} text-white p-8`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        {report.icon}
                      </div>
                      <CardTitle className="text-2xl font-bold">{report.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <CardDescription className="text-[#3A3A3C] text-lg leading-relaxed mb-6">
                      {report.description}
                    </CardDescription>

                    <div className="mb-6">
                      <h4 className="font-bold text-[#3A3A3C] mb-3 text-lg">{t("reports.report_includes")}</h4>
                      <div className="space-y-3">
                        {report.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#1996CE] rounded-full"></div>
                            <span className="text-[#3A3A3C] font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#3A3A3C] mb-3 text-lg">{t("reports.deliverables")}</h4>
                      <div className="space-y-2">
                        {report.deliverables.map((deliverable, deliverableIndex) => (
                          <div key={deliverableIndex} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-[#3A3A3C] font-medium">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sample Reports */}
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
              {t("reports.sample_reports_badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("reports.sample_reports_title")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">{t("reports.sample_reports_desc")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleReports.map((report, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <CardHeader className={`bg-gradient-to-r ${report.color} text-white p-6`}>
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-8 h-8" />
                      <div>
                        <CardTitle className="text-lg font-bold">{report.title}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-white/20 text-white text-xs">{report.type}</Badge>
                          <Badge className="bg-white/20 text-white text-xs">{report.pages}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardDescription className="text-[#3A3A3C] leading-relaxed mb-4">
                      {report.description}
                    </CardDescription>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-[#1996CE]" />
                        <span className="text-sm text-[#3A3A3C] font-medium">{report.date}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-bold text-[#3A3A3C] mb-2 text-sm">{t("reports.key_results")}</h4>
                      <div className="space-y-1">
                        {report.highlights.map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#1996CE] rounded-full"></div>
                            <span className="text-[#3A3A3C] text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-[#1996CE] text-[#1996CE] hover:bg-[#1996CE] hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("reports.view_report")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Report Features */}
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
              {t("reports.report_features_badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">
              {t("reports.report_features_title")}
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full text-center shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="p-8">
                    <div className={`mx-auto mb-4 ${feature.color} bg-gray-50 p-4 rounded-2xl w-fit`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg text-[#3A3A3C] font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-[#3A3A3C] leading-relaxed">{feature.description}</CardDescription>
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
              {t("reports.cta_badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-6">{t("reports.cta_title")}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{t("reports.cta_desc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1996CE] hover:bg-gray-100 text-xl px-8 py-4 rounded-full font-bold shadow-2xl"
                >
                  <Link href="/contact">{t("reports.cta_button1")}</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1996CE] text-xl px-8 py-4 rounded-full font-bold"
                >
                  <Link href="/services">{t("reports.cta_button2")}</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
