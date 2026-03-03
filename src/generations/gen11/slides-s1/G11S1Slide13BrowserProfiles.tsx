/**
 * Slide 13 — Navegadores y Perfiles
 * "Un perfil para el trabajo, otro para lo personal."
 */
import { motion } from 'framer-motion';
import { Chrome, Globe, User, Briefcase, Users } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const PROFILES = [
  {
    browser: 'Chrome', icon: Chrome, context: 'Personal',
    contextIcon: User, accent: G11.blue, emoji: '🏠',
    uses: ['Gmail personal', 'YouTube', 'Redes sociales', 'Banking'],
    extensions: ['Bitwarden', 'uBlock Origin'],
    tip: 'Banco, compras y streaming sin cruzar con el trabajo.',
  },
  {
    browser: 'Edge / Chrome', icon: Globe, context: 'Trabajo',
    contextIcon: Briefcase, accent: G11.emerald, emoji: '💼',
    uses: ['Email corporativo', 'Drive / OneDrive', 'Slack / Teams', 'Tools de trabajo'],
    extensions: ['Bitwarden', 'Granola', 'Grammarly'],
    tip: 'Perfil laboral aislado. Cada sesión en su propio espacio.',
  },
  {
    browser: 'Chrome Perfil', icon: Chrome, context: 'Clientes',
    contextIcon: Users, accent: G11.amber, emoji: '🤝',
    uses: ['Presentaciones', 'Demos en vivo', 'Portal del cliente', 'Sin distracciones'],
    extensions: ['Bitwarden', 'Loom'],
    tip: 'Nada de notificaciones ni pestañas personales durante demos.',
  },
];

const STEPS = ['Crear perfiles', 'Asignar colores', 'Anclar accesos', 'Extensiones por perfil'];

export function G11S1Slide13BrowserProfiles() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 70% at 20% 50%, rgba(251,146,60,0.04), transparent 70%)'
      }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-8">

        <motion.div {...m(0)} className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.amber.text }}>
              Módulo 03 — Navegadores
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              3 Perfiles
            </h2>
            <h2 className="text-4xl sm:text-6xl font-black uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>
              3 Contextos
            </h2>
            <G11GreenLine className="max-w-[200px] mb-2" />
            <p className="text-white/35 text-sm">Un perfil para el trabajo, otro para lo personal. Así de simple, así de potente.</p>
          </div>

          {/* Quick steps */}
          <motion.div {...m(0.1)} className="hidden sm:flex flex-col gap-2 flex-shrink-0 ml-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black"
                  style={{ background: G11.amber.bg, border: `1px solid ${G11.amber.border}`, color: G11.amber.text }}>
                  {i + 1}
                </div>
                <span className="text-white/40 text-xs">{s}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl">
          {PROFILES.map((profile, i) => {
            const Icon = profile.icon;
            const CtxIcon = profile.contextIcon;
            return (
              <motion.div key={profile.context} {...m(0.12 + i * 0.08)}
                className="p-5 rounded-2xl border relative overflow-hidden"
                style={{ borderColor: profile.accent.border, background: `linear-gradient(145deg, ${profile.accent.bg}, rgba(0,0,0,0.3))` }}>

                <div className="absolute -right-2 -bottom-3 text-6xl select-none pointer-events-none opacity-[0.06]">
                  {profile.emoji}
                </div>

                <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${profile.accent.border}` }}>
                    <Icon className="w-5 h-5" style={{ color: profile.accent.text }} />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">{profile.context}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <CtxIcon className="w-3 h-3 text-white/30" />
                      <span className="text-[10px] text-white/35">{profile.browser}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[9px] font-black tracking-[0.15em] uppercase mb-2" style={{ color: profile.accent.text }}>Usos</p>
                  <ul className="space-y-1.5">
                    {profile.uses.map(u => (
                      <li key={u} className="flex items-center gap-2 text-[11px] text-white/50">
                        <div className="w-1 h-1 rounded-full" style={{ background: profile.accent.dot }} />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <p className="text-[9px] font-black tracking-[0.15em] uppercase mb-2" style={{ color: profile.accent.text }}>Extensiones</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.extensions.map(ext => (
                      <span key={ext} className="px-2 py-0.5 rounded text-[9px] font-bold border"
                        style={{ color: profile.accent.text, borderColor: profile.accent.border, background: 'rgba(0,0,0,0.35)' }}>
                        {ext}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-white/25 text-[10px] italic leading-relaxed">{profile.tip}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.5)} className="mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border"
            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-white/40 text-xs">
              💡 <strong className="text-white/60">Chrome:</strong> click avatar → "Agregar perfil" → asígnale un nombre y color de contexto
            </span>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
