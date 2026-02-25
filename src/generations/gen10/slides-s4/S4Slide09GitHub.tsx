import { motion } from 'framer-motion';
import { GitBranch, History, RotateCcw, Users, Cloud, CheckCircle2, XCircle, GitCommit, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const VERSIONS = [
  { version: 3, msg: 'ERROR: Pantalla blanca en producción', time: 'Hoy 3:45 PM', hash: 'a8f3d21', status: 'error' as const },
  { version: 2, msg: 'Mejora: Cambio de paleta de colores', time: 'Hoy 2:15 PM', hash: '7c2e9f0', status: 'success' as const, current: true },
  { version: 1, msg: 'Inicio: Primer deploy del proyecto', time: 'Ayer 10:30 AM', hash: '3b1a5c8', status: 'success' as const },
];

const BENEFITS = [
  { title: 'Sincronización Automática', desc: 'Lovable sincroniza con GitHub en cada cambio. No necesitas saber Git.', icon: Cloud, color: 'hsl(280 70% 60%)', hue: 280 },
  { title: 'Colaboración Real', desc: 'Tu equipo accede al código. Cursor y Claude Code trabajan desde él.', icon: Users, color: 'hsl(185 70% 50%)', hue: 185 },
  { title: 'Máquina del Tiempo', desc: 'Si la embarras, restauras cualquier versión anterior con un clic.', icon: RotateCcw, color: 'hsl(150 60% 50%)', hue: 150 },
];

export function S4Slide09GitHub() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-15%,_hsl(280_60%_45%_/_0.12),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'radial-gradient(circle, hsl(280 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
        <div className="absolute top-[5%] right-[3%] text-[18vw] font-black text-white/[0.022] leading-none select-none pointer-events-none tracking-tighter">GH</div>
      </div>

      {!isExporting && (
        <motion.div className="absolute bottom-[15%] left-[8%] w-[350px] h-[350px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: 'hsl(280 60% 50% / 0.07)' }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-violet-500" style={{ boxShadow: '0 0 12px hsl(280 60% 55% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Stack · Control de Versiones</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">GitHub: Máquina del Tiempo</h1>
            </div>
          </div>
          <p className="text-violet-400/60 text-sm ml-5 pl-1 font-medium">El Google Drive de tu código. Deshaz cualquier error. Colabora con tu equipo.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-6">
          {/* Version history */}
          <motion.div {...m(0.1)} className="col-span-3 rounded-2xl border border-violet-500/20 overflow-hidden"
            style={{ background: 'hsl(280 30% 5% / 0.6)', boxShadow: '0 0 50px hsl(280 60% 40% / 0.07) inset' }}>
            {/* Header bar */}
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-3 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <History className="w-3.5 h-3.5 text-violet-400/70" />
              <span className="text-xs font-black text-violet-400/80 font-mono">Historial de Versiones</span>
              <div className="ml-auto flex items-center gap-1.5">
                <motion.div className="w-2 h-2 rounded-full bg-violet-500"
                  {...(isExporting ? {} : { animate: { opacity: [1, 0.4, 1] }, transition: { duration: 2, repeat: Infinity } })} />
                <span className="text-[11px] text-white/75 font-mono">3 commits</span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {VERSIONS.map((v, i) => (
                <motion.div key={i}
                  {...(isExporting ? {} : { initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] } })}
                  className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all ${v.status === 'error' ? 'border-red-500/20 bg-red-500/[0.04]' : v.current ? 'border-violet-500/25 bg-violet-500/[0.05]' : 'border-white/[0.05] bg-white/[0.015]'}`}>
                  {/* Status dot + line */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: v.status === 'error' ? 'hsl(0 70% 55%)' : 'hsl(150 60% 50%)', boxShadow: v.status === 'error' ? '0 0 8px hsl(0 60% 55%)' : '0 0 8px hsl(150 60% 50%)' }} />
                    {i < VERSIONS.length - 1 && <div className="w-px h-4 bg-white/10" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {v.status === 'error' ? <XCircle className="w-3.5 h-3.5 text-red-400/80" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80" />}
                      <span className={`text-xs font-black ${v.status === 'error' ? 'text-red-400/80' : 'text-white/90'}`}>v{v.version}: {v.msg}</span>
                    </div>
                    <p className="text-[11px] text-white/70 font-mono">{v.time} · #{v.hash}</p>
                  </div>

                  {v.current && (
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/25 shrink-0">ACTUAL</span>
                  )}
                  {v.status === 'error' && (
                    <button className="flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-lg bg-violet-500/15 text-violet-300 border border-violet-500/25 hover:bg-violet-500/25 transition-colors shrink-0">
                      <RotateCcw className="w-3 h-3" />RESTAURAR
                    </button>
                  )}
                </motion.div>
              ))}

              {/* Arrow flow */}
              <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-white/[0.04]">
                <div className="text-[11px] font-black text-red-400/60 px-3 py-1.5 rounded-lg border border-red-500/15 bg-red-500/[0.04]">Error en v3</div>
                <ArrowRight className="h-4 w-4 text-white/85" />
                <div className="text-[11px] font-black text-violet-400/60 px-3 py-1.5 rounded-lg border border-violet-500/15 bg-violet-500/[0.04]">Restaurar a v2</div>
                <ArrowRight className="h-4 w-4 text-white/85" />
                <div className="text-[11px] font-black text-emerald-400/60 px-3 py-1.5 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.04]">App funcional ✓</div>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <div className="col-span-2 space-y-3">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} {...m(0.3 + i * 0.1)}
                  className="relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] overflow-hidden hover:border-white/[0.1] transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${b.color.replace(')', ' / 0.4)')}, transparent)` }} />
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `hsl(${b.hue} 60% 45% / 0.12)`, border: `1px solid hsl(${b.hue} 60% 50% / 0.25)` }}>
                      <Icon className="w-5 h-5" style={{ color: b.color }} />
                    </div>
                    <p className="text-sm font-black text-white">{b.title}</p>
                  </div>
                  <p className="text-xs text-white/85 leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}

            {/* Lovable sync callout */}
            <motion.div {...m(0.55)} className="p-4 rounded-xl border border-violet-500/18 bg-violet-500/[0.04] flex items-start gap-3">
              <GitBranch className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <p className="text-xs text-white/90 leading-relaxed">
                <span className="text-violet-400/80 font-black">Lovable + GitHub: </span>
                Cada cambio que haces en Lovable se sincroniza automáticamente al repositorio. Cero Git manual.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(280 50% 55% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase">Stack</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/70">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
