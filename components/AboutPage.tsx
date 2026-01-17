import React from 'react';
import { Coffee, Globe, Heart, MapPin, Cpu, Zap, Code, Terminal, Briefcase, Music, Award, Layout, ArrowUpRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
      
      {/* Header Explosif */}
      <div className="mb-20 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <span className="relative z-10 text-primary font-mono text-sm tracking-[0.3em] mb-4 block uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary"></span>
            Profile_Data.json
          </span>
          <h2 className="relative z-10 text-6xl md:text-8xl font-bold text-slate-900 dark:text-white leading-none">
            CREATIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-800 to-slate-400 dark:from-slate-500 dark:via-white dark:to-slate-500">DEVELOPER</span>
          </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* === COLUMN 1 & 2 (Left Side) === */}

        {/* 1. BIO PRINCIPALE */}
        <div className="md:col-span-2 lg:col-span-2 row-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 shadow-sm dark:shadow-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity text-slate-900 dark:text-white">
                <Terminal size={120} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                    Je ne code pas seulement, je construis des <span className="text-primary">expériences digitales</span>.
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    Développeur Frontend passionné par le pont entre le design et la technologie. 
                    Obsédé par la fluidité des animations, la rigueur du pixel-perfect et l'architecture logicielle propre.
                </p>
            </div>
        </div>

        {/* 4. SERVICES / SKILLS */}
        <div className="md:col-span-2 lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group shadow-sm dark:shadow-none">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/10 rounded-full blur-[60px] group-hover:bg-secondary/20 transition-all"></div>
            
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 flex items-center gap-2 relative z-10">
                <Zap size={18} className="text-yellow-500 dark:text-yellow-400"/> Services & Expertise
            </h4>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-start gap-3">
                    <Layout size={20} className="text-primary mt-1" />
                    <div>
                        <h5 className="text-slate-900 dark:text-white font-bold text-sm">Architecture</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">React, Next.js</p>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-start gap-3">
                    <Cpu size={20} className="text-accent mt-1" />
                    <div>
                        <h5 className="text-slate-900 dark:text-white font-bold text-sm">Creative</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">WebGL, Three.js</p>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-start gap-3">
                    <ArrowUpRight size={20} className="text-green-500 dark:text-green-400 mt-1" />
                    <div>
                        <h5 className="text-slate-900 dark:text-white font-bold text-sm">Motion</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Framer, GSAP</p>
                    </div>
                </div>
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-start gap-3">
                    <Terminal size={20} className="text-purple-500 dark:text-purple-400 mt-1" />
                    <div>
                        <h5 className="text-slate-900 dark:text-white font-bold text-sm">Systems</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tailwind, Storybook</p>
                    </div>
                </div>
            </div>
        </div>

        {/* === COLUMN 3 & 4 (Right Side) === */}

        {/* 2. CARTE IDENTITÉ */}
        <div className="md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 group bg-slate-800 dark:bg-slate-800 shadow-sm dark:shadow-none">
            <div className="absolute inset-0 flex flex-col">
                {/* Photo Top */}
                <div className="h-3/5 relative overflow-hidden">
                     <img src="https://picsum.photos/600/800?grayscale" alt="Antoine Savoyant" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 dark:opacity-90" />
                </div>
                
                {/* Info Bottom */}
                <div className="h-2/5 p-8 flex flex-col justify-end bg-white dark:bg-slate-900 relative">
                    <div className="mb-4">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Antoine Savoyant</h3>
                                <p className="text-primary font-mono text-xs uppercase tracking-wider">Étudiant & Développeur</p>
                             </div>
                             <span className="inline-block px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-green-500/20">
                                Open for Work
                            </span>
                        </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                        "En classe préparatoire à Grandchamp. Je combine rigueur académique et créativité numérique."
                    </p>

                    <div className="flex gap-4 text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-white/10">
                        <MapPin size={16} /> <span className="text-xs font-mono">Paris / Versailles</span>
                    </div>
                </div>
            </div>
        </div>

        {/* === BOTTOM ROW (Mix) === */}

        {/* 3. EXPERIENCE TIMELINE */}
        <div className="md:col-span-1 lg:col-span-1 row-span-2 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex flex-col overflow-hidden relative group hover:border-slate-300 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 flex items-center gap-2">
                <Briefcase size={18} className="text-primary"/> Parcours
            </h4>
            <div className="space-y-8 relative pl-2">
                {/* Line */}
                <div className="absolute top-2 left-[5px] w-px h-full bg-gradient-to-b from-primary via-slate-200 dark:via-white/10 to-transparent"></div>

                <div className="relative pl-6">
                    <div className="absolute top-1.5 left-0 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                    <span className="text-xs font-mono text-primary mb-1 block">2023 - PRÉSENT</span>
                    <h5 className="text-slate-900 dark:text-white font-bold text-sm">Classe Préparatoire</h5>
                    <p className="text-slate-500 text-xs mt-1">Lycée Notre-Dame du Grandchamp.</p>
                </div>

                <div className="relative pl-6 opacity-80">
                    <div className="absolute top-1.5 left-0 w-2.5 h-2.5 bg-slate-400 dark:bg-slate-600 rounded-full border border-slate-300 dark:border-slate-400"></div>
                    <span className="text-xs font-mono text-slate-400 mb-1 block">2020 - 2023</span>
                    <h5 className="text-slate-900 dark:text-white font-bold text-sm">Lycée</h5>
                    <p className="text-slate-500 text-xs mt-1">Baccalauréat Général, Mention TB.</p>
                </div>

                 <div className="relative pl-6 opacity-60">
                    <div className="absolute top-1.5 left-0 w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600"></div>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-1 block">AUTODIDACTE</span>
                    <h5 className="text-slate-900 dark:text-white font-bold text-sm">Dev Web</h5>
                    <p className="text-slate-500 text-xs mt-1">React, TS, UI Design.</p>
                </div>
            </div>
        </div>

        {/* 5. TECH STACK */}
        <div className="md:col-span-1 lg:col-span-1 bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-3xl p-6 overflow-hidden relative group flex flex-col justify-center shadow-sm dark:shadow-none">
            <h4 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                <Code size={18} className="text-slate-500 dark:text-slate-400"/> Arsenal
            </h4>
            <div className="flex flex-wrap gap-2">
                 {['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind', 'Framer', 'Three.js', 'Figma', 'Git', 'Vercel'].map((tech, i) => (
                     <span key={tech} className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-[10px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-colors cursor-default shadow-sm dark:shadow-none">
                         {tech}
                     </span>
                 ))}
            </div>
        </div>

        {/* 6. VIBE / MUSIC */}
        <div className="md:col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-600 to-slate-800 dark:from-indigo-900 dark:to-slate-900 border border-white/10 rounded-3xl p-6 flex flex-row justify-between items-center relative overflow-hidden group shadow-md dark:shadow-none">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            
            <div className="relative z-10 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-white/10 rounded-full">
                        <Music size={20} className="text-white" />
                     </div>
                     <span className="text-xs text-indigo-100 dark:text-indigo-200 font-mono tracking-widest">ON REPEAT</span>
                </div>
                <p className="text-white font-bold text-xl leading-tight">Lofi Beats & <br/>Synthwave</p>
            </div>

            {/* Graphic Equalizer Visualization */}
            <div className="relative z-10 flex gap-1.5 items-end h-16 w-32 justify-end">
                <div className="w-2 bg-primary/80 rounded-t-sm animate-[pulse_1s_ease-in-out_infinite] h-[40%]"></div>
                <div className="w-2 bg-secondary/80 rounded-t-sm animate-[pulse_1.2s_ease-in-out_infinite_0.1s] h-[80%]"></div>
                <div className="w-2 bg-accent/80 rounded-t-sm animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-[60%]"></div>
                <div className="w-2 bg-white/80 rounded-t-sm animate-[pulse_1.1s_ease-in-out_infinite_0.3s] h-[90%]"></div>
                <div className="w-2 bg-primary/80 rounded-t-sm animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-[50%]"></div>
                <div className="w-2 bg-secondary/80 rounded-t-sm animate-[pulse_1.3s_ease-in-out_infinite_0.5s] h-[70%]"></div>
            </div>
        </div>

        {/* 7. STATS */}
        <div className="md:col-span-3 lg:col-span-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-3xl p-8 flex flex-col md:flex-row justify-around items-center gap-8 relative overflow-hidden shadow-sm dark:shadow-none">
             <div className="text-center group">
                 <span className="block text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">4+</span>
                 <span className="text-sm text-slate-500 font-mono tracking-widest uppercase">Années d'Exp.</span>
             </div>
             <div className="w-px h-12 bg-slate-300 dark:bg-white/10 hidden md:block"></div>
             <div className="text-center group">
                 <span className="block text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">25+</span>
                 <span className="text-sm text-slate-500 font-mono tracking-widest uppercase">Projets Livrés</span>
             </div>
             <div className="w-px h-12 bg-slate-300 dark:bg-white/10 hidden md:block"></div>
             <div className="text-center group">
                 <span className="block text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">∞</span>
                 <span className="text-sm text-slate-500 font-mono tracking-widest uppercase">Cafés bus</span>
             </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;