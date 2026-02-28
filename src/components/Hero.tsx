import { motion, Variants } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 glass-card rounded-full text-sm font-body text-muted-foreground">
              👋 Olá, eu sou
            </span>
          </motion.div>

          {/* Name */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              custom={1}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
            >
              <span className="gradient-text glow-text">Kaua</span>
            </motion.h1>
          </div>

          {/* Role */}
          <div className="overflow-hidden mb-8">
            <motion.h2
              custom={2}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-muted-foreground"
            >
              Desenvolvedor{' '}
              <span className="text-primary">Front-End</span>
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            custom={3}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Transformo ideias em experiências digitais memoráveis através de
            código limpo, design moderno e animações fluidas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 font-body font-medium overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-crimson to-red-intense transition-transform group-hover:scale-105" />
              <span className="relative text-foreground">Ver Projetos</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 font-body font-medium border border-border rounded-lg text-foreground hover:border-primary hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entrar em Contato
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            custom={5}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: 'https://github.com/KauMiLima', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/kaua-lima-ba6a87300/', label: 'LinkedIn' },
              { icon: Mail, href: '#contact', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary hover:glow-border transition-all"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-body tracking-wider uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
