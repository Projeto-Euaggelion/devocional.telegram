import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { Metadata } from "next"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { JsonLd } from "@/components/json-ld"
import { blogCollectionSchema } from "@/lib/schema"

  export const metadata: Metadata = {
    title: "Blog Devocional no Telegram | Últimos Artigos e Mensagens",
    description: "Acompanhe nossas últimas publicações de devocionais matinais, mensagens de bom dia e estudos bíblicos diários.",
  }

  const CONTENT_DIR = path.join(process.cwd(), "content/blog")
  const POSTS_PER_PAGE = 6

  interface BlogPost {
    slug: string
    title: string
    description: string
    date: string
    ogImage?: string
  }

  async function getAllPosts(): Promise<BlogPost[]> {
    if (!fs.existsSync(CONTENT_DIR)) return []

    const files = fs.readdirSync(CONTENT_DIR)

    const posts = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "")
        const filePath = path.join(CONTENT_DIR, file)
        const fileContent = fs.readFileSync(filePath, "utf-8")
        const { data } = matter(fileContent.trim())

        // Se não houver uma data definida no Frontmatter, usamos a data de criação/modificação física
        const stats = fs.statSync(filePath)
        const fallbackDate = stats.mtime.toISOString().split("T")[0]

        return {
          slug,
          title: data.title || "Sem título",
          description: data.description || "",
          date: data.date || fallbackDate,
          ogImage: data.ogImage || "/og-devocional.png",
        }
      })

    // Ordena os posts por data (mais recentes primeiro)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  interface PageProps {
    searchParams: Promise<{ page?: string }>
  }

  export default async function BlogFeedPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams
    const currentPage = Number(resolvedParams.page) || 1
    
    const allPosts = await getAllPosts()
    const totalPosts = allPosts.length
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    // Fatia os posts para exibir apenas os correspondentes à página atual
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const paginatedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-6 md:px-12">
        <JsonLd
          data={blogCollectionSchema(
            paginatedPosts.map((post) => ({ slug: post.slug, title: post.title }))
          )}
        />
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="space-y-4 border-b border-zinc-800 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Blog
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Últimas atualizações do Devocional no Telegram
            </p>
          </header>

          {/* Grid de Artigos */}
          {paginatedPosts.length === 0 ? (
            <p className="text-zinc-500 py-12">Nenhum artigo publicado ainda.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <article 
                  key={post.slug} 
                  className="flex flex-col justify-between border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6 hover:border-zinc-700 transition duration-200"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider">
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </span>
                    <h2 className="text-xl font-bold text-zinc-100 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-cyan-400 transition">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-zinc-800">
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="text-sm font-semibold text-cyan-500 hover:text-cyan-400 flex items-center gap-1 transition"
                    >
                      Ler artigo completo &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Controle de Paginação (Shadcn) */}
          {totalPages > 1 && (
            <div className="pt-8">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href={`/blog?page=${currentPage - 1}`} />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href={`/blog?page=${pageNum}`}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={`/blog?page=${currentPage + 1}`} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
    )
  }