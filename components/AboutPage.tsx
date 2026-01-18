import React, { useState } from 'react';
import { BookOpen, Code, Briefcase, Zap, Brain, Coffee, Layers, ChevronDown, Trophy, Target, Sparkles, MousePointer2 } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [activeSide, setActiveSide] = useState<'left' | 'right' | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative animate-in fade-in duration-700 font-sans">
      
      {/* --- SECTION 1: THE DUALITY (SPLIT SCREEN) --- */}
      <div className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* CENTER LABEL (Mobile hidden, Desktop visible) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-opacity duration-300 hidden md:flex flex-col items-center gap-2 ${activeSide ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-black text-white px-4 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-white/20">
                La Dualité
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.5)] animate-pulse">
                VS
            </div>
            <div className="w-px h-12 bg-white/20"></div>
        </div>

        {/* LEFT SIDE: THE SCHOLAR (CPGE) */}
        <div 
            onMouseEnter={() => setActiveSide('left')}
            onMouseLeave={() => setActiveSide(null)}
            className={`relative h-1/2 md:h-full transition-all duration-700 ease-in-out overflow-hidden border-b md:border-b-0 md:border-r border-white/10 group
            ${activeSide === 'left' ? 'md:w-[75%]' : activeSide === 'right' ? 'md:w-[25%]' : 'md:w-1/2'}
            bg-slate-100 text-slate-900 cursor-crosshair
            `}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
            
            {/* Content Container */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-start z-10">
                
                {/* Header */}
                <div className={`transition-all duration-500 ${activeSide === 'right' ? 'opacity-0 blur-sm' : 'opacity-100'}`}>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-4">
                        <BookOpen size={14} /> The Scholar
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-2 font-serif tracking-tight">
                        L'Étudiant <br/>CPGE ECT.
                    </h2>
                    <p className="text-slate-600 max-w-md text-lg font-serif italic">
                        "La rigueur, l'analyse et la stratégie."
                    </p>
                </div>

                {/* Details (Revealed on Hover/Active) */}
                <div className={`mt-8 space-y-6 transition-all duration-700 delay-100 transform ${activeSide === 'left' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 md:opacity-0 md:translate-y-10'}`}>
                     <div className="border-l-2 border-blue-500 pl-4">
                        <h4 className="font-bold text-xl">Lycée Notre-Dame du Grandchamp</h4>
                        <p className="text-slate-600">Prépa Économique et Commerciale (Voie Techno)</p>
                     </div>
                     
                     {/* RPG Stats */}
                     <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200 max-w-sm">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Class Attributes</h5>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span>ANALYSE</span>
                                    <span>95/100</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 w-[95%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span>ÉCONOMIE & DROIT</span>
                                    <span>88/100</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 w-[88%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span>MANAGEMENT</span>
                                    <span>92/100</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 w-[92%]"></div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Floating Decor */}
                <Target className="absolute bottom-12 right-12 text-slate-200 w-64 h-64 -z-10 opacity-50 rotate-12" strokeWidth={0.5} />
            </div>
        </div>

        {/* RIGHT SIDE: THE MAKER (DEV) */}
        <div 
            onMouseEnter={() => setActiveSide('right')}
            onMouseLeave={() => setActiveSide(null)}
            className={`relative h-1/2 md:h-full transition-all duration-700 ease-in-out overflow-hidden group
            ${activeSide === 'right' ? 'md:w-[75%]' : activeSide === 'left' ? 'md:w-[25%]' : 'md:w-1/2'}
            bg-slate-900 text-white cursor-crosshair
            `}
        >
             {/* Background Matrix */}
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

             <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-end text-right z-10">
                
                {/* Header */}
                <div className={`transition-all duration-500 flex flex-col items-end ${activeSide === 'left' ? 'opacity-0 blur-sm' : 'opacity-100'}`}>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold tracking-widest uppercase mb-4">
                        The Maker <Code size={14} />
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-2 font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        Le Développeur <br/>Freelance.
                    </h2>
                    <p className="text-slate-400 max-w-md text-lg font-mono">
                        "<code>const creativity = Infinity;</code>"
                    </p>
                </div>

                 {/* Details (Revealed on Hover/Active) */}
                 <div className={`mt-8 space-y-6 transition-all duration-700 delay-100 transform flex flex-col items-end ${activeSide === 'right' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 md:opacity-0 md:translate-y-10'}`}>
                     <div className="border-r-2 border-primary pr-4">
                        <h4 className="font-bold text-xl text-white">Fullstack Creative</h4>
                        <p className="text-slate-400 font-mono text-sm">React • Next.js • Three.js • UI/UX</p>
                     </div>
                     
                     {/* RPG Stats */}
                     <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-xl shadow-2xl border border-white/10 max-w-sm w-full text-left">
                        <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 font-mono">Skill Tree</h5>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                                    <span>FRONTEND MAGIC</span>
                                    <span className="text-primary">LVL 99</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[99%] shadow-[0_0_10px_#38bdf8]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                                    <span>3D & MOTION</span>
                                    <span className="text-secondary">LVL 85</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-secondary w-[85%] shadow-[0_0_10px_#a855f7]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                                    <span>SYSTEM DESIGN</span>
                                    <span className="text-green-400">LVL 90</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-400 w-[90%] shadow-[0_0_10px_#4ade80]"></div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Floating Decor */}
                <Layers className="absolute top-12 left-12 text-primary w-64 h-64 -z-10 opacity-10 animate-float" strokeWidth={0.5} />
             </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce flex flex-col items-center gap-2 z-40 pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest">Scroll to Merge</span>
            <ChevronDown size={20} />
        </div>
      </div>

      {/* --- SECTION 2: THE SYNTHESIS (SCROLL CONTENT) --- */}
      <div className="relative bg-slate-950 py-32 px-6 md:px-12 overflow-hidden">
         {/* Decoration Background */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>

         <div className="max-w-5xl mx-auto relative z-10">
             
             <div className="text-center mb-24">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 animate-pulse">
                    <Sparkles size={16} className="text-yellow-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">La Synergie</span>
                 </div>
                 <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    Pourquoi choisir <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">l'un quand on peut avoir les deux ?</span>
                 </h3>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Mon profil atypique est ma plus grande force. Je ne suis pas juste un "codeur".
                    Je comprends les enjeux business (grâce à la prépa) et je sais les traduire techniquement (grâce au dev).
                 </p>
             </div>

             {/* The 3 Cards of Power */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Card 1 */}
                 <div className="group relative p-8 bg-slate-900/50 border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-2">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                        <Brain size={24} />
                    </div>
                    <h4 className="text-xl font-bold mb-3">Vision Stratégique</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        En ECT, j'apprends à analyser un marché, comprendre un besoin client et structurer une offre. Je ne code pas à l'aveugle, je code pour résoudre un problème.
                    </p>
                 </div>

                 {/* Card 2 */}
                 <div className="group relative p-8 bg-slate-900/50 border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-2">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                    </div>
                    <h4 className="text-xl font-bold mb-3">Exécution Rapide</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        La prépa m'a appris à travailler vite et sous pression. Le développement m'a appris à automatiser. Résultat : une productivité décuplée.
                    </p>
                 </div>

                 {/* Card 3 */}
                 <div className="group relative p-8 bg-slate-900/50 border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-2">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                        <Coffee size={24} />
                    </div>
                    <h4 className="text-xl font-bold mb-3">Résilience</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Un bug bloquant ? Une deadline serrée ? Un DS de maths de 4h ? Même combat. Je ne lâche rien tant que la solution n'est pas trouvée.
                    </p>
                 </div>
             </div>

             {/* Fun Footer CTA */}
             <div className="mt-32 text-center">
                 <p className="text-slate-500 font-mono mb-4 text-xs uppercase tracking-widest">ARE YOU READY ?</p>
                 <a 
                    href="#contact" 
                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                 >
                    <MousePointer2 size={20} /> DÉMARRER LA MISSION
                 </a>
             </div>

         </div>
      </div>
    </div>
  );
};

export default AboutPage;