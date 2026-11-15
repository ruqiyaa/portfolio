
//created with claude's help

import { useEffect, useRef, useState } from "react";
import photo from "../assets/img/my-photo.png";

// ---- Look (matched to the portfolio) ----
const LIGHT = [100, 140, 185];     // soft slate-blue for light areas
const DARK = [40, 62, 92];         // deep navy for strong features
const CHARS = " .:-=+*#%@".split("");

// ---- Tuning knobs ----
const FIT = 0.92;        // how much of the canvas the photo fills (0.8–1)
const FACE_CUT = 0.45;   // 0.3–0.6. Higher = more detail on the face, hair/clothes go flatter
const DETAIL = 3.5;      // 2–5. Higher = stronger eyes, brows, nose, lips, jawline
const PUNCH = 1.6;       // 1.2–2.2. Overall contrast
// -----------------------------------------

const calcSize = (w) => (w <= 480 ? Math.min(240, w - 40) : w <= 768 ? Math.min(340, w - 60) : 460);
const clamp = (v) => Math.min(1, Math.max(0, v));
const mix = (a, b, t) => Math.round(a + (b - a) * t);

export default function Portrait() {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(() => calcSize(window.innerWidth));

  useEffect(() => {
    const onResize = () => setSize(calcSize(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fontSize = size <= 280 ? 4.5 : 6;
    const colGap = fontSize * 0.7;     // ASCII proportions: tighter across,
    const rowGap = fontSize * 1.1;     // looser down

    let particles = [];
    let frame = 0;
    let running = false;
    let cancelled = false;
    let t0 = 0;
    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000, active: false };

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;

      // Draw the photo (fit inside, keep aspect) and read its pixels
      const off = document.createElement("canvas");
      off.width = size;
      off.height = size;
      const octx = off.getContext("2d", { willReadFrequently: true });
      const s = Math.min((size * FIT) / img.width, (size * FIT) / img.height);
      const dw = img.width * s;
      const dh = img.height * s;
      octx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh);
      const px = octx.getImageData(0, 0, size, size).data;

      // Pass 1: one brightness value per character cell
      const cells = [];
      const grid = new Map();
      const cols = Math.floor(size / colGap);
      const rows = Math.floor(size / rowGap);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = Math.floor(c * colGap), x1 = Math.min(size, Math.ceil((c + 1) * colGap));
          const y0 = Math.floor(r * rowGap), y1 = Math.min(size, Math.ceil((r + 1) * rowGap));
          let lum = 0, wsum = 0, asum = 0, n = 0;
          for (let y = y0; y < y1; y++) {
            for (let x = x0; x < x1; x++) {
              const i = (y * size + x) * 4;
              const al = px[i + 3] / 255;
              lum += (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) * al;
              wsum += al;
              asum += px[i + 3];
              n++;
            }
          }
          if (!n || asum / n < 128 || !wsum) continue;          // transparent: skip
          const cell = { x: c * colGap + colGap / 2, y: r * rowGap + rowGap / 2, row: r, col: c, lum: lum / wsum };
          cells.push(cell);
          grid.set(r * 10000 + c, cell);
        }
      }

      // Pass 2: normalise around the face so hair and clothes clamp to "dark"
      const sorted = cells.map((c) => c.lum).sort((p, q) => p - q);
      const lo = sorted[Math.floor(sorted.length * FACE_CUT)];
      const hi = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.98))];
      for (const c of cells) c.norm = clamp((c.lum - lo) / (hi - lo || 1));

      // Pass 3: add local detail, then pick a character and colour
      for (const c of cells) {
        let sum = 0, count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (!dr && !dc) continue;
            const nb = grid.get((c.row + dr) * 10000 + (c.col + dc));
            if (nb) { sum += nb.norm; count++; }
          }
        }
        const avg = count ? sum / count : c.norm;
        const local = clamp(0.5 + (avg - c.norm) * DETAIL);
        const t = clamp((0.45 * (1 - c.norm) + 0.55 * local - 0.2) * PUNCH);
        const ch = CHARS[Math.min(CHARS.length - 1, Math.floor(t * CHARS.length))];
        if (ch === " ") continue;

        particles.push({
          tx: c.x, ty: c.y,
          x: reduceMotion ? c.x : c.x + (Math.random() - 0.5) * size * 0.8,
          y: reduceMotion ? c.y : c.y + (Math.random() - 0.5) * size * 0.8,
          vx: 0, vy: 0,
          ch,
          color: `rgb(${mix(LIGHT[0], DARK[0], t)},${mix(LIGHT[1], DARK[1], t)},${mix(LIGHT[2], DARK[2], t)})`,
          alpha: 0.3 + 0.7 * t,
          delay: Math.random() * 0.5,
          shimmer: Math.random() * Math.PI * 2,
        });
      }

      t0 = performance.now() - (reduceMotion ? 10000 : 0);
      start();
    };
    img.src = photo;

    const draw = (now) => {
      const elapsed = (now - t0) / 1000;
      ctx.clearRect(0, 0, size, size);
      ctx.font = `${fontSize}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      mouse.x += (mouse.tx - mouse.x) * 0.15;                   // smoothed cursor
      mouse.y += (mouse.ty - mouse.y) * 0.15;
      const reach = size * 0.18;
      let moving = 0;

      for (const p of particles) {
        const pt = elapsed - p.delay;
        if (pt < 0) continue;

        const fade = Math.min(pt / 1.2, 1);
        const easedFade = 1 - (1 - fade) * (1 - fade);
        const move = Math.min(pt / 2.2, 1);
        const pull = 0.01 + (1 - Math.pow(1 - move, 3)) * 0.07;
        const lively = mouse.active || pt < 3;

        if (mouse.active) {                                      // cursor pushes characters away
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < reach && dist > 0) {
            const force = (1 - dist / reach) * 4;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx += (p.tx - p.x) * pull;                             // spring back home
        p.vy += (p.ty - p.y) * pull;
        if (lively) {                                            // gentle breathing
          p.vx += Math.sin(elapsed * 0.5 + p.ty * 0.1) * 0.12;
          p.vy += Math.cos(elapsed * 0.5 + p.tx * 0.1) * 0.12;
        }
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
        moving = Math.max(moving, Math.abs(p.vx) + Math.abs(p.vy));

        const shimmer = lively ? Math.sin(elapsed * 2 + p.shimmer) * 0.08 : 0;
        ctx.globalAlpha = Math.max(0, p.alpha * easedFade + shimmer);
        ctx.fillStyle = p.color;
        ctx.fillText(p.ch, p.x, p.y);
      }
      ctx.globalAlpha = 1;

      // Once everything has settled and nobody is hovering, stop animating
      if (elapsed > 4.5 && !mouse.active && moving < 0.02) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || cancelled) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const k = size / rect.width;
      mouse.tx = (e.clientX - rect.left) * k;
      mouse.ty = (e.clientY - rect.top) * k;
      mouse.active = true;
      start();
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.tx = -1000;
      mouse.ty = -1000;
      start();
    };
    if (!reduceMotion) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Portrait of Ruqiya"
      style={{
        width: "100%",
        maxWidth: size,
        height: "auto",
        aspectRatio: "1 / 1",
        touchAction: "pan-y",
      }}
    />
  );
}