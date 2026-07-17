// /[slug]/page.tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { landingPageSchema } from "@/lib/schema"
import DevocionalHoje from "@/components/devotional-today"

interface PageProps {
  params: Promise<{ slug: string }>
}

const CONTENT_DIR = path.join(process.cwd(), "content/page")

async function getPostData(slug: string) {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
    
    // Proteção contra Directory Traversal
    if (!filePath.startsWith(CONTENT_DIR)) {
      return null
    }

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    
    // O .trim() remove espaços em branco e quebras de linha no início do arquivo, 
    // garantindo que o gray-matter consiga ler o frontmatter mesmo se houver recuo
    const { data, content } = matter(fileContent.trim())

    return {
      frontmatter: data as {
        title?: string
        description?: string
        keywords?: string[]
        canonical?: string
        ogImage?: string
      },
      content,
    }
  } catch (error) {
    return null
  }
}

// Gera as rotas estáticas para todos os arquivos MDX durante o build
export async function generateStaticParams() {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR)
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }))
}

// SEO Dinâmico do Blog baseado no Frontmatter do arquivo
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post || !post.frontmatter) return {}

  const { title, description, keywords, canonical, ogImage } = post.frontmatter
  const pageUrl = canonical || `https://devocionalnotelegram.com.br/${slug}`
  const imagePreview = ogImage || "https://devocionalnotelegram.com.br/og-devocional.png"

  return {
    title: title ? `${title} | Devocional no Telegram` : "Devocional no Telegram",
    description,
    keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Devocional no Telegram",
      locale: "pt_BR",
      type: "article",
      images: [
        {
          url: imagePreview,
          width: 1200,
          height: 630,
          alt: title || "Devocional no Telegram",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePreview],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function DevocionalBomDiaPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    notFound()
  }

  // Componentes mapeados para serem aceitos dentro dos arquivos .mdx
  // Componentes mapeados para estilizar as tags geradas pelo MDX
  const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="text-3xl font-bold text-zinc-50 mt-8 mb-4" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="text-2xl font-semibold text-zinc-100 mt-8 mb-4" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className="text-xl font-semibold text-zinc-100 mt-6 mb-3" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="text-zinc-400 leading-relaxed my-6" {...props} />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
      <strong className="font-semibold text-zinc-300" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="list-disc pl-6 space-y-2 text-zinc-400 my-4" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="list-decimal pl-6 space-y-2 text-zinc-400 my-4" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
      <li className="text-zinc-400" {...props} />
    ),
    Button,
  }

  return (
    <main className="min-h-screen flex flex-col text-zinc-50">
      <JsonLd
        data={landingPageSchema({
          slug,
          title: post.frontmatter.title ?? "",
          description: post.frontmatter.description ?? "",
          image: post.frontmatter.ogImage,
        })}
      />
      <div className="md:h-screen flex flex-col-reverse md:grid md:grid-cols-2 gap-4 md:gap-8 md:overflow-hidden border-b border-zinc-900">
        <section className="relative px-6 pt-8 pb-10 md:pt-0 md:pb-0 md:px-12 flex flex-col items-center justify-center gap-4">
          <header className="w-full flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">{post.frontmatter.title}</h1>
            <h2 className="text-lg text-zinc-400 leading-relaxed">{post.frontmatter.description}</h2>
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

      <section className="bg-zinc-950 py-16 px-6 md:py-24">
        <article className="max-w-3xl mx-auto space-y-12 prose prose-invert prose-headings:text-zinc-50 prose-p:text-zinc-400 prose-strong:text-zinc-300">
          {post.content && <MDXRemote source={post.content} components={mdxComponents} />}
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