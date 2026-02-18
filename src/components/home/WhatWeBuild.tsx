import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Workflow, BarChart3 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef } from "react";
import { Meteors } from "@/components/ui/meteors";

const pillars = [
  {
    icon: Globe,
    title: "Digital Presence",
    desc: "We design, build, and manage your entire application from website and database to chatbot and WhatsApp integrations. ",
  },
  {
    icon: Workflow,
    title: "Automation Systems",
    desc: "n8n workflows, CRM automation, WhatsApp bots, API integrations, and Instagram automation posts, reels, auto DMs, and comment replies with genuine engagement.",
  },
  {
    icon: BarChart3,
    title: "Growth Infrastructure",
    desc: "Dashboards, analytics systems, and performance tracking at scale.",
  },
];

export default function WhatWeBuild() {
  const { ref, visible } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="what-we-build" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div style={{ y }} className={`text-center mb-16 section-fade-in ${visible ? "visible" : ""}`}>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Complete Digital <span className="gradient-text">Infrastructure</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Everything you need to build, automate, and scale your digital operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`glass-card-hover p-8 cursor-default section-fade-in ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6"
              >
                <item.icon size={22} className="text-primary" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              <Meteors number={12} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
