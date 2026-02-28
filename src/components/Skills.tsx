import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'HTML5', level: 70, category: 'core' },
  { name: 'CSS3', level: 85, category: 'core' },
  { name: 'JavaScript', level: 55, category: 'core' },
  { name: 'React', level: 40, category: 'framework' },
  { name: 'TypeScript', level: 40, category: 'framework' },
  { name: 'Tailwind CSS', level: 40, category: 'styling' },
  { name: 'SASS/SCSS', level: 40, category: 'styling' },
  { name: 'Git', level: 60, category: 'tools' },
  { name: 'Figma', level: 60, category: 'tools' },
  { name: 'Responsive Design', level: 55, category: 'concepts' },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32 relative">
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
            Habilidades
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Meu <span className="gradient-text">Arsenal</span> Técnico
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Tecnologias e ferramentas que utilizo para criar experiências web incríveis
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group glass-card p-6 rounded-2xl hover:glow-border transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <span className="text-sm text-muted-foreground font-body">
                  {skill.level}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-charcoal rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, hsl(var(--crimson)), hsl(var(--red-intense)))',
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Tech Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm mb-6 font-body">Stack Principal</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript'].map((tech, i) => (
              <motion.div
                key={tech}
                className="px-6 py-3 glass-card rounded-full font-body text-sm text-foreground"
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.1 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
