/** @type {(phase: string) => import('next').NextConfig} */
// Publicação no GitHub Pages: `npm run build` gera um site estático em `out/`.
// O site vive sob /<repo>/, então o build liga basePath para bater com o nome do
// repositório. Só o build de produção exporta — `next dev` continua sem prefixo.
export default (phase) => {
  // Constante PHASE_PRODUCTION_BUILD do Next, sem o import (que o ESM não resolve
  // sem extensão). É o `next build`.
  const isBuild = phase === "phase-production-build";
  const repo = "clinica-adriana-estetica";

  return {
    reactStrictMode: true,
    // Não há mais imagens remotas: as fotos entram em `public/images/`.
    transpilePackages: ["three"],
    ...(isBuild && {
      output: "export",
      basePath: `/${repo}`,
      images: { unoptimized: true }, // export não roda o otimizador do next/image
      trailingSlash: true, // cada rota vira /rota/index.html — servida certo pelo Pages
    }),
  };
};
