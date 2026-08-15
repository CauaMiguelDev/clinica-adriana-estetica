"use client";

import { useEffect, useRef, useState } from "react";
import { useAmbientMotion, prefersReducedMotion } from "@/components/ui/useAmbientMotion";

/**
 * Seda em movimento — a peça 3D de destaque do Hero.
 *
 * Uma superfície têxtil larga ondulando devagar, com a luz quente correndo
 * pelas dobras. Têxtil é o material que a pessoa associa a spa antes de
 * qualquer outro: toalha, roupão, lençol.
 *
 * O relevo vem de um fbm de 3 oitavas cujo domínio desliza com o tempo — é o
 * que dá o escoamento de tecido em vez de ondulação de água. A normal sai por
 * diferenças finitas para frente (3 amostras, não 5): é o que torna viável
 * calcular relevo por vértice sem derrubar o celular.
 *
 * IMPORTANTE: esta cena NÃO cria requestAnimationFrame próprio. Ela assina
 * `useAmbientMotion`, o relógio único da página. Ter dois laços concorrentes
 * foi o que derrubou o desempenho da versão original deste site.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;

  varying vec3 vNormalW;
  varying vec3 vWorld;
  varying float vH;
  varying vec2 vUvz;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Dobra de seda é DIRECIONAL: corre ao longo de um eixo. Ruído isotrópico
  // produz manchas — lê como mármore, não como tecido. Por isso o domínio é
  // esticado em x (0.028) e comprimido em y (0.115): as dobras nascem
  // alongadas na horizontal.
  //
  // Duas oitavas, não três: a terceira só acrescentava granulado fino, que
  // briga com o texto por cima.
  float folds(vec2 p) {
    vec2 drift = vec2(uTime * 0.012, uTime * -0.030);
    vec2 q = vec2(p.x * 0.028, p.y * 0.115) + drift;
    float v = noise(q) * 0.72;
    v += noise(q * 2.0 + 11.3) * 0.28;
    return (v - 0.5) * uAmp;
  }

  void main() {
    vec2 p = position.xy;
    float h = folds(p);

    // Diferenças finitas para frente: 3 avaliações no total, não 5.
    float e = 0.9;
    float hx = folds(p + vec2(e, 0.0));
    float hy = folds(p + vec2(0.0, e));
    vec3 n = normalize(vec3((h - hx) / e, (h - hy) / e, 1.0));

    vec3 displaced = vec3(p, h);
    vec4 world = modelMatrix * vec4(displaced, 1.0);

    vNormalW = normalize(mat3(modelMatrix) * n);
    vWorld = world.xyz;
    vH = h;
    vUvz = uv;

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uHigh;
  uniform vec3 uSheen;
  uniform vec3 uLightDir;
  uniform vec3 uCam;

  varying vec3 vNormalW;
  varying vec3 vWorld;
  varying float vH;
  varying vec2 vUvz;

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 l = normalize(uLightDir);
    vec3 v = normalize(uCam - vWorld);

    // Lambert envolvido: seda não tem sombra dura, o vale só escurece um pouco.
    float diff = clamp(dot(n, l) * 0.5 + 0.5, 0.0, 1.0);

    // Dois brilhos: um largo que dá o corpo do tecido e um estreito que corre
    // pela crista da dobra. É a leitura de cetim.
    vec3 hv = normalize(l + v);
    float ndh = max(dot(n, hv), 0.0);
    float sheenWide = pow(ndh, 8.0) * 0.35;
    float sheenTight = pow(ndh, 42.0) * 0.5;

    vec3 col = mix(uDeep, uHigh, clamp(vH * 0.85 + 0.5, 0.0, 1.0));
    col = mix(col * 0.90, col, diff);
    col += uSheen * (sheenWide + sheenTight);

    // As bordas dissolvem: a seda some no fundo em vez de terminar numa aresta.
    float sides = 1.0 - smoothstep(0.60, 1.0, abs(vUvz.x - 0.5) * 2.0);
    float ends = 1.0 - smoothstep(0.55, 1.0, abs(vUvz.y - 0.5) * 2.0);

    gl_FragColor = vec4(col, sides * ends * 0.95);
  }
`;

function srgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function SilkScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const drawRef = useRef<((t: number) => void) | null>(null);
  const [onScreen, setOnScreen] = useState(true);

  // Único ponto de animação: o relógio compartilhado da página.
  useAmbientMotion((t) => drawRef.current?.(t), onScreen);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let teardown = () => {};

    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(host);

    import("three")
      .then((THREE) => {
        if (disposed) return;

        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
          });
        } catch {
          return; // sem WebGL: fica o fundo em CSS
        }

        const coarse = window.matchMedia("(max-width: 768px)").matches;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.25 : 1.5));
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
        camera.position.set(0, 2.2, 26);
        camera.lookAt(0, 0, 0);

        const geometry = new THREE.PlaneGeometry(
          78,
          46,
          coarse ? 96 : 190,
          coarse ? 58 : 112
        );

        const material = new THREE.ShaderMaterial({
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            // Amplitude contida: dobras largas e rasas leem como seda pesada.
            // Amplitude alta vira bandeira ao vento.
            uAmp: { value: 5.2 },
            uDeep: { value: new THREE.Vector3(...srgb("#EDE2CE")) },
            uHigh: { value: new THREE.Vector3(...srgb("#FDFAF4")) },
            uSheen: { value: new THREE.Vector3(...srgb("#C9A35E")) },
            uLightDir: { value: new THREE.Vector3(-0.4, 0.7, 0.58).normalize() },
            uCam: { value: camera.position.clone() },
          },
        });

        const mesh = new THREE.Mesh(geometry, material);
        // Inclinação leve: mostra o relevo sem virar "chão".
        mesh.rotation.x = -0.42;
        mesh.position.y = -1.5;
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

        drawRef.current = (t) => {
          material.uniforms.uTime.value = t;
          renderer.render(scene, camera);
        };

        // Movimento reduzido: um quadro parado, com o tecido já formado.
        if (prefersReducedMotion()) drawRef.current(8);

        teardown = () => {
          drawRef.current = null;
          ro.disconnect();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {});

    return () => {
      disposed = true;
      io.disconnect();
      teardown();
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden />;
}
