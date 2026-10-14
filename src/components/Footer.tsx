import { profile } from '@/data/content';

const Footer = () => (
  <footer>
    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-mute md:flex-row md:items-center md:justify-between md:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name}. Feito com React, Tailwind e framer-motion.
      </p>
      <a href="#topo" className="draw-underline w-fit hover:text-paper">
        Voltar ao topo
      </a>
    </div>
  </footer>
);

export default Footer;
