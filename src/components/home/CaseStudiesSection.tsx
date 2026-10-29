import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { scrollToSection } from "@/lib/scroll";

const filters = ["All", "Interior", "Agencies", "Startups"];

const caseStudies = [
  {
    project: "RU interior Designs",
    industry: "Interior",
    problem: "Manual client management and follow up processes causing 40% drop-off rate.",
    solution: "from creating website to managing clients and follow ups and handle social media",
    result: "+30% Bookings in 60 Days",
    category: "Interior",
  },
  {
    project: "HM interior Designs",
    industry: "Interior",
    problem: "Team spent 20+ hours weekly on manual reporting and client communication.",
    solution: "n8n automation for report generation, Slack notifications, and CRM sync.",
    result: "20+ Hours Saved / Week",
    category: "Interior",
  },
  {
    project: "LaunchPad SaaS",
    industry: "Startups",
    problem: "No unified system for tracking leads, onboarding users, or monitoring KPIs.",
    solution: "Custom dashboard, automated onboarding emails, and analytics infrastructure.",
    result: "3x Lead Conversion",
    category: "Startups",
  },
  {
    project: "JK interior Designs",
    industry: "Interior",
    problem: "Manual client management and follow up processes causing 40% drop-off rate.",
    solution: "from creating website to managing clients and follow ups and handle social media",
    result: "45% Fewer No-Shows",
    category: "Interior",
  },
];

export default function CaseStudiesSection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? caseStudies : caseStudies.filter((c) => c.category === active);

  return (
    <section id="case-studies" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Case studies"
          title={<>Case <span className="gradient-text">Studies</span></>}
          description="Real results from real businesses we've helped transform."
        />

        <div className="flex justify-center mb-8 sm:mb-12">
          <div role="tablist" aria-label="Filter case studies" className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-border/50 bg-card/40 p-1 backdrop-blur-sm">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  active === f ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === f && (
                  <motion.span
                    layoutId="case-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-primary/15 border border-primary/40"
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ staggerChildren: 0.08 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {filtered.length === 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="md:col-span-2 glass-card p-10 text-center"
              >
                <p className="font-display text-xl font-semibold mb-2">Your story could be next</p>
                <p className="text-muted-foreground text-sm mb-6">We're currently working with {active.toLowerCase()} — case studies are on the way.</p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-5 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  Start a project <ArrowRight size={15} />
                </button>
              </motion.div>
            )}
            {filtered.map((c) => (
              <motion.div
                key={c.project}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group glass-card-hover p-6 sm:p-8 cursor-default flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-medium text-primary border border-primary/20 bg-primary/5 rounded-full px-3 py-1">
                    {c.industry}
                  </span>
                  <ArrowUpRight size={18} className="text-muted-foreground/50 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{c.project}</h3>
                <p className="text-muted-foreground text-sm mb-2"><strong className="text-secondary-foreground">Problem:</strong> {c.problem}</p>
                <p className="text-muted-foreground text-sm mb-6"><strong className="text-secondary-foreground">Solution:</strong> {c.solution}</p>
                <div className="mt-auto pt-5 border-t border-border/40">
                  <p className="metric-glow text-2xl sm:text-3xl font-display font-bold">{c.result}</p>
                </div>
                <Meteors number={8} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
