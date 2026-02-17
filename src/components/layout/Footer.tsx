import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold mb-3">
              Silicon<span className="text-primary">Blizz</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              AI Powered Digital & Automation Studio. We build websites, scalable apps, AI automation systems, and digital growth infrastructure.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Navigate</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Solutions", path: "/solutions" },
                { label: "Case Studies", path: "/case-studies" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <a href="mailto:hello@siliconblizz.in" className="hover:text-foreground transition-colors">hello@siliconblizz.in</a>
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
