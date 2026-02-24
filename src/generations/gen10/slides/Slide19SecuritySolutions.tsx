import React from 'react';
import { motion } from 'framer-motion';
import { KeyRound, RefreshCw, Smartphone, Lightbulb, ShieldCheck, Shield, Download } from 'lucide-react';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';

const SOLUTIONS = [
  { icon: KeyRound, title: 'CONTRASEÑAS ÚNICAS', desc: 'Utiliza una contraseña diferente para cada servicio', color: 'rose' as const },
  { icon: RefreshCw, title: 'CAMBIOS PERIÓDICOS', desc: 'Actualiza regularmente tus claves más sensibles', color: 'amber' as const },
  { icon: Smartphone, title: 'AUTENTICACIÓN 2FA', desc: 'Activa 2FA en todos los servicios importantes', color: 'emerald' as const },
];
const COLOR_MAP = {
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', glow: 'shadow-rose-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
} as const;

export function Slide19SecuritySolutions() {
  const m = useS1Motion();
  const content = useSlideContent(19);
  const bitwarden = content.bitwarden as { traits?: Array<{ name: string; desc: string }> } | undefined;
  const migrationProtocol = content.migrationProtocol as Array<{ step: number; action: string; warning?: boolean }> | undefined;
  const practicalTip = (content.practicalTip as string) || 'Centraliza y sincroniza tus contraseñas para acceder desde cualquier dispositivo.';

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col" radials={
      <>
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-rose-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-emerald-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
      </>
    }>
      <div className="relative z-10 flex flex-col h-full px-5 sm:px-12 py-8">
        <motion.header {...m(0.1)} className="mb-8">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm w-fit mb-3">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">Prácticas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Soluciones Prácticas de{' '}
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Seguridad</span>
          </h1>
        </motion.header>

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl">
            {SOLUTIONS.map((solution, i) => {
              const colors = COLOR_MAP[solution.color];
              return (
                <motion.div key={solution.title} {...m(0.2 + i * 0.1)} className={`flex flex-col items-center text-center p-6 rounded-2xl ${colors.bg} border ${colors.border} backdrop-blur-sm shadow-xl ${colors.glow}`}>
                  <div className={`w-20 h-20 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-5 shadow-lg ${colors.glow}`}>
                    <solution.icon className={`w-10 h-10 ${colors.text}`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`${colors.text} font-black text-lg mb-3 tracking-wide`}>{solution.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{solution.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div {...m(0.5)} className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {bitwarden?.traits && (
              <div className="bg-blue-600/[0.06] border border-blue-600/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5 text-blue-400" /><span className="text-blue-400 font-bold text-sm uppercase">¿Por qué Bitwarden?</span></div>
                <div className="space-y-2">
                  {bitwarden.traits.map((trait, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      <div><span className="text-white font-semibold text-sm">{trait.name}:</span><span className="text-white/60 text-sm ml-1">{trait.desc}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {migrationProtocol && (
              <div className="bg-amber-500/[0.06] border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3"><Download className="w-5 h-5 text-amber-400" /><span className="text-amber-400 font-bold text-sm uppercase">Protocolo de Migración</span></div>
                <div className="space-y-2">
                  {migrationProtocol.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${item.warning ? 'bg-rose-500/30 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>{item.step}</span>
                      <span className={`text-sm ${item.warning ? 'text-rose-400 font-bold' : 'text-white/70'}`}>{item.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 bg-emerald-500/[0.06] border border-emerald-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0"><Lightbulb className="w-4 h-4 text-emerald-400" /></div>
              <p className="text-white/70 text-sm">{practicalTip}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </S1Shell>
  );
}
