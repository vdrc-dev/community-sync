/**
 * S4 Slide 06 — Lovable: De idea a app
 * SISTEMA VISUAL S4 PREMIUM — S4Atmosphere + S4Footer + motion épico
 * Layout: 2-col editorial con ChatMockup interactivo
 */

import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Globe, Code2, Database, Zap, Rocket,
  CheckCircle2, Layers, ShieldCheck, ExternalLink, Sparkles,
} from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useState, useEffect } from 'react';
import { S4Atmosphere } from './S4Atmosphere';
import { S4Footer } from './S4Footer';
import {
  S4_ROOT_CLASS, S4_ACCENT, S4_EASE, S4_SERIF,
  s4Motion, s4MotionEpic, s4GradientTextMulti, s4Shimmer, s4SerifAnchor,
} from './theme';

/* ── Pipeline steps ─────────────────────────────────────────── */
const STEPS = [
  { n: 1, label: 'Describe',  sub: 'En lenguaje natural',          icon: MessageSquare, accent: S4_ACCENT.rose   },
  { n: 2, label: 'Genera',    sub: 'App React completa',            icon: Rocket,        accent: S4_ACCENT.violet },
  { n: 3, label: 'Itera',     sub: 'Refina con cada prompt',        icon: Code2,         accent: S4_ACCENT.cyan   },
  { n: 4, label: 'Publica',   sub: 'URL HTTPS en <30s',             icon: Globe,         accent: S4_ACCENT.green  },
];

/* ── Feature cards ───────────────────────────────────────────── */
const FEATURES = [
  { icon: Code2,       label: 'React profesional',  desc: 'Componentes + TypeScript',       accent: S4_ACCENT.cyan   },
  { icon: Database,    label: 'Backend 1-click',    desc: 'Auth + DB + Storage auto',        accent: S4_ACCENT.violet },
  { icon: ShieldCheck, label: 'RLS incluido',       desc: 'Seguridad a nivel de fila',       accent: S4_ACCENT.rose   },
  { icon: Zap,         label: 'Deploy instantáneo', desc: 'URL pública en <30 segundos',     accent: S4_ACCENT.green  },
];

/* ── Chat simulation ─────────────────────────────────────────── */
const CHAT_SEQUENCE = [
  {
    role: 'user',
    text: 'Crea una app de gestión de tareas con login de usuarios, tabla de tareas y filtros por estado.',
  },
  {
    role: 'lovable',
    text: '⚙️  Generando componentes React + TypeScript...\n📦  Conectando backend (auth + tareas + RLS)\n🚀  Publicando en URL HTTPS...',
    isCode: true,
  },
  {
    role: 'assistant',
    text: '¡Listo! Tu app está publicada:',
    hasUrl: true,
  },
  {
    role: 'user',
    text: 'Agrega un filtro de prioridad y cambia los colores a morado.',
  },
  {
    role: 'lovable',
    text: '✅  Filtro: Alta / Media / Baja añadido\n🎨  Paleta actualizada → violeta/lavanda\n⚡  Deploy automático completado',
    isCode: true,
  },
];

/* ═══════════════════════════════════════════════════════════════
   Chat Mockup
   ═══════════════════════════════════════════════════════════════ */
function ChatMockup({ isExporting }: { isExporting: boolean }) {
  const [visibleCount, setVisibleCount] = useState(isExporting ? CHAT_SEQUENCE.length : 0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (isExporting) return;
    const reveal = (i: number) => {
      if (i >= CHAT_SEQUENCE.length) return;
      setTyping(true);
      const delay = CHAT_SEQUENCE[i].role === 'lovable' ? 1400 : 700;
      setTimeout(() => {
        setTyping(false);
        setVisibleCount(i + 1);
        setTimeout(() => reveal(i + 1), 900);
      }, delay);
    };
    const t = setTimeout(() => reveal(0), 1200);
    return () => clearTimeout(t);
  }, [isExporting]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'hsl(240 18% 5.5%)',
        border: '1px solid hsl(270 35% 28% / 0.45)',
        boxShadow: [
          '0 0 80px hsl(270 60% 50% / 0.1)',
          '0 0 160px hsl(330 60% 50% / 0.06)',
          'inset 0 1px 0 rgba(255,255,255,0.06)',
          'inset 0 -1px 0 rgba(255,255,255,0.02)',
        ].join(', '),
        height: '100%',
      }}
    >
      {/* Holographic border shimmer */}
      {!isExporting && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, hsl(330 70% 60% / 0.05) 0%, transparent 40%, hsl(270 65% 60% / 0.07) 60%, transparent 80%, hsl(185 70% 55% / 0.04) 100%)',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b shrink-0 relative"
        style={{ background: 'hsl(240 18% 7%)', borderColor: 'hsl(270 30% 20% / 0.5)' }}
      >
        <div className="flex gap-1.5">
          {[
            ['hsl(0 75% 58%)', 'hsl(0 70% 50% / 0.3)'],
            ['hsl(38 88% 58%)', 'hsl(38 85% 50% / 0.3)'],
            ['hsl(152 65% 48%)', 'hsl(152 60% 45% / 0.3)'],
          ].map(([bg, shadow], i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: bg, boxShadow: `0 0 6px ${shadow}` }}
            />
          ))}
        </div>
        <div
          className="flex-1 mx-3 px-3 py-1 rounded-md text-[11px] font-mono text-center relative overflow-hidden"
          style={{ background: 'hsl(240 18% 10%)', color: 'hsl(152 65% 58%)' }}
        >
          {!isExporting && (
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent 30%, hsl(152 70% 60% / 0.08) 50%, transparent 70%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
            />
          )}
          <span className="relative z-10">lovable.dev · editor</span>
        </div>
        <ExternalLink className="w-3 h-3" style={{ color: 'hsl(270 55% 62%)' }} />
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-3 min-h-0">
        <AnimatePresence>
          {CHAT_SEQUENCE.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={isExporting ? undefined : { opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: S4_EASE }}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar — Lovable */}
              {msg.role === 'lovable' && (
                <div className="shrink-0 mt-0.5">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, hsl(330 75% 52%), hsl(270 65% 55%))',
                      boxShadow: '0 0 14px hsl(330 70% 50% / 0.5)',
                      color: 'white',
                    }}
                  >
                    {!isExporting && (
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)' }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                      />
                    )}
                    <span className="relative z-10">L</span>
                  </div>
                </div>
              )}
              {/* Avatar — System */}
              {msg.role === 'assistant' && (
                <div className="shrink-0 mt-0.5">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'hsl(152 65% 40% / 0.15)',
                      border: '1px solid hsl(152 65% 45% / 0.4)',
                      boxShadow: '0 0 10px hsl(152 65% 45% / 0.2)',
                    }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'hsl(152 70% 62%)' }} />
                  </div>
                </div>
              )}

              {/* Bubble */}
              <div
                className="max-w-[84%] px-3 py-2.5 rounded-xl text-[11px] leading-relaxed relative overflow-hidden"
                style={{
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, hsl(330 65% 50% / 0.2), hsl(270 60% 50% / 0.15))'
                    : msg.isCode
                    ? 'hsl(240 18% 9.5%)'
                    : 'hsl(240 18% 11%)',
                  border: msg.role === 'user'
                    ? '1px solid hsl(330 65% 52% / 0.4)'
                    : msg.isCode
                    ? '1px solid hsl(270 30% 25% / 0.5)'
                    : '1px solid hsl(270 25% 22% / 0.4)',
                  color: msg.role === 'user' ? 'hsl(330 85% 88%)' : 'hsl(220 20% 88%)',
                  fontFamily: msg.isCode ? "'JetBrains Mono', monospace" : 'inherit',
                  whiteSpace: 'pre-line',
                  fontWeight: msg.role === 'user' ? 500 : 400,
                  boxShadow: msg.role === 'user'
                    ? 'inset 0 1px 0 rgba(255,255,255,0.06)'
                    : 'none',
                }}
              >
                {msg.isCode && !isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent 20%, hsl(270 70% 60% / 0.04) 50%, transparent 80%)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                  />
                )}
                <span className="relative z-10">
                  {msg.hasUrl ? (
                    <>¡Listo! Tu app está publicada:{' '}
                      <span style={{ color: 'hsl(152 75% 62%)', fontFamily: 'monospace', fontWeight: 600 }}>
                        tu-app.lovable.app
                      </span>
                    </>
                  ) : msg.text}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && !isExporting && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(330 75% 52%), hsl(270 65% 55%))',
                  boxShadow: '0 0 14px hsl(330 70% 50% / 0.5)',
                  color: 'white',
                }}
              >
                L
              </div>
              <div
                className="px-3 py-2 rounded-xl flex gap-1.5 items-center"
                style={{
                  background: 'hsl(240 18% 10%)',
                  border: '1px solid hsl(270 25% 25% / 0.45)',
                }}
              >
                {[0, 0.22, 0.44].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: `hsl(${330 - i * 30} 70% 62%)` }}
                    animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.85, repeat: Infinity, delay, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div
        className="px-4 py-3 border-t shrink-0 flex items-center gap-2"
        style={{ borderColor: 'hsl(270 22% 18% / 0.6)', background: 'hsl(240 18% 6.5%)' }}
      >
        <div
          className="flex-1 px-3 py-2 rounded-lg text-[11px]"
          style={{
            background: 'hsl(240 18% 10%)',
            border: '1px solid hsl(270 22% 22% / 0.5)',
            color: 'hsl(220 10% 40%)',
          }}
        >
          Describe tu próxima feature...
        </div>
        <motion.div
          className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(330 72% 52%), hsl(270 65% 55%))',
            boxShadow: '0 0 16px hsl(330 70% 52% / 0.5)',
          }}
          {...(isExporting ? {} : { whileHover: { scale: 1.1 }, whileTap: { scale: 0.92 } })}
        >
          {!isExporting && (
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
            />
          )}
          <Rocket className="w-3.5 h-3.5 text-white relative z-10" />
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Slide
   ═══════════════════════════════════════════════════════════════ */
export function S4Slide06Lovable() {
  const { isExporting } = useExportContext();

  return (
    <div className={S4_ROOT_CLASS} style={{ background: '#04030a' }}>
      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_20%,_hsl(330_65%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_85%_75%,_hsl(270_60%_50%_/_0.08),_transparent_60%)]" />
        <S4Atmosphere
          isExporting={isExporting}
          particleCount={18}
          primaryHue={330}
          secondaryHue={270}
          tertiaryHue={185}
          showAurora
          showPlasma
          showConstellation
          showHolographic
          showChromatic
          intensity={1.1}
        />
      </div>

      {/* ── Serif watermark ── */}
      <div
        className="absolute bottom-[-6%] right-[-2%] select-none pointer-events-none leading-none font-black tracking-tighter"
        style={s4SerifAnchor('LV', 330, 0.035)}
      >
        LV
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col px-10 2xl:px-14 py-8 2xl:py-10 gap-5 pb-16">

        {/* ── Header ────────────────────────────────────────── */}
        <motion.div {...s4MotionEpic(0, isExporting)} className="flex items-start gap-4">
          {/* Accent bar */}
          <div
            className="w-1.5 h-14 rounded-full shrink-0 mt-0.5"
            style={{
              background: 'linear-gradient(180deg, hsl(330 80% 64%), hsl(270 70% 64%), hsl(185 70% 58%))',
              boxShadow: '0 0 20px hsl(330 80% 56% / 0.55), 0 0 40px hsl(330 75% 50% / 0.2)',
            }}
          />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[11px] font-black tracking-[0.22em] uppercase px-2.5 py-1 rounded-md"
                style={{ background: S4_ACCENT.rose.bg, color: S4_ACCENT.rose.text, border: `1px solid ${S4_ACCENT.rose.border}`, boxShadow: `0 0 18px ${S4_ACCENT.rose.glow}` }}
              >
                Herramienta Central
              </span>
              <span
                className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1.5"
                style={{ background: S4_ACCENT.green.bg, color: S4_ACCENT.green.text, border: `1px solid ${S4_ACCENT.green.border}` }}
              >
                <Sparkles className="w-2.5 h-2.5" />
                Clase 4 · VibeCoding
              </span>
            </div>
            <h1
              className="text-4xl 2xl:text-[2.8rem] font-black leading-tight tracking-tight"
              style={s4GradientTextMulti([330, 270, 185, 152], 330)}
            >
              Lovable: De idea a app
            </h1>
            <p
              className="text-[15px] font-medium mt-1.5 leading-snug"
              style={{ color: 'hsl(220 15% 68%)' }}
            >
              Prompt en español{' '}
              <span style={{ color: 'hsl(270 60% 65%)', fontFamily: S4_SERIF, fontStyle: 'italic' }}>→</span>{' '}
              App React completa + backend + URL pública.{' '}
              <strong style={{ color: S4_ACCENT.rose.text }}>Sin escribir código.</strong>
            </p>
          </div>
        </motion.div>

        {/* ── 2-col grid ────────────────────────────────────── */}
        <div className="flex-1 grid grid-cols-[1fr_1.08fr] gap-6 min-h-0">

          {/* LEFT ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Pipeline */}
            <motion.div {...s4Motion(0.1, isExporting)}>
              <p className="text-[11px] font-black tracking-[0.22em] uppercase mb-3" style={{ color: 'hsl(220 15% 38%)' }}>
                El flujo completo
              </p>
              <div className="grid grid-cols-4 gap-2">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.n}
                      {...(isExporting ? {} : {
                        initial: { opacity: 0, y: 18, scale: 0.92 },
                        animate: { opacity: 1, y: 0, scale: 1 },
                        transition: { delay: 0.12 + i * 0.09, duration: 0.5, ease: S4_EASE },
                      })}
                      className="relative flex flex-col items-center gap-2 p-3 rounded-xl overflow-hidden"
                      style={{
                        background: s.accent.bg,
                        border: `1px solid ${s.accent.border}`,
                        boxShadow: `0 0 30px ${s.accent.glow}`,
                      }}
                    >
                      {/* Shimmer */}
                      {!isExporting && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(105deg, transparent 30%, hsl(${s.accent.h} 70% 65% / 0.08) 50%, transparent 70%)` }}
                          {...s4Shimmer(isExporting, i * 0.8)}
                        />
                      )}
                      {/* Step badge */}
                      <div
                        className="absolute -top-2 -left-2 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black text-white z-10"
                        style={{
                          background: `linear-gradient(135deg, hsl(${s.accent.h} 75% 52%), hsl(${(s.accent.h + 25) % 360} 70% 55%))`,
                          boxShadow: `0 0 12px hsl(${s.accent.h} 70% 52% / 0.6)`,
                        }}
                      >
                        {s.n}
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                        style={{ background: `hsl(${s.accent.h} 60% 50% / 0.18)` }}
                      >
                        <Icon className="w-5 h-5 relative z-10" style={{ color: s.accent.text }} />
                      </div>
                      <p className="text-xs font-black text-center relative z-10" style={{ color: 'hsl(220 15% 90%)' }}>
                        {s.label}
                      </p>
                      <p className="text-[9.5px] text-center font-medium leading-snug relative z-10" style={{ color: 'hsl(220 10% 55%)' }}>
                        {s.sub}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
              {/* Arrow connectors */}
              <div className="flex justify-around mt-1.5 px-6">
                {[0,1,2].map(i => (
                  <div key={i} className="text-[11px] font-black" style={{ color: 'hsl(270 40% 45%)' }}>→</div>
                ))}
              </div>
            </motion.div>

            {/* Features 2×2 */}
            <motion.div {...s4Motion(0.22, isExporting)}>
              <p className="text-[11px] font-black tracking-[0.22em] uppercase mb-3" style={{ color: 'hsl(220 15% 38%)' }}>
                Por qué Lovable es diferente
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      {...(isExporting ? {} : {
                        initial: { opacity: 0, x: -12 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.28 + i * 0.08, duration: 0.5, ease: S4_EASE },
                      })}
                      className="flex items-start gap-3 p-3 rounded-xl relative overflow-hidden"
                      style={{
                        background: f.accent.bg,
                        border: `1px solid ${f.accent.border}`,
                        boxShadow: `0 0 24px ${f.accent.glow}`,
                      }}
                    >
                      {!isExporting && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(105deg, transparent 30%, hsl(${f.accent.h} 65% 60% / 0.06) 50%, transparent 70%)` }}
                          {...s4Shimmer(isExporting, i * 1.2 + 1)}
                        />
                      )}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative z-10"
                        style={{
                          background: `hsl(${f.accent.h} 60% 50% / 0.22)`,
                          border: `1px solid hsl(${f.accent.h} 60% 50% / 0.25)`,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: f.accent.text }} />
                      </div>
                      <div className="relative z-10">
                        <p className="text-xs font-black leading-tight mb-0.5" style={{ color: 'hsl(220 15% 92%)' }}>
                          {f.label}
                        </p>
                        <p className="text-[11px] font-medium leading-snug" style={{ color: 'hsl(220 10% 55%)' }}>
                          {f.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Key insight callout */}
            <motion.div
              {...s4Motion(0.42, isExporting)}
              className="p-4 rounded-xl flex items-start gap-3 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(330 60% 50% / 0.09), hsl(270 55% 50% / 0.07))',
                border: `1px solid ${S4_ACCENT.rose.border}`,
                boxShadow: `0 0 40px ${S4_ACCENT.rose.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              {!isExporting && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, hsl(330 70% 60% / 0.05) 50%, transparent 70%)' }}
                  {...s4Shimmer(isExporting, 2)}
                />
              )}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 relative z-10"
                style={{
                  background: 'hsl(330 65% 50% / 0.2)',
                  border: `1px solid ${S4_ACCENT.rose.border}`,
                  boxShadow: `0 0 16px ${S4_ACCENT.rose.glow}`,
                }}
              >
                <Layers className="w-4.5 h-4.5" style={{ color: S4_ACCENT.rose.text }} />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-black mb-1" style={{ color: S4_ACCENT.rose.text }}>
                  Clave conceptual
                </p>
                <p className="text-[11px] font-medium leading-relaxed" style={{ color: 'hsl(220 15% 75%)' }}>
                  No genera código estático. Es un{' '}
                  <strong style={{ color: 'hsl(220 10% 93%)' }}>colaborador de IA</strong>{' '}
                  que entiende tu app completa: historial, base de datos, estilos y lógica.
                  {' '}<em style={{ color: S4_ACCENT.violet.text, fontFamily: S4_SERIF }}>Cada prompt refina, no sobreescribe.</em>
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Chat Mockup ───────────────────────────── */}
          <motion.div {...s4Motion(0.14, isExporting)} className="flex flex-col gap-3 min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <p className="text-[11px] font-black tracking-[0.22em] uppercase" style={{ color: 'hsl(220 15% 38%)' }}>
                Demo en vivo — chat real
              </p>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black tracking-widest uppercase"
                style={{
                  background: 'hsl(152 65% 40% / 0.12)',
                  border: '1px solid hsl(152 65% 45% / 0.35)',
                  color: S4_ACCENT.green.text,
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: S4_ACCENT.green.dot, boxShadow: `0 0 6px ${S4_ACCENT.green.glow}` }}
                  {...(isExporting ? {} : {
                    animate: { scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] },
                    transition: { duration: 1.8, repeat: Infinity },
                  })}
                />
                Live
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <ChatMockup isExporting={isExporting} />
            </div>

            {/* Bottom CTA */}
            <motion.div
              {...s4Motion(0.55, isExporting)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl shrink-0 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(152 60% 40% / 0.1), hsl(185 60% 40% / 0.07))',
                border: '1px solid hsl(152 65% 42% / 0.35)',
                boxShadow: `0 0 32px ${S4_ACCENT.green.glow}`,
              }}
            >
              {!isExporting && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, hsl(152 70% 55% / 0.06) 50%, transparent 70%)' }}
                  {...s4Shimmer(isExporting, 3)}
                />
              )}
              <motion.div
                className="w-2 h-2 rounded-full shrink-0 relative z-10"
                style={{ background: S4_ACCENT.green.dot, boxShadow: `0 0 10px ${S4_ACCENT.green.glow}` }}
                {...(isExporting ? {} : {
                  animate: { scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] },
                  transition: { duration: 2.2, repeat: Infinity },
                })}
              />
              <p className="text-[11px] font-medium leading-relaxed relative z-10" style={{ color: 'hsl(220 10% 70%)' }}>
                <strong style={{ color: S4_ACCENT.green.text }}>Tú ya puedes hacer esto hoy.</strong>{' '}
                Abre <span style={{ color: S4_ACCENT.rose.text, fontFamily: S4_SERIF, fontStyle: 'italic' }}>lovable.dev</span>,
                describe tu idea en español y publica tu primera app en esta clase.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer premium ───────────────────────────────────── */}
      <S4Footer
        sectionLabel="Stack · Herramienta Principal"
        hue={330}
        showProgress
        contextHint="VibeCoding"
        session="S4"
      />
    </div>
  );
}
