import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Palette, FileSpreadsheet, FileText, Search, Download, ChevronDown } from 'lucide-react';
import bgClaude from '@/assets/gen10-s3/bg-claude-code.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const SKILLS = [
  { name: 'Brand Theme', desc: 'Tu identidad visual precargada. Claude aplica tu paleta y tipografía automáticamente.', icon: Palette, color: 'hsl(330 70% 60%)', tip: 'Toma el skill por defecto y "perillalo" a tu marca.' },
  { name: 'Excel Controller', desc: 'Edita hojas de cálculo y PowerPoints existentes. Lee, modifica y genera reportes.', icon: FileSpreadsheet, color: 'hsl(150 60% 50%)', tip: 'Solo disponible en Claude Code Desktop.' },
  { name: 'PDF Editor', desc: 'Lee, extrae y transforma documentos PDF. Genera nuevos desde datos estructurados.', icon: FileText, color: 'hsl(38 90% 55%)', tip: 'Combina con Canva para editar diseños de IA.' },
  { name: 'Web Researcher', desc: 'Busca datasets en Kaggle, planos reguladores, o cualquier info pública actualizada.', icon: Search, color: 'hsl(185 70% 50%)', tip: 'Convierte búsquedas en tareas recurrentes.' },
];

export function S3Slide07Skills() {
  const { isExporting } = useExportContext();
  const [expandedSkill, setExpandedSkill] = useState<number | null>(0);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgClaude} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/50 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={280} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3" style={{ borderColor: S3_ACCENT.violet.border, backgroundColor: S3_ACCENT.violet.bg }}>
            <Zap className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Claude Code</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Skills: <span className="text-violet-400">Workflows Precargados</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Paquetes de instrucciones que multiplican la potencia de Claude Code</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            const isExpanded = expandedSkill === i;
            return (
              <motion.button key={i} {...m(0.15 + i * 0.08)}
                {...(isExporting ? {} : { whileHover: { borderColor: skill.color.replace(')', ' / 0.2)'), scale: 1.01 } })}
                onClick={() => setExpandedSkill(isExpanded ? null : i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${isExpanded ? 'bg-white/[0.04] border-white/[0.12]' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
                    background: `${skill.color.replace(')', ' / 0.1)')}`,
                    border: `1px solid ${skill.color.replace(')', isExpanded ? ' / 0.5)' : ' / 0.25)')}`,
                    boxShadow: isExpanded ? `0 0 15px ${skill.color.replace(')', ' / 0.2)')}` : 'none',
                    transition: 'all 0.3s ease',
                  }}>
                    <Icon className="w-4 h-4" style={{ color: skill.color }} />
                  </div>
                  <span className="text-base font-bold text-white flex-1">{skill.name}</span>
                  <ChevronDown className={`w-4 h-4 text-white/20 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-2">{skill.desc}</p>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      className="mt-3 p-3 rounded-lg border border-amber-500/15 bg-amber-500/[0.04]">
                      <div className="flex items-start gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-300/60 leading-relaxed">{skill.tip}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <motion.div {...m(0.5)} className="mt-6 p-4 rounded-xl border border-violet-500/15 bg-violet-500/[0.03] max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-violet-400" />
            <div>
              <p className="text-sm font-bold text-white">Primer paso al instalar Claude Code:</p>
              <p className="text-xs text-violet-300/60">Pídele que busque e instale los skills de Anthropic desde el repositorio público de GitHub.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CLAUDE CODE" hue={263} />
    </div>
  );
}
