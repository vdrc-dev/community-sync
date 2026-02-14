import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Presentation, Rocket, Map, Building2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/roadmap-tower-clean.jpg';

const ICON_MAP: Record<number, React.ComponentType<{ className?: string }>> = {
  1: Shield,
  2: BarChart3,
  3: Presentation,
  4: Rocket,
};

const DEFAULT_SESSIONS = [
  { num: 4, title: 'Desarrollo de Software', desc: 'Vibe Coding • Tu propia App', icon: Rocket, color: 'emerald', emoji: '🚀' },
  { num: 3, title: 'Comunicación', desc: 'Storytelling visual', icon: Presentation, color: 'violet', emoji: '🎯' },
  { num: 2, title: 'Datos y Productividad', desc: 'Adiós Excel • Perplexity', icon: BarChart3, color: 'cyan', emoji: '📊' },
  { num: 1, title: 'Higiene Digital', desc: 'Inbox Cero • Seguridad • Navegadores', icon: Shield, color: 'teal', emoji: '🧹', isActive: true },
];

export function Slide09Roadmap() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(9);
  const roadmapImage = (content.imageUrl as string) || CLOUD_URL;
  
  // Database-driven content with fallback
  const dbSessions = content.sessions as Array<{ num: number; title: string; desc: string; color: string; emoji?: string; isActive?: boolean }>;
  const metaphor = (content.metaphor as string) || 'No puedes construir un rascacielos sobre cimientos de barro';
  
  // Build sessions array - reverse order for display (4 to 1)
  const sessions = dbSessions 
    ? [...dbSessions].sort((a, b) => b.num - a.num)
    : DEFAULT_SESSIONS;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex flex-col font-sans selection:bg-teal-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[700px] h-[600px] bg-teal-500/8 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[400px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        
        {/* Header */}
        <motion.header {...getMotionProps(0.1)} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-teal-500/15 to-cyan-500/10 border border-teal-500/30 rounded-full">
              <Map className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-sm font-semibold tracking-wide uppercase">Roadmap</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
            CONSTRUYE TU{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 40%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              RASCACIELOS
            </span>
          </h1>
          <p className="text-white/40 text-base mt-2">{metaphor}</p>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex gap-10 items-center">
          
          {/* Left - Tower Image */}
          <motion.div {...getMotionProps(0.2)} className="w-[280px] shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img 
                src={roadmapImage} 
                alt="Torre en construcción" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020609] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span className="text-white/80 text-xs font-medium">Tu stack digital</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Sessions */}
          <div className="flex-1 flex flex-col gap-3">
            {sessions.map((session, i) => {
              const Icon = ICON_MAP[session.num] || Shield;
              const isActive = session.isActive || false;
              const emoji = session.emoji || '✨';
              
              const colorStyles = {
                teal: { bg: 'bg-teal-500/15', border: 'border-teal-500/50', text: 'text-teal-400', iconBg: 'bg-teal-500' },
                cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', iconBg: 'bg-cyan-500/20' },
                violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', iconBg: 'bg-violet-500/20' },
                emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
              }[session.color] || { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/60', iconBg: 'bg-white/10' };
              
              return (
                <motion.div
                  key={session.num}
                  {...getMotionProps(0.25 + i * 0.1)}
                  className="group relative"
                >
                  {isActive && (
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 to-cyan-500/20 rounded-2xl blur-md"
                      animate={isExporting ? {} : { opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <div className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    isActive 
                      ? `${colorStyles.bg} ${colorStyles.border}` 
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                  }`}>
                    
                    {/* Session number */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-teal-500 shadow-lg shadow-teal-500/30' : colorStyles.iconBg + ' border ' + colorStyles.border
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : colorStyles.text}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-bold ${isActive ? 'text-teal-400' : 'text-white/30'}`}>
                          SESIÓN {session.num}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 bg-teal-500/30 rounded text-[10px] font-bold text-teal-300 uppercase">
                            Hoy
                          </span>
                        )}
                      </div>
                      <p className={`font-bold text-lg ${isActive ? 'text-white' : 'text-white/80'}`}>
                        {session.title}
                      </p>
                      <p className={`text-sm ${isActive ? 'text-teal-200/80' : 'text-white/40'}`}>
                        {session.desc}
                      </p>
                    </div>
                    
                    {/* Emoji */}
                    <span className={`text-2xl shrink-0 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                      {emoji}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/15 tabular-nums tracking-wide">
        9 / 29
      </div>
    </div>
  );
}
