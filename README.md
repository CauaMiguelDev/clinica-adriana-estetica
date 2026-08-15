# Clínica Adriana Estética — Site Premium

Site institucional de alto padrão para clínica de estética e beleza, com foco em
conversão e agendamento. Construído com **Next.js 14 (App Router) + TypeScript +
Tailwind CSS + Framer Motion + React Three Fiber + Lucide**.

## ✨ Destaques visuais

- Tema **dark/light** com toggle (paleta dourado/champagne sobre fundo profundo)
- **Cursor personalizado**, **partículas douradas** flutuantes e **objeto 3D** no hero (R3F)
- **Glassmorphism**, gradientes animados, efeitos de **glow** e **shimmer**
- **Scroll reveal**, **parallax**, **tilt 3D** nos cards, **ripple** nos botões
- **Números animados**, barra de progresso de leitura e **preloader** elegante
- Totalmente **responsivo** e com `prefers-reduced-motion` respeitado

## 🧱 Seções

Hero · Sobre · Equipe · Catálogo de procedimentos (com filtros) · Antes & Depois
(comparador interativo) · Depoimentos (carrossel) · **Agendamento online em 4 passos**
· Pacotes & Assinaturas · Programa de fidelidade · Blog · FAQ (accordion) · Contato
+ mapa · Rodapé premium · WhatsApp flutuante · Assistente virtual (chat).

## 🚀 Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # servir a build
```

## ✅ O que já está funcional

- Todo o frontend, animações e responsividade
- **Agendamento → WhatsApp**: o formulário monta a mensagem (profissional,
  procedimento, data, horário, dados) e abre o WhatsApp da clínica
- Links de contato (WhatsApp, telefone, e-mail, mapa, redes)
- Catálogo com filtros por categoria e comparador antes/depois

## 🔌 Integrações pendentes (precisam de backend/credenciais)

Procure por `TODO` no código. Para deixar 100% operacional, integre:

| Recurso | Onde | Sugestão |
|---|---|---|
| Assistente IA real | `src/components/ui/ChatWidget.tsx` | Claude API (Anthropic) via rota `app/api/chat` |
| Newsletter / leads | `src/components/layout/Footer.tsx` | Mailchimp, Brevo ou Resend |
| Pagamento online | seção de consultoria/pacotes | Stripe ou Mercado Pago |
| Google Calendar + lembretes | `Booking.tsx` | Google Calendar API + webhook |
| Google Reviews ao vivo | `Testimonials.tsx` | Google Places API |
| Analytics | `app/layout.tsx` | `@next/third-parties` (GA4) |

## ⚙️ Personalização rápida

- **Dados** (clínica, equipe, procedimentos, preços, FAQ, blog): `src/lib/data.ts`
- **Cores / fontes / animações**: `tailwind.config.ts` e `src/app/globals.css`
- **Imagens**: hoje usam Unsplash (ilustrativas). Troque as URLs em `src/lib/data.ts`
  e nas seções por fotos reais da clínica para autenticidade total.
- **WhatsApp**: número em `CLINIC.whatsapp` (`src/lib/data.ts`).

---

> As imagens atuais são de banco de imagens (ilustrativas). Substitua por fotos
> reais da clínica e da equipe para o resultado final.
