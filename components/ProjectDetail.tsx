import React, { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, Calendar, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-20 animate-in fade-in duration-500 transition-colors duration-300">
      
      {/* Hero Image Parallax-like */}
      <div className="relative h-[60vh] w-full overflow-hidden group">
        <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-slate-900 dark:via-slate-900/40 dark:to-transparent" />
        
        {/* Back Button */}
        <button 
            onClick={onBack}
            className="absolute top-24 left-6 md:left-12 z-50 flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all group/btn shadow-lg"
        >
            <ArrowLeft size={18} className="group-hover/btn:-translate-x-1 transition-transform" /> 
            <span className="text-sm font-bold tracking-widest">RETOUR</span>
        </button>

        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-12">
            <div className="max-w-7xl mx-auto">
                <span className="px-4 py-2 bg-primary text-slate-900 font-bold text-sm uppercase tracking-widest mb-6 inline-block rounded-sm shadow-md">
                    {project.category}
                </span>
                <h1 className="text-5xl md:text-8xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight drop-shadow-md">{project.title}</h1>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Sidebar Info - Sticky */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit">
            <div className="glass-panel p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-800/30 shadow-sm dark:shadow-none">
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 dark:border-white/10 pb-4">Spécifications</h3>
                
                <div className="space-y-6">
                    <div>
                        <span className="block text-xs text-slate-500 mb-1 font-mono">ANNÉE</span>
                        <div className="flex items-center text-slate-900 dark:text-white font-bold text-lg"><Calendar size={16} className="mr-2 text-primary"/> {project.year}</div>
                    </div>
                    <div>
                        <span className="block text-xs text-slate-500 mb-1 font-mono">STACK</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-xs text-slate-600 dark:text-slate-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                 {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-primary dark:hover:bg-primary transition-colors rounded-xl shadow-lg shadow-black/5">
                        <ExternalLink size={18} /> LIVE PREVIEW
                    </a>
                 )}
                 {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors rounded-xl">
                        <Github size={18} /> REPO GITHUB
                    </a>
                 )}
            </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8">
            <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-200 font-light leading-relaxed mb-12 border-l-4 border-primary pl-6">
                {project.detailedDescription}
            </p>

            <div className="space-y-16">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
                        <span className="w-12 h-1 bg-gradient-to-r from-primary to-transparent mr-4 rounded-full"></span> Concept & Challenge
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        Ce projet est né d'une volonté de repousser les limites de l'interaction web standard. 
                        L'objectif principal était de créer une interface utilisateur qui soit à la fois esthétique et hautement fonctionnelle. 
                        Nous devions résoudre des problèmes de performance liés au rendu de grandes quantités de données tout en maintenant une fluidité d'animation constante.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                        <Layers className="text-primary mb-4" size={32} />
                        <h4 className="text-slate-900 dark:text-white font-bold mb-2">Architecture</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Structure modulaire basée sur des composants réutilisables pour assurer une scalabilité maximale.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                        <Github className="text-secondary mb-4" size={32} />
                        <h4 className="text-slate-900 dark:text-white font-bold mb-2">Open Source</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Certaines parties du code, notamment les hooks d'animation, ont été publiées en open source.</p>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-200 dark:border-white/10">
                    <img src={`https://picsum.photos/1200/600?random=${project.id}b`} alt="Interface detail" className="w-full rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;