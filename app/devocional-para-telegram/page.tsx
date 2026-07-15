import type { Metadata } from "next"
import { LandingPageTemplate } from "@/components/landing-page-template"

export const metadata: Metadata = {
  title: "Devocional para Telegram Grátis | Mensagens Bíblicas Diárias",
  description: "Receba o melhor devocional para Telegram direto no seu celular. Inscreva-se grátis e fortaleça sua fé com palavras de ânimo, paz e sabedoria todos os dias.",
  keywords: [
    // Principais focadas em "para"
    "devocional para Telegram",
    "grupo de devocional Telegram",
    "canal de devocional Telegram",
    "receber devocional no celular",
    "mensagens de fé Telegram",
    // Variações de alta busca
    "devocional diário para Telegram",
    "palavra de deus para Telegram",
    "versículos bíblicos para Telegram",
    "mensagem de bom dia bíblica Telegram",
    "canal de transmissão devocional",
    "pão diário para Telegram",
    "mensagens bíblicas gratuitas celular"
  ],
  alternates: {
    canonical: "https://devocionalnoTelegram.com.br/devocional-para-Telegram",
  },
  openGraph: {
    title: "Devocional para Telegram Grátis | Mensagens Bíblicas Diárias",
    description: "Inscreva-se grátis e receba o melhor devocional diário direto no seu Telegram. Palavras de fé, ânimo e sabedoria todos os dias.",
    url: "https://devocionalnoTelegram.com.br/devocional-para-Telegram",
    siteName: "Devocional no Telegram",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://devocionalnoTelegram.com.br/og-devocional.png",
        width: 1200,
        height: 630,
        alt: "Devocional para Telegram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devocional para Telegram Grátis",
    description: "Receba mensagens bíblicas e palavras de fé diariamente direto no seu celular.",
    images: ["https://devocionalnoTelegram.com.br/og-devocional.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default async function DevocionalParaTelegramPage() {
  const seoContent = (
    <>
      <header className="space-y-4">
        <h2 className="text-3xl font-bold">A Palavra de Deus Onde Você Estiver</h2>
        <p className="text-zinc-400">
          O celular se tornou o nosso companheiro de todas as horas. Muitas vezes, gastamos tempo navegando sem rumo por feeds de redes sociais que geram comparação, ansiedade e vazio. Trazer o <strong>devocional para o Telegram</strong> é uma forma de santificar o uso da tecnologia, transformando seu celular em um instrumento de comunhão e edificação.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Por que Usar o Canal do Telegram?</h3>
        <p className="text-zinc-400">
          O Telegram é o aplicativo mais utilizado no Brasil. Ao receber mensagens devocionais diretamente nele, você une a praticidade do seu dia a dia ao cuidado essencial com a sua vida espiritual. Descubra os diferenciais de usar o nosso canal:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-400">
          <li><strong>Máxima Privacidade:</strong> Os canais do Telegram garantem total privacidade. Nenhum outro membro ou administrador consegue ver o seu número de telefone ou seus dados pessoais.</li>
          <li><strong>Sem Notificações Inconvenientes:</strong> Diferente de grupos tradicionais com dezenas de mensagens e debates, o canal é focado e silencioso. Apenas os devocionais oficiais são postados, garantindo que você nunca perca o foco.</li>
          <li><strong>Carregamento Rápido:</strong> Formato leve, direto ao ponto, perfeito para ler no transporte, na pausa do trabalho ou antes de dormir.</li>
          <li><strong>Sempre Atualizado:</strong> Uma palavra fresca e abençoada todos os dias do ano, sem interrupções.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Como se Inscrever Gratuitamente</h3>
        <p className="text-zinc-400">
          Não é preciso baixar nenhum aplicativo extra nem preencher formulários extensos. Se você já tem o Telegram instalado no seu celular, basta clicar no botão de inscrição abaixo.
        </p>
        <p className="text-zinc-400">
          Você será redirecionado para o nosso canal oficial do Telegram. Toque em "Seguir" no canto superior direito e, se desejar receber alertas imediatos quando um novo devocional for postado, ative o sininho de notificações. Permita que a Palavra de Deus faça parte da sua rotina diária de forma simples e edificante.
        </p>
      </section>
    </>
  )

  return (
    <LandingPageTemplate
      title="Devocional para Telegram"
      subtitle="Transforme seu celular em uma fonte de inspiração espiritual. Inscreva-se em nosso canal e mude sua rotina diária."
      seoContent={seoContent}
    />
  )
}
