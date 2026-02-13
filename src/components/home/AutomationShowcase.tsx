import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Users, MessageCircle, Mail, LayoutDashboard } from "lucide-react";
import { useRef } from "react";

const steps = [
  { icon: FileText, label: "Lead Form" },
  { icon: Users, label: "CRM" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email" },
  { icon: LayoutDashboard, label: "Dashboard" },
];

export default function AutomationShowcase() {
  const { ref, visible } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -30]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 relative overflow-hidden">
      <div className="aurora-bg" />
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div style={{ y }} className={`text-center mb-20 section-fade-in ${visible ? "visible" : ""}`}>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Your Business. <span className="gradient-text">On Autopilot.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Automated workflows that connect every part of your operations.
          </p>
        </motion.div>

        <div className={`flex flex-wrap items-center justify-center gap-3 md:gap-0 section-fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card-hover p-6 flex flex-col items-center gap-3 min-w-[120px] cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: -10 }}
                  className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
                >
                  <step.icon size={20} className="text-primary" />
                </motion.div>
                <span className="text-xs font-medium text-foreground">{step.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden md:block w-12 h-px mx-1 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className="w-full h-full bg-gradient-to-r from-primary/40 to-primary/10 origin-left"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
