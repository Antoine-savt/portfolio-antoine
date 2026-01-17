import React, { useState, useEffect, memo } from 'react';
import { Mail, ChevronDown, Instagram, Linkedin, Twitter, Send, Home, User, Plus, Filter, Sparkles, Gamepad2, MessageSquare, Layout, RefreshCw, CheckCircle2, CreditCard, Package, ArrowRight, ExternalLink } from 'lucide-react';
import { PROJECTS } from './constants';
import { ProjectCategory, Project } from './types';
import ProjectDetail from './components/ProjectDetail';
import AboutPage from './components/AboutPage';
import GithubSection from './components/GithubSection';

type ViewState = 'home' | 'about' | 'project';

// --- OPTIMIZED COMPONENTS ---

// 1. Spotlight isolé pour éviter de re-render toute l'App à chaque mouvement de souris
const Spotlight = memo(() => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
        // Simple throttling via RAF
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
            setPos({ x: e.clientX, y: e.clientY });
        });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-0 mix-blend-screen opacity-100"
        style={{
            background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(56, 189, 248, 0.20), transparent 80%)`,
            willChange: 'background' // Hint for browser optimization
        }}
    />
  );
});

// 2. Composant Image de Galerie optimisé (évite le démontage/remontage du DOM)
const GalleryPreview = ({ activeProjectId }: { activeProjectId: string }) => {
    const activeProject = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];

    return (
        <div className="sticky top-32 h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group relative">
            {/* Stacked Images for smooth transition */}
            {PROJECTS.map((project) => (
                <div 
                    key={project.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${project.id === activeProjectId ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="eager" // Force loading mainly for the first view
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-90" />
                </div>
            ))}

            {/* Overlay Info (Dynamique) */}
            <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                 <div className="flex justify-between items-end">
                    <div>
                        <div className="flex gap-2 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-300" key={`tags-${activeProject.id}`}>
                            {activeProject.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-slate-300 line-clamp-2 max-w-md text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75" key={`desc-${activeProject.id}`}>
                            {activeProject.description}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Corner Decoration */}
            <div className="absolute top-4 right-4 flex gap-1 z-20">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // State for the new Gallery Design
  const [hoveredProjectId, setHoveredProjectId] = useState<string>(PROJECTS[0].id);

  // Force Dark Mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  // Determine active project for preview (if filtered out, default to first visible)
  const displayProjectId = filteredProjects.find(p => p.id === hoveredProjectId)?.id || filteredProjects[0]?.id || PROJECTS[0].id;
  const activeProject = PROJECTS.find(p => p.id === displayProjectId) || PROJECTS[0];

  const categories = ['All', ...Object.values(ProjectCategory)];

  // Navigation Logic
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setView('project');
    window.scrollTo(0, 0);
  };

  const handleNav = (target: ViewState) => {
    setView(target);
    window.scrollTo(0, 0);
  };

  const workflowSteps = [
    {
      title: "Brief & Vision",
      desc: "Nous discutons de vos besoins, de vos préférences design et des fonctionnalités clés attendues.",
      icon: MessageSquare
    },
    {
      title: "Maquettage",
      desc: "Je conçois une première maquette visuelle (UI) pour valider la direction artistique ensemble.",
      icon: Layout
    },
    {
      title: "Itérations",
      desc: "J'affine le design selon vos retours précis jusqu'à ce que le résultat vous convienne parfaitement.",
      icon: RefreshCw
    },
    {
      title: "Validation",
      desc: "Vous validez le design final. Une fois approuvé, le développement technique peut commencer.",
      icon: CheckCircle2
    },
    {
      title: "Paiement",
      desc: "Règlement de la prestation selon les modalités convenues pour débloquer la livraison.",
      icon: CreditCard
    },
    {
      title: "Livraison",
      desc: "Je vous remets le code source complet, les accès et je vous transfère la propriété intellectuelle.",
      icon: Package
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 selection:bg-primary selection:text-slate-900 overflow-x-hidden font-sans">
      
      {/* Optimized Spotlight */}
      <Spotlight />
      
      {/* Grid Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-[0.15]" />

      {/* MICRO DESIGN / DECORATIONS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Right Orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        {/* Bottom Left Orb */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Floating Crosses (Tech aesthetic) */}
        <div className="absolute top-24 left-12 text-slate-800 animate-pulse"><Plus size={24} strokeWidth={1} /></div>
        <div className="absolute top-1/3 right-12 text-slate-800 animate-pulse delay-700"><Plus size={16} strokeWidth={1} /></div>
        <div className="absolute bottom-24 left-1/4 text-slate-800 animate-pulse delay-1000"><Plus size={32} strokeWidth={1} /></div>
        
        {/* Vertical Lines */}
        <div className="absolute top-0 left-24 w-px h-screen bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block"></div>
        <div className="absolute top-0 right-24 w-px h-screen bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block"></div>
      </div>

      {/* FLOATING TOP NAVBAR - "Dynamic Island" Style */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 pointer-events-none">
          <nav className={`pointer-events-auto flex items-center gap-2 p-2 rounded-full border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl transition-all duration-300 ${scrolled ? 'scale-90 opacity-90' : 'scale-100'}`}>
              
              <button 
                onClick={() => handleNav('home')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${view === 'home' ? 'bg-white text-black font-bold' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
              >
                 <Home size={18} />
                 <span className={view === 'home' ? 'block' : 'hidden md:block'}>Accueil</span>
              </button>

              <button 
                onClick={() => handleNav('about')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${view === 'about' ? 'bg-white text-black font-bold' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
              >
                 <User size={18} />
                 <span className={view === 'about' ? 'block' : 'hidden md:block'}>Profil</span>
              </button>

              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                 <Mail size={18} />
                 <span className="hidden md:block">Contact</span>
              </button>

              <div className="w-px h-6 bg-white/10 mx-1"></div>

              <div className="px-4 font-bold tracking-widest text-primary text-xs hidden sm:block uppercase">
                  ANTOINE SAVOYANT
              </div>
          </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10">
        
        {view === 'project' && selectedProject ? (
            <ProjectDetail project={selectedProject} onBack={() => handleNav('home')} />
        ) : view === 'about' ? (
            <AboutPage />
        ) : (
            // HOME VIEW
            <div className="animate-in fade-in duration-700">
                {/* Hero Section */}
                <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-12 pt-20 overflow-hidden">
                    <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8 flex flex-col justify-center">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 text-white">
                                <span className="block text-stroke hover:text-white transition-colors duration-500 cursor-default">SCULPTEUR</span>
                                <div className="flex items-center gap-4">
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-white animate-pulse-slow">DIGITAL</span>
                                </div>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-xl border-l-2 border-primary/30 pl-6 py-2">
                                Je transforme des concepts abstraits en interfaces tangibles. 
                                <br />
                                <span className="text-white font-medium">Frontend • Creative Dev • UI/UX</span>
                            </p>
                            <div className="mt-12 flex items-center gap-6">
                                <button 
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white text-slate-900 font-bold hover:scale-105 transition-transform rounded-full shadow-lg"
                                >
                                    EXPLORER LE TRAVAIL
                                </button>
                                <button onClick={() => handleNav('about')} className="text-slate-400 hover:text-white underline decoration-slate-700 underline-offset-4 font-mono text-sm">
                                    QUI JE SUIS ?
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-50 text-white">
                        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
                        <ChevronDown />
                    </div>
                </section>

                {/* REDESIGNED GALLERY: Sticky Preview List */}
                <section id="projects" className="py-20 relative">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                            <div>
                                <span className="text-primary font-mono text-sm mb-2 block tracking-widest flex items-center gap-2">
                                    <Sparkles size={14} /> SÉLECTION
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold text-white">
                                    Index <span className="text-slate-600">Projets</span>
                                </h2>
                            </div>
                            
                            {/* Filters */}
                            <div className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end border-b border-white/10 pb-4">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mr-4">
                                    <Filter size={12} /> FILTRER :
                                </div>
                                {categories.map(cat => (
                                    <button
                                    key={cat}
                                    onClick={() => setFilter(cat as ProjectCategory | 'All')}
                                    className={`text-sm tracking-wider transition-all relative group ${
                                        filter === cat 
                                        ? 'text-white font-bold' 
                                        : 'text-slate-500 hover:text-slate-300'
                                    }`}
                                    >
                                    {cat}
                                    <span className={`absolute -bottom-4 left-0 w-full h-0.5 bg-primary transition-all duration-300 ${filter === cat ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive List Layout */}
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                            
                            {/* LEFT COLUMN: Sticky Image Preview (Desktop) */}
                            <div className="hidden lg:block lg:w-1/2 relative">
                                <GalleryPreview activeProjectId={displayProjectId} />
                                {/* Button Action (Moved outside for better context) */}
                                <div className="absolute -right-6 top-[550px] z-30">
                                     <button 
                                        onClick={() => handleProjectClick(activeProject)}
                                        className="w-20 h-20 bg-primary text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(56,189,248,0.4)] group"
                                    >
                                        <ArrowRight size={32} className="group-hover:-rotate-45 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Scrollable List */}
                            <div className="w-full lg:w-1/2 flex flex-col">
                                {filteredProjects.map((project, index) => (
                                    <div 
                                        key={project.id}
                                        onMouseEnter={() => setHoveredProjectId(project.id)}
                                        onClick={() => handleProjectClick(project)}
                                        className={`group relative py-12 border-b border-white/5 cursor-pointer transition-all duration-500 ${hoveredProjectId === project.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                                    >
                                        <div className="flex items-baseline justify-between mb-4">
                                            <div className="flex items-center gap-6">
                                                <span className={`font-mono text-sm transition-colors duration-300 ${hoveredProjectId === project.id ? 'text-primary' : 'text-slate-500'}`}>0{index + 1}</span>
                                                <h3 className={`text-4xl md:text-5xl font-bold transition-all duration-300 ${hoveredProjectId === project.id ? 'text-white translate-x-4' : 'text-slate-400'}`}>
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <span className="font-mono text-xs text-slate-600 border border-white/5 px-2 py-1 rounded hidden sm:block">
                                                {project.year}
                                            </span>
                                        </div>
                                        
                                        <div className={`pl-12 transition-all duration-500 overflow-hidden ease-in-out ${hoveredProjectId === project.id ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-slate-400 text-lg mb-4 w-10/12">{project.description}</p>
                                            <span className="text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Voir le cas d'étude <ArrowRight size={16} />
                                            </span>
                                        </div>

                                        {/* Mobile Only Image (visible always on mobile since sticky preview is hidden) */}
                                        <div className="lg:hidden mt-6 rounded-xl overflow-hidden aspect-video relative group-hover:ring-2 ring-primary/50 transition-all">
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold border border-white/20">Explorer</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="py-24 flex justify-center">
                                    <p className="text-slate-600 font-mono text-sm">Fin de la sélection.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Original GitHub Section */}
                <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative">
                     <div className="absolute top-1/2 left-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
                     <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                             <span className="text-primary font-mono text-sm mb-4 block tracking-widest">02 / CODE</span>
                             <h2 className="text-4xl font-bold mb-6 text-white">Open Source & <br/>Expérimentations</h2>
                             <p className="text-slate-400 mb-8 text-lg">
                                 Je passe beaucoup de temps à explorer de nouvelles technologies et à contribuer à l'écosystème. 
                                 Mon GitHub est un laboratoire d'idées où je teste des animations, des composants 3D et des architectures frontend.
                             </p>
                             <div className="flex gap-4">
                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5 shadow-sm">
                                    <span className="block text-2xl font-bold text-white">45+</span>
                                    <span className="text-xs text-slate-500 uppercase">Repos</span>
                                </div>
                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5 shadow-sm">
                                    <span className="block text-2xl font-bold text-white">1.2k</span>
                                    <span className="text-xs text-slate-500 uppercase">Commits</span>
                                </div>
                             </div>
                        </div>
                        <div className="flex-1 w-full">
                            <GithubSection />
                        </div>
                     </div>
                </section>

                {/* UPDATED: Workflow Timeline Section */}
                <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                    <div className="text-center mb-24">
                        <span className="text-primary font-mono text-sm tracking-widest block mb-4 uppercase">Méthodologie</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Comment je <span className="text-primary">fonctionne</span></h2>
                        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Un processus fluide et structuré, de la première idée à la mise en ligne.</p>
                    </div>

                    <div className="relative">
                        {/* Central Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

                        <div className="space-y-12 md:space-y-0">
                            {workflowSteps.map((step, index) => {
                                const Icon = step.icon;
                                const isEven = index % 2 === 0;
                                
                                return (
                                    <div key={index} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} group`}>
                                        
                                        {/* Spacer for alignment */}
                                        <div className="hidden md:block md:w-1/2"></div>
                                        
                                        {/* Center Marker */}
                                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)] z-10 group-hover:scale-125 transition-transform duration-300">
                                                <span className="text-[10px] font-bold text-primary font-mono">0{index + 1}</span>
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                            <div className={`p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-primary/40 hover:bg-white/5 transition-all duration-300 shadow-sm group-hover:-translate-y-1`}>
                                                <div className={`flex items-center gap-4 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                        <Icon size={18} />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Contact Section & Footer */}
                <section id="contact" className="py-32 bg-black/40 px-6 md:px-12 border-t border-white/5">
                     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                        
                        {/* Left: Info */}
                        <div>
                            <span className="inline-block p-4 rounded-full bg-white/5 mb-8 shadow-sm">
                                <Mail className="text-primary" size={24} />
                            </span>
                            <h2 className="text-5xl font-bold mb-6 text-white">Parlons Projet</h2>
                            <p className="text-slate-400 text-lg mb-12">
                                Vous avez une idée visuelle ambitieuse ? Vous cherchez à moderniser l'interface de votre produit ? 
                                Je suis disponible pour des missions freelance.
                            </p>
                            
                            <div className="space-y-6">
                                <a href="#" className="flex items-center gap-4 text-xl font-bold text-white hover:text-primary transition-colors group">
                                    <div className="w-12 h-12 rounded-full border border-white/10 bg-transparent flex items-center justify-center group-hover:bg-white/10">
                                        <Twitter size={20}/>
                                    </div>
                                    Twitter / X
                                </a>
                                <a href="#" className="flex items-center gap-4 text-xl font-bold text-white hover:text-primary transition-colors group">
                                    <div className="w-12 h-12 rounded-full border border-white/10 bg-transparent flex items-center justify-center group-hover:bg-white/10">
                                        <Linkedin size={20}/>
                                    </div>
                                    LinkedIn
                                </a>
                                <a href="#" className="flex items-center gap-4 text-xl font-bold text-white hover:text-primary transition-colors group">
                                    <div className="w-12 h-12 rounded-full border border-white/10 bg-transparent flex items-center justify-center group-hover:bg-white/10">
                                        <Gamepad2 size={20}/>
                                    </div>
                                    Discord: antoine.savt
                                </a>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
                            
                            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 ml-2 tracking-widest">IDENTITÉ</label>
                                    <input type="text" placeholder="Comment dois-je vous appeler ?" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none focus:bg-black/60 transition-all placeholder:text-slate-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 ml-2 tracking-widest">EMAIL</label>
                                    <input type="email" placeholder="votre@email.com" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none focus:bg-black/60 transition-all placeholder:text-slate-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 ml-2 tracking-widest">LE BRIEF</label>
                                    <textarea rows={4} placeholder="Racontez-moi tout..." className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none focus:bg-black/60 transition-all placeholder:text-slate-600 resize-none"></textarea>
                                </div>
                                <button className="w-full py-5 bg-white text-slate-900 font-bold rounded-xl hover:bg-primary hover:text-black transition-colors flex items-center justify-center gap-2 text-lg group">
                                    <Send size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/> ENVOYER LE MESSAGE
                                </button>
                            </form>
                        </div>

                     </div>
                     
                     <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs font-mono">
                        <p>© {new Date().getFullYear()} ANTOINE SAVOYANT.</p>
                        <p className="mt-2 md:mt-0">DESIGNED & CODED WITH ❤️ IN PARIS</p>
                     </div>
                </section>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;