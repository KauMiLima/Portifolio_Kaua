import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects, type Project } from '@/data/content';
import ProjectsGallery from './ProjectsGallery';

const ease = [0.16, 1, 0.3, 1] as const;
const FRAME_W = 1280;
const FRAME_H = 800;

const hostOf = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** Mostra o site ao vivo (iframe em escala) ou um print, dentro de uma moldura de navegador. */
const Preview = ({ project }: { project: Project }) => {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / FRAME_W));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.a
      href={project.live}
      target="_blank"
      rel="noreferrer"
      aria-label={`Abrir ${project.title} em uma nova aba`}
      className="group block w-full overflow-hidden rounded-xl border border-line bg-surface"
      initial={reduce ? false : { clipPath: 'inset(18% 8% 18% 8% round 12px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 12px)', opacity: 1 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 1.2, ease }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs text-mute">
        <span className="truncate">{hostOf(project.live)}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
      </div>
      <div
        ref={box}
        className="relative overflow-hidden bg-ink"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`Captura de tela de ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <div
              className={`absolute inset-0 flex items-center justify-center text-sm text-mute transition-opacity duration-500 ${
                loaded ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Carregando prévia…
            </div>
            <div
              className="absolute left-0 top-0 origin-top-left transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})` }}
            >
              <iframe
                src={project.live}
                title={`Prévia de ${project.title}`}
                loading="lazy"
                tabIndex={-1}
                onLoad={() => setLoaded(true)}
                className={`pointer-events-none h-full w-full border-0 transition-opacity duration-700 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </>
        )}
      </div>
    </motion.a>
  );
};

const Projects = () => {
  return (
    <section id="projetos" className="scroll-mt-16 pb-24 pt-24 md:pb-36 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="section-title">Projetos</h2>
          <p className="max-w-[42ch] text-mute">
            Sites que publiquei. Role para ver a galeria e, logo abaixo, os detalhes de cada um.
          </p>
        </div>
      </div>

      <ProjectsGallery />

      <div className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-36">
        <div className="space-y-24 md:space-y-36">
          {projects.map((project, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={project.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className={`min-w-0 md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
                  <Preview project={project} />
                </div>

                <div className={`min-w-0 md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
                  <h3 className="font-display text-3xl tracking-tight md:text-4xl">{project.title}</h3>
                  <p className="mt-4 max-w-[40ch] text-mute">{project.description}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-signal/15 px-3 py-1 text-sm text-paper">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-6 text-[0.95rem]">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="draw-underline inline-flex items-center gap-1.5 text-paper"
                    >
                      Ver site <ArrowUpRight className="h-4 w-4" />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="draw-underline inline-flex items-center gap-1.5 text-mute hover:text-paper"
                      >
                        <Github className="h-4 w-4" /> Código
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
