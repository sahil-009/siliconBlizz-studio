import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const contactOptions = [
    {
        icon: Phone,
        label: "Call Us",
        value: "+91 6370008924",
        href: "tel:+916370008924",
    },
    {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "Chat with us",
        href: "https://wa.me/916370008924",
    },
    {
        icon: Mail,
        label: "Email Us",
        value: "info.siliconblizz@gmail.com",
        href: "mailto:info.siliconblizz@gmail.com",
    },
    {
        icon: MapPin,
        label: "Visit Studio",
        value: "Jayanagar, Bangalore, India",
        href: "https://maps.google.com/?q=Jayanagar+Bangalore+India",
    },
];

export function EnquireSidebar({ children }: { children: React.ReactNode }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-border/50 w-[400px] sm:w-[540px]">
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-3xl font-display font-medium text-foreground">Get in <span className="text-primary">Touch</span></SheetTitle>
                    <p className="text-muted-foreground text-sm">
                        Ready to transform your space? Contact us directly through any of the channels below.
                    </p>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                    {contactOptions.map((option, index) => (
                        <motion.a
                            key={option.label}
                            href={option.href}
                            target={option.href.startsWith("http") ? "_blank" : undefined}
                            rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
                        >
                            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                <option.icon size={22} />
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground block mb-1 uppercase tracking-wider">{option.label}</span>
                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {option.value}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
