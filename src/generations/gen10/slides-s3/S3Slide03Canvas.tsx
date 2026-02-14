import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, FileSpreadsheet, Palette } from 'lucide-react';
import bgCanvas from '@/assets/gen10-s3/bg-canvas-dashboard.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const STEPS = [
  { num: 1, title: 'Carga tu Dataset', desc: 'Archivo CSV o captura de datos. Gémini y ChatGPT lo procesan al instante.', icon: FileSpreadsheet, color: 'hsl(185 70% 50%)' },
  { num: 2, title: 'Pide un Dashboard', desc: '"Crea un dashboard interactivo con gráficos de ventas por región y tendencias mensuales"', icon: BarChart3, color: 'hsl(185 70% 50%)' },
  { num: 3, title: 'Itera el Diseño', desc: 'Cambia colores, tipografías y layout con prompts. Vibe Coding en acción.', icon: Palette, color: 'hsl(185 70% 50%)' },
];

export function S3Slide03Canvas() {
  const { isExporting } = useExportContext();
  const [activeStep, setActiveStep] = useState(0);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgCanvas} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/50 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={185} secondaryHue={263} tertiaryHue={330} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3" style={{ borderColor: S3_ACCENT.cyan.border, backgroundColor: S3_ACCENT.cyan.bg }}>
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-400/80">Comunicación Visual</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Canvas: Tu Laboratorio Visual</h1>
          <p className="text-white/40 text-sm mt-2">Transforma datos crudos en dashboards interactivos — sin escribir una línea de código</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {/* Steps */}
          <div className="col-span-4 space-y-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <motion.button key={i} {...m(0.15 + i * 0.08)}
                  {...(isExporting ? {} : { whileHover: { borderColor: 'hsl(185 70% 50% / 0.3)', scale: 1.02 } })}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${isActive ? 'bg-cyan-500/[0.06] border-cyan-500/20' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${isActive ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'bg-white/5 text-white/30 border border-white/[0.06]'}`}>
                      {step.num}
                    </div>
                    <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-white/50'}`}>{step.title}</span>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="text-white/40 text-xs leading-relaxed pl-11">{step.desc}</motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Dashboard mockup */}
          <motion.div {...m(0.3)} className="col-span-8">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/60" /></div>
                <span className="text-[10px] text-white/30 ml-2 font-mono">canvas — dashboard.html</span>
              </div>
              <div className="p-6">
                {/* Fake dashboard */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[{ label: 'Ventas Totales', value: '$2.4M', delta: '+12%', color: 'cyan' }, { label: 'Clientes Activos', value: '1,847', delta: '+8%', color: 'emerald' }, { label: 'Ticket Promedio', value: '$1,298', delta: '+3%', color: 'amber' }].map((metric, i) => (
                    <div key={i} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                      <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">{metric.label}</p>
                      <p className="text-xl font-black text-white">{metric.value}</p>
                      <span className="text-[10px] text-emerald-400 font-bold">{metric.delta}</span>
                    </div>
                  ))}
                </div>
                {/* Fake bars */}
                <div className="flex items-end gap-2 h-[120px] p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  {[65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95, 72].map((h, i) => (
                    <motion.div key={i} className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background: `linear-gradient(to top, hsl(185 70% 50% / ${0.3 + (h / 100) * 0.5}), hsl(185 70% 50% / 0.1))`,
                        boxShadow: `0 0 8px hsl(185 70% 50% / ${0.1 + (h / 100) * 0.3})`,
                      }}
                      {...(isExporting ? {} : { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { delay: 0.5 + i * 0.05, duration: 0.4 } })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <S3Footer sectionLabel="COMUNICACIÓN VISUAL" hue={185} />
    </div>
  );
}
