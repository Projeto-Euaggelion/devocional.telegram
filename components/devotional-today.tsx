"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

type FeedItem = {
  title: string
  link: string
  description: string
  content: string
  pubDate: string
}

type CachedFeed = {
  item: FeedItem
  fetchedAt: number
}

const FEED_URL = "/api/feed"
const CACHE_KEY = "cadamanha-feed-cache"
const CACHE_TTL_MS = 6 * 60 * 60 * 1000

function readCachedFeed(): CachedFeed | null {
  if (typeof window === "undefined") return null
  try {
    const stored = window.localStorage.getItem(CACHE_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored) as Partial<CachedFeed>
    if (!parsed.item || typeof parsed.fetchedAt !== "number") return null
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null
    return { item: parsed.item, fetchedAt: parsed.fetchedAt }
  } catch {
    return null
  }
}

function writeCachedFeed(item: FeedItem) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ item, fetchedAt: Date.now() }))
  } catch {
    // Ignora falhas de storage.
  }
}

export default function DevocionalHoje() {
    const [feedItem, setFeedItem] = useState<FeedItem | null>(null)

    useEffect(() => {
        let isMounted = true
        const cachedFeed = readCachedFeed()
        if (cachedFeed) setFeedItem(cachedFeed.item)

        fetch(FEED_URL)
        .then((res) => res.json())
        .then((data: FeedItem | { error: string }) => {
            if (!isMounted) return
            if ("error" in data) {
            if (!cachedFeed) {
                setFeedItem({
                title: "Não foi possível carregar o devocional no momento.",
                link: "",
                description: "",
                content: "",
                pubDate: "",
                })
            }
            return
            }
            setFeedItem(data)
            writeCachedFeed(data)
        })
        .catch(() => {
            if (!isMounted) return
            if (!cachedFeed) {
            setFeedItem({
                title: "Não foi possível carregar o devocional no momento.",
                link: "",
                description: "",
                content: "",
                pubDate: "",
            })
            }
        })

        return () => {
        isMounted = false
        }
    }, [])

    const isLoading = !feedItem
    
    return(
        <section className="relative h-[50vh] overflow-y-auto md:h-auto md:overflow-hidden">
            <Badge className="absolute left-6 top-6 z-20 shadow-lg shadow-blue-950 p-4 rounded-full" variant="secondary">
            Devocional de Hoje
            </Badge>
            <div className="absolute md:rounded-l-4xl inset-0 pointer-events-none select-none -z-10 overflow-hidden bg-blue-950/40">
            <Image
                src="/background_white.png"
                width={800}
                height={800}
                alt="WhatsApp Background"
                className="w-full h-full object-cover opacity-10 pointer-events-none select-none"
                priority
            />
            </div>

            <div className="relative h-full pb-6 pt-20 px-2 overflow-y-auto md:py-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <Message>
                <MessageContent>
                <Bubble variant="default" align="end">
                    <BubbleContent>
                    {isLoading ? (
                        "Carregando último devocional..."
                    ) : (
                        <div className="flex flex-col gap-2">
                        <p className="font-semibold">{feedItem.title}</p>
                        {feedItem.description && (
                            <p className="text-sm opacity-80 my-2 p2-4 pl-2 border-l-4 border-border">{feedItem.description}</p>
                        )}
                        {feedItem.content && (
                            <div className="flex flex-col gap-2 text-sm mb-2">
                            {feedItem.content
                                .split(/\n{2,}/)
                                .map((paragraph) => paragraph.trim())
                                .filter(Boolean)
                                .map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        )}
                        </div>
                    )}
                    </BubbleContent>
                    <BubbleReactions aria-label="Reações da mensagem: coração e oração" align="start">
                    <span>❤️ 4</span>
                    <span>🙏🏻 10</span>
                    </BubbleReactions>
                </Bubble>
                </MessageContent>
                <MessageAvatar>
                <Avatar>
                    <AvatarImage src="/novas-de-cada-manha.jpg" alt="Novas de Cada Manhã" />
                </Avatar>
                </MessageAvatar>
            </Message>
            </div>
        </section>
    )
}