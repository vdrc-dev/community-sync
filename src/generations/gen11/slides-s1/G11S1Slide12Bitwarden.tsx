import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, AlertTriangle, Eye, Key } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import securityImg from '@/assets/gen11-security-icon.png';

const PROBLEMS = [
  { icon: AlertTriangle, text: 'Misma clave en 10+ servicios', risk: 'CRÍTICO' },
  { icon: Eye, text: 'Claves guardadas en navegador', risk: 'ALTO' },
  { icon: Key, text: '"MiNombre123" como password', risk: 'ALTO' },
];

const SOLUTIONS = [
  { icon: Shield, text: 'Bitwarden genera claves únicas', benefit: '30+ chars' },
  { icon: Lock, text: 'Una sola Master Password', benefit: '1 a memorizar' },
  { icon: Smartphone, text: '2FA en todo (Authenticator)', benefit: 'Imposible' },
];

const STEPS = [
  { num: '01', title: 'Crear cuenta', desc: 'bitwarden.com → cuenta gratuita', time: '2 min' },
  { num: '02', title: 'Master Password', desc: '"MiPerroComePizza2026!" — frase larga', time: '1 min' },
  { num: '03', title: 'Instalar extensión', desc: 'Chrome Web Store → Bitwarden', time: '1 min' },
  { num: '04', title: 'Migrar 5 claves clave', desc: 'Email, banco, redes, trabajo, IA', time: '10 min' },
  { num: '05', title: 'Activar 2FA', desc: 'Google Authenticator o Authy', time: '5 min' },
];

export function G11S1Slide12Bitwarden() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">
        <motion.div {...m(0)} className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.emerald.text }}>Módulo 03 — Seguridad Digital</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">Bitwarden</h2>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>Tu Bóveda Digital</h2>
            <G11GreenLine className="max-w-xs mb-2" />
            <p className="text-white/40 text-sm">Gratis, open source, más seguro que tu cuaderno</p>
          </div>
          <motion.div {...m(0.05)} className="hidden sm:block flex-shrink-0 ml-8">
            <img src={securityImg} alt="" className="w-24 h-24 object-contain rounded-xl opacity-75"
              style={{ filter: 'drop-shadow(0 0 25px rgba(61,153,112,0.5))' }} />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left */}
          <div className="lg:col-span-5 space-y-3">
            <motion.div {...m(0.1)} className="p-4 rounded-xl border overflow-hidden relative"
              style={{ borderColor: G11.rose.border, background: `linear-gradient(135deg, ${G11.rose.bg}, rgba(0,0,0,0.3))` }}>
              <h4 className="text-[10px] font-black tracking-[0.15em] uppercase mb-3" style={{ color: G11.rose.text }}>❌ Problemas Comunes</h4>
              <ul className="space-y-2">
                {PROBLEMS.map(p => {
                  const Icon = p.icon;
                  return (
                    <li key={p.text} className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: G11.rose.text }} />
                      <span className="text-white/55 text-xs flex-1">{p.text}</span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded" style={{ color: G11.rose.text, background: 'rgba(251,113,133,0.12)' }}>{p.risk}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div {...m(0.2)} className="p-4 rounded-xl border"
              style={{ borderColor: G11.emerald.border, background: `linear-gradient(135deg, ${G11.emerald.bg}, rgba(0,0,0,0.3))` }}>
              <h4 className="text-[10px] font-black tracking-[0.15em] uppercase mb-3" style={{ color: G11.emerald.text }}>✅ Solución: Bitwarden + 2FA</h4>
              <ul className="space-y-2">
                {SOLUTIONS.map(s => {
                  const Icon = s.icon;
                  return (
                    <li key={s.text} className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: G11.emerald.text }} />
                      <span className="text-white/55 text-xs flex-1">{s.text}</span>
                      <span className="text-[9px] font-mono font-bold" style={{ color: G11.emerald.text }}>{s.benefit}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div {...m(0.3)} className="p-4 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <h4 className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-3">Fuerza de Password</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-white/40 font-mono">MiNombre123</span>
                    <span className="font-bold" style={{ color: G11.rose.text }}>2 min</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-full rounded-full" style={{ background: G11.rose.dot }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-white/40 font-mono">k$9#mP!qR2&xL7...</span>
                    <span className="font-bold" style={{ color: G11.emerald.text }}>3B años</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.7, duration: 0.8 }}
                      className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${G11.emerald.dot}, ${G11.cyan.dot})` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Steps */}
          <div className="lg:col-span-7">
            <motion.div {...m(0.12)} className="p-5 rounded-xl border h-full"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}>
              <h4 className="text-[10px] font-black tracking-[0.15em] uppercase mb-4" style={{ color: G11.emerald.text }}>🚀 Setup en 20 minutos</h4>
              <div className="space-y-2.5">
                {STEPS.map((step, i) => (
                  <motion.div key={step.num} {...m(0.22 + i * 0.06)}
                    className="flex items-start gap-3 p-3 rounded-xl border"
                    style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 font-mono"
                      style={{ background: G11.emerald.bg, color: G11.emerald.text, border: `1px solid ${G11.emerald.border}` }}>
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-white font-black text-sm">{step.title}</h5>
                        <span className="text-[10px] font-mono text-white/25">{step.time}</span>
                      </div>
                      <p className="text-white/40 text-xs mt-0.5">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
