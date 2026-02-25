/**
 * S4 Slide 06 — Lovable: De idea a app
 * Layout: Editorial 2-col.
 * Left: Título + pipeline interactivo de 4 pasos + comparativa
 * Right: Live chat mockup que simula construir una app paso a paso
 */

import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Globe, Code2, Database, Zap, Rocket,
  CheckCircle2, ArrowRight, Layers, ShieldCheck, ExternalLink,
} from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useState, useEffect } from 'react';

/* ── Theme ─────────────────────────────────────────────────── */
const ROSE   = { h: 330, text: 'hsl(330 90% 72%)',  bg: 'hsl(330 80% 55% / 0.12)', border: 'hsl(330 80% 55% / 0.35)' };
const VIOLET = { h: 270, text: 'hsl(270 80% 74%)',  bg: 'hsl(270 70% 55% / 0.12)', border: 'hsl(270 70% 55% / 0.35)' };
const CYAN   = { h: 185, text: 'hsl(185 80% 62%)',  bg: 'hsl(185 70% 50% / 0.12)', border: 'hsl(185 70% 50% / 0.35)' };
const GREEN  = { h: 152, text: 'hsl(152 80% 62%)',  bg: 'hsl(152 70% 45% / 0.12)', border: 'hsl(152 70% 45% / 0.35)' };
const EASE   = [0.22, 1, 0.36, 1] as const;

/* ── Pipeline steps ─────────────────────────────────────────── */
const STEPS = [
  { n: 1, label: 'Describe',  sub: 'En lenguaje natural',        icon: MessageSquare, color: ROSE   },
  { n: 2, label: 'Genera',    sub: 'Lovable construye la app',    icon: Rocket,        color: VIOLET },
  { n: 3, label: 'Itera',     sub: 'Refina con chat',             icon: Code2,         color: CYAN   },
  { n: 4, label: 'Publica',   sub: 'URL HTTPS en segundos',       icon: Globe,         color: GREEN  },
];

/* ── Chat simulation ─────────────────────────────────────────── */
const CHAT_SEQUENCE = [
  { role: 'user',      text: 'Crea una app de gestión de tareas con login de usuarios, tabla de tareas y filtros por estado.' },
  { role: 'lovable',   text: '✅ Generando componentes React...\n📦 Conectando base de datos (auth + tareas)\n🚀 Publicando en URL HTTPS...', isCode: true },
  { role: 'assistant', text: '¡Listo! Tu app está publicada:', hasUrl: true },
  { role: 'user',      text: 'Agrega un filtro de prioridad y cambia los colores a morado.' },
  { role: 'lovable',   text: '✅ Filtro de prioridad: Alta / Media / Baja\n🎨 Paleta actualizada a violeta/lavanda\n⚡ Deploy automático completado', isCode: true },
];

/* ── Features list ───────────────────────────────────────────── */
const FEATURES = [
  { icon: Code2,        label: 'React profesional',  desc: 'Componentes reutilizables, TypeScript',  color: CYAN  },
  { icon: Database,     label: 'Backend 1-click',    desc: 'Auth + DB + Storage automático',          color: VIOLET },
  { icon: ShieldCheck,  label: 'RLS incluido',       desc: 'Seguridad a nivel de fila por defecto',   color: ROSE  },
  { icon: Zap,          label: 'Deploy instantáneo', desc: 'URL pública en < 30 segundos',            color: GREEN },
];

/* ── Motion helper ───────────────────────────────────────────── */
const m = (isExporting: boolean, d: number, extra?: object) =>
  isExporting ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: d, duration: 0.6, ease: EASE },
    ...extra,
  };

/* ═══════════════════════════════════════════════════════════════
   Live Chat Mockup
   ═══════════════════════════════════════════════════════════════ */
function ChatMockup({ isExporting }: { isExporting: boolean }) {
  const [visibleCount, setVisibleCount] = useState(isExporting ? CHAT_SEQUENCE.length : 0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (isExporting) return;
    const reveal = (i: number) => {
      if (i >= CHAT_SEQUENCE.length) return;
      setTyping(true);
      const delay = CHAT_SEQUENCE[i].role === 'lovable' ? 1200 : 600;
      setTimeout(() => {
        setTyping(false);
        setVisibleCount(i + 1);
        setTimeout(() => reveal(i + 1), 800);
      }, delay);
    };
    const t = setTimeout(() => reveal(0), 1000);
    return () => clearTimeout(t);
  }, [isExporting]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'hsl(240 15% 6%)',
        border: '1px solid hsl(270 30% 25% / 0.5)',
        boxShadow: '0 0 60px hsl(270 60% 50% / 0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
        height: '100%',
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b shrink-0"
        style={{ background: 'hsl(240 15% 8%)', borderColor: 'hsl(270 30% 20% / 0.5)' }}
      >
        <div className="flex gap-1.5">
          {['hsl(0 70% 55%)', 'hsl(38 85% 55%)', 'hsl(152 65% 45%)'].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div
          className="flex-1 mx-3 px-3 py-1 rounded-md text-[10px] font-mono text-center"
          style={{ background: 'hsl(240 15% 11%)', color: 'hsl(152 65% 55%)' }}
        >
          lovable.dev · editor
        </div>
        <ExternalLink className="w-3 h-3" style={{ color: 'hsl(270 50% 60%)' }} />
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-3 min-h-0">
        <AnimatePresence>
          {CHAT_SEQUENCE.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={isExporting ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'lovable' && (
                <div className="mr-2 shrink-0">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black"
                    style={{ background: 'hsl(330 70% 55%)', color: 'white' }}
                  >
                    L
                  </div>
                </div>
              )}
              {msg.role === 'assistant' && (
                <div className="mr-2 shrink-0">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(270 60% 55% / 0.2)', border: '1px solid hsl(270 60% 55% / 0.4)' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'hsl(270 70% 70%)' }} />
                  </div>
                </div>
              )}
              <div
                className="max-w-[85%] px-3 py-2 rounded-xl text-[11px] leading-relaxed"
                style={{
                  background: msg.role === 'user'
                    ? 'hsl(330 65% 50% / 0.18)'
                    : msg.isCode
                    ? 'hsl(240 15% 10%)'
                    : 'hsl(240 15% 12%)',
                  border: msg.role === 'user'
                    ? '1px solid hsl(330 65% 50% / 0.35)'
                    : '1px solid hsl(270 20% 25% / 0.4)',
                  color: msg.role === 'user'
                    ? 'hsl(330 80% 85%)'
                    : 'hsl(220 20% 85%)',
                  fontFamily: msg.isCode ? "'JetBrains Mono', monospace" : 'inherit',
                  whiteSpace: 'pre-line',
                  fontWeight: msg.role === 'user' ? 500 : 400,
                }}
              >
                {msg.hasUrl ? (
                  <span>
                    ¡Listo! Tu app está publicada:{' '}
                    <span style={{ color: 'hsl(152 75% 60%)', fontFamily: 'monospace', fontWeight: 600 }}>
                      tu-app.lovable.app
                    </span>
                  </span>
                ) : msg.text}
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
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0"
                style={{ background: 'hsl(330 70% 55%)', color: 'white' }}
              >
                L
              </div>
              <div
                className="px-3 py-2 rounded-xl flex gap-1 items-center"
                style={{ background: 'hsl(240 15% 10%)', border: '1px solid hsl(270 20% 25% / 0.4)' }}
              >
                {[0, 0.2, 0.4].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'hsl(330 70% 60%)' }}
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay, ease: 'easeInOut' }}
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
        style={{ borderColor: 'hsl(270 20% 20% / 0.5)', background: 'hsl(240 15% 7%)' }}
      >
        <div
          className="flex-1 px-3 py-2 rounded-lg text-[10px]"
          style={{ background: 'hsl(240 15% 11%)', border: '1px solid hsl(270 20% 22% / 0.5)', color: 'hsl(220 10% 45%)' }}
        >
          Describe tu próxima feature...
        </div>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'hsl(330 70% 50%)', boxShadow: '0 0 12px hsl(330 70% 50% / 0.4)' }}
        >
          <Rocket className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Slide
   ═══════════════════════════════════════════════════════════════ */
export function S4Slide06Lovable() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();

  return (
    <div
      className="h-full w-full min-h-screen relative overflow-hidden font-sans"
      style={{ background: '#04030a' }}
    >
      {/* ── Atmospheric background ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glows */}
        <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(330 65% 50% / 0.07), transparent 65%)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(270 65% 50% / 0.07), transparent 65%)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0" style={{
          opacity: 0.025,
          backgroundImage: 'radial-gradient(hsl(270 50% 70%) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
        {/* Watermark */}
        <div
          className="absolute bottom-[-4%] right-[-2%] text-[22vw] font-black leading-none select-none tracking-tighter"
          style={{ color: 'hsl(330 60% 50% / 0.03)' }}
        >
          LV
        </div>
      </div>

      {/* ── Two-column content ────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col px-10 2xl:px-14 py-10 2xl:py-12 gap-6">

        {/* Header row */}
        <motion.div {...m(isExporting, 0)} className="flex items-start gap-4">
          <div
            className="w-1.5 h-12 rounded-full shrink-0 mt-1"
            style={{ background: 'linear-gradient(180deg, hsl(330 80% 62%), hsl(270 70% 62%))', boxShadow: '0 0 16px hsl(330 80% 55% / 0.5)' }}
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-black tracking-[0.22em] uppercase px-2.5 py-1 rounded-md"
                style={{ background: 'hsl(330 70% 50% / 0.15)', color: 'hsl(330 80% 72%)', border: '1px solid hsl(330 70% 50% / 0.3)' }}
              >
                Herramienta Central
              </span>
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md"
                style={{ background: 'hsl(152 60% 40% / 0.12)', color: 'hsl(152 70% 62%)', border: '1px solid hsl(152 60% 40% / 0.25)' }}
              >
                Clase 4 · VibeCoding
              </span>
            </div>
            <h1
              className="text-4xl 2xl:text-5xl font-black leading-tight"
              style={{
                background: 'linear-gradient(135deg, hsl(330 90% 78%), hsl(270 85% 76%), hsl(185 80% 68%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px hsl(330 80% 60% / 0.4))',
              }}
            >
              Lovable: De idea a app
            </h1>
            <p className="text-base font-medium mt-1" style={{ color: 'hsl(220 15% 65%)' }}>
              Prompt en español → App React completa + backend + URL pública. <strong style={{ color: 'hsl(330 80% 75%)' }}>Sin escribir código.</strong>
            </p>
          </div>
        </motion.div>

        {/* Main 2-col grid */}
        <div className="flex-1 grid grid-cols-[1fr_1.05fr] gap-6 min-h-0">

          {/* ── LEFT COLUMN ──────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Pipeline steps */}
            <motion.div {...m(isExporting, 0.1)}>
              <p
                className="text-[10px] font-black tracking-[0.2em] uppercase mb-3"
                style={{ color: 'hsl(220 15% 40%)' }}
              >
                El flujo completo
              </p>
              <div className="grid grid-cols-4 gap-2">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.n}
                      {...(isExporting ? {} : {
                        initial: { opacity: 0, y: 16, scale: 0.93 },
                        animate: { opacity: 1, y: 0, scale: 1 },
                        transition: { delay: 0.15 + i * 0.1, duration: 0.5, ease: EASE },
                      })}
                      className="relative flex flex-col items-center gap-2 p-3 rounded-xl"
                      style={{
                        background: s.color.bg,
                        border: `1px solid ${s.color.border}`,
                      }}
                    >
                      {/* Step number */}
                      <div
                        className="absolute -top-2 -left-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                        style={{ background: `hsl(${s.color.h} 70% 50%)`, boxShadow: `0 0 10px hsl(${s.color.h} 70% 50% / 0.5)` }}
                      >
                        {s.n}
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `hsl(${s.color.h} 60% 50% / 0.15)` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: s.color.text }} />
                      </div>
                      <p className="text-xs font-black text-center" style={{ color: 'hsl(220 15% 88%)' }}>{s.label}</p>
                      <p className="text-[10px] text-center font-medium leading-snug" style={{ color: 'hsl(220 10% 52%)' }}>{s.sub}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Features 2x2 grid */}
            <motion.div {...m(isExporting, 0.25)}>
              <p
                className="text-[10px] font-black tracking-[0.2em] uppercase mb-3"
                style={{ color: 'hsl(220 15% 40%)' }}
              >
                Por qué Lovable es diferente
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      {...(isExporting ? {} : {
                        initial: { opacity: 0, x: -10 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE },
                      })}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: f.color.bg, border: `1px solid ${f.color.border}` }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `hsl(${f.color.h} 60% 50% / 0.2)` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: f.color.text }} />
                      </div>
                      <div>
                        <p className="text-xs font-black leading-tight mb-0.5" style={{ color: 'hsl(220 15% 90%)' }}>{f.label}</p>
                        <p className="text-[10px] font-medium leading-snug" style={{ color: 'hsl(220 10% 52%)' }}>{f.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Key insight callout */}
            <motion.div
              {...m(isExporting, 0.45)}
              className="p-4 rounded-xl flex items-start gap-3"
              style={{
                background: 'hsl(330 60% 50% / 0.08)',
                border: '1px solid hsl(330 65% 50% / 0.3)',
                boxShadow: 'inset 0 1px 0 hsl(330 65% 70% / 0.05)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'hsl(330 65% 50% / 0.2)', border: '1px solid hsl(330 65% 50% / 0.3)' }}
              >
                <Layers className="w-4 h-4" style={{ color: ROSE.text }} />
              </div>
              <div>
                <p className="text-xs font-black mb-1" style={{ color: ROSE.text }}>
                  Clave conceptual
                </p>
                <p className="text-[11px] font-medium leading-relaxed" style={{ color: 'hsl(220 15% 72%)' }}>
                  No es un generador de código estático. Es un <strong style={{ color: 'hsl(220 10% 90%)' }}>colaborador de IA</strong> que entiende tu app completa: historial, base de datos, estilos y lógica. Cada prompt refina, no sobreescribe.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Live Chat Mockup ───────────────── */}
          <motion.div {...m(isExporting, 0.15)} className="flex flex-col gap-3 min-h-0">
            <p
              className="text-[10px] font-black tracking-[0.2em] uppercase shrink-0"
              style={{ color: 'hsl(220 15% 40%)' }}
            >
              Demo en vivo — chat real
            </p>
            <div className="flex-1 min-h-0">
              <ChatMockup isExporting={isExporting} />
            </div>
            {/* Bottom callout */}
            <motion.div
              {...m(isExporting, 0.55)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl shrink-0"
              style={{
                background: 'hsl(152 60% 40% / 0.1)',
                border: '1px solid hsl(152 60% 40% / 0.3)',
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: 'hsl(152 70% 55%)', boxShadow: '0 0 8px hsl(152 70% 55% / 0.6)' }}
                {...(isExporting ? {} : { animate: { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }, transition: { duration: 2, repeat: Infinity } })}
              />
              <p className="text-[11px] font-medium" style={{ color: 'hsl(220 10% 68%)' }}>
                <strong style={{ color: 'hsl(152 75% 65%)' }}>Tú ya puedes hacer esto hoy.</strong>{' '}
                Abre lovable.dev, describe tu idea en español y publica tu primera app en esta clase.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div
          className="h-px mx-10"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 55% 55% / 0.25), transparent)' }}
        />
        <div className="flex items-center justify-between px-10 py-3">
          <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: 'hsl(220 10% 32%)' }}>
            Stack · Herramienta Principal
          </span>
          <span className="text-[11px] font-black tabular-nums" style={{ color: 'hsl(220 10% 42%)' }}>
            {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}
          </span>
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{ boxShadow: 'inset 0 0 160px 60px hsl(240 25% 2% / 0.8)' }}
      />
    </div>
  );
}
