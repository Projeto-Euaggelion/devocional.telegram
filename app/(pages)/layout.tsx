import SiteNav from "@/components/site-nav"

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return(
        <>
            <SiteNav />
            <div className="pt-20">
                {children}
            </div>
        </>
    )
}