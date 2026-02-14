import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Type, Pipette, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import bgDesignFoundations from '@/assets/gen10-s3/bg-design-foundations.jpg';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const HEX_EXAMPLES = [
  { hex: '#E74C3C', name: 'Rojo Coral', rgb: 'R:231 G:76 B:60' },
  { hex: '#2ECC71', name: 'Verde Esmeralda', rgb: 'R:46 G:204 B:113' },
  { hex: '#3498DB', name: 'Azul Cielo', rgb: 'R:52 G:152 B:219' },
  { hex: '#F1C40F', name: 'Amarillo Sol', rgb: 'R:241 G:196 B:15' },
  { hex: '#9B59B6', name: 'Púrpura', rgb: 'R:155 G:89 B:182' },
  { hex: '#1ABC9C', name: 'Turquesa', rgb: 'R:26 G:188 B:156' },
];

const TOOLS = [
  { name: 'Coolors.co', desc: 'Genera paletas de 3-5 colores complementarios con un clic. Exporta a HEX, RGB o CSS.', icon: Palette, color: 'hsl(185 70% 50%)', url: 'coolors.co' },
  { name: 'Fontjoy', desc: 'IA que combina fuentes automáticamente. Genera pares tipográficos armoniosos en segundos.', icon: Type, color: 'hsl(280 70% 60%)', url: 'fontjoy.com' },
  { name: 'Google Fonts', desc: '+1,500 fuentes gratis con licencia abierta. Revisa que tenga acentos y la letra ñ.', icon: Type, color: 'hsl(38 90% 55%)', url: 'fonts.google.com' },
];

const FONT_TYPES = [
  { type: 'Sans Serif', desc: 'Modernas y claras. Perfectas para pantalla.', example: 'Inter, Roboto', style: 'font-sans' },
  { type: 'Serif', desc: 'Elegantes, con "patitas". Ideales para títulos.', example: 'Playfair, Georgia', style: 'font-serif' },
  { type: 'Display', desc: 'Decorativas. Solo para títulos grandes.', example: 'Bebas Neue, Lobster', style: 'font-sans font-black' },
];

export function S3Slide03DesignFoundations() {
  const { isExporting } = useExportContext();
  const [activeTab, setActiveTab] = useState<'colores' | 'tipografia'>('colores');
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgDesignFoundations} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/50 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={12} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3" style={{ borderColor: S3_ACCENT.rose.border, backgroundColor: S3_ACCENT.rose.bg }}>
            <Pipette className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Fundamentos Visuales</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Diseño con <span className="text-rose-400">Propósito</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Colores y tipografía: los cimientos de toda comunicación visual profesional</p>
        </motion.div>

        {/* Tabs */}
        <motion.div {...m(0.1)} className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.02] p-1">
            <button onClick={() => setActiveTab('colores')} className={`px-5 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'colores' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : 'text-white/40'}`}>
              <Palette className="w-4 h-4 inline mr-2" />Colores
            </button>
            <button onClick={() => setActiveTab('tipografia')} className={`px-5 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'tipografia' ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30' : 'text-white/40'}`}>
              <Type className="w-4 h-4 inline mr-2" />Tipografía
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'colores' ? (
            <motion.div key="colores" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-12 gap-6">
              {/* HEX swatches */}
              <div className="col-span-5">
                <motion.p {...m(0.15)} className="text-xs text-white/30 uppercase tracking-wider font-bold mb-3 pl-1">Códigos HEX — La receta digital del color</motion.p>
                <div className="grid grid-cols-3 gap-2">
                  {HEX_EXAMPLES.map((c, i) => (
                    <motion.div key={i} {...m(0.2 + i * 0.04)} {...(isExporting ? {} : { whileHover: { scale: 1.05, y: -2 } })}
                      className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] group hover:bg-white/[0.04] transition-colors">
                      <div className="w-full h-10 rounded-lg mb-2" style={{ background: c.hex }} />
                      <p className="text-[10px] font-mono font-bold text-white/60">{c.hex}</p>
                      <p className="text-[9px] text-white/30">{c.name}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div {...m(0.5)} className="mt-3 p-3 rounded-lg border border-white/[0.04] bg-white/[0.02]">
                  <p className="text-[10px] text-white/30 mb-1 font-bold">¿Cómo funcionan?</p>
                  <p className="text-[11px] text-white/40 leading-relaxed">Cada par de los 6 dígitos HEX indica la intensidad de Rojo, Verde y Azul. <span className="text-rose-400 font-mono font-bold">#FF</span><span className="text-emerald-400 font-mono font-bold">00</span><span className="text-sky-400 font-mono font-bold">00</span> = rojo puro.</p>
                </motion.div>
              </div>

              {/* Tools */}
              <div className="col-span-7 space-y-3">
                <motion.p {...m(0.15)} className="text-xs text-white/30 uppercase tracking-wider font-bold mb-3 pl-1">Herramientas para tu paleta</motion.p>
                {TOOLS.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div key={i} {...m(0.25 + i * 0.08)} {...(isExporting ? {} : { whileHover: { borderColor: tool.color.replace(')', ' / 0.3)'), scale: 1.01 } })}
                      className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${tool.color.replace(')', ' / 0.1)')}`, border: `1px solid ${tool.color.replace(')', ' / 0.25)')}` }}>
                          <Icon className="w-4 h-4" style={{ color: tool.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{tool.name}</span>
                            <span className="text-[9px] font-mono text-white/20">{tool.url}</span>
                          </div>
                          <p className="text-xs text-white/40 mt-0.5">{tool.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <motion.div {...m(0.55)} className="p-3 rounded-xl border border-amber-500/15 bg-amber-500/[0.03]">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-300/60"><span className="font-bold text-amber-300/80">Regla de oro:</span> Usa máximo 3-5 colores por proyecto. Un primario, un acento y 2-3 neutros.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="tipografia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-12 gap-6">
              {/* Font types */}
              <div className="col-span-7 space-y-3">
                <motion.p {...m(0.15)} className="text-xs text-white/30 uppercase tracking-wider font-bold mb-3 pl-1">Familias Tipográficas</motion.p>
                {FONT_TYPES.map((ft, i) => (
                  <motion.div key={i} {...m(0.2 + i * 0.08)}
                    className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-2xl font-bold text-white ${ft.style}`}>{ft.type}</span>
                      <span className="text-[10px] text-white/20 font-mono">{ft.example}</span>
                    </div>
                    <p className="text-xs text-white/40">{ft.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Tips */}
              <div className="col-span-5 space-y-3">
                <motion.p {...m(0.15)} className="text-xs text-white/30 uppercase tracking-wider font-bold mb-3 pl-1">Consejos Clave</motion.p>
                {[
                  { tip: 'Usa solo 1 o 2 familias por proyecto', icon: '🎯' },
                  { tip: 'Prefiere formato WOFF2 para la web (30% más ligero)', icon: '⚡' },
                  { tip: 'Revisa que tenga acentos, ñ y caracteres latinos', icon: '🔤' },
                  { tip: 'Prueba en distintos dispositivos y tamaños', icon: '📱' },
                ].map((t, i) => (
                  <motion.div key={i} {...m(0.25 + i * 0.06)}
                    className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center gap-3">
                    <span className="text-base">{t.icon}</span>
                    <span className="text-xs text-white/50">{t.tip}</span>
                  </motion.div>
                ))}
                <motion.div {...m(0.55)} className="p-4 rounded-xl border border-violet-500/15 bg-violet-500/[0.03]">
                  <div className="flex items-start gap-2">
                    <Type className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-violet-300/80 mb-1">Fontjoy — IA para tipografía</p>
                      <p className="text-[11px] text-violet-300/60 leading-relaxed">Genera combinaciones de fuentes con redes neuronales. Bloquea la que te gusta y genera variaciones para el resto.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" />
    </div>
  );
}
