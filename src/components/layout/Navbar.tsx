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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-sm font-medium transition-colors duration-300 text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
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
                  className="py-3 text-left text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
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
