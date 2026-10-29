import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// Devices with a mouse/trackpad that can hover
export const useHasFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
