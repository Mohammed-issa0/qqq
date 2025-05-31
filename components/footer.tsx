"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Globe, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const Footer = () => {
  const { t, dir } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#3A3A3C] text-white" dir={dir}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Image src="/images/logo.webp" alt="خرائط الكويت Q8MAPS" width={50} height={50} className="w-12 h-12" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold">{dir === "rtl" ? "خرائط الكويت" : "Kuwait Maps"}</span>
                <div className="text-sm text-[#1996CE] font-semibold">Q8MAPS</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{t("footer.company_desc")}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-[#1996CE]">{t("footer.quick_links")}</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: t("nav.home") },
                { href: "/about", label: t("nav.about") },
                { href: "/services", label: t("nav.services") },
                { href: "/projects", label: t("nav.projects") },
                { href: "/reports", label: t("nav.reports") },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#1996CE] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-[#1996CE]">{t("footer.our_services")}</h3>
            <ul className="space-y-2">
              {[
                t("services.spatial_data"),
                t("services.digital_maps"),
                t("services.google_business"),
                t("services.the_dot"),
                dir === "rtl" ? "التقارير والتحاليل" : "Reports & Analytics",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 text-[#1996CE]">{t("footer.contact_info")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-[#1996CE]" />
                <span className="text-gray-300" dir="ltr">+965 5559 1292</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-[#1996CE]" />
                <span className="text-gray-300">info@q8maps.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Globe className="w-5 h-5 text-[#1996CE]" />
                <span className="text-gray-300">https://q8maps.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">{t("footer.follow_us")}</h4>
              <div className="flex space-x-4 space-x-reverse gap-3">
                {[
                  { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/Q8Maps" },
                  { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/q8maps/" },
                  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/explore/locations/102848852820077/q8maps/recent/?next=%2Fp%2FCuni8J7tzDy%2F&ref=www.radfem.news&hl=bg" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/company/q8maps" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    className="text-gray-300 hover:text-[#1996CE] transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-600 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-300">
            © {currentYear}{" "}
            {dir === "rtl"
              ? "شركة خرائط الكويت للحلول المتكاملة الحاسوبية"
              : "Kuwait Maps Company for Integrated Computing Solutions"}
            . {t("footer.rights")}.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
