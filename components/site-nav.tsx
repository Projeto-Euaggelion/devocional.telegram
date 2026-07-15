import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function SiteNav() {
    return(
        <nav className="fixed top-0 left-0 w-full flex flex-row justify-between items-center px-6 py-4 z-[900] border-b border-ring/20 backdrop-blur-md bg-background/80">
            <Link href="/" title="Devocional no Telegram">
                <Image
                    width={50}
                    height={50}
                    alt="Devocional no Telegram - Logo"
                    src="/novas-de-cada-manha.jpg"
                    className="rounded-lg border border-zinc-100/20"
                />
            </Link>
            <Button>
                <a href="https://t.me/novasdecadamanha_devocional" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                Entrar no canal
                </a>
            </Button>
        </nav>
    )
}