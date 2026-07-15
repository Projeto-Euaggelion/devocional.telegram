"use client"

import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

type FaqItem = {
  question: string
  answer: string
}

export function FaqDrawer({ faq }: { faq: FaqItem[] }) {
  return (
    <Drawer swipeDirection="left">
      <DrawerTrigger render={<Button className="w-1/6 py-6 text-zinc-400" variant="link" />}>
        <InfoIcon className="size-6" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Perguntas Frequentes</DrawerTitle>
          <DrawerDescription>Tire suas dúvidas sobre o Devocional no WhatsApp</DrawerDescription>
        </DrawerHeader>
        
        <section className="border-t border-border mt-4 p-4 space-y-6">
          {faq.map((item, index) => (
            <div key={index}>
              <p className="text-zinc-200 font-bold">{item.question}</p>
              <p className="text-zinc-400">{item.answer}</p>
            </div>
          ))}
        </section>

        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Fechar</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
