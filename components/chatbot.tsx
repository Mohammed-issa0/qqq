"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface FAQ {
  keywords: string[]
  answer: {
    ar: string
    en: string
  }
}

const faqs: FAQ[] = [
  {
    keywords: ["خدمات", "services", "ماذا تقدمون", "what do you offer", "خدماتكم"],
    answer: {
      ar: "نحن نقدم خدمات متنوعة في مجال الخرائط الرقمية والبيانات المكانية، بما في ذلك: أنظمة المعلومات الجغرافية (GIS)، الخرائط التفاعلية، Google Business Profile، وحلول البيانات المكانية المخصصة.",
      en: "We offer various services in digital mapping and spatial data, including: Geographic Information Systems (GIS), interactive maps, Google Business Profile, and custom spatial data solutions.",
    },
  },
  {
  keywords: ["خريطة تفاعلية", "interactive map", "خريطة ذكية", "dynamic map", "custom map"],
  answer: {
    ar: "نقوم بتطوير خرائط تفاعلية مخصصة باستخدام تقنيات مثل Leaflet و Mapbox، مما يسمح للمستخدمين بالتفاعل مع البيانات الجغرافية بطريقة سهلة وفعالة.",
    en: "We develop custom interactive maps using technologies like Leaflet and Mapbox, enabling users to interact with geographic data easily and effectively.",
  },
},
{
  keywords: ["api", "واجهات برمجة", "integrations", "ربط", "تكامل"],
  answer: {
    ar: "نوفر واجهات برمجة التطبيقات (APIs) لتكامل الخرائط والخدمات المكانية مع أنظمتكم الحالية مثل المواقع الإلكترونية أو تطبيقات الهاتف.",
    en: "We provide APIs to integrate maps and spatial services with your existing systems such as websites or mobile applications.",
  },
},
{
  keywords: ["تصميم", "design", "ui", "ux", "واجهة المستخدم", "تجربة المستخدم"],
  answer: {
    ar: "نراعي الجوانب الجمالية وتجربة المستخدم في تصميم الخرائط والتطبيقات، لضمان تقديم واجهات سهلة الاستخدام وعصرية.",
    en: "We prioritize aesthetics and user experience in designing maps and applications, ensuring modern and user-friendly interfaces.",
  },
},
{
  keywords: ["بيانات مفتوحة", "open data", "مفتوحة المصدر", "open source", "بيانات مجانية"],
  answer: {
    ar: "نستخدم مصادر البيانات المفتوحة مثل OpenStreetMap ونساعد العملاء في فهم كيفية الاستفادة منها بشكل قانوني وفعّال.",
    en: "We use open data sources like OpenStreetMap and help clients understand how to use them legally and effectively.",
  },
},
{
  keywords: ["استهداف", "تحليل السوق", "market segmentation", "استراتيجية", "مواقع مثالية"],
  answer: {
    ar: "نساعدك على تحليل السوق جغرافيًا لتحديد المواقع المثالية لتوسع أعمالك أو فتح فروع جديدة بناءً على البيانات المكانية.",
    en: "We help you analyze the market geographically to identify ideal locations for expanding your business or opening new branches based on spatial data.",
  },
},
{
  keywords: ["موقع", "location", "geolocation", "إحداثيات", "إيجاد مكان"],
  answer: {
    ar: "نوفر حلول لتحديد المواقع الجغرافية بدقة باستخدام نظم التموضع الجغرافي GPS والتقنيات الأخرى لتحديد إحداثيات المواقع.",
    en: "We provide accurate geolocation solutions using GPS and other technologies to determine precise coordinates of locations.",
  },
},
{
  keywords: ["سيرفر", "خادم", "server", "استضافة", "hosting"],
  answer: {
    ar: "نقوم باستضافة أنظمة الخرائط على سيرفرات سريعة وآمنة، كما نوفر إمكانية تشغيل الأنظمة على خوادم العميل الخاصة حسب الطلب.",
    en: "We host mapping systems on fast and secure servers, and also offer the option to deploy systems on the client's own servers upon request.",
  },
},
{
  keywords: ["حجز", "موعد", "booking", "جدولة", "schedule"],
  answer: {
    ar: "يمكنك حجز موعد استشارة أو اجتماع تعريفي من خلال موقعنا أو عبر البريد الإلكتروني، وسنتواصل معك لتأكيد الموعد المناسب.",
    en: "You can book a consultation or introductory meeting through our website or email, and we will contact you to confirm a convenient time.",
  },
},
{
  keywords: ["موقع", "location", "عنوان", "where are you", "أين تقع", "map location"],
  answer: {
    ar: "مكتبنا الرئيسي يقع في الكويت، ويسعدنا استقبالكم في أي وقت. يمكنكم العثور على موقعنا في صفحة التواصل على موقعنا الإلكتروني.",
    en: "Our main office is located in Kuwait, and we are happy to welcome you anytime. You can find our location on the contact page of our website.",
  },
},
{
  keywords: ["وظائف", "careers", "وظيفة", "job", "هل لديكم وظائف", "فرص عمل"],
  answer: {
    ar: "نحن دائماً نبحث عن مواهب جديدة. يمكنك زيارة صفحة التوظيف على موقعنا للاطلاع على الفرص المتاحة أو إرسال سيرتك الذاتية إلى hr@q8maps.com.",
    en: "We're always looking for new talents. You can visit our careers page to check available opportunities or send your resume to hr@q8maps.com.",
  },
},
{
  keywords: ["طريقة العمل", "process", "كيف تعملون", "workflow", "الخطوات"],
  answer: {
    ar: "نبدأ بتحليل احتياجات العميل، ثم نقدم تصور مبدئي، بعده نبدأ مرحلة التصميم والتنفيذ، وأخيراً نقوم بالتسليم مع دعم فني مستمر.",
    en: "We start by analyzing the client's needs, then provide an initial proposal, followed by design and development, and finally deliver with ongoing technical support.",
  },
},
{
  keywords: ["لغة", "language", "اللغة", "عربي", "إنجليزي", "لغة النظام"],
  answer: {
    ar: "نحن نقدم أنظمتنا وخدماتنا باللغتين العربية والإنجليزية، ويمكن تخصيص اللغة بحسب تفضيل العميل.",
    en: "We offer our systems and services in both Arabic and English, and the language can be customized according to the client's preference.",
  },
},
{
  keywords: ["دفع", "payment", "طريقة الدفع", "فاتورة", "invoice", "كيف أدفع"],
  answer: {
    ar: "نقبل عدة طرق دفع بما في ذلك التحويل البنكي، والدفع الإلكتروني. سيتم إرسال فاتورة مفصلة لك بعد الاتفاق على الخدمة.",
    en: "We accept multiple payment methods including bank transfer and e-payment. A detailed invoice will be sent to you after agreeing on the service.",
  },
},
{
  keywords: ["شراكة", "partnership", "تعاون", "نتعاون", "partner"],
  answer: {
    ar: "نرحب بجميع فرص التعاون والشراكة مع شركات أو جهات ترغب في العمل معنا في مشاريع متعلقة بالخرائط والبيانات المكانية.",
    en: "We welcome all opportunities for collaboration and partnership with companies or entities interested in working with us on mapping and spatial data projects.",
  },
},
{
  keywords: ["ترخيص", "license", "حقوق", "ملكية", "license fees"],
  answer: {
    ar: "نحرص على الالتزام بحقوق الملكية الفكرية. جميع الأعمال التي نقدمها مرخصة بشكل قانوني ونوفر توثيقًا كاملاً للعملاء.",
    en: "We ensure compliance with intellectual property rights. All the work we provide is legally licensed and we offer full documentation to clients.",
  },
},
{
  keywords: ["استرداد", "استرجاع", "refund", "إرجاع", "استعادة", "إلغاء"],
  answer: {
    ar: "يمكن طلب استرداد المبلغ خلال فترة محددة حسب سياسة المشروع المتفق عليها. يرجى مراجعة بنود الاتفاق لمعرفة التفاصيل.",
    en: "Refunds can be requested within a specified period according to the agreed project policy. Please review the agreement terms for details.",
  },
},

{
  keywords: ["منافسين", "فرق", "تميز", "why you", "لماذا أنتم"],
  answer: {
    ar: "ما يميزنا هو الجمع بين الخبرة التقنية والفهم العميق للبيانات المكانية. نقدم حلولاً مخصصة وعملية تتوافق مع أهداف عملائنا.",
    en: "What sets us apart is the combination of technical expertise and deep understanding of spatial data. We offer customized and practical solutions aligned with our clients' goals.",
  },
},

  {
    keywords: ["أسعار", "تكلفة", "price", "cost", "pricing", "كم السعر", "كلفة"],
    answer: {
      ar: "أسعارنا تختلف حسب نوع المشروع ومتطلباته. نقدم استشارة مجانية لتقييم احتياجاتك وتقديم عرض سعر مخصص. يرجى التواصل معنا للحصول على عرض سعر دقيق.",
      en: "Our prices vary depending on the project type and requirements. We offer free consultation to assess your needs and provide a custom quote. Please contact us for an accurate price quote.",
    },
  },
  {
    keywords: ["خرائط", "maps", "gis", "نظم المعلومات الجغرافية", "خريطة"],
    answer: {
      ar: "نحن متخصصون في تطوير أنظمة الخرائط الرقمية باستخدام أحدث التقنيات مثل Google Maps API، OpenStreetMap، وأنظمة GIS المتقدمة. نقدم حلول مخصصة للشركات والمؤسسات الحكومية.",
      en: "We specialize in developing digital mapping systems using the latest technologies like Google Maps API, OpenStreetMap, and advanced GIS systems. We provide custom solutions for companies and government institutions.",
    },
  },
  {
    keywords: ["google business", "جوجل بيزنس", "google maps business", "جوجل ماب"],
    answer: {
      ar: "نساعدك في إنشاء وتحسين ملف Google Business Profile الخاص بك، مما يزيد من ظهورك في نتائج البحث المحلية ويجذب المزيد من العملاء إلى عملك.",
      en: "We help you create and optimize your Google Business Profile, increasing your visibility in local search results and attracting more customers to your business.",
    },
  },
  {
    keywords: ["مشاريع", "projects", "أعمال سابقة", "portfolio", "محفظة"],
    answer: {
      ar: "لدينا محفظة متنوعة من المشاريع الناجحة في مختلف القطاعات. يمكنك مراجعة صفحة المشاريع في موقعنا لرؤية أمثلة على أعمالنا السابقة والحلول التي قدمناها لعملائنا.",
      en: "We have a diverse portfolio of successful projects across various sectors. You can check our projects page to see examples of our previous work and solutions we've provided to our clients.",
    },
  },
  {
    keywords: ["تواصل", "contact", "رقم", "phone", "ايميل", "email", "اتصال"],
    answer: {
      ar: "يمكنك التواصل معنا عبر: الهاتف: +965 555 912 92، البريد الإلكتروني: info@q8maps.com، أو زيارة صفحة التواصل في موقعنا لإرسال رسالة مباشرة.",
      en: "You can contact us via: Phone: +965 555 912 92, Email: info@q8maps.com, or visit our contact page to send a direct message.",
    },
  },
  {
    keywords: ["وقت", "time", "مدة", "duration", "كم يستغرق", "متى"],
    answer: {
      ar: "مدة تنفيذ المشاريع تختلف حسب حجم وتعقيد المشروع. المشاريع البسيطة قد تستغرق أسبوعين، بينما المشاريع المعقدة قد تحتاج إلى عدة أشهر. سنقدم لك جدولاً زمنياً مفصلاً بعد دراسة متطلباتك.",
      en: "Project duration varies depending on size and complexity. Simple projects may take two weeks, while complex projects may require several months. We'll provide you with a detailed timeline after studying your requirements.",
    },
  },
  {
    keywords: ["تقارير", "reports", "تحليل", "analytics", "بيانات"],
    answer: {
      ar: "نقدم تقارير وتحاليل مفصلة للبيانات المكانية، بما في ذلك تحليل الموقع، دراسات السوق الجغرافية، وتقارير الأداء. هذه التقارير تساعدك في اتخاذ قرارات مدروسة لعملك.",
      en: "We provide detailed reports and analytics for spatial data, including location analysis, geographic market studies, and performance reports. These reports help you make informed decisions for your business.",
    },
  },
  {
    keywords: ["فريق", "team", "موظفين", "خبرة", "experience", "من أنتم"],
    answer: {
      ar: "فريقنا يتكون من خبراء متخصصين في مجال الخرائط الرقمية وأنظمة المعلومات الجغرافية مع خبرة تزيد عن 10 سنوات. نحن ملتزمون بتقديم أفضل الحلول التقنية لعملائنا.",
      en: "Our team consists of experts specialized in digital mapping and geographic information systems with over 10 years of experience. We are committed to providing the best technical solutions for our clients.",
    },
  },
  {
    keywords: ["تدريب", "training", "دورات", "courses", "تعليم", "learn"],
    answer: {
      ar: "نقدم دورات تدريبية متخصصة في أنظمة المعلومات الجغرافية والخرائط الرقمية للأفراد والشركات. تشمل دوراتنا التدريب العملي والنظري على أحدث التقنيات.",
      en: "We offer specialized training courses in geographic information systems and digital mapping for individuals and companies. Our courses include practical and theoretical training on the latest technologies.",
    },
  },
  {
    keywords: ["دعم", "support", "مساعدة", "help", "صيانة", "maintenance"],
    answer: {
      ar: "نقدم دعم فني شامل ومستمر لجميع مشاريعنا، بما في ذلك الصيانة الدورية، التحديثات، والدعم التقني على مدار الساعة لضمان عمل أنظمتكم بكفاءة عالية.",
      en: "We provide comprehensive and continuous technical support for all our projects, including regular maintenance, updates, and 24/7 technical support to ensure your systems operate efficiently.",
    },
  },
  {
    keywords: ["تطبيق", "app", "mobile", "موبايل", "هاتف", "application"],
    answer: {
      ar: "نطور تطبيقات الهاتف المحمول المخصصة للخرائط والملاحة باستخدام أحدث التقنيات. تطبيقاتنا تعمل على أنظمة iOS و Android وتتميز بسهولة الاستخدام والأداء العالي.",
      en: "We develop custom mobile applications for maps and navigation using the latest technologies. Our apps work on iOS and Android systems and feature ease of use and high performance.",
    },
  },
  {
    keywords: ["استشارة", "consultation", "نصيحة", "advice", "مشورة"],
    answer: {
      ar: "نقدم استشارات مجانية لتقييم احتياجاتكم وتقديم أفضل الحلول المناسبة لمشروعكم. فريقنا جاهز لمناقشة متطلباتكم وتقديم التوجيه المناسب.",
      en: "We offer free consultations to assess your needs and provide the best solutions for your project. Our team is ready to discuss your requirements and provide appropriate guidance.",
    },
  },
  {
    keywords: ["أمان", "security", "حماية", "protection", "خصوصية", "privacy"],
    answer: {
      ar: "نحن ملتزمون بأعلى معايير الأمان وحماية البيانات. جميع أنظمتنا مؤمنة بأحدث تقنيات التشفير ونتبع أفضل الممارسات في حماية خصوصية عملائنا.",
      en: "We are committed to the highest security standards and data protection. All our systems are secured with the latest encryption technologies and we follow best practices in protecting our clients' privacy.",
    },
  },
  {
    keywords: ["تحديث", "update", "upgrade", "تطوير", "development"],
    answer: {
      ar: "نقدم خدمات التحديث والتطوير المستمر لأنظمتكم لضمان مواكبة أحدث التقنيات والمعايير. نحرص على تحديث أنظمتكم بانتظام لضمان الأداء الأمثل.",
      en: "We provide continuous update and development services for your systems to ensure keeping up with the latest technologies and standards. We ensure regular updates to guarantee optimal performance.",
    },
  },
  {
    keywords: ["شهادات", "certificates", "اعتماد", "certification", "جودة", "quality"],
    answer: {
      ar: "نحن حاصلون على شهادات الجودة والاعتماد الدولية في مجال تقنية المعلومات والخرائط الرقمية. نلتزم بأعلى معايير الجودة في جميع مشاريعنا.",
      en: "We hold international quality and certification certificates in information technology and digital mapping. We are committed to the highest quality standards in all our projects.",
    },
  },
  {
    keywords: ["مرحبا", "hello", "hi", "السلام عليكم", "أهلا", "مساء الخير", "صباح الخير"],
    answer: {
      ar: "أهلاً وسهلاً بك! نحن سعداء لتواصلك معنا. كيف يمكنني مساعدتك اليوم؟ يمكنني الإجابة على أسئلتك حول خدماتنا في مجال الخرائط الرقمية.",
      en: "Hello and welcome! We're happy you contacted us. How can I help you today? I can answer your questions about our digital mapping services.",
    },
  },
  {
    keywords: ["شكرا", "thanks", "thank you", "شكراً", "مشكور"],
    answer: {
      ar: "العفو! نحن سعداء لمساعدتك. إذا كان لديك أي أسئلة أخرى، لا تتردد في السؤال. فريقنا جاهز دائماً لخدمتك.",
      en: "You're welcome! We're happy to help you. If you have any other questions, don't hesitate to ask. Our team is always ready to serve you.",
    },
  },
]

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const { t, dir, language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text:
          language === "ar"
            ? "مرحباً بك! أنا مساعد خرائط الكويت الذكي. كيف يمكنني مساعدتك اليوم؟"
            : "Welcome! I'm Kuwait Maps smart assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, language])

  // إغلاق النافذة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("[data-chatbot-trigger]")
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // إغلاق النافذة بمفتاح Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen])

  const findBestAnswer = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // البحث عن أفضل إجابة بناءً على الكلمات المفتاحية
    let bestMatch: FAQ | null = null
    let maxMatches = 0

    for (const faq of faqs) {
      const matches = faq.keywords.filter((keyword) => lowerMessage.includes(keyword.toLowerCase())).length

      if (matches > maxMatches) {
        maxMatches = matches
        bestMatch = faq
      }
    }

    if (bestMatch && maxMatches > 0) {
      return language === "ar" ? bestMatch.answer.ar : bestMatch.answer.en
    }

    // إجابة افتراضية إذا لم يتم العثور على تطابق
    return language === "ar"
      ? "عذراً، لم أتمكن من فهم سؤالك بشكل كامل. يرجى التواصل مع فريقنا مباشرة للحصول على مساعدة أكثر تفصيلاً. يمكنك الاتصال بنا على +965 555 912 92 أو إرسال بريد إلكتروني إلى info@q8maps.com"
      : "Sorry, I couldn't fully understand your question. Please contact our team directly for more detailed assistance. You can call us at +965 555 912 92 or email us at info@q8maps.com"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // محاكاة وقت الاستجابة
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestAnswer(inputValue),
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === "ar" ? "ar-KW" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  return (
    <>
      {/* أيقونة الشات الثابتة */}
      <motion.div
        className={`fixed bottom-4 z-50 ${dir === "rtl" ? "right-4" : "right-4"} sm:bottom-6 ${
          dir === "rtl" ? "sm:right-6" : "sm:left-6"
        }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={toggleChat}
          data-chatbot-trigger
          className="relative bg-gradient-to-r from-[#1996CE] to-[#1478A6] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(25, 150, 206, 0.7)",
              "0 0 0 10px rgba(25, 150, 206, 0)",
              "0 0 0 0 rgba(25, 150, 206, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* نقطة الإشعار */}
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}

          {/* تولتيب */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {isOpen
              ? language === "ar"
                ? "إغلاق المحادثة"
                : "Close chat"
              : language === "ar"
                ? "تحدث معنا"
                : "Chat with us"}
          </div>
        </motion.button>
      </motion.div>

      {/* نافذة الشات */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            className={`fixed bottom-16 sm:bottom-24 z-50 ${
              dir === "rtl" ? "right-2 sm:right-6" : "left-2 sm:left-6"
            } w-[calc(100vw-1rem)] sm:w-96 max-w-md`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            dir={dir}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden backdrop-blur-lg">
              {/* رأس النافذة */}
              <div className="bg-gradient-to-r from-[#1996CE] to-[#1478A6] text-white p-4 relative overflow-hidden">
                {/* خلفية متحركة */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base">
                        {language === "ar" ? "مساعد خرائط الكويت" : "Kuwait Maps Assistant"}
                      </h3>
                      <p className="text-xs opacity-90">
                        {language === "ar" ? "متصل الآن • يرد خلال ثوانٍ" : "Online now • Replies instantly"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-all duration-200"
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* محتوى النافذة */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* منطقة الرسائل */}
                    <div className="h-80 sm:h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                        >
                          <div className={`max-w-[85%] ${message.isBot ? "order-2" : "order-1"}`}>
                            <div
                              className={`p-3 rounded-2xl shadow-sm ${
                                message.isBot
                                  ? "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                                  : "bg-gradient-to-r from-[#1996CE] to-[#1478A6] text-white rounded-br-md"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.text}</p>
                              <p className={`text-xs mt-1 ${message.isBot ? "text-gray-500" : "text-white/70"}`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>

                          <div className={`${message.isBot ? "order-1 mr-2" : "order-2 ml-2"} flex-shrink-0`}>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.isBot ? "bg-gray-200" : "bg-[#1996CE]"
                              }`}
                            >
                              {message.isBot ? (
                                <Bot className="w-4 h-4 text-gray-600" />
                              ) : (
                                <User className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex justify-start"
                        >
                          <div className="order-2 max-w-[85%]">
                            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <div className="flex space-x-1">
                                  <motion.div
                                    className="w-2 h-2 bg-[#1996CE] rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                                  />
                                  <motion.div
                                    className="w-2 h-2 bg-[#1996CE] rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                                  />
                                  <motion.div
                                    className="w-2 h-2 bg-[#1996CE] rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500">
                                  {language === "ar" ? "يكتب..." : "Typing..."}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="order-1 mr-2 flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <Bot className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* أزرار سريعة للتواصل */}
                    <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                      <div className="flex space-x-2 space-x-reverse">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center space-x-2 space-x-reverse bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200"
                          onClick={() => window.open("tel:+96555591292")}
                        >
                          <Phone className="w-3 h-3" />
                          <span>{language === "ar" ? "اتصل بنا" : "Call Us"}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center space-x-2 space-x-reverse bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200"
                          onClick={() => window.open("mailto:info@q8maps.com")}
                        >
                          <Mail className="w-3 h-3" />
                          <span>{language === "ar" ? "راسلنا" : "Email Us"}</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* منطقة الإدخال */}
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="flex space-x-2 space-x-reverse">
                        <div className="flex-1 relative">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={language === "ar" ? "اكتب رسالتك هنا..." : "Type your message here..."}
                            className="pr-4 pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1996CE] focus:ring-0 transition-all duration-200"
                            disabled={isTyping}
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isTyping}
                          className="bg-gradient-to-r from-[#1996CE] to-[#1478A6] hover:from-[#1478A6] hover:to-[#1996CE] text-white p-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <Send className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
