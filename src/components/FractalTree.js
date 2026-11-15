import { useEffect, useRef } from "react";

// ---- Look (matched to the portfolio) ----
const TRUNK = [47, 69, 96];       // deep navy
const TWIG = [110, 150, 195];     // soft slate-blue
const BLOSSOM = "#e5739b";        // pink, tips only
const MAX_DEPTH = 9;
// -----------------------------------------

const mix = (a, b, t) => Math.round(a + (b - a) * t);
const clamp = (v) => Math.min(1, Math.max(0, v));

export default function FractalTree({ size = 480 }) {
  const canvasRef = useRef(null);
  const W = Math.round(size * 1.4);   // wider than tall, so the branches never clip
  const H = size;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    canvas.width = W * dpr;
    canvas.height = H * dpr;

    let frame;
    const t0 = performance.now();
    const mouse = { x: 0.5, active: false };
    let spreadNow = 0.4;

    const branch = (x, y, len, angle, depth, grow, time, spread) => {
      const g = clamp(grow * (MAX_DEPTH + 1) - depth);
      if (g <= 0) return;

      const l = len * g;
      const sway = reduceMotion ? 0 : Math.sin(time * 0.0012 + depth * 0.7) * 0.04;
      const x2 = x + Math.cos(angle + sway) * l;
      const y2 = y + Math.sin(angle + sway) * l;
      const t = depth / MAX_DEPTH;

      ctx.strokeStyle = `rgb(${mix(TRUNK[0], TWIG[0], t)},${mix(TRUNK[1], TWIG[1], t)},${mix(TRUNK[2], TWIG[2], t)})`;
      ctx.lineWidth = Math.max(1, (MAX_DEPTH - depth) * 1.3);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      if (depth >= MAX_DEPTH - 1) {
        ctx.fillStyle = BLOSSOM;
        ctx.globalAlpha = 0.55 * g;
        ctx.beginPath();
        ctx.arc(x2, y2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (depth >= MAX_DEPTH) return;

      const next = len * 0.75;
      branch(x2, y2, next, angle - spread + sway, depth + 1, grow, time, spread);
      branch(x2, y2, next, angle + spread + sway, depth + 1, grow, time, spread);
    };

    const draw = (now) => {
      const time = now - t0;
      const grow = reduceMotion ? 1 : clamp(time / 3500);
      const targetSpread = mouse.active
        ? 0.3 + mouse.x * 0.22                            // capped so it stays inside the canvas
        : 0.4 + (reduceMotion ? 0 : Math.sin(time * 0.0006) * 0.05);
      spreadNow += (targetSpread - spreadNow) * 0.06;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      branch(W / 2, H - 12, H * 0.2, -Math.PI / 2, 0, grow, time, spreadNow);

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clamp((e.clientX - rect.left) / rect.width);
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [W, H]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Animated fractal tree"
      style={{ width: "100%", maxWidth: W, height: "auto", aspectRatio: `${W} / ${H}`, touchAction: "pan-y" }}
    />
  );
}