import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Mail, Phone, Quote, CheckCircle, Sparkles, Building } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, EducationItem, ExperienceData } from '@/hooks/useSlideContent';
import vicentePhoto from '@/assets/vicente-donoso.jpg';

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

  // Use data from DB or fallback to defaults
  const education = content.education || DEFAULT_EDUCATION;
  const experience = content.experience || DEFAULT_EXPERIENCE;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#050a10] flex flex-col font-sans px-8 py-6 selection:bg-teal-500/30">
      
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_30%,_rgba(20,184,166,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_70%,_rgba(6,182,212,0.1),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Floating orbs */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-20 left-40 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* Header */}
      <motion.div {...getMotionProps(0.1)} className="relative z-20 mb-4">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-teal-400 text-sm font-bold tracking-wider uppercase">Tu Instructor</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column - Photo + Name */}
        <motion.div {...getMotionProps(0.2)} className="col-span-4 flex flex-col items-center justify-center">
          {/* Photo with holographic ring */}
          <div className="relative mb-6">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-teal-500/20 blur-3xl rounded-full" />
            
            {/* Holographic ring */}
            <motion.div 
              className="absolute -inset-2 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(20,184,166,0.8), rgba(6,182,212,0.8), rgba(59,130,246,0.6), rgba(168,85,247,0.4), rgba(20,184,166,0.8))',
              }}
              {...(isExporting ? {} : {
                animate: { rotate: 360 },
                transition: { duration: 8, repeat: Infinity, ease: "linear" }
              })}
            />
            
            {/* Inner dark ring */}
            <div className="absolute -inset-1 rounded-full bg-[#050a10]" />
            
            {/* Photo */}
            <div className="relative">
              <img 
                src={vicentePhoto} 
                alt="Vicente Donoso" 
                className="w-44 h-44 rounded-full object-cover"
              />
            </div>
            
            {/* Verification badge */}
            <motion.div 
              className="absolute -bottom-1 -right-1 p-1.5 bg-teal-500 rounded-full border-4 border-[#050a10]"
              {...(isExporting ? {} : {
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { delay: 0.8, type: "spring" }
              })}
            >
              <CheckCircle className="w-5 h-5 text-white" fill="currentColor" />
            </motion.div>
          </div>
          
          <h2 className="text-4xl font-black text-white mb-1 tracking-tight text-center">
            Vicente Donoso
          </h2>
          <p className="text-teal-400 text-lg font-medium mb-5 text-center">
            Arquitecto & Consultor Digital
          </p>
          
          {/* Contact Pills */}
          <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
            <motion.a 
              href="mailto:vicente@vdrc.cl" 
              className="group flex items-center gap-3 px-5 py-3 bg-white/[0.03] rounded-xl border border-white/10 text-white/80 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all"
              whileHover={isExporting ? {} : { x: 5 }}
            >
              <div className="p-2 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-colors">
                <Mail className="w-4 h-4 text-teal-400" />
              </div>
              <span className="text-sm font-medium">vicente@vdrc.cl</span>
            </motion.a>
            <motion.div 
              className="group flex items-center gap-3 px-5 py-3 bg-white/[0.03] rounded-xl border border-white/10 text-white/80"
              whileHover={isExporting ? {} : { x: 5 }}
            >
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Phone className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <span className="text-sm font-medium">+56 9 7699 8520</span>
                <p className="text-white/40 text-xs">WhatsApp</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Info Cards */}
        <div className="col-span-8 flex flex-col gap-4">
          
          {/* Top row - Education & Experience */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            
            {/* Education Card */}
            <motion.div {...getMotionProps(0.3)} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-teal-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative bg-[#0a1520]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-5 h-full group-hover:border-teal-500/30 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-2xl" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-teal-500/20 rounded-xl border border-teal-500/30">
                    <GraduationCap className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Formación</h3>
                </div>
                
                <div className="space-y-2.5">
                  {education.map((edu, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-xl border-l-2 border-teal-500/60 hover:bg-white/[0.05] transition-colors"
                      {...getMotionProps(0.4 + i * 0.1)}
                    >
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
            <motion.div {...getMotionProps(0.4)} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-teal-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative bg-[#0a1520]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-5 h-full group-hover:border-teal-500/30 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-teal-500/20 rounded-xl border border-teal-500/30">
                    <Briefcase className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Experiencia</h3>
                </div>
                
                <p className="text-white/50 text-xs mb-3 uppercase tracking-wider">Asesorías en múltiples industrias:</p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {experience.companies.map((company, i) => (
                    <motion.span 
                      key={i} 
                      className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-white/70 text-xs hover:bg-teal-500/10 hover:border-teal-500/30 transition-colors cursor-default"
                      {...(isExporting ? {} : {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { delay: 0.5 + i * 0.05 }
                      })}
                    >
                      {company}
                    </motion.span>
                  ))}
                </div>

                <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center gap-3">
                  <Building className="w-5 h-5 text-teal-400" />
                  <div>
                    <p className="text-teal-400 font-bold text-xs uppercase tracking-wider">{experience.currentPartner.role}</p>
                    <p className="text-white font-bold">{experience.currentPartner.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mission Card */}
          <motion.div {...getMotionProps(0.5)} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/30 via-cyan-500/20 to-teal-500/30 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity blur-sm" />
            <div className="relative bg-[#0a1520]/90 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-6 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-t-2xl" />
              
              {/* Background quote mark */}
              <div className="absolute -right-4 -top-4 text-[180px] font-serif text-teal-500/[0.06] leading-none pointer-events-none select-none">
                "
              </div>
              
              <div className="flex items-start gap-5 relative z-10">
                <motion.div 
                  className="text-5xl"
                  {...(isExporting ? {} : {
                    animate: { rotate: [-5, 5, -5] },
                    transition: { duration: 2, repeat: Infinity }
                  })}
                >
                  🪓
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-teal-500/20 rounded-lg">
                      <Quote className="w-4 h-4 text-teal-400" />
                    </div>
                    <p className="text-teal-400 font-bold text-sm uppercase tracking-wider">Mi Filosofía: {experience.philosophy.title}</p>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">
                    "{experience.philosophy.quote.split('. ')[0]}.
                    <span className="text-teal-400 font-bold"> {experience.philosophy.quote.split('. ')[1]}</span>"
                  </p>
                  <p className="text-white/40 text-sm mt-3 font-medium">— {experience.philosophy.attribution}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 text-base font-bold text-white/20 tabular-nums">
        3 / 29
      </div>
    </div>
  );
}
