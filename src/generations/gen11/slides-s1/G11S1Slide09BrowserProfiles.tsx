import { motion } from 'framer-motion';
import { Chrome, Globe, User, Briefcase, Users } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import browserImg from '@/assets/gen11-browser-icon.png';

const PROFILES = [
  {
    browser: 'Chrome', icon: Chrome, context: 'Personal', contextIcon: User, accent: G11.blue,
    uses: ['Gmail personal', 'YouTube', 'Redes sociales', 'Banking'],
    extensions: ['Bitwarden', 'uBlock Origin'],
    emoji: '🏠',
  },
  {
    browser: 'Edge / Chrome', icon: Globe, context: 'Trabajo', contextIcon: Briefcase, accent: G11.emerald,
    uses: ['Email corporativo', 'Drive / OneDrive', 'Slack / Teams', 'Tools de trabajo'],
    extensions: ['Bitwarden', 'Granola', 'Grammarly'],
    emoji: '💼',
  },
  {
    browser: 'Chrome Perfil', icon: Chrome, context: 'Clientes', contextIcon: Users, accent: G11.amber,
    uses: ['Presentaciones', 'Demos en vivo', 'Portal del cliente', 'Sin distracciones'],
    extensions: ['Bitwarden', 'Loom'],
    emoji: '🤝',
  },
];

export function G11S1Slide09BrowserProfiles() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">
        <motion.div {...m(0)} className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.amber.text }}>Módulo 02 — Navegadores</p>
            <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">3 Perfiles</h2>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>3 Contextos</h2>
            <G11GreenLine className="max-w-xs mb-2" />
            <p className="text-white/40 text-sm mt-2">Cada perfil: propias extensiones, bookmarks, sesiones y cookies</p>
          </div>
          <motion.div {...m(0.1)} className="hidden sm:block flex-shrink-0 ml-8">
            <img src={browserImg} alt="" className="w-24 h-24 object-contain rounded-xl opacity-70"
              style={{ filter: 'drop-shadow(0 0 20px rgba(251,146,60,0.4))' }} />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl">
          {PROFILES.map((profile, i) => {
            const Icon = profile.icon;
            const CtxIcon = profile.contextIcon;
            return (
              <motion.div key={profile.context} {...m(0.1 + i * 0.1)}
                className="p-5 rounded-xl border relative overflow-hidden"
                style={{ borderColor: profile.accent.border, background: `linear-gradient(160deg, ${profile.accent.bg}, rgba(0,0,0,0.25))` }}>

                {/* Emoji watermark */}
                <div className="absolute -right-2 -bottom-2 text-6xl select-none pointer-events-none opacity-[0.07]">
                  {profile.emoji}
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${profile.accent.border}` }}>
                    <Icon className="w-5 h-5" style={{ color: profile.accent.text }} />
                  </div>
                  <div>
                    <span className="text-white font-black text-sm">{profile.context}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <CtxIcon className="w-3 h-3 text-white/35" />
                      <span className="text-xs text-white/40">{profile.browser}</span>
                    </div>
                  </div>
                </div>

                {/* Uses */}
                <div className="mb-4">
                  <span className="text-[9px] font-black tracking-[0.15em] uppercase mb-2 block" style={{ color: profile.accent.text }}>Usos</span>
                  <ul className="space-y-1.5">
                    {profile.uses.map(u => (
                      <li key={u} className="flex items-center gap-2 text-xs text-white/55">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: profile.accent.dot }} />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extensions */}
                <div>
                  <span className="text-[9px] font-black tracking-[0.15em] uppercase mb-2 block" style={{ color: profile.accent.text }}>Extensiones</span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.extensions.map(ext => (
                      <span key={ext} className="px-2.5 py-1 rounded-lg text-[10px] font-bold border"
                        style={{ color: profile.accent.text, borderColor: profile.accent.border, background: 'rgba(0,0,0,0.35)' }}>
                        {ext}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.55)} className="mt-5 max-w-xl">
          <div className="px-4 py-3 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-white/55 text-xs">
              💡 <strong className="text-white/80">Pro tip:</strong> Chrome → click avatar → "Agregar perfil" → nómbralo con el contexto
            </span>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
