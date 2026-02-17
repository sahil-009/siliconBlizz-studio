import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

const twitterReviews = [
  {
    name: "Arjun Mehta",
    handle: "@arjunmehta_dev",
    avatar: "_.jpeg",
    text: "Just switched our entire workflow to @SiliconBlizz automation  we've saved 20+ hours a week. Absolutely insane ROI. 🔥",
    date: "Jan 12, 2026",
    likes: 248,
    retweets: 42,
  },
  {
    name: "Priya Sharma",
    handle: "@priya_growth",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
    text: "Our Instagram engagement tripled in 2 months after @SiliconBlizz set up our social automation pipeline. Can't recommend enough! 🚀",
    date: "Feb 3, 2026",
    likes: 189,
    retweets: 31,
  },
  {
    name: "Rajesh Kumar",
    handle: "@rajesh_tech",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    text: "The custom dashboard @SiliconBlizz built for us is a game changer. Real time KPIs, automated reports  feels like magic. ✨",
    date: "Jan 28, 2026",
    likes: 312,
    retweets: 56,
  },
  {
    name: "Neha Patel",
    handle: "@neha_startup",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=100&q=80",
    text: "We went from zero to fully automated CRM + WhatsApp in under 3 weeks with @SiliconBlizz. The team is world class. 💯",
    date: "Feb 8, 2026",
    likes: 156,
    retweets: 28,
  },
  {
    name: "Vikram Singh",
    handle: "@vikram_ceo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    text: "Honestly didn't think automation could replace our manual processes this well. @SiliconBlizz proved me wrong. 10/10 would recommend.",
    date: "Jan 20, 2026",
    likes: 201,
    retweets: 38,
  },
  {
    name: "Ananya Reddy",
    handle: "@ananya_growth",
    avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=100&q=80",
    text: "Best tech partner we've ever worked with. @SiliconBlizz doesn't just build they think through your entire business flow. 🙌",
    date: "Feb 10, 2026",
    likes: 275,
    retweets: 49,
  },
];

export default function TwitterReviewsSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What People Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base sm:text-lg">
            Real tweets from real customers who love working with us.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {twitterReviews.map((review, i) => (
            <motion.div
              key={review.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-5 sm:p-6 break-inside-avoid relative overflow-hidden"
            >
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.handle}</p>
                </div>
                <svg className="ml-auto flex-shrink-0 w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed mb-3">{review.text}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{review.date}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                  {review.likes}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
                  {review.retweets}
                </span>
              </div>
              <Meteors number={4} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
