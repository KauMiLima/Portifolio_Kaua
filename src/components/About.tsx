import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { number: '2+', label: 'Anos de experiência' },
    { number: '15+', label: 'Projetos concluídos' },
    { number: '100%', label: 'Dedicação' },
  ];

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <motion.div
                className="absolute -inset-4 morph-blob opacity-60"
                style={{
                  background: 'var(--gradient-primary)',
                  filter: 'blur(40px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Main image container */}
              <div className="relative glass-card rounded-3xl overflow-hidden aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 to-burgundy/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="font-display text-9xl font-bold text-primary/20"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    K
                  </motion.span>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 glass-card px-6 py-3 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                <span className="text-primary font-display font-bold text-lg">Front-End Dev</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="inline-block text-primary font-body text-sm tracking-wider uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Sobre Mim
            </motion.span>

            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Criando experiências{' '}
              <span className="gradient-text">digitais únicas</span>
            </h2>

            <div className="space-y-4 text-muted-foreground font-body leading-relaxed mb-8">
              <p>
                Sou um desenvolvedor Front-End apaixonado por criar interfaces 
                modernas, responsivas e com experiências de usuário excepcionais.
              </p>
              <p>
                Meu foco está em dominar as tecnologias fundamentais da web: 
                <span className="text-foreground font-medium"> HTML5</span>, 
                <span className="text-foreground font-medium"> CSS3</span> e 
                <span className="text-foreground font-medium"> JavaScript</span>, 
                combinadas com frameworks modernos para criar soluções elegantes e performáticas.
              </p>
              <p>
                Acredito que cada linha de código é uma oportunidade de criar algo 
                extraordinário. Busco constantemente aprender novas tecnologias e 
                aprimorar minhas habilidades.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <span className="block font-display text-3xl md:text-4xl font-bold gradient-text">
                    {stat.number}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground font-body">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
