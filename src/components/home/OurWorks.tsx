import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
    CardContainer,
    CardBody,
    CardItem,
} from "@/components/ui/3d-card";

const projects = [
    {
        name: "RU Interior Designs",
        category: "Interior",
        description:
            "Full website build, CRM setup, automated client follow-ups, and complete social media management.",
        url: "https://ruinteriordesigns.in",
        image: "/works/ru-interior.png",
        tags: ["Website", "CRM", "Automation"],
    },
    {
        name: "HM Interior Designs",
        category: "Interior",
        description:
            "Automated reporting pipeline, Slack notifications, and CRM sync — saving 20+ hours per week.",
        url: "https://interior-studio-tau.vercel.app/",
        image: "/works/hm-interior.png",
        tags: ["Automation", "CRM", "Reporting"],
    },
    {
        name: "Living Spaces Showcase",
        category: "Interior",
        description:
            "Luxury interior design showcase with immersive scroll-driven animations and premium visual storytelling.",
        url: "https://living-spaces-showcase.vercel.app/",
        image: "/works/living-spaces.png",
        tags: ["Website", "Animation", "Design"],
    },
];

export default function OurWorks() {
    return (
        <section className="py-16 sm:py-24 lg:py-32">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                        Our <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Live projects we've built and shipped for real businesses.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <CardContainer containerClassName="py-6">
                                <CardBody className="bg-card/60 relative border border-border/50 rounded-2xl p-6 w-full h-auto">
                                    {/* Category + Live link */}
                                    <CardItem
                                        translateZ={20}
                                        className="flex items-center justify-between w-full mb-3"
                                    >
                                        <span className="text-xs font-medium text-primary border border-primary/20 rounded-full px-3 py-1">
                                            {project.category}
                                        </span>
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-300 group"
                                        >
                                            View Live
                                            <ExternalLink
                                                size={13}
                                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </a>
                                    </CardItem>

                                    {/* Title */}
                                    <CardItem
                                        translateZ={30}
                                        className="font-display text-xl font-bold text-foreground mb-1 w-full"
                                    >
                                        {project.name}
                                    </CardItem>

                                    {/* Description */}
                                    <CardItem
                                        translateZ={20}
                                        className="text-muted-foreground text-sm mb-4 leading-relaxed w-full"
                                    >
                                        {project.description}
                                    </CardItem>

                                    {/* Website Preview Screenshot */}
                                    <CardItem
                                        translateZ={60}
                                        className="w-full rounded-xl overflow-hidden border border-border/40 mb-4"
                                    >
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block relative w-full h-44 overflow-hidden rounded-xl group"
                                        >
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium flex items-center gap-1.5">
                                                    Visit Site <ExternalLink size={14} />
                                                </span>
                                            </div>
                                        </a>
                                    </CardItem>

                                    {/* Tags + CTA */}
                                    <CardItem
                                        translateZ={20}
                                        className="flex items-center justify-between w-full"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10 text-primary/80"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-medium text-primary hover:underline"
                                        >
                                            Try now →
                                        </a>
                                    </CardItem>
                                </CardBody>
                            </CardContainer>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
