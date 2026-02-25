import { motion } from 'framer-motion';
import { Code2, Database, GitBranch, Sparkles, Rocket, ArrowRight } from 'lucide-react';
import bgCover from '@/assets/gen10-s4/bg-cover-vibecoding.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S4Atmosphere } from './S4Atmosphere';
import { S4Footer } from './S4Footer';
import { S4TeachingRibbon } from './S4TeachingRibbon';

const TOOLS = [
  { name: 'Gemini', role: 'DISEÑO', icon: Sparkles, color: 'hsl(38 90% 55%)', hue: 38 },
  { name: 'Lovable', role: 'BUILD', icon: Rocket, color: 'hsl(330 70% 60%)', hue: 330 },
  { name: 'Supabase', role: 'BACKEND', icon: Database, color: 'hsl(150 60% 50%)', hue: 150 },
  { name: 'GitHub', role: 'CONTROL', icon: GitBranch, color: 'hsl(280 70% 60%)', hue: 280 },
  { name: 'Cursor', role: 'EDICIÓN', icon: Code2, color: 'hsl(185 70% 50%)', hue: 185 },
];

const OUTCOMES = [
  { title: 'App funcional', detail: 'Frontend + backend conectados en una sola sesion.' },
  { title: 'Datos reales', detail: 'Modelo de datos, auth y reglas minimas de seguridad.' },
  { title: 'Flujo replicable', detail: 'Metodo claro para repetir y escalar cada semana.' },
];

export function S4Slide01Cover() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 1.0, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans" style={{ background: '#04030a' }}>
      <S4Atmosphere
        isExporting={isExporting}
        particleCount={24}
        primaryHue={185}
        secondaryHue={330}
        tertiaryHue={150}
        showAurora
        showOrbs
        showLightSweep
        showHolographic
        intensity={1.15}
      />
      <img src={bgCover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.16]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/85 via-[#04030a]/50 to-[#04030a]/88" />
      <S4TeachingRibbon
        isExporting={isExporting}
        hue={185}
        objective="Entender el sistema completo de VibeCoding para producir una app util."
        deliverable="Salir de la sesion con una app publicada y conectada a datos reales."
        qualityGate="Cada decision debe ser clara, ejecutable y replicable por cualquier participante."
      />

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-[1300px] px-16 text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] backdrop-blur-sm mb-10">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            {...(isExporting ? {} : { animate: { opacity: [1, 0.3, 1] }, transition: { duration: 2, repeat: Infinity } })}
          />
          <span className="text-xs font-black tracking-[0.25em] uppercase text-cyan-400/90">Semana 4 · Generación 10 · VibeCoding</span>
        </motion.div>

        {/* Giant title */}
        <motion.div {...m(0.1)} className="mb-4">
          {/* Oversized watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[28vw] font-black text-white/[0.015] tracking-tighter leading-none" style={{ fontVariant: 'small-caps' }}>VC</span>
          </div>
          <h1 className="relative text-[9vw] 2xl:text-[130px] font-black tracking-tight leading-[0.92] mb-4">
            <span style={{ background: 'linear-gradient(135deg, hsl(185 70% 65%) 0%, hsl(150 60% 60%) 35%, hsl(38 90% 60%) 70%, hsl(330 70% 65%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              VibeCoding
            </span>
          </h1>
        </motion.div>

        <motion.p {...m(0.2)} className="text-3xl 2xl:text-4xl font-bold text-white/75 mb-3 tracking-tight">
          De <span className="text-white font-black">Consumidor</span> a <span className="text-white font-black">Creador</span>
        </motion.p>

        <motion.p {...m(0.3)} className="mx-auto mb-8 max-w-2xl text-base font-medium leading-relaxed text-white/75">
          En 90 minutos construyes una app completa con flujo real de trabajo: idea, implementacion, datos, control de versiones y refinamiento final.
        </motion.p>

        {/* Tool pipeline — premium cards */}
        <motion.div {...m(0.4)} className="mb-8 flex items-center justify-center gap-2">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className="flex items-center gap-2">
                <motion.div
                  {...(isExporting ? {} : { initial: { opacity: 0, y: 20, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay: 0.55 + i * 0.09, type: 'spring', stiffness: 180, damping: 14 } })}
                  className="flex flex-col items-center gap-2.5">
                  {/* Card */}
                  <div className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-md overflow-hidden">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${tool.color.replace(')', ' / 0.5)')}, transparent)` }} />
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `hsl(${tool.hue} 60% 45% / 0.12)`, border: `1px solid hsl(${tool.hue} 60% 50% / 0.3)`, boxShadow: `0 0 20px hsl(${tool.hue} 60% 50% / 0.12)` }}>
                      <Icon className="w-5 h-5" style={{ color: tool.color }} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-white/80 leading-tight">{tool.name}</p>
                      <p className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: `hsl(${tool.hue} 65% 72% / 0.9)` }}>{tool.role}</p>
                    </div>
                  </div>
                </motion.div>
                {i < TOOLS.length - 1 && (
                  <motion.div
                    {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.7 + i * 0.09 } })}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white/75" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>

        <motion.div {...m(0.45)} className="mx-auto grid max-w-5xl grid-cols-3 gap-3">
          {OUTCOMES.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4 text-left backdrop-blur-sm"
              style={{ boxShadow: `0 0 24px hsl(${[185, 38, 330][i]} 70% 55% / 0.1)` }}
            >
              <p className="mb-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/90">{item.title}</p>
              <p className="text-xs leading-relaxed text-white/75">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <S4Footer
        sectionLabel="Apertura de Semana 4"
        contextHint="Objetivo y resultados de la sesion"
        hue={185}
        session="S4"
      />
    </div>
  );
}
