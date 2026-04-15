import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getAllConstellationStars, sphericalToCartesian } from "@/data/constellations";

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

interface DomeStarsProps {
  count: number;
  radius: number;
  isDark: boolean;
  constellationRevealMap: Map<string, number>;
}

export function DomeStars({ count, radius, isDark, constellationRevealMap }: DomeStarsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const brightRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const constellationStars = useMemo(() => getAllConstellationStars(), []);
  const constellationCount = constellationStars.length;
  const bgCount = count - constellationCount;
  const brightCount = Math.floor(bgCount * 0.012);

  const state = useMemo(() => {
    const totalCount = count;
    const positions = new Float32Array(totalCount * 3);
    const sizes = new Float32Array(totalCount);
    const isConst = new Uint8Array(totalCount);
    const constStarIds: string[] = new Array(totalCount).fill("");
    const constBrightness = new Float32Array(totalCount);
    const brightIndices: number[] = [];
    const brightColorIdx: number[] = [];
    const brightSizes: number[] = [];

    for (let i = 0; i < constellationCount; i++) {
      const star = constellationStars[i];
      const [x, y, z] = sphericalToCartesian(star.theta, star.phi, radius);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      sizes[i] = (star.brightness ?? 1) * 0.9;
      isConst[i] = 1;
      constStarIds[i] = star.id;
      constBrightness[i] = star.brightness ?? 1;
    }

    const brightSet = new Set<number>();
    while (brightSet.size < brightCount) {
      const idx = constellationCount + Math.floor(Math.random() * bgCount);
      brightSet.add(idx);
    }

    for (let i = constellationCount; i < totalCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = 0.3 + Math.random() * 0.7;

      if (brightSet.has(i)) {
        brightIndices.push(i);
        brightColorIdx.push(Math.floor(Math.random() * STAR_COLORS_DARK.length));
        brightSizes.push(0.8 + Math.random() * 0.5);
      }
    }
    return { positions, sizes, isConst, constStarIds, constBrightness, brightIndices, brightColorIdx, brightSizes };
  }, [count, radius, constellationCount, constellationStars, bgCount, brightCount]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const baseColor = isDark ? new THREE.Color("#ffffff") : new THREE.Color("#60b0e0");
    const constActiveColor = isDark ? new THREE.Color("#ffffff") : new THREE.Color("#223344");
    const constDimColor = isDark ? new THREE.Color("#556677") : new THREE.Color("#99aabb");

    for (let i = 0; i < count; i++) {
      dummy.position.set(
        state.positions[i * 3],
        state.positions[i * 3 + 1],
        state.positions[i * 3 + 2]
      );

      if (state.isConst[i]) {
        const reveal = constellationRevealMap?.get(state.constStarIds[i]) ?? 0;
        const brightness = state.constBrightness[i];
        const s = THREE.MathUtils.lerp(0.014, 0.04 * brightness, reveal) * state.sizes[i];
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, reveal > 0.1 ? constActiveColor : constDimColor);
      } else {
        dummy.scale.setScalar(state.sizes[i] * 0.018);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, baseColor);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    (mesh.material as THREE.MeshBasicMaterial).opacity = isDark ? 0.55 : 0.45;
  }, [isDark, constellationRevealMap, count, state, dummy]);

  useEffect(() => {
    const mesh = brightRef.current;
    if (!mesh) return;
    const palette = isDark ? STAR_COLORS_DARK : STAR_COLORS_LIGHT;
    for (let b = 0; b < state.brightIndices.length; b++) {
      const i = state.brightIndices[b];
      dummy.position.set(
        state.positions[i * 3],
        state.positions[i * 3 + 1],
        state.positions[i * 3 + 2]
      );
      dummy.scale.setScalar(state.brightSizes[b] * 0.022);
      dummy.updateMatrix();
      mesh.setMatrixAt(b, dummy.matrix);
      mesh.setColorAt(b, palette[state.brightColorIdx[b]]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [isDark, state, dummy]);

  useFrame(() => {
    const elapsed = performance.now() / 1000;
    if (brightRef.current) {
      for (let b = 0; b < state.brightIndices.length; b++) {
        const i = state.brightIndices[b];
        const twinkle = 0.7 + Math.sin(elapsed * 1.2 + b * 0.7) * 0.3;
        dummy.position.set(
          state.positions[i * 3],
          state.positions[i * 3 + 1],
          state.positions[i * 3 + 2]
        );
        dummy.scale.setScalar(state.brightSizes[b] * 0.022 * twinkle);
        dummy.updateMatrix();
        brightRef.current.setMatrixAt(b, dummy.matrix);
      }
      brightRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshBasicMaterial transparent opacity={isDark ? 0.55 : 0.45} toneMapped={false} depthWrite={false} />
      </instancedMesh>
      <instancedMesh ref={brightRef} args={[undefined, undefined, state.brightIndices.length]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial transparent opacity={0.9} toneMapped={false} depthWrite={false} />
      </instancedMesh>
    </>
  );
}
