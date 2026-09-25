# Espaço Cuide-se Bem

Site de página única da clínica de estética Espaço Cuide-se Bem, em Ceilândia,
Brasília. O objetivo é levar o visitante de *conhecer os serviços* a *agendar
pelo WhatsApp* no menor caminho possível.

### 🔗 Site no ar: **[cauamigueldev.github.io/clinica-adriana-estetica](https://cauamigueldev.github.io/clinica-adriana-estetica/)**

> O site publicado é atualizado a cada mudança (`npm run deploy`, ver
> [Publicação](#publicação-github-pages)).

**Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Three.js · Lucide**

## Características

- **Página única expandida em rotas** — home curta (quatro dobras) + páginas de aprofundamento; o shell (navbar, rodapé, fundo animado, WhatsApp flutuante) persiste entre navegações.
- **Agendamento sem backend** — o formulário monta a mensagem e abre a conversa no WhatsApp; nada é armazenado nem enviado por este site.
- **Fundo com linhas de nível animadas** em canvas, ligado ao scroll, com a clareira do Hero recortada como máscara.
- **SEO e prévia de link prontos** — metadados, JSON-LD de negócio local e imagem de Open Graph (`opengraph-image.png`) montada com a marca.
- **Publicação estática** — exportado com `output: export` e servido de graça no GitHub Pages.
- **Sem dependência de fotos** — todos os espaços de imagem já existem e degradam para monograma/placeholder enquanto as fotos reais não chegam.

O sistema de design — paleta, tipografia, escala, estados e regras de movimento —
está documentado em [`DESIGN.md`](./DESIGN.md). Leia antes de mexer no visual.

## Publicação (GitHub Pages)

O site é estático e mora na branch `gh-pages` do repositório, servida pelo
GitHub Pages.

- **URL:** https://cauamigueldev.github.io/clinica-adriana-estetica/
- Como o site vive sob `/<repo>/`, o build de produção liga `basePath`,
  `images.unoptimized` e `trailingSlash` — só no `next build` (via *phase* em
  [`next.config.mjs`](./next.config.mjs)), então `npm run dev` local segue sem
  prefixo.

**Republicar** (depois de mudar conteúdo ou visual):

```bash
npm run deploy
```

> `npm run deploy` faz o build e um push forçado da pasta `out/` para `gh-pages`
> — essa branch é só artefato de build, não edite nela à mão.

Para um domínio próprio depois, aponte o CNAME, ajuste `basePath` (ou remova, se
o domínio servir na raiz) e a origem em `metadataBase`
([`src/app/layout.tsx`](./src/app/layout.tsx)). Quer publicação automática a cada
push? Dá para trocar por um workflow do GitHub Actions.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # servir a build
```

> Não rode `npm run build` com o `npm run dev` ligado: os dois escrevem em
> `.next` e o build derruba os artefatos do dev (a página passa a carregar sem
> CSS nem JS). Se acontecer, pare tudo, apague `.next` e suba o dev de novo.

## Rotas

| Rota | O que tem |
|---|---|
| `/` | Hero com linhas de nível · Faixa de confiança · Teaser de serviços · Prova social + CTA |
| `/servicos` | Serviços · Trilho horizontal de destaques · Catálogo com filtro · Dúvidas |
| `/precos` | Investimento |
| `/resultados` | Antes & depois · Depoimentos · Instagram |
| `/sobre` | A Clínica · Valores (painel fixo) · Equipe |
| `/contato` | Agendamento · Contato + mapa |
| `/blog` | Dicas de cuidado. **Fora do menu** — chega-se pelo rodapé. |

O shell (navbar, rodapé, fundo animado, WhatsApp flutuante, voltar ao topo)
vive em `src/app/layout.tsx` e **persiste entre as rotas** — por isso o fundo
não reinicia ao navegar. A transição de entrada de cada página está em
`src/app/template.tsx`, que é a única parte que remonta a cada navegação.

A home é curta de propósito: quatro dobras, uma pergunta respondida por dobra.
Tudo que aprofunda mora nas rotas.

## Onde mexer

| O quê | Onde |
|---|---|
| Todo o conteúdo (clínica, equipe, procedimentos, FAQ, blog, pagamento) | `src/lib/data.ts` |
| Cores, fontes, raios, sombras | `src/app/globals.css` (tokens) e `tailwind.config.ts` |
| Textura do Hero e fundo de todas as páginas | `src/components/ui/Contours.tsx` |
| Itens e agrupamento do menu | `PRIMARY` / `SECONDARY` em `src/components/layout/Navbar.tsx` |
| Composição das rotas | `src/app/<rota>/page.tsx` |
| Durações e curvas de animação | `src/lib/motion.ts` |
| Número do WhatsApp | `CLINIC.whatsapp` em `src/lib/data.ts` |

## Fotos

**O site não tem nenhuma foto no momento** — as de banco de imagens foram
removidas para não apresentar pessoas e resultados que não são da clínica. Todos
os lugares já estão preparados: coloque o arquivo em `public/images/` e preencha
o campo correspondente em `src/lib/data.ts`, que o espaço reservado dá lugar à
foto sozinho.

| Onde aparece | Campo |
|---|---|
| Retratos da equipe | `TEAM[].image` |
| Fotos do espaço | `CLINIC_PHOTOS[].src` |
| Antes & depois (liga o comparador) | `RESULTS[].before` e `.after` |
| Publicações do Instagram | `INSTAGRAM_POSTS[].image` |

## Pendências

Nada aqui exige backend — são dados que só a clínica tem.

| O quê | Onde | Por quê |
|---|---|---|
| Place ID do Google | `CLINIC.googlePlaceId` | Sem ele, "Avaliar no Google" abre uma busca em vez do formulário de avaliação |
| CNPJ real e Política de Privacidade | `src/components/layout/Footer.tsx` | Está com CNPJ zerado e link que não leva a lugar nenhum; o formulário coleta nome e telefone (LGPD) |
| Registro profissional de cada especialista | `TEAM[].credential` | Hoje diz "certificada"; um número de registro é verificável |
| As fotos | ver a tabela acima | O site não tem nenhuma; é a maior lacuna visual restante |

O agendamento **não precisa de backend**: o formulário monta a mensagem e abre a
conversa no WhatsApp para a pessoa revisar antes de enviar. Nada é armazenado
nem enviado por este site.
