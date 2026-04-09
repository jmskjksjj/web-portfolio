"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const mouseState = { x: 0, y: 0, wx: 0, wy: 0, active: false };
const shootingStarState = { active: false, hx: 0, hy: 0, hz: 0 };
const waveState = { active: false, ox: 0, oy: 0, oz: 0, time: 0 };

// Bright star colors per theme
const STAR_COLORS_DARK = [
  new THREE.Color("#aaccff"), // cool blue
  new THREE.Color("#ffccaa"), // warm amber
  new THREE.Color("#ffaaaa"), // soft red
  new THREE.Color("#aaffcc"), // soft green
  new THREE.Color("#ccaaff"), // soft purple
  new THREE.Color("#ffffaa"), // soft yellow
  new THREE.Color("#ffaadd"), // soft pink
  new THREE.Color("#aaddff"), // sky blue
];
const STAR_COLORS_LIGHT = [
  new THREE.Color("#4477cc"), // deep blue
  new THREE.Color("#cc8844"), // warm amber
  new THREE.Color("#cc5566"), // rose
  new THREE.Color("#339977"), // teal
  new THREE.Color("#8855bb"), // purple
  new THREE.Color("#cc9933"), // gold
  new THREE.Color("#cc5599"), // pink
  new THREE.Color("#3399bb"), // ocean blue
];
// Light mode base particle color
const LIGHT_PARTICLE_COLOR = new THREE.Color("#60b0e0"); // vivid sky blue

function Nebula({ count = 5000, isDark = true }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const brightRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const rotationRef = useRef(0);
  const colorObj = useMemo(() => new THREE.Color(), []);

  const brightCount = Math.floor(count * 0.01);

  const state = useMemo(() => {
    const home = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const isBright = new Uint8Array(count);
    const brightOrder: number[] = [];
    const brightColors: THREE.Color[] = [];
    const brightSizes: number[] = [];

    const brightIndices = new Set<number>();
    while (brightIndices.size < Math.floor(count * 0.01)) {
      brightIndices.add(Math.floor(Math.random() * count));
    }

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.pow(Math.random(), 0.4) * 6;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      home[i * 3] = pos[i * 3] = x;
      home[i * 3 + 1] = pos[i * 3 + 1] = y;
      home[i * 3 + 2] = pos[i * 3 + 2] = z;

      vel[i * 3] = vel[i * 3 + 1] = vel[i * 3 + 2] = 0;
      sizes[i] = 0.3 + Math.random() * 0.8;

      if (brightIndices.has(i)) {
        isBright[i] = 1;
        brightOrder.push(i);
        // Store index into color arrays (theme switching picks the right palette)
        brightColors.push(Math.floor(Math.random() * STAR_COLORS_DARK.length));
        brightSizes.push(0.3 + Math.random() * 0.35);
      } else {
        isBright[i] = 0;
      }
    }

    return { home, pos, vel, sizes, isBright, brightOrder, brightColors, brightSizes };
  }, [count]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseVec = useMemo(() => new THREE.Vector2(), []);

  const { camera } = useThree();

  useFrame((clock, delta) => {
    if (!meshRef.current) return;

    const dt = Math.min(delta, 0.05);
    rotationRef.current += dt * 0.015;
    const rot = rotationRef.current;
    const cosR = Math.cos(rot);
    const sinR = Math.sin(rot);

    // Get mouse ray in world space, then un-rotate to particle space
    mouseVec.set(mouseState.x, mouseState.y);
    raycaster.setFromCamera(mouseVec, camera);
    const ro = raycaster.ray.origin;
    const rd = raycaster.ray.direction;

    // Inverse Y-axis rotation to particle space
    const pRoX = ro.x * cosR + ro.z * sinR;
    const pRoY = ro.y;
    const pRoZ = -ro.x * sinR + ro.z * cosR;
    const pRdX = rd.x * cosR + rd.z * sinR;
    const pRdY = rd.y;
    const pRdZ = -rd.x * sinR + rd.z * cosR;

    const attractRadius = 1.5;
    const attractStrength = mouseState.active ? 0.15 : 0;

    const elapsed = clock.clock.elapsedTime;

    // Wave pulse logic
    if (waveState.active) {
      waveState.time += dt;
      if (waveState.time > 2.0) {
        waveState.active = false;
      }
    }
    const waveSpeed = 4.0;
    const waveWidth = 1.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Perpendicular distance from particle to mouse ray (in particle space)
      const toPx = state.pos[i3] - pRoX;
      const toPy = state.pos[i3 + 1] - pRoY;
      const toPz = state.pos[i3 + 2] - pRoZ;
      const t = toPx * pRdX + toPy * pRdY + toPz * pRdZ;
      const cpX = pRoX + pRdX * t;
      const cpY = pRoY + pRdY * t;
      const cpZ = pRoZ + pRdZ * t;
      const dx = cpX - state.pos[i3];
      const dy = cpY - state.pos[i3 + 1];
      const dz = cpZ - state.pos[i3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      for (let a = 0; a < 3; a++) {
        let force = (state.home[i3 + a] - state.pos[i3 + a]) * 0.12;

        if (attractStrength > 0 && dist < attractRadius && dist > 0.05) {
          const dir = a === 0 ? dx : a === 1 ? dy : dz;
          const normDist = dist / attractRadius;
          const falloff = (1 - normDist) * (1 - normDist);
          force += (dir / dist) * attractStrength * falloff;
        }

        // Wave pulse: push particles outward from wave origin
        if (waveState.active) {
          const wdx = state.pos[i3] - waveState.ox;
          const wdy = state.pos[i3 + 1] - waveState.oy;
          const wdz = state.pos[i3 + 2] - waveState.oz;
          const wDist = Math.sqrt(wdx * wdx + wdy * wdy + wdz * wdz);
          const waveFront = waveState.time * waveSpeed;
          const distToFront = Math.abs(wDist - waveFront);

          if (distToFront < waveWidth && wDist > 0.1) {
            const envelope = (1 - distToFront / waveWidth);
            const fadeOut = Math.max(0, 1 - waveState.time / 2.0);
            const strength = envelope * envelope * fadeOut * 0.8;
            const dir = a === 0 ? wdx : a === 1 ? wdy : wdz;
            force += (dir / wDist) * strength;
          }
        }

        state.vel[i3 + a] = (state.vel[i3 + a] + force * dt) * 0.97;
        state.pos[i3 + a] += state.vel[i3 + a];
      }

      // Apply global rotation for rendering
      const x = state.pos[i3];
      const z = state.pos[i3 + 2];

      dummy.position.set(
        x * cosR - z * sinR,
        state.pos[i3 + 1],
        x * sinR + z * cosR
      );
      dummy.scale.setScalar(state.sizes[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    // Bright stars - use separate meshes per color group for reliable coloring
    if (brightRef.current) {
      for (let b = 0; b < state.brightOrder.length; b++) {
        const i = state.brightOrder[b];
        const i3 = i * 3;

        const x = state.pos[i3];
        const z = state.pos[i3 + 2];

        dummy.position.set(
          x * cosR - z * sinR,
          state.pos[i3 + 1],
          x * sinR + z * cosR
        );

        const twinkle = 0.7 + Math.sin(elapsed * 1.2 + i * 0.7) * 0.3;
        dummy.scale.setScalar(state.brightSizes[b] * 2.0 * twinkle);
        dummy.updateMatrix();
        brightRef.current.setMatrixAt(b, dummy.matrix);
      }
      brightRef.current.instanceMatrix.needsUpdate = true;
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Update colors when theme changes
  useEffect(() => {
    if (!brightRef.current) return;
    const palette = isDark ? STAR_COLORS_DARK : STAR_COLORS_LIGHT;
    for (let b = 0; b < state.brightOrder.length; b++) {
      brightRef.current.setColorAt(b, palette[state.brightColors[b]]);
    }
    if (brightRef.current.instanceColor) {
      brightRef.current.instanceColor.needsUpdate = true;
    }
  }, [isDark, state.brightOrder, state.brightColors]);

  // Set per-instance colors on base particles based on theme
  useEffect(() => {
    if (!meshRef.current) return;
    const c = isDark ? new THREE.Color("#ffffff") : LIGHT_PARTICLE_COLOR.clone();
    for (let i = 0; i < count; i++) {
      meshRef.current.setColorAt(i, c);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [isDark, count]);

  const baseOpacity = isDark ? 0.55 : 0.45;

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.018, 4, 4]} />
        <meshBasicMaterial transparent opacity={baseOpacity} toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={brightRef} args={[undefined, undefined, brightCount]}>
        <sphereGeometry args={[0.022, 6, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} toneMapped={false} />
      </instancedMesh>
    </>
  );
}

function ShootingStar({ isDark = true }) {
  const lineRef = useRef<THREE.Line>(null);
  const TRAIL_LEN = 80;

  const buffers = useMemo(() => {
    const positions = new Float32Array(TRAIL_LEN * 3);
    const colors = new Float32Array(TRAIL_LEN * 3);
    return { positions, colors };
  }, []);

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

        // Start from random edge
        const angle = -0.3 - Math.random() * 1.0; // mostly downward-right
        if (Math.random() < 0.5) {
          s.startPos.set(
            -4 + Math.random() * 8,
            4 + Math.random() * 3,
            -1 + Math.random() * 2
          );
        } else {
          s.startPos.set(
            5 + Math.random() * 3,
            1 + Math.random() * 4,
            -1 + Math.random() * 2
          );
        }
        s.dir.set(
          Math.cos(angle) * (Math.random() > 0.5 ? 1 : -0.6),
          Math.sin(angle),
          (Math.random() - 0.5) * 0.2
        ).normalize();
      }
      lineRef.current.visible = false;
      shootingStarState.active = false;
      return;
    }

    s.progress += dt * s.speed;

    // After main streak passes, fade out
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

    // Expose head position for click detection
    const headX = s.startPos.x + s.dir.x * s.progress;
    const headY = s.startPos.y + s.dir.y * s.progress;
    const headZ = s.startPos.z + s.dir.z * s.progress;
    shootingStarState.active = true;
    shootingStarState.hx = headX;
    shootingStarState.hy = headY;
    shootingStarState.hz = headZ;

    // Build trail: a line from head to tail
    const headT = s.progress;
    const tailT = Math.max(0, headT - s.len);

    const headBright = isDark ? 1.0 : 0.4;
    const tailBright = isDark ? 0.3 : 0.15;

    for (let i = 0; i < TRAIL_LEN; i++) {
      const t = i / (TRAIL_LEN - 1); // 0=head, 1=tail
      const along = headT - t * s.len;

      const px = s.startPos.x + s.dir.x * along;
      const py = s.startPos.y + s.dir.y * along;
      const pz = s.startPos.z + s.dir.z * along;

      buffers.positions[i * 3] = px;
      buffers.positions[i * 3 + 1] = py;
      buffers.positions[i * 3 + 2] = pz;

      // Color fades from bright white at head to dim at tail
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

  return (
    <line ref={lineRef as React.Ref<THREE.Line>} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(TRAIL_LEN * 3), 3]} />
        <bufferAttribute attach="attributes-color" args={[new Float32Array(TRAIL_LEN * 3), 3]} />
      </bufferGeometry>
      {/* @ts-expect-error - three.js line material */}
      <lineBasicMaterial vertexColors transparent opacity={0.7} depthWrite={false} toneMapped={false} />
    </line>
  );
}

function PageMouseTracker() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseState.active = true;
    };

    const onLeave = () => {
      mouseState.active = false;
    };

    const onClick = () => {
      if (!shootingStarState.active) return;

      // Check if click is near the shooting star head
      // Project star head to NDC using approximate perspective math
      // Camera at z=12, fov=50 => half fov ~0.436 rad, tan ~0.466
      const camZ = 12;
      const tanHalfFov = Math.tan((50 / 2) * Math.PI / 180);
      const aspect = window.innerWidth / window.innerHeight;

      const relZ = camZ - shootingStarState.hz;
      if (relZ <= 0) return;

      const ndcX = shootingStarState.hx / (relZ * tanHalfFov * aspect);
      const ndcY = shootingStarState.hy / (relZ * tanHalfFov);

      const dx = mouseState.x - ndcX;
      const dy = mouseState.y - ndcY;
      const screenDist = Math.sqrt(dx * dx + dy * dy);

      // Catch radius in NDC space (~15% of screen)
      if (screenDist < 0.15) {
        // Trigger wave from star position (in particle space, un-rotate)
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

export type HeroLine = {
  text: string;
  y: number;
  size: number;
  bold?: boolean;
  opacity?: number;
  letterSpacing?: number;
};

interface HeroText3DProps {
  isDark: boolean;
  lines: HeroLine[];
}

function HeroText3D({ isDark, lines }: HeroText3DProps) {
  const FONT_REGULAR = "/fonts/geist-latin.ttf";
  const FONT_BOLD = "/fonts/geist-bold.ttf";
  const textZ = 2; // 3/4 depth into nebula

  if (lines.length === 0) return null;

  return (
    <group position={[0, 0, textZ]}>
      {lines.map((line, i) => (
        <Text
          key={i}
          position={[0, line.y, 0]}
          fontSize={line.size}
          font={line.bold ? FONT_BOLD : FONT_REGULAR}
          color={isDark ? "#ffffff" : "#111111"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={line.letterSpacing ?? 0}
          material-transparent
          material-opacity={line.opacity ?? 1}
          material-depthWrite={false}
        >
          {line.text}
        </Text>
      ))}
    </group>
  );
}

function SceneContent({ isDark, heroLines }: { isDark: boolean; heroLines: HeroText3DProps["lines"] }) {
  return (
    <>
      <Nebula count={5000} isDark={isDark} />
      <HeroText3D isDark={isDark} lines={heroLines} />
      <ShootingStar isDark={isDark} />
    </>
  );
}

export function NebulaScene({ heroLines = [] }: { heroLines?: HeroLine[] }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <PageMouseTracker />
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <SceneContent isDark={isDark} heroLines={heroLines} />
      </Canvas>
    </div>
  );
}
