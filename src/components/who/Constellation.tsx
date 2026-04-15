import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import {
  type ConstellationDef,
  sphericalToCartesian,
} from "@/data/constellations";

interface ConstellationProps {
  def: ConstellationDef;
  domeRadius: number;
  revealProgress: number;
  isDark: boolean;
  lang: string;
}

export function Constellation({
  def,
  domeRadius,
  revealProgress,
  isDark,
  lang,
}: ConstellationProps) {
  const labelMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const labelOpacity = useRef(0);

  const starPositions = useMemo(() => {
    const map = new Map<string, THREE.Vector3>();
    for (const star of def.stars) {
      const [x, y, z] = sphericalToCartesian(star.theta, star.phi, domeRadius);
      map.set(star.id, new THREE.Vector3(x, y, z));
    }
    return map;
  }, [def.stars, domeRadius]);

  const centerPos = useMemo(() => {
    const [x, y, z] = sphericalToCartesian(
      def.centerTheta,
      def.centerPhi - 0.18,
      domeRadius
    );
    return new THREE.Vector3(x, y, z);
  }, [def.centerTheta, def.centerPhi, domeRadius]);

  const sortedEdges = useMemo(
    () => [...def.edges].sort((a, b) => a.order - b.order),
    [def.edges]
  );

  useFrame((_, delta) => {
    const target = revealProgress > 0.3 ? 0.4 : 0;
    labelOpacity.current += (target - labelOpacity.current) * Math.min(delta * 3, 1);
    if (labelMatRef.current) {
      labelMatRef.current.opacity = labelOpacity.current;
    }
  });

  const lineColor = isDark ? "#ffffff" : "#334455";
  const label = lang === "ko" ? def.labelKo : def.labelEn;

  return (
    <group>
      {sortedEdges.map((edge, i) => {
        const from = starPositions.get(edge.from);
        const to = starPositions.get(edge.to);
        if (!from || !to) return null;

        const edgeFraction = (i + 1) / sortedEdges.length;
        const edgeProgress = Math.max(
          0,
          Math.min(1, (revealProgress - edgeFraction * 0.5) / 0.5)
        );
        if (edgeProgress <= 0) return null;

        const segments = 12;
        const visibleCount = Math.max(2, Math.ceil(edgeProgress * (segments + 1)));
        const points: THREE.Vector3[] = [];
        for (let s = 0; s < visibleCount; s++) {
          const t = s / segments;
          points.push(new THREE.Vector3().lerpVectors(from, to, t));
        }

        return (
          <Line
            key={`${edge.from}-${edge.to}`}
            points={points}
            color={lineColor}
            lineWidth={0.8}
            transparent
            opacity={Math.min(edgeProgress * 2, 1) * (isDark ? 0.25 : 0.35)}
          />
        );
      })}

      <Billboard follow position={centerPos}>
        <Text
          fontSize={0.12}
          font="/fonts/geist-bold.ttf"
          color={isDark ? "#aabbcc" : "#556677"}
          anchorX="center"
          anchorY="bottom"
          letterSpacing={0.08}
        >
          {label}
          <meshBasicMaterial
            ref={labelMatRef}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </Text>
      </Billboard>
    </group>
  );
}
