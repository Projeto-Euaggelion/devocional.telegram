const FEED_URL = "https://cadamanha.substack.com/feed.xml"

export type FeedItem = {
  title: string
  link: string
  description: string
  content: string
  pubDate: string
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
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

export function parseLatestItem(xml: string): FeedItem | null {
  const itemMatch = xml.match(/<item\b[^>]*>([\s\S]*?)<\/item>/i)
  if (!itemMatch) return null

  const itemContent = itemMatch[1]

  const title = decodeHtmlEntities(stripHtml(extractTagValue(itemContent, "title")))
  const link = decodeHtmlEntities(stripHtml(extractTagValue(itemContent, "link")))
  const description = decodeHtmlEntities(stripHtml(extractTagValue(itemContent, "description")))
  const pubDate = decodeHtmlEntities(stripHtml(extractTagValue(itemContent, "pubDate")))

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

export async function getLatestFeedItem(): Promise<FeedItem | null> {
  try {
    const response = await fetch(FEED_URL, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      next: { revalidate: 21600 }, // 6 hours
    })

    if (!response.ok) return null
    const xml = await response.text()
    return parseLatestItem(xml)
  } catch (error) {
    console.error("Error fetching feed:", error)
    return null
  }
}
