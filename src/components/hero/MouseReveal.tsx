"use client";

import { useEffect, useRef } from "react";
import styles from "./MouseReveal.module.css";

export interface MouseRevealProps {
  /** Background image URL (e.g. "/on-bg.jpg"). Used when bgVideo is not set. */
  bgImage?: string;
  /** Background video URL (e.g. "/on-bg.mp4"). Takes precedence over bgImage. */
  bgVideo?: string;
  /** CSS background-size value for bg image. Default "cover". */
  bgSize?: string;
  /** Cursor reveal radius in pixels. Default 120. */
  radius?: number;
  /** Inner hard-erase threshold as % of radius (0-60). Default 25. */
  innerSoftEdge?: number;
  /** Outer fade-to-zero threshold as % of radius (40-100). Default 80. */
  outerSoftEdge?: number;
  /** Dark overlay color (also used as fade-back color). Default #0a0a0a. */
  darkMid?: string;
  /** (Legacy) edge color — unused in canvas mode, kept for API compat. */
  darkEdge?: string;
  /** Cursor follow lerp (0.05-1). Default 0.23. */
  followSpeed?: number;
  /** Photo brightness filter (0.3-1.5). Default 1 (original). */
  bgBrightness?: number;
  /** Warm glow intensity at cursor (0-1). Default 0.15. */
  glowIntensity?: number;
  /** Show the soft warm glow halo around cursor. Default true. */
  showGlow?: boolean;
  /** Show the bright dot at cursor tip. Default true. */
  showDot?: boolean;
  /** Hide native cursor over the hero. Default true. */
  hideNativeCursor?: boolean;
  /** Enable "rubbing charges → locks into full reveal" effect. Default false. */
  enableCharge?: boolean;
  /** How fast mouse speed charges within the bulb zone (0.0005-0.01). Default 0.0015. */
  chargeGain?: number;
  /** Per-frame charge decay when not rubbing (0.003-0.03). Default 0.008. */
  chargeDecay?: number;
  /** Bulb rub-zone in normalized (0-1) hero coords.
   *  Default covers the entire hero (cx=cy=0.5, rx=ry=0.5) so rubbing anywhere
   *  on the hero builds charge. Pass a smaller zone to restrict charge gain to
   *  a specific region (e.g. around the glowing "O" glyph). */
  bulbZone?: { cx: number; cy: number; rx: number; ry: number };
  /** Charge value at which overlay locks to fully transparent. 0-1. Default 0.97. */
  lockThreshold?: number;
  /** Per-frame opacity decrement during lock fade-out. Default 0.015. */
  lockFadeSpeed?: number;
  /** Base fade-back alpha (0-0.1) — higher = trails disappear faster. Default 0.05. */
  fadeBackBase?: number;
  /**
   * Invert the reveal paradigm.
   *
   *   false (default)  — Canvas starts fully dark, cursor carves holes to
   *                      reveal the photo/scene underneath. Light source
   *                      metaphor. Lock → fully transparent (permanent reveal).
   *   true             — Canvas starts transparent (scene fully visible),
   *                      cursor paints darkness on top. Shadow/ink metaphor.
   *                      Rubbing charges up the shadow (slower fade-back);
   *                      idle lets it re-clear. Lock → fully opaque darkMid
   *                      (permanent black — mirror of normal's lock).
   */
  invert?: boolean;
}

// Parse "#rrggbb" → rgba() string with the given alpha.
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function MouseReveal({
  bgImage,
  bgVideo,
  bgSize = "cover",
  radius = 120,
  innerSoftEdge = 25,
  outerSoftEdge = 80,
  darkMid = "#0a0a0a",
  darkEdge = "#0e0e0e",
  followSpeed = 0.23,
  bgBrightness = 1,
  glowIntensity = 0.15,
  showGlow = true,
  showDot = true,
  hideNativeCursor = true,
  enableCharge = false,
  chargeGain = 0.0015,
  chargeDecay = 0.008,
  bulbZone = { cx: 0.5, cy: 0.5, rx: 0.5, ry: 0.5 },
  lockThreshold = 0.97,
  lockFadeSpeed = 0.015,
  fadeBackBase = 0.05,
  invert = false,
}: MouseRevealProps) {
  // Mark unused-but-kept-for-API-compat to satisfy lint.
  void darkEdge;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Canvas reveal loop
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!wrapper || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const target = { x: 0, y: 0, active: false };
    const prevTarget = { x: 0, y: 0 };
    const current = { x: -1000, y: -1000 };
    let charge = 0;
    let locked = false;
    let lockedOpacity = 1; // normal-mode fade-out: 1 → 0
    let lockDarkness = 0;  // invert-mode fade-in: 0 → 1 (linear ramp)
    let lockSnapshot: ImageData | null = null; // invert-mode frozen state

    // DPR-aware sizing + initial fill (normal) / clear (invert).
    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      if (invert) {
        // Transparent canvas → background/scene fully visible from the start.
        ctx.clearRect(0, 0, rect.width, rect.height);
      } else {
        // Opaque darkness blankets everything — cursor will carve holes.
        ctx.fillStyle = darkMid;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
    };
    resize();

    const handlePointer = (clientX: number, clientY: number) => {
      const rect = wrapper.getBoundingClientRect();
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
      target.active =
        target.x >= 0 &&
        target.y >= 0 &&
        target.x <= rect.width &&
        target.y <= rect.height;
    };

    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        handlePointer(t.clientX, t.clientY);
      }
    };
    const onLeave = () => {
      target.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = wrapper.getBoundingClientRect();

      // Smooth lerp follow
      current.x += (target.x - current.x) * followSpeed;
      current.y += (target.y - current.y) * followSpeed;

      // Per-frame speed (for charge accumulation)
      const speed = Math.hypot(
        target.x - prevTarget.x,
        target.y - prevTarget.y,
      );
      prevTarget.x = target.x;
      prevTarget.y = target.y;

      if (!locked) {
        const fadeAlpha = fadeBackBase * (1 - charge * 0.92);
        const innerStop = Math.max(0, Math.min(1, innerSoftEdge / 100));
        const outerStop = Math.max(
          innerStop + 0.01,
          Math.min(1, outerSoftEdge / 100),
        );

        if (invert) {
          // INVERT MODE — shadow metaphor.
          // (A) Fade-back: erase accumulated darkness with a small alpha, so
          //     painted shadow clears over time and the scene re-emerges when
          //     the cursor idles. Charge near 1 → alpha near zero → shadow
          //     persists while the user rubs in place.
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
          ctx.fillRect(0, 0, rect.width, rect.height);

          // (B) Paint at cursor: source-over radial darkMid — the cursor casts
          //     a shadow onto the scene instead of carving a hole.
          if (target.active) {
            ctx.globalCompositeOperation = "source-over";
            const r = radius;
            const grd = ctx.createRadialGradient(
              current.x,
              current.y,
              0,
              current.x,
              current.y,
              r,
            );
            grd.addColorStop(0, hexToRgba(darkMid, 1));
            grd.addColorStop(innerStop, hexToRgba(darkMid, 0.85));
            grd.addColorStop(outerStop, hexToRgba(darkMid, 0.18));
            grd.addColorStop(1, hexToRgba(darkMid, 0));
            ctx.fillStyle = grd;
            ctx.fillRect(current.x - r, current.y - r, r * 2, r * 2);
          }
        } else {
          // NORMAL MODE — light metaphor.
          // (A) Fade-back: repaint darkness with a small alpha.
          //     Charge near 1 → fade becomes nearly zero → trail persists.
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = hexToRgba(darkMid, fadeAlpha);
          ctx.fillRect(0, 0, rect.width, rect.height);

          // (B) Erase at cursor: destination-out radial hole.
          //     Reveals the photo along the cursor path.
          if (target.active) {
            ctx.globalCompositeOperation = "destination-out";
            const r = radius;
            const grd = ctx.createRadialGradient(
              current.x,
              current.y,
              0,
              current.x,
              current.y,
              r,
            );
            grd.addColorStop(0, "rgba(0, 0, 0, 1)");
            grd.addColorStop(innerStop, "rgba(0, 0, 0, 0.85)");
            grd.addColorStop(outerStop, "rgba(0, 0, 0, 0.18)");
            grd.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = grd;
            ctx.fillRect(current.x - r, current.y - r, r * 2, r * 2);
            ctx.globalCompositeOperation = "source-over";
          }
        }

        // (C) Charge accumulation — same mechanic in both modes. Higher charge
        //     slows the fade-back, so trails (normal) / shadow (invert) linger.
        if (enableCharge) {
          const zx = bulbZone.cx * rect.width;
          const zy = bulbZone.cy * rect.height;
          const zrx = bulbZone.rx * rect.width;
          const zry = bulbZone.ry * rect.height;
          const inBulb =
            target.active &&
            Math.abs(target.x - zx) < zrx &&
            Math.abs(target.y - zy) < zry;
          if (inBulb) charge += speed * chargeGain;
          charge -= chargeDecay;
          if (charge < 0) charge = 0;
          if (charge > 1) charge = 1;
          // Both modes lock once charge saturates — the meaning of the locked
          // end-state simply flips:
          //   normal → fully transparent (permanent full reveal)
          //   invert → fully opaque darkMid (permanent full dark)
          if (charge >= lockThreshold) {
            if (!locked && invert) {
              // Freeze the current canvas so the fade-in starts from the
              // exact shadow pattern the user built up — no jarring reset.
              lockSnapshot = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
              );
            }
            locked = true;
          }
        }
      } else {
        // (D) Locked state.
        if (invert) {
          // Invert: smooth fade-in from the snapshot to fully opaque darkMid.
          // Per frame: restore the canvas to its lock-time state via
          // putImageData, then paint a single uniform darkMid layer on top at
          // α = lockDarkness. Because we rewrite the destination each frame
          // (no accumulation), when lockDarkness reaches 1 the source-over
          // math gives α_new = 1 + α_dst·(1 − 1) = 1 — true full occlusion,
          // with no 8-bit asymptote tail. Starting the fade from the captured
          // snapshot preserves the user's shadow pattern as the visual origin,
          // so the transition reads as "the shadow slowly swallows the rest".
          lockDarkness = Math.min(1, lockDarkness + lockFadeSpeed);

          if (lockSnapshot) {
            // putImageData operates in raw pixel coords (ignores transform),
            // which matches how the snapshot was captured.
            ctx.putImageData(lockSnapshot, 0, 0);
          } else {
            ctx.clearRect(0, 0, rect.width, rect.height);
          }

          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = hexToRgba(darkMid, lockDarkness);
          ctx.fillRect(0, 0, rect.width, rect.height);
        } else {
          // Normal: fade entire overlay to transparent and stay there.
          lockedOpacity = Math.max(0, lockedOpacity - lockFadeSpeed);
          canvas.style.opacity = `${lockedOpacity}`;
        }
      }

      // Cursor glow + dot tracking (unchanged behavior)
      const mx = `${current.x}px`;
      const my = `${current.y}px`;
      if (glow) {
        glow.style.setProperty("--mx", mx);
        glow.style.setProperty("--my", my);
      }
      if (dot) {
        dot.style.setProperty("--mx", mx);
        dot.style.setProperty("--my", my);
      }
      if (target.active) {
        glow?.classList.add(styles.active);
        dot?.classList.add(styles.active);
      } else {
        glow?.classList.remove(styles.active);
        dot?.classList.remove(styles.active);
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [
    followSpeed,
    radius,
    innerSoftEdge,
    outerSoftEdge,
    darkMid,
    enableCharge,
    chargeGain,
    chargeDecay,
    bulbZone.cx,
    bulbZone.cy,
    bulbZone.rx,
    bulbZone.ry,
    lockThreshold,
    lockFadeSpeed,
    fadeBackBase,
    invert,
  ]);

  // Hide native cursor over parent .hero section
  useEffect(() => {
    if (!hideNativeCursor) return;
    const parent = wrapperRef.current?.parentElement;
    if (!parent) return;
    parent.dataset.mouseRevealCursor = "hidden";
    return () => {
      delete parent.dataset.mouseRevealCursor;
    };
  }, [hideNativeCursor]);

  const cssVars = {
    "--bg-brightness": bgBrightness,
    "--bg-size": bgSize,
    "--glow-intensity": glowIntensity,
  } as React.CSSProperties;

  return (
    <div ref={wrapperRef} className={styles.wrapper} style={cssVars}>
      {/* Layer 0: Background image or video */}
      {bgVideo ? (
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          src={bgVideo}
        />
      ) : bgImage ? (
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : null}

      {/* Layer 1: Canvas darkness overlay — cursor trail carves holes here */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Layer 2: Warm glow at cursor (screen blend) */}
      {showGlow && <div ref={glowRef} className={styles.glow} />}

      {/* Layer 3: Bright dot = the light source itself */}
      {showDot && <div ref={dotRef} className={styles.dot} />}
    </div>
  );
}
