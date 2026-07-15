import { NextResponse } from "next/server"

const FEED_URL = "https://cadamanha.substack.com/feed.xml"

type FeedItem = {
  title: string
  link: string
  description: string
  content: string
  pubDate: string
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // entidades numéricas decimais, ex: &#8220;
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    // entidades numéricas hexadecimais, ex: &#x2018;
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
}

function stripHtml(value: string) {
  return value
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function extractTagValue(source: string, tag: string) {
  const match = source.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"))
  if (!match) return ""

  let value = match[1].trim()
  const cdataMatch = value.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
  if (cdataMatch) value = cdataMatch[1]

  return value
}

function parseLatestItem(xml: string): FeedItem | null {
  const itemMatch = xml.match(/<item\b[^>]*>([\s\S]*?)<\/item>/i)
  if (!itemMatch) return null

  const itemContent = itemMatch[1]

  const title = decodeHtmlEntities(stripHtml(extractTagValue(itemContent, "title")))
  const link = decodeHtmlEntities(stripHtml(extractTagValue(itemContent, "link")))
  const description = decodeHtmlEntities(stripHtml(extractTagValue(itemContent, "description")))
  const pubDate = decodeHtmlEntities(stripHtml(extractTagValue(itemContent, "pubDate")))

  // Substack publica o artigo completo em <content:encoded>
  const rawContent = extractTagValue(itemContent, "content:encoded")
  const content = decodeHtmlEntities(stripHtml(rawContent))

  return {
    title: title || "Último item do feed",
    link,
    description,
    content,
    pubDate,
  }
}

export async function GET() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const response = await fetch(FEED_URL, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      next: { revalidate: 6 * 60 * 60 },
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      return NextResponse.json({ error: "Não foi possível carregar o feed." }, { status: response.status })
    }

    const xml = await response.text()
    const item = parseLatestItem(xml)

    if (!item) {
      return NextResponse.json({ error: "Não foi possível encontrar itens no feed." }, { status: 502 })
    }

    return NextResponse.json(item, {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" },
    })
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Tempo limite ao buscar o feed." }, { status: 504 })
    }

    return NextResponse.json({ error: "Erro ao buscar o feed." }, { status: 500 })
  }
}