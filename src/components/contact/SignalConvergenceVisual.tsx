import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type ActiveContactChannel = 'email' | 'linkedin' | 'github' | null;

interface SignalConvergenceVisualProps {
  activeChannel: ActiveContactChannel;
}

interface NodePoint {
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  baseRadius: number;
  channel: 'email' | 'linkedin' | 'github' | 'ambient';
  label?: string;
  phase: number;
}

interface SignalPath {
  startIdx: number;
  ctrl1: { x: number; y: number };
  ctrl2: { x: number; y: number };
  endIdx: number;
  channel: 'email' | 'linkedin' | 'github' | 'ambient';
}

interface PulsePacket {
  pathIdx: number;
  progress: number;
  speed: number;
  size: number;
  channel: 'email' | 'linkedin' | 'github' | 'ambient';
}

export const SignalConvergenceVisual: React.FC<SignalConvergenceVisualProps> = ({
  activeChannel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle pointer parallax
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseTargetRef.current = { x, y };
      setMousePos({ x, y });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseTargetRef.current = { x: 0, y: 0 };
    setMousePos({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Defined topology normalized (0 to 1)
    // Central Hub Node is at index 0 (x: 0.72, y: 0.50)
    const nodes: NodePoint[] = [
      { x: 0.72, y: 0.50, baseRadius: 5.5, channel: 'ambient', label: 'HUB // 01', phase: 0 }, // 0: Convergence Target
      // Email Channel (Nodes 1, 2)
      { x: 0.16, y: 0.24, baseRadius: 3.5, channel: 'email', label: 'IN_01', phase: 0.2 },
      { x: 0.42, y: 0.32, baseRadius: 3.0, channel: 'email', phase: 0.7 },
      // LinkedIn Channel (Nodes 3, 4)
      { x: 0.18, y: 0.76, baseRadius: 3.5, channel: 'linkedin', label: 'IN_02', phase: 1.4 },
      { x: 0.46, y: 0.68, baseRadius: 3.0, channel: 'linkedin', phase: 2.1 },
      // GitHub Channel (Nodes 5, 6)
      { x: 0.28, y: 0.50, baseRadius: 3.5, channel: 'github', label: 'IN_03', phase: 3.0 },
      { x: 0.52, y: 0.50, baseRadius: 2.5, channel: 'github', phase: 3.8 },
      // Ambient Field Nodes
      { x: 0.88, y: 0.22, baseRadius: 2.0, channel: 'ambient', phase: 4.2 },
      { x: 0.86, y: 0.78, baseRadius: 2.0, channel: 'ambient', phase: 5.1 },
      { x: 0.38, y: 0.16, baseRadius: 2.0, channel: 'ambient', phase: 1.1 },
      { x: 0.62, y: 0.84, baseRadius: 2.0, channel: 'ambient', phase: 2.8 },
    ];

    // Defined Connections leading to Hub
    const paths: SignalPath[] = [
      // Email route (1 -> 2 -> 0)
      { startIdx: 1, ctrl1: { x: 0.28, y: 0.26 }, ctrl2: { x: 0.35, y: 0.30 }, endIdx: 2, channel: 'email' },
      { startIdx: 2, ctrl1: { x: 0.52, y: 0.36 }, ctrl2: { x: 0.62, y: 0.44 }, endIdx: 0, channel: 'email' },
      // LinkedIn route (3 -> 4 -> 0)
      { startIdx: 3, ctrl1: { x: 0.30, y: 0.74 }, ctrl2: { x: 0.38, y: 0.70 }, endIdx: 4, channel: 'linkedin' },
      { startIdx: 4, ctrl1: { x: 0.55, y: 0.65 }, ctrl2: { x: 0.64, y: 0.56 }, endIdx: 0, channel: 'linkedin' },
      // GitHub route (5 -> 6 -> 0)
      { startIdx: 5, ctrl1: { x: 0.36, y: 0.50 }, ctrl2: { x: 0.44, y: 0.50 }, endIdx: 6, channel: 'github' },
      { startIdx: 6, ctrl1: { x: 0.58, y: 0.50 }, ctrl2: { x: 0.65, y: 0.50 }, endIdx: 0, channel: 'github' },
      // Ambient faint cross-links
      { startIdx: 0, ctrl1: { x: 0.78, y: 0.38 }, ctrl2: { x: 0.83, y: 0.28 }, endIdx: 7, channel: 'ambient' },
      { startIdx: 0, ctrl1: { x: 0.77, y: 0.62 }, ctrl2: { x: 0.82, y: 0.72 }, endIdx: 8, channel: 'ambient' },
      { startIdx: 2, ctrl1: { x: 0.40, y: 0.22 }, ctrl2: { x: 0.39, y: 0.18 }, endIdx: 9, channel: 'ambient' },
      { startIdx: 4, ctrl1: { x: 0.52, y: 0.76 }, ctrl2: { x: 0.58, y: 0.81 }, endIdx: 10, channel: 'ambient' },
    ];

    // Active Signal Packets
    const pulses: PulsePacket[] = [
      { pathIdx: 0, progress: 0.15, speed: 0.004, size: 2.2, channel: 'email' },
      { pathIdx: 1, progress: 0.65, speed: 0.005, size: 2.5, channel: 'email' },
      { pathIdx: 2, progress: 0.40, speed: 0.004, size: 2.2, channel: 'linkedin' },
      { pathIdx: 3, progress: 0.85, speed: 0.005, size: 2.5, channel: 'linkedin' },
      { pathIdx: 4, progress: 0.25, speed: 0.004, size: 2.0, channel: 'github' },
      { pathIdx: 5, progress: 0.75, speed: 0.005, size: 2.4, channel: 'github' },
      { pathIdx: 6, progress: 0.50, speed: 0.003, size: 1.8, channel: 'ambient' },
      { pathIdx: 7, progress: 0.30, speed: 0.003, size: 1.8, channel: 'ambient' },
    ];

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Compute cubic bezier point
    const getBezierPoint = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      t: number
    ) => {
      const cx = 3 * (p1.x - p0.x);
      const bx = 3 * (p2.x - p1.x) - cx;
      const ax = p3.x - p0.x - cx - bx;

      const cy = 3 * (p1.y - p0.y);
      const by = 3 * (p2.y - p1.y) - cy;
      const ay = p3.y - p0.y - cy - by;

      const xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
      const yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

      return { x: xt, y: yt };
    };

    let time = 0;

    const render = () => {
      if (!ctx || width === 0 || height === 0) return;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (spring feel)
      if (!prefersReducedMotion) {
        mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.08;
        mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.08;
      } else {
        mouseCurrentRef.current = { x: 0, y: 0 };
      }

      const offsetX = mouseCurrentRef.current.x * 12;
      const offsetY = mouseCurrentRef.current.y * 8;

      // Draw subtle grid guides & technical ticks in background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);

      // Horizontal reference axis
      const midY = height * 0.50 + offsetY * 0.5;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, midY);
      ctx.lineTo(width * 0.92, midY);
      ctx.stroke();

      // Vertical convergence axis
      const hubX = width * 0.72 + offsetX;
      ctx.beginPath();
      ctx.moveTo(hubX, height * 0.12);
      ctx.lineTo(hubX, height * 0.88);
      ctx.stroke();
      ctx.setLineDash([]);

      // Compute actual screen coordinates for each node
      const nodeCoords = nodes.map((node, i) => {
        const depthFactor = i === 0 ? 1.0 : 0.65;
        const nx = node.x * width + offsetX * depthFactor;
        const ny = node.y * height + offsetY * depthFactor;
        return { x: nx, y: ny };
      });

      // 1. Draw Connection Paths
      paths.forEach((path) => {
        const p0 = nodeCoords[path.startIdx];
        const p3 = nodeCoords[path.endIdx];
        const p1 = { x: path.ctrl1.x * width + offsetX * 0.65, y: path.ctrl1.y * height + offsetY * 0.65 };
        const p2 = { x: path.ctrl2.x * width + offsetX * 0.8, y: path.ctrl2.y * height + offsetY * 0.8 };

        const isChannelActive = activeChannel === path.channel;
        const isAmbient = path.channel === 'ambient';

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

        if (isChannelActive) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
          ctx.lineWidth = 1.75;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
          ctx.shadowBlur = 8;
        } else if (activeChannel && !isChannelActive) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        } else if (isAmbient) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
          ctx.lineWidth = 1.25;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. Draw Moving Pulses (Packets)
      if (!prefersReducedMotion) {
        pulses.forEach((pulse) => {
          const path = paths[pulse.pathIdx];
          const p0 = nodeCoords[path.startIdx];
          const p3 = nodeCoords[path.endIdx];
          const p1 = { x: path.ctrl1.x * width + offsetX * 0.65, y: path.ctrl1.y * height + offsetY * 0.65 };
          const p2 = { x: path.ctrl2.x * width + offsetX * 0.8, y: path.ctrl2.y * height + offsetY * 0.8 };

          const isChannelActive = activeChannel === pulse.channel;
          const speedMultiplier = isChannelActive ? 2.0 : 1.0;

          pulse.progress += pulse.speed * speedMultiplier;
          if (pulse.progress > 1) pulse.progress = 0;

          const pt = getBezierPoint(p0, p1, p2, p3, pulse.progress);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pulse.size * (isChannelActive ? 1.4 : 1.0), 0, Math.PI * 2);

          if (isChannelActive) {
            ctx.fillStyle = '#38bdf8';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 10;
          } else if (pulse.channel === 'ambient') {
            ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
            ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
            ctx.shadowBlur = 4;
          }

          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // 3. Draw Nodes
      nodeCoords.forEach((pt, i) => {
        const node = nodes[i];
        const isHub = i === 0;
        const isChannelActive = activeChannel === node.channel;
        const isDimmed = activeChannel && node.channel !== activeChannel && !isHub;

        // Concentric pulse around Convergence Hub
        if (isHub) {
          const pulseRing = ((time * 0.5) % 3) / 3;
          const ringRadius = node.baseRadius + pulseRing * 18;
          const ringAlpha = (1 - pulseRing) * (activeChannel ? 0.5 : 0.25);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Outer boundary ring
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, node.baseRadius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Main Node Circle
        ctx.beginPath();
        const r = node.baseRadius * (isChannelActive ? 1.3 : 1.0);
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);

        if (isHub) {
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 12;
        } else if (isChannelActive) {
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
        } else if (isDimmed) {
          ctx.fillStyle = 'rgba(100, 116, 139, 0.4)';
          ctx.shadowBlur = 0;
        } else if (node.channel === 'ambient') {
          ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // Optional technical node labels
        if (node.label) {
          ctx.font = '9px monospace';
          ctx.fillStyle = isChannelActive || isHub ? 'rgba(56, 189, 248, 0.9)' : 'rgba(148, 163, 184, 0.55)';
          ctx.fillText(node.label, pt.x + 8, pt.y - 6);
        }
      });

      time += 0.02;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeChannel, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[430px] rounded-2xl border border-white/[0.06] bg-[#040c14]/90 p-3 sm:p-4 flex flex-col justify-between overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] select-none"
      aria-label="Interactive Signal Convergence Field"
    >
      {/* Background Subtle Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent-cyan/[0.02] via-transparent to-accent-blue/[0.02] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-text-secondary/70 pb-2 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span className="tracking-widest uppercase text-slate-300 font-medium">
            SIGNAL FIELD // 06
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-400">SYS: ONLINE</span>
          <span className="px-1.5 py-0.5 rounded bg-accent-cyan/[0.08] border border-accent-cyan/30 text-accent-cyan font-semibold">
            {activeChannel ? `CHANNEL: ${activeChannel.toUpperCase()}` : 'TOPOLOGY: CONVERGING'}
          </span>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative flex-1 w-full h-full min-h-[220px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] text-text-secondary/60 pt-2 border-t border-white/[0.05]">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">LATENCY: &lt;1ms</span>
          <span className="text-white/20">·</span>
          <span>PROTOCOL: DIRECT_INQUIRY</span>
        </div>
        <div className="text-accent-cyan/80 font-medium">
          {mousePos.x !== 0 || mousePos.y !== 0 ? 'FIELD PARALLAX: ACTIVE' : 'STEADY STATE'}
        </div>
      </div>
    </div>
  );
};
