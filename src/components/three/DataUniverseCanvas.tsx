import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { ConnectionLines } from './ConnectionLines';

export const DataUniverseCanvas: React.FC = () => {
  const particlePositionsRef = useRef<Float32Array | null>(null);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#05070c', 10, 25]} />
        <ambientLight intensity={0.4} />
        
        <ParticleField particlePositionsRef={particlePositionsRef} />
        <ConnectionLines particlePositionsRef={particlePositionsRef} />
      </Canvas>
    </div>
  );
};
