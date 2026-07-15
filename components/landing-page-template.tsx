import { getLatestFeedItem } from "@/lib/feed"
import { Button } from "@/components/ui/button"
import DevocionalHoje from "./devotional-today"

type FaqItem = {
  question: string
  answer: string
}

type LandingPageTemplateProps = {
  title: string
  subtitle: string
  seoContent: React.ReactNode
  faq?: FaqItem[]
}

export async function LandingPageTemplate({
  title,
  subtitle,
  seoContent
}: LandingPageTemplateProps) {
  const feedItem = await getLatestFeedItem()

  return (
    <main className="min-h-screen flex flex-col text-zinc-50">
      {/* Seção Principal (Hero) */}
      <div className="md:h-screen flex flex-col-reverse md:grid md:grid-cols-2 gap-4 md:gap-8 md:overflow-hidden border-b border-zinc-900">
        <section className="relative px-6 pt-8 pb-10 md:pt-0 md:pb-0 md:px-12 flex flex-col items-center justify-center gap-4">
          <header className="w-full flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            <h2 className="text-lg text-zinc-400 leading-relaxed">{subtitle}</h2>
          </header>

          <footer className="md:absolute w-full bottom-0 left-0 md:p-6 flex gap-2">
            <Button className="w-full py-6 font-semibold">
              <a href="https://t.me/novasdecadamanha_devocional" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                Entrar no canal
              </a>
            </Button>
          </footer>
        </section>

        <DevocionalHoje />
      </div>

      {/* Conteúdo SEO rico em texto (Below the fold) */}
      <section className="bg-zinc-950 py-16 px-6 md:py-24">
        <article className="max-w-3xl mx-auto space-y-12 prose prose-invert prose-headings:text-zinc-50 prose-p:text-zinc-400 prose-strong:text-zinc-300">
          {seoContent}
        </article>

        <footer className="max-w-3xl mx-auto mt-10">
          <Button className="w-full py-6 font-semibold">
            <a href="https://t.me/novasdecadamanha_devocional" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
              Entrar no canal
            </a>
          </Button>
        </footer>
      </section>
    </main>
  )
}
