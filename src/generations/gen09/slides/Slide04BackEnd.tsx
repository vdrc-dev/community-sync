import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { Database, Zap, ShieldCheck, Server, BookOpen } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { DatabaseTableMockup } from '@/components/presentation/mockups';
import { SLIDES_DATA } from '../config';

const slideData = SLIDES_DATA[3];
const premiumEase = [0.22, 1, 0.36, 1];

export function Slide04BackEnd() {
  const { isExporting } = useExportContext();

  const getMotionProps = (delay: number) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.4, ease: premiumEase },
        };

  const features = [
    { icon: Database, title: 'PostgreSQL', desc: 'Base de datos profesional' },
    { icon: Zap, title: 'Tiempo Real', desc: 'Cambios instantáneos' },
    { icon: ShieldCheck, title: 'Seguridad', desc: 'Auth y permisos' },
  ];

  return (
    <ConsultingSlideLayout
      slideNumber={slideData.id}
      sectionNumber={slideData.sectionNumber}
      sectionTitle={slideData.section}
      title={slideData.title}
      storyline={slideData.storyline}
    >
      <div className="h-full flex flex-col gap-5 min-h-0">
        {/* Definition card */}
        <motion.div
          className="p-6 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(160 30% 8%)',
            border: '3px solid hsl(160 40% 25% / 0.5)',
          }}
          {...getMotionProps(0.1)}
        >
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/15 flex items-center justify-center shrink-0 border-2 border-emerald-500/30">
              <Server className="w-10 h-10 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-2xl font-black text-foreground tracking-tight">Definición</h3>
                <span className="px-4 py-1.5 rounded-lg text-base font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Concepto clave</span>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                El <span className="text-foreground font-bold">Back-End</span> es la parte invisible que procesa datos.
                Como la <span className="text-emerald-400 font-bold">cocina de un restaurante</span>: el cliente no la ve, pero ahí se prepara todo.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main grid: SQL + Database Table | Features */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-5 min-h-0">
          {/* SQL example */}
          <motion.div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: 'hsl(220 20% 6%)',
              border: '3px solid hsl(0 0% 100% / 0.1)',
            }}
            {...getMotionProps(0.15)}
          >
            <div className="px-5 py-3 border-b-2 border-white/5 flex items-center gap-3 shrink-0">
              <Database className="w-5 h-5 text-emerald-400" />
              <span className="text-base font-bold text-muted-foreground">Consulta SQL</span>
            </div>
            <div className="flex-1 p-5 flex flex-col justify-center">
              <pre className="text-xl font-mono font-bold leading-loose">
                <span className="text-purple-400">SELECT</span>
                <span className="text-slate-300"> nombre, email</span>{'\n'}
                <span className="text-purple-400">FROM</span>
                <span className="text-emerald-400"> usuarios</span>{'\n'}
                <span className="text-purple-400">WHERE</span>
                <span className="text-slate-300"> activo = </span>
                <span className="text-amber-400">true</span>
              </pre>
            </div>
            <div className="px-5 py-3 border-t-2 border-white/5 shrink-0">
              <p className="text-base text-emerald-400 font-bold">
                ✓ Supabase genera esto automáticamente
              </p>
            </div>
          </motion.div>

          {/* Database Table Mockup */}
          <motion.div
            className="lg:col-span-1"
            {...getMotionProps(0.2)}
          >
            <DatabaseTableMockup 
              tableName="usuarios"
              enableRealtime={!isExporting}
              realtimeInterval={5000}
              className="h-full"
            />
          </motion.div>

          {/* Features */}
          <div className="flex flex-col gap-4 min-h-0">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex-1 p-5 rounded-2xl flex items-center gap-5"
                style={{
                  backgroundColor: 'hsl(220 15% 7%)',
                  border: '3px solid hsl(0 0% 100% / 0.08)',
                }}
                {...getMotionProps(0.25 + i * 0.06)}
              >
                <div className="w-16 h-16 rounded-xl bg-slate-500/15 flex items-center justify-center shrink-0 border-2 border-white/10">
                  <feature.icon className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h4 className="font-black text-2xl text-foreground tracking-tight">{feature.title}</h4>
                  <p className="text-lg text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instructor note */}
        <motion.div
          className="p-5 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(45 50% 10% / 0.5)',
            borderLeft: '5px solid hsl(45 70% 50%)',
          }}
          {...getMotionProps(0.45)}
        >
          <div className="flex items-start gap-4">
            <BookOpen className="w-7 h-7 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              <span className="text-foreground font-bold">Supabase</span> te da backend completo con 1 click: 
              base de datos, autenticación y APIs. <span className="text-amber-400 font-bold">Sin configurar servidores.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </ConsultingSlideLayout>
  );
}
