import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { SectionHeading } from "@/components/ui/section-heading";
import { CountUp } from "@/components/ui/count-up";
import { scrollToSection } from "@/lib/scroll";

const cases = [
  { metric: "+30%", label: "Bookings in 60 Days", desc: "Healthcare clinic automated patient intake and follow ups." },
  { metric: "20+ hrs", label: "Saved / Week", desc: "Marketing agency replaced manual CRM processes with automation." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaseStudyPreview() {
  return (
    <section className="py-20 sm:py-32" id="case-studies-preview">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Impact" title={<>Real <span className="gradient-text">Results</span></>} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12"
        >
          {cases.map((c) => (
            <motion.div
              key={c.label}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease }}
              className="group glass-card-hover p-6 sm:p-10 cursor-default"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="metric-glow text-4xl sm:text-6xl font-display font-bold tracking-tight">
                  <CountUp value={c.metric} />
                </p>
                <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:-translate-y-1">
                  <TrendingUp size={18} className="text-emerald-400" />
                </div>
              </div>
              <p className="text-foreground font-semibold text-lg mb-3">{c.label}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              <Meteors number={10} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="text-center"
        >
          <button
            onClick={() => scrollToSection("case-studies")}
            className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
          >
            View All Case Studies
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
