// ./page.tsx
import { Button } from "@/components/ui/button"
import DevocionalHoje from "@/components/devotional-today"
import { JsonLd } from "@/components/json-ld"
import { landingPageSchema } from "@/lib/schema"

export default function Page() {
  return (
    <main>
      <JsonLd
        data={landingPageSchema({
          slug: "",
          title: "Devocional no Telegram",
          description:
            "Inscreva-se, gratuitamente, em nosso canal do Telegram, receba nossos devocionais diários em seu celular e seja abençoado(a) com a Palavra de Deus.",
        })}
      />
      <div className="md:h-screen flex flex-col-reverse md:grid md:grid-cols-2 gap-4 md:gap-8 md:overflow-hidden">
        <section className="relative px-6 pt-8 pb-10 md:pt-0 md:pb-0 md:px-12 flex flex-col items-center justify-center gap-4">
          <header className="w-full flex flex-col gap-2">
            <h1 className="text-4xl font-bold">Devocional no Telegram</h1>
            <h2 className="text-lg text-zinc-400">Inscreva-se, gratuitamente, em nosso canal do Telegram, receba nossos devocionais diários em seu celular e seja abençoado(a) com a Palavra de Deus.</h2>
          </header>

          <footer className="md:absolute w-full bottom-0 left-0 md:p-6 flex">
            <Button className="w-full py-6">
              <a href="https://t.me/novasdecadamanha_devocional" target="_blank" rel="noopener noreferrer">
                Entrar no canal
              </a>
            </Button>
          </footer>
        </section>

        <DevocionalHoje />
      </div>
    </main>
  )
}