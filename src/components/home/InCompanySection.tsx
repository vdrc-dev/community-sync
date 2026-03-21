import { motion } from 'framer-motion';
import { Building2, ExternalLink, Calendar, Users, ChevronRight, Briefcase, ArrowRight } from 'lucide-react';

const IN_COMPANY_PROGRAMS = [
  {
    code: '250619',
    client: 'Manuia',
    date: '2025-06-19',
    sector: 'Consultoría',
    hue: 160,
    description: 'Programa corporativo de productividad digital con IA para equipos de consultoría.',
  },
  {
    code: '250811',
    client: 'Epysa',
    date: '2025-08-11',
    sector: 'Ingeniería',
    hue: 200,
    description: 'Capacitación intensiva en herramientas de IA para equipos de ingeniería y operaciones.',
  },
  {
    code: '250826',
    client: 'BTG Pactual',
    date: '2025-08-26',
    sector: 'Banca & Finanzas',
    hue: 263,
    description: 'Taller de productividad con IA para profesionales del sector financiero.',
  },
  {
    code: '260312',
    client: 'Grupo Amoble',
    date: '2026-03-12',
    sector: 'Retail & Manufactura',
    hue: 45,
    description: 'Programa de transformación digital para equipos de retail y manufactura.',
  },
  {
    code: '260503',
    client: 'SCM',
    date: '2026-05-03',
    sector: 'Corporativo',
    hue: 340,
    description: 'Capacitación corporativa en productividad digital y automatización con IA.',
  },
] as const;

export function InCompanySection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="mesh-gradient opacity-10" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] uppercase text-accent/50">
            <Building2 className="w-3.5 h-3.5 text-accent/40" />
            /// IN_COMPANY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight mt-3">
            Talleres <span className="text-gradient-live">corporativos</span>
          </h2>
          <p className="text-muted-foreground/60 max-w-2xl text-base sm:text-lg mt-3 font-light">
            Programas a medida para empresas — desde banca hasta retail. El mismo contenido intensivo adaptado a las necesidades de cada equipo.
          </p>
          <div className="mt-8 max-w-xs">
            <div className="separator-diamond"><span /></div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill">
            <Building2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">5 empresas</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium">4 industrias</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Jun 2025 — May 2026</span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-6xl">
          {IN_COMPANY_PROGRAMS.map((program, index) => (
            <motion.div
              key={program.code}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div
                className="absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                style={{ background: `hsl(${program.hue} 70% 55% / 0.08)` }}
              />

              <div className="glass-prismatic glass-specular card-light-leak relative h-full p-6 rounded-2xl group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden border border-white/[0.04]">
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, hsl(${program.hue} 70% 55%), transparent)` }}
                />

                {/* Serif anchor */}
                <div
                  className="absolute -bottom-3 -right-1 select-none pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500"
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: '72px',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    lineHeight: 0.85,
                    color: `hsl(${program.hue} 60% 55%)`,
                  }}
                >
                  IC
                </div>

                {/* Icon + sector badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative"
                    style={{
                      background: `linear-gradient(135deg, hsl(${program.hue} 70% 55% / 0.12), hsl(${program.hue} 70% 55% / 0.04))`,
                      border: `1px solid hsl(${program.hue} 70% 55% / 0.2)`,
                    }}
                  >
                    <Building2 className="w-5 h-5" style={{ color: `hsl(${program.hue} 70% 55%)` }} />
                    <div
                      className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `hsl(${program.hue} 70% 55% / 0.2)` }}
                    />
                  </div>
                  <span
                    className="text-[9px] font-mono px-2.5 py-1 rounded-full border"
                    style={{
                      background: `hsl(${program.hue} 70% 55% / 0.06)`,
                      borderColor: `hsl(${program.hue} 70% 55% / 0.15)`,
                      color: `hsl(${program.hue} 70% 55%)`,
                    }}
                  >
                    {program.sector}
                  </span>
                </div>

                {/* Client name */}
                <h3 className="text-lg font-semibold mb-1.5 group-hover:text-foreground transition-colors">
                  {program.client}
                </h3>

                {/* Date */}
                <p className="text-xs text-muted-foreground/50 font-mono mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {new Date(program.date).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground/70 leading-relaxed font-light">
                  {program.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.a
            href="mailto:contacto@vdrc.cl?subject=Consulta%20In-Company"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: IN_COMPANY_PROGRAMS.length * 0.08, duration: 0.7 }}
            className="group relative flex flex-col items-center justify-center h-full min-h-[200px] rounded-2xl border border-dashed border-white/[0.06] hover:border-accent/20 hover:bg-accent/5 transition-all duration-500 p-6 text-center cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-6 h-6 text-accent" />
            </div>
            <p className="text-sm font-semibold text-accent/80 group-hover:text-accent transition-colors mb-1">
              ¿Quieres un taller para tu empresa?
            </p>
            <p className="text-xs text-muted-foreground/50 mb-3">
              Programas a medida para equipos de 5 a 50 personas
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent/60 group-hover:text-accent transition-colors">
              Contactar
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
