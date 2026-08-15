# Sistema de design — Espaço Cuide-se Bem

Direção: **aconchegante, natural, spa.** Terroso e caloroso, nunca frio ou clínico.
Elegante mas acessível — o público tem 25 a 55 anos e precisa se sentir convidado,
não intimidado.

Fonte da verdade: os valores vivem em `src/app/globals.css` (`:root`) e são expostos ao
Tailwind em `tailwind.config.ts`. **Nunca escreva um valor de cor direto no componente** —
use sempre a classe utilitária.

---

## 1. Cor

### Neutros

| Token | Hex | Uso |
|---|---|---|
| `bg-bg` | `#FAF6F0` | Fundo da página. Areia clara, quente. |
| `bg-surface` | `#FFFFFF` | Cards e painéis elevados. |
| `bg-sand` | `#F4EDE4` | Faixas de seção alternadas, para separar sem borda. |
| `text-fg` | `#2E2A24` | Texto principal. Marrom quase-preto — nunca preto puro. |
| `text-muted` | `#6B6156` | Texto de apoio, legendas. |
| `border-line` | `#E4DACE` | Bordas. É a cor **padrão** de borda do projeto. |

### Cor de ação — oliva

| Token | Hex | Uso |
|---|---|---|
| `olive` | `#63704F` | **A cor de tudo que é clicável.** Botões primários, links, ícones ativos, foco. |
| `olive-dark` | `#4A5539` | Texto/ícone que precisa de mais peso; hover de botão. |
| `olive-light` | `#8B9878` | Só decorativo (barra de rolagem, filetes). **Nunca texto.** |

### Secundária — terracota

| Token | Hex | Uso |
|---|---|---|
| `terracotta` | `#9A5C42` | Botões secundários, destaque dentro de títulos. |
| `terracotta-dark` | `#7E4832` | A palavra em destaque nos títulos de seção. |
| `terracotta-light` | `#C08A70` | Só decorativo. |

### Acento — dourado

| Token | Hex | Uso |
|---|---|---|
| `gold` | `#C9A35E` | **Raro e cerimonial:** selos de certificação, estrelas de avaliação, um filete. |

> **Regra dura:** dourado tem contraste 2,2:1 sobre o fundo. **Nunca use `text-gold`.**
> Ele só aparece como preenchimento de ícone, borda ou fundo de selo.

### Contraste — todos verificados (WCAG AA, mínimo 4,5:1)

| Combinação | Razão | |
|---|---|---|
| `fg` sobre `bg` | 13,2:1 | ✓ |
| `muted` sobre `bg` | 5,7:1 | ✓ |
| `olive` sobre `bg` | 4,9:1 | ✓ |
| branco sobre `olive` | 5,3:1 | ✓ |
| `terracotta` sobre `bg` | 4,9:1 | ✓ |
| branco sobre `terracotta` | 5,3:1 | ✓ |
| `gold` sobre `bg` | 2,2:1 | ✗ decorativo apenas |

Oliva e terracota foram escolhidos exatamente no ponto em que funcionam nas **duas
direções** — como texto sobre o fundo claro e como fundo sob texto branco. Isso permite
usar um único token para o botão e para o link.

---

## 2. Tipografia

**Títulos — Fraunces** (serifada com personalidade), pesos `400` e `600`.
**Leitura — Karla** (humanista, calorosa, ótima em parágrafo), pesos `400`, `500`, `700`.

5 pesos no total. Antes eram 10 — metade do peso de rede em fontes.

| Papel | Classe | Tamanho |
|---|---|---|
| H1 (Hero) | `font-display text-4xl sm:text-6xl font-semibold` | ramp único |
| H2 (seção) | `font-display text-3xl sm:text-4xl font-semibold` | **igual em toda seção** |
| H3 (card) | `font-display text-xl font-semibold` | |
| Corpo | `text-base text-muted` | |
| Apoio | `text-sm text-muted` | |
| Eyebrow | `.eyebrow` | 12px, versalete, `tracking-[0.22em]`, oliva |

**Regras:**
- Todo H2 de seção usa exatamente a mesma classe. A variação vem do conteúdo, não do tamanho.
- Destaque dentro do título = `text-terracotta-dark`. **Não use texto com gradiente** — era
  a causa dos remendos `leading-normal py-2` para consertar descendentes cortadas.
- Nenhum itálico decorativo repetido seção após seção.

---

## 3. Espaçamento e forma

**Seções:** `.section-pad` → `py-16 sm:py-24 lg:py-28`. Rampa suave em três degraus.
**Largura:** `.container-page` → `max-w-7xl px-5 sm:px-8`.

**Raios — três valores, só três:**

| Classe | Valor | Uso |
|---|---|---|
| `rounded-xl` | 12px | Chips, campos de formulário, caixas de ícone |
| `rounded-card` | 20px | Cards, botões grandes |
| `rounded-panel` | 32px | Painéis grandes, imagens, blocos de destaque |

Botões e pílulas continuam `rounded-full`.

**Sombras — quentes e discretas, nunca preto puro:**

| Classe | Uso |
|---|---|
| `shadow-soft` | Repouso. Card apoiado no fundo. |
| `shadow-lift` | Elevado ou em hover. |

Não existe mais "glow". Brilho dourado ao redor de tudo era o que fazia o site parecer
uma vitrine em vez de um espaço de cuidado.

---

## 4. Estados

| Estado | Regra |
|---|---|
| **Hover** (botão primário) | fundo `olive` → `olive-dark`, `shadow-soft` → `shadow-lift`. Sem escala. |
| **Hover** (card) | `-translate-y-1` + `shadow-lift` + borda `olive/30`. Nada mais. |
| **Hover** (link) | `text-muted` → `text-olive-dark`, sublinhado aparece. |
| **Foco** | Contorno oliva de 2px com 3px de afastamento. Definido **uma vez** em `globals.css` via `:focus-visible` — vale para todo link, botão, campo e elemento focável do site. |
| **Ativo** | `active:scale-[0.98]`, curto. |
| **Desabilitado** | `opacity-50 cursor-not-allowed`. |

---

## 5. Movimento

O movimento **serve** ao conteúdo: entrada ao rolar, resposta ao toque, transição de
estado. Nada balança sozinho.

- **Proibido:** selo flutuando eternamente, anel girando sem parar, partícula sem função,
  fundo pulsando. Isso cansa e transmite inquietação — o oposto de bem-estar.
- **Entrada ao rolar:** `<Reveal>` — 700ms, `ease [0.22, 1, 0.36, 1]`, uma vez só.
- **Transição de estado:** 200–300ms.
- **`prefers-reduced-motion`:** todas as animações e transições são anuladas em
  `globals.css`, e a cena 3D cai para um quadro estático.

---

## 6. Ícones

**Lucide** (`lucide-react`), já instalado. Traço padrão, `size={20}` em cards e
`size={14}` no eyebrow. Um ícone só entra se **acrescenta compreensão** — categoria de
serviço, meio de contato, item de FAQ. Nunca como enfeite.

---

## 7. O que foi removido e por quê

| Removido | Motivo |
|---|---|
| Tema escuro (`ThemeProvider`, botão de lua/sol) | Um tema calibrado vale mais que dois medianos. |
| `AmbientBackground`, `ParticlesBackground`, `LeavesBackground` | Três fundos animados simultâneos — dois loops de `requestAnimationFrame` e blurs de 28–45px eram o gargalo do celular. Substituídos por **uma** cena 3D. |
| `Preloader` | `setTimeout` fixo de 1,6s que não esperava carregamento nenhum. Atraso puro. |
| `ChatWidget` | Respostas fixas, e disputava o canto inferior com o WhatsApp. |
| Gradiente dourado em texto | Cortava descendentes e exigia remendos de `padding` nos títulos. |
| Seletor global `* { border-color }` | Trocado por `borderColor.DEFAULT` na config do Tailwind. |
