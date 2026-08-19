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
 * Degradação: 9 pétalas no desktop, 5 no celular, `dpr` limitado nos dois.
 * Com `prefers-reduced-motion` a cena desenha **um quadro só** e congela.
 */

type Petal = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
};

// Sequência fixa: nada de Math.random, que daria uma composição diferente a
// cada carregamento e tornaria impossível ajustar o enquadramento.
const PETALS: Petal[] = [
  { position: [-2.6, 1.2, -1.5], rotation: [0.5, 0.3, -0.4], scale: 1.15, color: "#7C8B6B", speed: 1.1 },
  { position: [2.3, 1.6, -2.2], rotation: [-0.3, 0.8, 0.6], scale: 0.9, color: "#C98E6F", speed: 0.8 },
  { position: [-1.4, -1.5, -0.8], rotation: [0.9, -0.4, 0.2], scale: 0.75, color: "#E4D9C8", speed: 1.35 },
  { position: [3.1, -1.1, -3.0], rotation: [0.2, 0.6, -0.9], scale: 1.3, color: "#9AA98A", speed: 0.65 },
  { position: [0.4, 2.2, -3.4], rotation: [-0.6, 0.1, 0.5], scale: 1.0, color: "#D8C3AE", speed: 0.95 },
  { position: [-3.4, -0.4, -2.6], rotation: [0.35, 0.9, 0.15], scale: 0.85, color: "#B5744F", speed: 1.2 },
  { position: [1.5, -2.1, -1.9], rotation: [-0.8, -0.2, 0.7], scale: 0.7, color: "#7C8B6B", speed: 1.45 },
  { position: [-0.6, 0.2, -4.2], rotation: [0.15, -0.7, -0.3], scale: 1.45, color: "#E9E2D5", speed: 0.5 },
  { position: [2.9, 0.5, -1.2], rotation: [0.7, 0.4, 0.9], scale: 0.6, color: "#C98E6F", speed: 1.6 },
];

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
function PetalField({ count, calm }: { count: number; calm: boolean }) {
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
      {PETALS.slice(0, count).map((p, i) => (
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

  const count = mobile ? 5 : PETALS.length;
  const dpr = useMemo<[number, number]>(() => [1, mobile ? 1.2 : 1.75], [mobile]);

  return (
    <div ref={host} className={className} aria-hidden>
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
        <PetalField count={count} calm={calm} />
      </Canvas>
    </div>
  );
}
