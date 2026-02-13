import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Users, Zap, Globe, Shield } from "lucide-react";
import { lazy, Suspense, useRef } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

const HeroScene = lazy(() => import("../HeroScene"));

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AuroraBackground className="min-h-screen" showRadialGradient={true}>
      <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden w-full">
        {/* Background beams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 pt-32 sm:pt-24 pb-20 sm:pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div style={{ y: textY, opacity }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary mb-6 border border-primary/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  AI-Powered Digital Studio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6"
              >
                Build Once.{" "}
                <span className="gradient-text glow-text">Automate Everything.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-muted-foreground max-w-md leading-relaxed mb-8"
              >
                We build websites, apps, and AI-powered automation systems that scale your business — so you can focus on what matters most.
              </motion.p>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-6 mb-10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                        <Users size={12} className="text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">1,000+</span> happy customers
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-primary">★</span>
                    ))}
                  </div>
                  4.9/5 rating
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollTo("contact")}
                  className="rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 hover:scale-105 animate-pulse-glow"
                >
                  Book Strategy Call
                </button>
                <button
                  onClick={() => scrollTo("solutions")}
                  className="group flex items-center gap-2 rounded-lg border border-border px-7 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:scale-105"
                >
                  Explore Solutions
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right 3D scene */}
            <motion.div
              style={{ y: sceneY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[300px] lg:h-[500px] relative w-full"
            >
              <Suspense fallback={<div className="w-full h-full" />}>
                <HeroScene />
              </Suspense>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-6 sm:bottom-16 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 sm:px-6"
        >
          <div className="glass-card rounded-2xl px-4 sm:px-8 py-4 sm:py-5 grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-4 sm:gap-6">
            {[
              { icon: Users, value: "1000+", label: "Happy Customers" },
              { icon: Zap, value: "100+", label: "Automations Built" },
              { icon: Globe, value: "9+", label: "Countries Served" },
              { icon: Shield, value: "99.9%", label: "Uptime Guarantee" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon size={14} className="text-primary sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-sm sm:text-lg font-bold text-foreground leading-none">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-border/50 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-primary/60"
            />
          </div>
        </motion.div>
      </section>
    </AuroraBackground>
  );
}
