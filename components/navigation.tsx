"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { t, dir } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/reports", label: t("nav.reports") },
    { href: "/contact", label: t("nav.contact") },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Immediate scroll to top
    window.scrollTo({ top: 0, behavior: "auto" })
    router.push(href)
  }

  // تحسين دالة isActive لحل مشكلة تفعيل جميع الأقسام
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname === href
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg" : "bg-white/60 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 space-x-reverse">
            <Link href="/" className="flex items-center space-x-3 space-x-reverse" onClick={() => handleNavClick("/")}>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="relative"
              >
                <Image
                  src="/images/logo.webp"
                  alt="خرائط الكويت Q8MAPS"
                  width={60}
                  height={60}
                  className="w-12 h-12 md:w-15 md:h-15"
                  priority
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-[#3A3A3C]">
                  {dir === "rtl" ? "خرائط الكويت" : "Kuwait Maps"}
                </span>
                <span className="text-xs text-[#1996CE] font-semibold hidden md:block">Q8MAPS</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative transition-all duration-300 text-lg font-semibold py-2 px-4 rounded-full group ${
                    isActive(item.href)
                      ? "text-[#1996CE] bg-[#1996CE]/10"
                      : "text-[#3A3A3C] hover:text-[#1996CE] hover:bg-[#1996CE]/10"
                  }`}
                >
                  {item.label}
                  {/* تحسين الخط السفلي ليظهر فقط للعنصر النشط */}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1996CE] rounded-full"
                      layoutId="navbar-indicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                asChild
                className="bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] hover:from-[#1580B8] hover:to-[#1996CE] text-white font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact" onClick={() => handleNavClick("/contact")}>
                  {t("nav.consultation")}
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#3A3A3C] hover:bg-[#1996CE]/10 rounded-full"
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/20 bg-white/90 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block transition-all duration-300 text-lg font-semibold py-3 px-6 rounded-xl mx-2 ${
                        isActive(item.href)
                          ? "text-[#1996CE] bg-[#1996CE]/10"
                          : "text-[#3A3A3C] hover:text-[#1996CE] hover:bg-[#1996CE]/10"
                      }`}
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 px-2"
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#1996CE] to-[#2BA3D4] hover:from-[#1580B8] hover:to-[#1996CE] text-white font-bold py-3 rounded-xl shadow-lg"
                  >
                    <Link href="/contact" onClick={() => handleNavClick("/contact")}>
                      {t("nav.free_consultation")}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigation
