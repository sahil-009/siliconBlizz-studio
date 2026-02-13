import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Meteors } from "@/components/ui/meteors";

const cases = [
  { metric: "+30%", label: "Bookings in 60 Days", desc: "Healthcare clinic automated patient intake and follow-ups." },
  { metric: "20+ hrs", label: "Saved / Week", desc: "Marketing agency replaced manual CRM processes with automation." },
];

export default function CaseStudyPreview() {
  const { ref, visible } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="py-32" id="case-studies-preview">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div style={{ y }} className={`text-center mb-16 section-fade-in ${visible ? "visible" : ""}`}>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Real <span className="gradient-text">Results</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {cases.map((c, i) => (
            <motion.div
              key={c.label}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`glass-card-hover p-10 cursor-default section-fade-in ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <p className="metric-glow text-5xl font-display font-bold mb-2">{c.metric}</p>
              <p className="text-foreground font-semibold text-lg mb-3">{c.label}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              <Meteors number={10} />
            </motion.div>
          ))}
        </div>

        <div className={`text-center section-fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <button
            onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105"
          >
            View All Case Studies
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
