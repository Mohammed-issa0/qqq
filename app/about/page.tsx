"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Eye, Users, Calendar, Award, Globe, CheckCircle, Star, TrendingUp, Shield } from 'lucide-react'
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

export default function AboutPage() {
  const { t, dir } = useLanguage()

  const achievements = [
    { 
      number: "2022", 
      label: dir === "rtl" ? "سنة التأسيس" : "Year Founded", 
      icon: <Calendar className="w-6 h-6" /> 
    },
    { 
      number: "100+", 
      label: dir === "rtl" ? "مشروع منجز" : "Completed Projects", 
      icon: <CheckCircle className="w-6 h-6" /> 
    },
    { 
      number: "50+", 
      label: dir === "rtl" ? "عميل راضي" : "Satisfied Clients", 
      icon: <Users className="w-6 h-6" /> 
    },
    { 
      number: "99%", 
      label: dir === "rtl" ? "معدل الرضا" : "Satisfaction Rate", 
      icon: <Star className="w-6 h-6" /> 
    },
  ]

  const values = [
    {
      icon: <Award className="w-12 h-12" />,
      title: t("about.quality_excellence"),
      description: t("about.quality_description"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: t("about.collaboration_partnership"),
      description: t("about.collaboration_description"),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: t("about.innovation_development"),
      description: t("about.innovation_description"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: t("about.reliability_security"),
      description: t("about.reliability_description"),
      color: "from-orange-500 to-red-500",
    },
  ]

  const teamStructure = [
    {
      title: t("about.executive_management"),
      description: t("about.executive_description"),
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-blue-500",
    },
    {
      title: t("about.technical_team"),
      description: t("about.technical_description"),
      icon: <Globe className="w-8 h-8" />,
      color: "text-green-500",
    },
    {
      title: t("about.research_development"),
      description: t("about.research_description"),
      icon: <Award className="w-8 h-8" />,
      color: "text-purple-500",
    },
    {
      title: t("about.customer_service"),
      description: t("about.customer_description"),
      icon: <Users className="w-8 h-8" />,
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
              <Globe className="w-5 h-5 mr-2" />
              {t("about.badge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">{t("about.title")}</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">{t("about.description")}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="text-center shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-[#1996CE] mb-4 flex justify-center">{achievement.icon}</div>
                    <div className="text-4xl font-black text-[#3A3A3C] mb-2">{achievement.number}</div>
                    <div className="text-lg font-semibold text-gray-600">{achievement.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Company Overview */}
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
              {t("about.company_overview")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("about.company_name")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-10">
                  <p className="text-xl text-[#3A3A3C] leading-relaxed mb-8">
                    {t("about.company_description")}
                  </p>
                  <p className="text-lg text-[#3A3A3C] leading-relaxed mb-8">
                    {t("about.company_services")}
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] hover:from-[#1580B8] hover:to-[#1996CE] text-white font-bold px-8 py-3 rounded-full"
                  >
                    <Link href="/services">{t("about.discover_services")}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-[#1996CE]/20 to-[#3A3A3C]/20 rounded-3xl flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Globe className="w-32 h-32 text-[#1996CE]" />
                  </motion.div>
                </div>
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-[#1996CE] rounded-full flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Award className="w-12 h-12 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#3A3A3C] rounded-full flex items-center justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Target className="w-10 h-10 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("about.vision_mission_title")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] text-white p-10">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Eye className="w-12 h-12" />
                    </div>
                    <div>
                      <CardTitle className="text-4xl font-black">{t("about.vision")}</CardTitle>
                      <div className="w-16 h-1 bg-white/60 rounded-full mt-2"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <p className="text-3xl font-bold text-[#3A3A3C] leading-relaxed text-center">
                    {t("about.vision_text")}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <div className="w-16 h-16 bg-[#1996CE]/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-[#1996CE]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-[#3A3A3C] to-[#4A4A4E] text-white p-10">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Target className="w-12 h-12" />
                    </div>
                    <div>
                      <CardTitle className="text-4xl font-black">{t("about.mission")}</CardTitle>
                      <div className="w-16 h-1 bg-white/60 rounded-full mt-2"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <p className="text-2xl text-[#3A3A3C] leading-relaxed text-center font-medium">
                    {t("about.mission_text")}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <div className="w-16 h-16 bg-[#3A3A3C]/10 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-[#3A3A3C]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Company Values */}
      <motion.section
        className="py-20 px-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#3A3A3C]/10 text-[#3A3A3C] border-[#3A3A3C]/20 text-lg px-6 py-2 mb-6">
              {t("about.values_title")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("about.values_subtitle")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full shadow-2xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500">
                  <CardHeader className={`bg-gradient-to-r ${value.color} text-white p-8`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        {value.icon}
                      </div>
                      <CardTitle className="text-2xl font-bold">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <p className="text-[#3A3A3C] text-lg leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Structure */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("about.team_structure")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
              {t("about.team_subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamStructure.map((team, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-6">
                      <div className={`${team.color} bg-gray-50 p-4 rounded-2xl`}>{team.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-[#3A3A3C] mb-2">{team.title}</h3>
                        <p className="text-[#3A3A3C] leading-relaxed">{team.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Company History */}
      <motion.section
        className="py-20 px-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("about.success_journey")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#1996CE] via-[#2BA3D4] to-[#3A3A3C] text-white p-10">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-12 h-12" />
                  </div>
                  <div>
                    <CardTitle className="text-4xl font-black">{t("about.founded_2022")}</CardTitle>
                    <p className="text-xl text-white/80 mt-2">{t("about.excellence_innovation")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10">
                <p className="text-xl text-[#3A3A3C] leading-relaxed mb-8">
                  {t("about.company_expansion")}
                </p>
                <p className="text-lg text-[#3A3A3C] leading-relaxed">
                  {t("about.economic_contribution")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-black mb-6">{t("about.join_success")}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t("about.join_description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1996CE] hover:bg-gray-100 text-xl px-8 py-4 rounded-full font-bold shadow-2xl"
                >
                  <Link href="/contact">{t("common.contact_us")}</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1996CE] text-xl px-8 py-4 rounded-full font-bold"
                >
                  <Link href="/services">{t("about.discover_services")}</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
