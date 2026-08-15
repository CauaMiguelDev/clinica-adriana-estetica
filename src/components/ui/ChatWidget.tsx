"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { CLINIC, waLink } from "@/lib/data";

interface Msg {
  from: "bot" | "user";
  text: string;
}

// Assistente virtual simples com respostas guiadas.
// TODO: conectar à Claude API (Anthropic) para respostas dinâmicas com IA.
const QUICK = [
  "Quais profissionais atendem?",
  "Como agendar uma consulta?",
  "Onde fica a clínica?",
];

function answer(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("agend"))
    return `É só clicar no botão “Agendar” no topo da página ou falar conosco diretamente pelo WhatsApp no número ${CLINIC.phoneDisplay}. 💛`;
  if (t.includes("onde") || t.includes("local") || t.includes("endereç"))
    return `Estamos em ${CLINIC.address}. Funcionamos ${CLINIC.hours}.`;
  if (t.includes("procedimento") || t.includes("trata") || t.includes("profission") || t.includes("especialista"))
    return "Nossas especialistas atendem nas áreas de massoterapia, estética facial, estética avançada e harmonização facial. Veja todos os detalhes na seção Equipe!";
  if (t.includes("preço") || t.includes("valor") || t.includes("quanto"))
    return "Os valores variam conforme o procedimento. Fale com a gente no WhatsApp para um orçamento personalizado. 💛";
  return "Ótima pergunta! Para um atendimento personalizado, fale com nossa equipe no WhatsApp. 💬";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Oi! Sou a assistente virtual do Espaço Cuide-se Bem. Como posso te ajudar? ✨" },
  ]);

  function send(text: string) {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: answer(text) }]);
    }, 1100);
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Assistente virtual"
        className="fixed bottom-24 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gold-grad text-[#1b140a] shadow-glow transition-transform hover:scale-110"
      >
        {open ? <X size={24} /> : <Bot size={26} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-40 right-4 z-40 flex h-[24rem] w-[calc(100vw-2rem)] max-w-[22rem] flex-col overflow-hidden rounded-3xl glass shadow-luxe sm:right-6 sm:h-[26rem]"
          >
            <div className="flex items-center gap-2 border-b border-line bg-gold-grad px-4 py-3 text-[#1b140a]">
              <Bot size={20} />
              <div className="leading-tight">
                <p className="text-sm font-semibold">Assistente Virtual</p>
                <p className="text-[0.65rem] opacity-80">Online agora</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                    m.from === "bot"
                      ? "bg-surface text-fg"
                      : "ml-auto bg-gold/20 text-fg"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="flex w-16 items-center gap-1 rounded-2xl bg-surface px-3.5 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-gold"
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-gold hover:text-gold"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-line p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreva sua mensagem…"
                  className="w-full rounded-full border border-line bg-bg px-4 py-2 text-sm outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  aria-label="Enviar"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-grad text-[#1b140a]"
                >
                  <Send size={16} />
                </button>
              </form>
              <a
                href={waLink(`Olá! Vim pelo site da ${CLINIC.name}.`)}
                target="_blank"
                rel="noopener"
                className="mt-2 block text-center text-xs text-gold hover:underline"
              >
                Prefere falar no WhatsApp? Clique aqui →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
