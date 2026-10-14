import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/content';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Nome gigante em Fraunces. Cada letra engorda conforme o cursor se aproxima
 * (eixo variável 'wght') e fica mais "suave" quando está longe (eixo 'SOFT').
 */
const ReactiveName = ({ lines }: { lines: string[] }) => {
  const letters = useRef<HTMLSpanElement[]>([]);
  const section = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const els = letters.current.filter(Boolean);
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;

    const BASE = 320;
    const PEAK = 900;
    const RADIUS = 360;
    const current = els.map(() => BASE);
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    let visible = true;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    const tick = () => {
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / RADIUS);
        const target = BASE + (PEAK - BASE) * t * t;
        current[i] += (target - current[i]) * 0.14;
        const soft = Math.round(100 * (1 - t));
        el.style.fontVariationSettings = `'wght' ${current[i].toFixed(0)}, 'SOFT' ${soft}, 'opsz' 144`;
      });
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    if (section.current) io.observe(section.current);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  let index = 0;
  return (
    <h1
      ref={section}
      aria-label={lines.join(' ')}
      className="select-none font-display leading-[0.82] tracking-[-0.045em] text-[clamp(5.5rem,24vw,16rem)]"
    >
      {lines.map((line, li) => (
        <span
          key={line}
          aria-hidden
          className={`block overflow-hidden pb-[0.06em] ${li === 1 ? 'pl-[0.9em] md:pl-[1.6em]' : ''}`}
        >
          {line.split('').map((ch) => {
            const i = index++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.15 + i * 0.055, duration: 1.1, ease }}
              >
                <span
                  ref={(el) => {
                    if (el) letters.current[i] = el;
                  }}
                  className="inline-block"
                  style={{ fontVariationSettings: "'wght' 320, 'SOFT' 100, 'opsz' 144" }}
                >
                  {ch}
                </span>
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

const Hero = () => {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.9, ease },
        };

  return (
    <section id="topo" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-28 md:pb-20">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] top-[10%] -z-10 h-[70vmax] w-[70vmax] rounded-full"
        style={{ background: 'radial-gradient(closest-side, hsl(var(--signal) / 0.45), hsl(var(--wine) / 0.25) 55%, transparent)' , filter: 'blur(40px)' }}
        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <motion.p {...fade(0.1)} className="mb-6 text-mute md:mb-10">
          {profile.role} no {profile.location}
        </motion.p>

        <ReactiveName lines={['Kauã', 'Lima']} />

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:mt-16 md:grid-cols-12 md:gap-8">
          <motion.p {...fade(0.9)} className="max-w-[46ch] text-lg leading-relaxed text-paper/90 md:col-span-7">
            Construo interfaces web responsivas com HTML, CSS e JavaScript, e gosto de cuidar
            dos detalhes de animação que fazem um site parecer vivo.
          </motion.p>

          <motion.div {...fade(1.05)} className="flex flex-wrap items-start gap-3 md:col-span-5 md:justify-end">
            <a href="#projetos" className="btn-solid">
              Ver projetos
            </a>
            <a href="#contato" className="btn-ghost">
              Falar comigo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
