import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/** Counts up to a value like "500+" or "98.9%" once it scrolls into view, keeping the prefix/suffix. */
export function CountUp({ value, duration = 1.8, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);

  useEffect(() => {
    if (!inView || !match || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const el = ref.current;
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  // Render the final value up front so there's no layout shift and no-JS/SEO sees real numbers
  return <span ref={ref} className="tabular-nums">{value}</span>;
}
