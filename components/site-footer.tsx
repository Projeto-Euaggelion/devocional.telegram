export default function SiteFooter() {
    return(
        <footer className="py-10 md:py-6 px-6 flex flex-col justify-center items-center gap-4 md:flex-row md:justify-between border-t border-ring/20">
            <p>{new Date().getFullYear()} &copy; Devocional no Telegram</p>
            <p className="text-center text-ring">Um site do <a href="https://cadamanha.substack.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-dotted">Projeto Euaggelion | Novas de Cada Manhã</a></p>
        </footer>
    )
}