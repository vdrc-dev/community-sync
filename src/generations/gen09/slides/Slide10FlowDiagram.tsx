import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { Sparkles, Heart, Database, GitBranch, Code, ArrowRight, Zap, Clock } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { SLIDES_DATA } from '../config';
import { cn } from '@/lib/utils';

const slideData = SLIDES_DATA[9];
const premiumEase = [0.22, 1, 0.36, 1];

const mainModules = [
  {
    name: 'GEMINI',
    icon: Sparkles,
    subtitle: 'Arquitectura Visual',
    time: '~10 min',
    color: '#3b82f6',
    rgb: '59,130,246',
  },
  {
    name: 'LOVABLE',
    icon: Heart,
    subtitle: 'Construcción IA',
    time: '~30 min',
    color: '#ec4899',
    rgb: '236,72,153',
    isPrimary: true,
  },
  {
    name: 'SUPABASE',
    icon: Database,
    subtitle: 'Base de Datos',
    time: '~15 min',
    color: '#22c55e',
    rgb: '34,197,94',
  },
  {
    name: 'GITHUB',
    icon: GitBranch,
    subtitle: 'Versionado',
    time: '~5 min',
    color: '#a855f7',
    rgb: '168,85,247',
  },
];

export function Slide10FlowDiagram() {
  const { isExporting } = useExportContext();

  const getMotionProps = (delay: number) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 15 },
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
      {/* Circuit Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.05,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(139, 92, 246, 0.2) 60px, rgba(139, 92, 246, 0.2) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(139, 92, 246, 0.2) 60px, rgba(139, 92, 246, 0.2) 61px)
          `,
        }}
      />

      <div className="h-full flex flex-col gap-3 min-h-0">
        {/* Main Pipeline Container */}
        <motion.div
          className="flex-1 p-5 rounded-2xl relative overflow-hidden min-h-0 flex flex-col"
          style={{
            backgroundColor: 'hsl(220 20% 6%)',
            border: '2px solid hsl(0 0% 100% / 0.08)',
          }}
          {...getMotionProps(0.1)}
        >
          {/* Fast Track Bypass - Clear visual */}
          <motion.div
            className="flex items-center gap-2 mb-3"
            {...getMotionProps(0.15)}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(236, 72, 153, 0.15))',
                border: '1px solid rgba(236, 72, 153, 0.4)',
              }}
            >
              <Zap className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-semibold text-pink-400">
                Ruta Rápida: Puedes saltar Gemini → ir directo a Lovable
              </span>
            </div>
          </motion.div>

          {/* Horizontal Module Flow - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2">
              {mainModules.map((module, index) => (
                <div key={module.name} className="flex items-center">
                  {/* Module Card */}
                  <motion.div
                    className={cn(
                      'relative rounded-2xl backdrop-blur-sm flex flex-col items-center text-center transition-all',
                      module.isPrimary ? 'p-5 w-[170px]' : 'p-4 w-[145px]'
                    )}
                    style={{
                      background: `rgba(${module.rgb}, 0.1)`,
                      border: `2px solid ${module.color}`,
                      boxShadow: `0 0 ${module.isPrimary ? '35px' : '25px'} rgba(${module.rgb}, ${module.isPrimary ? '0.35' : '0.25'})`,
                    }}
                    {...getMotionProps(0.2 + index * 0.08)}
                    {...(isExporting ? {} : {
                      whileHover: { 
                        y: -5, 
                        boxShadow: `0 0 50px rgba(${module.rgb}, 0.5)`,
                      },
                    })}
                  >
                    {/* Time badge */}
                    <span
                      className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{
                        background: 'rgba(0,0,0,0.7)',
                        color: module.color,
                        border: `1px solid ${module.color}40`,
                      }}
                    >
                      {module.time}
                    </span>

                    <module.icon
                      className={cn('mb-2', module.isPrimary ? 'w-10 h-10' : 'w-8 h-8')}
                      style={{ color: module.color }}
                    />
                    <h3
                      className={cn(
                        'font-black tracking-wider',
                        module.isPrimary ? 'text-lg' : 'text-base'
                      )}
                      style={{ color: module.color }}
                    >
                      {module.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{module.subtitle}</p>
                  </motion.div>

                  {/* Arrow Connector */}
                  {index < mainModules.length - 1 && (
                    <motion.div
                      className="mx-1.5"
                      {...(isExporting ? {} : {
                        animate: { x: [0, 4, 0] },
                        transition: { duration: 1.2, repeat: Infinity, delay: index * 0.15 },
                      })}
                    >
                      <ArrowRight
                        className="w-5 h-5"
                        style={{
                          color: mainModules[index + 1].color,
                          filter: isExporting ? 'none' : `drop-shadow(0 0 6px ${mainModules[index + 1].color})`,
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Dotted Arrow to Cursor */}
              <motion.div
                className="mx-1.5 flex items-center"
                {...(isExporting ? {} : {
                  animate: { opacity: [0.5, 1, 0.5] },
                  transition: { duration: 2, repeat: Infinity },
                })}
              >
                <div className="w-8 border-t-2 border-dashed border-orange-500/50" />
                <ArrowRight
                  className="w-4 h-4 -ml-1"
                  style={{
                    color: '#f97316',
                    opacity: 0.6,
                  }}
                />
              </motion.div>

              {/* Cursor - Optional */}
              <motion.div
                className="relative"
                {...getMotionProps(0.55)}
              >
                {/* Optional Badge */}
                <span
                  className="absolute -top-2.5 right-1 px-2 py-0.5 rounded-full text-[9px] font-bold z-20"
                  style={{
                    background: 'rgba(249, 115, 22, 0.2)',
                    border: '1px solid rgba(249, 115, 22, 0.5)',
                    color: '#f97316',
                  }}
                >
                  OPCIONAL
                </span>

                <motion.div
                  className="p-3 w-[125px] rounded-2xl backdrop-blur-sm flex flex-col items-center text-center"
                  style={{
                    background: 'rgba(249, 115, 22, 0.08)',
                    border: '2px dashed rgba(249, 115, 22, 0.4)',
                    boxShadow: '0 0 15px rgba(249, 115, 22, 0.15)',
                    opacity: 0.75,
                  }}
                  {...(isExporting ? {} : {
                    whileHover: {
                      opacity: 1,
                      boxShadow: '0 0 35px rgba(249, 115, 22, 0.35)',
                    },
                  })}
                >
                  <Code className="w-6 h-6 mb-1.5" style={{ color: '#f97316' }} />
                  <h3 className="text-sm font-black tracking-wider" style={{ color: '#f97316' }}>
                    CURSOR
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Ajustes Pro</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer: Timer prominente */}
        <motion.div
          className="p-5 rounded-2xl flex items-center justify-center gap-8 shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(6, 78, 59, 0.15))',
            border: '3px solid #22c55e',
            boxShadow: isExporting ? '0 0 25px rgba(34, 197, 94, 0.3)' : '0 0 40px rgba(34, 197, 94, 0.35)',
          }}
          {...getMotionProps(0.6)}
          {...(isExporting ? {} : {
            animate: {
              boxShadow: ['0 0 30px rgba(34, 197, 94, 0.3)', '0 0 55px rgba(34, 197, 94, 0.5)'],
            },
            transition: { duration: 2.5, repeat: Infinity, repeatType: 'reverse' as const },
          })}
        >
          <div className="flex items-center gap-3">
            <Clock className="w-10 h-10 text-emerald-400" />
            <p
              className="text-4xl font-black text-emerald-400"
              style={{
                textShadow: isExporting ? 'none' : '0 0 25px rgba(34, 197, 94, 0.7)',
              }}
            >
              ~60-90 MINUTOS
            </p>
          </div>
          <div className="h-10 w-px bg-emerald-500/30" />
          <p className="text-xl text-slate-300">
            De <span className="font-bold text-white">idea abstracta</span> a{' '}
            <span className="font-bold text-emerald-400">app publicada</span>
          </p>
        </motion.div>
      </div>
    </ConsultingSlideLayout>
  );
}
