import { useEffect, useRef } from "react";

/**
 * Perspective "command floor" grid with mouse parallax and a traveling pulse.
 * Replaces generic particle network with a unique cyber command-center feel.
 */
export default function NexusGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: 0.5, y: 0.5 };
    let pulseOffset = 0;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);

    function draw() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const gridSize = 48;
      const cols = Math.ceil(w / gridSize) + 4;
      const rows = Math.ceil(h / gridSize) + 4;
      const parallax = 0.08;
      const offsetX = (mouse.x - 0.5) * w * parallax;
      const offsetY = (mouse.y - 0.5) * h * parallax;

      pulseOffset += 0.012;
      const pulseY = (h * 0.6 + Math.sin(pulseOffset) * 80) % (h + 200);

      for (let row = -2; row < rows; row++) {
        for (let col = -2; col < cols; col++) {
          const x = col * gridSize + offsetX;
          const y = row * gridSize + offsetY;

          const distFromPulse = Math.abs(y - pulseY);
          const pulseGlow = distFromPulse < 60 ? (1 - distFromPulse / 60) * 0.4 : 0;

          const distFromCenter = Math.hypot(x - w / 2, y - h / 2);
          const fade = 1 - Math.min(distFromCenter / (Math.max(w, h) * 0.6), 1) * 0.7;

          const alpha = (0.06 + pulseGlow) * fade;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.rect(x, y, gridSize - 2, gridSize - 2);
          ctx.stroke();
        }
      }

      // Single horizontal "data stream" line that moves
      const streamY = (pulseOffset * 40) % (h + 100) - 50;
      const gradient = ctx.createLinearGradient(0, streamY - 20, 0, streamY + 20);
      gradient.addColorStop(0, "rgba(0, 240, 255, 0)");
      gradient.addColorStop(0.5, "rgba(0, 240, 255, 0.15)");
      gradient.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, streamY);
      ctx.lineTo(w, streamY);
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}
