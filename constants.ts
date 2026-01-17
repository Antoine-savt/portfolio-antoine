import { Project, ProjectCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nébulos',
    description: 'Une plateforme SaaS de gestion de tâches pour équipes distribuées.',
    detailedDescription: 'Nébulos redéfinit la gestion de projet avec une interface minimaliste et des interactions fluides. Focus sur l\'expérience utilisateur et la réactivité immédiate.',
    category: ProjectCategory.APP,
    tags: ['React', 'TypeScript', 'Zustand', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    link: 'https://example.com',
    github: 'https://github.com',
    featured: true,
    year: '2024'
  },
  {
    id: '2',
    title: 'Aura Mode',
    description: 'Boutique e-commerce de luxe avec essayage virtuel en AR.',
    detailedDescription: 'Une expérience shopping immersive intégrant la réalité augmentée via le web pour visualiser les accessoires. Performance optimisée pour le mobile.',
    category: ProjectCategory.ECOMMERCE,
    tags: ['Next.js', 'Three.js', 'Tailwind', 'R3F'],
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80',
    link: 'https://example.com',
    featured: true,
    year: '2023'
  },
  {
    id: '3',
    title: 'Zenith Portfolio',
    description: 'Portfolio minimaliste pour photographes.',
    detailedDescription: 'Un template de portfolio ultra-rapide axé sur la typographie et les grands espaces blancs. Utilisation intensive d\'animations au scroll.',
    category: ProjectCategory.PORTFOLIO,
    tags: ['Vue.js', 'GSAP', 'Locomotive Scroll'],
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80',
    featured: false,
    year: '2023'
  },
  {
    id: '4',
    title: 'EcoTrack',
    description: 'Dashboard de visualisation de données énergétiques.',
    detailedDescription: 'Interface de data-visualization complexe utilisant D3.js pour rendre des graphiques interactifs et esthétiques.',
    category: ProjectCategory.APP,
    tags: ['React', 'D3.js', 'Recharts', 'SVG'],
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80',
    github: 'https://github.com',
    featured: false,
    year: '2022'
  },
  {
    id: '5',
    title: 'Neon Admin',
    description: 'Template de dashboard administrateur moderne.',
    detailedDescription: 'Un kit UI complet pour dashboard avec mode sombre natif, graphiques dynamiques et composants modulaires.',
    category: ProjectCategory.WEB,
    tags: ['React', 'Tailwind', 'Storybook', 'Vite'],
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80',
    link: 'https://example.com',
    featured: true,
    year: '2024'
  },
  {
    id: '6',
    title: 'Restaurant Olympe',
    description: 'Site vitrine animé pour un restaurant gastronomique.',
    detailedDescription: 'Expérience de scrolling fluide, parallaxe et animations CSS avancées pour une immersion totale.',
    category: ProjectCategory.WEB,
    tags: ['HTML5', 'Sass', 'JavaScript', 'WebGL'],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
    featured: false,
    year: '2021'
  }
];

export const SYSTEM_INSTRUCTION = `
Tu es "Lumina", l'assistant virtuel IA du portfolio de ce développeur Frontend Créatif. 
Ton rôle est d'agir comme un guide interactif pour les recruteurs et visiteurs.

Voici les données sur les projets du développeur :
${JSON.stringify(PROJECTS)}

Tes directives :
1. Réponds aux questions sur les compétences techniques (React, Animations, UI/UX, Three.js) en citant les projets pertinents.
2. Tu dois souligner que le développeur est un expert Frontend spécialisé dans les interfaces visuelles, l'expérience utilisateur et le design. Il ne fait pas de backend.
3. Adopte un ton professionnel mais créatif, légèrement futuriste.
4. Si on te demande "Quel est le meilleur projet ?", recommande "Nébulos" pour l'UX ou "Aura Mode" pour la 3D.
5. Sois concis. Tes réponses ne doivent pas dépasser 3-4 phrases.
6. Ne donne jamais l'API Key.
`;