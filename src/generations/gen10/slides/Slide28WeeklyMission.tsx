import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, FileText, Brain, CheckCircle, Target, LucideIcon } from 'lucide-react';
import { useSlideContent, MissionItem } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';

const ICON_MAP: Record<string, LucideIcon> = { Mail, Shield, FileText, Brain };
const COLOR_MAP = {
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', accent: 'bg-amber-500', glow: 'shadow-amber-500/20' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', accent: 'bg-rose-500', glow: 'shadow-rose-500/20' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', accent: 'bg-violet-500', glow: 'shadow-violet-500/20' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', accent: 'bg-cyan-500', glow: 'shadow-cyan-500/20' },
} as const;

const DEFAULT_MISSIONS: MissionItem[] = [
  { num: 1, title: 'MANTENER INBOX CERO', icon: 'Mail', tasks: ['Mantén tu bandeja vacía durante 3 días consecutivos.', 'Aplica la regla: Si no requiere acción hoy, se Archiva.'], color: 'amber' },
  { num: 2, title: 'BLINDAJE DE SEGURIDAD', icon: 'Shield', tasks: ['Instala y configura Bitwarden (móvil y escritorio).', 'Cambia tus 3 contraseñas más críticas.'], color: 'rose' },
  { num: 3, title: 'TU MANUAL DE INSTRUCCIONES', icon: 'FileText', tasks: ['Redacta tu Contexto y Formato.', 'Tráelo listo para copiar y pegar la próxima clase.'], color: 'violet' },
  { num: 4, title: 'ACCESO A LA INTELIGENCIA', icon: 'Brain', tasks: ['Crea cuentas gratuitas en Claude.ai y Perplexity.ai.', 'Las usaremos para análisis de datos en la Sesión 2.'], color: 'cyan' },
];

export function Slide28WeeklyMission() {
  const m = useS1Motion();
  const content = useSlideContent(28);
  const missions = content.missions || DEFAULT_MISSIONS;
  const headerText = content.headerText || 'El objetivo no es la perfección inmediata, es la consistencia.';

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col" radials={
      <>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/[0.05] rounded-full blur-[150px]" />
      </>
    }>
      <div className="relative z-10 flex flex-col h-full px-5 sm:px-12 py-8">
        <motion.div {...m(0.1)} className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm mb-3">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Misión</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            MISIÓN SEMANAL: <span className="text-emerald-400">PREPARANDO EL TERRENO</span>
          </h1>
          <p className="text-white/50 text-lg mt-2">{headerText.replace('consistencia', '').trim()} <span className="text-emerald-400/80 font-semibold">consistencia</span>.</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {missions.map((mission, i) => {
            const colors = COLOR_MAP[mission.color as keyof typeof COLOR_MAP] || COLOR_MAP.amber;
            const Icon = ICON_MAP[mission.icon] || Mail;
            return (
              <motion.div key={mission.num} {...m(0.2 + i * 0.08)} className={`relative ${colors.bg} backdrop-blur-sm rounded-2xl p-5 border ${colors.border} shadow-xl ${colors.glow}`}>
                <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full ${colors.accent} flex items-center justify-center shadow-lg`}><span className="text-white font-black text-lg">{mission.num}</span></div>
                <div className="flex items-center gap-3 mb-4 ml-5"><h3 className={`${colors.text} font-black text-lg tracking-wide`}>{mission.title}</h3></div>
                <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}><Icon className={`w-7 h-7 ${colors.text}`} strokeWidth={1.5} /></div>
                  <div className="space-y-2 flex-1">
                    {mission.tasks.map((task, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0 opacity-60`} />
                        <p className="text-white/70 text-sm leading-relaxed">{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </S1Shell>
  );
}
