import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Scale density with screen area so phones aren't drawing as many stars as a 4K monitor
    const STAR_COUNT = Math.round(Math.min(180, Math.max(60, (width * height) / 9000)));
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.15 + 0.02,
      opacity: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.008 + 0.003,
    }));

    const resize = () => {
      const prevWidth = width;
      const prevHeight = height;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prevWidth && prevHeight) {
        for (const s of stars) {
          s.x = (s.x / prevWidth) * width;
          s.y = (s.y / prevHeight) * height;
        }
      }
    };
    resize();

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        if (animate) {
          s.y -= s.speed;
          s.pulse += s.pulseSpeed;
          if (s.y < -2) {
            s.y = height + 2;
            s.x = Math.random() * width;
          }
        }
        const alpha = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(270, 60%, 75%, ${alpha})`;
        ctx.fill();
      }
    };

    const loop = () => {
      draw(true);
      animationId = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reducedMotion) {
        draw(false);
      } else if (!animationId) {
        animationId = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(animationId);
      animationId = 0;
    };

    const handleResize = () => {
      resize();
      if (reducedMotion) draw(false);
    };
    const handleVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
