"use client";

import { useEffect, useRef } from "react";

/**
 * Superfície d'água — fundo do Hero.
 *
 * Um único plano com deslocamento por soma de senos no vertex shader, visto
 * em ângulo raso por uma câmera em perspectiva, com luz quente e um reflexo
 * dourado discreto nas cristas. As bordas dissolvem para transparente, então
 * a cena se funde ao fundo da página em vez de parecer um retângulo colado.
 *
 * Cuidados de desempenho:
 *  - `three` entra por import dinâmico (fica fora do bundle inicial);
 *  - metade dos segmentos e resolução menor no celular;
 *  - o loop para quando o Hero sai da tela ou a aba fica oculta;
 *  - `prefers-reduced-motion` desenha um único quadro parado.
 */

const VERT = /* glsl */ `
  uniform float uTime;

  varying vec3 vNormalW;
  varying vec3 vWorld;
  varying float vHeight;
  varying vec2 vUvz;

  void main() {
    vec2 p = position.xy;

    // Quatro ondas largas e lentas, em direções que não se repetem.
    vec2 d0 = normalize(vec2( 1.00,  0.30));
    vec2 d1 = normalize(vec2(-0.60,  1.00));
    vec2 d2 = normalize(vec2( 0.35, -1.00));
    vec2 d3 = normalize(vec2( 1.00, -0.15));

    // frequência (largura), velocidade e amplitude de cada onda
    const float f0 = 0.16, f1 = 0.24, f2 = 0.38, f3 = 0.62;
    const float s0 = 0.34, s1 = 0.27, s2 = 0.45, s3 = 0.20;
    // Amplitudes baixas de propósito: a inclinação máxima da superfície fica
    // em ~13°, o suficiente para o reflexo correr sem a água ficar agitada.
    const float a0 = 0.42, a1 = 0.28, a2 = 0.14, a3 = 0.07;

    float ph0 = dot(p, d0) * f0 + uTime * s0;
    float ph1 = dot(p, d1) * f1 + uTime * s1;
    float ph2 = dot(p, d2) * f2 + uTime * s2;
    float ph3 = dot(p, d3) * f3 + uTime * s3;

    float h = a0 * sin(ph0) + a1 * sin(ph1) + a2 * sin(ph2) + a3 * sin(ph3);

    // Normal analítica: gradiente da mesma soma de senos.
    // Mais barato e mais estável que recalcular a partir da malha.
    vec2 g = a0 * f0 * cos(ph0) * d0
           + a1 * f1 * cos(ph1) * d1
           + a2 * f2 * cos(ph2) * d2
           + a3 * f3 * cos(ph3) * d3;

    vec3 displaced = vec3(p, h);
    vec4 world = modelMatrix * vec4(displaced, 1.0);

    vNormalW = normalize(mat3(modelMatrix) * normalize(vec3(-g.x, -g.y, 1.0)));
    vWorld = world.xyz;
    vHeight = h;
    vUvz = uv;

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uValley;   // cor do vale da onda
  uniform vec3 uCrest;    // cor da crista
  uniform vec3 uGlint;    // reflexo (dourado, discreto)
  uniform vec3 uLightDir;
  uniform vec3 uCam;

  varying vec3 vNormalW;
  varying vec3 vWorld;
  varying float vHeight;
  varying vec2 vUvz;

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 l = normalize(uLightDir);
    vec3 v = normalize(uCam - vWorld);

    // Lambert "envolvido": sem sombra dura, tudo permanece claro e macio.
    float diff = clamp(dot(n, l) * 0.5 + 0.5, 0.0, 1.0);

    vec3 hv = normalize(l + v);
    float spec = pow(max(dot(n, hv), 0.0), 56.0);

    vec3 col = mix(uValley, uCrest, clamp(vHeight * 0.85 + 0.5, 0.0, 1.0));
    col = mix(col * 0.93, col, diff);
    col += uGlint * spec * 0.5;

    // Dissolve conforme se afasta e nas laterais: a água some no fundo da
    // página em vez de terminar numa aresta.
    float sides = 1.0 - smoothstep(0.62, 1.0, abs(vUvz.x - 0.5) * 2.0);
    float far = 1.0 - smoothstep(0.15, 0.85, vUvz.y);
    float near = smoothstep(0.0, 0.04, vUvz.y);

    gl_FragColor = vec4(col, sides * far * near * 0.85);
  }
`;

/** Converte "#RRGGBB" para o triplet 0–1 esperado pelo shader. */
function srgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function WaterScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let teardown = () => {};

    import("three")
      .then((THREE) => {
        if (disposed) return;

        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false, // as bordas já são suaves; poupa fill rate
            powerPreference: "low-power",
          });
        } catch {
          return; // sem WebGL: o Hero simplesmente fica com o fundo em CSS
        }

        const coarse = window.matchMedia("(max-width: 768px)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.25 : 1.5));
        // O shader escreve a cor final direto: nenhuma conversão deve ocorrer.
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
        camera.position.set(0, 3.6, 8);
        camera.lookAt(0, -0.4, -6);

        // Largo e fundo o bastante para preencher o campo de visão até onde as
        // bordas já dissolveram — nenhuma aresta do plano entra em quadro.
        const geometry = new THREE.PlaneGeometry(
          140,
          60,
          coarse ? 80 : 160,
          coarse ? 46 : 90
        );

        const material = new THREE.ShaderMaterial({
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uValley: { value: new THREE.Vector3(...srgb("#EDE2D2")) },
            uCrest: { value: new THREE.Vector3(...srgb("#FDFAF5")) },
            uGlint: { value: new THREE.Vector3(...srgb("#C9A35E")) },
            uLightDir: { value: new THREE.Vector3(-0.35, 0.85, 0.4).normalize() },
            uCam: { value: camera.position.clone() },
          },
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2; // deita o plano: local +Y vira "longe"
        mesh.position.set(0, -0.4, -24); // borda próxima em z=+6, à frente da câmera
        scene.add(mesh);

        const resize = () => {
          const w = host.clientWidth || 1;
          const h = host.clientHeight || 1;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
          renderer.render(scene, camera);
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(host);

        // --- laço de animação, só enquanto visível ---
        let raf = 0;
        let elapsed = 0;
        let last = 0;
        let onScreen = true;

        const frame = (now: number) => {
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          elapsed += dt;
          material.uniforms.uTime.value = elapsed;
          renderer.render(scene, camera);
          raf = requestAnimationFrame(frame);
        };
        const start = () => {
          if (raf || reduce) return;
          last = performance.now();
          raf = requestAnimationFrame(frame);
        };
        const stop = () => {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        };

        const io = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            onScreen && !document.hidden ? start() : stop();
          },
          { threshold: 0 }
        );
        io.observe(host);

        const onVisibility = () => {
          document.hidden || !onScreen ? stop() : start();
        };
        document.addEventListener("visibilitychange", onVisibility);

        start(); // com movimento reduzido, o resize() acima já deixou o quadro parado

        teardown = () => {
          stop();
          io.disconnect();
          ro.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* sem three: o Hero permanece com o fundo em CSS */
      });

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden />;
}
