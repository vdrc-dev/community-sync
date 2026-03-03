import { motion } from 'framer-motion';
import { Axe, Quote, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import { useExportContext } from '@/contexts/ExportContext';
import sharpenSawImg from '@/assets/gen11-sharpen-saw.png';

export function G11S1SlideSharpenStory() {
  const m = useG11Motion();
  const { isExporting } = useExportContext();

  return (
    <G11Shell className="flex items-stretch"
      radials={<>
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${sharpenSawImg})` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(24,28,27,0.85), rgba(24,28,27,0.75), rgba(24,28,27,0.90))' }} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[150px]" style={{ background: 'rgba(61,153,112,0.10)' }} />
      </>}>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 flex flex-col h-full w-full px-8 sm:px-16 py-10">
        {/* Header */}
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4"
            style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
            <Axe className="w-4 h-4" style={{ color: G11.emerald.text }} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: G11.emerald.text }}>Filosofía</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">
            Afilar la Sierra:
          </h2>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tight uppercase leading-none" style={{ color: VDRC_GREEN }}>
            La Historia
            {!isExporting && (
              <motion.span className="inline-block ml-3 text-4xl"
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                🪓
              </motion.span>
            )}
            {isExporting && <span className="inline-block ml-3 text-4xl">🪓</span>}
          </h2>
        </motion.div>

        {/* Before / After cards */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6">
          <motion.div {...m(0.15)} className="max-w-md w-full">
            <div className="p-5 rounded-xl border relative overflow-hidden"
              style={{ borderColor: G11.rose.border, background: `linear-gradient(135deg, ${G11.rose.bg}, rgba(0,0,0,0.4))` }}>
              <Quote className="w-5 h-5 mb-2" style={{ color: G11.rose.text }} />
              <p className="text-white/90 text-lg italic leading-relaxed">
                "¡No tengo tiempo para afilar la sierra! ¡Estoy demasiado ocupado aserrando!"
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: G11.rose.dot }} />
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: G11.rose.text }}>El Problema</span>
              </div>
            </div>
          </motion.div>

          <motion.div {...m(0.25)} className="flex items-center">
            <ArrowRight className="w-8 h-8" style={{ color: G11.emerald.text }} />
          </motion.div>

          <motion.div {...m(0.2)} className="max-w-md w-full">
            <div className="p-5 rounded-xl border relative overflow-hidden"
              style={{ borderColor: G11.emerald.border, background: `linear-gradient(135deg, ${G11.emerald.bg}, rgba(0,0,0,0.4))` }}>
              <Sparkles className="w-5 h-5 mb-2" style={{ color: G11.emerald.text }} />
              <p className="text-lg font-medium leading-relaxed" style={{ color: G11.emerald.text }}>
                "Toma un descanso y afila la sierra."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: G11.emerald.dot }} />
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: G11.emerald.text }}>La Solución</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div {...m(0.35)} className="mt-6">
          <div className="p-5 rounded-xl border text-center"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-base sm:text-lg font-black tracking-wide uppercase"
              style={{ background: `linear-gradient(135deg, ${G11.emerald.text}, ${G11.cyan.text})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Trabajar sin renovar capacidades conduce al agotamiento. Afilar la sierra es invertir en ti mismo.
            </p>
            <div className="mt-3 pt-3 border-t flex items-center justify-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <BookOpen className="w-4 h-4 text-white/30" />
              <span className="text-white/40 text-sm">Stephen Covey — "Los 7 hábitos de la gente altamente efectiva"</span>
            </div>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
