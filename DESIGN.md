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
| **Hover** (botão) | `ActionButton`: uma elipse da cor escura **sobe por baixo** (preenchimento líquido) e o rótulo **rola** — sai por cima, a cópia entra por baixo. 600ms, expo-out, só `transform`. `shadow-soft` → `shadow-lift`. Sem escala. |
| **Hover** (card) | `-translate-y-1`/`-1.5` + `shadow-lift` + borda `olive/30`; foto do card aproxima 6–7% em 1200ms. |
| **Hover** (link) | `.link-line`: o sublinhado **se desenha** da esquerda e sai pela direita. Dentro de um `.group`, desenha com o hover do card inteiro. |
| **Hover** (menu) | Uma única pílula (`layoutId`) desliza até o link sob o cursor e volta à página atual ao sair. |
| **Hover no toque** | Não existe: `hoverOnlyWhenSupported` na config do Tailwind. Sem isso, o toque deixava o botão preso no estado de hover. |
| **Foco** | Contorno oliva de 2px com 3px de afastamento. Definido **uma vez** em `globals.css` via `:focus-visible` — vale para todo link, botão, campo e elemento focável do site. |
| **Ativo** | `active:scale-[0.98]`, curto. |
| **Desabilitado** | `opacity-50 cursor-not-allowed`. |

---

## 5. Movimento

A direção é **site vivo**: movimento presente ao longo de toda a página. Mas vivo
não é agitado — tudo aqui é lento, orgânico e de amplitude baixa. A régua é a
elegância de spa: nada pisca, salta ou chama atenção para si.

Os valores vivem em **`src/lib/motion.ts`**. Importe de lá; não digite números
soltos no componente, ou o conjunto fica desigual.

### Durações e curvas

| Papel | Duração | Curva |
|---|---|---|
| Micro (foco, clique) | 200ms | `[0.4, 0, 0.2, 1]` |
| Hover (botão, link, card) | 500–600ms | `[0.22, 1, 0.36, 1]` — é também o **padrão** do `transition` no Tailwind |
| Troca de estado (acordeão, filtro) | 320ms | `[0.4, 0, 0.2, 1]` |
| Entrada ao rolar | 700ms | `[0.22, 1, 0.36, 1]` |
| Volta do tilt ao repouso | 400ms | spring (150 / 18) |
| Ambiente (perpétuo) | 15–25s por ciclo | senoidal |

A curva de entrada é uma expo-out: sai rápido e assenta devagar. É ela que faz o
movimento parecer orgânico em vez de mecânico.

### Vocabulário

| Recurso | Regra |
|---|---|
| **Entrada ao rolar** | `<Reveal>` com variantes `fade / up / down / left / right / rise`. Uma vez só, nunca ao voltar. |
| **Cascata** | `<RevealGroup>` ou `index` — 60ms entre irmãos, **teto de 8**. Além disso o último item demora demais. |
| **Deslocamento** | 24px no padrão, 14px em itens de cascata. |
| **Parallax** | 3 camadas: fundo `0.15`, meio `0.08`, frente `0.04` da rolagem. Valores baixos de propósito. |
| **Tilt 3D** | Máximo **6°**, perspectiva 900px. Só com ponteiro fino — em tela de toque o card tremeria sob o dedo. |
| **Clique** | Onda a partir do ponto tocado (`ActionButton`) + `active:scale-[0.98]`. No celular não há hover; sem isso o botão parece quebrado. |
| **Rolagem suave** | Lenis (`SmoothScroll.tsx`), 1,1s expo-out, **sem rAF próprio**: é alimentado pelo relógio compartilhado. Só roda da roda do mouse — o toque fica nativo — e nem é criado com movimento reduzido. |
| **Aurora** | `<Aurora>` — o fundo próprio: três campos de cor da paleta (`radial-gradient(closest-side)`, **sem `blur`**) em órbita lenta de Lissajous. Tom claro no Hero, escuro no rodapé. Desassina o relógio fora da tela. |
| **Título do Hero** | Palavra a palavra, cada uma subindo de dentro de uma máscara; depois o traço dourado sob *cuidar* se desenha (`pathLength`). |
| **Colagem do Hero** | Fotos em arco entram por cortina (`clip-path`) com a foto recuando de 1.18 para 1; ao rolar, ficam para trás em três ritmos (parallax **para baixo**, nunca para cima — no celular subiria sobre o texto). |
| **Faixa de serviços** | Marquee em CSS (`animate-marquee`, 40s), lista duplicada e -50% para fechar sem emenda. Pausa no hover. |
| **Ambiente** | `<Contours>` — agrupamentos de linhas de nível girando devagar (25s e 19s por volta), 2 no desktop e 1 no celular, com grão estático por cima. |
| **Ímã** | Botões deslizam no máximo **6px** na direção do cursor (`MAGNET.maxPx`). Só ponteiro fino. Acima de ~8px vira piada. |
| **Traçado de ícone** | `<DrawIcon>` — `stroke-dashoffset` de 1→0 via variável CSS. `stroke-dasharray: 100` cobre o traço mais longo de um ícone 24×24 sem medir path por path. |
| **Textura** | `<Contours>` — 8 anéis concêntricos com raio perturbado por dois senos, em SVG calculado uma vez na carga do módulo. É o fundo das páginas e, em escala maior, o visual do Hero. Toda `<section>` fora o Hero tem fundo sólido (`bg-bg` ou `bg-sand`): a textura aparece no Hero e nos respiros entre blocos, nunca atrás de conteúdo. |
| **Scrubbed** | Progresso da rolagem vira posição, não tempo. Seção alta + filho `sticky` + `useScroll`. Deslocamento sempre em **%** do trilho, nunca em px. |

### Regras invioláveis de desempenho

A versão original deste site tinha partículas, folhas caindo, tilt e feixes de
luz — e **era o gargalo do celular**: dois `requestAnimationFrame` concorrentes
mais blurs de 28–45px. As features voltaram; a arquitetura que as derrubava, não.

1. **Um único rAF** para todo movimento perpétuo: `useAmbientMotion`. Nunca um
   por componente. Springs do Framer (hover, tilt) são exceção — duram o gesto e
   param sozinhas.

   > **Cumprido.** Verificação, a repetir a cada fase:
   > `grep -rn "requestAnimationFrame(" src/` **só pode apontar para
   > `useAmbientMotion.ts`**.
   >
   > Houve aqui uma exceção documentada para o react-three-fiber, que roda laço
   > próprio: o `<Canvas>` ficava em `frameloop="demand"` com ponte para o
   > relógio. Ela caiu junto com o 3D. Se WebGL voltar algum dia, volte também
   > essa ponte — r3f no padrão abre um segundo rAF sem avisar.
2. **Só `transform` e `opacity`** no que é perpétuo ou roda no celular. Nunca
   anime `width`, `top`, `filter`, `box-shadow` ou `background-position` num
   laço.

   > **Exceção única e deliberada:** o `WhatsappFloat` expande o rótulo no
   > hover animando `max-width`, `gap` e `padding-right` — as três disparam
   > layout. Fica assim porque hover **não existe no celular**, que é onde a
   > regra importa: dura 500ms, uma vez, numa subárvore de dois nós. Fazer o
   > mesmo só com `transform` exigiria remontar o layout do botão — mais
   > código que o problema merece. Se aparecer uma segunda exceção, a regra
   > está sendo contornada em vez de aplicada; reveja as duas juntas.
3. **`blur` é estático.** Ele custa fill rate; fica no CSS e nunca no quadro.
4. **Tudo pausa** fora da tela (`IntersectionObserver`) e com a aba oculta
   (`visibilitychange`).
5. **Celular primeiro:** contagens reduzidas por `matchMedia`, conferido em
   390px antes do desktop.

### Movimento reduzido

`prefers-reduced-motion` **não é uma versão quebrada, é uma versão calma**.
Parallax e ambiente causam desconforto vestibular real em parte das pessoas —
aqui isso é requisito funcional, não detalhe de acessibilidade.

- O relógio de ambiente desenha **um quadro parado** e não entra no laço.
- As linhas de nível desenham um quadro parado e não giram.
- As transições **de CSS** são anuladas em `globals.css`.
- As animações **do Framer** são anuladas pelo `<Motion>` na raiz
  (`src/components/ui/Motion.tsx`), que aplica `MotionConfig
  reducedMotion="user"`. Um ponto só cobre `Reveal`, `RevealGroup`, `Hero`,
  `TiltCard` e `ActionButton`.

  > **Armadilha:** o Framer **não** respeita a preferência sozinho — é opt-in.
  > E como ele anima por rAF em estilo inline, o bloco de `globals.css` não o
  > alcança: aquele bloco só vale para CSS. Antes desta correção, movimento
  > reduzido ligado ainda deslizava 24px em toda entrada ao rolar.
- As seções **scrubbed** trocam de forma, não de velocidade: `ProcedureRail` e
  `ValuesStory` abandonam a altura falsa e o `sticky` e viram grade e lista
  verticais comuns. Prender 3 ou 4 telas de rolagem de quem pediu menos
  movimento seria hostil; "a mesma coisa mais devagar" não resolve.
- O traçado do `<DrawIcon>` é **variável CSS**, que o `MotionConfig` não anula
  (ele cobre transform e escala). Por isso `globals.css` fixa `--draw: 0` no
  bloco de movimento reduzido — mesma classe de armadilha do Framer, um andar
  abaixo.
- O conteúdo aparece **inteiro e legível** — nada fica preso em opacidade 0.

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
| `AmbientBackground`, `ParticlesBackground`, `LeavesBackground` | Três fundos animados simultâneos — dois loops de `requestAnimationFrame` e blurs de 28–45px eram o gargalo do celular. |
| `PetalScene` + `three`, `@react-three/fiber`, `@react-three/drei` | A cena 3D nunca assentou: no celular disputava o texto do Hero, e o custo era desproporcional ao que entregava. Trocada por `<Contours>`, em SVG. **−66 pacotes** e o WebGL inteiro fora do projeto. |
| `AmbientShapes` (blobs desfocados) | `blur(60px)` sobre 10% de opacidade não vira atmosfera, vira sujeira — e em monitor mais claro sumia. Trocado por linha fina, que tem forma e aparece igual nos dois. A cor voltou depois como `<Aurora>`, **sem filtro nenhum** e com opacidade que se vê — as duas coisas que derrubavam esta. |
| `Preloader` | `setTimeout` fixo de 1,6s que não esperava carregamento nenhum. Atraso puro. |
| `ChatWidget` | Respostas fixas, e disputava o canto inferior com o WhatsApp. |
| Gradiente dourado em texto | Cortava descendentes e exigia remendos de `padding` nos títulos. |
| Seletor global `* { border-color }` | Trocado por `borderColor.DEFAULT` na config do Tailwind. |
