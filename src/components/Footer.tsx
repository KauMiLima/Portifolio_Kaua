import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="font-display text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            Kaua
          </motion.a>

          {/* Copyright */}
          <p className="text-muted-foreground font-body text-sm flex items-center gap-1">
            Feito por Kaua © {new Date().getFullYear()}
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
