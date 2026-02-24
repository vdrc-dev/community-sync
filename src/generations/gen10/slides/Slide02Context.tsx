import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Mail, Phone, Quote, CheckCircle, Sparkles, Building } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, EducationItem, ExperienceData } from '@/hooks/useSlideContent';
import vicentePhoto from '@/assets/vicente-donoso.jpg';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

// Default fallback data
const DEFAULT_EDUCATION: EducationItem[] = [
  { title: 'Arquitecto', institution: 'Universidad Austral de Chile', icon: '🎓' },
  { title: 'Magíster Desarrollo Inmobiliario', institution: 'ESE Business School', icon: '📊' },
  { title: 'Diplomado Gestión Pyme', institution: 'PUC Chile', icon: '💼' },
];

const DEFAULT_EXPERIENCE: ExperienceData = {
  companies: ['Territoria (MUT)', 'Winteri', 'Archiplan', 'GPS Property', 'Socovesa/PMG', 'Sokobox', 'Indubal', 'BTG Pactual', 'Epysa'],
  currentPartner: { role: 'Socio en', company: 'Winteri Arquitectos' },
  philosophy: {
    title: 'Afilar la Sierra',
    quote: 'La gente pasa mucho tiempo haciendo tareas repetitivas en lugar de generar sistemas. Delega en sistemas tecnológicos antes que en personas.',
    attribution: 'Vicente Donoso, inspirado en Stephen Covey',
  },
};

export function Slide02Context() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(3);
  const m = useS1Motion();

  const education = content.education || DEFAULT_EDUCATION;
  const experience = content.experience || DEFAULT_EXPERIENCE;

  return (
    <S1Shell
      footerLabel="TU INSTRUCTOR"
      className="flex flex-col"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_30%,_rgba(16,185,129,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_70%,_rgba(6,182,212,0.1),_transparent_60%)]" />
      </>}
    >
      {/* Floating orbs */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-20 left-40 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ background: 'hsl(160 65% 45% / 0.1)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-[300px] h-[300px] rounded-full blur-[100px]"
            style={{ background: 'hsl(185 70% 50% / 0.1)' }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* Header */}
      <motion.div {...m(0.1)} className="relative z-20 px-8 pt-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-full border flex items-center gap-2"
            style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
            <Sparkles className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
            <span className="text-sm font-bold tracking-wider uppercase" style={{ color: S1_ACCENT.emerald.text }}>Tu Instructor</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-4 sm:gap-6 relative z-10 px-6 sm:px-8 pb-12">
        
        {/* Left Column - Photo + Name */}
        <motion.div {...m(0.2)} className="col-span-12 lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 blur-3xl rounded-full" style={{ background: S1_ACCENT.emerald.glow }} />
            <motion.div 
              className="absolute -inset-2 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, hsl(160 65% 45% / 0.8), hsl(185 70% 50% / 0.8), hsl(217 70% 55% / 0.6), hsl(263 60% 55% / 0.4), hsl(160 65% 45% / 0.8))',
              }}
              {...(isExporting ? {} : {
                animate: { rotate: 360 },
                transition: { duration: 8, repeat: Infinity, ease: "linear" }
              })}
            />
            <div className="absolute -inset-1 rounded-full bg-[#030303]" />
            <div className="relative">
              <img src={vicentePhoto} alt="Vicente Donoso" className="w-36 sm:w-44 h-36 sm:h-44 rounded-full object-cover" />
            </div>
            <motion.div 
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full border-4 border-[#030303]"
              style={{ background: S1_ACCENT.emerald.dot }}
              {...(isExporting ? {} : {
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { delay: 0.8, type: "spring" }
              })}
            >
              <CheckCircle className="w-5 h-5 text-white" fill="currentColor" />
            </motion.div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight text-center">Vicente Donoso</h2>
          <p className="text-lg font-medium mb-5 text-center" style={{ color: S1_ACCENT.emerald.text }}>Arquitecto & Consultor Digital</p>
          
          <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
            <motion.a 
              href="mailto:vicente@vdrc.cl" 
              className="group flex items-center gap-3 px-5 py-3 bg-white/[0.03] rounded-xl border border-white/10 text-white/80 transition-all"
              whileHover={isExporting ? {} : { x: 5 }}
            >
              <div className="p-2 rounded-lg border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                <Mail className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              </div>
              <span className="text-sm font-medium">vicente@vdrc.cl</span>
            </motion.a>
            <motion.div 
              className="group flex items-center gap-3 px-5 py-3 bg-white/[0.03] rounded-xl border border-white/10 text-white/80"
              whileHover={isExporting ? {} : { x: 5 }}
            >
              <div className="p-2 rounded-lg border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                <Phone className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              </div>
              <div>
                <span className="text-sm font-medium">+56 9 7699 8520</span>
                <p className="text-white/40 text-xs">WhatsApp</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Info Cards */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {/* Education Card */}
            <motion.div {...m(0.3)} className="relative group">
              <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-5 h-full group-hover:border-white/20 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${S1_ACCENT.emerald.dot}, ${S1_ACCENT.cyan.dot})` }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                    <GraduationCap className="w-6 h-6" style={{ color: S1_ACCENT.emerald.text }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Formación</h3>
                </div>
                <div className="space-y-2.5">
                  {education.map((edu, i) => (
                    <motion.div key={i} className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-xl border-l-2" style={{ borderColor: S1_ACCENT.emerald.border }} {...m(0.4 + i * 0.1)}>
                      <span className="text-xl">{edu.icon}</span>
                      <div>
                        <p className="text-white font-bold text-sm">{edu.title}</p>
                        <p className="text-white/50 text-xs">{edu.institution}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience Card */}
            <motion.div {...m(0.4)} className="relative group">
              <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-5 h-full group-hover:border-white/20 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${S1_ACCENT.cyan.dot}, ${S1_ACCENT.blue.dot})` }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                    <Briefcase className="w-6 h-6" style={{ color: S1_ACCENT.emerald.text }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Experiencia</h3>
                </div>
                <p className="text-white/50 text-xs mb-3 uppercase tracking-wider">Asesorías en múltiples industrias:</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {experience.companies.map((company, i) => (
                    <motion.span key={i} className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-white/70 text-xs cursor-default"
                      {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.5 + i * 0.05 } })}
                    >{company}</motion.span>
                  ))}
                </div>
                <div className="p-3 rounded-xl flex items-center gap-3 border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                  <Building className="w-5 h-5" style={{ color: S1_ACCENT.emerald.text }} />
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider" style={{ color: S1_ACCENT.emerald.text }}>{experience.currentPartner.role}</p>
                    <p className="text-white font-bold">{experience.currentPartner.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mission Card */}
          <motion.div {...m(0.5)} className="relative group">
            <div className="relative bg-white/[0.02] backdrop-blur-sm border rounded-2xl p-6 overflow-hidden" style={{ borderColor: S1_ACCENT.emerald.border }}>
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${S1_ACCENT.emerald.dot}, ${S1_ACCENT.cyan.dot}, ${S1_ACCENT.emerald.dot})` }} />
              <div className="absolute -right-4 -top-4 text-[180px] font-serif leading-none pointer-events-none select-none" style={{ color: 'hsl(160 65% 45% / 0.06)' }}>"</div>
              <div className="flex items-start gap-5 relative z-10">
                <motion.div className="text-5xl" {...(isExporting ? {} : { animate: { rotate: [-5, 5, -5] }, transition: { duration: 2, repeat: Infinity } })}>🪓</motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg" style={{ background: S1_ACCENT.emerald.bg }}>
                      <Quote className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
                    </div>
                    <p className="font-bold text-sm uppercase tracking-wider" style={{ color: S1_ACCENT.emerald.text }}>Mi Filosofía: {experience.philosophy.title}</p>
                  </div>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    "{experience.philosophy.quote.split('. ')[0]}.
                    <span className="font-bold" style={{ color: S1_ACCENT.emerald.text }}> {experience.philosophy.quote.split('. ')[1]}</span>"
                  </p>
                  <p className="text-white/40 text-sm mt-3 font-medium">— {experience.philosophy.attribution}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </S1Shell>
  );
}
