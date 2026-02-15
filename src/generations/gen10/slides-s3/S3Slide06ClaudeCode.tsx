import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Globe, Terminal, FolderOpen, Plug, FileSpreadsheet, Figma, Music } from 'lucide-react';
import bgClaude from '@/assets/gen10-s3/bg-claude-code.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const DESKTOP_FEATURES = [
  { text: 'Archivos locales de gran tamaño', icon: FolderOpen },
  { text: 'Conectores MCP (Spotify, Figma, Excel)', icon: Plug },
  { text: 'Terminal integrada', icon: Terminal },
  { text: 'Skills personalizables', icon: FileSpreadsheet },
];

const WEB_LIMITATIONS = [
  'Límite de carga de archivos',
  'Sin acceso a sistema local',
  'Sin conectores MCP',
  'Sin terminal',
];

export function S3Slide06ClaudeCode() {
  const { isExporting } = useExportContext();
  const [showDesktop, setShowDesktop] = useState(true);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgClaude} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/50 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={280} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 mb-3">
            <Terminal className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-violet-400/80">Claude Code</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Tu Agente de <span className="text-violet-400">Escritorio</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">La IA que vive en tu computador — no en la nube</p>
        </motion.div>

        {/* Toggle */}
        <motion.div {...m(0.1)} className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl border border-white/[0.08] bg-white/[0.02] p-1 backdrop-blur-sm">
            <button onClick={() => setShowDesktop(true)}
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all"
              style={showDesktop ? { background: S3_ACCENT.violet.bg, color: S3_ACCENT.violet.text, border: `1px solid ${S3_ACCENT.violet.border}` } : { color: 'rgba(255,255,255,0.4)' }}>
              <Monitor className="w-4 h-4 inline mr-2" />Escritorio
            </button>
            <button onClick={() => setShowDesktop(false)}
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all"
              style={!showDesktop ? { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' } : { color: 'rgba(255,255,255,0.4)' }}>
              <Globe className="w-4 h-4 inline mr-2" />Web
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {/* Desktop card */}
          <motion.div
            {...m(0.2)}
            {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.violet.border, scale: 1.01 } })}
            className={`p-6 rounded-2xl border transition-all duration-300 ${showDesktop ? 'border-violet-500/20 bg-violet-500/[0.04]' : 'border-white/[0.04] bg-white/[0.01] opacity-50'}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-violet-400" />
              <span className="text-lg font-bold text-white">Claude Code Desktop</span>
              <motion.span className="relative overflow-hidden ml-auto text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: S3_ACCENT.violet.bg, color: S3_ACCENT.violet.text, border: `1px solid ${S3_ACCENT.violet.border}` }}>
                {!isExporting && (
                  <motion.span className="absolute inset-0" style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 60% 70% / 0.15) 50%, transparent 65%)' }}
                    animate={{ x: ['-150%', '250%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }} />
                )}
                <span className="relative z-10">Recomendado</span>
              </motion.span>
            </div>
            <div className="space-y-2.5">
              {DESKTOP_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-violet-500/10 bg-violet-500/[0.03]">
                    <Icon className="w-4 h-4 text-violet-400/70 shrink-0" />
                    <span className="text-sm text-white/60">{f.text}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[{ icon: Music, name: 'Spotify' }, { icon: Figma, name: 'Figma' }, { icon: FileSpreadsheet, name: 'Excel' }].map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={i}
                    {...(isExporting ? {} : { whileHover: { scale: 1.05, borderColor: 'hsl(263 50% 55% / 0.3)' } })}
                    className="p-2 rounded-lg border border-white/[0.06] bg-white/[0.02] text-center"
                  >
                    <Icon className="w-4 h-4 text-violet-400/50 mx-auto mb-1" />
                    <span className="text-[10px] text-white/40">{tool.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Web card */}
          <motion.div {...m(0.25)} className={`p-6 rounded-2xl border transition-all duration-300 ${!showDesktop ? 'border-white/[0.12] bg-white/[0.04]' : 'border-white/[0.04] bg-white/[0.01] opacity-50'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-white/40" />
              <span className="text-lg font-bold text-white">Claude Web</span>
              <span className="ml-auto text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/[0.08]">Básico</span>
            </div>
            <div className="space-y-2.5">
              {WEB_LIMITATIONS.map((l, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                  <div className="w-4 h-4 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                    <span className="text-[8px] text-white/20">✕</span>
                  </div>
                  <span className="text-sm text-white/30">{l}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg border border-white/[0.04] bg-white/[0.02]">
              <p className="text-xs text-white/25 leading-relaxed">Útil para consultas rápidas, pero limitado para workflows productivos.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <S3Footer sectionLabel="CLAUDE CODE" hue={263} />
    </div>
  );
}
