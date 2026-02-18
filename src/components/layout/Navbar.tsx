import { useState, useEffect } from "react";
import { EnquireSidebar } from "@/components/ui/enquire-sidebar";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "Solutions", id: "solutions" },
  { label: "Case Studies", id: "case-studies" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav-solid" : "glass-nav"}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <button onClick={() => scrollTo("hero")} className="font-display text-xl font-bold tracking-tight text-foreground">
          Silicon<span className="text-primary">Blizz</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium transition-colors duration-300 text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
          <EnquireSidebar>
            <button
              className="rounded-lg bg-primary/10 border border-primary/30 px-5 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:scale-105 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
            >
              Enquire Now
            </button>
          </EnquireSidebar>
        </div>

        <div className="md:hidden">
          <EnquireSidebar>
            <button
              className="rounded-lg bg-primary/10 border border-primary/30 px-5 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:scale-105 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
            >
              Enquire Now
            </button>
          </EnquireSidebar>
        </div>
      </div>
    </nav>
  );
}
