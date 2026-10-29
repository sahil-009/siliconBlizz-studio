import { motion, useScroll, useSpring } from "framer-motion";
import { Compass, Hammer, Workflow, Rocket } from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  { icon: Compass, title: "Strategy", desc: "We map your workflows, bottlenecks and goals into a clear plan." },
  { icon: Hammer, title: "Build", desc: "Design and develop your website, app or system, fast and pixel-perfect." },
  { icon: Workflow, title: "Automate", desc: "Connect your tools with n8n, CRM and WhatsApp so work runs itself." },
  { icon: Rocket, title: "Scale", desc: "Track performance, iterate and grow without adding headcount." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  // The timeline fills as the steps scroll through the viewport
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Process"
          title={<>Our <span className="gradient-text">Process</span></>}
          description="A simple, proven path from idea to a business that runs on autopilot."
        />

        <div ref={trackRef} className="relative max-w-5xl mx-auto">
          {/* Timeline: vertical on mobile, horizontal on desktop */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-border/50 md:left-[12.5%] md:right-[12.5%] md:top-6 md:bottom-auto md:w-auto md:h-px" />
          <motion.div
            style={{ scaleY: progress }}
            className="md:hidden absolute left-6 top-6 bottom-6 w-px origin-top bg-gradient-to-b from-primary via-primary/70 to-primary/20"
          />
          <motion.div
            style={{ scaleX: progress }}
            className="hidden md:block absolute left-[12.5%] right-[12.5%] top-6 h-px origin-left bg-gradient-to-r from-primary via-primary/70 to-primary/20 shadow-[0_0_12px_hsl(var(--glow-purple)/0.6)]"
          />

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.15 }}
            className="relative grid gap-8 md:grid-cols-4 md:gap-6"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease }}
                className="group relative flex gap-5 md:flex-col md:items-center md:text-center md:gap-0"
              >
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full border border-primary/40 bg-background flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_24px_-2px_hsl(var(--glow-purple)/0.6)]">
                  <step.icon size={20} className="text-primary" />
                </div>
                <div className="pt-1 md:pt-6">
                  <span className="block text-xs font-medium tracking-widest text-primary/70 mb-1">STEP 0{i + 1}</span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed md:max-w-[220px] md:mx-auto">{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
