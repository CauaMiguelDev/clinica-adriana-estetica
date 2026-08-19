import type { Metadata } from "next";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Agendar e Contato",
  description:
    "Monte seu agendamento e abra a conversa no WhatsApp. Endereço, horários e como chegar ao Espaço Cuide-se Bem em Ceilândia, Brasília.",
};

export default function ContatoPage() {
  return (
    <div className="pt-[--header-h]">
      <Booking />
      <Contact />
    </div>
  );
}
