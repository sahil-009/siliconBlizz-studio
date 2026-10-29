import { scrollToSection } from "@/lib/scroll";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-[max(3rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-2">
            <h3 className="font-display text-xl font-bold mb-3">
              Silicon<span className="text-primary">Blizz</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              AI Powered Digital & Automation Studio. We build websites, scalable apps, AI automation systems, and digital growth infrastructure.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Navigate</h4>
            <div className="flex flex-col items-start gap-2.5">
              {[
                { label: "Solutions", id: "solutions" },
                { label: "Case Studies", id: "case-studies" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <a href="mailto:hello@siliconblizz.in" className="break-all hover:text-foreground transition-colors">hello@siliconblizz.in</a>
              <span>India</span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Silicon Blizz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
