import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { BookOpen, ArrowLeft } from 'lucide-react';

/* ── Particles for atmospheric depth ── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2,
  hue: [35, 263, 45][i % 3],
  dur: 6 + Math.random() * 5,
  delay: Math.random() * 4,
  travel: 10 + Math.random() * 20,
}));

export function Slide03Mod01Divider() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();

  const m = (delay: number, extra?: object) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          ...extra,
        };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a] font-sans selection:bg-violet-500/30">
      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 70% at 50% 50%, hsl(35 50% 8% / 0.5), transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, hsl(263 50% 35% / 0.08), transparent 55%)' }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
        <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* ── Breathing orb ── */}
      {!isExporting && (
        <motion.div
          className="absolute top-[20%] left-[35%] w-[600px] h-[500px] rounded-full blur-[200px]"
          style={{ background: 'hsl(35 55% 45% / 0.07)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* ── Floating particles ── */}
      {!isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x, top: p.y, width: p.size, height: p.size,
                background: `hsl(${p.hue} 55% 60% / 0.35)`,
                boxShadow: `0 0 ${p.size * 4}px hsl(${p.hue} 55% 60% / 0.4)`,
              }}
              animate={{ y: [0, -p.travel, 0], opacity: [0.06, 0.4, 0.06] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* ── Light sweep ── */}
      {!isExporting && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, hsl(35 60% 50% / 0.03) 48%, hsl(263 55% 50% / 0.02) 52%, transparent 60%)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 10 }}
        />
      )}

      {/* ════════════════════════════════════════ */}
      {/* ── CONTENT ────────────────────────────  */}
      {/* ════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-16">
        {/* Module icon */}
        <motion.div {...m(0)} className="mb-8">
          <div className="relative">
            {/* Glow behind icon */}
            {!isExporting && (
              <motion.div
                className="absolute inset-0 rounded-2xl blur-2xl scale-[2.5]"
                style={{ background: 'hsl(35 70% 50% / 0.12)' }}
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center border backdrop-blur-sm"
              style={{
                background: 'hsl(35 80% 55% / 0.08)',
                borderColor: 'hsl(35 80% 55% / 0.3)',
                boxShadow: '0 0 30px hsl(35 80% 55% / 0.15)',
              }}
            >
              <BookOpen className="w-7 h-7" style={{ color: 'hsl(35 80% 65%)' }} />
            </div>
          </div>
        </motion.div>

        {/* Module label — mismo patrón que Mod02–Mod05 */}
        <motion.span {...m(0.1)} className="text-sm font-bold tracking-[0.4em] text-amber-400/60 uppercase mb-6">
          01 /// MÓDULO 01
        </motion.span>

        {/* Title — font-serif y tamaños alineados con portadas Mod02–Mod05 */}
        <motion.h1 {...m(0.2)} className="text-6xl md:text-7xl font-serif text-white text-center mb-6">
          <EditableText defaultValue="Los Nuevos Fundamentos." tag="span" />
        </motion.h1>

        {/* Description — text-xl text-white/50 como en el resto de portadas */}
        <motion.p {...m(0.35)} className="text-xl text-white/50 text-center max-w-2xl">
          <EditableText defaultValue="Era agéntica, el practicante brillante, ventana de contexto, protocolo C.R.O.P. y meta-prompting." tag="span" />
        </motion.p>

        {/* Topic pills */}
        <motion.div {...m(0.5)} className="flex items-center gap-2.5 mt-8 flex-wrap justify-center">
          {['Era Agéntica', 'Prompting', 'Contexto', 'C.R.O.P.', 'Meta-Prompting'].map((topic, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-medium border"
              style={{
                background: 'hsl(35 70% 55% / 0.06)',
                borderColor: 'hsl(35 70% 55% / 0.15)',
                color: 'hsl(35 70% 60% / 0.6)',
              }}
            >
              {topic}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('goToSlide', { detail: { slide: 2 } }))}
            className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-white/40 uppercase hover:text-white/70 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            Agenda
          </button>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">
            {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '3 / 23'}
          </span>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
