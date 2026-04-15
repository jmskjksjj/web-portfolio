import { useMemo } from "react";
import * as THREE from "three";
import { getAllConstellationStars, sphericalToCartesian } from "@/data/constellations";

interface StarGlowsProps {
  radius: number;
  isDark: boolean;
  constellationRevealMap: Map<string, number>;
}

export function StarGlows({ radius, isDark, constellationRevealMap }: StarGlowsProps) {
  const stars = useMemo(() => getAllConstellationStars(), []);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.08, "rgba(230, 240, 255, 0.8)");
    grad.addColorStop(0.2, "rgba(190, 215, 255, 0.35)");
    grad.addColorStop(0.45, "rgba(150, 185, 235, 0.08)");
    grad.addColorStop(1, "rgba(120, 160, 220, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <>
      {stars.map((star) => {
        const reveal = constellationRevealMap?.get(star.id) ?? 0;
        if (reveal < 0.05) return null;

        const [x, y, z] = sphericalToCartesian(star.theta, star.phi, radius);
        const brightness = star.brightness ?? 1;
        const glowSize = reveal * brightness * 0.45;

        return (
          <sprite key={star.id} position={[x, y, z]} scale={[glowSize, glowSize, 1]}>
            <spriteMaterial
              map={texture}
              transparent
              opacity={reveal * 0.55 * brightness}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              color={isDark ? "#c8d8ff" : "#334466"}
            />
          </sprite>
        );
      })}
    </>
  );
}
