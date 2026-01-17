import React from 'react';
import { Github, Star, GitCommit, GitBranch } from 'lucide-react';

const GithubSection: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-8 border border-slate-200 dark:border-white/10 relative overflow-hidden group bg-white/50 dark:bg-transparent">
        {/* Decorative Background */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-slate-200/30 dark:bg-slate-700/30 rounded-full blur-3xl group-hover:bg-slate-300/30 dark:group-hover:bg-slate-600/30 transition-colors duration-500"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg">
                    <Github size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">@Antoine-savt</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">github.com/Antoine-savt</p>
                </div>
            </div>
            <a href="https://github.com/Antoine-savt" target="_blank" rel="noreferrer" className="mt-4 md:mt-0 px-6 py-2 border border-slate-300 dark:border-white/20 rounded-full text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all flex items-center gap-2">
                <Star size={16} /> FOLLOW
            </a>
        </div>

        {/* Mock Activity Graph */}
        <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs text-slate-500 font-mono">CONTRIBUTIONS (LAST YEAR)</span>
                <span className="text-xs text-primary font-bold">1,243 COMMITS</span>
            </div>
            <div className="flex gap-1 h-12 items-end">
                {Array.from({ length: 40 }).map((_, i) => {
                    const height = Math.floor(Math.random() * 100) + 10;
                    const opacity = Math.max(0.2, height / 100);
                    return (
                        <div 
                            key={i} 
                            className="flex-1 bg-primary rounded-sm transition-all duration-300 hover:bg-slate-900 dark:hover:bg-white"
                            style={{ 
                                height: `${height}%`,
                                opacity: opacity
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>

        {/* Latest Activity Items */}
        <div className="space-y-3 relative z-10">
             <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 p-3 bg-white dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-colors shadow-sm dark:shadow-none">
                <GitCommit size={16} className="text-primary" />
                <span className="font-mono text-xs opacity-50">2h ago</span>
                <span>Feat: Added new 3D transitions</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 p-3 bg-white dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-colors shadow-sm dark:shadow-none">
                <GitBranch size={16} className="text-secondary" />
                <span className="font-mono text-xs opacity-50">5h ago</span>
                <span>Merge pull request #42 from feature/bento-grid</span>
             </div>
        </div>
    </div>
  );
};

export default GithubSection;