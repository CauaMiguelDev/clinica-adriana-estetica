import { Instagram, Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LotusMark } from "@/components/ui/Logo";
import { ActionButton } from "@/components/ui/ActionButton";
import { Aurora } from "@/components/ui/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC, waLink } from "@/lib/data";

// O rodapé é o mapa completo do site: aqui entram as âncoras internas e o
// /blog, que no desktop fica no grupo discreto do menu.
const NAV = [
  { href: "/servicos", label: "Serviços" },
  { href: "/servicos#procedimentos", label: "Procedimentos" },
  { href: "/precos", label: "Preços" },
  { href: "/contato#agendar", label: "Agendamento" },
  { href: "/resultados", label: "Resultados" },
  { href: "/sobre", label: "A clínica" },
  { href: "/sobre#equipe", label: "Equipe" },
  { href: "/servicos#faq", label: "Dúvidas" },
  { href: "/blog", label: "Blog" },
];

const CONTACT = [
  { icon: MapPin, value: CLINIC.address },
  { icon: Phone, value: CLINIC.phoneDisplay },
  { icon: Mail, value: CLINIC.email },
  { icon: Clock, value: CLINIC.hours },
];

const BOOK = waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`);

/**
 * Rodapé escuro, em oliva profundo.
 *
 * É o único bloco escuro do site, e isso é de propósito: fecha a página com
 * peso, como a contracapa de um livro, e dá ao último convite para agendar um
 * palco que a faixa de areia de antes não dava. A cor vem da Aurora em tom
 * escuro — o mesmo fundo vivo do Hero, invertido.
 *
 * Contraste: branco sobre `olive-dark` passa de 7:1; o texto secundário fica
 * em `white/75`, acima de 4,5:1.
 */
export function Footer() {
  return (
    <footer className="relative z-10 isolate overflow-hidden bg-olive-dark text-white">
      <Aurora tone="dark" />

      {/* Convite final */}
      <div className="container-page relative pt-20 sm:pt-28">
        <Reveal className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              Seu momento começa aqui
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Que tal um tempo para{" "}
              <span className="font-normal italic text-[#F1D9C9]">se cuidar</span>?
            </h2>
            <p className="mt-5 max-w-lg text-white/75">
              Atendimento {CLINIC.hours}. A primeira conversa pelo
              WhatsApp já encaminha o protocolo certo para você.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ActionButton href={BOOK} target="_blank" rel="noopener" variant="light">
              <MessageCircle size={16} /> Agendar pelo WhatsApp
            </ActionButton>
            <ActionButton href="/contato" variant="glass">
              Como chegar <ArrowUpRight size={16} />
            </ActionButton>
          </div>
        </Reveal>
      </div>

      <div className="container-page relative grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/20">
              <LotusMark className="h-6 w-6" />
            </span>
            <span className="font-display text-xl font-semibold">{CLINIC.name}</span>
          </div>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
            Estética e bem-estar em Ceilândia, Brasília. Cuidado, técnica e
            acolhimento em cada atendimento.
          </p>

          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener"
            className="group mt-6 inline-flex items-center gap-3 text-sm"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-[background-color,border-color,color] duration-600 group-hover:border-white group-hover:bg-white group-hover:text-olive-dark">
              <Instagram size={17} />
            </span>
            <span className="link-line">{CLINIC.instagramHandle}</span>
          </a>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            Navegação
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/80 sm:grid-cols-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            Contato
          </h2>
          <ul className="mt-5 space-y-3.5 text-sm text-white/80">
            {CONTACT.map((c, i) => (
              <li key={i} className="flex gap-3">
                <c.icon size={16} className="mt-0.5 shrink-0 text-[#F1D9C9]" />
                <span className="min-w-0 break-words">{c.value}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/contato#contato"
            className="link-line mt-5 text-sm font-semibold text-white"
          >
            Ver no mapa
          </Link>
        </div>
      </div>

      {/* A marca em tamanho de cartaz, cortada pela borda de baixo. Decorativa:
          o nome já está no bloco acima para quem lê. */}
      <div aria-hidden className="relative select-none overflow-hidden">
        <Reveal variant="up">
          <p className="translate-y-[18%] whitespace-nowrap text-center font-display text-[15vw] font-semibold leading-none tracking-[-0.04em] text-white/[0.07]">
            Cuide-se Bem
          </p>
        </Reveal>
      </div>

      <div className="relative border-t border-white/15 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {CLINIC.name}. Todos os direitos
            reservados.
          </p>
          {/* TODO: substituir pelo CNPJ real e publicar a Política de Privacidade. */}
          <p>CNPJ 00.000.000/0001-00 · Política de Privacidade · LGPD</p>
        </div>
      </div>
    </footer>
  );
}
