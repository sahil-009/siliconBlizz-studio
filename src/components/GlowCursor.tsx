import { useEffect, useState } from "react";

export default function GlowCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [visible]);

  return (
    <>
      {/* Outer glow */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full transition-opacity duration-300"
        style={{
          width: 300,
          height: 300,
          left: pos.x - 150,
          top: pos.y - 150,
          background: "radial-gradient(circle, hsl(270 80% 60% / 0.07) 0%, transparent 70%)",
          opacity: visible ? 1 : 0,
          filter: "blur(20px)",
        }}
      />
      {/* Inner dot */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full transition-opacity duration-200"
        style={{
          width: 8,
          height: 8,
          left: pos.x - 4,
          top: pos.y - 4,
          background: "hsl(270 80% 70% / 0.6)",
          boxShadow: "0 0 12px 4px hsl(270 80% 60% / 0.3)",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
