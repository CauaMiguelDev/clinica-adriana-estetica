# Espaço Cuide-se Bem — instruções para o Claude

## Publicar sempre

Toda mudança que altere o site (conteúdo, visual, comportamento) termina com o
site publicado:

1. `npx tsc --noEmit` e `npm run lint` limpos.
2. `npm run deploy` — faz o build estático e o push forçado de `out/` para a
   branch `gh-pages`, que o GitHub Pages serve.
3. Conferir que o link do README continua certo:
   https://cauamigueldev.github.io/clinica-adriana-estetica/

Não rode o `deploy` com o `npm run dev` ligado (os dois escrevem em `.next`).

## Antes de mexer no visual

Leia `DESIGN.md`. As regras de desempenho de movimento (um único rAF, só
`transform`/`opacity` no que é perpétuo, versão calma com movimento reduzido)
são requisito, não sugestão.

## Imagens

O site vive sob `/clinica-adriana-estetica/` no GitHub Pages, e o `next/image`
do export estático **não** acrescenta esse prefixo a uma string em `public/`:
a foto funciona no `npm run dev` e quebra só no ar. Prefira `import` do
arquivo (o bundler resolve o caminho certo).
