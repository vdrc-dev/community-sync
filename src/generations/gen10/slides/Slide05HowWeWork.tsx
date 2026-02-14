import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Laptop, Video, Mic, CloudUpload, Settings, Headphones, CheckCircle2, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, PreparationItem, SupportInfo } from '@/hooks/useSlideContent';

// Icon map for dynamic rendering
const ICON_MAP: Record<string, LucideIcon> = {
  Laptop, Video, Mic, CloudUpload,
};

// Default fallback data
const DEFAULT_PREPARATIONS: PreparationItem[] = [
  { num: 1, title: 'Suscripción a ChatGPT/Claude', desc: 'Recomendada pero opcional para práctica', icon: 'Laptop', emoji: '💻' },
  { num: 2, title: 'Cámaras encendidas', desc: 'Participación activa y preguntas bienvenidas', icon: 'Video', emoji: '📹' },
  { num: 3, title: 'Autorización de grabación', desc: 'Sesiones grabadas para repaso posterior', icon: 'Mic', emoji: '🎙️' },
  { num: 4, title: 'Drive/Teams compartido', desc: 'Carpeta con documentos y recursos clave', icon: 'CloudUpload', emoji: '☁️' },
];

const DEFAULT_SUPPORT_INFO: SupportInfo = {
  phone: '+56 9 7699 8520',
  message: 'Llamen o escríbanme cuando quieran',
  note: 'Siempre respondo, solo que no muy rápido',
};

export function Slide05HowWeWork() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(5);

  // Use data from DB or fallback to defaults
  const preparations = content.preparations || DEFAULT_PREPARATIONS;
  const supportInfo = content.supportInfo || DEFAULT_SUPPORT_INFO;

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
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-teal-500/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-cyan-500/6 rounded-full blur-[150px]" />
        
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating particles */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-32 left-16 w-2.5 h-2.5 rounded-full bg-teal-400/50"
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-2 h-2 rounded-full bg-cyan-400/40"
            animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-10">
        
        {/* Header */}
        <motion.header {...getMotionProps(0.1)} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-teal-500/15 to-cyan-500/10 border border-teal-500/30 rounded-full">
              <Settings className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-sm font-semibold tracking-wide uppercase">Metodología</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            CÓMO{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 40%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              FUNCIONAREMOS
            </span>
          </h1>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-2 gap-8">
          
          {/* Left Column - Support */}
          <motion.div {...getMotionProps(0.2)} className="group relative">
            {/* Hover glow */}
            <div className="absolute -inset-px bg-gradient-to-b from-teal-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative h-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col group-hover:border-teal-500/30 transition-colors">
              
              {/* Top accent */}
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent rounded-full" />
              
              {/* Header */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Headphones className="w-5 h-5 text-teal-400" />
                <h2 className="text-xl font-bold text-white uppercase tracking-wide">Soporte y Contacto</h2>
              </div>
              
              {/* Phone Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  {...(isExporting ? {} : {
                    animate: { rotate: [-5, 5, -5] },
                    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
                  })}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-teal-500/30 rounded-2xl blur-xl" />
                  <div className="relative p-5 bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-2xl border border-teal-500/40">
                    <Phone className="w-12 h-12 text-teal-400" />
                  </div>
                </motion.div>
              </div>
              
              <p className="text-white/50 text-center mb-6 leading-relaxed text-sm">
                Estoy aquí para ayudarlos durante este periodo, pero no es un soporte técnico continuo.
              </p>
              
              {/* Contact Card */}
              <div className="mt-auto">
                <div className="p-5 bg-teal-500/[0.08] border border-teal-500/25 rounded-xl">
                  <p className="text-white/70 text-center text-sm mb-3">
                    {supportInfo.message}:
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-teal-400 tracking-wide">{supportInfo.phone}</span>
                    <span className="text-xl">📱</span>
                  </div>
                  <p className="text-white/40 text-center text-xs">
                    {supportInfo.note}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Preparation */}
          <motion.div {...getMotionProps(0.3)} className="group relative">
            {/* Hover glow */}
            <div className="absolute -inset-px bg-gradient-to-b from-cyan-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative h-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col group-hover:border-cyan-500/30 transition-colors">
              
              {/* Top accent */}
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full" />
              
              {/* Header */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white uppercase tracking-wide">Preparación del Taller</h2>
              </div>
              
              <div className="space-y-3 flex-1">
                {preparations.map((prep, i) => {
                  const Icon = ICON_MAP[prep.icon] || Laptop;
                  return (
                    <motion.div
                      key={prep.num}
                      {...getMotionProps(0.4 + i * 0.08)}
                      className="group/item relative"
                    >
                      <div className="absolute -inset-px bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-cyan-500/0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 blur-sm" />
                      
                      <div className="relative flex items-center gap-4 p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.06] group-hover/item:border-teal-500/30 group-hover/item:bg-white/[0.04] transition-all">
                        
                        {/* Number */}
                        <span className="text-white/[0.08] font-mono text-xs font-bold w-4 shrink-0">
                          {String(prep.num).padStart(2, '0')}
                        </span>
                        
                        {/* Icon */}
                        <div className="p-2.5 bg-teal-500/10 rounded-lg border border-teal-500/25 group-hover/item:bg-teal-500/15 group-hover/item:border-teal-500/40 transition-colors shrink-0">
                          <Icon className="w-5 h-5 text-teal-400" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">{prep.title}</p>
                          <p className="text-white/40 text-xs truncate">{prep.desc}</p>
                        </div>
                        
                        {/* Emoji */}
                        <motion.span 
                          className="text-lg opacity-50 group-hover/item:opacity-100 transition-opacity shrink-0"
                          whileHover={isExporting ? {} : { scale: 1.2 }}
                        >
                          {prep.emoji}
                        </motion.span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/15 tabular-nums tracking-wide">
        5 / 29
      </div>
    </div>
  );
}
