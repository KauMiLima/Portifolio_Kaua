import { stack } from '@/data/content';

const Group = ({ title, items, dim }: { title: string; items: string[]; dim?: boolean }) => (
  <div>
    <h3 className="mb-6 text-sm text-mute">{title}</h3>
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {items.map((item) => (
        <li
          key={item}
          className={`font-display text-3xl tracking-tight transition-colors duration-300 hover:text-signal md:text-4xl ${
            dim ? 'text-paper/55' : ''
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Skills = () => {
  return (
    <section id="ferramentas" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-2 md:gap-12 md:px-8">
        <Group title="Uso no dia a dia" items={stack.daily} />
        <Group title="Estudando agora" items={stack.learning} dim />
      </div>
    </section>
  );
};

export default Skills;
