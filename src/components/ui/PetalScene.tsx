"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";
import { useAmbientMotion, prefersReducedMotion } from "@/components/ui/useAmbientMotion";

/**
 * A cena do Hero: pétalas de vidro suspensas, girando devagar e reagindo ao
 * cursor.
 *
 * ## Por que ela não tem o próprio requestAnimationFrame
 *
 * O react-three-fiber roda um laço próprio por padrão, o que quebraria a regra
 * nº 1 do DESIGN.md (um relógio só para a página inteira). Por isso o Canvas
 * fica em `frameloop="demand"`: ele só desenha quando alguém chama
 * `invalidate()`. Quem chama é o relógio compartilhado, em `<Clock/>`.
 *
 * O ganho não é teórico. Quando o Hero sai da tela ou a aba perde o foco, o
 * relógio para de bater, ninguém invalida, e a GPU fica ociosa — em vez de
 * renderizar 60 quadros por segundo de uma cena que ninguém está vendo.
 *
 * ## Orçamento
 *
 * Materiais opacos com brilho especular, não `transmission` — refração de
 * verdade obriga a renderizar a cena duas vezes e é justamente o que derruba
 * os quadros no celular. Sem `Environment` do drei, que baixaria um HDR de um
 * CDN e viraria dependência de rede no LCP. As luzes são três, fixas.
 *
 * Degradação: 9 pétalas no desktop, 5 no celular, `dpr` limitado nos dois. Não
 * é só quantidade — são arranjos diferentes, ver "A regra da clareira".
 * Com `prefers-reduced-motion` a cena desenha **um quadro só** e congela.
 */

type Petal = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
};

/**
 * ## A regra da clareira
 *
 * O texto do Hero ocupa o meio da tela. Pétala atrás de título não é
 * profundidade, é ruído — mesmo com o véu de contraste por cima.
 *
 * A primeira tentativa foi afastar as pétalas do centro na mão. Não fecha no
 * celular: ali o bloco de texto vai de ~160px a ~665px de uma seção de ~793px,
 * sobrando 0.8 unidade de cena em cima e 0.7 embaixo. Não cabe pétala nenhuma,
 * e `Float` ainda desloca ±0.25 por cima disso. Empurrar mais o `y` não
 * resolve, só joga a cena inteira para fora do enquadramento.
 *
 * Então a clareira é uma **máscara no canvas**, não uma coordenada: um
 * gradiente radial some com o miolo da cena e deixa as bordas. Vale para
 * qualquer tela, e sobrevive ao texto refluindo — o que arranjo calibrado à
 * mão nunca faz. As posições abaixo cuidam só do enquadramento.
 *
 * ## Por que dois arranjos
 *
 * A área visível da cena depende do formato da tela, não só da distância.
 * Com `fov 38` e a câmera em z=6, a meia-altura em z=0 é `6·tan(19°) ≈ 2.07`,
 * e a meia-largura é isso vezes a proporção da tela. Num desktop 16:9 dá
 * ~3.7 de cada lado; num celular 390×844 dá **~0.95**.
 *
 * Ou seja: reaproveitar o arranjo largo no celular jogaria a maioria das
 * pétalas para fora do enquadramento. O arranjo alto é estreito em x e
 * espalhado em y, ocupando o topo e o rodapé em vez das laterais.
 *
 * Sequências fixas, nada de Math.random: com posição aleatória a composição
 * mudaria a cada carregamento e não haveria o que calibrar.
 */

/** Desktop e tablet: clareira central, pétalas nas laterais. */
const PETALS_WIDE: Petal[] = [
  { position: [-2.9, 1.3, -1.5], rotation: [0.5, 0.3, -0.4], scale: 1.15, color: "#7C8B6B", speed: 1.1 },
  { position: [2.7, 1.7, -2.2], rotation: [-0.3, 0.8, 0.6], scale: 0.9, color: "#C98E6F", speed: 0.8 },
  { position: [-3.3, -1.4, -2.0], rotation: [0.9, -0.4, 0.2], scale: 0.95, color: "#E4D9C8", speed: 1.35 },
  { position: [3.4, -1.3, -3.0], rotation: [0.2, 0.6, -0.9], scale: 1.3, color: "#9AA98A", speed: 0.65 },
  { position: [-2.4, 2.6, -3.4], rotation: [-0.6, 0.1, 0.5], scale: 1.0, color: "#D8C3AE", speed: 0.95 },
  { position: [-3.8, 0.1, -2.6], rotation: [0.35, 0.9, 0.15], scale: 0.85, color: "#B5744F", speed: 1.2 },
  { position: [2.2, -2.4, -1.9], rotation: [-0.8, -0.2, 0.7], scale: 0.7, color: "#7C8B6B", speed: 1.45 },
  { position: [3.9, 2.4, -4.2], rotation: [0.15, -0.7, -0.3], scale: 1.45, color: "#E9E2D5", speed: 0.5 },
  { position: [3.1, 0.6, -1.2], rotation: [0.7, 0.4, 0.9], scale: 0.6, color: "#C98E6F", speed: 1.6 },
];

/**
 * Celular: estreito em x, no topo e no rodapé — mas *dentro* do quadro. Em
 * z=-2.5 a meia-altura visível é ~2.9 e a meia-largura ~1.4; passar disso é
 * pagar por pétala que ninguém vê. Quem encostar no texto a máscara apaga.
 */
const PETALS_TALL: Petal[] = [
  { position: [-0.9, 2.2, -2.2], rotation: [0.5, 0.3, -0.4], scale: 0.8, color: "#7C8B6B", speed: 1.1 },
  { position: [0.95, 2.7, -3.0], rotation: [-0.3, 0.8, 0.6], scale: 0.95, color: "#C98E6F", speed: 0.8 },
  { position: [0.8, -2.3, -2.4], rotation: [0.9, -0.4, 0.2], scale: 0.75, color: "#E4D9C8", speed: 1.35 },
  { position: [-1.0, -2.8, -3.2], rotation: [0.2, 0.6, -0.9], scale: 1.0, color: "#9AA98A", speed: 0.65 },
  { position: [0.1, 3.3, -4.0], rotation: [-0.6, 0.1, 0.5], scale: 0.7, color: "#D8C3AE", speed: 0.95 },
];

/**
 * A clareira. O miolo transparente é maior e mais alto no celular porque lá o
 * texto ocupa quase a altura toda; no desktop ele é estreito, para não comer as
 * pétalas laterais. Autoprefixer cuida do `-webkit-mask-image` do Safari.
 */
const CLEARING =
  "[mask-image:radial-gradient(ellipse_92%_58%_at_50%_50%,transparent_38%,#000_100%)] " +
  "md:[mask-image:radial-gradient(ellipse_48%_62%_at_50%_50%,transparent_44%,#000_100%)]";

/**
 * Ponte entre o relógio compartilhado e o r3f.
 *
 * `useAmbientMotion` bate; `invalidate()` pede um quadro. Sem isto, com
 * `frameloop="demand"`, a cena desenharia uma vez e congelaria.
 */
function Clock({ active }: { active: boolean }) {
  useAmbientMotion(() => invalidate(), active);
  return null;
}

/** Segue o cursor de longe. O `lerp` evita que a cena grude no ponteiro. */
function PetalField({ petals, calm }: { petals: Petal[]; calm: boolean }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    const g = group.current;
    if (!g || calm) return;
    // Amplitude pequena de propósito: é profundidade, não um brinquedo.
    g.rotation.y += (pointer.x * 0.18 - g.rotation.y) * 0.04;
    g.rotation.x += (-pointer.y * 0.12 - g.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      {petals.map((p, i) => (
        <Float
          key={i}
          enabled={!calm}
          speed={p.speed}
          rotationIntensity={0.6}
          floatIntensity={0.9}
          floatingRange={[-0.25, 0.25]}
        >
          {/* A escala achatada é LOCAL à malha, não de um grupo pai: escala
              não-uniforme acima da rotação cisalha a pétala enquanto ela gira,
              e o que era um objeto rígido vira uma bolha pulsando. */}
          <mesh
            position={p.position}
            rotation={p.rotation}
            scale={[p.scale, p.scale * 0.14, p.scale * 0.62]}
          >
            {/* Esfera achatada: uma lente lisa, que lida bem com a luz
                rasante e some em silhueta quando vista de perfil. */}
            <sphereGeometry args={[1, 32, 20]} />
            <meshPhysicalMaterial
              color={p.color}
              transparent
              opacity={0.62}
              roughness={0.22}
              metalness={0.05}
              clearcoat={0.9}
              clearcoatRoughness={0.25}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function PetalScene({ className = "" }: { className?: string }) {
  const [mobile, setMobile] = useState(false);
  const [calm, setCalm] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    setCalm(prefersReducedMotion());

    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const petals = mobile ? PETALS_TALL : PETALS_WIDE;
  const dpr = useMemo<[number, number]>(() => [1, mobile ? 1.2 : 1.75], [mobile]);

  return (
    <div ref={host} className={`${className} ${CLEARING}`} aria-hidden>
      <Canvas
        frameloop="demand"
        dpr={dpr}
        camera={{ position: [0, 0, 6], fov: 38 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Clock active={onScreen && !calm} />
        <ambientLight intensity={1.15} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        {/* Contraluz terracota: dá a borda quente que separa pétala do fundo. */}
        <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#C97B5A" />
        <PetalField petals={petals} calm={calm} />
      </Canvas>
    </div>
  );
}
