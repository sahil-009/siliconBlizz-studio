import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

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
    <section id="case-studies" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Real results from real businesses we've helped transform.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                active === f
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((c) => (
              <motion.div
                key={c.project}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card-hover p-8 cursor-default"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-primary border border-primary/20 rounded-full px-3 py-1">
                    {c.industry}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{c.project}</h3>
                <p className="text-muted-foreground text-sm mb-2"><strong className="text-secondary-foreground">Problem:</strong> {c.problem}</p>
                <p className="text-muted-foreground text-sm mb-4"><strong className="text-secondary-foreground">Solution:</strong> {c.solution}</p>
                <p className="metric-glow text-3xl font-display font-bold">{c.result}</p>
                <Meteors number={8} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
