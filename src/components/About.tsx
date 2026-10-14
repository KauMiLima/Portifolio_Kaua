import { education } from '@/data/content';

const About = () => {
  return (
    <section id="sobre" className="scroll-mt-16 border-t border-line py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="md:col-span-7">
          <h2 className="section-title mb-10">Sobre</h2>
          <div className="max-w-[58ch] space-y-5 text-lg leading-relaxed text-paper/90">
            <p>
              Sou desenvolvedor front-end e trabalho com a base da web: HTML, CSS e JavaScript.
              Gosto de interfaces que funcionam bem em qualquer tela e que têm movimento na medida
              certa.
            </p>
            <p className="text-mute">
              Hoje estou aprofundando React e TypeScript para construir aplicações maiores, sem
              perder o cuidado com semântica, acessibilidade e performance que o código feito à mão
              me ensinou.
            </p>
          </div>
        </div>

        <div className="md:col-span-5 md:pt-4">
          <h3 className="mb-8 text-sm text-mute">Formação</h3>
          <ol className="relative space-y-10 border-l border-line pl-8">
            {education.map((item) => (
              <li key={item.title} className="relative">
                <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full border-2 border-ink bg-signal" />
                {item.period && <p className="text-sm text-mute">{item.period}</p>}
                <p className="mt-1 font-display text-2xl tracking-tight">{item.title}</p>
                <p className="mt-1 text-mute">{item.place}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;
