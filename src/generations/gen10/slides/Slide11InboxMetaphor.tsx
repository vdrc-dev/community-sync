import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, FolderArchive, Zap, Key, CheckCircle, Archive, Table, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/buzon-metafora-split.png';

const ICON_MAP: Record<string, LucideIcon> = {
  trash: Trash2,
  folder: FolderArchive,
  zap: Zap,
  archive: Archive,
  table: Table,
};

const DEFAULT_PHYSICAL_ACTIONS = [
  { icon: 'trash', label: 'BASURA', desc: 'Folletos y Spam' },
  { icon: 'folder', label: 'ARCHIVO', desc: 'Cuentas y contratos' },
  { icon: 'zap', label: 'PENDIENTE', desc: 'Requiere acción HOY' },
];

export function Slide11InboxMetaphor() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(11);
  const backgroundImage = (content.imageUrl as string) || CLOUD_URL;
  
  // Database-driven content with fallbacks
  const physicalActions = (content.physicalActions as Array<{ icon: string; label: string; desc: string }>) || DEFAULT_PHYSICAL_ACTIONS;
  const goldenRule = (content.goldenRule as string) || 'Tu inbox es solo para lo PENDIENTE';
  const metaphor = content.metaphor as { 
    wrong: { label: string; desc: string; icon: string }; 
    right: { label: string; desc: string; icon: string } 
  } | undefined;
  const flow = content.flow as { archive: string; result: string } | undefined;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-amber-500/30">
      
      {/* Full-width background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020609]/50 via-transparent to-[#020609]/70" />

      {/* Left - Physical World Label */}
      <motion.div 
        {...getMotionProps(0.1)}
        className="absolute top-6 left-8 z-20"
      >
        <div className="px-5 py-2.5 bg-black/80 backdrop-blur-md border border-amber-500/40 rounded-lg shadow-lg shadow-amber-500/10">
          <span className="text-amber-400 font-semibold tracking-wide">Mundo Físico</span>
        </div>
      </motion.div>

      {/* Right - Digital World Label */}
      <motion.div 
        {...getMotionProps(0.15)}
        className="absolute top-6 right-8 z-20"
      >
        <div className="px-5 py-2.5 bg-black/80 backdrop-blur-md border border-emerald-500/40 rounded-lg shadow-lg shadow-emerald-500/10">
          <span className="text-emerald-400 font-semibold tracking-wide">Mundo Digital</span>
        </div>
      </motion.div>

      {/* Left side - Action cards */}
      <motion.div 
        {...getMotionProps(0.2)}
        className="absolute left-6 top-24 space-y-3 z-10"
      >
        {physicalActions.map((action, i) => {
          const Icon = ICON_MAP[action.icon] || Zap;
          return (
            <motion.div
              key={action.label}
              {...(isExporting ? {} : {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.3 + i * 0.1 },
              })}
              className="flex items-center gap-3 px-4 py-2.5 bg-black/70 backdrop-blur-md border border-white/20 rounded-lg min-w-[200px]"
            >
              <Icon className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-white font-bold text-sm tracking-wide block">{action.label}</span>
                <span className="text-white/60 text-xs">{action.desc}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Metaphor comparison - Right side */}
      {metaphor && (
        <motion.div 
          {...getMotionProps(0.25)}
          className="absolute right-6 top-24 space-y-3 z-10"
        >
          {/* Wrong way */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-rose-500/20 backdrop-blur-md border border-rose-500/40 rounded-lg min-w-[200px]">
            <Archive className="w-5 h-5 text-rose-400" />
            <div>
              <span className="text-rose-400 font-bold text-sm tracking-wide block">{metaphor.wrong.label}</span>
              <span className="text-white/60 text-xs">{metaphor.wrong.desc}</span>
            </div>
            <span className="text-rose-400 ml-auto">❌</span>
          </div>
          
          {/* Right way */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 rounded-lg min-w-[200px]">
            <Table className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-emerald-400 font-bold text-sm tracking-wide block">{metaphor.right.label}</span>
              <span className="text-white/60 text-xs">{metaphor.right.desc}</span>
            </div>
            <span className="text-emerald-400 ml-auto">✓</span>
          </div>
        </motion.div>
      )}

      {/* Golden Rule - Bottom Center */}
      <motion.div 
        {...getMotionProps(0.4)}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative px-10 py-6 bg-black/80 backdrop-blur-xl border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/50 min-w-[500px]">
          
          {/* Key icon */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <div className="w-10 h-10 rounded-full bg-amber-500/30 border border-amber-500/50 flex items-center justify-center backdrop-blur-sm">
              <Key className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          
          <div className="text-center mt-3">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em] block mb-2">Regla de Oro</span>
            <p className="text-white font-black text-2xl mb-4">{goldenRule}</p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-lg">
                <FolderArchive className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-semibold text-sm">{flow?.archive || 'Archivar'}</span>
              </div>
              <span className="text-white/40 text-lg">→</span>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">{flow?.result || 'Nunca se pierde'}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/40 tabular-nums tracking-wider z-20">
        11 / 29
      </div>
    </div>
  );
}
