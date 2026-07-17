"use client"

import { useEffect, useState } from "react"
import { Provider, ClapButton } from "@lyket/react"

export function InteractionButton({ slug }: any) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-24" /> // placeholder com dimensões parecidas
  }

  return (
    <Provider
      apiKey="pt_89cc199a4163149abcc63d6668992a"
      theme={{
        colors: {
          background: "var(--chart-4)",
          text: "white",
          primary: "var(--chart-5)",
        },
      }}
    >
      <ClapButton namespace="blog" id={slug} />
    </Provider>
  )
}