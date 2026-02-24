import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Laptop, Video, Mic, CloudUpload, Settings, Headphones, CheckCircle2, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, PreparationItem, SupportInfo } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

// Icon map for dynamic rendering
const ICON_MAP: Record<string, LucideIcon> = {
  Laptop, Video, Mic, CloudUpload,
};

// Default fallback data
const DEFAULT_PREPARATIONS: PreparationItem[] = [
  { num: 1, title: 'Suscripción a ChatGPT/Claude', desc: 'Recomendada pero opcional para práctica', icon: 'Laptop', emoji: '💻' },
  { num: 2, title: 'Cámaras encendidas', desc: 'Participación activa y preguntas bienvenidas', icon: 'Video', emoji: '📹' },
  { num: 3, title: 'Autorización de grabación', desc: 'Sesiones grabadas para repaso posterior', icon: 'Mic', emoji: '🎙️' },
  { num: 4, title: 'Drive/Teams compartido', desc: 'Carpeta con documentos y recursos clave', icon: 'CloudUpload', emoji: '☁️' },
];

const DEFAULT_SUPPORT_INFO: SupportInfo = {
  phone: '+56 9 7699 8520',
  message: 'Llamen o escríbanme cuando quieran',
  note: 'Siempre respondo, solo que no muy rápido',
};

export function Slide05HowWeWork() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(5);
  const m = useS1Motion();

  const preparations = content.preparations || DEFAULT_PREPARATIONS;
  const supportInfo = content.supportInfo || DEFAULT_SUPPORT_INFO;

  return (
    <S1Shell
      footerLabel="METODOLOGÍA"
      className="flex flex-col"
      radials={<>
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] rounded-full blur-[180px]" style={{ background: 'hsl(160 65% 45% / 0.08)' }} />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[150px]" style={{ background: 'hsl(185 70% 50% / 0.06)' }} />
      </>}
    >
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-12 py-8 sm:py-10">
        <motion.header {...m(0.1)} className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Settings className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: S1_ACCENT.emerald.text }}>Metodología</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            CÓMO{' '}
            <span style={{ background: `linear-gradient(135deg, ${S1_ACCENT.emerald.text}, ${S1_ACCENT.cyan.text})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FUNCIONAREMOS</span>
          </h1>
        </motion.header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Support */}
          <motion.div {...m(0.2)} className="group relative">
            <div className="relative h-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex flex-col">
              <div className="absolute top-0 left-4 right-4 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${S1_ACCENT.emerald.dot}, transparent)` }} />
              <div className="flex items-center justify-center gap-2 mb-6">
                <Headphones className="w-5 h-5" style={{ color: S1_ACCENT.emerald.text }} />
                <h2 className="text-xl font-bold text-white uppercase tracking-wide">Soporte y Contacto</h2>
              </div>
              <div className="flex justify-center mb-6">
                <motion.div {...(isExporting ? {} : { animate: { rotate: [-5, 5, -5] }, transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 } })} className="relative">
                  <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: S1_ACCENT.emerald.glow }} />
                  <div className="relative p-5 rounded-2xl border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                    <Phone className="w-12 h-12" style={{ color: S1_ACCENT.emerald.text }} />
                  </div>
                </motion.div>
              </div>
              <p className="text-white/50 text-center mb-6 leading-relaxed text-sm">Estoy aquí para ayudarlos durante este periodo, pero no es un soporte técnico continuo.</p>
              <div className="mt-auto">
                <div className="p-5 rounded-xl border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                  <p className="text-white/70 text-center text-sm mb-3">{supportInfo.message}:</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl sm:text-2xl font-bold tracking-wide" style={{ color: S1_ACCENT.emerald.text }}>{supportInfo.phone}</span>
                    <span className="text-xl">📱</span>
                  </div>
                  <p className="text-white/40 text-center text-xs">{supportInfo.note}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Preparation */}
          <motion.div {...m(0.3)} className="group relative">
            <div className="relative h-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex flex-col">
              <div className="absolute top-0 left-4 right-4 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${S1_ACCENT.cyan.dot}, transparent)` }} />
              <div className="flex items-center justify-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5" style={{ color: S1_ACCENT.cyan.text }} />
                <h2 className="text-xl font-bold text-white uppercase tracking-wide">Preparación del Taller</h2>
              </div>
              <div className="space-y-3 flex-1">
                {preparations.map((prep, i) => {
                  const Icon = ICON_MAP[prep.icon] || Laptop;
                  return (
                    <motion.div key={prep.num} {...m(0.4 + i * 0.08)} className="group/item relative">
                      <div className="relative flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.06] transition-all">
                        <span className="text-white/[0.08] font-mono text-xs font-bold w-4 shrink-0">{String(prep.num).padStart(2, '0')}</span>
                        <div className="p-2.5 rounded-lg border shrink-0" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                          <Icon className="w-5 h-5" style={{ color: S1_ACCENT.emerald.text }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">{prep.title}</p>
                          <p className="text-white/40 text-xs truncate">{prep.desc}</p>
                        </div>
                        <span className="text-lg opacity-50 shrink-0">{prep.emoji}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </S1Shell>
  );
}
