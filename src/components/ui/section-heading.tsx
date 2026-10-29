import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** Shared heading for every home section: eyebrow pill, title and description reveal in sequence. */
export function SectionHeading({ eyebrow, title, description, className, children }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.1 }}
      className={cn("text-center mb-10 sm:mb-16", className)}
    >
      <motion.span
        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, ease }}
        className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 sm:mb-5 border border-primary/20 bg-primary/5 rounded-full px-3.5 py-1.5"
      >
        <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_2px_hsl(var(--glow-purple)/0.6)]" />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={{ hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
        transition={{ duration: 0.8, ease }}
        className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease }}
          className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}
