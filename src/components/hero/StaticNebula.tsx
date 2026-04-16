"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Same palettes as NebulaScene so the /on backdrop reads as "same world, frozen".
const STAR_COLORS_DARK = [
  new THREE.Color("#aaccff"),
  new THREE.Color("#ffccaa"),
  new THREE.Color("#ffaaaa"),
  new THREE.Color("#aaffcc"),
  new THREE.Color("#ccaaff"),
  new THREE.Color("#ffffaa"),
  new THREE.Color("#ffaadd"),
  new THREE.Color("#aaddff"),
];
const STAR_COLORS_LIGHT = [
  new THREE.Color("#4477cc"),
  new THREE.Color("#cc8844"),
  new THREE.Color("#cc5566"),
  new THREE.Color("#339977"),
  new THREE.Color("#8855bb"),
  new THREE.Color("#cc9933"),
  new THREE.Color("#cc5599"),
  new THREE.Color("#3399bb"),
];
const LIGHT_PARTICLE_COLOR = new THREE.Color("#60b0e0");

interface ParticlesProps {
  count: number;
  isDark: boolean;
}

function StaticParticles({ count, isDark }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const brightRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { invalidate } = useThree();

  // Frozen particle distribution (sphere shell + power-distance).
  const state = useMemo(() => {
    const brightCount = Math.max(1, Math.floor(count * 0.01));
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightIndices = new Set<number>();
    while (brightIndices.size < brightCount) {
      brightIndices.add(Math.floor(Math.random() * count));
    }
    const brightOrder: number[] = [];
    const brightColorIdx: number[] = [];
    const brightSizes: number[] = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.pow(Math.random(), 0.4) * 8.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = (0.3 + Math.random() * 0.8) * 0.7;

      if (brightIndices.has(i)) {
        brightOrder.push(i);
        brightColorIdx.push(
          Math.floor(Math.random() * STAR_COLORS_DARK.length),
        );
        brightSizes.push((0.3 + Math.random() * 0.35) * 0.8);
      }
    }
    return {
      positions,
      sizes,
      brightCount,
      brightOrder,
      brightColorIdx,
      brightSizes,
    };
  }, [count]);

  // Write matrices once — no useFrame needed.
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        state.positions[i * 3],
        state.positions[i * 3 + 1],
        state.positions[i * 3 + 2],
      );
      dummy.scale.setScalar(state.sizes[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    invalidate();
  }, [count, state, dummy, invalidate]);

  useEffect(() => {
    if (!brightRef.current) return;
    // NebulaScene uses `size * 2.0 * twinkle`, where twinkle ∈ [0.4, 1.0]
    // with mean ≈ 0.7. Multiply by 0.7 here so a static bright star lands
    // at the time-averaged size instead of the peak.
    const twinkleMean = 0.7;
    for (let b = 0; b < state.brightCount; b++) {
      const i = state.brightOrder[b];
      dummy.position.set(
        state.positions[i * 3],
        state.positions[i * 3 + 1],
        state.positions[i * 3 + 2],
      );
      dummy.scale.setScalar(state.brightSizes[b] * 2.0 * twinkleMean);
      dummy.updateMatrix();
      brightRef.current.setMatrixAt(b, dummy.matrix);
    }
    brightRef.current.instanceMatrix.needsUpdate = true;
    invalidate();
  }, [state, dummy, invalidate]);

  // Theme-driven base color for regular particles.
  useEffect(() => {
    if (!meshRef.current) return;
    const c = isDark
      ? new THREE.Color("#ffffff")
      : LIGHT_PARTICLE_COLOR.clone();
    for (let i = 0; i < count; i++) {
      meshRef.current.setColorAt(i, c);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
    invalidate();
  }, [isDark, count, invalidate]);

  // Theme-driven palette for bright stars.
  useEffect(() => {
    if (!brightRef.current) return;
    const palette = isDark ? STAR_COLORS_DARK : STAR_COLORS_LIGHT;
    for (let b = 0; b < state.brightCount; b++) {
      brightRef.current.setColorAt(b, palette[state.brightColorIdx[b]]);
    }
    if (brightRef.current.instanceColor) {
      brightRef.current.instanceColor.needsUpdate = true;
    }
    invalidate();
  }, [isDark, state, invalidate]);

  const baseOpacity = isDark ? 0.55 : 0.45;

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.018, 4, 4]} />
        <meshBasicMaterial
          transparent
          opacity={baseOpacity}
          toneMapped={false}
        />
      </instancedMesh>
      <instancedMesh
        ref={brightRef}
        args={[undefined, undefined, state.brightCount]}
      >
        <sphereGeometry args={[0.022, 6, 6]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </instancedMesh>
    </>
  );
}

export interface StaticNebulaProps {
  /** Number of particles. Default 5000 (matches hero). */
  count?: number;
  /** Optional className passthrough for the outer wrapper. */
  className?: string;
}

/**
 * Static version of the hero nebula — same distribution, palette, and feel,
 * but no rotation, mouse-interaction, shooting stars, or wave pulses.
 * Uses `frameloop="demand"` so the scene only redraws when theme flips.
 */
export function StaticNebula({
  count = 5000,
  className,
}: StaticNebulaProps = {}) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const sync = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{
          antialias: false,
          powerPreference: "low-power",
          alpha: true,
        }}
        dpr={[1, 1.5]}
      >
        <StaticParticles count={count} isDark={isDark} />
      </Canvas>
    </div>
  );
}
