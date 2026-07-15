import type { Metadata } from "next"
import { LandingPageTemplate } from "@/components/landing-page-template"

export const metadata: Metadata = {
  title: "Devocional de Bom Dia no Telegram | Comece o Dia com Deus",
  description: "Inicie suas manhãs com uma palavra inspiradora. Receba o devocional de bom dia no Telegram com versículos bíblicos e orações diárias grátis.",
  keywords: [
    // Principais de Bom Dia e Matinais
    "devocional de bom dia",
    "mensagem de bom dia bíblica",
    "oração da manhã Telegram",
    "bom dia com deus",
    "versículo de bom dia",
    // Variações de alta busca matinal
    "devocional matinal Telegram",
    "mensagem de bom dia evangélica",
    "palavra de deus bom dia Telegram",
    "oração para começar o dia",
    "bom dia espírito santo Telegram",
    "versículo do dia para Telegram",
    "café com deus pai Telegram"
  ],
  alternates: {
    canonical: "https://devocionalnoTelegram.com.br/devocional-bom-dia",
  },
  openGraph: {
    title: "Devocional de Bom Dia no Telegram | Comece o Dia com Deus",
    description: "Inicie suas manhãs com uma palavra inspiradora. Inscreva-se para receber versículos bíblicos e orações diárias no seu celular.",
    url: "https://devocionalnoTelegram.com.br/devocional-bom-dia",
    siteName: "Devocional no Telegram",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://devocionalnoTelegram.com.br/og-devocional.png",
        width: 1200,
        height: 630,
        alt: "Devocional de Bom Dia no Telegram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devocional de Bom Dia no Telegram",
    description: "Comece o dia com Deus. Receba orações e versículos bíblicos todas as manhãs no seu celular.",
    images: ["https://devocionalnoTelegram.com.br/og-devocional.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default async function DevocionalBomDiaPage() {
  const seoContent = (
    <>
      <header className="space-y-4">
        <h2 className="text-3xl font-bold">Comece seu Dia com a Presença de Deus</h2>
        <p className="text-zinc-400">
          A forma como iniciamos as nossas manhãs dita o ritmo de todo o nosso dia. Começar o dia conectado ao Criador através de um <strong>devocional de bom dia</strong> traz clareza mental, paz ao coração atribulado e nos reveste com a armadura espiritual necessária para enfrentar qualquer adversidade ou tentação que surgir.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">O Poder de Buscar a Deus pela Manhã</h3>
        <p className="text-zinc-400">
          Grandes homens e mulheres da Bíblia tinham o hábito de buscar a Deus no romper da alva. Jesus muitas vezes se retirava para orar antes do amanhecer. Quando consagramos nossas primeiras horas ao Senhor:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-400">
          <li><strong>Consagramos nossos Planos:</strong> Colocamos nossa agenda nas mãos Daquele que governa todas as coisas.</li>
          <li><strong>Alinhamos o Coração:</strong> Substituímos a ansiedade e as preocupações matinais pela confiança nas promessas do Senhor.</li>
          <li><strong>Recebemos Força:</strong> Encontramos vigor espiritual e ânimo renovado em Suas palavras de encorajamento.</li>
          <li><strong>Praticamos a Gratidão:</strong> Agradecemos por mais um dia de vida e pela oportunidade de glorificar o Seu nome.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Mensagens Bíblicas de Bom Dia no Telegram</h3>
        <p className="text-zinc-400">
          Queremos te ajudar a criar esse hábito tão transformador. Com o canal do Telegram, você acorda e já encontra uma reflexão inspiradora aguardando por você. Sem anúncios, sem dispersões, apenas a pura Palavra de Deus interpretada com simplicidade e aplicação prática para a sua rotina.
        </p>
        <p className="text-zinc-400">
          Diga "bom dia" para Deus antes de se conectar com as notícias e redes sociais. Clique no link abaixo, faça parte da nossa comunidade e receba diariamente esse sopro de vida e fé direto na sua tela!
        </p>
      </section>
    </>
  )

  return (
    <LandingPageTemplate
      title="Devocional de Bom Dia"
      subtitle="Inicie suas manhãs sob a graça e direção divina. Receba mensagens bíblicas inspiradoras logo ao acordar."
      seoContent={seoContent}
    />
  )
}
