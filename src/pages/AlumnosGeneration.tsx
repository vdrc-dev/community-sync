import { useParams, useNavigate } from 'react-router-dom';
import { useGenerations, useGenerationWeeks, parseGenUrl } from '@/hooks/useGenerationData';
import { motion } from 'framer-motion';
import { Loader2, ChevronLeft, Presentation, Calendar, User, Sparkles, FolderOpen, Rocket, Lock, CheckCircle2, Circle, Terminal } from 'lucide-react';
import logoVdrc from '@/assets/logo-vdrc.png';
import { useMemo } from 'react';

const premiumEase = [0.22, 1, 0.36, 1];

// Week labels for display
const WEEK_LABELS: Record<number, string> = {
  1: 'Clase 01: Higiene Digital',
  2: 'Clase 02: Productividad Agéntica',
  3: 'Clase 03: Comunicación',
  4: 'Clase 04: Desarrollo',
};

/* ─── Dot Grid ─── */
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(160 84% 60%) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}

/* ─── Floating particles ─── */
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.25 + 0.05,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `hsl(160 84% 60% / ${p.opacity})`,
          }}
          animate={{ y: [0, -50, 0], opacity: [p.opacity, p.opacity * 1.5, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function AlumnosGeneration() {
  const { genId } = useParams<{ genId: string }>();
  const navigate = useNavigate();
  const { generation: genNumber } = parseGenUrl(genId || '');
  const { data: generations, isLoading: gensLoading } = useGenerations();

  const gen = generations?.find(g => g.generation_number === genNumber);
  const { data: weeks, isLoading: weeksLoading } = useGenerationWeeks(gen?.id || 0);

  const isLoading = gensLoading || weeksLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div className="text-center space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Terminal className="w-6 h-6 text-primary" />
          </motion.div>
          <p className="text-muted-foreground font-mono text-sm">Cargando semanas...</p>
        </motion.div>
      </div>
    );
  }

  if (!gen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-2">
          <Terminal className="w-7 h-7 text-muted-foreground/40" />
        </div>
        <p className="text-muted-foreground">Generación no encontrada</p>
        <button
          onClick={() => navigate('/alumnos')}
          className="text-primary text-sm hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Volver
        </button>
      </div>
    );
  }

  const totalWeeks = gen.total_weeks || 4;
  const progress = gen.week / totalWeeks;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden px-6 py-12"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, hsl(222 25% 9%) 0%, hsl(222 25% 4%) 100%)',
      }}
    >
      <DotGrid />
      <FloatingParticles />

      {/* Ambient orb */}
      <motion.div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(160 84% 42% / 0.05) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Breadcrumb */}
      <motion.div
        className="w-full max-w-4xl flex items-center gap-2 text-sm text-muted-foreground/50 mb-8 relative z-10"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          onClick={() => navigate('/alumnos')}
          className="hover:text-foreground transition-colors flex items-center gap-1 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Alumnos
        </button>
        <span className="text-muted-foreground/30">/</span>
        <span className="text-foreground/80 font-medium">Gen {String(gen.generation_number).padStart(2, '0')}</span>
      </motion.div>

      {/* Header card */}
      <motion.div
        className="w-full max-w-4xl mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: premiumEase }}
      >
        <div
          className="p-6 md:p-8 rounded-2xl backdrop-blur-sm"
          style={{
            background: 'linear-gradient(145deg, hsl(222 18% 11% / 0.8) 0%, hsl(222 18% 7% / 0.8) 100%)',
            border: '1px solid hsl(0 0% 100% / 0.06)',
            boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)',
          }}
        >
          <div className="flex items-start gap-4 md:gap-5">
            <img src={logoVdrc} alt="VDRC" className="h-10 w-auto opacity-70 mt-1 hidden sm:block" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <h1
                  className="text-3xl md:text-4xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, hsl(0 0% 100%), hsl(160 84% 72%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Gen {String(gen.generation_number).padStart(2, '0')}
                </h1>
                {gen.is_active && (
                  <motion.span
                    className="flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-primary text-primary-foreground shadow-[0_0_12px_-3px_hsl(160_84%_42%/0.4)]"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="w-3 h-3" /> ACTUAL
                  </motion.span>
                )}
              </div>
              <p className="text-lg font-semibold text-foreground/90 mb-3">{gen.module}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {new Date(gen.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Vicente Donoso R.
                </span>
              </div>

              {/* Overall progress bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground/40 mb-1.5">
                  <span>Progreso del taller</span>
                  <span className="font-mono">{Math.round(progress * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, hsl(160 84% 42%), hsl(160 84% 58%))',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ delay: 0.5, duration: 1, ease: premiumEase }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Onboarding button for Gen 10 */}
      {gen.generation_number === 10 && (
        <motion.div
          className="w-full max-w-4xl mb-6 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => navigate('/onboarding/gen10')}
            className="group flex items-center gap-3 w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,136,0.1), rgba(34,211,238,0.06))',
              border: '1px solid rgba(0,255,136,0.2)',
              color: '#00ff88',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Rocket className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Onboarding — Prepara tu entorno para la Clase 3</span>
          </button>
        </motion.div>
      )}

      {/* Weeks grid with timeline */}
      <div className="w-full max-w-4xl relative z-10">
        {/* Vertical timeline line (visible on larger screens) */}
        <div className="hidden lg:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-white/[0.06] to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((weekNum, idx) => {
            const weekData = weeks?.find(w => w.week === weekNum);
            const isCurrent = weekNum === gen.week;
            const hasSlides = !!weekData;
            const isPast = weekNum < gen.week;
            const isFuture = weekNum > gen.week;

            return (
              <motion.div
                key={weekNum}
                className="group relative flex flex-col rounded-2xl overflow-hidden backdrop-blur-sm"
                style={{
                  background: isCurrent
                    ? 'linear-gradient(160deg, hsl(160 84% 42% / 0.12) 0%, hsl(160 84% 42% / 0.03) 100%)'
                    : 'linear-gradient(160deg, hsl(222 18% 11% / 0.8) 0%, hsl(222 18% 7% / 0.8) 100%)',
                  border: isCurrent
                    ? '1px solid hsl(160 84% 42% / 0.35)'
                    : '1px solid hsl(0 0% 100% / 0.06)',
                  boxShadow: isCurrent
                    ? '0 0 40px -10px hsl(160 84% 42% / 0.15), inset 0 1px 0 hsl(160 84% 42% / 0.08)'
                    : 'inset 0 1px 0 hsl(0 0% 100% / 0.03)',
                  opacity: isFuture && !hasSlides ? 0.55 : 1,
                }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: isFuture && !hasSlides ? 0.55 : 1, y: 0 }}
                transition={{ delay: 0.25 + idx * 0.1, duration: 0.6, ease: premiumEase }}
                whileHover={{
                  y: hasSlides ? -4 : 0,
                  transition: { duration: 0.25 },
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: isCurrent
                      ? 'radial-gradient(250px at 50% 0%, hsl(160 84% 42% / 0.08), transparent 70%)'
                      : 'radial-gradient(250px at 50% 0%, hsl(0 0% 100% / 0.03), transparent 70%)',
                  }}
                />

                {/* Current week pulse */}
                {isCurrent && (
                  <motion.div
                    className="absolute -inset-px rounded-2xl pointer-events-none"
                    style={{ border: '1px solid hsl(160 84% 42% / 0.25)' }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Week header */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {/* Status indicator */}
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-primary/60" />
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Circle className="w-4 h-4 text-primary fill-primary" />
                        </motion.div>
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-muted-foreground/30" />
                      )}
                      <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-primary' : isPast ? 'text-foreground/60' : 'text-muted-foreground/40'}`}>
                        Semana {weekNum}
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="text-[9px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full tracking-wider">
                        HOY
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-foreground/90 text-sm leading-tight min-h-[2.5rem]">
                    {weekData?.name || WEEK_LABELS[weekNum] || 'Próximamente'}
                  </h3>

                  {/* Stack chips */}
                  {weekData?.stack && weekData.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {weekData.stack.slice(0, 4).map(t => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-md font-medium"
                          style={{
                            background: isCurrent ? 'hsl(160 84% 42% / 0.1)' : 'hsl(0 0% 100% / 0.05)',
                            color: isCurrent ? 'hsl(160 84% 70%)' : 'hsl(0 0% 100% / 0.5)',
                            border: isCurrent ? '1px solid hsl(160 84% 42% / 0.15)' : '1px solid hsl(0 0% 100% / 0.05)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-auto p-4 pt-2 space-y-2">
                  <button
                    onClick={() => navigate(`/slides/gen${gen.generation_number}s${weekNum}`)}
                    disabled={!hasSlides}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      hasSlides
                        ? isCurrent
                          ? 'bg-primary/20 text-primary hover:bg-primary/30 shadow-[0_0_15px_-5px_hsl(160_84%_42%/0.2)]'
                          : 'bg-primary/10 text-primary/80 hover:bg-primary/20'
                        : 'bg-white/[0.02] text-muted-foreground/30 cursor-not-allowed'
                    }`}
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    Presentación
                  </button>
                  <a
                    href={weekData?.drive_url || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (!weekData?.drive_url) e.preventDefault(); }}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      weekData?.drive_url
                        ? 'bg-white/[0.05] text-foreground/60 hover:bg-white/[0.1] hover:text-foreground/80'
                        : 'bg-white/[0.02] text-muted-foreground/30 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    Materiales
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
