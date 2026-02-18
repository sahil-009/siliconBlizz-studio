import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Settings, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Globe, Workflow, BarChart3, MessageCircle } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";

const Globe3D = lazy(() => import("@/components/ui/3d-globe"));

const globeMarkers = [
  { lat: 40.7128, lng: -74.006, src: "/founder-images/sahil.jpeg", label: "India" },
  { lat: 51.5074, lng: -0.1278, src: "/founder-images/rohit.jpeg", label: "India" },
  { lat: 35.6762, lng: 139.6503, src: "/founder-images/allen.jpeg", label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, src: "/founder-images/anwishka.jpeg", label: "India" },

];

const projectTypes = ["Website / App", "Automation System", "CRM / WhatsApp", "Dashboard / Tool", "Full Digital Infrastructure", "Other"];

const solutionSections = [
  {
    icon: Globe,
    title: "Websites & Apps",
    desc: "Conversion optimized, blazing fast websites and scalable web applications tailored for your brand and growth goals.",
    features: ["Custom design & development", "Responsive across all devices", "SEO-optimized architecture", "Performance-first approach"],
  },
  {
    icon: Workflow,
    title: "Automation Workflows",
    desc: "End to end automation using n8n, Zapier, and custom API integrations that eliminate repetitive tasks.",
    features: ["Lead capture automation", "Data sync between tools", "Scheduled report generation", "Custom API integrations"],
  },
  {
    icon: MessageCircle,
    title: "CRM & WhatsApp Systems",
    desc: "Automated customer relationship management with WhatsApp Business API integration for instant engagement.",
    features: ["WhatsApp chatbot flows", "CRM pipeline automation", "Follow-up sequences", "Customer segmentation"],
  },
  {
    icon: BarChart3,
    title: "Dashboards & Internal Tools",
    desc: "Custom analytics dashboards and internal tools that give you real time visibility into your operations.",
    features: ["Real-time data visualization", "KPI tracking dashboards", "Custom admin panels", "Automated reporting"],
  },
];

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL ?? 'http://localhost:5000/api/contact';

export default function SolutionsAndContact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, "leads"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", company: "", type: "", description: "" });

      // Send email via backend
      try {
        const response = await fetch(contactApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone || '',
            company: form.company,
            propertyType: form.type,
            message: form.description,
          }),
        });

        const json = await response.json().catch(() => ({}));

        if (!response.ok) {
          // Lead was already saved to Firestore; if only email failed, still show success
          if (response.status === 500 || response.status === 503) {
            console.warn('Email notification failed, but lead was saved to Firestore');
            return;
          }
          throw new Error(json.error || 'Failed to submit form');
        }

        console.log('Form submitted successfully:', json);
      } catch (emailError) {
        console.error("Failed to send email notif:", emailError);
        // We don't block success UI if only email fails, since Firestore saved it
      }

    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Solutions */}
      <section id="solutions" className="py-20 sm:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-6">
              Digital Systems Designed{" "}
              <span className="gradient-text">for Scale</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              From beautiful frontends to invisible backend automation we build the systems that power modern businesses.
            </p>
          </motion.div>

          <div className="space-y-6">
            {solutionSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.005 }}
                className="glass-card-hover p-6 sm:p-10 cursor-default"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"
                  >
                    <section.icon size={26} className="text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold mb-3">{section.title}</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl">{section.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                          <Settings size={14} className="text-primary flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Meteors number={10} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-32 relative overflow-hidden">
        <div className="aurora-bg" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-6">
              Let's <span className="gradient-text">Build Together</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              Tell us about your project. We'll get back within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {submitted ? (
                <div className="glass-card p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">Message Sent</h3>
                  <p className="text-muted-foreground">We'll be in touch shortly to discuss your project.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                      {error}
                    </div>
                  )}
                  {[
                    { key: "name", label: "Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "company", label: "Company", type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <input
                        required
                        type={field.type}
                        placeholder={field.label}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full rounded-xl border border-border bg-card/60 backdrop-blur-sm px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none glow-border-focus transition-all duration-300 hover:border-border/80"
                      />
                    </div>
                  ))}
                  <select
                    required
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded-xl border border-border bg-card/60 backdrop-blur-sm px-5 py-3.5 text-sm text-foreground outline-none glow-border-focus appearance-none transition-all duration-300 hover:border-border/80"
                  >
                    <option value="" disabled className="bg-card text-muted-foreground">Project Type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-card text-foreground">{t}</option>
                    ))}
                  </select>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full rounded-xl border border-border bg-card/60 backdrop-blur-sm px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none glow-border-focus resize-none transition-all duration-300 hover:border-border/80"
                  />
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 animate-pulse-glow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Start My Project"
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              {/* 3D Globe */}
              <div className="block h-[450px] lg:h-full w-full lg:w-[140%] -ml-4 lg:-ml-[20%] overflow-visible relative z-0">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Loading globe...</div>}>
                  <Globe3D
                    markers={globeMarkers}
                    config={{ atmosphereColor: "#7c3aed", atmosphereIntensity: 15, bumpScale: 3, autoRotateSpeed: 0.4 }}
                  />
                </Suspense>
              </div>


            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
