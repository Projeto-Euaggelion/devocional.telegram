import type { Metadata } from "next"
import { LandingPageTemplate } from "@/components/landing-page-template"

export const metadata: Metadata = {
  title: "Devocional Diário no Telegram Grátis | Mensagem Bíblica",
  description: "Receba seu devocional diário gratuito direto no Telegram. Comece o dia com a Palavra de Deus e fortaleça sua fé com reflexões bíblicas diárias.",
  keywords: [
    // Principais focadas em Rotina Diária
    "devocional diário",
    "mensagem bíblica diária",
    "pão diário Telegram",
    "devocional no celular",
    "momento com deus",
    // Variações e termos de engajamento diário
    "devocional diário Telegram grátis",
    "mensagem de bom dia gospel",
    "versículo diário no celular",
    "leitura da bíblia diária",
    "reflexões diárias evangélicas",
    "minuto com deus Telegram",
    "devocional matinal diário"
  ],
  alternates: {
    canonical: "https://devocionalnoTelegram.com.br/devocional-diario",
  },
  openGraph: {
    title: "Devocional Diário no Telegram Grátis | Mensagem Bíblica",
    description: "Comece o seu dia com a Palavra de Deus. Assine gratuitamente e receba reflexões bíblicas diárias direto no seu celular.",
    url: "https://devocionalnoTelegram.com.br/devocional-diario",
    siteName: "Devocional no Telegram",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://devocionalnoTelegram.com.br/og-devocional.png",
        width: 1200,
        height: 630,
        alt: "Devocional Diário no Telegram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devocional Diário no Telegram Grátis",
    description: "Fortaleça sua fé diariamente com mensagens bíblicas e devocionais no seu celular.",
    images: ["https://devocionalnoTelegram.com.br/og-devocional.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default async function DevocionalDiarioPage() {
  const seoContent = (
    <>
      <header className="space-y-4">
        <h2 className="text-3xl font-bold">Por que ler um Devocional Diário?</h2>
        <p className="text-zinc-400">
          A correria do dia a dia muitas vezes nos afasta daquilo que é mais essencial para nossa saúde espiritual: o contato íntimo e constante com a Palavra de Deus. Cultivar o hábito de fazer um <strong>devocional diário</strong> é o caminho mais eficaz para manter a fé aquecida, encontrar sabedoria para as tomadas de decisão e desfrutar de uma paz que excede todo o entendimento.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Os Benefícios da Constância Espiritual</h3>
        <p className="text-zinc-400">
          Ler a Bíblia e meditar em seus ensinamentos todas as manhãs funciona como um alimento para a nossa alma. Assim como nosso corpo físico precisa de nutrição diária, nosso espírito necessita de sustento espiritual. Ao estabelecer um momento diário de reflexão:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-400">
          <li><strong>Fortalecimento da Fé:</strong> A Palavra de Deus renova suas esperanças e sua confiança nas promessas divinas.</li>
          <li><strong>Direcionamento Claro:</strong> Salmos 119:105 diz que a Palavra é "lâmpada para os meus pés e luz para o meu caminho".</li>
          <li><strong>Resiliência Emocional:</strong> Encontre consolo e força para enfrentar adversidades, ansiedades e os desafios cotidianos.</li>
          <li><strong>Comunhão Profunda:</strong> Desenvolva uma rotina sincera de oração e gratidão a Deus.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Como Receber o Devocional Diário no seu Celular?</h3>
        <p className="text-zinc-400">
          Sabemos que a rotina pode ser desafiadora. Por isso, criamos o canal do Telegram. Em vez de precisar procurar ou lembrar-se de abrir um aplicativo, a Palavra de Deus chega diretamente na sua tela de forma prática, rápida e totalmente gratuita.
        </p>
        <p className="text-zinc-400">
          Junte-se a milhares de pessoas que decidiram priorizar sua vida espiritual logo nas primeiras horas do dia. Nosso canal envia devocionais selecionados, versículos bíblicos edificantes e meditações que trazem respostas e refrigério para o seu coração.
        </p>
      </section>
    </>
  )

  return (
    <LandingPageTemplate
      title="Devocional Diário"
      subtitle="Aproxime-se de Deus todos os dias com meditações bíblicas enviadas diretamente no seu Telegram."
      seoContent={seoContent}
    />
  )
}
