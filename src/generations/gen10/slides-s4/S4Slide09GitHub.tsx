import { motion } from 'framer-motion';
import { GitBranch, History, RotateCcw, Users, Cloud, ArrowRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const VERSIONS = [
  { version: 3, msg: 'ERROR (Pantalla blanca)', time: 'Hoy 3:45 PM', hash: 'a8f3d21', status: 'error' as const },
  { version: 2, msg: 'Cambio de colores', time: 'Hoy 2:15 PM', hash: '7c2e9f0', status: 'success' as const },
  { version: 1, msg: 'Inicio del proyecto', time: 'Ayer 10:30 AM', hash: '3b1a5c8', status: 'success' as const },
];

const BENEFITS = [
  { title: 'Sincronización', desc: 'Lovable sincroniza con GitHub automáticamente. No necesitas saber Git.', icon: Cloud },
  { title: 'Colaboración', desc: 'Tu equipo accede al código. Cursor y Claude Code trabajan en local.', icon: Users },
  { title: 'Restauración', desc: 'Si la embarras, viajas al pasado con un clic.', icon: RotateCcw },
];

export function S4Slide09GitHub() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(280_60%_45%_/_0.1),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-violet-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Stack</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">GitHub: Tu Máquina del Tiempo</h1>
            </div>
          </div>
          <p className="text-violet-400/60 text-sm ml-5 pl-1">El Google Drive de tu código. Deshaz cualquier error.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-6">
          {/* Version history mock */}
          <motion.div {...m(0.15)} className="col-span-3 p-5 rounded-2xl border border-violet-500/15 bg-violet-500/[0.03]">
            <div className="flex items-center gap-3 mb-4">
              <History className="w-5 h-5 text-violet-400" />
              <span className="text-sm font-bold text-white">Historial de Versiones</span>
              <span className="text-[10px] text-white/20 ml-auto">ACTUAL: v2</span>
            </div>
            <div className="space-y-2">
              {VERSIONS.map((v, i) => (
                <motion.div key={i} {...(isExporting ? {} : { initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 + i * 0.1 } })}
                  className={`flex items-center gap-4 p-3 rounded-xl border ${v.status === 'error' ? 'border-red-500/15 bg-red-500/[0.03]' : i === 1 ? 'border-emerald-500/15 bg-emerald-500/[0.03]' : 'border-white/[0.04] bg-white/[0.01]'}`}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: v.status === 'error' ? 'hsl(0 70% 55%)' : 'hsl(150 60% 50%)' }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {v.status === 'error' ? <XCircle className="w-3.5 h-3.5 text-red-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      <span className={`text-xs font-semibold ${v.status === 'error' ? 'text-red-400/80' : 'text-white/60'}`}>Versión {v.version}: {v.msg}</span>
                    </div>
                    <p className="text-[10px] text-white/20 mt-0.5 font-mono">{v.time} · Commit: {v.hash}</p>
                  </div>
                  {i === 1 && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">ACTUAL</span>
                  )}
                  {v.status === 'error' && (
                    <button className="text-[10px] font-bold px-3 py-1 rounded-lg bg-violet-500/15 text-violet-400 border border-violet-500/20 hover:bg-violet-500/25 transition-colors">
                      <RotateCcw className="w-3 h-3 inline mr-1" />RESTAURAR
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <div className="col-span-2 space-y-3">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} {...m(0.3 + i * 0.08)}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-bold text-white">{b.title}</span>
                  </div>
                  <p className="text-xs text-white/35">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(280 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">STACK</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
