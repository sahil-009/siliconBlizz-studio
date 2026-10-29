import { motion } from "framer-motion";
import { Globe, Workflow, BarChart3 } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { SectionHeading } from "@/components/ui/section-heading";

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

const ease = [0.16, 1, 0.3, 1] as const;

export default function WhatWeBuild() {
  return (
    <section id="what-we-build" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we build"
          title={<>Complete Digital <span className="gradient-text">Infrastructure</span></>}
          description="Everything you need to build, automate, and scale your digital operations."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease }}
              className="group glass-card-hover p-6 sm:p-8 cursor-default"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_-4px_hsl(var(--glow-purple)/0.6)]">
                  <item.icon size={22} className="text-primary" />
                </div>
                <span className="font-display text-sm font-semibold text-muted-foreground/50 tabular-nums transition-colors duration-500 group-hover:text-primary/70">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent origin-left scale-x-[0.25] transition-transform duration-700 ease-out group-hover:scale-x-100" />
              <Meteors number={12} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
