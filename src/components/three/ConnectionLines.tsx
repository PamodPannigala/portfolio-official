import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConnectionLinesProps {
  particlePositionsRef: React.MutableRefObject<Float32Array | null>;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({ particlePositionsRef }) => {
  const lineSegmentsRef = useRef<THREE.LineSegments>(null!);
  const [localPairs, setLocalPairs] = useState<[number, number][]>([]);
  const pairsFoundRef = useRef(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const linePositions = useMemo(() => {
    if (isMobile || localPairs.length === 0) return new Float32Array(0);
    return new Float32Array(localPairs.length * 6);
  }, [localPairs, isMobile]);

  useFrame(() => {
    if (isMobile || !particlePositionsRef.current) return;

    const particles = particlePositionsRef.current;

    // Search for short local pairs once particle positions are populated
    if (!pairsFoundRef.current) {
      const count = particles.length / 3;
      const found: [number, number][] = [];
      const usedIndices = new Set<number>();

      // Select 3 restrained local pairs with short euclidean distance (< 3.5 units)
      // Strictly avoid long diagonal lines across the screen or through center
      for (let i = 0; i < count && found.length < 3; i++) {
        if (usedIndices.has(i)) continue;
        const xi = particles[i * 3];
        const yi = particles[i * 3 + 1];
        const zi = particles[i * 3 + 2];

        let bestJ = -1;
        let bestDist = Infinity;

        for (let j = i + 1; j < count; j++) {
          if (usedIndices.has(j)) continue;
          const xj = particles[j * 3];
          const yj = particles[j * 3 + 1];
          const zj = particles[j * 3 + 2];

          // Strictly prohibit cross-screen or center-spanning diagonal lines
          if ((xi > 0 && xj < 0) || (xi < 0 && xj > 0) || Math.abs(xi - xj) > 2.8) continue;

          const dx = xi - xj;
          const dy = yi - yj;
          const dz = zi - zj;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist > 1.2 && dist < 3.5 && dist < bestDist) {
            bestDist = dist;
            bestJ = j;
          }
        }

        if (bestJ !== -1) {
          found.push([i, bestJ]);
          usedIndices.add(i);
          usedIndices.add(bestJ);
        }
      }

      pairsFoundRef.current = true;
      if (found.length > 0) {
        setLocalPairs(found);
      }
      return;
    }

    if (!lineSegmentsRef.current || localPairs.length === 0) return;

    const posAttr = lineSegmentsRef.current.geometry.attributes.position;
    if (!posAttr) return;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < localPairs.length; i++) {
      const [idxA, idxB] = localPairs[i];
      if (idxA * 3 + 2 >= particles.length || idxB * 3 + 2 >= particles.length) continue;

      // Point A
      array[i * 6] = particles[idxA * 3];
      array[i * 6 + 1] = particles[idxA * 3 + 1];
      array[i * 6 + 2] = particles[idxA * 3 + 2];

      // Point B
      array[i * 6 + 3] = particles[idxB * 3];
      array[i * 6 + 4] = particles[idxB * 3 + 1];
      array[i * 6 + 5] = particles[idxB * 3 + 2];
    }

    posAttr.needsUpdate = true;
  });

  if (isMobile || localPairs.length === 0) return null;

  return (
    <lineSegments ref={lineSegmentsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.035}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};
