import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { profile } from '@/data/content';

const links = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'WhatsApp', href: profile.whatsapp },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contato" className="scroll-mt-16 bg-wine py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="section-title">Vamos conversar?</h2>
        <p className="mt-5 max-w-[48ch] text-lg text-paper/80">
          Estou procurando minha próxima oportunidade como desenvolvedor front-end. Se tiver uma vaga
          ou um projeto, me mande um e-mail.
        </p>

        <div className="mt-14 flex flex-col gap-5 md:flex-row md:items-end md:gap-8">
          <a
            href={`mailto:${profile.email}`}
            className="draw-underline break-all font-display text-[clamp(1.9rem,6.2vw,4.75rem)] leading-none tracking-tight transition-colors hover:text-paper/70"
          >
            {profile.email}
          </a>

          <button
            onClick={copy}
            className="btn relative h-11 border border-paper/40 text-paper hover:border-paper w-fit shrink-0 overflow-hidden"
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="ok"
                  className="flex items-center gap-2"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4" /> E-mail copiado
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  className="flex items-center gap-2"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Copy className="h-4 w-4" /> Copiar e-mail
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-xl border border-paper/25 bg-paper/25 sm:grid-cols-3">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between bg-wine px-6 py-5 transition-colors hover:bg-ink/30"
              >
                <span>{link.label}</span>
                <span className="text-paper/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-paper/70">
          {profile.phone} · {profile.location}
        </p>
      </div>
    </section>
  );
};

export default Contact;
