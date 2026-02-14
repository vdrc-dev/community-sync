import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { Sparkles, Heart, Database, Code, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { SLIDES_DATA } from '../config';

const slideData = SLIDES_DATA[10];
const premiumEase = [0.22, 1, 0.36, 1];

const decisions = [
  { question: '¿Diseñar UI?', answer: 'Gemini', icon: Sparkles },
  { question: '¿Construir app?', answer: 'Lovable', icon: Heart },
  { question: '¿Guardar datos?', answer: 'Supabase', icon: Database },
  { question: '¿Editar código?', answer: 'Cursor', icon: Code },
];

const goldenRules = [
  'Empieza siempre con Lovable',
  'Supabase para usuarios/datos',
  'Cursor solo si es necesario',
];

export function Slide11WhenToUse() {
  const { isExporting } = useExportContext();

  const getMotionProps = (delay: number) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.4, ease: premiumEase },
        };

  return (
    <ConsultingSlideLayout
      slideNumber={slideData.id}
      sectionNumber={slideData.sectionNumber}
      sectionTitle={slideData.section}
      title={slideData.title}
      storyline={slideData.storyline}
    >
      <div className="h-full flex flex-col gap-5 min-h-0">
        {/* Decision cards */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 min-h-0">
          {decisions.map((d, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-2xl flex flex-col items-center text-center"
              style={{
                backgroundColor: 'hsl(220 15% 7%)',
                border: '2px solid hsl(0 0% 100% / 0.08)',
              }}
              {...getMotionProps(0.1 + i * 0.05)}
            >
              {/* Question */}
              <p className="text-lg font-bold text-muted-foreground mb-4">{d.question}</p>

              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'hsl(220 20% 10%)' }}
              >
                <d.icon className="w-9 h-9 text-slate-300" />
              </div>
              
              {/* Answer */}
              <span className="text-2xl font-black text-foreground">{d.answer}</span>
            </motion.div>
          ))}
        </div>

        {/* Flow */}
        <motion.div
          className="p-5 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(220 15% 7%)',
            border: '2px solid hsl(0 0% 100% / 0.08)',
          }}
          {...getMotionProps(0.35)}
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {decisions.map((d, i) => (
              <div key={d.answer} className="flex items-center gap-4">
                <span className="text-xl font-bold text-muted-foreground">{d.answer}</span>
                {i < decisions.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Golden rules */}
        <motion.div
          className="p-5 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(160 30% 8%)',
            border: '2px solid hsl(160 40% 25% / 0.4)',
          }}
          {...getMotionProps(0.4)}
        >
          <h4 className="font-black text-xl text-emerald-400 mb-4">Reglas de oro</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goldenRules.map((rule, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                <span className="text-xl text-muted-foreground">{rule}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          className="p-5 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(45 50% 10% / 0.5)',
            borderLeft: '4px solid hsl(45 70% 50%)',
          }}
          {...getMotionProps(0.45)}
        >
          <div className="flex items-start gap-4">
            <BookOpen className="w-7 h-7 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xl text-muted-foreground">
              No memorices. Con práctica, sabrás intuitivamente qué usar. Lo importante: 
              <span className="text-amber-400 font-bold"> empieza con Lovable</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </ConsultingSlideLayout>
  );
}
