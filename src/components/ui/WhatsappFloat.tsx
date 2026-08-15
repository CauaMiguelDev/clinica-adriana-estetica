"use client";

import { MessageCircle } from "lucide-react";
import { CLINIC, waLink } from "@/lib/data";

export function WhatsappFloat() {
  return (
    <a
      href={waLink(`Olá! Gostaria de agendar um horário na ${CLINIC.name}.`)}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-glow transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-[#25d366]" />
      <MessageCircle size={26} />
    </a>
  );
}
