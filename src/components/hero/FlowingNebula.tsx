"use client";

import { useEffect, useMemo, useRef } from "react";
import styles from "./FlowingNebula.module.css";

export interface FlowingNebulaProps {
  /** Flow direction. "ltr" = disk on left, particles go right.
   *  "rtl" = disk on right, particles go left (mirror, for /off page). */
  direction?: "ltr" | "rtl";
  /** Annotation labels to scatter around the scene — keep short. */
  labels?: string[];
  /** Total particle count. Default 2000. */
  particleCount?: number;
  /** Vertical spread of the flow as fraction of viewport height.
   *  0.5 → particles occupy ~100% of hero height. Default 0.5. */
  beamSpread?: number;
  /** Disk size fallback when the target glyph can't be measured.
   *  Used as a fraction of viewport min-dimension. Default 0.5. */
  diskScaleFallback?: number;
  /** Global speed multiplier applied to all particle horizontal velocities. */
  speedScale?: number;
}

// Default labels pull from /on vocabulary. Intentionally repeated so the
// near-invisible background reads as texture, not literal text.
const DEFAULT_LABELS: string[] = [
  "N°07 / AWARD",
  "Selected",
  "Silver",
  "Gold",
  "Shortlist",
  "Honorable",
  "2025",
  "2024",
  "2023",
  "2022",
  "TOMOON",
  "99WORKS",
  "JA",
  "VIBE CODER",
  "ON HOURS",
  "WHAT I BUILD",
  "BIADW",
  "LH · HOUSING",
  "BUILDNER",
  "SEONJAE",
  "ARCHITECTURE",
  "R&D LAB",
  "AUTOMATION",
  "3D · PRINT",
  "CAMPTHON",
];

// Deterministic PRNG so the annotation layout is stable across re-renders.
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

interface AnnotationItem {
  x: number; // 0..1
  y: number; // 0..1
  text: string;
  tone: "bright" | "normal" | "dim";
}

interface DashItem {
  x: number; // 0..1 (left edge)
  y: number; // 0..1
  lenPx: number;
  faint: boolean;
}

function buildAnnotations(
  labels: string[],
  direction: "ltr" | "rtl",
): { annotations: AnnotationItem[]; dashes: DashItem[] } {
  const rand = mulberry32(direction === "ltr" ? 42 : 137);

  // Dashes hint at flow direction. Count dropped to ~60% of the original
  // density and Y is biased toward the vertical middle so the texture reads
  // as a horizontal river of filaments, not a top-heavy grid.
  const dashCount = 33;
  const dashes: DashItem[] = [];
  for (let i = 0; i < dashCount; i++) {
    // 75% cluster in the middle 40% band; 25% scatter loosely elsewhere to
    // keep the distribution from looking rigidly banded.
    const band = rand();
    const y =
      band < 0.75
        ? 0.3 + rand() * 0.4 // middle 40% (0.30–0.70)
        : 0.08 + rand() * 0.84; // loose scatter, avoid extreme edges

    dashes.push({
      x: rand(),
      y,
      lenPx: 80 + rand() * 120, // long filaments (80-200px)
      faint: rand() < 0.55,
    });
  }

  // Scattered labels — freely distributed across the full viewport so the
  // texture reads as ambient noise, not clustered top/bottom bands. The
  // massive "On" title sits on top (its white fill covers labels only at
  // actual glyph pixels); labels show through every letter gap and around
  // the glyph, so global scatter reads fine.
  const annotations: AnnotationItem[] = [];
  for (let i = 0; i < 20; i++) {
    const text = labels[i % labels.length];
    const x = 0.05 + rand() * 0.9;
    const y = 0.05 + rand() * 0.9;

    const toneR = rand();
    const tone: AnnotationItem["tone"] =
      toneR < 0.15 ? "bright" : toneR < 0.6 ? "normal" : "dim";
    annotations.push({ x, y, text, tone });
  }

  return { annotations, dashes };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  bright: boolean;
}

export function FlowingNebula({
  direction = "ltr",
  labels = DEFAULT_LABELS,
  particleCount = 2000,
  beamSpread = 0.5,
  diskScaleFallback = 0.5,
  speedScale = 0.8,
}: FlowingNebulaProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { annotations, dashes } = useMemo(
    () => buildAnnotations(labels, direction),
    [labels, direction],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // O-glyph geometry — measured from the actual letter when possible.
    // (diskCx, diskCy) is the O's visual center; outerX/outerY are the O's
    // outer-outline radii. Canvas doesn't draw the O anymore — the DOM text
    // handles that. We still measure the O so particles can respawn from
    // inside it, giving the feel of a stream emanating from the glyph.
    let diskCx = 0;
    let diskCy = 0;
    let outerX = 0;
    let outerY = 0;

    // Find the large "O" letter in the sibling hero DOM. The CSS module class
    // name is hashed, so match by substring.
    const findLetterO = (): HTMLElement | null => {
      const host = wrapper.parentElement;
      if (!host) return null;
      return host.querySelector<HTMLElement>('[class*="letterO"]');
    };

    const applyFallback = (wrapRect: DOMRect) => {
      const min = Math.min(wrapRect.width, wrapRect.height) || 1;
      const r = min * diskScaleFallback * 0.25;
      outerX = r;
      outerY = r * 1.05;
      diskCx = direction === "ltr" ? 0 : wrapRect.width;
      diskCy = wrapRect.height / 2;
    };

    const computeGeometry = () => {
      const wrapRect = wrapper.getBoundingClientRect();
      const letterO = findLetterO();
      if (letterO) {
        const oRect = letterO.getBoundingClientRect();
        // Use computed font-size as the em-unit reference. This is the ACTUAL
        // rendered size — unaffected by line-height shrinkage of the bbox.
        const fontSize = parseFloat(getComputedStyle(letterO).fontSize);

        // If the layout isn't settled yet (font loading, hidden element, etc.),
        // fontSize or the rect can be NaN/0. Bail to the edge fallback so we
        // never hand non-finite values to the Canvas API.
        if (
          !Number.isFinite(fontSize) ||
          fontSize <= 0 ||
          oRect.width <= 0 ||
          oRect.height <= 0
        ) {
          applyFallback(wrapRect);
          return;
        }

        // For the geometric sans used here:
        //   • "O" glyph outer width ≈ 0.67 em  (so radius X ≈ 0.335 em)
        //   • "O" cap height         ≈ 0.70 em (so radius Y ≈ 0.35 em)
        // Visual center of the O glyph (vertical): roughly the cap-center,
        // which sits ~0.45 em below the element's top inside a line box
        // with line-height 0.82.
        const cx = oRect.left - wrapRect.left + oRect.width / 2;
        const cy = oRect.top - wrapRect.top + fontSize * 0.45;

        diskCx = cx;
        diskCy = cy;
        outerX = fontSize * 0.335;
        outerY = fontSize * 0.35;
      } else {
        applyFallback(wrapRect);
      }
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      computeGeometry();
    };
    resize();
    window.addEventListener("resize", resize);

    // Re-measure after fonts load (font-size depends on clamp() + viewport)
    const fontReady = (
      document as unknown as { fonts?: { ready: Promise<unknown> } }
    ).fonts?.ready;
    if (fontReady) {
      fontReady.then(() => computeGeometry()).catch(() => {});
    }
    // Belt-and-suspenders: re-measure on a few timers in case the layout
    // settles late (web fonts, cascade hydration, etc.)
    const timers: number[] = [];
    [100, 400, 1000, 2000].forEach((ms) =>
      timers.push(window.setTimeout(computeGeometry, ms)),
    );

    // ResizeObserver: any time the O glyph resizes (viewport change, font
    // load, etc.) → recompute disk geometry.
    const letterO = findLetterO();
    let ro: ResizeObserver | null = null;
    if (letterO && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => computeGeometry());
      ro.observe(letterO);
    }

    const isLtr = direction === "ltr";
    const dirSign = isLtr ? 1 : -1;

    // Particle pool
    const particles: Particle[] = [];
    const makeParticle = (spreadAcrossScreen: boolean): Particle => {
      // Fan-shaped velocity: mostly along the flow axis, with angular spread.
      // angle = 0 → straight along axis; ±60° max creates a visible cone.
      const angle = (Math.random() - 0.5) * Math.PI * 0.7;
      const speed = (0.9 + Math.random() * 2.1) * speedScale;
      const vx = Math.cos(angle) * speed * dirSign;
      const vy = Math.sin(angle) * speed;

      let spawnX: number;
      let spawnY: number;

      if (spreadAcrossScreen) {
        // Initial fill: scatter across the whole viewport so the flow reads
        // immediately on first paint (no cold-start ramp).
        spawnX = Math.random() * w;
        const halfBeam = h * beamSpread;
        spawnY = diskCy + (Math.random() - 0.5) * 2 * halfBeam;
      } else {
        // Respawn: emanate from INSIDE the O glyph. Uniform scatter within the
        // O's outer ellipse (disc), using sqrt for area-uniform density. The
        // DOM "O" text sits above the canvas, so particles spawned inside the
        // O are hidden until they've travelled past the glyph edge — which
        // naturally reads as "stars streaming out of the O".
        const rA = Math.random() * Math.PI * 2;
        const rFactor = Math.sqrt(Math.random());
        spawnX = diskCx + Math.cos(rA) * outerX * rFactor;
        spawnY = diskCy + Math.sin(rA) * outerY * rFactor;
      }

      return {
        x: spawnX,
        y: spawnY,
        vx,
        vy,
        size: 0.4 + Math.random() * 1.3,
        bright: Math.random() < 0.035,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(makeParticle(true));
    }

    let rafId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      const halfBeam = h * beamSpread;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Subtle vy decay so the fan settles into a horizontal-ish drift far
        // from the O. No vx decay → flow never stalls.
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;

        // Particles that drift out of the beam envelope fade at the edges
        const dy = Math.abs(p.y - diskCy);
        let alpha = 1;
        if (dy > halfBeam) {
          alpha = Math.max(0, 1 - (dy - halfBeam) / (halfBeam * 0.5));
        }

        // Near the far edge of its journey, fade slightly (tail softness)
        const progress = isLtr ? p.x / w : 1 - p.x / w;
        if (progress > 0.85) {
          alpha *= Math.max(0, 1 - (progress - 0.85) / 0.15);
        }

        // Respawn when off-screen (any edge) OR completely faded out
        const offScreenX = isLtr ? p.x > w + 40 : p.x < -40;
        const offScreenY = p.y < -40 || p.y > h + 40;
        if (offScreenX || offScreenY || alpha <= 0.01) {
          Object.assign(p, makeParticle(false));
          continue;
        }

        const baseAlpha = p.bright ? 0.95 : 0.55;
        ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha * alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.bright) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.22 * alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach((t) => window.clearTimeout(t));
      ro?.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [direction, particleCount, beamSpread, diskScaleFallback, speedScale]);

  // Mouse tracking for the cursor-localised annotation reveal. The wrapper is
  // pointer-events: none, so events are read from the parent hero section.
  // --nx/--ny (relative to the wrapper) drive a radial-gradient mask on the
  // annotations layer: only labels near the cursor brighten, the rest stay
  // at their faint base — no global :hover flash.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const host = wrapper.parentElement;
    if (!host) return;

    const setOff = () => {
      // Place the spotlight far off-screen so the mask's edge alpha applies
      // everywhere, matching the "no cursor" baseline.
      wrapper.style.setProperty("--nx", "-9999px");
      wrapper.style.setProperty("--ny", "-9999px");
    };

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      wrapper.style.setProperty("--nx", `${e.clientX - rect.left}px`);
      wrapper.style.setProperty("--ny", `${e.clientY - rect.top}px`);
    };

    setOff();
    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", setOff);

    return () => {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", setOff);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Short dashes hint at flow direction without creating a grid */}
      <div className={styles.annotations}>
        {dashes.map((d, i) => (
          <div
            key={`d${i}`}
            className={`${styles.dash} ${d.faint ? styles.faint : ""}`}
            style={{
              left: `${d.x * 100}%`,
              top: `${d.y * 100}%`,
              width: `${d.lenPx}px`,
            }}
          />
        ))}

        {annotations.map((a, i) => (
          <span
            key={`a${i}`}
            className={`${styles.label} ${
              a.tone === "bright"
                ? styles.bright
                : a.tone === "dim"
                  ? styles.dim
                  : ""
            }`}
            style={{
              left: `${a.x * 100}%`,
              top: `${a.y * 100}%`,
            }}
          >
            {a.text}
          </span>
        ))}
      </div>
    </div>
  );
}
