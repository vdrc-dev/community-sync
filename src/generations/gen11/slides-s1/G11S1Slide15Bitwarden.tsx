/**
 * Slide 15 — Contraseñas: Bitwarden + Comparativa de gestores
 * Bitwarden / Apple Passwords / 1Password
 */
import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, AlertTriangle, Eye, Key } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const MANAGERS = [
  {
    short: 'BW', name: 'Bitwarden',
    tier: 'GRATIS', badge: '✓ Recomendado',
    desc: 'Open source. Funciona en Windows, Mac, Android, iOS. La mejor opción para empezar.',
    pros: ['Gratis, open-source', 'Multiplataforma', 'Ideal para equipos'],
    accent: G11.emerald, highlight: true,
    url: 'bitwarden.com',
  },
  {
    short: 'AP', name: 'Apple Passwords',
    tier: 'NATIVO', badge: 'Ecosistema Apple',
    desc: 'Ya viene en tu iPhone y Mac. Cero configuración. Ideal si vives en el ecosistema Apple.',
    pros: ['Nativo iOS/macOS', 'Sin configuración', 'Gratis incluido'],
    accent: G11.blue,
  },
  {
    short: '1P', name: '1Password',
    tier: 'PREMIUM', badge: 'USD 3/mes',
    desc: 'La más pulida. Excelente para familias y equipos de trabajo.',
    pros: ['Interfaz premium', 'Travel mode', 'Gestión de equipo'],
    accent: G11.purple,
  },
];

const STEPS = [
  { num: '01', title: 'Crear cuenta', desc: 'bitwarden.com → cuenta gratuita', time: '2 min' },
  { num: '02', title: 'Master Password', desc: '"MiPerroComePizza2026!" — frase larga', time: '1 min' },
  { num: '03', title: 'Instalar extensión', desc: 'Chrome Web Store → Bitwarden', time: '1 min' },
  { num: '04', title: 'Migrar 5 claves clave', desc: 'Email, banco, redes, trabajo, IA', time: '10 min' },
  { num: '05', title: 'Activar 2FA', desc: 'Google Authenticator o Authy', time: '5 min' },
];

export function G11S1Slide15Bitwarden() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 70% at 20% 50%, rgba(61,153,112,0.05), transparent 70%)'
      }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-8">

        <motion.div {...m(0)} className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.emerald.text }}>
            Módulo 04 — Seguridad Digital
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase leading-none">Un Gestor</h2>
            <h2 className="text-4xl sm:text-6xl font-black uppercase leading-none" style={{ color: VDRC_GREEN }}>para Cada Necesidad</h2>
          </div>
          <G11GreenLine className="max-w-[240px] mt-4 mb-2" />
          <p className="text-white/30 text-xs">Tutorial Bitwarden: youtube.com/watch?v=ndhLzMtBEJM</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: 3 managers comparison */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MANAGERS.map((mgr, i) => (
              <motion.div key={mgr.name} {...m(0.1 + i * 0.08)}
                className="p-5 rounded-2xl border relative overflow-hidden"
                style={{
                  borderColor: mgr.highlight ? VDRC_GREEN : mgr.accent.border,
                  background: mgr.highlight
                    ? `linear-gradient(145deg, rgba(61,153,112,0.12), rgba(0,0,0,0.35))`
                    : `linear-gradient(145deg, ${mgr.accent.bg}, rgba(0,0,0,0.3))`,
                  boxShadow: mgr.highlight ? `0 0 30px rgba(61,153,112,0.10)` : undefined,
                }}>
                <div className="absolute -right-2 -bottom-3 text-6xl font-black leading-none select-none pointer-events-none"
                  style={{ color: mgr.accent.text, opacity: 0.06 }}>{mgr.short}</div>

                {/* Tier badge */}
                <div className="mb-4">
                  <span className="text-[9px] font-black tracking-widest px-2 py-1 rounded-full"
                    style={{
                      background: mgr.highlight ? 'rgba(61,153,112,0.15)' : 'rgba(0,0,0,0.3)',
                      border: `1px solid ${mgr.highlight ? VDRC_GREEN : mgr.accent.border}`,
                      color: mgr.highlight ? VDRC_GREEN : mgr.accent.text,
                    }}>
                    {mgr.tier}
                  </span>
                  {mgr.highlight && (
                    <span className="ml-2 text-[9px] font-black tracking-widest text-white/30">{mgr.badge}</span>
                  )}
                </div>

                <h3 className="text-lg font-black text-white mb-2">{mgr.name}</h3>
                <p className="text-white/40 text-[11px] leading-relaxed mb-3">{mgr.desc}</p>

                <ul className="space-y-1.5">
                  {mgr.pros.map(p => (
                    <li key={p} className="flex items-center gap-2 text-[10px] text-white/50">
                      <div className="w-1 h-1 rounded-full"
                        style={{ background: mgr.highlight ? VDRC_GREEN : mgr.accent.dot }} />
                      {p}
                    </li>
                  ))}
                </ul>

                {mgr.url && (
                  <p className="mt-3 text-[9px] font-mono" style={{ color: G11.emerald.text }}>{mgr.url}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right: Setup steps */}
          <div className="lg:col-span-5">
            <motion.div {...m(0.3)} className="p-5 rounded-2xl border h-full"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}>
              <p className="text-[9px] font-black tracking-[0.15em] uppercase mb-4" style={{ color: G11.emerald.text }}>
                🚀 Setup Bitwarden en 20 min
              </p>
              <div className="space-y-2.5">
                {STEPS.map((step, i) => (
                  <motion.div key={step.num} {...m(0.35 + i * 0.05)}
                    className="flex items-start gap-3 p-3 rounded-xl border"
                    style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ background: G11.emerald.bg, color: G11.emerald.text, border: `1px solid ${G11.emerald.border}` }}>
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-black text-xs">{step.title}</p>
                        <span className="text-[9px] font-mono text-white/20">{step.time}</span>
                      </div>
                      <p className="text-white/35 text-[10px] mt-0.5">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Password strength */}
              <div className="mt-4 space-y-2">
                <p className="text-[9px] font-black tracking-widest uppercase text-white/25">Fuerza de contraseña</p>
                {[
                  { label: 'MiNombre123', strength: 8, color: G11.rose, label2: '2 min' },
                  { label: 'k$9#mP!qR2&xL7...', strength: 100, color: G11.emerald, label2: '3B años' },
                ].map(p => (
                  <div key={p.label}>
                    <div className="flex justify-between text-[9px] mb-1">
                      <span className="font-mono text-white/30">{p.label}</span>
                      <span className="font-black" style={{ color: p.color.text }}>{p.label2}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${p.strength}%` }}
                        transition={{ delay: 0.8, duration: 0.9 }}
                        className="h-full rounded-full" style={{ background: p.color.dot }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
