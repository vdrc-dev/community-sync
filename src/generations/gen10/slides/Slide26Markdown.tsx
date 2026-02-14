import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const rawMarkdown = `# Título (H1)

## Subtítulo (H2)

**Negrita**

- Lista`;

export function Slide26Markdown() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(26);
  
  // Database-driven content
  const regionalConfig = content.regionalConfig as { numeros?: string; formulas?: string; docs?: string } | undefined;
  const markdownBenefit = (content.markdownBenefit as string) || 'PERMITE COPIAR Y PEGAR RESPUESTAS DE IA DIRECTO A NOTION, DOCS O WORD SIN ROMPER EL FORMATO.';
  const productivityHack = (content.productivityHack as string) || 'Entrégame la respuesta en formato Markdown renderizado';

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex flex-col font-sans px-12 py-8 selection:bg-violet-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-violet-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-cyan-500/[0.05] rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Title */}
      <motion.div {...getMotionProps(0.1)} className="relative z-20 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full backdrop-blur-sm">
            <Code2 className="w-4 h-4 text-violet-400" />
            <span className="text-violet-400 text-sm font-semibold tracking-wide uppercase">Formato</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
          MARKDOWN: <span className="text-violet-400">EL LENGUAJE UNIVERSAL</span>
        </h1>
      </motion.div>

      {/* Main Content */}
      <motion.div {...getMotionProps(0.2)} className="flex-1 flex items-center justify-center relative z-10">
        <div className="max-w-5xl w-full">
          {/* Code comparison card */}
          <div className="bg-white/[0.02] rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl shadow-violet-500/10">
            {/* Header row */}
            <div className="grid grid-cols-2 border-b border-white/10">
              <div className="px-6 py-3 bg-violet-500/10">
                <span className="text-violet-400 font-bold">RAW MARKDOWN</span>
                <span className="text-white/40 text-sm float-right font-mono">código</span>
              </div>
              <div className="px-6 py-3 bg-cyan-500/10 border-l border-white/10">
                <span className="text-cyan-400 font-bold">RENDERED OUTPUT</span>
                <span className="text-white/40 text-sm float-right">resultado</span>
              </div>
            </div>
            
            {/* Content row */}
            <div className="grid grid-cols-2 min-h-[260px]">
              {/* Raw markdown side */}
              <div className="p-6 font-mono text-sm bg-[#0a0f14]">
                <div className="text-gray-300 space-y-1">
                  {rawMarkdown.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-white/20 w-6 flex-shrink-0 select-none">{i + 1}</span>
                      <span className={
                        line.startsWith('#') ? 'text-violet-400' : 
                        line.startsWith('**') ? 'text-purple-400' : 
                        line.startsWith('-') ? 'text-cyan-400' : 'text-gray-400'
                      }>
                        {line || ' '}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Rendered output side */}
              <div className="p-6 bg-white border-l border-white/10">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900">Título (H1)</h1>
                  <h2 className="text-2xl font-bold text-gray-800">Subtítulo (H2)</h2>
                  <p className="font-bold text-gray-800">Negrita</p>
                  <ul className="list-disc list-inside text-gray-800">
                    <li>Lista</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 flex items-center justify-between gap-6">
            {/* Explanation */}
            <motion.div {...getMotionProps(0.3)} className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-5 border border-violet-500/20 flex-1">
              <p className="text-white/80 text-lg">
                {markdownBenefit}
              </p>
            </motion.div>
            
            {/* Productivity Hack */}
            <motion.div {...getMotionProps(0.4)} className="bg-amber-500/[0.08] border border-amber-500/30 rounded-xl p-4 max-w-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-bold">Productivity Hack</span>
              </div>
              <p className="text-white/70 text-sm font-mono">
                Prompt: "{productivityHack}"
              </p>
            </motion.div>
          </div>
          
          {/* Regional Config */}
          {regionalConfig && (
            <motion.div {...getMotionProps(0.5)} className="mt-4 bg-cyan-500/[0.06] border border-cyan-500/20 rounded-xl p-4">
              <p className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">Configuración Regional Chile</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-white/40 text-xs">Números:</span>
                  <p className="text-white/80 text-sm font-mono">{regionalConfig.numeros}</p>
                </div>
                <div>
                  <span className="text-white/40 text-xs">Fórmulas:</span>
                  <p className="text-white/80 text-sm font-mono">{regionalConfig.formulas}</p>
                </div>
                <div>
                  <span className="text-white/40 text-xs">Documentos:</span>
                  <p className="text-white/80 text-sm">{regionalConfig.docs}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        26 / 29
      </div>
    </div>
  );
}
