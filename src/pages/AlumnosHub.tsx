import { useNavigate } from 'react-router-dom';
import { useGenerations } from '@/hooks/useGenerationData';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, ArrowRight, ChevronLeft, BookOpen, Calendar, Terminal } from 'lucide-react';
import logoVdrc from '@/assets/logo-vdrc.png';
import { useMemo } from 'react';

const premiumEase = [0.22, 1, 0.36, 1];

/* ─── Dot Grid ─── */
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(160 84% 60%) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}

/* ─── Floating particles (lighter version) ─── */
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 18 + 14,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.3 + 0.08,
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
          animate={{
            y: [0, -60, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function AlumnosHub() {
  const navigate = useNavigate();
  const { data: generations, isLoading } = useGenerations();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          className="text-center space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Terminal className="w-6 h-6 text-primary" />
          </motion.div>
          <p className="text-muted-foreground font-mono text-sm">Cargando...</p>
        </motion.div>
      </div>
    );
  }

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
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(160 84% 42% / 0.06) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Back link */}
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground/60 hover:text-foreground transition-colors z-10 group"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Inicio
      </motion.button>

      {/* Logo */}
      <motion.div
        className="relative mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: premiumEase }}
      >
        <img src={logoVdrc} alt="VDRC" className="h-12 w-auto" />
        <motion.div
          className="absolute -inset-3 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(160 84% 42% / 0.12) 0%, transparent 70%)' }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: premiumEase }}
        className="text-center mb-14 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/15 bg-primary/[0.04] mb-5">
          <BookOpen className="w-3.5 h-3.5 text-primary/80" />
          <span className="text-[11px] font-semibold text-primary/80 tracking-wide">MATERIAL DEL CURSO</span>
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-[1.1]"
          style={{
            background: 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(0 0% 95%) 40%, hsl(160 84% 72%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Tus Generaciones
        </h1>
        <p className="text-muted-foreground/80 text-lg max-w-md mx-auto">
          Selecciona tu generación para acceder a presentaciones y materiales
        </p>
      </motion.div>

      {/* Generation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full mb-12 relative z-10">
        {generations?.map((gen, i) => {
          const progress = gen.week / (gen.total_weeks || 4);

          return (
            <motion.button
              key={gen.id}
              onClick={() => navigate(`/alumnos/gen${gen.generation_number}`)}
              className="group relative p-7 rounded-2xl text-left transition-all duration-300 backdrop-blur-sm overflow-hidden"
              style={{
                background: gen.is_active
                  ? 'linear-gradient(145deg, hsl(160 84% 42% / 0.12) 0%, hsl(160 84% 42% / 0.03) 100%)'
                  : 'linear-gradient(145deg, hsl(222 18% 11% / 0.9) 0%, hsl(222 18% 7% / 0.9) 100%)',
                border: gen.is_active
                  ? '1px solid hsl(160 84% 42% / 0.35)'
                  : '1px solid hsl(0 0% 100% / 0.07)',
                boxShadow: gen.is_active
                  ? '0 0 50px -12px hsl(160 84% 42% / 0.2), inset 0 1px 0 hsl(160 84% 42% / 0.08)'
                  : 'inset 0 1px 0 hsl(0 0% 100% / 0.04)',
              }}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: premiumEase }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: gen.is_active
                    ? 'radial-gradient(300px at 50% 0%, hsl(160 84% 42% / 0.1), transparent 70%)'
                    : 'radial-gradient(300px at 50% 0%, hsl(0 0% 100% / 0.04), transparent 70%)',
                }}
              />

              {gen.is_active && (
                <motion.span
                  className="absolute -top-2.5 -right-2.5 flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full bg-primary text-primary-foreground shadow-[0_0_15px_-3px_hsl(160_84%_42%/0.5)] z-10"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles className="w-3 h-3" />
                  ACTUAL
                </motion.span>
              )}

              <span
                className="text-4xl font-black block mb-3 relative z-10"
                style={{
                  background: gen.is_active
                    ? 'linear-gradient(135deg, hsl(160 84% 55%), hsl(160 70% 65%))'
                    : 'linear-gradient(135deg, hsl(0 0% 75%), hsl(0 0% 45%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Gen {String(gen.generation_number).padStart(2, '0')}
              </span>

              <h3 className="font-bold text-foreground mb-1 relative z-10">{gen.module}</h3>
              <p className="text-sm text-muted-foreground/60 mb-5 relative z-10">{gen.name}</p>

              {/* Progress bar */}
              <div className="relative z-10 mb-4">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground/50 mb-1.5">
                  <span>Progreso</span>
                  <span>Semana {gen.week}/{gen.total_weeks}</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: gen.is_active
                        ? 'linear-gradient(90deg, hsl(160 84% 42%), hsl(160 84% 55%))'
                        : 'linear-gradient(90deg, hsl(0 0% 40%), hsl(0 0% 55%))',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: premiumEase }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40">
                  <Calendar className="w-3 h-3" />
                  {new Date(gen.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-primary font-semibold group-hover:gap-2.5 transition-all">
                  Ver materiales <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Empty state */}
      {(!generations || generations.length === 0) && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-muted-foreground/40" />
          </div>
          <p className="text-muted-foreground">No hay generaciones disponibles</p>
        </motion.div>
      )}
    </div>
  );
}
