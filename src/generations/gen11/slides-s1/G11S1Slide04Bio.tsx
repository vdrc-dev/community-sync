/**
 * Slide 04 — Bio: Vicente Donoso
 * "No soy un gurú de la tecnología. Soy un arquitecto que descubrió
 *  que los procesos importan más que las herramientas."
 */
import { motion } from 'framer-motion';
import { Mail, Linkedin, Building2, GraduationCap, Briefcase, Users } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN, VDRC_GREEN_DIM } from './theme';
import logoVdrc from '@/assets/logo-vdrc.png';
import vicentePhoto from '@/assets/vicente-donoso.png';

const BIO = [
  { icon: GraduationCap, label: 'Arquitecto', detail: 'Universidad Austral de Chile (UACH)' },
  { icon: GraduationCap, label: 'Magíster', detail: 'Desarrollo e Inversión Inmobiliaria — ESE Business School' },
  { icon: Building2, label: 'Socio', detail: 'Winteri Arquitectos (Chile / España)' },
  { icon: Briefcase, label: 'Asesor', detail: 'Productividad, estrategia y transformación digital' },
];

const CLIENTS = ['Territoria', 'GPS Property', 'Socovesa / PMG', 'BTG Pactual', 'Epysa'];

export function G11S1Slide04Bio() {
  const m = useG11Motion();

  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 80% at 25% 50%, rgba(61,153,112,0.06), transparent 70%)'
      }} />

      {/* LEFT */}
      <div className="relative z-10 w-full sm:w-[52%] flex flex-col justify-center px-12 sm:px-20 py-12">
        <motion.div {...m(0)} className="mb-6">
          <img src={logoVdrc} alt="VDRC" className="h-8 mb-5 opacity-60" />
          {/* Pull quote */}
          <blockquote className="text-white/60 text-sm sm:text-base font-light leading-relaxed italic max-w-sm mb-1">
            "No soy un gurú de la tecnología.
          </blockquote>
          <blockquote className="text-white font-black text-sm sm:text-base leading-relaxed max-w-sm">
            Soy un arquitecto que descubrió que los procesos importan más que las herramientas."
          </blockquote>
        </motion.div>

        <motion.div {...m(0.1)} className="mb-6">
          <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none mb-1">Vicente</h2>
          <h2 className="text-5xl sm:text-7xl font-black uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>Donoso</h2>
          <G11GreenLine className="max-w-[180px] mb-4" />
        </motion.div>

        {/* Bio lines */}
        <div className="space-y-2 mb-6">
          {BIO.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} {...m(0.15 + i * 0.06)}
                className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: G11.emerald.bg, border: `1px solid ${G11.emerald.border}` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: G11.emerald.text }} />
                </div>
                <div>
                  <span className="text-white/45 text-xs font-bold uppercase tracking-wide">{item.label}: </span>
                  <span className="text-white/65 text-xs">{item.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact + Clients */}
        <motion.div {...m(0.5)} className="flex flex-wrap gap-3">
          <a href="mailto:vicente@vdrc.cl" className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono"
            style={{ borderColor: VDRC_GREEN_DIM, color: G11.emerald.text, background: 'rgba(61,153,112,0.06)' }}>
            <Mail className="w-3 h-3" /> vicente@vdrc.cl
          </a>
          <a href="https://linkedin.com/in/vicentedonosor" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono"
            style={{ borderColor: G11.blue.border, color: G11.blue.text, background: G11.blue.bg }}>
            <Linkedin className="w-3 h-3" /> linkedin.com/in/vicentedonosor
          </a>
        </motion.div>

        <motion.div {...m(0.6)} className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Users className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
            <span className="text-white/25 text-[10px] uppercase tracking-widest font-bold">Clientes:</span>
            {CLIENTS.map((c, i) => (
              <span key={c} className="text-white/45 text-[10px]">
                {c}{i < CLIENTS.length - 1 ? ',' : ' y más'}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT — Vicente photo */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[46%] overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: 'linear-gradient(90deg, #181c1b, transparent)' }} />
        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(180deg, #181c1b 0%, transparent 15%, transparent 75%, #181c1b 100%)' }} />
        <motion.img
          src={vicentePhoto}
          alt="Vicente Donoso"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>
    </G11Shell>
  );
}
