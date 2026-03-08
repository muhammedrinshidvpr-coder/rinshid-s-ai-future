import { useEffect, useRef, useCallback } from 'react';

const AnimatedBackground = () => {
  const blurredCanvasRef = useRef<HTMLCanvasElement>(null);
  const clearCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const drawScene = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.fillStyle = 'hsl(222, 47%, 6%)';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height * 0.55;
    const gridRows = 40;
    const gridCols = 60;
    const cellSize = 40;
    const perspective = 600;

    // Flowing perspective grid
    for (let row = 1; row <= gridRows; row++) {
      for (let col = -gridCols / 2; col <= gridCols / 2; col++) {
        const worldX = col * cellSize;
        const worldZ = row * cellSize;

        // Wave displacement
        const wave = Math.sin(worldX * 0.008 + time * 0.8) * Math.cos(worldZ * 0.006 + time * 0.5) * 25;
        const wave2 = Math.sin((worldX + worldZ) * 0.005 + time * 1.2) * 15;
        const worldY = wave + wave2;

        // Project to screen
        const scale = perspective / (perspective + worldZ);
        const screenX = cx + worldX * scale;
        const screenY = cy - worldY * scale + worldZ * scale * 0.3;

        // Fade with distance
        const distFactor = 1 - row / gridRows;
        const alpha = distFactor * 0.35;

        if (alpha <= 0.01) continue;

        // Draw node
        const nodeSize = Math.max(1, 2.5 * scale);
        ctx.beginPath();
        ctx.arc(screenX, screenY, nodeSize, 0, Math.PI * 2);

        // Color shift based on wave height
        const hue = 192 + wave * 0.8;
        const lightness = 42 + wave2 * 0.5;
        ctx.fillStyle = `hsla(${hue}, 91%, ${lightness}%, ${alpha})`;
        ctx.fill();

        // Horizontal connections
        if (col < gridCols / 2) {
          const nextWorldX = (col + 1) * cellSize;
          const nextWave = Math.sin(nextWorldX * 0.008 + time * 0.8) * Math.cos(worldZ * 0.006 + time * 0.5) * 25;
          const nextWave2 = Math.sin((nextWorldX + worldZ) * 0.005 + time * 1.2) * 15;
          const nextWorldY = nextWave + nextWave2;
          const nextScale = perspective / (perspective + worldZ);
          const nextScreenX = cx + nextWorldX * nextScale;
          const nextScreenY = cy - nextWorldY * nextScale + worldZ * nextScale * 0.3;

          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(nextScreenX, nextScreenY);
          ctx.strokeStyle = `hsla(192, 91%, 42%, ${alpha * 0.3})`;
          ctx.lineWidth = scale * 0.8;
          ctx.stroke();
        }

        // Vertical connections (every few)
        if (row < gridRows && col % 2 === 0) {
          const nextWorldZ = (row + 1) * cellSize;
          const nWave = Math.sin(worldX * 0.008 + time * 0.8) * Math.cos(nextWorldZ * 0.006 + time * 0.5) * 25;
          const nWave2 = Math.sin((worldX + nextWorldZ) * 0.005 + time * 1.2) * 15;
          const nWorldY = nWave + nWave2;
          const nScale = perspective / (perspective + nextWorldZ);
          const nScreenX = cx + worldX * nScale;
          const nScreenY = cy - nWorldY * nScale + nextWorldZ * nScale * 0.3;

          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(nScreenX, nScreenY);
          ctx.strokeStyle = `hsla(192, 91%, 42%, ${alpha * 0.2})`;
          ctx.lineWidth = scale * 0.5;
          ctx.stroke();
        }
      }
    }

    // Floating light particles
    for (let i = 0; i < 15; i++) {
      const px = cx + Math.sin(time * 0.3 + i * 2.1) * width * 0.35;
      const py = height * 0.3 + Math.cos(time * 0.4 + i * 1.7) * height * 0.2;
      const pAlpha = 0.08 + Math.sin(time + i) * 0.04;
      const pSize = 2 + Math.sin(time * 0.5 + i * 3) * 1.5;

      ctx.beginPath();
      ctx.arc(px, py, pSize, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(192, 91%, 60%, ${pAlpha})`;
      ctx.fill();
    }

    // Ambient glow orbs
    const gradient1 = ctx.createRadialGradient(width * 0.3, height * 0.4, 0, width * 0.3, height * 0.4, 300);
    gradient1.addColorStop(0, 'hsla(192, 91%, 42%, 0.04)');
    gradient1.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, width, height);

    const gradient2 = ctx.createRadialGradient(width * 0.7, height * 0.6, 0, width * 0.7, height * 0.6, 250);
    gradient2.addColorStop(0, 'hsla(172, 66%, 50%, 0.03)');
    gradient2.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, width, height);
  }, []);

  useEffect(() => {
    const blurredCanvas = blurredCanvasRef.current;
    const clearCanvas = clearCanvasRef.current;
    if (!blurredCanvas || !clearCanvas) return;

    const blurCtx = blurredCanvas.getContext('2d');
    const clearCtx = clearCanvas.getContext('2d');
    if (!blurCtx || !clearCtx) return;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      blurredCanvas.width = w;
      blurredCanvas.height = h;
      clearCanvas.width = w;
      clearCanvas.height = h;
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (maskRef.current) {
        maskRef.current.style.setProperty('--mx', `${e.clientX}px`);
        maskRef.current.style.setProperty('--my', `${e.clientY}px`);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;

      // Draw the scene on both canvases
      drawScene(blurCtx, blurredCanvas.width, blurredCanvas.height, t);
      drawScene(clearCtx, clearCanvas.width, clearCanvas.height, t);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [drawScene]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Layer 1: Blurred + darkened scene */}
      <canvas
        ref={blurredCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          filter: 'blur(6px) brightness(0.5)',
          opacity: 0.7,
        }}
      />
      {/* Dark overlay on blurred layer */}
      <div
        className="absolute inset-0"
        style={{ background: 'hsla(222, 47%, 6%, 0.55)' }}
      />

      {/* Layer 2: Clear scene, masked to cursor "flashlight" */}
      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(circle 180px at var(--mx, -9999px) var(--my, -9999px), black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 180px at var(--mx, -9999px) var(--my, -9999px), black 0%, transparent 100%)',
        }}
      >
        <canvas
          ref={clearCanvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.85 }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
