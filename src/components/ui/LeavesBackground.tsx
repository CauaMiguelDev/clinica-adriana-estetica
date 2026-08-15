"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  size: number;
  vy: number;
  swaySpeed: number;
  swayWidth: number;
  swayTime: number;
  angle: number;
  spin: number;
  opacity: number;
}

export function LeavesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Número moderado de folhas para manter elegante e leve
    const count = Math.min(22, Math.floor(window.innerWidth / 60));
    const leaves: Leaf[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h - h, // começa fora da tela para cair gradualmente
      size: Math.random() * 8 + 6, // tamanho da folha (6px a 14px)
      vy: Math.random() * 0.6 + 0.3, // velocidade vertical (queda lenta)
      swaySpeed: Math.random() * 0.015 + 0.005, // velocidade do balanço lateral
      swayWidth: Math.random() * 1.2 + 0.6, // amplitude do balanço lateral
      swayTime: Math.random() * 100, // ponto de partida do balanço senoidal
      angle: Math.random() * Math.PI * 2, // rotação inicial
      spin: (Math.random() - 0.5) * 0.01, // velocidade de rotação
      opacity: Math.random() * 0.22 + 0.1, // opacidade sutil (10% a 32%)
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of leaves) {
        // Atualiza física da folha
        p.y += p.vy;
        p.x += Math.sin(p.swayTime) * p.swayWidth;
        p.swayTime += p.swaySpeed;
        p.angle += p.spin;

        // Se passar da parte inferior, reinicia no topo
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
          p.swayTime = Math.random() * 100;
        }

        // Se sair das laterais, reentra do outro lado
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        // Desenha a folha no canvas
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        // Efeito 3D de rotação / folha virando
        const scaleX = Math.cos(p.swayTime * 1.5);
        ctx.scale(scaleX, 1);

        ctx.beginPath();
        // Desenha um formato de folha estilizada (folha de oliveira/estética)
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.5, -p.size * 0.3, p.size * 0.4, 0);
        ctx.quadraticCurveTo(p.size * 0.3, p.size * 0.5, 0, p.size);
        ctx.quadraticCurveTo(-p.size * 0.3, p.size * 0.5, -p.size * 0.4, 0);
        ctx.quadraticCurveTo(-p.size * 0.5, -p.size * 0.3, 0, -p.size);

        // Preenche com tom de ouro envelhecido translúcido
        ctx.fillStyle = `rgba(201, 163, 94, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      // Sem movimento, apenas desenha as folhas em posições fixas uma vez
      // Ajusta y para ficarem na tela
      leaves.forEach((l) => (l.y = Math.abs(l.y)));
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden
    />
  );
}
