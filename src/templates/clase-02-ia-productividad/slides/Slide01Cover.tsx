import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronRight, X, Cpu } from 'lucide-react';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import bgImage from '@/assets/clase02/slide01-bg.png';

export function Slide01Cover() {
  const { isExporting } = useExportContext();
  const [showThesis, setShowThesis] = useState(false);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);

  const getMotionProps = (delay: number) =>
    isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.6 } };

  return (
    <div className="slide-16-9 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background image with radial mask for edge fade - increased visibility */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          maskImage: 'radial-gradient(ellipse 85% 95% at 70% 50%, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 95% at 70% 50%, black 60%, transparent 100%)',
        }}
      />

      {/* Dark gradient overlay - reduced opacity for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
      
      {/* Additional vertical gradient - lighter */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center py-8 px-12">
        
        {/* Top: Badge - Technical/Sobrio - positioned absolutely */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 left-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-black/60 border border-slate-700 text-white text-xs font-medium tracking-wide backdrop-blur-sm">
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            SISTEMAS AUTÓNOMOS
          </span>
        </motion.div>

        {/* Center: Main Title Block - true vertical center */}
        <div className="flex flex-col justify-center max-w-4xl">
          {/* Main Title with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setIsHoveringTitle(true)}
            onMouseLeave={() => setIsHoveringTitle(false)}
            className="relative"
          >
            <h1 
              className="leading-[0.95] tracking-tight transition-all duration-500"
              style={{
                textShadow: isHoveringTitle 
                  ? '0 0 60px rgba(251, 191, 36, 0.5), 0 0 100px rgba(251, 191, 36, 0.3)' 
                  : 'none',
              }}
            >
              <EditableText
                defaultValue="La Era"
                tag="span"
                className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white"
              />
              <EditableText
                defaultValue="Agéntica"
                tag="span"
                className="block text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
              />
            </h1>
            
            {/* Decorative line */}
            <motion.div 
              className="h-1 bg-gradient-to-r from-amber-500/80 to-transparent mt-5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isHoveringTitle ? '100%' : '160px' }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Subtitle - Mayor interlineado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white/60 font-light tracking-wide">
              <EditableText
                defaultValue="Del Razonamiento a la Ejecución"
                tag="span"
                className="text-white/60"
              />
            </h2>
          </motion.div>

          {/* CTA Button - Enhanced hover brightness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10"
          >
            <motion.button
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-white font-medium text-sm overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              whileHover={{ 
                scale: 1.03,
                filter: 'brightness(1.3)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // Dispatch right arrow key event to advance to next slide
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
              }}
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <Play className="w-4 h-4 relative z-10 text-white/80 group-hover:text-white transition-colors" />
              <span className="relative z-10">Iniciar Recorrido</span>
              <ChevronRight className="w-4 h-4 relative z-10 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom: Only Thesis Toggle - positioned absolutely */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 right-12"
        >
          {/* Thesis Panel Toggle */}
          <motion.button
            onClick={() => setShowThesis(!showThesis)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white/50 hover:text-white/90 hover:bg-white/5 transition-all text-xs border border-transparent hover:border-slate-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="uppercase tracking-wider">Ver Tesis</span>
            <motion.div
              animate={{ rotate: showThesis ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Side Panel - Thesis Notes */}
      <AnimatePresence>
        {showThesis && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-[340px] z-20"
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(100, 116, 139, 0.3)',
            }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Tesis del Slide</h3>
                <motion.button
                  onClick={() => setShowThesis(false)}
                  className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Thesis Content */}
              <div className="flex-1">
                <div className="p-5 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-base text-white/90 leading-relaxed font-light italic">
                    "Ya no se trata de conversar; se trata de dirigir sistemas que toman decisiones."
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    Puntos Clave
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      'Evolución de Chat → Agentes',
                      'Humano como Director',
                      'Sistemas Autónomos de Decisión',
                      'Meta-Prompts como Orquestación',
                    ].map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2.5 text-sm text-white/70"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-[10px] text-white/30 uppercase tracking-wider">
                  ESC para cerrar
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette effect for edges - reduced intensity */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px 40px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  );
}
