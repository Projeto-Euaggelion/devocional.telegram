// lib/schema.ts
//
// Geradores de dados estruturados (Schema.org / JSON-LD) para o projeto.
// Cada função retorna um objeto plano pronto para ser serializado e injetado
// via o componente <JsonLd /> (components/json-ld.tsx).
//
// Referência de tipos: https://schema.org

export const SITE_URL = "https://devocionalnotelegram.com.br"
export const SITE_NAME = "Devocional no Telegram"
export const TELEGRAM_CHANNEL_URL = "https://t.me/novasdecadamanha_devocional"
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-devocional.png`

/**
 * Organização/marca por trás do canal.
 * Usada como `publisher` (e `author` padrão) em outros schemas via referência "@id".
 * Ajuste `name`, `logo` e `sameAs` se necessário.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
    },
    sameAs: [TELEGRAM_CHANNEL_URL],
  }
}

/**
 * Schema do site como um todo. Deve ser injetado UMA ÚNICA VEZ,
 * idealmente no layout raiz (app/layout.tsx), junto com organizationSchema().
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

/**
 * BreadcrumbList a partir de uma lista ordenada de { name, url }.
 * Use os mesmos itens que já aparecem no componente visual <Breadcrumb />
 * para manter dado estruturado e UI consistentes.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

interface BlogPostingInput {
  slug: string
  title: string
  description: string
  /** ISO 8601, ex: "2026-07-10" — vem do frontmatter `date` */
  date?: string
  modifiedDate?: string
  image?: string
  /** Nome de uma pessoa autora, se houver. Sem isso, assume a Organization como autora. */
  author?: string
}

/** BlogPosting — para /blog/[slug] */
export function blogPostingSchema({
  slug,
  title,
  description,
  date,
  modifiedDate,
  image,
  author,
}: BlogPostingInput) {
  const url = `${SITE_URL}/blog/${slug}`
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    image: image || DEFAULT_OG_IMAGE,
    ...(date ? { datePublished: date } : {}),
    dateModified: modifiedDate || date,
    inLanguage: "pt-BR",
    author: author
      ? { "@type": "Person", name: author }
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

interface BlogListItem {
  slug: string
  title: string
}

/** CollectionPage — para /blog (listagem/feed) */
export function blogCollectionSchema(posts: BlogListItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/blog#collection`,
    url: `${SITE_URL}/blog`,
    name: "Blog Devocional no Telegram",
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }
}

interface LandingPageInput {
  /** slug vazio ("") representa a home */
  slug: string
  title: string
  description: string
  image?: string
}

/** WebPage genérica — para "/" e para /[slug] (páginas de divulgação do canal) */
export function landingPageSchema({ slug, title, description, image }: LandingPageInput) {
  const url = slug ? `${SITE_URL}/${slug}` : SITE_URL
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    image: image || DEFAULT_OG_IMAGE,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  }
}