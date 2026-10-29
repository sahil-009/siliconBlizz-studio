import { useMemo } from "react";
import { cn } from "@/lib/utils";

export const Meteors = ({ number = 20, className }: { number?: number; className?: string }) => {
  // Randomise once per mount; re-rolling on every render made meteors jump around
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, () => ({
        left: Math.floor(Math.random() * 100) + "%",
        animationDelay: Math.random() * 1 + 0.2 + "s",
        animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
      })),
    [number]
  );

  return (
    <>
      {meteors.map((style, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          className={cn(
            // Purely decorative and dozens run at once, so skip them on phones and for reduced motion
            "hidden md:block md:motion-reduce:hidden pointer-events-none",
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-accent-foreground/60 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-primary/40 before:to-transparent",
            className
          )}
          style={{ top: 0, ...style }}
        />
      ))}
    </>
  );
};
