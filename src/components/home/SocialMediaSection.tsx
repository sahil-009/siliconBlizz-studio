import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Megaphone, TrendingUp, Clock, Users } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";

const teamMembers = [
  { id: 1, name: "Sahil Mund", designation: "Founder and Developer", image: "/founder-images/sahil.jpeg" },
  { id: 2, name: "Rohit Dey", designation: "Co Founder & Marketing Lead", image: "/founder-images/rohit.jpeg" },
  { id: 3, name: "Allen Ritter", designation: "Design & Content", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Anwiksha Dutta", designation: "Head Sales Executive", image: "/founder-images/anwishka.jpeg" },
  { id: 5, name: "12+ Employees", designation: "Team", image: "/founder-images/12.png" },
];

const testimonials = [
  {
    quote: "They completely automated our social media pipeline  from content scheduling to analytics. We just focus on our business now.",
    name: "Arjun Mehta",
    designation: "Founder, GrowthLoop",
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote: "Our engagement tripled within two months. Their automation workflows for Instagram and WhatsApp are game changing.",
    name: "Priya Sharma",
    designation: "Marketing Head, BrandPulse",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote: "We used to spend 15 hours a week on social media. Now it's fully automated and performing better than ever.",
    name: "David Chen",
    designation: "CEO, NexaScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?auto=format&fit=crop&w=800&q=80",
  },
];

const features = [
  { icon: Megaphone, title: "Auto Publish Everywhere", desc: "Schedule and auto post across Instagram, LinkedIn, Twitter, and Facebook." },
  { icon: TrendingUp, title: "AI Powered Analytics", desc: "Track performance, engagement, and ROI with automated reporting." },
  { icon: Clock, title: "Save 20+ Hours/Week", desc: "Eliminate repetitive tasks with end to end social media automation." },
  { icon: Users, title: "Community on Autopilot", desc: "Auto respond, engage followers, and nurture leads automatically." },
];

export default function SocialMediaSection() {
  return (
    <section id="social-media" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Social Media Automation —{" "}
            <span className="gradient-text">Join Us & Forget Worries</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10">
            We handle your entire social media presence  from content creation to posting, analytics, and community management. All automated.
          </p>

          {/* Team tooltip row */}
          <div className="flex flex-row items-center justify-center w-full mb-4">
            <AnimatedTooltip items={teamMembers} />
          </div>
          <p className="text-sm text-muted-foreground">Our dedicated automation team</p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card-hover p-8 text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
              <Meteors number={6} />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-3xl font-bold text-center mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h3>
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </motion.div>
      </div>
    </section>
  );
}
