"use client"

import { Provider, ClapButton } from "@lyket/react"

export function InteractionButton({slug}:any) {
    return(
        <Provider
            apiKey="pt_89cc199a4163149abcc63d6668992a"
            theme={{
                colors: {
                background: "var(--chart-4)",
                text: "white",
                primary: "var(--chart-5)"
                }
            }}
        >
            <ClapButton
                namespace="blog"
                id={slug}
            />
        </Provider>
    )
}

export function Counter({slug}:any) {
     return(
        <Provider
            apiKey="pt_89cc199a4163149abcc63d6668992a"
            theme={{
                colors: {
                background: "var(--chart-2)",
                text: "white",
                primary: "var(--chart-3)"
                }
            }}
        >
        </Provider>
     )
}