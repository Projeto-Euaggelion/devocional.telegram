import type { Metadata } from "next"
import { LandingPageTemplate } from "@/components/landing-page-template"

export const metadata: Metadata = {
  title: "Devocional Gratuito no Telegram | Mensagens Bíblicas de Graça",
  description: "Assine nosso devocional gratuito no Telegram. Receba reflexões bíblicas diárias, versículos e estudos de fé sem custo algum direto no seu celular.",
  keywords: [
    // Principais focadas em Gratuidade
    "devocional grátis",
    "devocional gratuito",
    "estudo bíblico gratuito",
    "pão diário grátis",
    "mensagem evangélica grátis",
    // Variações focadas em Telegram + Grátis
    "devocional gratuito no Telegram",
    "mensagens bíblicas de graça",
    "receber palavra de deus grátis",
    "canal de transmissão bíblico gratuito",
    "esboço de pregação gratuito",
    "estudos bíblicos para Telegram grátis",
    "versículo do dia gratuito"
  ],
  alternates: {
    canonical: "https://devocionalnoTelegram.com.br/devocional-gratuito",
  },
  openGraph: {
    title: "Devocional Gratuito no Telegram | Mensagens Bíblicas",
    description: "Assine nosso devocional gratuito no Telegram. Receba reflexões bíblicas diárias, versículos e estudos de fé sem custo direto no celular.",
    url: "https://devocionalnoTelegram.com.br/devocional-gratuito",
    siteName: "Devocional no Telegram",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://devocionalnoTelegram.com.br/og-devocional.png",
        width: 1200,
        height: 630,
        alt: "Devocional Gratuito no Telegram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devocional Gratuito no Telegram",
    description: "Receba reflexões bíblicas diárias, versículos e estudos sem custo direto no celular.",
    images: ["https://devocionalnoTelegram.com.br/og-devocional.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default async function DevocionalGratuitoPage() {
  const seoContent = (
    <>
      <header className="space-y-4">
        <h2 className="text-3xl font-bold">Acesso Gratuito à Palavra de Deus</h2>
        <p className="text-zinc-400">
          Acreditamos que a mensagem do Evangelho e o ensinamento bíblico devem estar disponíveis de forma acessível e desimpedida para todos. Por isso, oferecemos um serviço de <strong>devocional gratuito</strong> no Telegram, onde você não paga absolutamente nada para se inscrever, ler e compartilhar com quem você ama.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Por que Oferecemos Devocionais Gratuitos?</h3>
        <p className="text-zinc-400">
          Nosso principal objetivo é abençoar vidas e espalhar a semente da Palavra de Deus pelo Brasil e pelo mundo. Queremos facilitar o seu momento diário com o Senhor, removendo quaisquer barreiras. Veja o que você recebe gratuitamente:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-400">
          <li><strong>Textos Completos:</strong> Reflexões diárias profundas e baseadas fielmente nas Escrituras Sagradas.</li>
          <li><strong>Versículos Destacados:</strong> Uma passagem bíblica chave para memorizar e meditar ao longo de todo o seu dia.</li>
          <li><strong>Aplicações Práticas:</strong> Insights práticos de como aplicar os princípios divinos em sua família, trabalho e relacionamentos.</li>
          <li><strong>Facilidade de Compartilhamento:</strong> Envie as mensagens diretamente para amigos, familiares e grupos do Telegram com apenas um clique.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-zinc-100">Sem Assinaturas, Sem Taxas Ocultas</h3>
        <p className="text-zinc-400">
          Muitos aplicativos cobram mensalidades caras ou bloqueiam os melhores conteúdos com barreiras de pagamento (paywalls). No nosso canal, a sua inscrição é direta e 100% gratuita. Todo o conteúdo enviado foi criado para edificar a sua fé, sem fins comerciais.
        </p>
        <p className="text-zinc-400">
          Basta ter o Telegram instalado no seu smartphone. Clique no botão de inscrição, entre no canal oficial e comece a receber refrigério para a sua alma e ânimo para vencer as lutas diárias com a ajuda do Senhor.
        </p>
      </section>
    </>
  )

  return (
    <LandingPageTemplate
      title="Devocional Gratuito"
      subtitle="Fortaleça sua fé e comunhão com Deus sem pagar nada. Receba mensagens edificantes diariamente direto no celular."
      seoContent={seoContent}
    />
  )
}
