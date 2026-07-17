// components/json-ld.tsx
//
// Injeta um ou mais objetos JSON-LD como <script type="application/ld+json">.
// Aceita um único objeto ou um array (útil quando uma página precisa de mais
// de um schema, ex: BlogPosting + BreadcrumbList no mesmo artigo).

type JsonLdData = Record<string, unknown> | Record<string, unknown>[]

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify de objetos que nós mesmos montamos — não há input de
      // usuário aqui, mas ainda assim isso é o único jeito de injetar JSON-LD
      // em React/Next sem escapar as aspas.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}