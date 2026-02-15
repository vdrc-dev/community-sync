import { motion } from 'framer-motion';
import { Video, Film, Mic, Wand2, Sparkles, Play, Zap } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import bgVideoAI from '@/assets/gen10-s3/bg-video-ai.jpg';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const CAPABILITIES = [
  { title: 'Videos Instantáneos', desc: 'Genera videos sin pausas. Movimiento natural que mantiene estilo e identidad visual.', icon: Play, color: 'hsl(330 70% 60%)' },
  { title: 'Calidad de Cine', desc: 'Resolución profesional entrenada con datos masivos. Ideal para proyectos de alto nivel.', icon: Film, color: 'hsl(280 70% 60%)' },
  { title: 'Anima Imágenes', desc: 'Da vida a cualquier foto con movimiento. Convierte capturas estáticas en narrativas visuales.', icon: Wand2, color: 'hsl(185 70% 50%)' },
  { title: 'Sincroniza Voces', desc: 'Lip-sync automático: los personajes hablan naturalmente sincronizando labios con el audio.', icon: Mic, color: 'hsl(38 90% 55%)' },
];

const ENGINES = [
  { name: 'Sora', provider: 'OpenAI', strength: 'Narrativa cinematográfica' },
  { name: 'Veo 3', provider: 'Google', strength: 'Realismo fotográfico' },
  { name: 'Kling', provider: 'Kuaishou', strength: 'Velocidad de generación' },
];

export function S3Slide14VideoAI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgVideoAI} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/40 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={12} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Video className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Video Generativo</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Krea.ai: <span style={{ color: S3_ACCENT.rose.text }}>Centro de Mando Visual</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">De una beta experimental a una suite de orquestación que integra Sora, Veo 3 y Kling</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {/* Capabilities grid */}
          <div className="col-span-8 grid grid-cols-2 gap-4">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div key={i} {...m(0.15 + i * 0.08)}
                  className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  {...(isExporting ? {} : { whileHover: { borderColor: cap.color.replace(')', ' / 0.3)'), scale: 1.02, y: -2 } })}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${cap.color.replace(')', ' / 0.1)')}`, border: `1px solid ${cap.color.replace(')', ' / 0.25)')}` }}>
                      {i === 0 && !isExporting && (
                        <motion.div className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{ border: `1px solid ${cap.color.replace(')', ' / 0.3)')}` }}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <Icon className="w-5 h-5 relative z-10" style={{ color: cap.color }} />
                    </div>
                    <span className="text-base font-bold text-white">{cap.title}</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{cap.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Engines sidebar */}
          <div className="col-span-4 space-y-3">
            <motion.p {...m(0.15)} className="text-xs text-white/30 uppercase tracking-wider font-bold mb-3 pl-1">Motores Integrados</motion.p>
            {ENGINES.map((eng, i) => (
              <motion.div key={i} {...m(0.25 + i * 0.08)}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                {...(isExporting ? {} : { whileHover: { borderColor: 'hsl(330 65% 55% / 0.2)', scale: 1.02 } })}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base font-bold text-white">{eng.name}</span>
                  <span className="text-[9px] font-mono text-white/20">{eng.provider}</span>
                </div>
                <p className="text-xs text-white/40">{eng.strength}</p>
              </motion.div>
            ))}

            <motion.div {...m(0.55)} className="p-4 rounded-xl border border-rose-500/15 bg-rose-500/[0.03]">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-rose-300/80 mb-1">El cambio clave</p>
                  <p className="text-[11px] text-rose-300/60 leading-relaxed">Ya no se trata de crear clips aleatorios, sino de construir <span className="text-rose-300/80 font-semibold">narrativas visuales dinámicas</span> con control total.</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...m(0.6)} className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold">Extras</p>
                  <p className="text-[11px] text-white/40">Control estético · Reacción al sonido · IA predictiva</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <S3Footer sectionLabel="VIDEO GENERATIVO" hue={330} />
    </div>
  );
}
