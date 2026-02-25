import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, UserCheck, Key, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

type SimState = 'idle' | 'typing' | 'validating' | 'denied' | 'approved' | 'rls';

const AUTH_LAYERS = [
  { num: 1, title: 'Login / Registro', desc: 'Formularios auto-generados por Lovable', icon: Lock, color: 'hsl(330 70% 60%)', hue: 330 },
  { num: 2, title: 'Dominios Permitidos', desc: 'Solo @fundaciontrabun.cl y @vdrc.cl entran', icon: Mail, color: 'hsl(280 70% 60%)', hue: 280 },
  { num: 3, title: 'Confirmación de Email', desc: 'Verificación de identidad antes de acceder', icon: UserCheck, color: 'hsl(38 90% 55%)', hue: 38 },
  { num: 4, title: 'Row Level Security', desc: 'María solo ve sus colegios. Pedro los suyos.', icon: Key, color: 'hsl(150 60% 50%)', hue: 150 },
];

export function S4Slide13Authentication() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [simState, setSimState] = useState<SimState>('idle');
  const [emailInput, setEmailInput] = useState('');
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  const runSimulation = (type: 'valid' | 'invalid') => {
    if (simState === 'typing' || simState === 'validating') return;
    setSimState('typing');
    const email = type === 'valid' ? 'maria@fundaciontrabun.cl' : 'hacker@gmail.com';
    let i = 0;
    setEmailInput('');
    const typeInterval = setInterval(() => {
      i++;
      setEmailInput(email.slice(0, i));
      if (i >= email.length) {
        clearInterval(typeInterval);
        setTimeout(() => setSimState('validating'), 500);
        setTimeout(() => {
          setSimState(type === 'valid' ? 'approved' : 'denied');
          if (type === 'valid') setTimeout(() => setSimState('rls'), 2000);
        }, 1800);
      }
    }, 55);
  };

  const activeLayerIdx =
    simState === 'typing' ? 0 :
    simState === 'validating' ? 1 :
    (simState === 'approved' || simState === 'denied') ? 2 :
    simState === 'rls' ? 3 : -1;

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-15%,_hsl(330_60%_40%_/_0.12),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'radial-gradient(circle, hsl(330 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
        <div className="absolute top-[5%] right-[3%] text-[16vw] font-black text-white/[0.022] leading-none select-none pointer-events-none tracking-tighter">AUTH</div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-rose-500" style={{ boxShadow: '0 0 12px hsl(330 70% 55% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Aplicación · Seguridad</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Autenticación y Seguridad</h1>
            </div>
          </div>
          <p className="text-rose-400/60 text-sm ml-5 pl-1 font-medium">4 capas de protección. Simula un login real para ver cómo fluye cada capa.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-5">
          {/* Auth layers */}
          <div className="col-span-2 space-y-2.5">
            {AUTH_LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              const isHighlighted = activeLayerIdx === i;
              const isDone = activeLayerIdx > i && activeLayerIdx >= 0;
              return (
                <motion.div key={i} {...m(0.1 + i * 0.08)}
                  className="relative flex items-start gap-3 p-4 rounded-2xl border transition-all duration-500 overflow-hidden"
                  style={{
                    borderColor: isHighlighted ? `hsl(${layer.hue} 60% 50% / 0.4)` : isDone ? `hsl(${layer.hue} 60% 50% / 0.2)` : 'hsl(0 0% 100% / 0.05)',
                    background: isHighlighted ? `hsl(${layer.hue} 60% 40% / 0.1)` : isDone ? `hsl(${layer.hue} 60% 40% / 0.04)` : 'hsl(0 0% 100% / 0.01)',
                    transform: isHighlighted ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isHighlighted ? `0 0 30px hsl(${layer.hue} 60% 40% / 0.12) inset` : 'none',
                  }}>
                  {isHighlighted && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, hsl(${layer.hue} 60% 55% / 0.7), transparent)` }} />}

                  <div className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `hsl(${layer.hue} 60% 45% / ${isHighlighted ? '0.2' : '0.08'})`, border: `1px solid hsl(${layer.hue} 60% 50% / ${isHighlighted ? '0.4' : '0.2'})`, transition: 'all 0.3s' }}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" style={{ color: layer.color }} /> : <Icon className="w-4.5 h-4.5" style={{ color: layer.color }} />}
                    {isHighlighted && !isExporting && (
                      <motion.div className="absolute inset-0 rounded-xl" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ border: `1px solid ${layer.color}`, boxShadow: `0 0 12px ${layer.color}` }} />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-black tracking-widest uppercase" style={{ color: `hsl(${layer.hue} 55% 60% / 0.7)` }}>CAPA {layer.num}</span>
                      {isDone && <CheckCircle2 className="w-3 h-3" style={{ color: layer.color }} />}
                    </div>
                    <p className="text-sm font-black text-white leading-tight">{layer.title}</p>
                    <p className="text-[11px] text-white/85 mt-0.5">{layer.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Simulator */}
          <motion.div {...m(0.3)} className="col-span-3 rounded-2xl border border-rose-500/18 overflow-hidden"
            style={{ background: 'hsl(330 20% 4% / 0.7)', boxShadow: '0 0 50px hsl(330 60% 40% / 0.07) inset' }}>
            {/* Title bar */}
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-3 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <Shield className="w-3.5 h-3.5 text-rose-400/70" />
              <span className="text-xs font-black text-rose-400/80">Simulador de Login Interactivo</span>
            </div>

            <div className="p-6">
              {/* Scenario buttons */}
              <div className="flex gap-3 mb-5">
                <button onClick={() => runSimulation('valid')}
                  className="flex-1 p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] text-xs font-black text-emerald-400 hover:bg-emerald-500/[0.12] transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ boxShadow: '0 0 20px hsl(150 60% 40% / 0.08)' }}>
                  <CheckCircle2 className="w-4 h-4" />
                  Login Válido
                </button>
                <button onClick={() => runSimulation('invalid')}
                  className="flex-1 p-3 rounded-xl border border-red-500/25 bg-red-500/[0.06] text-xs font-black text-red-400 hover:bg-red-500/[0.12] transition-all duration-300 flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Login Rechazado
                </button>
              </div>

              {/* Email input */}
              <div className="mb-3">
                <label className="text-[11px] font-black text-white/75 uppercase tracking-widest">Email corporativo</label>
                <div className={`mt-2 p-3.5 rounded-xl border bg-black/40 font-mono text-sm transition-all duration-500 ${simState === 'denied' ? 'border-red-500/35 shadow-[0_0_15px_hsl(0_60%_40%_/_0.15)]' : (simState === 'approved' || simState === 'rls') ? 'border-emerald-500/35 shadow-[0_0_15px_hsl(150_60%_40%_/_0.15)]' : 'border-white/[0.07]'}`}>
                  <span className={`text-sm ${emailInput ? 'text-white/75' : 'text-white/85'}`}>{emailInput || 'usuario@dominio.cl'}</span>
                  {simState === 'typing' && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-white/80">|</motion.span>}
                </div>
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="text-[11px] font-black text-white/75 uppercase tracking-widest">Contraseña</label>
                <div className="mt-2 p-3.5 rounded-xl border border-white/[0.07] bg-black/40">
                  <span className="text-sm text-white/85">••••••••••</span>
                </div>
              </div>

              {/* State feedback */}
              <AnimatePresence mode="wait">
                {simState === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                    <span className="text-xs font-bold text-rose-300/50">← Elige un escenario para simular</span>
                  </motion.div>
                )}
                {simState === 'validating' && (
                  <motion.div key="val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="w-full p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                    <span className="text-xs font-black text-amber-300">Validando dominio contra whitelist...</span>
                  </motion.div>
                )}
                {simState === 'denied' && (
                  <motion.div key="denied" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-full p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center gap-2"
                    style={{ boxShadow: '0 0 20px hsl(0 60% 40% / 0.12)' }}>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-xs font-black text-red-300">Acceso denegado</p>
                      <p className="text-[11px] text-red-400/50">@gmail.com no es un dominio autorizado</p>
                    </div>
                  </motion.div>
                )}
                {(simState === 'approved' || simState === 'rls') && (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-full p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center gap-2"
                    style={{ boxShadow: '0 0 20px hsl(150 60% 40% / 0.12)' }}>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-xs font-black text-emerald-300">Acceso concedido ✓</p>
                      <p className="text-[11px] text-emerald-400/50">Dominio @fundaciontrabun.cl verificado</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RLS visualization */}
              <AnimatePresence>
                {simState === 'rls' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 overflow-hidden">
                    <div className="p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04]">
                      <p className="text-[11px] font-black text-emerald-400/70 uppercase tracking-widest mb-3">Row Level Security — María solo ve sus datos</p>
                      <div className="space-y-2 font-mono text-[11px]">
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/15">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-white/75">María López · Colegio San Pedro · <span className="text-emerald-400 font-bold">visible ✓</span></span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.01] border border-white/[0.04] opacity-35">
                          <Lock className="w-3.5 h-3.5 text-white/75 shrink-0" />
                          <span className="text-white/75">Pedro Sánchez · Colegio Norte · <span className="text-red-400/50 font-bold">oculto 🔒</span></span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.01] border border-white/[0.04] opacity-35">
                          <Lock className="w-3.5 h-3.5 text-white/75 shrink-0" />
                          <span className="text-white/75">Ana García · Colegio Sur · <span className="text-red-400/50 font-bold">oculto 🔒</span></span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(330 50% 55% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase">Aplicación</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/70">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
