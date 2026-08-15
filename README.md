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

## Seções

Hero (com cena 3D) · Faixa de confiança · **Serviços** · **Catálogo de
procedimentos** (filtro por categoria) · **Agendamento** · Resultados (antes &
depois) · A Clínica · Equipe · Depoimentos · Investimento · Dúvidas · Blog ·
Instagram · Contato + mapa · Rodapé. Mais o WhatsApp flutuante e o "voltar ao
topo".

A ordem segue a prioridade do visitante: serviços → agendar → resultados →
confiança → contato.

## Onde mexer

| O quê | Onde |
|---|---|
| Todo o conteúdo (clínica, equipe, procedimentos, FAQ, blog, pagamento) | `src/lib/data.ts` |
| Cores, fontes, raios, sombras | `src/app/globals.css` (tokens) e `tailwind.config.ts` |
| Cena 3D do Hero | `src/components/ui/WaterScene.tsx` |
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
| Imagem de compartilhamento (OG image) | `src/app/layout.tsx` | Link mandado no WhatsApp aparece sem prévia |
| Atualizar o Next.js | `package.json` | A 14.2.15 tem vulnerabilidade crítica conhecida |

O agendamento **não precisa de backend**: o formulário monta a mensagem e abre a
conversa no WhatsApp para a pessoa revisar antes de enviar. Nada é armazenado
nem enviado por este site.
