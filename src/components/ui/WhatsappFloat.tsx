import { MessageCircle } from "lucide-react";
import { CLINIC, waLink } from "@/lib/data";

/**
 * Atalho de WhatsApp sempre acessível.
 * Sem anel pulsando: o canto inferior fica quieto até a pessoa passar o mouse.
 */
export function WhatsappFloat() {
  return (
    <a
      href={waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`)}
      target="_blank"
      rel="noopener"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-0 rounded-full bg-[#25d366] p-4 text-white shadow-lift transition-all duration-300 hover:gap-2 hover:pr-5 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={24} aria-hidden />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[9rem]">
        Fale conosco
      </span>
      <span className="sr-only">Falar no WhatsApp</span>
    </a>
  );
}
