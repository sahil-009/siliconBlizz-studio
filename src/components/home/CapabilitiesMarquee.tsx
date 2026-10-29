import { Bot, Database, Globe, LayoutDashboard, MessageCircle, Smartphone, Sparkles, Workflow, Zap, Instagram } from "lucide-react";

const items = [
  { icon: Globe, label: "Websites" },
  { icon: Workflow, label: "n8n Workflows" },
  { icon: MessageCircle, label: "WhatsApp Bots" },
  { icon: Database, label: "CRM Automation" },
  { icon: Bot, label: "AI Chatbots" },
  { icon: LayoutDashboard, label: "Dashboards" },
  { icon: Instagram, label: "Social Automation" },
  { icon: Smartphone, label: "Web Apps" },
  { icon: Zap, label: "API Integrations" },
  { icon: Sparkles, label: "AI Agents" },
];

export default function CapabilitiesMarquee() {
  return (
    <section aria-label="What we work with" className="relative py-8 sm:py-10 border-y border-border/30 bg-background/40 backdrop-blur-sm overflow-hidden">
      <div className="mask-fade-x group flex">
        {/* Two identical tracks so the -50% translate loops seamlessly */}
        <div className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14">
              {items.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 whitespace-nowrap text-sm sm:text-base font-medium text-muted-foreground/80 transition-colors hover:text-foreground">
                  <Icon size={18} className="text-primary/70" />
                  {label}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
