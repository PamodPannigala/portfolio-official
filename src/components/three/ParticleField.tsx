import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ParticleFieldProps {
  particlePositionsRef: React.MutableRefObject<Float32Array | null>;
}

interface ParticleData {
  positions: Float32Array;
  sizes: Float32Array;
  colors: Float32Array;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ particlePositionsRef }) => {
  const deepPointsRef = useRef<THREE.Points>(null!);
  const nearPointsRef = useRef<THREE.Points>(null!);
  const prefersReducedMotion = usePrefersReducedMotion();

  const particleCount = useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 50; // Mobile particle count
    }
    return 120; // Desktop particle count
  }, []);

  // Multi-layer independent Z-depth distribution
  const [deepData, nearData] = useMemo<[ParticleData, ParticleData]>(() => {
    const deepCount = Math.floor(particleCount * 0.6);
    const nearCount = particleCount - deepCount;

    const deepPos = new Float32Array(deepCount * 3);
    const deepSz = new Float32Array(deepCount);
    const deepCol = new Float32Array(deepCount * 3);

    const nearPos = new Float32Array(nearCount * 3);
    const nearSz = new Float32Array(nearCount);
    const nearCol = new Float32Array(nearCount * 3);

    const cyanColor = new THREE.Color('#38bdf8');
    const blueColor = new THREE.Color('#6366f1');
    const mutedSlate = new THREE.Color('#334155');

    // 1. Deep background particles (distant, subtle movement)
    for (let i = 0; i < deepCount; i++) {
      deepPos[i * 3] = (Math.random() - 0.5) * 32;
      deepPos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      deepPos[i * 3 + 2] = -10 - Math.random() * 12;

      deepSz[i] = 0.04 + Math.random() * 0.05;

      deepCol[i * 3] = mutedSlate.r;
      deepCol[i * 3 + 1] = mutedSlate.g;
      deepCol[i * 3 + 2] = mutedSlate.b;
    }

    // 2. Midground & foreground particles (closer, slightly more reactive)
    for (let i = 0; i < nearCount; i++) {
      const isForeground = i % 4 === 0;
      const zPos = isForeground ? 3 + Math.random() * 5 : (Math.random() - 0.5) * 8;
      const pColor = isForeground ? cyanColor : (Math.random() > 0.5 ? cyanColor : blueColor);

      nearPos[i * 3] = (Math.random() - 0.5) * 28;
      nearPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      nearPos[i * 3 + 2] = zPos;

      nearSz[i] = isForeground ? 0.20 + Math.random() * 0.06 : 0.11 + Math.random() * 0.07;

      nearCol[i * 3] = pColor.r;
      nearCol[i * 3 + 1] = pColor.g;
      nearCol[i * 3 + 2] = pColor.b;
    }

    return [
      { positions: deepPos, sizes: deepSz, colors: deepCol },
      { positions: nearPos, sizes: nearSz, colors: nearCol },
    ];
  }, [particleCount]);

  particlePositionsRef.current = nearData.positions;

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    // Distant background layer: calm rotation, minimal pointer shift
    if (deepPointsRef.current) {
      deepPointsRef.current.rotation.y += delta * 0.007;
      deepPointsRef.current.rotation.x += delta * 0.003;

      const deepTargetX = state.pointer.x * 0.09;
      const deepTargetY = state.pointer.y * 0.06;
      deepPointsRef.current.position.x += (deepTargetX - deepPointsRef.current.position.x) * 0.022;
      deepPointsRef.current.position.y += (deepTargetY - deepPointsRef.current.position.y) * 0.022;
    }

    // Midground/foreground layer: slightly more reactive, restrained
    if (nearPointsRef.current) {
      nearPointsRef.current.rotation.y += delta * 0.012;
      nearPointsRef.current.rotation.x += delta * 0.006;

      const nearTargetX = state.pointer.x * 0.24;
      const nearTargetY = state.pointer.y * 0.16;
      nearPointsRef.current.position.x += (nearTargetX - nearPointsRef.current.position.x) * 0.035;
      nearPointsRef.current.position.y += (nearTargetY - nearPointsRef.current.position.y) * 0.035;
    }
  });

  return (
    <group>
      {/* Layer A: Distant Deep Space Particles */}
      <points ref={deepPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[deepData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[deepData.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[deepData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Layer B: Mid & Foreground Focus Particles */}
      <points ref={nearPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nearData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[nearData.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nearData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
