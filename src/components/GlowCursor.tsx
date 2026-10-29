import { useEffect, useRef } from "react";
import { useHasFinePointer } from "@/hooks/use-media-query";

export default function GlowCursor() {
  const hasFinePointer = useHasFinePointer();
  if (!hasFinePointer) return null;
  return <GlowCursorInner />;
}

function GlowCursorInner() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move via transforms on refs so tracking the mouse never re-renders React
    let frame = 0;
    let x = -100;
    let y = -100;

    const setOpacity = (value: string) => {
      if (glowRef.current) glowRef.current.style.opacity = value;
      if (dotRef.current) dotRef.current.style.opacity = value;
    };
    const paint = () => {
      frame = 0;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
    };
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setOpacity("1");
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => setOpacity("0");
    const enter = () => setOpacity("1");

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <>
      {/* Outer glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full transition-opacity duration-300 will-change-transform"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, hsl(270 80% 60% / 0.07) 0%, transparent 70%)",
          opacity: 0,
          filter: "blur(20px)",
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full transition-opacity duration-200 will-change-transform"
        style={{
          width: 8,
          height: 8,
          background: "hsl(270 80% 70% / 0.6)",
          boxShadow: "0 0 12px 4px hsl(270 80% 60% / 0.3)",
          opacity: 0,
        }}
      />
    </>
  );
}
