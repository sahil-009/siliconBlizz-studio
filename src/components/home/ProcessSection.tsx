import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";

const steps = ["Strategy", "Build", "Automate", "Scale"];

export default function ProcessSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 section-fade-in ${visible ? "visible" : ""}`}>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-4 md:gap-0 section-fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3 cursor-default min-w-[90px]"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center"
                >
                  <span className="text-base sm:text-lg font-bold text-primary">{i + 1}</span>
                </motion.div>
                <span className="text-sm sm:text-base font-medium text-foreground text-center">{step}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden md:block w-12 lg:w-20 h-px mx-2 lg:mx-4 -mt-6 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="w-full h-full bg-gradient-to-r from-primary/30 to-primary/10 origin-left"
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
