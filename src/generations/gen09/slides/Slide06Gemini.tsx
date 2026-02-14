import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { LayoutTemplate, Palette, AlertTriangle, ArrowRight, MessageSquare, Sparkles, MousePointer2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { SLIDES_DATA } from '../config';

const slideData = SLIDES_DATA[5];
const premiumEase = [0.22, 1, 0.36, 1];

export function Slide06Gemini() {
  const { isExporting } = useExportContext();

  const getMotionProps = (delay: number) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease: premiumEase },
        };

  return (
    <ConsultingSlideLayout
      slideNumber={slideData.id}
      sectionNumber={slideData.sectionNumber}
      sectionTitle={slideData.section}
      title={slideData.title}
      storyline={slideData.storyline}
    >
      {/* Background Grid Pattern - only in presentation mode */}
      {!isExporting && (
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(hsl(210 40% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(210 40% 50%) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Background Gradient Orb - Blue for Gemini */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at 70% 30%, hsl(210 80% 50% / 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="h-full flex gap-0 min-h-0 relative z-10">
        
        {/* LEFT COLUMN: Educational Content - 42% */}
        <motion.div 
          className="w-[42%] flex flex-col justify-center px-4 py-2"
          {...getMotionProps(0.1)}
        >
          
          {/* Header Badge */}
          <div className="flex items-center gap-3 mb-5">
            <div 
              className="p-3 rounded-xl"
              style={{ 
                background: 'hsl(210 50% 50% / 0.1)',
                border: '1px solid hsl(210 50% 50% / 0.2)',
              }}
            >
              <LayoutTemplate className="w-7 h-7" style={{ color: 'hsl(210 70% 60%)' }} />
            </div>
            <span 
              className="text-sm font-mono tracking-[0.15em] uppercase font-medium"
              style={{ color: 'hsl(210 50% 65%)' }}
            >
              Interfaz de Trabajo
            </span>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-5xl lg:text-6xl font-black mb-5 leading-[1.05] text-white">
            Gemini <br />
            <span 
              className="text-transparent bg-clip-text"
              style={{ 
                backgroundImage: 'linear-gradient(135deg, hsl(210 80% 60%) 0%, hsl(270 70% 60%) 50%, hsl(330 80% 60%) 100%)',
              }}
            >
              Modo Canvas
            </span>
          </h1>

          {/* Description */}
          <p 
            className="text-xl mb-6 leading-relaxed"
            style={{ color: 'hsl(220 15% 55%)' }}
          >
            No es solo un chat. <strong className="text-white font-semibold">Canvas</strong> es un espacio 
            de trabajo dedicado que separa tu conversación del código generado.
          </p>

          {/* Concept Boxes */}
          <div className="space-y-4">
            
            {/* Use Case Box - Blue */}
            <motion.div 
              className="p-4 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, hsl(210 60% 50% / 0.08) 0%, hsl(210 50% 30% / 0.04) 100%)',
                borderLeft: '3px solid hsl(210 70% 55%)',
              }}
              {...getMotionProps(0.25)}
            >
              <h3 
                className="font-bold flex items-center gap-2 text-base uppercase mb-1.5 tracking-wide"
                style={{ color: 'hsl(210 70% 75%)' }}
              >
                <Palette className="w-4 h-4" style={{ color: 'hsl(210 70% 60%)' }} />
                Caso de Uso: Diseño UI
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'hsl(220 15% 55%)' }}>
                Ideal para prototipar interfaces rápido y <span className="font-semibold" style={{ color: 'hsl(210 70% 65%)' }}>"ahorrar tokens"</span> antes de pasar a herramientas de pago.
              </p>
            </motion.div>

            {/* Warning Box - Amber */}
            <motion.div 
              className="p-4 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, hsl(45 80% 50% / 0.06) 0%, hsl(45 60% 30% / 0.03) 100%)',
                borderLeft: '3px solid hsl(45 90% 55%)',
              }}
              {...getMotionProps(0.35)}
            >
              <h3 
                className="font-bold flex items-center gap-2 text-base uppercase mb-1.5 tracking-wide"
                style={{ color: 'hsl(45 80% 70%)' }}
              >
                <AlertTriangle className="w-4 h-4" style={{ color: 'hsl(45 90% 55%)' }} />
                Advertencia: Datos vs. Visual
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'hsl(220 15% 55%)' }}>
                Canvas genera gráficos hermosos, pero puede "alucinar" con la matemática. 
                <span className="font-bold" style={{ color: 'hsl(45 90% 60%)' }}> Siempre audita el código.</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Canvas Mockup - 58% */}
        <motion.div 
          className="w-[58%] flex items-center justify-center p-3"
          {...getMotionProps(0.15)}
        >
          
          {/* Canvas Interface Mockup - Full Height */}
          <div 
            className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col"
            style={{ 
              background: 'hsl(220 20% 8%)',
              border: '1px solid hsl(220 20% 18%)',
              boxShadow: '0 20px 50px hsl(220 50% 5% / 0.5), 0 0 0 1px hsl(210 50% 50% / 0.1)',
            }}
          >
            
            {/* Browser Header */}
            <div 
              className="h-9 flex items-center justify-between px-4 shrink-0"
              style={{ 
                background: 'hsl(220 15% 12%)',
                borderBottom: '1px solid hsl(220 15% 18%)',
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(0 65% 55%)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(45 80% 55%)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(140 55% 45%)' }} />
              </div>
              <span 
                className="text-[10px] font-mono tracking-wider"
                style={{ color: 'hsl(220 15% 45%)' }}
              >
                HTML/Tailwind
              </span>
            </div>

            {/* Split View: Chat + Canvas */}
            <div className="flex-1 flex overflow-hidden relative">
              
              {/* Chat Section - 35% */}
              <div 
                className="w-[35%] p-4 flex flex-col gap-3"
                style={{ 
                  background: 'hsl(220 18% 10%)',
                  borderRight: '1px solid hsl(220 15% 16%)',
                }}
              >
                {/* Chat Header */}
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3.5 h-3.5" style={{ color: 'hsl(220 15% 40%)' }} />
                  <span 
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: 'hsl(220 15% 40%)' }}
                  >
                    Chat
                  </span>
                </div>
                
                {/* User Bubble */}
                <motion.div 
                  className="p-3 rounded-lg rounded-tl-sm"
                  style={{ 
                    background: 'hsl(220 15% 14%)',
                    border: '1px solid hsl(220 12% 20%)',
                  }}
                  {...getMotionProps(0.4)}
                >
                  <p 
                    className="text-xs leading-relaxed font-mono"
                    style={{ color: 'hsl(220 15% 65%)' }}
                  >
                    "Crea un dashboard de colegios con colores naranjos..."
                  </p>
                </motion.div>
                
                {/* Gemini Response Bubble */}
                <motion.div 
                  className="p-3 rounded-lg rounded-tr-sm mt-auto"
                  style={{ 
                    background: 'hsl(210 55% 45% / 0.12)',
                    border: '1px solid hsl(210 55% 45% / 0.2)',
                  }}
                  {...getMotionProps(0.55)}
                >
                  <p 
                    className="text-xs leading-relaxed font-mono"
                    style={{ color: 'hsl(210 65% 70%)' }}
                  >
                    He creado la vista en Canvas. Puedes editarla directamente.
                  </p>
                </motion.div>
              </div>

              {/* Canvas Section - 65% */}
              <div 
                className="w-[65%] relative p-4 group"
                style={{ background: 'hsl(220 35% 7%)' }}
              >
                {/* Canvas Badge */}
                <div 
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-md flex items-center gap-1.5 z-20"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(210 70% 50%) 0%, hsl(210 60% 40%) 100%)',
                    boxShadow: '0 2px 10px hsl(210 70% 50% / 0.35)',
                  }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wide">Canvas</span>
                </div>

                {/* Dashboard Mockup Inside Canvas */}
                <motion.div 
                  className="w-full h-full rounded-lg p-3 overflow-hidden relative"
                  style={{ 
                    background: 'hsl(220 25% 10%)',
                    border: '1px solid hsl(220 18% 16%)',
                  }}
                  {...getMotionProps(0.5)}
                >
                  {/* Header Mock with Orange Bar */}
                  <div className="flex justify-between items-center mb-4">
                    <div 
                      className="w-20 h-2.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, hsl(25 90% 55%) 0%, hsl(35 85% 50%) 100%)' }}
                    />
                    <div 
                      className="w-7 h-7 rounded-full"
                      style={{ background: 'hsl(220 15% 20%)' }}
                    />
                  </div>

                  {/* KPI Cards Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[1, 2].map(i => (
                      <motion.div 
                        key={i}
                        className="h-16 rounded-md p-2.5"
                        style={{ 
                          background: 'hsl(220 18% 12%)',
                          border: '1px solid hsl(220 15% 18%)',
                        }}
                        {...getMotionProps(0.6 + i * 0.08)}
                      >
                        <div 
                          className="w-10 h-1.5 rounded mb-2"
                          style={{ background: 'hsl(220 10% 25%)' }}
                        />
                        <div 
                          className="w-14 h-4 rounded"
                          style={{ background: 'hsl(0 0% 100% / 0.08)' }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Bar - Orange themed */}
                  <motion.div 
                    className="h-2 rounded-full mb-3 overflow-hidden"
                    style={{ background: 'hsl(220 15% 15%)' }}
                    {...getMotionProps(0.75)}
                  >
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ 
                        background: 'linear-gradient(90deg, hsl(25 90% 55%) 0%, hsl(35 85% 50%) 100%)',
                        width: isExporting ? '75%' : '0%',
                      }}
                      {...(isExporting ? {} : {
                        animate: { width: '75%' },
                        transition: { delay: 1, duration: 0.8, ease: premiumEase },
                      })}
                    />
                  </motion.div>

                  {/* List Items Placeholder */}
                  <div className="space-y-1.5">
                    {[1, 2, 3].map(i => (
                      <div 
                        key={i}
                        className="w-full h-2 rounded-sm"
                        style={{ 
                          background: `hsl(220 15% ${i === 1 ? 20 : 16}%)`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Interactive Cursor - Only in presentation mode */}
                  {!isExporting && (
                    <motion.div 
                      className="absolute bottom-4 right-4 pointer-events-none"
                      initial={{ opacity: 0, x: 20, y: 20 }}
                      animate={{ opacity: 0.9, x: 0, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                    >
                      <MousePointer2 
                        className="text-white" 
                        size={20} 
                        style={{ filter: 'drop-shadow(0 2px 4px hsl(0 0% 0% / 0.4))' }} 
                      />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Flow Arrow - Positioned at split */}
              <div 
                className="absolute left-[35%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-30"
              >
                <motion.div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(210 70% 50%) 0%, hsl(210 60% 40%) 100%)',
                    boxShadow: isExporting ? 'none' : '0 0 20px hsl(210 70% 50% / 0.5)',
                  }}
                  {...(isExporting ? {} : {
                    initial: { scale: 0.8, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    transition: { delay: 0.8, duration: 0.4, ease: premiumEase },
                  })}
                >
                  <ArrowRight className="text-white" size={20} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ConsultingSlideLayout>
  );
}
