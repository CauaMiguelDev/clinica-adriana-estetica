# Espaço Cuide-se Bem

Site de página única da clínica de estética Espaço Cuide-se Bem, em Ceilândia,
Brasília. O objetivo é levar o visitante de *conhecer os serviços* a *agendar
pelo WhatsApp* no menor caminho possível.

**Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Three.js · Lucide**

O sistema de design — paleta, tipografia, escala, estados e regras de movimento —
está documentado em [`DESIGN.md`](./DESIGN.md). Leia antes de mexer no visual.

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
| `/` | Hero com cena 3D · Faixa de confiança · Teaser de serviços · Prova social + CTA |
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
| Cena 3D do Hero (pétalas) | `src/components/ui/PetalScene.tsx` |
| Fundo animado da página inteira | `src/components/ui/AmbientShapes.tsx` |
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
