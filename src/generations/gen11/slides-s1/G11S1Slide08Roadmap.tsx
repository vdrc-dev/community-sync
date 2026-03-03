/**
 * Slide 08 — Roadmap: Las 4 Sesiones
 */
import { motion } from 'framer-motion';
import { Shield, Brain, Presentation, Code2, ArrowRight } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN, VDRC_GREEN_DIM } from './theme';
import roadmapHero from '@/assets/gen11-roadmap-hero.jpg';

const SESSIONS = [
  {
    num: 'S1', label: 'HOY', title: 'Higiene Digital',
    desc: 'Inbox, navegadores, contraseñas.',
    tools: ['Gmail', 'Chrome Perfiles', 'Bitwarden'],
    icon: Shield, accent: G11.emerald, active: true,
  },
  {
    num: 'S2', label: 'SEM 2', title: 'IA Intensiva',
    desc: 'ChatGPT, Claude, Gemini, Perplexity, NotebookLM.',
    tools: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
    icon: Brain, accent: G11.blue,
  },
  {
    num: 'S3', label: 'SEM 3', title: 'UI con Claude',
    desc: 'Presentaciones inteligentes: Gamma, Napkin, Canva, Krea.',
    tools: ['Gamma', 'Napkin', 'Canva', 'Krea'],
    icon: Presentation, accent: G11.purple,
  },
  {
    num: 'S4', label: 'SEM 4', title: 'Vibe Coding',
    desc: 'Automatización y apps: Cursor, Lovable, Supabase.',
    tools: ['Cursor', 'Lovable', 'Supabase', 'Vercel'],
    icon: Code2, accent: G11.amber,
  },
];

export function G11S1Slide08Roadmap() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={roadmapHero}
          alt=""
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.30, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(24,28,27,0.6)' }} />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(0deg, #181c1b 0%, transparent 100%)' }} />
      </div>

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">

        <motion.div {...m(0)} className="mb-7">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: VDRC_GREEN }}>
            Módulo 01 — Estructura
          </p>
          <h2 className="text-5xl sm:text-7xl font-black text-white uppercase leading-none">
            4 Sesiones
          </h2>
          <h2 className="text-5xl sm:text-7xl font-black uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>
            Un Trayecto
          </h2>
          <G11GreenLine className="max-w-[220px] mb-4" />
          <p className="text-white/35 text-sm">Vamos paso a paso — cada sesión te prepara para la siguiente.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-5xl">
          {SESSIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.num} {...m(0.1 + i * 0.08)}
                className="p-5 rounded-2xl border relative overflow-hidden"
                style={{
                  borderColor: s.active ? VDRC_GREEN : s.accent.border,
                  background: s.active
                    ? `linear-gradient(145deg, rgba(61,153,112,0.14), rgba(0,0,0,0.35))`
                    : `linear-gradient(145deg, ${s.accent.bg}, rgba(0,0,0,0.3))`,
                  boxShadow: s.active ? `0 0 40px rgba(61,153,112,0.12)` : undefined,
                }}>

                {/* Session label */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black tracking-widest font-mono"
                    style={{ color: s.active ? VDRC_GREEN : s.accent.text }}>
                    {s.num}
                  </span>
                  {s.active ? (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full"
                      style={{ background: 'rgba(61,153,112,0.15)', border: `1px solid ${VDRC_GREEN_DIM}` }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: VDRC_GREEN }} />
                      <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: VDRC_GREEN }}>HOY</span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-bold text-white/20 tracking-widest">{s.label}</span>
                  )}
                </div>

                <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-4"
                  style={{
                    borderColor: s.active ? VDRC_GREEN : s.accent.border,
                    background: 'rgba(0,0,0,0.4)',
                  }}>
                  <Icon className="w-5 h-5" style={{ color: s.active ? VDRC_GREEN : s.accent.text }} />
                </div>

                <h3 className="text-base font-black text-white uppercase mb-2 leading-tight">{s.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-3">{s.desc}</p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1">
                  {s.tools.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono font-bold border"
                      style={{
                        color: s.active ? G11.emerald.text : s.accent.text,
                        borderColor: s.active ? G11.emerald.border : s.accent.border,
                        background: 'rgba(0,0,0,0.35)',
                      }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </G11Shell>
  );
}
