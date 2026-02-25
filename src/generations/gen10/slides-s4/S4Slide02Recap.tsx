import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, MessageSquare, Code2, ChevronRight, CheckCircle2, Zap, Star } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S4Atmosphere } from './S4Atmosphere';
import { S4Footer } from './S4Footer';
import { S4TeachingRibbon } from './S4TeachingRibbon';

const WEEKS = [
  {
    num: 1, title: 'Higiene Digital', icon: Shield, color: 'hsl(185 70% 50%)', hue: 185,
    skills: ['Inbox Zero', 'Perfiles de Navegador', 'Bitwarden', 'Context Engineering'],
    tagline: 'El sistema operativo de tu mente digital.',
    status: 'Completada',
  },
  {
    num: 2, title: 'La Era Agéntica', icon: Brain, color: 'hsl(280 70% 60%)', hue: 280,
    skills: ['Framework C.R.O.P.', 'Modelos Frontier', 'Agentes de IA', 'MCP'],
    tagline: 'Hablar con IA es un superpoder. El C.R.O.P. es tu sintaxis.',
    status: 'Completada',
  },
  {
    num: 3, title: 'Comunicación', icon: MessageSquare, color: 'hsl(330 70% 60%)', hue: 330,
    skills: ['Gemini Canvas', 'Claude Code', 'CRM + MCP', 'Cursor & GitHub'],
    tagline: 'De ideas a productos con herramientas profesionales.',
    status: 'Completada',
  },
  {
    num: 4, title: 'Desarrollo', icon: Code2, color: 'hsl(150 60% 50%)', hue: 150,
    skills: ['Lovable', 'Supabase', 'Full Stack', 'Deploy'],
    tagline: 'Hoy: de cero a app publicada con datos reales.',
    status: 'HOY',
  },
];

export function S4Slide02Recap() {
  const { isExporting } = useExportContext();
  const [activeWeek, setActiveWeek] = useState(3);
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <S4Atmosphere isExporting={isExporting} particleCount={16} primaryHue={150} secondaryHue={280} tertiaryHue={185} showAurora showOrbs intensity={1.05} />
      <div className="absolute top-[5%] right-[4%] pointer-events-none select-none text-[22vw] font-black leading-none tracking-tighter text-white/[0.05]">3+1</div>
      <S4TeachingRibbon
        isExporting={isExporting}
        hue={150}
        objective="Conectar lo aprendido en semanas 1, 2 y 3 con el resultado de hoy."
        deliverable="Mapa mental claro del camino completo antes de construir."
        qualityGate="Cada participante debe poder explicar el flujo end-to-end en menos de 60 segundos."
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, hsl(185 70% 55%), hsl(150 60% 50%), hsl(330 60% 55%), hsl(280 60% 55%))' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/75">Tu Progreso · Generación 10</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">3 Semanas Te Trajeron Hasta Aquí</h1>
            </div>
          </div>
          <p className="ml-5 pl-1 text-sm font-medium tracking-wide text-white/75">Hoy encendemos los motores con lo que ya sabes.</p>
        </motion.div>

        {/* Weeks grid */}
        <div className="grid grid-cols-4 gap-4">
          {WEEKS.map((week, i) => {
            const Icon = week.icon;
            const isActive = activeWeek === i;
            const isCurrent = week.status === 'HOY';
            return (
              <motion.button key={week.num} {...m(0.1 + i * 0.07)}
                onClick={() => setActiveWeek(i)}
                className={`relative p-6 rounded-2xl border text-left transition-all duration-400 group ${isActive ? 'border-white/[0.14] bg-white/[0.04]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02]'}`}
                style={{ boxShadow: isActive ? `0 0 40px hsl(${week.hue} 60% 40% / 0.12), inset 0 1px 0 hsl(${week.hue} 60% 60% / 0.08)` : 'none' }}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${week.color}, transparent)`, opacity: isActive ? 0.7 : 0.12 }} />

                {/* HOY badge */}
                {isCurrent && (
                  <motion.div
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black tracking-widest"
                    style={{ background: `hsl(${week.hue} 60% 40% / 0.2)`, color: week.color, border: `1px solid hsl(${week.hue} 60% 50% / 0.35)` }}
                    {...(isExporting ? {} : { animate: { scale: [1, 1.06, 1] }, transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } })}>
                    <Zap className="w-2.5 h-2.5" />
                    HOY
                  </motion.div>
                )}

                {/* Week number editorial */}
                <div className="absolute bottom-4 right-4 text-[56px] font-black leading-none select-none pointer-events-none" style={{ color: `hsl(${week.hue} 50% 50% / ${isActive ? '0.07' : '0.03'})`, transition: 'color 0.3s' }}>{week.num}</div>

                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300" style={{ background: `hsl(${week.hue} 60% 45% / ${isActive ? '0.15' : '0.07'})`, border: `1px solid hsl(${week.hue} 60% 50% / ${isActive ? '0.3' : '0.15'})`, boxShadow: isActive ? `0 0 20px hsl(${week.hue} 60% 50% / 0.15)` : 'none' }}>
                    <Icon className="w-5 h-5" style={{ color: week.color }} />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-white/75">Semana {week.num}</p>
                    <p className="text-lg font-black text-white leading-tight">{week.title}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2 mb-4">
                  {week.skills.map((skill, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: isCurrent ? 'hsl(0 0% 100% / 0.4)' : `${week.color}` }} />
                      <span className={`text-xs font-medium ${isCurrent ? 'text-white/80' : 'text-white/90'}`}>{skill}</span>
                    </div>
                  ))}
                </div>

                {/* Tagline */}
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[11px] italic leading-relaxed pt-3 border-t border-white/[0.05]"
                      style={{ color: `hsl(${week.hue} 50% 60% / 0.7)` }}>
                      "{week.tagline}"
                    </motion.p>
                  )}
                </AnimatePresence>

                {i < 3 && <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-5 h-5 flex items-center justify-center"><ChevronRight className="h-3.5 w-3.5 text-white/75" /></div>}
              </motion.button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <motion.div {...m(0.5)} className="mt-6 flex items-center gap-4 max-w-lg">
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(280 70% 55%), hsl(330 70% 55%), hsl(150 60% 50%))' }}
              {...(isExporting ? { style: { width: '100%', background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(280 70% 55%), hsl(330 70% 55%), hsl(150 60% 50%))' } } : { initial: { width: '75%' }, animate: { width: '100%' }, transition: { duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] } })} />
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-amber-400/60" />
            <span className="text-[11px] font-black text-white/85 tracking-wider">SEMANA FINAL</span>
          </div>
        </motion.div>
      </div>

      <S4Footer
        sectionLabel="Recap estrategico"
        contextHint="Del fundamento al build full stack"
        hue={150}
        session="S4"
      />
    </div>
  );
}
