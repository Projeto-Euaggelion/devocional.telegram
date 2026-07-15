import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devocionalnotelegram.com.br"
  
  // 1. Suas rotas estáticas e institucionais padrão
  const staticRoutes = [
    "",
    "/devocional-diario",
    "/devocional-gratuito",
    "/devocional-bom-dia",
    "/devocional-para-telegram",
    "/devocional-evangelico",
  ]

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }))

  // 2. Buscar dinamicamente todos os posts do blog na pasta `./content`
  const contentDir = path.join(process.cwd(), "content")
  
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir)
    
    const blogEntries = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "")
        const filePath = path.join(contentDir, file)
        
        // Obtém a data de última modificação real do arquivo físico
        const stats = fs.statSync(filePath)
        const lastModified = stats.mtime || new Date()

        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: lastModified,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }
      })

    // 3. Junta as rotas estáticas com as rotas dinâmicas do blog
    sitemapEntries.push(...blogEntries)
  }

  return sitemapEntries
}