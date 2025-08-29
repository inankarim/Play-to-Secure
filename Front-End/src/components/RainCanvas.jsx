import React, { useEffect, useRef } from "react";

const RainCanvas = ({
  intensity = 1,   // 0.5 = light drizzle, 1 = normal, 2 = heavy
  speed = 1,       // overall speed multiplier
  angle = 18,      // degrees, slanted rain
  opacity = 0.5,   // raindrop opacity (0..1)
  zIndex = 1,
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const dropsRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setSize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDrops();
    };

    const initDrops = () => {
      const { w, h } = sizeRef.current;
      const base = (w * h) / 12000; // density baseline
      const count = Math.max(60, Math.floor(base * intensity));
      const theta = (angle * Math.PI) / 180;
      const dx = Math.sin(theta);
      const dy = Math.cos(theta);

      dropsRef.current = Array.from({ length: count }).map(() => {
        const len = 8 + Math.random() * 14;         // drop length
        const s = (0.9 + Math.random() * 1.6) * speed; // speed
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          len,
          vx: dx * (3.5 * s),
          vy: dy * (9.5 * s),
        };
      });
    };

    let last = performance.now();
    const loop = (t) => {
      const { w, h } = sizeRef.current;
      const dt = Math.min((t - last) / 16.67, 2); // ~60fps normalized
      last = t;

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(210,225,255,${opacity})`;
      ctx.beginPath();

      for (const d of dropsRef.current) {
        const x2 = d.x - (d.vx * d.len) / 12;
        const y2 = d.y - (d.vy * d.len) / 12;

        ctx.moveTo(d.x, d.y);
        ctx.lineTo(x2, y2);

        d.x += d.vx * dt;
        d.y += d.vy * dt;

        if (d.y > h + 20 || d.x > w + 20 || d.x < -20) {
          d.x = Math.random() * w;
          d.y = -20;
        }
      }
      ctx.stroke();

      rafRef.current = requestAnimationFrame(loop);
    };

    setSize();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, [intensity, speed, angle, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        pointerEvents: "none",
      }}
    />
  );
};

export default RainCanvas;
