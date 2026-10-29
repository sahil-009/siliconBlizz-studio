import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Users, Zap, Globe, Shield } from "lucide-react";
import { lazy, Suspense, useRef } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useMediaQuery } from "@/hooks/use-media-query";
import { scrollToSection } from "@/lib/scroll";
import { CountUp } from "@/components/ui/count-up";

const ease = [0.16, 1, 0.3, 1] as const;
const headline = [
  { text: "Build", accent: false },
  { text: "Once.", accent: false },
  { text: "Automate", accent: true },
  { text: "Everything.", accent: true },
];
const teamAvatars = ["/founder-images/sahil.webp", "/founder-images/rohit.webp", "/founder-images/foreign.webp", "/founder-images/anwishka.webp"];

const HeroScene = lazy(() => import("../HeroScene"));

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  // Only mount (and download) the WebGL scene where it's actually shown
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <AuroraBackground showRadialGradient={true}>
      <section ref={ref} id="hero" className="relative min-h-svh flex flex-col justify-center overflow-hidden w-full">
        {/* Background beams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </div>
        {/* Fine grid that fades out from the top-right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.07] [background-image:linear-gradient(hsl(var(--glow-purple))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--glow-purple))_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]"
        />

        <div className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-28 lg:pt-24 pb-12 sm:pb-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div style={{ y: textY, opacity }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-medium tracking-widest uppercase text-primary mb-6 border border-primary/20 bg-primary/5 rounded-full pl-3 pr-4 py-1.5 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  AI Powered Digital Studio
                </span>
              </motion.div>

              <h1 className="font-display text-[2.25rem] min-[400px]:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6">
                {headline.map((word, i) => (
                  <motion.span
                    key={word.text}
                    initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                    className={`inline-block ${word.accent ? "gradient-text-animated glow-text" : ""}`}
                  >
                    {word.text}
                    {i < headline.length - 1 && "\u00A0"}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease }}
                className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-8"
              >
                We build websites, apps, and AI powered automation systems that scale your business so you can focus on what matters most.
              </motion.p>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2.5">
                    {teamAvatars.map((src, i) => (
                      <motion.img
                        key={src}
                        src={src}
                        alt=""
                        width={32}
                        height={32}
                        initial={{ opacity: 0, scale: 0.6, x: -8 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.65 + i * 0.07, ease }}
                        className="w-8 h-8 rounded-full border-2 border-background object-cover object-top"
                      />
                    ))}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.95, ease }}
                      className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-semibold text-primary"
                    >
                      +12
                    </motion.div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">500+</span> happy customers
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
                transition={{ duration: 0.8, delay: 0.65, ease }}
                className="flex flex-col min-[400px]:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <a
                  href="https://wa.me/916370008924"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheen group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-center text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 hover:scale-[1.03] animate-pulse-glow"
                >
                  Enquire Now
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <button
                  onClick={() => scrollToSection("solutions")}
                  className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-card/40 backdrop-blur-sm px-7 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:scale-[1.03]"
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
              className="hidden lg:block h-[420px] xl:h-[500px] relative w-full"
            >
              {isDesktop && (
                <Suspense fallback={<div className="w-full h-full" />}>
                  <HeroScene />
                </Suspense>
              )}
            </motion.div>
          </div>
        </div>

        {/* Stats bar: in normal flow so it can never overlap the content on short screens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="hidden sm:block relative z-10 mx-auto mb-16 lg:mb-20 w-full max-w-3xl px-4 sm:px-6"
        >
          <div className="glass-card rounded-2xl px-4 sm:px-8 py-4 sm:py-5 grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-4 sm:gap-6 sm:divide-x sm:divide-border/40 [&>*:not(:first-child)]:sm:pl-6">
            {[
              { icon: Users, value: "500+", label: "Happy Customers" },
              { icon: Zap, value: "200+", label: "Automations Built" },
              { icon: Globe, value: "9+", label: "Countries Served" },
              { icon: Shield, value: "98.9%", label: "Uptime Guarantee" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon size={14} className="text-primary sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-sm sm:text-lg font-bold text-foreground leading-none mb-1"><CountUp value={stat.value} delay={1 + i * 0.1} /></p>
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
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1"
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
