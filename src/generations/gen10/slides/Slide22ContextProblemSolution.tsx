import React from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, Sparkles, AlertTriangle, Zap, Globe } from 'lucide-react';
import { S1Shell, useS1Motion } from './shared';

const platforms = [
  { name: 'ChatGPT', desc: 'Usa "Proyectos" (Projects)', color: 'bg-emerald-600', label: 'GPT' },
  { name: 'Claude', desc: 'Usa "Projects"', color: 'bg-amber-600', label: 'C' },
  { name: 'Gemini', desc: 'Usa "Gems" (Gemas)', color: 'bg-blue-600', label: 'G' },
];

export function Slide22ContextProblemSolution() {
  const m = useS1Motion();

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col" radials={
      <>
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-rose-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-emerald-500/[0.06] rounded-full blur-[150px]" />
      </>
    }>
      <div className="relative z-10 flex flex-col h-full px-5 sm:px-12 py-8">
        <motion.header {...m(0.1)} className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2">MÁS IMPORTANTE QUE EL PROMPTING:</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DATOS SOBRE RETÓRICA</h2>
        </motion.header>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4">
          <motion.div {...m(0.2)} className="flex flex-col">
            <div className="bg-rose-500/10 rounded-t-2xl p-4 border border-rose-500/30 border-b-0">
              <div className="flex items-center gap-2"><div className="w-1.5 h-7 bg-rose-500 rounded-full" /><h3 className="text-xl font-black text-rose-400 tracking-wider">EL PROBLEMA</h3></div>
            </div>
            <div className="flex-1 bg-white/[0.02] rounded-b-2xl p-5 border border-rose-500/30 border-t-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-rose-400" /></div>
                <span className="text-white font-bold">Tabula Rasa</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">Los modelos vienen "en blanco", tienen <span className="text-rose-400 font-semibold">amnesia entre chats</span> y asumen por defecto un formato estándar.</p>
              <div className="mt-5 flex justify-center">
                <div className="relative"><Brain className="w-16 h-16 text-rose-400/40" strokeWidth={1} /><span className="absolute -top-1 -left-1 text-rose-400 text-xl font-bold">?</span><span className="absolute -bottom-1 -right-1 text-rose-400 text-lg font-bold">?</span></div>
              </div>
            </div>
          </motion.div>

          <motion.div {...m(0.3)} className="flex flex-col">
            <div className="bg-violet-500/10 rounded-t-2xl p-4 border border-violet-500/30 border-b-0">
              <div className="flex items-center gap-2"><div className="w-1.5 h-7 bg-violet-500 rounded-full" /><h3 className="text-xl font-black text-violet-400 tracking-wider">LA SOLUCIÓN</h3></div>
            </div>
            <div className="flex-1 bg-white/[0.02] rounded-b-2xl p-5 border border-violet-500/30 border-t-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center"><Zap className="w-6 h-6 text-violet-400" /></div>
                <span className="text-white font-bold">Alimentar, no pedir</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">Cargar tu <span className="text-violet-400 font-semibold">"memoria estática"</span> (Manuales, PDFs, Guías) en el cerebro de la IA.</p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="flex flex-col gap-1.5"><FileText className="w-8 h-8 text-white/30" /><FileText className="w-8 h-8 text-white/30" /></div>
                <Sparkles className="w-5 h-5 text-violet-400" />
                <Brain className="w-14 h-14 text-violet-400" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          <motion.div {...m(0.4)} className="flex flex-col">
            <div className="bg-emerald-500/10 rounded-t-2xl p-4 border border-emerald-500/30 border-b-0">
              <div className="flex items-center gap-2"><div className="w-1.5 h-7 bg-emerald-500 rounded-full" /><h3 className="text-xl font-black text-emerald-400 tracking-wider">APLICACIÓN</h3></div>
            </div>
            <div className="flex-1 bg-white/[0.02] rounded-b-2xl p-5 border border-emerald-500/30 border-t-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center"><Globe className="w-6 h-6 text-emerald-400" /></div>
                <span className="text-white font-bold">Universal</span>
              </div>
              <div className="space-y-3">
                {platforms.map((platform, i) => (
                  <motion.div key={platform.name} {...m(0.5 + i * 0.08)} className="flex items-center gap-3 p-2 bg-white/[0.03] rounded-lg border border-white/5">
                    <div className={`w-9 h-9 rounded-lg ${platform.color} flex items-center justify-center`}><span className="text-white font-bold text-xs">{platform.label}</span></div>
                    <div><p className="text-white font-semibold text-sm">{platform.name}</p><p className="text-white/50 text-xs">{platform.desc}</p></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </S1Shell>
  );
}
