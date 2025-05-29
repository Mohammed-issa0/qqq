import type React from "react"
import type { Metadata } from "next"
import { Cairo, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ScrollToTopOnRouteChange from "@/components/scroll-to-top-on-route-change"
import { LanguageProvider } from "@/contexts/language-context"
import Chatbot from "@/components/chatbot"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "شركة خرائط الكويت للحلول المتكاملة الحاسوبية | Kuwait Maps Company",
  description:
    "شركة أعمال متخصصة في أنظمة الخرائط الإلكترونية باستخدام أنظمة قوقل السحابية وتكنولوجيا المعلومات المكانية المفتوحة | A business company specialized in electronic mapping systems using Google cloud systems and open spatial information technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${inter.variable}`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <ScrollToTopOnRouteChange />
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Chatbot />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
