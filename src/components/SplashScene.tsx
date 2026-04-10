"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const PARTICLE_COUNT = 5000;
const KSJ_LETTERS = ["K", "S", "J"];
const KSJ_SCALE = 0.65;
const KSJ_SPACING = 1.0;

const STAR_COLORS_DARK = [
  new THREE.Color("#aaccff"), new THREE.Color("#ffccaa"),
  new THREE.Color("#ffaaaa"), new THREE.Color("#aaffcc"),
  new THREE.Color("#ccaaff"), new THREE.Color("#ffffaa"),
  new THREE.Color("#ffaadd"), new THREE.Color("#aaddff"),
];

const mouseState = { x: 0, y: 0, active: false };
const shootingStarState = { active: false, hx: 0, hy: 0, hz: 0 };
const waveState = { active: false, ox: 0, oy: 0, oz: 0, time: 0 };

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type HeroLine = {
  text: string;
  y: number;
  size: number;
  bold?: boolean;
  opacity?: number;
  letterSpacing?: number;
};

type InternalPhase = "scatter" | "filling" | "filled" | "complete" | "collapse" | "dot" | "bigbang" | "hero";
type UIPhase = "scatter" | "complete" | "collapse" | "dot" | "bigbang" | "hero";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function sampleTextFilled(
  text: string, count: number,
  canvasW = 200, canvasH = 200, fontSize = 140,
): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = canvasW; canvas.height = canvasH;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(text, canvasW / 2, canvasH / 2);
  const data = ctx.getImageData(0, 0, canvasW, canvasH).data;
  const px: [number, number][] = [];
  for (let y = 0; y < canvasH; y += 2)
    for (let x = 0; x < canvasW; x += 2)
      if (data[(y * canvasW + x) * 4 + 3] > 128) px.push([x, y]);
  const out = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const p = px[Math.floor(Math.random() * px.length)] || [canvasW / 2, canvasH / 2];
    out[i * 2] = (p[0] / canvasW - 0.5) * 2;
    out[i * 2 + 1] = -(p[1] / canvasH - 0.5) * 2;
  }
  return out;
}

function sampleTextEdge(
  text: string, count: number,
  canvasW = 200, canvasH = 200, fontSize = 140,
): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = canvasW; canvas.height = canvasH;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(text, canvasW / 2, canvasH / 2);
  const data = ctx.getImageData(0, 0, canvasW, canvasH).data;
  const edges: [number, number][] = [];
  for (let y = 1; y < canvasH - 1; y++)
    for (let x = 1; x < canvasW - 1; x++) {
      const idx = (y * canvasW + x) * 4;
      if (data[idx + 3] > 128) {
        if (
          data[((y - 1) * canvasW + x) * 4 + 3] < 128 ||
          data[((y + 1) * canvasW + x) * 4 + 3] < 128 ||
          data[(y * canvasW + x - 1) * 4 + 3] < 128 ||
          data[(y * canvasW + x + 1) * 4 + 3] < 128
        ) edges.push([x, y]);
      }
    }
  const out = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const p = edges[Math.floor(Math.random() * edges.length)] || [canvasW / 2, canvasH / 2];
    out[i * 2] = (p[0] / canvasW - 0.5) * 2;
    out[i * 2 + 1] = -(p[1] / canvasH - 0.5) * 2;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/*  KSJ Outline                                                        */
/* ------------------------------------------------------------------ */
function KSJOutline({ isDark, opacity }: { isDark: boolean; opacity: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const OUTLINE_COUNT = 500;

  const positions = useMemo(() => {
    const allPos: { x: number; y: number }[] = [];
    const perLetter = Math.floor(OUTLINE_COUNT / 3);
    KSJ_LETTERS.forEach((letter, li) => {
      const count = li === 2 ? OUTLINE_COUNT - perLetter * 2 : perLetter;
      const sampled = sampleTextEdge(letter, count, 200, 200, 140);
      const cx = (li - 1) * KSJ_SPACING;
      for (let i = 0; i < count; i++) {
        allPos.push({
          x: sampled[i * 2] * KSJ_SCALE + cx,
          y: sampled[i * 2 + 1] * KSJ_SCALE,
        });
      }
    });
    return allPos;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((p, i) => {
      dummy.position.set(p.x, p.y, 0);
      dummy.scale.setScalar(0.25);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    const c = isDark ? new THREE.Color("#ffffff") : new THREE.Color("#60b0e0");
    for (let i = 0; i < positions.length; i++) meshRef.current.setColorAt(i, c);
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [positions, isDark, dummy]);

  useFrame(() => { if (matRef.current) matRef.current.opacity = opacity; });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, OUTLINE_COUNT]}>
      <sphereGeometry args={[0.008, 4, 4]} />
      <meshBasicMaterial ref={matRef} transparent opacity={0.1} toneMapped={false} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Bright stars overlay                                               */
/* ------------------------------------------------------------------ */
function BrightStars({ count, brightIndices, brightColors, brightSizes, getPos }: {
  count: number;
  brightIndices: number[];
  brightColors: number[];
  brightSizes: number[];
  getPos: (idx: number) => [number, number, number];
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let b = 0; b < count; b++) {
      meshRef.current.setColorAt(b, STAR_COLORS_DARK[brightColors[b]]);
    }
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [count, brightColors]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const elapsed = clock.elapsedTime;
    for (let b = 0; b < count; b++) {
      const [x, y, z] = getPos(brightIndices[b]);
      dummy.position.set(x, y, z);
      const twinkle = 0.7 + Math.sin(elapsed * 1.2 + brightIndices[b] * 0.7) * 0.3;
      dummy.scale.setScalar(brightSizes[b] * 2.0 * twinkle);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(b, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.022, 6, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} toneMapped={false} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero text (fades in when mounted)                                  */
/* ------------------------------------------------------------------ */
function FadingText({ line, isDark, fadeRef }: {
  line: HeroLine; isDark: boolean;
  fadeRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current && (meshRef.current as any).material) {
      (meshRef.current as any).material.opacity = (line.opacity ?? 1) * fadeRef.current;
    }
  });
  return (
    <Text
      ref={meshRef as any}
      position={[0, line.y, 0]}
      fontSize={line.size}
      font={line.bold ? "/fonts/geist-bold.ttf" : "/fonts/geist-latin.ttf"}
      color={isDark ? "#ffffff" : "#111111"}
      anchorX="center" anchorY="middle"
      letterSpacing={line.letterSpacing ?? 0}
      material-transparent material-opacity={0} material-depthWrite={false}
    >{line.text}</Text>
  );
}

function HeroText3D({ isDark, lines }: { isDark: boolean; lines: HeroLine[] }) {
  const fadeRef = useRef(0);
  const delayRef = useRef(0);
  useFrame((_, delta) => {
    delayRef.current += delta;
    // Wait 2s after mount before starting fade-in
    if (delayRef.current > 2.0) {
      fadeRef.current = Math.min(1, fadeRef.current + delta * 0.5);
    }
  });
  if (lines.length === 0) return null;
  return (
    <group position={[0, 0, 2]}>
      {lines.map((line, i) => (
        <FadingText key={i} line={line} isDark={isDark} fadeRef={fadeRef} />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Mouse tracker                                                      */
/* ------------------------------------------------------------------ */
function PageMouseTracker() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseState.active = true;
    };
    const onLeave = () => { mouseState.active = false; };
    const onClick = () => {
      if (!shootingStarState.active) return;
      const camZ = 12;
      const tanHalfFov = Math.tan((50 / 2) * Math.PI / 180);
      const aspect = window.innerWidth / window.innerHeight;
      const relZ = camZ - shootingStarState.hz;
      if (relZ <= 0) return;
      const ndcX = shootingStarState.hx / (relZ * tanHalfFov * aspect);
      const ndcY = shootingStarState.hy / (relZ * tanHalfFov);
      const dx = mouseState.x - ndcX;
      const dy = mouseState.y - ndcY;
      if (Math.sqrt(dx * dx + dy * dy) < 0.15) {
        waveState.active = true;
        waveState.ox = shootingStarState.hx;
        waveState.oy = shootingStarState.hy;
        waveState.oz = shootingStarState.hz;
        waveState.time = 0;
      }
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}

/* ------------------------------------------------------------------ */
/*  Core particle system                                               */
/* ------------------------------------------------------------------ */
interface ParticlesProps {
  isDark: boolean;
  onTimeUpdate: (t: number) => void;
  onPhaseChange: (p: UIPhase) => void;
  onHeroReady: () => void;
}

function Particles({ isDark, onTimeUpdate, onPhaseChange, onHeroReady }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const globalTimeRef = useRef(0);
  const phaseRef = useRef<InternalPhase>("scatter");
  const phaseTimeRef = useRef(0);
  const clickedRef = useRef(false);
  const bigbangStartRef = useRef(0);
  const bigbangOriginRef = useRef<Float32Array | null>(null);
  const bigbangUIRef = useRef(false);
  const heroTriggeredRef = useRef(false);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const rotRef = useRef(0);

  // Mouse ray helpers
  const mouseVec = useMemo(() => new THREE.Vector2(), []);

  // Bright star data
  const brightData = useMemo(() => {
    const brightIndices: number[] = [];
    const brightColors: number[] = [];
    const brightSizes: number[] = [];
    const set = new Set<number>();
    const brightCount = Math.floor(PARTICLE_COUNT * 0.01);
    while (set.size < brightCount) set.add(Math.floor(Math.random() * PARTICLE_COUNT));
    set.forEach(idx => {
      brightIndices.push(idx);
      brightColors.push(Math.floor(Math.random() * STAR_COLORS_DARK.length));
      brightSizes.push((0.3 + Math.random() * 0.35) * 0.8);
    });
    return { brightIndices, brightColors, brightSizes, count: brightIndices.length };
  }, []);

  const state = useMemo(() => {
    const home = new Float32Array(PARTICLE_COUNT * 3);
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const targetKSJ = new Float32Array(PARTICLE_COUNT * 3);
    const targetDot = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const activateTime = new Float32Array(PARTICLE_COUNT);
    const collapseDelay = new Float32Array(PARTICLE_COUNT);
    const collapseSpeed = new Float32Array(PARTICLE_COUNT);
    const renderPos = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.pow(Math.random(), 0.4) * 8.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      home[i * 3] = pos[i * 3] = x;
      home[i * 3 + 1] = pos[i * 3 + 1] = y;
      home[i * 3 + 2] = pos[i * 3 + 2] = z;
      vel[i * 3] = vel[i * 3 + 1] = vel[i * 3 + 2] = 0;
      sizes[i] = (0.3 + Math.random() * 0.8) * 0.7;
      collapseDelay[i] = Math.random() * 0.5;
      collapseSpeed[i] = 1.5 + Math.random() * 1.5;
    }

    return { home, pos, vel, targetKSJ, targetDot, sizes, activateTime, collapseDelay, collapseSpeed, renderPos };
  }, []);

  // KSJ targets + staggered timing
  useMemo(() => {
    const perLetter = Math.floor(PARTICLE_COUNT / 3);
    KSJ_LETTERS.forEach((letter, li) => {
      const count = li === 2 ? PARTICLE_COUNT - perLetter * 2 : perLetter;
      const sampled = sampleTextFilled(letter, count, 200, 200, 140);
      const cx = (li - 1) * KSJ_SPACING;
      for (let i = 0; i < count; i++) {
        const idx = li * perLetter + i;
        if (idx >= PARTICLE_COUNT) break;
        state.targetKSJ[idx * 3] = sampled[i * 2] * KSJ_SCALE + cx;
        state.targetKSJ[idx * 3 + 1] = sampled[i * 2 + 1] * KSJ_SCALE;
        state.targetKSJ[idx * 3 + 2] = (Math.random() - 0.5) * 0.1;
        const starts = [0, 1.0, 2.0];
        const ranges = [1.2, 1.3, 1.4];
        state.activateTime[idx] = starts[li] + Math.random() * ranges[li];
      }
    });
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.375;
      state.targetDot[i * 3] = Math.cos(a) * r;
      state.targetDot[i * 3 + 1] = Math.sin(a) * r;
      state.targetDot[i * 3 + 2] = (Math.random() - 0.5) * 0.375;
    }
  }, [state]);

  useEffect(() => { onPhaseChange("scatter"); }, [onPhaseChange]);

  // Click handler (dot → bigbang)
  const { camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (phaseRef.current !== "dot" || clickedRef.current) return;
      const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
      raycaster.setFromCamera(mouse, camera);
      const o = raycaster.ray.origin, d = raycaster.ray.direction;
      const t2 = -(o.x * d.x + o.y * d.y + o.z * d.z);
      const closest = new THREE.Vector3(o.x + d.x * t2, o.y + d.y * t2, o.z + d.z * t2);
      if (closest.length() < 2.5) {
        clickedRef.current = true;
        phaseRef.current = "bigbang";
        bigbangStartRef.current = globalTimeRef.current;
        // Don't trigger React re-render here — let useFrame handle it
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [camera, raycaster, onPhaseChange]);

  // Colors
  useEffect(() => {
    if (!meshRef.current) return;
    const c = isDark ? new THREE.Color("#ffffff") : new THREE.Color("#60b0e0");
    for (let i = 0; i < PARTICLE_COUNT; i++) meshRef.current.setColorAt(i, c);
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [isDark]);

  const getPosCallback = useCallback((idx: number): [number, number, number] => {
    return [state.renderPos[idx * 3], state.renderPos[idx * 3 + 1], state.renderPos[idx * 3 + 2]];
  }, [state.renderPos]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.05);
    globalTimeRef.current += dt;
    phaseTimeRef.current += dt;
    const t = globalTimeRef.current;
    const pt = phaseTimeRef.current;
    const phase = phaseRef.current;

    onTimeUpdate(t);

    rotRef.current += dt * 0.015;
    const cosR = Math.cos(rotRef.current);
    const sinR = Math.sin(rotRef.current);

    // Phase transitions
    if (phase === "scatter" && t >= 1.0) {
      phaseRef.current = "filling"; phaseTimeRef.current = 0;
    }
    if (phase === "filling" && pt >= 4.0) {
      phaseRef.current = "filled"; phaseTimeRef.current = 0;
    }
    if (phase === "filled" && pt >= 1.8) {
      phaseRef.current = "complete"; phaseTimeRef.current = 0;
      onPhaseChange("complete");
    }
    if (phase === "complete" && pt >= 1.5) {
      phaseRef.current = "collapse"; phaseTimeRef.current = 0;
      onPhaseChange("collapse");
    }
    if (phase === "collapse" && pt >= 1.5) {
      phaseRef.current = "dot"; phaseTimeRef.current = 0;
      onPhaseChange("dot");
    }
    // Bigbang UI update (deferred from click handler to avoid frame drop)
    if (phase === "bigbang") {
      const bt = t - bigbangStartRef.current;
      // Update UI after particles have started expanding (avoids re-render frame drop)
      if (bt > 0.15 && !bigbangUIRef.current) {
        bigbangUIRef.current = true;
        onPhaseChange("bigbang");
      }
      // Bigbang → hero (after all particles have settled)
      if (bt > 3.5 && !heroTriggeredRef.current) {
        heroTriggeredRef.current = true;
        for (let j = 0; j < PARTICLE_COUNT * 3; j++) {
          state.vel[j] = 0;
        }
        phaseRef.current = "hero"; phaseTimeRef.current = 0;
        onPhaseChange("hero");
        onHeroReady();
      }
    }

    // Material brightness
    if (matRef.current) {
      const base = isDark ? 0.55 : 0.45;
      if (phase === "complete") {
        const boost = Math.min(1, pt / 0.4);
        matRef.current.opacity = base + boost * 0.35;
      } else if (phase === "collapse" && pt < 0.5) {
        matRef.current.opacity = (base + 0.35) - (pt / 0.5) * 0.35;
      } else {
        matRef.current.opacity = base;
      }
    }

    // Wave pulse logic (hero phase only)
    const waveSpeed = 4.0;
    const waveWidth = 1.5;
    if (phase === "hero" && waveState.active) {
      waveState.time += dt;
      if (waveState.time > 2.0) {
        waveState.active = false;
        if (meshRef.current?.instanceColor) {
          const baseC = isDark ? 1.0 : 0.35;
          const arr = meshRef.current.instanceColor.array as Float32Array;
          for (let j = 0; j < PARTICLE_COUNT * 3; j++) arr[j] = baseC;
          meshRef.current.instanceColor.needsUpdate = true;
        }
      }
    }

    // Capture actual positions on first bigbang frame (before particle loop overwrites them)
    if (phase === "bigbang" && !bigbangOriginRef.current) {
      bigbangOriginRef.current = new Float32Array(state.pos);
    }

    // Mouse ray for hero attract (pre-compute once per frame)
    let pRoX = 0, pRoY = 0, pRoZ = 0;
    let pRdX = 0, pRdY = 0, pRdZ = 0;
    const heroTime = phase === "hero" ? pt : 0;
    const attractStrength = (phase === "hero" && heroTime > 5.0 && mouseState.active) ? 0.15 : 0;
    if (attractStrength > 0) {
      mouseVec.set(mouseState.x, mouseState.y);
      raycaster.setFromCamera(mouseVec, camera);
      const ro = raycaster.ray.origin, rd = raycaster.ray.direction;
      pRoX = ro.x * cosR + ro.z * sinR;
      pRoY = ro.y;
      pRoZ = -ro.x * sinR + ro.z * cosR;
      pRdX = rd.x * cosR + rd.z * sinR;
      pRdY = rd.y;
      pRdZ = -rd.x * sinR + rd.z * cosR;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      /* --- Scatter / Hero: nebula with spring physics --- */
      if (phase === "scatter" || phase === "hero") {
        for (let a = 0; a < 3; a++) {
          let force = (state.home[i3 + a] - state.pos[i3 + a]) * 0.12;

          // Mouse attract (hero only)
          if (attractStrength > 0) {
            const toPx = state.pos[i3] - pRoX;
            const toPy = state.pos[i3 + 1] - pRoY;
            const toPz = state.pos[i3 + 2] - pRoZ;
            const tp = toPx * pRdX + toPy * pRdY + toPz * pRdZ;
            const cpX = pRoX + pRdX * tp;
            const cpY = pRoY + pRdY * tp;
            const cpZ = pRoZ + pRdZ * tp;
            const ddx = cpX - state.pos[i3];
            const ddy = cpY - state.pos[i3 + 1];
            const ddz = cpZ - state.pos[i3 + 2];
            const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);
            if (dist < 1.5 && dist > 0.05) {
              const dir = a === 0 ? ddx : a === 1 ? ddy : ddz;
              const normDist = dist / 1.5;
              const falloff = (1 - normDist) * (1 - normDist);
              force += (dir / dist) * attractStrength * falloff;
            }
          }

          // Wave pulse force (hero only)
          if (phase === "hero" && waveState.active) {
            const wdx = state.pos[i3] - waveState.ox;
            const wdy = state.pos[i3 + 1] - waveState.oy;
            const wdz = state.pos[i3 + 2] - waveState.oz;
            const wDist = Math.sqrt(wdx * wdx + wdy * wdy + wdz * wdz);
            const waveFront = waveState.time * waveSpeed;
            const distToFront = Math.abs(wDist - waveFront);
            if (distToFront < waveWidth && wDist > 0.1) {
              const envelope = 1 - distToFront / waveWidth;
              const fadeOut = Math.max(0, 1 - waveState.time / 2.0);
              const strength = envelope * envelope * fadeOut * 0.8;
              const wDir = a === 0 ? wdx : a === 1 ? wdy : wdz;
              force += (wDir / wDist) * strength;
            }
          }

          state.vel[i3 + a] = (state.vel[i3 + a] + force * dt) * 0.97;
          state.pos[i3 + a] += state.vel[i3 + a];
        }
        const rx = state.pos[i3] * cosR - state.pos[i3 + 2] * sinR;
        const rz = state.pos[i3] * sinR + state.pos[i3 + 2] * cosR;
        state.renderPos[i3] = rx;
        state.renderPos[i3 + 1] = state.pos[i3 + 1];
        state.renderPos[i3 + 2] = rz;
        dummy.position.set(rx, state.pos[i3 + 1], rz);

        // Wave size pulse
        let sizeMult = 1.0;
        if (phase === "hero" && waveState.active) {
          const wdx = state.pos[i3] - waveState.ox;
          const wdy = state.pos[i3 + 1] - waveState.oy;
          const wdz = state.pos[i3 + 2] - waveState.oz;
          const wDist = Math.sqrt(wdx * wdx + wdy * wdy + wdz * wdz);
          const waveFront = waveState.time * waveSpeed;
          const distToFront = Math.abs(wDist - waveFront);
          if (distToFront < waveWidth && wDist > 0.1) {
            const env = 1 - distToFront / waveWidth;
            const fade = Math.max(0, 1 - waveState.time / 2.0);
            sizeMult = 1.0 + env * env * fade * 1.2;
          }
        }

        dummy.scale.setScalar(state.sizes[i] * sizeMult);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        continue;
      }

      /* --- Filling: pull toward KSJ, shrink on approach --- */
      if (phase === "filling" || phase === "filled") {
        const myActivate = state.activateTime[i];
        const pulling = pt >= myActivate || phase === "filled";

        if (!pulling) {
          for (let a = 0; a < 3; a++) {
            const force = (state.home[i3 + a] - state.pos[i3 + a]) * 0.12;
            state.vel[i3 + a] = (state.vel[i3 + a] + force * dt) * 0.97;
            state.pos[i3 + a] += state.vel[i3 + a];
          }
          const rx = state.pos[i3] * cosR - state.pos[i3 + 2] * sinR;
          const rz = state.pos[i3] * sinR + state.pos[i3 + 2] * cosR;
          state.renderPos[i3] = rx;
          state.renderPos[i3 + 1] = state.pos[i3 + 1];
          state.renderPos[i3 + 2] = rz;
          dummy.position.set(rx, state.pos[i3 + 1], rz);
          dummy.scale.setScalar(state.sizes[i]);
          dummy.updateMatrix();
          meshRef.current!.setMatrixAt(i, dummy.matrix);
          continue;
        }

        const elapsed = (phase === "filled") ? pt + 5.0 - myActivate : pt - myActivate;
        const pull = 0.3 + Math.max(0, elapsed) * 1.8;
        const lf = 1 - Math.exp(-pull * dt);
        state.pos[i3] += (state.targetKSJ[i3] - state.pos[i3]) * lf;
        state.pos[i3 + 1] += (state.targetKSJ[i3 + 1] - state.pos[i3 + 1]) * lf;
        state.pos[i3 + 2] += (state.targetKSJ[i3 + 2] - state.pos[i3 + 2]) * lf;
        state.vel[i3] = state.vel[i3 + 1] = state.vel[i3 + 2] = 0;

        const dx = state.targetKSJ[i3] - state.pos[i3];
        const dy = state.targetKSJ[i3 + 1] - state.pos[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, Math.min(1, 1 - dist / 4.0));
        const curSize = state.sizes[i] * (1 - prox * 0.65);

        state.renderPos[i3] = state.pos[i3];
        state.renderPos[i3 + 1] = state.pos[i3 + 1];
        state.renderPos[i3 + 2] = state.pos[i3 + 2];
        dummy.position.set(state.pos[i3], state.pos[i3 + 1], state.pos[i3 + 2]);
        dummy.scale.setScalar(curSize);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        continue;
      }

      /* --- Complete: hold tight on KSJ --- */
      if (phase === "complete") {
        const lf = 1 - Math.exp(-6.0 * dt);
        state.pos[i3] += (state.targetKSJ[i3] - state.pos[i3]) * lf;
        state.pos[i3 + 1] += (state.targetKSJ[i3 + 1] - state.pos[i3 + 1]) * lf;
        state.pos[i3 + 2] += (state.targetKSJ[i3 + 2] - state.pos[i3 + 2]) * lf;
        const ksjSize = state.sizes[i] * 0.35;
        state.renderPos[i3] = state.pos[i3];
        state.renderPos[i3 + 1] = state.pos[i3 + 1];
        state.renderPos[i3 + 2] = state.pos[i3 + 2];
        dummy.position.set(state.pos[i3], state.pos[i3 + 1], state.pos[i3 + 2]);
        dummy.scale.setScalar(ksjSize);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        continue;
      }

      /* --- Collapse to dot --- */
      if (phase === "collapse") {
        const myDelay = state.collapseDelay[i];
        const myTime = Math.max(0, pt - myDelay);
        if (myTime <= 0) {
          state.renderPos[i3] = state.pos[i3];
          state.renderPos[i3 + 1] = state.pos[i3 + 1];
          state.renderPos[i3 + 2] = state.pos[i3 + 2];
          dummy.position.set(state.pos[i3], state.pos[i3 + 1], state.pos[i3 + 2]);
          dummy.scale.setScalar(state.sizes[i] * 0.35);
          dummy.updateMatrix();
          meshRef.current!.setMatrixAt(i, dummy.matrix);
          continue;
        }
        const tx = state.targetDot[i3], ty = state.targetDot[i3 + 1], tz = state.targetDot[i3 + 2];
        const ddx = tx - state.pos[i3], ddy = ty - state.pos[i3 + 1], ddz = tz - state.pos[i3 + 2];
        const mySpeed = state.collapseSpeed[i];
        const cpull = 1.0 + myTime * mySpeed * 0.8;
        const clf = 1 - Math.exp(-cpull * dt);
        state.pos[i3] += ddx * clf;
        state.pos[i3 + 1] += ddy * clf;
        state.pos[i3 + 2] += ddz * clf;
        const distToDot = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);
        const dotScale = 0.4 + Math.min(1, distToDot / 0.8) * 0.6;
        state.renderPos[i3] = state.pos[i3];
        state.renderPos[i3 + 1] = state.pos[i3 + 1];
        state.renderPos[i3 + 2] = state.pos[i3 + 2];
        dummy.position.set(state.pos[i3], state.pos[i3 + 1], state.pos[i3 + 2]);
        dummy.scale.setScalar(state.sizes[i] * 0.35 * dotScale);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        continue;
      }

      /* --- Dot --- */
      if (phase === "dot") {
        const pulse = 1 + Math.sin(pt * 2.5) * 0.08;
        const tx = state.targetDot[i3] * pulse, ty = state.targetDot[i3 + 1] * pulse, tz = state.targetDot[i3 + 2] * pulse;
        const lf = 1 - Math.exp(-5.0 * dt);
        state.pos[i3] += (tx - state.pos[i3]) * lf;
        state.pos[i3 + 1] += (ty - state.pos[i3 + 1]) * lf;
        state.pos[i3 + 2] += (tz - state.pos[i3 + 2]) * lf;
        state.renderPos[i3] = state.pos[i3];
        state.renderPos[i3 + 1] = state.pos[i3 + 1];
        state.renderPos[i3 + 2] = state.pos[i3 + 2];
        dummy.position.set(state.pos[i3], state.pos[i3 + 1], state.pos[i3 + 2]);
        dummy.scale.setScalar(state.sizes[i] * 0.22);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        continue;
      }

      /* --- Big Bang → smooth expand to nebula --- */
      if (phase === "bigbang") {
        const bt = t - bigbangStartRef.current;

        // Per-particle staggered delay based on distance from center
        const dist = Math.sqrt(state.home[i3] ** 2 + state.home[i3 + 1] ** 2 + state.home[i3 + 2] ** 2);
        const maxDist = 10.0;
        const delay = (dist / maxDist) * 1.2; // closer particles move first
        const localT = Math.max(0, bt - delay);
        const duration = 2.0;
        // Smooth ease-out (cubic)
        const raw = Math.min(1, localT / duration);
        const ease = 1 - (1 - raw) * (1 - raw) * (1 - raw);

        // Interpolate from actual click-time position to home
        const org = bigbangOriginRef.current!;
        state.pos[i3] = org[i3] + (state.home[i3] - org[i3]) * ease;
        state.pos[i3 + 1] = org[i3 + 1] + (state.home[i3 + 1] - org[i3 + 1]) * ease;
        state.pos[i3 + 2] = org[i3 + 2] + (state.home[i3 + 2] - org[i3 + 2]) * ease;

        // No Y-rotation at start, blend in rotation as particles expand
        const rotBlend = Math.min(1, bt / 2.0);
        const bCosR = 1 + (cosR - 1) * rotBlend;
        const bSinR = sinR * rotBlend;
        const rx = state.pos[i3] * bCosR - state.pos[i3 + 2] * bSinR;
        const rz = state.pos[i3] * bSinR + state.pos[i3 + 2] * bCosR;

        // Size: start from dot size (0.22), grow to full (1.0)
        const growProgress = Math.min(1, bt / 3.0);
        const curSize = state.sizes[i] * (0.22 + growProgress * 0.78);

        state.renderPos[i3] = rx;
        state.renderPos[i3 + 1] = state.pos[i3 + 1];
        state.renderPos[i3 + 2] = rz;
        dummy.position.set(rx, state.pos[i3 + 1], rz);
        dummy.scale.setScalar(curSize);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        continue;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Wave color flash (hero only)
    if (phase === "hero" && waveState.active && meshRef.current.instanceColor) {
      const baseC = isDark ? 1.0 : 0.35;
      const warmR = isDark ? 1.0 : 0.55;
      const warmG = isDark ? 0.85 : 0.45;
      const warmB = isDark ? 0.6 : 0.35;
      const waveFrontC = waveState.time * waveSpeed;
      const fadeC = Math.max(0, 1 - waveState.time / 2.0);
      const colorArr = meshRef.current.instanceColor.array as Float32Array;
      for (let ci = 0; ci < PARTICLE_COUNT; ci++) {
        const ci3 = ci * 3;
        const wdx = state.pos[ci3] - waveState.ox;
        const wdy = state.pos[ci3 + 1] - waveState.oy;
        const wdz = state.pos[ci3 + 2] - waveState.oz;
        const wDist = Math.sqrt(wdx * wdx + wdy * wdy + wdz * wdz);
        const distToFront = Math.abs(wDist - waveFrontC);
        if (distToFront < waveWidth && wDist > 0.1) {
          const env = 1 - distToFront / waveWidth;
          const blend = env * env * fadeC * 0.5;
          colorArr[ci3] = baseC + (warmR - baseC) * blend;
          colorArr[ci3 + 1] = baseC * (1 - blend) + warmG * blend;
          colorArr[ci3 + 2] = baseC * (1 - blend) + warmB * blend;
        } else {
          colorArr[ci3] = baseC;
          colorArr[ci3 + 1] = baseC;
          colorArr[ci3 + 2] = baseC;
        }
      }
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[0.018, 4, 4]} />
        <meshBasicMaterial ref={matRef} transparent opacity={0.55} toneMapped={false} />
      </instancedMesh>
      <BrightStars
        count={brightData.count}
        brightIndices={brightData.brightIndices}
        brightColors={brightData.brightColors}
        brightSizes={brightData.brightSizes}
        getPos={getPosCallback}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ShootingStar (hero phase only)                                     */
/* ------------------------------------------------------------------ */
function ShootingStar({ isDark = true }: { isDark?: boolean }) {
  const lineRef = useRef<THREE.Line | null>(null);
  const TRAIL_LEN = 80;
  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TRAIL_LEN * 3), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(TRAIL_LEN * 3), 3));
    const mat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.7, depthWrite: false, toneMapped: false });
    return new THREE.Line(geo, mat);
  }, []);

  const buffers = useMemo(() => ({
    positions: new Float32Array(TRAIL_LEN * 3),
    colors: new Float32Array(TRAIL_LEN * 3),
  }), []);

  const stateRef = useRef({
    active: false,
    timer: 15 + Math.random() * 10,
    startPos: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    progress: 0,
    speed: 0,
    len: 0,
    fade: 1,
  });

  useFrame((_, delta) => {
    if (!lineRef.current) return;
    const dt = Math.min(delta, 0.05);
    const s = stateRef.current;

    if (!s.active) {
      s.timer -= dt;
      if (s.timer <= 0) {
        s.active = true;
        s.progress = 0;
        s.len = 1.5 + Math.random() * 1.5;
        s.speed = 10 + Math.random() * 8;
        s.fade = 1;
        const angle = -0.3 - Math.random() * 1.0;
        if (Math.random() < 0.5) {
          s.startPos.set(-4 + Math.random() * 8, 4 + Math.random() * 3, -1 + Math.random() * 2);
        } else {
          s.startPos.set(5 + Math.random() * 3, 1 + Math.random() * 4, -1 + Math.random() * 2);
        }
        s.dir.set(
          Math.cos(angle) * (Math.random() > 0.5 ? 1 : -0.6),
          Math.sin(angle),
          (Math.random() - 0.5) * 0.2,
        ).normalize();
      }
      lineRef.current.visible = false;
      shootingStarState.active = false;
      return;
    }

    s.progress += dt * s.speed;
    if (s.progress > 8) {
      s.fade -= dt * 2;
      if (s.fade <= 0) {
        s.active = false;
        s.timer = 15 + Math.random() * 10;
        lineRef.current.visible = false;
        shootingStarState.active = false;
        return;
      }
    }

    lineRef.current.visible = true;
    const headT = s.progress;
    const headX = s.startPos.x + s.dir.x * headT;
    const headY = s.startPos.y + s.dir.y * headT;
    const headZ = s.startPos.z + s.dir.z * headT;
    shootingStarState.active = true;
    shootingStarState.hx = headX;
    shootingStarState.hy = headY;
    shootingStarState.hz = headZ;
    const headBright = isDark ? 1.0 : 0.4;
    const tailBright = isDark ? 0.3 : 0.15;

    for (let i = 0; i < TRAIL_LEN; i++) {
      const t = i / (TRAIL_LEN - 1);
      const along = headT - t * s.len;
      buffers.positions[i * 3] = s.startPos.x + s.dir.x * along;
      buffers.positions[i * 3 + 1] = s.startPos.y + s.dir.y * along;
      buffers.positions[i * 3 + 2] = s.startPos.z + s.dir.z * along;
      const brightness = (headBright - (headBright - tailBright) * t * t) * s.fade;
      buffers.colors[i * 3] = brightness;
      buffers.colors[i * 3 + 1] = brightness;
      buffers.colors[i * 3 + 2] = brightness;
    }

    const geo = lineRef.current.geometry;
    geo.setAttribute("position", new THREE.BufferAttribute(buffers.positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(buffers.colors, 3));
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  });

  useEffect(() => { lineRef.current = lineObj; }, [lineObj]);
  return <primitive object={lineObj} />;
}

/* ------------------------------------------------------------------ */
/*  Main SplashScene                                                   */
/* ------------------------------------------------------------------ */
interface SplashSceneProps {
  heroLines?: HeroLine[];
  onHeroReady: () => void;
}

export function SplashScene({ heroLines = [], onHeroReady }: SplashSceneProps) {
  const [isDark, setIsDark] = useState(true);
  const [uiPhase, setUiPhase] = useState<UIPhase>("scatter");
  const [globalT, setGlobalT] = useState(0);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const handlePhaseChange = useCallback((p: UIPhase) => setUiPhase(p), []);
  const handleTimeUpdate = useCallback((t: number) => setGlobalT(t), []);

  const isHero = uiPhase === "hero";
  const isSplash = !isHero;
  const showHeroText = uiPhase === "bigbang" || isHero;

  // Lock body scroll during splash, unlock on hero
  useEffect(() => {
    if (isSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isSplash]);

  // Outline visible during splash
  const showOutline = isSplash && globalT < 7.5;
  const outlineOpacity = (() => {
    if (globalT < 0.5) return (globalT / 0.5) * (isDark ? 0.1 : 0.07);
    if (globalT > 6.0) return Math.max(0, 1 - (globalT - 6.0) / 1.5) * (isDark ? 0.1 : 0.07);
    return isDark ? 0.1 : 0.07;
  })();

  return (
    <div className={
      isSplash
        ? "fixed inset-0 z-[100]"
        : "absolute inset-0 pointer-events-none"
    }>
      <PageMouseTracker />

      {/* Background — visible during splash, fades out on hero */}
      <div className={`absolute inset-0 bg-bg transition-opacity duration-500 ${isSplash ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent", pointerEvents: isHero ? "none" : "auto" }}
        >
          {showOutline && <KSJOutline isDark={isDark} opacity={outlineOpacity} />}
          <Particles isDark={isDark} onTimeUpdate={handleTimeUpdate} onPhaseChange={handlePhaseChange} onHeroReady={onHeroReady} />
          {showHeroText && <HeroText3D isDark={isDark} lines={heroLines} />}
          {isHero && <ShootingStar isDark={isDark} />}
        </Canvas>
      </div>

      {/* Splash UI overlays */}
      {uiPhase === "complete" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p
            className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted mt-32 opacity-0"
            style={{ animation: "splashFadeIn 0.4s ease forwards" }}
          >
            AI Systems Architect
          </p>
        </div>
      )}

      {uiPhase === "dot" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-text-secondary animate-pulse mt-24">
            Click
          </p>
        </div>
      )}

      <style>{`@keyframes splashFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
