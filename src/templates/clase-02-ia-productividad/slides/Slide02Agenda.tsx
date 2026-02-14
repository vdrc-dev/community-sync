import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useSlideList } from '@/contexts/SlideListContext';
import { BookOpen, Users, Cpu, BarChart3, Bot, Sparkles, ChevronRight } from 'lucide-react';

/* ── Divider component-name patterns to find real positions ── */
const DIVIDER_PATTERNS = [
  'Slide03Mod01Divider',
  'Slide09Mod02Divider',
  'Slide12Mod03Divider',
  'Slide16Mod04Divider',
  'Slide18Mod05Divider',
];

/* ── Default targets for standalone template (23 slides) ── */
const DEFAULT_TARGETS = [3, 9, 12, 16, 18];

/* ── Module visual config (no targetSlide - resolved at runtime) ── */
const MODULES = [
  {
    num: 1,
    icon: BookOpen,
    title: 'Los Nuevos Fundamentos',
    desc: 'Era agéntica, prompting y ventana de contexto',
    accent: {
      bg: 'hsl(35 80% 55% / 0.06)',
      border: 'hsl(35 80% 55% / 0.25)',
      text: 'hsl(35 80% 65%)',
      glow: 'hsl(35 80% 55% / 0.15)',
      dot: 'hsl(35 80% 58%)',
    },
  },
  {
    num: 2,
    icon: Users,
    title: 'El Nuevo Rol: Orquestador',
    desc: 'Del artesano al director de herramientas',
    accent: {
      bg: 'hsl(170 60% 45% / 0.06)',
      border: 'hsl(170 60% 45% / 0.25)',
      text: 'hsl(170 60% 60%)',
      glow: 'hsl(170 60% 45% / 0.15)',
      dot: 'hsl(170 60% 50%)',
    },
  },
  {
    num: 3,
    icon: Cpu,
    title: 'La Suite Claude en Acción',
    desc: 'Code, Excel y PowerPoint haciendo la pega',
    accent: {
      bg: 'hsl(263 55% 55% / 0.06)',
      border: 'hsl(263 55% 55% / 0.25)',
      text: 'hsl(263 55% 72%)',
      glow: 'hsl(263 55% 55% / 0.15)',
      dot: 'hsl(263 55% 60%)',
    },
  },
  {
    num: 4,
    icon: BarChart3,
    title: 'El Paisaje de Modelos',
    desc: 'GPT-5.2, Perplexity y DeepSeek',
    accent: {
      bg: 'hsl(200 70% 50% / 0.06)',
      border: 'hsl(200 70% 50% / 0.25)',
      text: 'hsl(200 70% 65%)',
      glow: 'hsl(200 70% 50% / 0.15)',
      dot: 'hsl(200 70% 55%)',
    },
  },
  {
    num: 5,
    icon: Bot,
    title: 'Agentes y Ejecución',
    desc: 'Anatomía, delegación y supervisión de agentes',
    accent: {
      bg: 'hsl(340 60% 55% / 0.06)',
      border: 'hsl(340 60% 55% / 0.25)',
      text: 'hsl(340 60% 68%)',
      glow: 'hsl(340 60% 55% / 0.15)',
      dot: 'hsl(340 60% 58%)',
    },
  },
];

/* ── Particles ── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2,
  hue: [263, 35, 170, 200, 340][i % 5],
  dur: 6 + Math.random() * 5,
  delay: Math.random() * 4,
  travel: 10 + Math.random() * 20,
}));

export function Slide02Agenda() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const slideList = useSlideList();

  // Resolve module divider positions dynamically from slide list context
  const moduleTargets = useMemo(() => {
    if (slideList.length === 0) return DEFAULT_TARGETS;
    return DIVIDER_PATTERNS.map((pattern, i) => {
      const found = slideList.find(s => s.componentName?.includes(pattern));
      return found ? found.slideNumber : DEFAULT_TARGETS[i];
    });
  }, [slideList]);
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
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsl(263 40% 10% / 0.5), transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 90% 80%, hsl(35 60% 40% / 0.08), transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 10% 70%, hsl(340 50% 40% / 0.05), transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
        <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* ── Breathing orbs ── */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-[-10%] left-[30%] w-[700px] h-[500px] rounded-full blur-[200px]"
            style={{ background: 'hsl(263 55% 45% / 0.08)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-15%] right-[20%] w-[500px] h-[400px] rounded-full blur-[180px]"
            style={{ background: 'hsl(35 60% 45% / 0.06)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.15, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </>
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
              animate={{ y: [0, -p.travel, 0], opacity: [0.06, 0.45, 0.06] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* ── Light sweep ── */}
      {!isExporting && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, hsl(263 60% 55% / 0.03) 48%, hsl(35 70% 55% / 0.02) 52%, transparent 60%)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 8 }}
        />
      )}

      {/* ════════════════════════════════════════ */}
      {/* ── CONTENT ────────────────────────────  */}
      {/* ════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col px-16 py-10">
        {/* Section pill */}
        <motion.div {...m(0)} className="mb-5">
          <div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border backdrop-blur-sm"
            style={{ background: 'hsl(263 55% 50% / 0.06)', borderColor: 'hsl(263 55% 50% / 0.22)' }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'hsl(263 60% 70%)' }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'hsl(263 60% 72%)' }}>
              Hoja de Ruta
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div {...m(0.1, { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } })}>
          <h1 className="text-[2.8rem] font-black tracking-[-0.03em] leading-[1]">
            <span className="text-white">
              <EditableText defaultValue="Agenda" tag="span" />
            </span>
          </h1>
          <p className="text-base text-white/45 mt-2 font-light">
            <EditableText defaultValue="5 módulos · Del fundamento a la ejecución" tag="span" />
          </p>
          {/* Accent line */}
          <motion.div
            className="h-[2px] rounded-full mt-4"
            style={{ background: 'linear-gradient(90deg, hsl(263 60% 60%), hsl(35 80% 58%) 60%, transparent)' }}
            initial={isExporting ? {} : { width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* ── Module list ── */}
        <div className="flex-1 flex flex-col justify-center gap-3 mt-6">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.num}
                {...m(0.2 + i * 0.08)}
                className="group relative"
              >
                {/* Hover glow */}
                {!isExporting && (
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl pointer-events-none"
                    style={{ background: mod.accent.glow }}
                  />
                )}

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('goToSlide', { detail: { slide: moduleTargets[i] } }))}
                  className="relative w-full flex items-center gap-5 px-5 py-3.5 rounded-2xl border transition-all duration-300 cursor-pointer text-left group-hover:border-opacity-60"
                  style={{
                    background: 'hsl(0 0% 100% / 0.015)',
                    borderColor: 'hsl(0 0% 100% / 0.05)',
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: mod.accent.bg,
                      border: `1.5px solid ${mod.accent.border}`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: mod.accent.text }} />
                  </div>

                  {/* Number */}
                  <span
                    className="text-[13px] font-black tabular-nums"
                    style={{ color: mod.accent.dot }}
                  >
                    {String(mod.num).padStart(2, '0')}
                  </span>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-white/90 font-semibold leading-snug">
                      <EditableText defaultValue={mod.title} tag="span" />
                    </p>
                    <p className="text-[12px] text-white/40 mt-0.5 leading-relaxed">
                      <EditableText defaultValue={mod.desc} tag="span" />
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className="w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: 'hsl(0 0% 100% / 0.15)' }}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">AGENDA</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">
            {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '2 / 23'}
          </span>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
