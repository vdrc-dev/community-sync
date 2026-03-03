import { motion } from 'framer-motion';
import { Chrome, Globe, User, Briefcase, Users, ArrowRight } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const PROFILES = [
  {
    browser: 'Chrome', icon: Chrome, context: 'Personal', contextIcon: User, accent: G11.blue,
    uses: ['Gmail personal', 'YouTube', 'Redes sociales', 'Banking'],
    extensions: ['Bitwarden', 'uBlock Origin'],
  },
  {
    browser: 'Edge', icon: Globe, context: 'Trabajo', contextIcon: Briefcase, accent: G11.emerald,
    uses: ['Email corporativo', 'Drive / OneDrive', 'Tools de trabajo', 'Slack / Teams'],
    extensions: ['Bitwarden', 'Granola', 'Grammarly'],
  },
  {
    browser: 'Chrome 2', icon: Chrome, context: 'Clientes', contextIcon: Users, accent: G11.amber,
    uses: ['Presentaciones', 'Demos en vivo', 'Portal del cliente', 'Sin distracciones'],
    extensions: ['Bitwarden', 'Loom'],
  },
];

export function G11S1Slide09BrowserProfiles() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,_rgba(245,158,11,0.1),_transparent_70%)]" />}>
      <div className="relative z-10 w-full max-w-6xl px-6 sm:px-12">
        <motion.div {...m(0)} className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">3 Perfiles, 3 Contextos</h2>
          <p className="text-white/40 mt-2 text-sm">Cada perfil tiene sus propias extensiones, bookmarks, sesiones y cookies</p>
        </motion.div>

        {/* Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {PROFILES.map((profile, i) => {
            const Icon = profile.icon;
            const CtxIcon = profile.contextIcon;
            return (
              <motion.div key={profile.context} {...m(0.1 + i * 0.12)}
                className="relative p-[1px] rounded-2xl overflow-hidden"
                style={{ background: `linear-gradient(180deg, ${profile.accent.border}, transparent 50%)` }}>
                <div className="p-5 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl">
                  {/* Browser Header */}
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.06)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: profile.accent.bg, boxShadow: `0 0 20px ${profile.accent.glow}` }}>
                      <Icon className="w-5 h-5" style={{ color: profile.accent.text }} />
                    </div>
                    <div>
                      <span className="text-white font-bold text-sm">{profile.browser}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <CtxIcon className="w-3 h-3 text-white/40" />
                        <span className="text-xs" style={{ color: profile.accent.text }}>{profile.context}</span>
                      </div>
                    </div>
                  </div>

                  {/* Uses */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2 block">Usos</span>
                    <ul className="space-y-1.5">
                      {profile.uses.map(u => (
                        <li key={u} className="flex items-center gap-2 text-xs text-white/60">
                          <div className="w-1 h-1 rounded-full" style={{ background: profile.accent.dot }} />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extensions */}
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2 block">Extensiones</span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.extensions.map(ext => (
                        <span key={ext} className="px-2 py-1 rounded-md text-[10px] font-medium border" style={{ color: profile.accent.text, borderColor: profile.accent.border, background: profile.accent.bg }}>
                          {ext}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tip */}
        <motion.div {...m(0.6)} className="mt-6 flex justify-center">
          <div className="px-5 py-3 rounded-xl border bg-white/[0.02]" style={{ borderColor: 'hsl(0 0% 100% / 0.08)' }}>
            <span className="text-white/60 text-xs">💡 <strong className="text-white/80">Pro tip:</strong> En Chrome, click en tu avatar → "Agregar perfil" → Nombra con el contexto</span>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
