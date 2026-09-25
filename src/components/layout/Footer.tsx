import { Instagram, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import { LotusMark } from "@/components/ui/Logo";
import { CLINIC, waLink } from "@/lib/data";

// O rodapé é o mapa completo do site: aqui entram as âncoras internas e o
// /blog, que ficou fora do menu principal.
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

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-sand">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-olive text-white">
              <LotusMark className="h-6 w-6" />
            </span>
            <span className="font-display text-xl font-semibold">
              {CLINIC.name}
            </span>
          </div>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Estética e bem-estar em Ceilândia, Brasília. Cuidado, técnica e
            acolhimento em cada atendimento.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={waLink(
                `Olá! Gostaria de agendar um horário no ${CLINIC.name}.`
              )}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-olive px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-olive-dark"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href={CLINIC.instagram}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-olive hover:text-olive-dark"
            >
              <Instagram size={16} /> {CLINIC.instagramHandle}
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-display text-lg font-semibold">Navegação</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-muted sm:grid-cols-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-olive-dark hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-semibold">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {CONTACT.map((c, i) => (
              <li key={i} className="flex gap-2.5">
                <c.icon size={16} className="mt-0.5 shrink-0 text-olive" />
                <span className="min-w-0 break-words">{c.value}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/contato#contato"
            className="mt-4 inline-block text-sm font-semibold text-olive-dark hover:underline"
          >
            Ver no mapa
          </Link>
        </div>
      </div>

      <div className="border-t border-line py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
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
