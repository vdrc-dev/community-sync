import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { Plus, Eye, Pencil, Trash2, Database, Table2, Lightbulb } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { SLIDES_DATA } from '../config';

const slideData = SLIDES_DATA[4];
const premiumEase = [0.22, 1, 0.36, 1];

const crudOps = [
  { 
    letter: 'C', 
    name: 'Create', 
    spanish: 'Crear', 
    icon: Plus, 
    example: 'Registrar usuario',
    color: 'hsl(160 70% 45%)',
    bgGradient: 'linear-gradient(135deg, hsl(160 50% 12%) 0%, hsl(160 40% 6%) 100%)',
    glowColor: 'hsl(160 70% 45% / 0.25)',
  },
  { 
    letter: 'R', 
    name: 'Read', 
    spanish: 'Leer', 
    icon: Eye, 
    example: 'Ver productos',
    color: 'hsl(200 80% 55%)',
    bgGradient: 'linear-gradient(135deg, hsl(200 50% 12%) 0%, hsl(200 40% 6%) 100%)',
    glowColor: 'hsl(200 80% 55% / 0.25)',
  },
  { 
    letter: 'U', 
    name: 'Update', 
    spanish: 'Editar', 
    icon: Pencil, 
    example: 'Cambiar perfil',
    color: 'hsl(35 90% 55%)',
    bgGradient: 'linear-gradient(135deg, hsl(35 50% 12%) 0%, hsl(35 40% 6%) 100%)',
    glowColor: 'hsl(35 90% 55% / 0.25)',
  },
  { 
    letter: 'D', 
    name: 'Delete', 
    spanish: 'Borrar', 
    icon: Trash2, 
    example: 'Eliminar post',
    color: 'hsl(350 80% 55%)',
    bgGradient: 'linear-gradient(135deg, hsl(350 50% 12%) 0%, hsl(350 40% 6%) 100%)',
    glowColor: 'hsl(350 80% 55% / 0.25)',
  },
];

export function Slide05CRUD() {
  const { isExporting } = useExportContext();

  const getMotionProps = (delay: number) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease: premiumEase },
        };

  return (
    <ConsultingSlideLayout
      slideNumber={slideData.id}
      sectionNumber={slideData.sectionNumber}
      sectionTitle={slideData.section}
      title={slideData.title}
      storyline={slideData.storyline}
    >
      {/* Background Grid - subtle */}
      {!isExporting && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(hsl(160 30% 15% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(160 30% 15% / 0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      )}

      <div className="h-full flex flex-col gap-5 min-h-0 relative z-10">
        {/* Header - Excel Analogy */}
        <motion.div
          className="flex items-center gap-6 p-5 rounded-2xl shrink-0"
          style={{
            background: 'linear-gradient(135deg, hsl(160 25% 8%) 0%, hsl(160 20% 5%) 100%)',
            border: '1px solid hsl(160 40% 25% / 0.4)',
            boxShadow: isExporting ? 'none' : '0 8px 32px hsl(160 50% 20% / 0.08)',
          }}
          {...getMotionProps(0.1)}
        >
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
            style={{ 
              background: 'linear-gradient(135deg, hsl(160 50% 25%) 0%, hsl(160 40% 15%) 100%)',
              boxShadow: isExporting ? 'none' : '0 4px 20px hsl(160 50% 30% / 0.3)',
            }}
          >
            <Table2 className="w-8 h-8" style={{ color: 'hsl(160 70% 70%)' }} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <Database className="w-5 h-5" style={{ color: 'hsl(160 60% 50%)' }} />
              <span className="text-lg font-bold" style={{ color: 'hsl(0 0% 95%)' }}>
                CRUD = Las 4 operaciones básicas de datos
              </span>
            </div>
            <p className="text-lg" style={{ color: 'hsl(0 0% 65%)' }}>
              Como <span className="font-bold" style={{ color: 'hsl(160 70% 55%)' }}>Excel</span>: 
              agregar filas, ver datos, editar celdas, eliminar filas. Toda app hace esto.
            </p>
          </div>
        </motion.div>

        {/* 4 CRUD Cards - Main Hero */}
        <div className="flex-1 grid grid-cols-4 gap-5 min-h-0">
          {crudOps.map((op, i) => (
            <motion.div
              key={op.letter}
              className="relative p-5 rounded-2xl flex flex-col items-center text-center overflow-hidden"
              style={{
                background: op.bgGradient,
                border: `1px solid ${op.color.replace(')', ' / 0.35)')}`,
                boxShadow: isExporting ? 'none' : `0 12px 40px ${op.glowColor}`,
              }}
              {...getMotionProps(0.15 + i * 0.06)}
            >
              {/* Glow orb */}
              {!isExporting && (
                <div 
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                  style={{ background: op.glowColor }}
                />
              )}
              
              {/* Letter Badge - Hero Element */}
              <div 
                className="relative w-24 h-24 rounded-2xl flex items-center justify-center mb-4"
                style={{ 
                  background: `linear-gradient(135deg, ${op.color} 0%, ${op.color.replace(')', ' / 0.6)')} 100%)`,
                  boxShadow: isExporting ? 'none' : `0 8px 32px ${op.glowColor}`,
                }}
              >
                <span 
                  className="text-6xl font-black"
                  style={{ 
                    color: 'hsl(0 0% 100%)',
                    textShadow: isExporting ? 'none' : `0 4px 16px ${op.glowColor}`,
                  }}
                >
                  {op.letter}
                </span>
              </div>
              
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ 
                  background: 'hsl(220 20% 8% / 0.9)',
                  border: '1px solid hsl(0 0% 100% / 0.08)',
                }}
              >
                <op.icon className="w-7 h-7" style={{ color: op.color }} />
              </div>
              
              {/* Names */}
              <h4 
                className="font-black text-3xl mb-1 tracking-tight"
                style={{ color: 'hsl(0 0% 97%)' }}
              >
                {op.spanish}
              </h4>
              <p 
                className="text-lg mb-4 font-medium"
                style={{ color: 'hsl(0 0% 55%)' }}
              >
                {op.name}
              </p>
              
              {/* Example Badge */}
              <div 
                className="mt-auto px-4 py-2.5 rounded-xl w-full"
                style={{ 
                  background: 'hsl(220 20% 6%)',
                  border: '1px solid hsl(0 0% 100% / 0.06)',
                }}
              >
                <p className="text-base font-semibold" style={{ color: op.color }}>
                  → {op.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructor Note */}
        <motion.div
          className="flex items-center gap-4 p-4 rounded-xl shrink-0"
          style={{
            background: 'linear-gradient(135deg, hsl(45 35% 8%) 0%, hsl(45 25% 5%) 100%)',
            borderLeft: '4px solid hsl(45 80% 50%)',
          }}
          {...getMotionProps(0.45)}
        >
          <Lightbulb className="w-6 h-6 shrink-0" style={{ color: 'hsl(45 80% 55%)' }} />
          <p className="text-lg" style={{ color: 'hsl(0 0% 65%)' }}>
            <span className="font-bold" style={{ color: 'hsl(45 80% 55%)' }}>Con Supabase:</span>{' '}
            no escribes SQL. La plataforma genera CRUD automáticamente.{' '}
            <span className="font-semibold" style={{ color: 'hsl(0 0% 85%)' }}>Solo describes qué quieres.</span>
          </p>
        </motion.div>
      </div>
    </ConsultingSlideLayout>
  );
}