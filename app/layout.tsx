import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from "next/font/google"
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"

const inter = Inter({subsets:['latin'],variable:'--font-sans'})
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Devocional Diário no Telegram Grátis | Palavra de Deus",
  description: "Receba devocionais diários gratuitos direto no seu Telegram. Fortaleça sua fé e comunhão com Deus através de mensagens bíblicas diárias no celular.",
  keywords: [
    // Principais e Intenção de Busca
    "devocional Telegram",
    "devocional diário",
    "devocional grátis",
    "canal Telegram devocional",
    "palavra de deus Telegram",
    "grupo de devocional Telegram",
    "receber devocional no celular",
    // Espirituais e Temáticas
    "mensagem bíblica diária",
    "versículo do dia Telegram",
    "estudo bíblico diário",
    "palavra do dia evangélica",
    "reflexão bíblica diária",
    "pão diário Telegram",
    // Prática e Rotina
    "momento com deus",
    "oração da manhã Telegram",
    "devocional evangélico gratuito",
    "mensagens de fé Telegram",
    "espalhar a palavra de deus",
  ],
  alternates: {
    canonical: "https://devocionalnotelegram.com.br",
  },
  openGraph: {
    title: "Devocional Diário no Telegram Grátis | Palavra de Deus",
    description: "Inscreva-se gratuitamente e receba mensagens bíblicas, reflexões e orações todos os dias direto no seu celular.",
    url: "https://devocionalnotelegram.com.br",
    siteName: "Devocional no Telegram",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://devocionalnotelegram.com.br/og-devocional.png",
        width: 1200,
        height: 630,
        alt: "Devocional Diário no Telegram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devocional Diário no Telegram Grátis",
    description: "Fortaleça sua fé todos os dias com mensagens bíblicas e devocionais direto no seu Telegram.",
    images: ["https://devocionalnotelegram.com.br/og-devocional.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics/>
        <GoogleAnalytics gaId="G-XE4TMCVDLC" />
      </body>
    </html>
  )
}
