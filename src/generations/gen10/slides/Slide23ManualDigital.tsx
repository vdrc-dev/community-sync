import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Lightbulb } from 'lucide-react';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';

export function Slide23ManualDigital() {
  const m = useS1Motion();
  const content = useSlideContent(23);
  const goldenRules = content.goldenRules as Array<{ rule: string; desc: string }> | undefined;
  const regionalRules = content.regionalRules as Array<{ label: string; value: string }> | undefined;
  const platforms = content.platforms as string[] | undefined;
  const tip = (content.tip as string) || 'Guarda estas reglas en un archivo de texto o PDF llamado "Instrucciones_Base.txt" para cargarlo rápidamente en nuevos chats.';

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex items-center justify-center" radials={
      <>
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-violet-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-fuchsia-500/[0.05] rounded-full blur-[150px]" />
      </>
    }>
      <div className="relative z-10 max-w-4xl w-full px-5 sm:px-8">
        <motion.div {...m(0.1)}>
          <div className="bg-violet-500/10 backdrop-blur-sm rounded-t-2xl p-5 sm:p-6 border border-violet-500/30 border-b-0">
            <div className="flex items-center gap-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
                <FileText className="w-6 sm:w-7 h-6 sm:h-7 text-violet-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">TU "MANUAL DIGITAL" <span className="text-violet-400">(REGLAS DE ORO)</span></h1>
                <h2 className="text-base sm:text-lg font-bold text-white/60 mt-1">CONFIGURACIÓN BASE PARA CHILE Y LATAM</h2>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...m(0.15)}>
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-b-2xl p-5 sm:p-8 border border-violet-500/20 border-t-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-violet-400 font-bold text-sm uppercase tracking-wider mb-4">Configuración Regional</h3>
                <div className="space-y-3">
                  {(regionalRules || [
                    { label: 'Identidad', value: 'Tu nombre y rol profesional' },
                    { label: 'Ubicación', value: 'Chile, horario local' },
                    { label: 'Moneda', value: 'CLP o UF' },
                    { label: 'Separadores', value: 'Puntos para miles, Comas para decimales' },
                    { label: 'Fechas', value: 'DD/MM/AAAA' },
                  ]).map((rule, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                      <div><span className="text-violet-400 font-semibold text-sm">{rule.label}:</span><span className="text-white/60 text-sm ml-1">{rule.value}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-4">Reglas de Oro</h3>
                <div className="space-y-3">
                  {(goldenRules || [
                    { rule: 'Chain of Thought', desc: 'Razona paso a paso' },
                    { rule: 'Honestidad radical', desc: 'Nunca inventes información' },
                    { rule: 'Formato Markdown', desc: 'Obligatorio para outputs' },
                  ]).map((item, i) => (
                    <div key={i} className="p-3 bg-amber-500/[0.06] border border-amber-500/20 rounded-lg">
                      <span className="text-amber-400 font-bold text-sm">{item.rule}</span>
                      <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {platforms && (
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-white/40 text-xs mb-2">Plataformas compatibles:</p>
                <div className="flex gap-2 flex-wrap">{platforms.map((p, i) => <span key={i} className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-medium">{p}</span>)}</div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div {...m(0.5)} className="mt-6">
          <div className="bg-amber-500/[0.08] border border-amber-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0"><Lightbulb className="w-5 h-5 text-amber-400" /></div>
              <div><span className="text-amber-400 font-bold">Tip: </span><span className="text-white/70">{tip}</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </S1Shell>
  );
}
