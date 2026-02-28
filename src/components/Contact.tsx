import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'dev.kaua2@email.com' },
    { icon: MapPin, label: 'Localização', value: 'Brasil, Maranhão' },
    { icon: Phone, label: 'Telefone', value: '+55 (98) 97020-1254' },
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-body text-sm tracking-wider uppercase mb-4">
            Contato
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Vamos <span className="gradient-text">Trabalhar Juntos</span>?
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Tem um projeto em mente? Adoraria ouvir sobre suas ideias e como posso ajudar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-bold mb-6">
              Informações de Contato
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 glass-card rounded-xl">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-sm text-muted-foreground font-body">
                      {item.label}
                    </span>
                    <span className="font-body text-foreground">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="relative h-48 glass-card rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 to-burgundy/40" />
              <motion.div
                className="absolute inset-0 morph-blob opacity-40"
                style={{
                  background: 'var(--blob-gradient-1)',
                  filter: 'blur(30px)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-4xl font-bold text-primary/40">
                  Let's Connect
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-body text-muted-foreground mb-2">
                  Nome
                </label>
                <motion.input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 glass-card rounded-xl font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Seu nome"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label className="block text-sm font-body text-muted-foreground mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 glass-card rounded-xl font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="seu@email.com"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label className="block text-sm font-body text-muted-foreground mb-2">
                  Mensagem
                </label>
                <motion.textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 glass-card rounded-xl font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Conte-me sobre seu projeto..."
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full relative px-8 py-4 font-body font-medium overflow-hidden rounded-xl group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitted}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-crimson to-red-intense transition-transform group-hover:scale-105" />
                <span className="relative flex items-center justify-center gap-2 text-foreground">
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Enviado!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensagem
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
