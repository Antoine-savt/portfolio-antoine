import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Tilt intensity
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div className="group cursor-pointer">
        {/* Index Number Outside/Behind */}
        <div className="flex items-end justify-between mb-3 px-2">
             <span className="text-6xl font-bold text-slate-200 dark:text-white/5 font-mono leading-none group-hover:text-primary/40 dark:group-hover:text-primary/20 transition-colors duration-500">
                {formattedIndex}
             </span>
             <div className="flex gap-2">
                 {project.tags.slice(0, 2).map(tag => (
                     <span key={tag} className="text-[10px] uppercase font-mono text-slate-500 border border-slate-200 dark:border-white/10 px-2 py-1 rounded-full">
                         {tag}
                     </span>
                 ))}
             </div>
        </div>

        <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="relative h-[450px] w-full perspective-1000"
        style={{
            perspective: '1000px'
        }}
        >
        <div 
            className="relative h-full w-full rounded-none md:rounded-lg overflow-hidden transition-transform duration-300 ease-out border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-800 shadow-xl dark:shadow-2xl"
            style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d'
            }}
        >
            {/* Background Image with Reduced Hover Zoom */}
            <div className="absolute inset-0">
            <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-80 group-hover:opacity-70 dark:group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-slate-950 dark:via-slate-950/20 dark:to-transparent" />
            </div>

            {/* Content Layer (3D) */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-z-10" style={{ transform: 'translateZ(20px)' }}>
            
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 leading-none mix-blend-hard-light dark:mix-blend-screen">
                {project.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-400 text-sm line-clamp-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 w-3/4">
                    {project.description}
                </p>
            </div>

            {/* Action Icon */}
            <div className="absolute bottom-8 right-8 w-14 h-14 border border-slate-900/20 dark:border-white/20 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300 text-slate-900 dark:text-white">
                <ArrowUpRight size={24} />
            </div>
            </div>

            {/* Shine Overlay */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)`
                }}
            />
        </div>
        </div>
    </div>
  );
};

export default ProjectCard;