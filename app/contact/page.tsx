"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Globe, Clock, Send, MessageCircle, Users, CheckCircle } from "lucide-react"
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

export default function ContactPage() {
  const { t, dir } = useLanguage()

  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t("contact.address"),
      details: t("contact.kuwait"),
      color: "text-[#1996CE]",
      bgColor: "bg-[#1996CE]/10",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: dir === "rtl" ? "الهاتف" : "Phone",
      details: t("contact.phone_number"),
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: dir === "rtl" ? "البريد الإلكتروني" : "Email",
      details: t("contact.email_address"),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("contact.website"),
      details: t("contact.website_url"),
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t("contact.working_hours"),
      details: t("contact.hours"),
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  const contactStats = [
    { number: "24", label: t("contact.response_hours"), icon: <Clock className="w-6 h-6" /> },
    { number: "100%", label: t("contact.response_rate"), icon: <MessageCircle className="w-6 h-6" /> },
    { number: "50+", label: dir === "rtl" ? "عميل راضي" : "Satisfied Clients", icon: <Users className="w-6 h-6" /> },
    { number: "99%", label: t("contact.satisfaction_rate"), icon: <CheckCircle className="w-6 h-6" /> },
  ]

  const faqs = [
    {
      question: dir === "rtl" ? "ما هي الخدمات التي تقدمونها؟" : "What services do you provide?",
      answer:
        dir === "rtl"
          ? "نقدم حلول متكاملة في مجال الخرائط الإلكترونية والبيانات المكانية وتحليل مرئيات الأقمار الصناعية، بالإضافة إلى خدمات الحساب التجاري في خرائط قوقل وخدمة النقطة (The Dot)."
          : "We provide integrated solutions in electronic mapping, spatial data, and satellite imagery analysis, in addition to Google Maps business account services and The Dot service.",
    },
    {
      question: dir === "rtl" ? "كم تستغرق مدة تنفيذ المشروع؟" : "How long does project implementation take?",
      answer:
        dir === "rtl"
          ? "تختلف مدة التنفيذ حسب حجم وتعقيد المشروع، ولكن نلتزم بالمواعيد المتفق عليها مع العميل. المشاريع البسيطة تستغرق 2-4 أسابيع، بينما المشاريع المعقدة قد تستغرق 2-6 أشهر."
          : "Implementation time varies according to project size and complexity, but we commit to agreed deadlines with clients. Simple projects take 2-4 weeks, while complex projects may take 2-6 months.",
    },
    {
      question: dir === "rtl" ? "هل تقدمون الدعم الفني؟" : "Do you provide technical support?",
      answer:
        dir === "rtl"
          ? "نعم، نقدم دعماً فنياً شاملاً لجميع عملائنا على مدار الساعة مع ضمان الجودة والصيانة الدورية. كما نوفر التدريب اللازم لفرق العمل."
          : "Yes, we provide comprehensive technical support to all our clients 24/7 with quality assurance and regular maintenance. We also provide necessary training for work teams.",
    },
    {
      question: dir === "rtl" ? "كيف يمكنني الحصول على عرض سعر؟" : "How can I get a price quote?",
      answer:
        dir === "rtl"
          ? "يمكنك التواصل معنا عبر النموذج أدناه أو الاتصال المباشر للحصول على استشارة مجانية وعرض سعر مفصل خلال 24 ساعة من تلقي طلبك."
          : "You can contact us through the form below or direct call to get a free consultation and detailed price quote within 24 hours of receiving your request.",
    },
    {
      question: dir === "rtl" ? "هل تعملون مع الشركات الصغيرة؟" : "Do you work with small companies?",
      answer:
        dir === "rtl"
          ? "بالطبع، نعمل مع جميع أحجام الشركات من الشركات الناشئة إلى المؤسسات الكبيرة. لدينا حلول مرنة تناسب جميع الميزانيات والاحتياجات."
          : "Of course, we work with all company sizes from startups to large enterprises. We have flexible solutions that suit all budgets and needs.",
    },
    {
      question: dir === "rtl" ? "ما هي طرق الدفع المتاحة؟" : "What payment methods are available?",
      answer:
        dir === "rtl"
          ? "نقبل جميع طرق الدفع المحلية والدولية بما في ذلك التحويل البنكي والدفع الإلكتروني. كما نوفر خطط دفع مرنة للمشاريع الكبيرة."
          : "We accept all local and international payment methods including bank transfer and electronic payment. We also provide flexible payment plans for large projects.",
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
              <Send className="w-5 h-5 mr-2" />
              {t("contact.badge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">{t("contact.title")}</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">{t("contact.description")}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Stats */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {contactStats.map((stat, index) => (
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

      {/* Contact Form & Info */}
      <motion.section
        className="py-20 px-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] text-white p-10">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Send className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-black">{t("contact.send_message")}</CardTitle>
                      <p className="text-xl text-white/80 mt-2">{t("contact.reply_24h")}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-[#3A3A3C] font-semibold text-lg">
                          {t("contact.first_name")} *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder={t("contact.first_name_placeholder")}
                          className="border-2 border-gray-200 focus:border-[#1996CE] h-12 text-lg"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-[#3A3A3C] font-semibold text-lg">
                          {t("contact.last_name")} *
                        </Label>
                        <Input
                          id="lastName"
                          placeholder={t("contact.last_name_placeholder")}
                          className="border-2 border-gray-200 focus:border-[#1996CE] h-12 text-lg"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#3A3A3C] font-semibold text-lg">
                        {t("contact.email")} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("contact.email_placeholder")}
                        className="border-2 border-gray-200 focus:border-[#1996CE] h-12 text-lg"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#3A3A3C] font-semibold text-lg">
                        {t("contact.phone")} *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t("contact.phone_placeholder")}
                        className="border-2 border-gray-200 focus:border-[#1996CE] h-12 text-lg"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-[#3A3A3C] font-semibold text-lg">
                        {t("contact.company")}
                      </Label>
                      <Input
                        id="company"
                        placeholder={t("contact.company_placeholder")}
                        className="border-2 border-gray-200 focus:border-[#1996CE] h-12 text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[#3A3A3C] font-semibold text-lg">
                        {t("contact.subject")} *
                      </Label>
                      <Input
                        id="subject"
                        placeholder={t("contact.subject_placeholder")}
                        className="border-2 border-gray-200 focus:border-[#1996CE] h-12 text-lg"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#3A3A3C] font-semibold text-lg">
                        {t("contact.message")} *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={t("contact.message_placeholder")}
                        rows={6}
                        className="border-2 border-gray-200 focus:border-[#1996CE] text-lg"
                        required
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] hover:from-[#1580B8] hover:to-[#1996CE] text-white text-xl py-4 rounded-full font-bold shadow-xl"
                      >
                        {t("contact.send")}
                        <Send className="w-5 h-5 mr-2" />
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="text-center mb-12">
                <Badge className="bg-[#3A3A3C]/10 text-[#3A3A3C] border-[#3A3A3C]/20 text-lg px-6 py-2 mb-6">
                  {t("contact.contact_info")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-4">{t("contact.connect_us")}</h2>
                <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-[#3A3A3C]">{t("contact.connect_methods")}</p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-6">
                          <div className={`${info.bgColor} p-4 rounded-2xl`}>
                            <div className={info.color}>{info.icon}</div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#3A3A3C] mb-2">{info.title}</h3>
                            <p className="text-[#3A3A3C] text-lg">{info.details}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div variants={fadeInUp}>
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#3A3A3C] to-[#4A4A4E] text-white p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">{t("contact.location")}</CardTitle>
                        <p className="text-white/80">{t("contact.kuwait")}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center text-[#3A3A3C]">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <MapPin className="w-16 h-16 mx-auto mb-4 text-[#1996CE]" />
                        </motion.div>
                        <p className="text-lg font-bold">{t("contact.map_location")}</p>
                        <p className="text-sm">{t("contact.kuwait")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 px-4 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1996CE]/10 text-[#1996CE] border-[#1996CE]/20 text-lg px-6 py-2 mb-6">
              {t("contact.faq")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A3A3C] mb-6">{t("contact.frequently_asked")}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1996CE] to-[#3A3A3C] mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 h-full">
                  <CardHeader className="p-8">
                    <CardTitle className="text-xl font-bold text-[#1996CE] leading-relaxed">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-[#3A3A3C] leading-relaxed text-lg">{faq.answer}</p>
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
              {t("contact.feel_free")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-6">{t("contact.ready_help")}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{t("contact.expert_team")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-[#1996CE] hover:bg-gray-100 text-xl px-8 py-4 rounded-full font-bold shadow-2xl"
                >
                  {t("common.contact_us")}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1996CE] text-xl px-8 py-4 rounded-full font-bold"
                >
                  {t("services.view_all")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
