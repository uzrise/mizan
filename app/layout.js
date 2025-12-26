import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/contexts/TranslationContext";
import ScrollSmootherWrapper from "@/components/layout/ScrollSmootherWrapper";
import IntroAnimation from "@/components/common/IntroAnimation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Mizan Architecture - Расширяя границы инновационной архитектуры",
  description:
    "Mizan Architecture создаёт современные, эстетичные и функциональные пространства. Мы превращаем ваши идеи в продуманные и устойчивые решения.",
  keywords: "архитектура, дизайн, строительство, Mizan Architecture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <TranslationProvider>
          <IntroAnimation />
          <Navbar />
          {/* <ScrollSmootherWrapper> */}
            {children}
            <Footer />
          {/* </ScrollSmootherWrapper> */}
        </TranslationProvider>
      </body>
    </html>
  );
}
