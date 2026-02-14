import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, UserCheck, Key, CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

type SimState = 'idle' | 'typing' | 'validating' | 'denied' | 'approved' | 'rls';

const AUTH_LAYERS = [
  { num: 1, title: 'Login / Registro', desc: 'Lovable genera formularios automáticamente', icon: Lock, color: 'hsl(330 70% 60%)' },
  { num: 2, title: 'Dominios Permitidos', desc: 'Solo @fundaciontrabun.cl y @vdrc.cl', icon: Mail, color: 'hsl(280 70% 60%)' },
  { num: 3, title: 'Confirmación Email', desc: 'Verificación de identidad antes de acceder', icon: UserCheck, color: 'hsl(38 90% 55%)' },
  { num: 4, title: 'Row Level Security', desc: 'Cada usuario solo ve sus propios datos', icon: Key, color: 'hsl(150 60% 50%)' },
];

export function S4Slide13Authentication() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [simState, setSimState] = useState<SimState>('idle');
  const [emailInput, setEmailInput] = useState('');
  const [scenario, setScenario] = useState<'valid' | 'invalid'>('valid');
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  const runSimulation = (type: 'valid' | 'invalid') => {
    setScenario(type);
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
          if (type === 'valid') {
            setTimeout(() => setSimState('rls'), 2000);
          }
        }, 1800);
      }
    }, 60);
  };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(330_60%_40%_/_0.1),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-rose-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Aplicación</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Autenticación y Seguridad</h1>
            </div>
          </div>
          <p className="text-rose-400/60 text-sm ml-5 pl-1">4 capas de protección. Simula un login para ver cómo funciona.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-5">
          {/* Left: Auth layers */}
          <div className="col-span-2 space-y-2.5">
            {AUTH_LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              const isHighlighted = 
                (simState === 'typing' && i === 0) ||
                (simState === 'validating' && i === 1) ||
                ((simState === 'approved' || simState === 'denied') && i === 2) ||
                (simState === 'rls' && i === 3);
              return (
                <motion.div key={i} {...m(0.1 + i * 0.08)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-500 ${isHighlighted ? 'bg-white/[0.05] border-white/[0.15] scale-[1.02]' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 relative"
                    style={{ background: `${layer.color.replace(')', ` / ${isHighlighted ? '0.2' : '0.08'})`)}`, border: `1px solid ${layer.color.replace(')', ' / 0.25)')}` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: layer.color }} />
                    {isHighlighted && !isExporting && (
                      <motion.div className="absolute inset-0 rounded-lg"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ border: `1px solid ${layer.color}` }} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black tracking-wider" style={{ color: `${layer.color.replace(')', ' / 0.5)')}` }}>CAPA {layer.num}</span>
                    </div>
                    <p className="text-sm font-bold text-white mt-0.5">{layer.title}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{layer.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Login simulator */}
          <motion.div {...m(0.3)} className="col-span-3 rounded-2xl border border-rose-500/15 bg-rose-500/[0.02] overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-rose-400/80">Simulador de Login</span>
              <span className="text-[9px] text-white/20 ml-auto">Interactivo</span>
            </div>

            <div className="p-6">
              {/* Scenario buttons */}
              <div className="flex gap-2 mb-5">
                <button onClick={() => { if (simState !== 'typing' && simState !== 'validating') runSimulation('valid'); }}
                  className="flex-1 p-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] text-xs font-bold text-emerald-400 hover:bg-emerald-500/[0.1] transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Login Válido
                </button>
                <button onClick={() => { if (simState !== 'typing' && simState !== 'validating') runSimulation('invalid'); }}
                  className="flex-1 p-2.5 rounded-lg border border-red-500/20 bg-red-500/[0.05] text-xs font-bold text-red-400 hover:bg-red-500/[0.1] transition-colors flex items-center justify-center gap-2">
                  <XCircle className="w-3.5 h-3.5" /> Login Rechazado
                </button>
              </div>

              {/* Email input */}
              <div className="mb-3">
                <label className="text-[10px] font-bold text-white/25 uppercase tracking-wider">Email corporativo</label>
                <div className={`mt-1.5 p-3 rounded-lg border bg-black/30 font-mono text-sm transition-colors duration-300 ${simState === 'denied' ? 'border-red-500/30' : simState === 'approved' || simState === 'rls' ? 'border-emerald-500/30' : 'border-white/[0.08]'}`}>
                  <span className={`${emailInput ? 'text-white/60' : 'text-white/15'}`}>
                    {emailInput || 'usuario@dominio.cl'}
                  </span>
                  {simState === 'typing' && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-white/60">|</motion.span>}
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="text-[10px] font-bold text-white/25 uppercase tracking-wider">Contraseña</label>
                <div className="mt-1.5 p-3 rounded-lg border border-white/[0.08] bg-black/30">
                  <span className="text-white/15 text-sm">{simState !== 'idle' ? '••••••••••' : '••••••••••'}</span>
                </div>
              </div>

              {/* Submit button / State */}
              <AnimatePresence mode="wait">
                {simState === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full p-3 rounded-lg bg-rose-500/15 border border-rose-500/25 text-center">
                    <span className="text-xs font-bold text-rose-300/50">← Elige un escenario arriba</span>
                  </motion.div>
                )}
                {simState === 'validating' && (
                  <motion.div key="val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="w-full p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                    <span className="text-xs font-bold text-amber-300">Validando dominio...</span>
                  </motion.div>
                )}
                {simState === 'denied' && (
                  <motion.div key="denied" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-full p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-red-300">@gmail.com no es un dominio autorizado</span>
                  </motion.div>
                )}
                {(simState === 'approved' || simState === 'rls') && (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-full p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300">✓ Acceso concedido · Dominio verificado</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RLS visualization */}
              <AnimatePresence>
                {simState === 'rls' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 overflow-hidden">
                    <div className="p-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.03]">
                      <p className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider mb-2">Row Level Security Activo</p>
                      <div className="space-y-1.5 font-mono text-[10px]">
                        <div className="flex items-center gap-2 p-2 rounded bg-emerald-500/[0.05] border border-emerald-500/10">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-white/50">María López · Colegio San Pedro · <span className="text-emerald-400/60">visible</span></span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-white/[0.01] border border-white/[0.04] opacity-30">
                          <Lock className="w-3 h-3 text-white/20" />
                          <span className="text-white/20">Pedro Sánchez · Colegio Norte · <span className="text-red-400/40">oculto</span></span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-white/[0.01] border border-white/[0.04] opacity-30">
                          <Lock className="w-3 h-3 text-white/20" />
                          <span className="text-white/20">Ana García · Colegio Sur · <span className="text-red-400/40">oculto</span></span>
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
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(330 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">APLICACIÓN</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
