// Publica a pasta out/ (build estático) na branch gh-pages, via push forçado.
// gh-pages é só artefato de build — este script a reescreve inteira a cada vez.
import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

if (!existsSync("out/index.html")) {
  console.error("out/ não encontrado — rode `npm run build` antes.");
  process.exit(1);
}

const remote = execSync("git config --get remote.origin.url").toString().trim();
const inOut = { cwd: "out", stdio: "inherit" };

// Um repositório git isolado dentro de out/, empurrado como gh-pages inteiro.
rmSync("out/.git", { recursive: true, force: true });
execSync("git init -q -b gh-pages", inOut);
execSync("git add -A", inOut);
execSync(
  'git -c user.name=deploy -c user.email=deploy@local commit -qm "deploy"',
  inOut
);
execSync(`git push -qf "${remote}" gh-pages`, inOut);
rmSync("out/.git", { recursive: true, force: true });

console.log("\nPublicado em gh-pages.");
