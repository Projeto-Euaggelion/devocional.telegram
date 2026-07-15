import type { Metadata } from "next"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PageProps {
  params: Promise<{ slug: string }>
}

const CONTENT_DIR = path.join(process.cwd(), "content")

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
  const pageUrl = canonical || `https://devocionalnowhatsapp.com.br/blog/${slug}`
  const imagePreview = ogImage || "https://devocionalnowhatsapp.com.br/og-devocional.png"

  return {
    title: title ? `${title} | Devocional no WhatsApp` : "Devocional no WhatsApp",
    description,
    keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Devocional no WhatsApp",
      locale: "pt_BR",
      type: "article",
      images: [
        {
          url: imagePreview,
          width: 1200,
          height: 630,
          alt: title || "Devocional no WhatsApp",
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
    <main>
      <article className="max-w-3xl md:max-w-full mx-auto space-y-12 prose prose-invert prose-headings:text-zinc-50 prose-p:text-zinc-400 prose-strong:text-zinc-300">
        <header className="px-8 py-20 md:px-20 md:py-24 bg-blue-950/40">
          <div className="md:max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold md:text-5xl">
              {post.frontmatter.title}
            </h1>
            <p className="text-zinc-400 text-lg">
              {post.frontmatter.description}
            </p>

            {/* asChild evita a renderização inválida de um <button> contendo um <a> */}
            <Button className="w-full py-6 mt-10 font-semibold">
              <a
                href="https://whatsapp.com/channel/0029Vb7awlL8aKvAzcgyrd3c"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                Entrar no canal
              </a>
            </Button>
          </div>
        </header>

        {/* Renderiza o conteúdo compilado do Markdown */}
        <section className="mx-auto md:max-w-3xl px-10 prose prose-zinc dark:prose-invert">
          <MDXRemote source={post.content} components={mdxComponents} />
        </section>

        <footer className="relative border-t border-border px-10 md:px-20 py-20 mt-10 md:mt-20 bg-blue-950/40">
          <div className="max-w-3xl mx-auto flex flex-col gap-10 relative z-10">
              <h4 className="text-4xl font-bold">
                  Receba nossos devocionais, gratuitamente, em seu WhatsApp
              </h4>
              <Button className="w-full py-6 font-semibold">
                  <a
                  href="https://whatsapp.com/channel/0029Vb7awlL8aKvAzcgyrd3c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                  >
                  Entrar no canal
                  </a>
              </Button>
          </div>

          <Image
              src="/background_white.png"
              width={800}
              height={800}
              alt="WhatsApp Background"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-10 pointer-events-none select-none z-0"
              priority
          />
        </footer>
      </article>
    </main>
  )
}