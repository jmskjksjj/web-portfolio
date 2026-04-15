"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DomeStars } from "./DomeStars";
import { StarGlows } from "./StarGlows";
import { Constellation } from "./Constellation";
import { CONSTELLATIONS } from "@/data/constellations";

const DOME_RADIUS = 7;

// --- Atmosphere shader (Option B: dome-based elevation tint) ---
const atmosphereVertex = /* glsl */ `
  varying float vElevation;
  void main() {
    vElevation = normalize(position).y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying float vElevation;
  void main() {
    float alpha = smoothstep(0.32, -0.05, vElevation) * uIntensity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

// --- 3D Mountain ring geometry ---
function createMountainGeometry(
  radius: number,
  segments: number,
  bottomY: number,
  baseHeight: number,
  amplitude: number,
  seed: number
): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const theta = t * Math.PI * 2;
    const x = radius * Math.cos(theta);
    const z = radius * Math.sin(theta);

    const h =
      baseHeight +
      amplitude *
        (0.4 * Math.sin(t * Math.PI * 4.6 + seed) +
          0.28 * Math.sin(t * Math.PI * 9.2 + seed * 1.7) +
          0.18 * Math.sin(t * Math.PI * 17.8 + seed * 2.3) +
          0.09 * Math.sin(t * Math.PI * 35.6 + seed * 3.1) +
          0.05 * Math.sin(t * Math.PI * 71.2 + seed * 4.7));

    positions.push(x, bottomY, z); // bottom vertex
    positions.push(x, Math.max(baseHeight * 0.5, h), z); // top vertex (mountain profile)
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = (i + 1) * 2;
    const d = (i + 1) * 2 + 1;
    indices.push(a, c, b);
    indices.push(b, c, d);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function MountainRing({
  radius,
  segments,
  bottomY,
  baseHeight,
  amplitude,
  seed,
  color,
}: {
  radius: number;
  segments: number;
  bottomY: number;
  baseHeight: number;
  amplitude: number;
  seed: number;
  color: string;
}) {
  const geometry = useMemo(
    () => createMountainGeometry(radius, segments, bottomY, baseHeight, amplitude, seed),
    [radius, segments, bottomY, baseHeight, amplitude, seed]
  );

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

// --- Custom sky rotation controls ---
function SkyControls({ isMobile }: { isMobile: boolean }) {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const targetAngles = useRef({ azimuth: 0, elevation: 0.65 });
  const currentAngles = useRef({ azimuth: 0, elevation: 0.65 });
  const velocity = useRef({ azimuth: 0, elevation: 0 });
  const targetFov = useRef(isMobile ? 85 : 75);

  useEffect(() => {
    const el = gl.domElement;
    const sensitivity = isMobile ? 0.005 : 0.004;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      velocity.current = { azimuth: 0, elevation: 0 };
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      const vaz = -dx * sensitivity;
      const vel = dy * sensitivity;
      velocity.current = { azimuth: vaz, elevation: vel };

      targetAngles.current.azimuth = clampAzimuth(targetAngles.current.azimuth + vaz);
      targetAngles.current.elevation = clampElevation(targetAngles.current.elevation + vel);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetFov.current = Math.max(45, Math.min(95, targetFov.current + e.deltaY * 0.04));
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, [gl, isMobile]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const smooth = Math.min(dt * 8, 1);

    if (!isDragging.current) {
      targetAngles.current.azimuth = clampAzimuth(
        targetAngles.current.azimuth + velocity.current.azimuth
      );
      targetAngles.current.elevation = clampElevation(
        targetAngles.current.elevation + velocity.current.elevation
      );
      velocity.current.azimuth *= 0.92;
      velocity.current.elevation *= 0.92;
      if (Math.abs(velocity.current.azimuth) < 0.0001) velocity.current.azimuth = 0;
      if (Math.abs(velocity.current.elevation) < 0.0001) velocity.current.elevation = 0;
    }

    currentAngles.current.azimuth +=
      (targetAngles.current.azimuth - currentAngles.current.azimuth) * smooth;
    currentAngles.current.elevation +=
      (targetAngles.current.elevation - currentAngles.current.elevation) * smooth;

    const { azimuth, elevation } = currentAngles.current;
    const lookX = Math.cos(elevation) * Math.sin(azimuth);
    const lookY = Math.sin(elevation);
    const lookZ = -Math.cos(elevation) * Math.cos(azimuth);
    camera.lookAt(lookX * 100, lookY * 100, lookZ * 100);

    const pc = camera as THREE.PerspectiveCamera;
    pc.fov += (targetFov.current - pc.fov) * smooth;
    pc.updateProjectionMatrix();
  });

  return null;
}

function clampAzimuth(a: number) {
  return Math.max(-Math.PI / 2, Math.min(Math.PI / 2, a));
}
function clampElevation(e: number) {
  return Math.max(0.02, Math.min(Math.PI / 2 - 0.02, e));
}

// --- Scene content ---
interface SceneContentProps {
  isDark: boolean;
  lang: string;
  isMobile: boolean;
}

function SceneContent({ isDark, lang, isMobile }: SceneContentProps) {
  const starCount = isMobile ? 2000 : 4000;
  const revealRef = useRef(0);
  const [reveal, setReveal] = useState(0);

  // Atmosphere uniforms (update on theme change without recreating)
  const atmUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color() },
      uIntensity: { value: 0.0 },
    }),
    []
  );

  useEffect(() => {
    atmUniforms.uColor.value.set(isDark ? "#0c1020" : "#a8b4c8");
    atmUniforms.uIntensity.value = isDark ? 0.88 : 0.65;
  }, [isDark, atmUniforms]);

  useFrame((_, delta) => {
    if (revealRef.current < 1) {
      revealRef.current = Math.min(1, revealRef.current + delta * 0.4);
      setReveal(Math.round(revealRef.current * 100) / 100);
    }
  });

  const constellationRevealMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of CONSTELLATIONS) {
      for (const star of c.stars) {
        map.set(star.id, reveal);
      }
    }
    return map;
  }, [reveal]);

  // Mountain layer configs
  const mountainLayers = useMemo(() => {
    const dark = [
      { radius: 6.9, segments: 128, baseHeight: 0.15, amplitude: 0.75, seed: 0.8, color: "#1a2440" },
      { radius: 6.75, segments: 110, baseHeight: 0.1, amplitude: 0.55, seed: 2.5, color: "#141c34" },
      { radius: 6.6, segments: 96, baseHeight: 0.05, amplitude: 0.38, seed: 4.1, color: "#0e1628" },
      { radius: 6.45, segments: 80, baseHeight: 0.0, amplitude: 0.22, seed: 5.8, color: "#0a1020" },
    ];
    const light = [
      { radius: 6.9, segments: 128, baseHeight: 0.15, amplitude: 0.75, seed: 0.8, color: "#98a4b8" },
      { radius: 6.75, segments: 110, baseHeight: 0.1, amplitude: 0.55, seed: 2.5, color: "#a8b2c4" },
      { radius: 6.6, segments: 96, baseHeight: 0.05, amplitude: 0.38, seed: 4.1, color: "#bcc4d4" },
      { radius: 6.45, segments: 80, baseHeight: 0.0, amplitude: 0.22, seed: 5.8, color: "#d0d6e2" },
    ];
    return isDark ? dark : light;
  }, [isDark]);

  const groundColor = isDark ? "#060810" : "#dce0ea";

  return (
    <>
      {/* Stars + constellations (celestial sphere) */}
      <group rotation-y={Math.PI / 2}>
        <DomeStars
          count={starCount}
          radius={DOME_RADIUS}
          isDark={isDark}
          constellationRevealMap={constellationRevealMap}
        />
        <StarGlows
          radius={DOME_RADIUS}
          isDark={isDark}
          constellationRevealMap={constellationRevealMap}
        />
        {CONSTELLATIONS.map((c) => (
          <Constellation
            key={c.id}
            def={c}
            domeRadius={DOME_RADIUS}
            revealProgress={reveal}
            isDark={isDark}
            lang={lang}
          />
        ))}
      </group>

      {/* Atmosphere dome — elevation-based tint near horizon */}
      <mesh renderOrder={10}>
        <sphereGeometry args={[DOME_RADIUS - 0.05, 64, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* 3D Mountain rings — fixed to horizon */}
      {mountainLayers.map((layer, i) => (
        <MountainRing key={i} bottomY={-0.5} {...layer} />
      ))}

      {/* Ground disc */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.02}>
        <circleGeometry args={[DOME_RADIUS + 2, 64]} />
        <meshBasicMaterial color={groundColor} side={THREE.DoubleSide} />
      </mesh>

      <SkyControls isMobile={isMobile} />
    </>
  );
}

// --- Main export ---
interface StarDomeProps {
  lang: string;
}

export function StarDome({ lang }: StarDomeProps) {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 0.01], fov: isMobile ? 85 : 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent isDark={isDark} lang={lang} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
