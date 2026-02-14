import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { Clock, FolderGit2, RefreshCw, Users, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { SLIDES_DATA } from '../config';
import githubLogo from '@/assets/github-logo.gif';

const slideData = SLIDES_DATA[8];
const premiumEase = [0.22, 1, 0.36, 1];

const versions = [
  {
    id: 3,
    title: 'ERROR (Pantalla blanca)',
    time: 'Hoy 3:45 PM',
    commit: 'a8f3d21',
    isError: true,
    isCurrent: true,
  },
  {
    id: 2,
    title: 'Cambio de colores',
    time: 'Hoy 2:15 PM',
    commit: '7c2e9f0',
    canRestore: true,
  },
  {
    id: 1,
    title: 'Inicio del proyecto',
    time: 'Ayer 10:30 AM',
    commit: '3b1a5c8',
  },
];

const concepts = [
  {
    icon: FolderGit2,
    title: 'REPOSITORIO',
    desc: 'Donde vive tu código. Accesible desde cualquier lugar.',
  },
  {
    icon: RefreshCw,
    title: 'SINCRONIZACIÓN',
    desc: 'El puente automático. Lovable envía cambios sin que hagas nada.',
  },
  {
    icon: Users,
    title: 'COLABORACIÓN',
    desc: 'Invita a tu equipo a trabajar en el mismo proyecto.',
  },
];

export function Slide09GitHub() {
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
      <div className="h-full flex flex-col gap-4 min-h-0">
        {/* Header with GitHub Logo */}
        <motion.div
          className="flex items-center gap-5 shrink-0"
          {...getMotionProps(0.05)}
        >
          <img 
            src={githubLogo} 
            alt="GitHub Logo" 
            className="w-16 h-16 object-contain"
          />
          <div>
            <h2 className="text-4xl font-black text-foreground tracking-tight">GITHUB</h2>
            <p className="text-xl text-muted-foreground">El "Google Drive" de tu código.</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-5 min-h-0">
          {/* Left: Version History Mockup */}
          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'hsl(220 15% 6%)',
              border: '1px solid hsl(0 0% 100% / 0.08)',
            }}
            {...getMotionProps(0.1)}
          >
            {/* Browser Header */}
            <div 
              className="flex items-center gap-3 px-4 py-3"
              style={{
                backgroundColor: 'hsl(220 18% 8%)',
                borderBottom: '1px solid hsl(0 0% 100% / 0.06)',
              }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-slate-400 font-medium text-sm">Historial de Versiones</span>
            </div>

            {/* Versions List */}
            <div className="p-4 space-y-3">
              {versions.map((v, idx) => (
                <motion.div
                  key={v.id}
                  className={`p-4 rounded-xl transition-all ${
                    v.isError 
                      ? 'bg-red-500/10 border border-red-500/30' 
                      : 'bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                  style={!isExporting && v.isError ? {
                    animation: 'pulse 2s ease-in-out infinite',
                  } : {}}
                  {...getMotionProps(0.15 + idx * 0.08)}
                >
                  <div className="flex items-center gap-3 mb-1">
                    {v.isError ? (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                    <span className="text-foreground font-semibold">
                      Versión {v.id}: {v.isError && '⚠️ '}{v.title}
                    </span>
                    {v.isCurrent && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        ACTUAL
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 ml-8">
                    {v.time} • Commit: <span className="font-mono">{v.commit}</span>
                  </p>
                  {v.canRestore && (
                    <motion.button
                      className="mt-3 ml-8 px-4 py-2 rounded-lg text-sm font-bold text-white flex items-center gap-2"
                      style={{
                        background: isExporting 
                          ? 'hsl(24 95% 45%)' 
                          : 'linear-gradient(135deg, hsl(24 95% 50%), hsl(24 95% 40%))',
                        boxShadow: isExporting 
                          ? 'none' 
                          : '0 0 20px hsla(24 95% 50% / 0.3), 0 8px 30px hsla(24 95% 50% / 0.2)',
                      }}
                      {...(!isExporting ? {
                        animate: {
                          boxShadow: [
                            '0 0 20px hsla(24 95% 50% / 0.3), 0 8px 30px hsla(24 95% 50% / 0.2)',
                            '0 0 40px hsla(24 95% 50% / 0.5), 0 12px 40px hsla(24 95% 50% / 0.3)',
                            '0 0 20px hsla(24 95% 50% / 0.3), 0 8px 30px hsla(24 95% 50% / 0.2)',
                          ],
                        },
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      } : {})}
                    >
                      <RotateCcw className="w-4 h-4" />
                      RESTAURAR ESTA VERSIÓN
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Time Machine Concept */}
          <motion.div
            className="p-6 rounded-2xl flex flex-col"
            style={{
              backgroundColor: 'hsl(220 15% 7%)',
              border: '1px solid hsl(0 0% 100% / 0.08)',
            }}
            {...getMotionProps(0.2)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-orange-500/15 flex items-center justify-center">
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-black text-foreground">La Máquina del Tiempo</h3>
            </div>
            
            <p className="text-xl font-bold text-orange-400 mb-4">
              Si la embarras, viajas al pasado con un clic.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed flex-1">
              Cada vez que guardas cambios en Lovable, GitHub guarda una 
              <span className="text-foreground font-bold"> foto instantánea </span> 
              de tu código. Puedes volver a cualquiera.
            </p>

            {/* Visual indicator */}
            <div 
              className="mt-4 p-4 rounded-xl"
              style={{
                backgroundColor: 'hsl(24 50% 10% / 0.5)',
                borderLeft: '4px solid hsl(24 80% 50%)',
              }}
            >
              <p className="text-base text-muted-foreground">
                <span className="text-orange-400 font-semibold">Lovable</span> sincroniza con GitHub{' '}
                <span className="text-foreground font-bold">automáticamente</span>. 
                No necesitas saber comandos de Git.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer: Concept Cards */}
        <div className="grid grid-cols-3 gap-4 shrink-0">
          {concepts.map((c, i) => (
            <motion.div
              key={c.title}
              className="p-4 rounded-xl text-center"
              style={{
                backgroundColor: 'hsl(220 15% 7%)',
                border: '1px solid hsl(0 0% 100% / 0.06)',
              }}
              {...getMotionProps(0.3 + i * 0.05)}
            >
              <div className="w-10 h-10 rounded-lg bg-slate-500/15 flex items-center justify-center mx-auto mb-3">
                <c.icon className="w-5 h-5 text-slate-300" />
              </div>
              <h4 className="font-bold text-sm text-foreground mb-1">{c.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ConsultingSlideLayout>
  );
}
