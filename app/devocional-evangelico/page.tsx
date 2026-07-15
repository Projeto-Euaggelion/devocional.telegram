import type { Metadata } from "next"
import { LandingPageTemplate } from "@/components/landing-page-template"

export const metadata: Metadata = {
  title: "Devocional Evangélico no Telegram | Estudo e Palavra de Deus",
  description: "Participe do devocional evangélico gratuito no Telegram. Receba diariamente mensagens de fé, estudos bíblicos e reflexões cristãs para edificar sua vida.",
  keywords: [
    // Principais focadas no público Evangélico
    "devocional evangélico",
    "mensagem bíblica evangélica",
    "palavra do dia evangélica",
    "estudo bíblico diário",
    "reflexão cristã Telegram",
    // Variações e termos de edificação
    "devocional cristão Telegram",
    "mensagens evangélicas no celular",
    "estudo da palavra de deus",
    "palavra bíblica para edificação",
    "grupo cristão Telegram",
    "leitura bíblica diária Telegram",
    "reflexão da bíblia sagrada",
    "estudos bíblicos evangélicos"
  ],
  alternates: {
    canonical: "https://devocionalnoTelegram.com.br/devocional-evangelico",
  },
  openGraph: {
    title: "Devocional Evangélico no Telegram | Estudo e Palavra de Deus",
    description: "Receba mensagens de fé, estudos da Palavra de Deus e reflexões cristãs diárias direto no seu celular para edificar sua vida.",
    url: "https://devocionalnoTelegram.com.br/devocional-evangelico",
    siteName: "Devocional no Telegram",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://devocionalnoTelegram.com.br/og-devocional.png",
        width: 1200,
        height: 630,
        alt: "Devocional Evangélico no Telegram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devocional Evangélico no Telegram",
    description: "Receba diariamente mensagens de fé, estudos bíblicos e reflexões cristãs no seu celular.",
    images: ["https://devocionalnoTelegram.com.br/og-devocional.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default async function DevocionalEvangelicoPage() {
  const seoContent = (
    <>
      <header className="space-y-4">
        <h2 className="text-3xl font-bold">Edifique sua Vida Espiritual Diariamente</h2>
        <p className="text-zinc-400">
          Como cristãos, somos chamados a crescer na graça e no conhecimento de nosso Senhor e Salvador Jesus Cristo (2 Pedro 3:18). Ler e meditar em um <strong>devocional evangélico</strong> é uma excelente ferramenta para aprofundar nossa compreensão teológica prática e aplicar as verdades eternas da Bíblia em nosso cotidiano.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Fidelidade Doutrinária e Bíblica</h3>
        <p className="text-zinc-400">
          Em tempos onde muitas mensagens superficiais ou distorcidas são espalhadas na internet, temos o compromisso inabalável de compartilhar devocionais que honram a sã doutrina e as Escrituras Sagradas como nossa única regra de fé e prática. Nosso conteúdo traz:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-400">
          <li><strong>Exposição Bíblica:</strong> Reflexões fundamentadas no contexto original e histórico dos versículos.</li>
          <li><strong>Enfoque Cristocêntrico:</strong> Mensagens que apontam para a pessoa, obra e ensinamento de Jesus Cristo.</li>
          <li><strong>Crescimento na Igreja:</strong> Incentivo à vida comunitária, ao serviço na igreja local e ao amor fraternal.</li>
          <li><strong>Edificação Familiar:</strong> Conselhos bíblicos de sabedoria para guiar o lar e o casamento segundo os padrões de Deus.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Junte-se à Nossa Comunidade no Telegram</h3>
        <p className="text-zinc-400">
          Milhares de irmãos e irmãs evangélicos de diversas denominações por todo o Brasil já fazem parte do nosso canal oficial. Eles escolheram receber diariamente esse alimento espiritual para iniciar as suas manhãs com uma palavra de ânimo, quebrantamento e sabedoria.
        </p>
        <p className="text-zinc-400">
          Inscreva-se de forma rápida e 100% gratuita. Toque no botão de acesso abaixo para entrar no canal no Telegram, receba os devocionais evangélicos diários e compartilhe a verdade que liberta e transforma vidas com toda a sua rede de contatos!
        </p>
      </section>
    </>
  )

  return (
    <LandingPageTemplate
      title="Devocional Evangélico"
      subtitle="Aprofunde seu conhecimento bíblico e fortaleça sua caminhada cristã com reflexões baseadas na Palavra de Deus."
      seoContent={seoContent}
    />
  )
}
