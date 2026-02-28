import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Needuk',
    description: 'Site institucional para publicação de certificados de alunos que ainda estão na escola.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    image: null,
    github: 'https://github.com/KauMiLima/Needuk-main',
    live: 'https://needuk-main.vercel.app/',
    featured: true,
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: 'Loja virtual com carrinho dinâmico, filtros avançados e design responsivo.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    image: null,
    github: '#',
    live: 'https://e-commerce-main-rose-omega.vercel.app/',
    featured: true,
  },
  {
    id: 3,
    title: 'Landing Page Criativa',
    description: 'Página de com uma animação 3D.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    image: null,
    github: '#',
    live: 'https://site-abelha-delta.vercel.app/',
    featured: false,
  },
  {
    id: 4,
    title: 'Animação de flores',
    description: 'Site com animação em CSS3 que mostras algumas flores desabrochando.',
    tags: ['React', 'CSS Modules', 'LocalStorage'],
    image: null,
    github: '#',
    live: 'https://flores-css.vercel.app/',
    featured: false,
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 relative">
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
            Portfólio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Projetos <span className="gradient-text">Selecionados</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes e relevantes
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative glass-card rounded-3xl overflow-hidden"
            >
              {/* Project Image/Placeholder */}
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/30 to-burgundy/50" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: hoveredId === project.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="font-display text-6xl font-bold text-primary/30">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </motion.div>
                
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-charcoal/80 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.a
                    href={project.github}
                    className="p-4 glass-card rounded-full hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    className="p-4 glass-card rounded-full hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-6 h-6" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-body bg-burgundy/30 text-cream rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group glass-card p-6 rounded-2xl hover:glow-border transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.live} className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <p className="text-muted-foreground font-body text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-body text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-body font-medium link-underline"
            whileHover={{ x: 5 }}
          >
            Ver todos os projetos <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
