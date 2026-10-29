import { motion } from "framer-motion";
import { FileText, Users, MessageCircle, Mail, LayoutDashboard } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  { icon: FileText, label: "Lead Form" },
  { icon: Users, label: "CRM" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email" },
  { icon: LayoutDashboard, label: "Dashboard" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function AutomationShowcase() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="aurora-bg" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="How it flows"
          title={<>Your Business. <span className="gradient-text">On Autopilot.</span></>}
          description="Automated workflows that connect every part of your operations."
          className="mb-12 sm:mb-20"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-0"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              variants={{ hidden: { opacity: 0, y: 24, scale: 0.92 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center"
            >
              <div className="group glass-card-hover p-4 sm:p-6 flex flex-col items-center gap-3 min-w-[96px] sm:min-w-[120px] cursor-default">
                <div className="relative w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  {/* Soft halo that pulses in sequence across the chain */}
                  <span
                    className="absolute inset-0 rounded-full border border-primary/40 animate-ping motion-reduce:hidden [animation-duration:3s]"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  />
                  <step.icon size={20} className="text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block relative w-14 lg:w-16 h-px mx-1">
                  <motion.div
                    variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                    transition={{ duration: 0.8, ease }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/10 origin-left"
                  />
                  {/* Data packet travelling to the next step */}
                  <span
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_3px_hsl(var(--glow-purple)/0.7)] animate-packet motion-reduce:hidden"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
