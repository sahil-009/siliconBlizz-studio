import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { EnquireSidebar } from "@/components/ui/enquire-sidebar";
import { scrollToSection } from "@/lib/scroll";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "Solutions", id: "solutions" },
  { label: "Case Studies", id: "case-studies" },
  { label: "Contact", id: "contact" },
];

const enquireButtonClass =
  "rounded-lg bg-primary/10 border border-primary/30 px-4 sm:px-5 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:scale-105 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active section = the last one whose top has passed 40% of the viewport
      const marker = window.innerHeight * 0.4;
      let current = "hero";
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu if the viewport grows to desktop size
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => mql.matches && setMenuOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled || menuOpen ? "glass-nav-solid" : "glass-nav"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <button onClick={() => handleNav("hero")} className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
          Silicon<span className="text-primary">Blizz</span>
        </button>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex items-center rounded-full border border-border/40 bg-card/30 p-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 lg:px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30 shadow-[0_0_16px_-4px_hsl(var(--glow-purple)/0.5)]"
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>
          <EnquireSidebar>
            <button className={enquireButtonClass}>Enquire Now</button>
          </EnquireSidebar>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <EnquireSidebar>
            <button className={enquireButtonClass}>Enquire Now</button>
          </EnquireSidebar>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-border/30"
          >
            <div className="container mx-auto flex flex-col px-4 py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`py-3 text-left text-base font-medium transition-colors hover:text-foreground ${
                    active === item.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
