// Todo o conteúdo do portfólio fica aqui — edite este arquivo para atualizar textos, links e projetos.

export const profile = {
  name: 'Kauã Lima',
  role: 'Desenvolvedor front-end',
  location: 'Maranhão, Brasil',
  // TODO: confirme o e-mail — "email.com" parece um placeholder.
  email: 'dev.kaua2@email.com',
  phone: '+55 (98) 97020-1254',
  whatsapp: 'https://wa.me/5598970201254',
  github: 'https://github.com/KauMiLima',
  linkedin: 'https://www.linkedin.com/in/kaua-lima-ba6a87300/',
  available: true,
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  live: string;
  github?: string;
  /** Opcional: caminho de um print em /public (ex.: '/projects/needuk.png'). Sem print, mostra o site ao vivo. */
  image?: string;
};

export const projects: Project[] = [
  {
    title: 'Needuk',
    description:
      'Site institucional para publicação de certificados de alunos que ainda estão na escola.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://needuk-main.vercel.app/',
    github: 'https://github.com/KauMiLima/Needuk-main',
  },
  {
    title: 'Loja virtual',
    description: 'E-commerce com carrinho dinâmico, filtros avançados e layout responsivo.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://e-commerce-main-rose-omega.vercel.app/',
  },
  {
    title: 'Landing page criativa',
    description: 'Página de apresentação construída em torno de uma animação 3D.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://site-abelha-delta.vercel.app/',
  },
  {
    title: 'Animação de flores',
    description: 'Flores que desabrocham na tela, animadas só com CSS.',
    tags: ['React', 'CSS Modules', 'LocalStorage'],
    live: 'https://flores-css.vercel.app/',
  },
];

export const stack = {
  daily: ['HTML5', 'CSS3', 'JavaScript', 'Design responsivo', 'Git', 'Figma'],
  learning: ['React', 'TypeScript', 'Tailwind CSS', 'Sass'],
};

export const education: { period?: string; title: string; place: string }[] = [
  {
    period: '2021 – 2025',
    title: 'Engenharia da Computação',
    place: 'Universidade Ceuma',
  },
  {
    title: 'Curso de desenvolvimento front-end',
    place: 'Incode Tech School',
  },
];
