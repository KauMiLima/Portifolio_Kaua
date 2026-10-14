import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  cubicBezier,
  type MotionValue,
} from 'framer-motion';
import { projects, stack, type Project } from '@/data/content';

/*
 * Galeria de projetos com zoom na rolagem (inspirada em
 * codepen.io/KevinGutowski/pen/QwNZYzL, originalmente do Jhey).
 *
 * Uma grade 5×3: o projeto em destaque começa ocupando a tela inteira e
 * encolhe até a célula do meio enquanto as camadas em volta aparecem.
 * Para adicionar projetos, basta incluí-los em `projects` (src/data/content.ts).
 * A grade é preenchida na ordem: primeiro as células mais próximas do centro.
 * Células que sobram mostram as tecnologias que você usa.
 */

type Cell = { layer: 1 | 2 | 3; pos: string };

// Classes fixas (o Tailwind precisa ver os nomes completos).
// No celular a camada 1 (colunas das pontas) some e a grade vira 3 colunas.
const CELLS: Cell[] = [
  // camada 3: acima e abaixo do centro
  { layer: 3, pos: 'col-start-2 md:col-start-3 row-start-1' },
  { layer: 3, pos: 'col-start-2 md:col-start-3 row-start-3' },
  // camada 2: colunas vizinhas ao centro
  { layer: 2, pos: 'col-start-1 md:col-start-2 row-start-1' },
  { layer: 2, pos: 'col-start-3 md:col-start-4 row-start-1' },
  { layer: 2, pos: 'col-start-1 md:col-start-2 row-start-2' },
  { layer: 2, pos: 'col-start-3 md:col-start-4 row-start-2' },
  { layer: 2, pos: 'col-start-1 md:col-start-2 row-start-3' },
  { layer: 2, pos: 'col-start-3 md:col-start-4 row-start-3' },
  // camada 1: colunas das pontas (só no desktop)
  { layer: 1, pos: 'hidden md:block md:col-start-1 row-start-1' },
  { layer: 1, pos: 'hidden md:block md:col-start-5 row-start-1' },
  { layer: 1, pos: 'hidden md:block md:col-start-1 row-start-2' },
  { layer: 1, pos: 'hidden md:block md:col-start-5 row-start-2' },
  { layer: 1, pos: 'hidden md:block md:col-start-1 row-start-3' },
  { layer: 1, pos: 'hidden md:block md:col-start-5 row-start-3' },
];

// Quando cada camada aparece (fração da rolagem) e com que curva.
const LAYER_TIMING = {
  1: { range: [0.12, 0.62], ease: cubicBezier(0.42, 0, 0.58, 1) },
  2: { range: [0.08, 0.56], ease: cubicBezier(0.65, 0, 0.35, 1) },
  3: { range: [0.04, 0.5], ease: cubicBezier(0.76, 0, 0.24, 1) },
} as const;

const SCALE_END = 0.6;
const scaleEase = cubicBezier(0.65, 0, 0.35, 1);
const FRAME_W = 1280;
const FRAME_H = 800;


/** Print do projeto ou, sem print, o site ao vivo em escala. */
const LivePreview = ({ project }: { project: Project }) => {
  const box = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.3);

  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) =>
      setFit(Math.max(e.contentRect.width / FRAME_W, e.contentRect.height / FRAME_H)),
    );
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  if (project.image) {
    return <img src={project.image} alt={`Captura de tela de ${project.title}`} loading="lazy" className="h-full w-full object-cover object-top" />;
  }
  return (
    <div ref={box} className="relative h-full w-full overflow-hidden bg-surface">
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{ width: FRAME_W, height: FRAME_H, transform: `translateX(-50%) scale(${fit})` }}
      >
        <iframe
          src={project.live}
          title={`Prévia de ${project.title}`}
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none h-full w-full border-0"
        />
      </div>
    </div>
  );
};

/** Conteúdo de uma célula: prévia do projeto ou, se sobrar espaço, uma tecnologia. */
const Tile = ({ project, filler }: { project?: Project; filler?: string }) => {
  if (project) {
    return (
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        aria-label={`Abrir ${project.title}`}
        className="group relative block h-full w-full bg-wine"
      >
        <LivePreview project={project} />
        <span className="absolute inset-0 bg-wine/0 transition-colors duration-300 group-hover:bg-wine/40" />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent p-3 pt-8 font-display text-base leading-tight md:p-4 md:pt-10 md:text-xl">
          {project.title}
        </span>
      </a>
    );
  }
  // Células sem projeto: discretas, para os projetos se destacarem.
  return (
    <div
      className={`flex h-full w-full items-end p-3 md:p-4 ${
        filler ? 'border border-line' : 'border border-line/50'
      }`}
    >
      {filler && <span className="font-display text-base text-mute md:text-xl">{filler}</span>}
    </div>
  );
};

const LayerCell = ({
  cell,
  progress,
  children,
  static: isStatic,
}: {
  cell: Cell;
  progress: MotionValue<number>;
  children: ReactNode;
  static: boolean;
}) => {
  const t = LAYER_TIMING[cell.layer];
  const opacity = useTransform(progress, [t.range[0], t.range[1]], [0, 1], { ease: t.ease });
  const scale = useTransform(progress, [t.range[0], t.range[1]], [0.4, 1], { ease: t.ease });
  return (
    <motion.div
      className={`${cell.pos} overflow-hidden rounded-lg`}
      style={isStatic ? undefined : { opacity, scale }}
    >
      {children}
    </motion.div>
  );
};

const ProjectsGallery = () => {
  const section = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const cover = useMotionValue(3);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  // Escala necessária para a célula do centro cobrir a tela inteira.
  useEffect(() => {
    const measure = () => {
      const el = center.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w && h) cover.set(Math.max(window.innerWidth / w, window.innerHeight / h) * 1.02);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [cover]);

  const scale = useTransform([scrollYProgress, cover], ([p, c]: number[]) => {
    const t = scaleEase(Math.min(1, Math.max(0, p / SCALE_END)));
    return c + (1 - c) * t;
  });
  // Mantém o canto arredondado visualmente constante enquanto escala.
  const radius = useTransform(scale, (s) => `${8 / s}px`);
  const labelOpacity = useTransform(scrollYProgress, [SCALE_END - 0.05, SCALE_END + 0.1], [0, 1]);

  const [featured, ...rest] = projects;
  const fillers = [...stack.daily, ...stack.learning];
  let f = 0;

  return (
    <div ref={section} className={reduce ? 'py-8' : 'relative h-[320vh]'}>
      <div className={reduce ? '' : 'sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden'}>
        <div className="mx-auto grid h-[min(72svh,680px)] w-[min(1200px,calc(100vw-2.5rem))] grid-cols-3 grid-rows-3 gap-2 md:grid-cols-5 md:gap-3">
          {CELLS.map((cell, i) => {
            const project = rest[i];
            return (
              <LayerCell key={i} cell={cell} progress={scrollYProgress} static={reduce}>
                <Tile project={project} filler={project ? undefined : fillers[f++]} />
              </LayerCell>
            );
          })}

          {featured && (
            <div ref={center} className="relative z-10 col-start-2 row-start-2 md:col-start-3">
              <motion.a
                href={featured.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir ${featured.title}`}
                className="group block h-full w-full overflow-hidden"
                style={reduce ? { borderRadius: 8 } : { scale, borderRadius: radius }}
              >
                <LivePreview project={featured} />
                <motion.span
                  className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/95 to-transparent p-3 md:p-4"
                  style={reduce ? undefined : { opacity: labelOpacity }}
                >
                  <span className="font-display text-lg md:text-2xl">{featured.title}</span>
                  <span className="hidden text-sm text-paper/80 group-hover:text-paper sm:inline">Ver site ↗</span>
                </motion.span>
              </motion.a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsGallery;
