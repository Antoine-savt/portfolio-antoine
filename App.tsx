import React, { useState, useEffect, memo, useRef } from 'react';
import { Mail, ChevronDown, Instagram, Linkedin, Twitter, Send, Home, User, Plus, Filter, Sparkles, Gamepad2, MessageSquare, Layout, RefreshCw, CheckCircle2, CreditCard, Package, ArrowRight, ExternalLink, ArrowUpRight, Code, Terminal, MapPin, Globe } from 'lucide-react';
import { PROJECTS } from './constants';
import { ProjectCategory, Project } from './types';
import ProjectDetail from './components/ProjectDetail';
import AboutPage from './components/AboutPage';
import GithubSection from './components/GithubSection';

type ViewState = 'home' | 'about' | 'project';

// --- OPTIMIZED COMPONENTS ---

// 1. Spotlight isolé
const Spotlight = memo(() => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
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
            willChange: 'background'
        }}
    />
  );
});

// 2. Composant de prévisualisation flottante (Suit la souris)
const FloatingPreview = ({ activeProject, isVisible, cursorX, cursorY }: { activeProject: Project | null, isVisible: boolean, cursorX: number, cursorY: number }) => {
    // Utilisation d'un ref pour l'animation fluide via CSS transform direct (évite les re-renders React trop fréquents)
    const previewRef = useRef<HTMLDivElement>(null);
    const [displayedProject, setDisplayedProject] = useState<Project | null>(null);

    // On met à jour le projet affiché seulement s'il y en a un actif.
    // S'il devient null (sortie de souris), on garde l'ancien pour l'animation de sortie.
    useEffect(() => {
        if (activeProject) {
            setDisplayedProject(activeProject);
        }
    }, [activeProject]);

    useEffect(() => {
        if (previewRef.current) {
            // Animation "Lag" simple via CSS transition ou interpolation directe
            const x = cursorX; 
            const y = cursorY;
            
            // On décale l'image pour qu'elle ne soit pas pile sous la souris pour la lisibilité
             previewRef.current.animate({
                transform: `translate(${x}px, ${y}px) translate(-50%, -60%) rotate(${x * 0.01}deg)`
             }, { duration: 400, fill: "forwards", easing: "ease-out" }); // Durée réduite pour moins de latence
        }
    }, [cursorX, cursorY]);

    if (!displayedProject) return null;

    return (
        <div 
            ref={previewRef}
            className={`pointer-events-none fixed top-0 left-0 z-50 w-[300px] h-[200px] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ease-out hidden lg:block ${isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-75 blur-md'}`}
        >
             {/* Border Gradient wrapper */}
            <div className="absolute inset-0 p-[1px] bg-gradient-to-br from-white/30 to-transparent rounded-xl">
                 <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">
                    <img 
                        src={displayedProject.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover opacity-90"
                    />
                    {/* Overlay Info sur l'image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[9px] text-slate-300 font-mono uppercase tracking-widest">{displayedProject.category}</span>
                        </div>
                        <span className="text-white font-bold font-sans text-lg">{displayedProject.title}</span>
                    </div>
                 </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // State for the new Directory Design
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e: React.MouseEvent) => {
      // On met à jour la position seulement si on est dans la section projets (optimisation)
      setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const activeHoveredProject = PROJECTS.find(p => p.id === hoveredProjectId) || null;
  const categories = ['All', ...Object.values(ProjectCategory)];

  // Navigation Logic
  const handleProjectClick = (project: Project) => {
    setHoveredProjectId(null); // BUG FIX: Clear preview immediately on click
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
      
      {/* Floating Preview Image (Only visible on Desktop when hovering list) */}
      <FloatingPreview 
        activeProject={activeHoveredProject} 
        isVisible={!!hoveredProjectId} 
        cursorX={cursorPos.x} 
        cursorY={cursorPos.y} 
      />

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
                        
                        {/* LEFT: TEXT CONTENT */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            
                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 w-fit mb-8 animate-in slide-in-from-left-4 duration-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-xs font-mono text-green-400 font-bold uppercase tracking-widest">Available for projects</span>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-bold tracking-tighter leading-[0.9] mb-6 text-white">
                                <span className="block text-stroke hover:text-white transition-colors duration-500 cursor-default">ANTOINE</span>
                                <span className="block text-white">SAVOYANT</span>
                            </h1>
                            
                            {/* Subtitle */}
                            <p className="text-xl md:text-2xl text-slate-400 max-w-xl border-l-2 border-primary/30 pl-6 py-2 mb-8">
                                Creative Developer & UI Designer.
                                <br />
                                <span className="text-slate-500 text-base mt-2 block">
                                    Je construis des interfaces web immersives et performantes avec une attention maniaque aux détails.
                                </span>
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap items-center gap-6 mb-12">
                                <button 
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white text-slate-900 font-bold hover:bg-primary hover:text-black hover:scale-105 transition-all rounded-full shadow-lg flex items-center gap-2"
                                >
                                    EXPLORER <ArrowRight size={18} />
                                </button>
                                <button onClick={() => handleNav('about')} className="text-slate-400 hover:text-white underline decoration-slate-700 underline-offset-4 font-mono text-sm px-4 py-2">
                                    MON PROFIL & SKILLS
                                </button>
                            </div>

                            {/* Social Proof / Links Row */}
                            <div className="flex items-center gap-6 text-slate-500">
                                <a href="https://github.com/Antoine-savt" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2 text-sm font-mono">
                                    <span className="p-2 bg-white/5 rounded-full"><Code size={16} /></span> GitHub
                                </a>
                                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                                <a href="#" className="hover:text-white transition-colors flex items-center gap-2 text-sm font-mono">
                                    <span className="p-2 bg-white/5 rounded-full"><Linkedin size={16} /></span> LinkedIn
                                </a>
                                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                                <a href="#" className="hover:text-white transition-colors flex items-center gap-2 text-sm font-mono">
                                    <span className="p-2 bg-white/5 rounded-full"><Twitter size={16} /></span> Twitter
                                </a>
                            </div>
                        </div>

                        {/* RIGHT: ABSTRACT VISUAL / TECH CARD */}
                        <div className="lg:col-span-5 hidden lg:flex justify-end items-center h-full perspective-1000">
                             {/* Floating Glass Card */}
                             <div className="relative w-full max-w-md p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent animate-float">
                                <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
                                    {/* Decoration */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[40px]"></div>
                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-[40px]"></div>
                                    
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-8 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                                                <Terminal size={18} className="text-primary"/>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-sm">Antoine.tsx</h3>
                                                <span className="text-[10px] text-slate-400 font-mono">React Developer</span>
                                            </div>
                                        </div>
                                        <Globe size={18} className="text-slate-500 animate-pulse-slow" />
                                    </div>

                                    {/* Code/Data Viz */}
                                    <div className="space-y-4 font-mono text-xs relative z-10">
                                        <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-white/5">
                                            <span>Current Location</span>
                                            <span className="text-white flex items-center gap-1"><MapPin size={10} /> Paris, FR</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-white/5">
                                            <span>Main Focus</span>
                                            <span className="text-primary">Frontend Architecture</span>
                                        </div>
                                        
                                        <div className="pt-2">
                                            <span className="block text-slate-500 mb-2">Favorite Stack</span>
                                            <div className="flex flex-wrap gap-2">
                                                {['Next.js', 'TypeScript', 'Tailwind', 'Motion'].map(tech => (
                                                    <span key={tech} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-slate-300">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Activity */}
                                    <div className="mt-6 p-3 bg-black/20 rounded-lg border border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] text-slate-300 font-mono">Compiling...</span>
                                        </div>
                                        <span className="text-[10px] text-slate-500">v2.4.0</span>
                                    </div>
                                </div>
                             </div>
                        </div>

                    </div>
                    {/* Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-50 text-white">
                        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
                        <ChevronDown />
                    </div>
                </section>

                {/* --- NEW DESIGN: THE DIRECTORY LIST --- */}
                <section 
                    id="projects" 
                    className="py-20 relative" 
                    onMouseMove={handleMouseMove} // Track mouse for preview
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        
                        {/* Header & Filter */}
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                            <div>
                                <span className="text-primary font-mono text-sm mb-2 block tracking-widest flex items-center gap-2 uppercase">
                                    <Sparkles size={14} /> Travaux & Projets
                                </span>
                                <h2 className="text-5xl md:text-7xl font-bold text-white">
                                    Mes <br/><span className="text-slate-700 dark:text-slate-600">Réalisations.</span>
                                </h2>
                            </div>
                            
                            {/* Stylish Filters */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                    key={cat}
                                    onClick={() => setFilter(cat as ProjectCategory | 'All')}
                                    className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 border ${
                                        filter === cat 
                                        ? 'bg-white text-black border-white' 
                                        : 'bg-transparent text-slate-500 border-slate-800 hover:border-slate-500 hover:text-white'
                                    }`}
                                    >
                                    {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* DESKTOP LIST VIEW */}
                        <div className="hidden lg:flex flex-col w-full border-t border-white/10">
                            {filteredProjects.map((project, index) => (
                                <div 
                                    key={project.id}
                                    onMouseEnter={() => setHoveredProjectId(project.id)}
                                    onMouseLeave={() => setHoveredProjectId(null)}
                                    onClick={() => handleProjectClick(project)}
                                    className={`group relative py-10 border-b border-white/10 cursor-pointer transition-all duration-500 flex items-center justify-between px-4 hover:px-8 hover:bg-white/5 ${
                                        hoveredProjectId && hoveredProjectId !== project.id ? 'opacity-30 blur-[1px]' : 'opacity-100'
                                    }`}
                                >
                                    <div className="flex items-center gap-12">
                                        <span className="font-mono text-xl text-slate-600 group-hover:text-primary transition-colors">
                                            0{index + 1}
                                        </span>
                                        <h3 className="text-5xl md:text-6xl font-bold text-white group-hover:text-white transition-transform duration-300 group-hover:translate-x-4 tracking-tight">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-16">
                                        <div className="text-right hidden xl:block">
                                            <span className="block text-xs font-mono text-slate-500 uppercase mb-1">Services</span>
                                            <div className="flex gap-2 justify-end">
                                                {project.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-xs font-mono text-slate-400 border border-white/5 px-2 py-1 rounded bg-white/5">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-8 min-w-[150px] justify-end">
                                            <span className="text-sm font-mono text-slate-500 border border-white/10 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                                                {project.year}
                                            </span>
                                            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-300 transform group-hover:scale-110">
                                                <ArrowRight size={24} className="group-hover:-rotate-45 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* MOBILE GRID VIEW (Fallback) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
                            {filteredProjects.map((project, index) => (
                                <div 
                                    key={project.id}
                                    onClick={() => handleProjectClick(project)}
                                    className="group relative bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                                        <div className="flex justify-between items-start mb-2">
                                             <span className="text-primary text-xs font-mono uppercase tracking-wider">{project.category}</span>
                                             <span className="text-slate-400 text-xs font-mono">{project.year}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-white font-bold mt-4">
                                            Voir le projet <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="py-24 flex justify-center text-center">
                            <div>
                                <p className="text-slate-600 font-mono text-sm mb-2">Envie d'en voir plus ?</p>
                                <a href="https://github.com/Antoine-savt" target="_blank" rel="noreferrer" className="text-white border-b border-white hover:text-primary hover:border-primary transition-colors pb-1 inline-flex items-center gap-2">
                                    Explorer les archives GitHub <ArrowUpRight size={14} />
                                </a>
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