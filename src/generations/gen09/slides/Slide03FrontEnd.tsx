import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Palette, MousePointerClick, Layers, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';

// Types for MenuCard component
interface MenuCardProps {
  id: 'structure' | 'style' | 'interactive';
  active: 'structure' | 'style' | 'interactive' | null;
  setActive: (id: 'structure' | 'style' | 'interactive' | null) => void;
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
  isExporting: boolean;
}

// Helper component for menu cards
const MenuCard = ({ id, active, setActive, icon: Icon, title, desc, color, bg, border, isExporting }: MenuCardProps) => (
  <motion.button
    onMouseEnter={() => !isExporting && setActive(id)}
    onMouseLeave={() => !isExporting && setActive(null)}
    onClick={() => !isExporting && setActive(active === id ? null : id)}
    {...(isExporting ? {} : { whileHover: { scale: 1.02, x: 4 } })}
    className={`
      text-left p-5 rounded-xl border transition-all duration-300 relative group w-full
      ${active === id ? `${bg} ${border} shadow-lg` : 'bg-white/5 border-white/5 hover:bg-white/10'}
    `}
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg ${active === id ? 'bg-black/20' : 'bg-white/5'} ${color}`}>
        <Icon size={28} />
      </div>
      <div>
        <h4 className={`text-xl font-bold mb-2 ${active === id ? 'text-white' : 'text-white/70'}`}>
          {title}
        </h4>
        <p className="text-lg text-white/50 leading-relaxed font-light">
          {desc}
        </p>
      </div>
    </div>
    {/* Active indicator bar */}
    <div className={`absolute left-0 top-4 bottom-4 w-1.5 rounded-r-full transition-colors ${active === id ? color.replace('text-', 'bg-') : 'bg-transparent'}`} />
  </motion.button>
);

export function Slide03FrontEnd() {
  const { isExporting } = useExportContext();
  const [activeLayer, setActiveLayer] = useState<'structure' | 'style' | 'interactive' | null>(null);

  const educationalPoints = [
    {
      id: 'structure' as const,
      icon: Layout,
      title: 'Lo Visible (Estructura)',
      desc: 'Botones, formularios, tablas. El esqueleto de la tienda.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/50'
    },
    {
      id: 'style' as const,
      icon: Palette,
      title: 'Lo Estético (Estilo)',
      desc: 'Colores, tipografía, espaciado. La decoración de la vitrina.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/50'
    },
    {
      id: 'interactive' as const,
      icon: MousePointerClick,
      title: 'Lo Interactivo',
      desc: 'Clicks, navegación, animaciones. La atención al cliente.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/50'
    }
  ];

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#050505] flex flex-col font-sans px-8 py-10 md:px-16 selection:bg-emerald-500/30">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505]" />
      
      {/* Header */}
      <motion.div 
        {...(isExporting ? {} : {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 }
        })}
        className="relative z-10 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1.5 rounded border border-blue-500/30 bg-blue-500/10 text-blue-400 text-lg font-mono uppercase tracking-widest">
            Fundamentos
          </div>
        </div>
        <h2 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          La Tienda <span className="text-white/30 font-light">(Fachada)</span>
        </h2>
        <p className="text-2xl md:text-3xl text-white/60 font-light max-w-3xl">
          La parte visible de tu aplicación. <span className="text-blue-400 font-medium">Lo que tus usuarios tocan.</span>
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 relative flex gap-10 z-10">
        
        {/* Left Column: Educational Menu */}
        <div className="w-1/3 flex flex-col justify-center gap-4">
          <p className="text-white/30 text-lg font-mono uppercase tracking-widest mb-2 pl-1">
            Componentes de la Vitrina:
          </p>
          {educationalPoints.map((point) => (
            <MenuCard
              key={point.id}
              id={point.id}
              active={activeLayer}
              setActive={setActiveLayer}
              icon={point.icon}
              title={point.title}
              desc={point.desc}
              color={point.color}
              bg={point.bg}
              border={point.border}
              isExporting={isExporting}
            />
          ))}
        </div>

        {/* Right Column: Browser Mockup */}
        <div className="w-2/3 relative flex items-center">
          
          <motion.div 
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
            {...(isExporting ? {} : {
              animate: {
                scale: activeLayer ? 0.98 : 1,
                rotateY: activeLayer === 'structure' ? 5 : activeLayer === 'style' ? -5 : 0
              },
              transition: { duration: 0.5 }
            })}
          >
            {/* Browser Header */}
            <div className="h-12 bg-[#151515] border-b border-white/5 flex items-center px-4 gap-3">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/30" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/30" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/30" />
              </div>
              <div className="flex-1 max-w-md mx-auto h-7 bg-[#050505] rounded flex items-center justify-center border border-white/5">
                <span className="text-white/40 text-sm font-mono flex items-center gap-2">
                  <Layers size={12} /> miapp.vercel.app
                </span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 min-h-[450px] relative bg-[#0a0a0a]">
              
              {/* Base App Layer */}
              <div className={`transition-all duration-500 ${activeLayer ? 'opacity-20 blur-[2px]' : 'opacity-100'}`}>
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Ventas Globales</h1>
                  <button className="px-5 py-2.5 bg-white text-black rounded-lg text-base font-semibold hover:bg-gray-200 transition-colors">
                    Exportar
                  </button>
                </div>
                
                {/* Metric Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-5 rounded-xl bg-[#151515] border border-white/5">
                      <p className="text-white/40 text-sm uppercase font-medium mb-1">Ingresos Totales</p>
                      <p className="text-3xl font-bold text-white mb-2">$24,500</p>
                      <div className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                        +12% vs mes anterior
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="h-48 w-full bg-[#151515] border border-white/5 rounded-xl p-4 flex items-end justify-between gap-2 relative overflow-hidden">
                  {[40, 65, 45, 80, 55, 90, 70, 60, 75, 50, 85, 95].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-600/20 rounded-t-sm hover:bg-blue-500 transition-colors" />
                  ))}
                </div>
              </div>

              {/* X-Ray Layer 1: Structure (Wireframe) */}
              {!isExporting && (
                <AnimatePresence>
                  {activeLayer === 'structure' && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-6 z-20 font-mono text-xs"
                    >
                      <div className="absolute top-2 left-2 text-blue-500 bg-blue-500/10 px-2 py-0.5 border border-blue-500/30 rounded">{'<Container>'}</div>
                      
                      {/* Header Wireframe */}
                      <div className="flex justify-between items-center mb-8 border-2 border-dashed border-blue-500/30 p-3 rounded relative">
                        <span className="absolute -top-3 left-2 bg-[#0a0a0a] text-blue-400 px-2">{'<Header>'}</span>
                        <div className="border border-blue-500/30 px-3 py-1.5 text-blue-300 rounded">{'<Title>'}</div>
                        <div className="border border-blue-500/30 px-3 py-1.5 text-blue-300 rounded">{'<Button>'}</div>
                      </div>
                      
                      {/* Cards Wireframe */}
                      <div className="grid grid-cols-3 gap-4 mb-8 border-2 border-dashed border-blue-500/30 p-3 rounded relative">
                        <span className="absolute -top-3 left-2 bg-[#0a0a0a] text-blue-400 px-2">{'<Grid>'}</span>
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-32 border border-blue-500/40 rounded flex items-center justify-center text-blue-300">
                            {'<Card>'}
                          </div>
                        ))}
                      </div>
                      
                      {/* Chart Wireframe */}
                      <div className="h-48 border-2 border-dashed border-blue-500/30 rounded flex items-center justify-center relative">
                        <span className="absolute -top-3 left-2 bg-[#0a0a0a] text-blue-400 px-2">{'<ChartArea>'}</span>
                        <span className="text-blue-500/50 text-sm">Chart Component Visualization</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* X-Ray Layer 2: Style (CSS) */}
              {!isExporting && (
                <AnimatePresence>
                  {activeLayer === 'style' && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-6 z-20 pointer-events-none"
                    >
                      {/* Background Tooltip */}
                      <div className="absolute top-12 right-12 bg-[#1a1a1a] border border-purple-500/50 p-4 rounded-lg shadow-xl">
                        <code className="text-sm text-purple-300 block leading-relaxed">bg-color: #0a0a0a;</code>
                        <code className="text-sm text-purple-300 block leading-relaxed">font-family: 'Inter';</code>
                      </div>
                      
                      {/* Cards Tooltip */}
                      <div className="absolute top-44 left-12 bg-[#1a1a1a] border border-purple-500/50 p-4 rounded-lg shadow-xl">
                        <code className="text-sm text-purple-300 block leading-relaxed">border-radius: 0.75rem;</code>
                        <code className="text-sm text-purple-300 block leading-relaxed">gap: 1rem;</code>
                        <code className="text-sm text-purple-300 block leading-relaxed">display: grid;</code>
                      </div>
                      
                      {/* Chart Tooltip */}
                      <div className="absolute bottom-20 right-20 bg-[#1a1a1a] border border-purple-500/50 p-4 rounded-lg shadow-xl">
                        <code className="text-sm text-purple-300 block leading-relaxed">height: 12rem;</code>
                        <code className="text-sm text-purple-300 block leading-relaxed">display: flex;</code>
                        <code className="text-sm text-purple-300 block leading-relaxed">align-items: flex-end;</code>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* X-Ray Layer 3: Interactive (Events) */}
              {!isExporting && (
                <AnimatePresence>
                  {activeLayer === 'interactive' && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-6 z-20 pointer-events-none"
                    >
                      {/* Click Pulse on Button */}
                      <div className="absolute top-[38px] right-[24px] transform translate-x-1/2 -translate-y-1/2">
                        <span className="absolute -top-10 right-0 bg-emerald-600 text-white text-sm px-3 py-1 rounded font-mono">onClick()</span>
                        <div className="w-10 h-10 bg-emerald-500/30 rounded-full animate-ping absolute" />
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-full border-2 border-emerald-500 relative flex items-center justify-center">
                          <MousePointerClick size={18} className="text-emerald-400" />
                        </div>
                      </div>
                      
                      {/* Hover Areas on Cards */}
                      <div className="grid grid-cols-3 gap-4 mb-8 mt-20">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-32 border-2 border-emerald-500/30 rounded-xl bg-emerald-500/5 flex items-center justify-center relative">
                            <span className="text-emerald-500 text-sm font-mono">onHover: Scale</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Chart Bars Hover */}
                      <div className="absolute bottom-6 left-6 right-6 h-48 border-2 border-emerald-500/30 rounded-xl bg-emerald-500/5 flex items-center justify-center">
                        <span className="text-emerald-500 text-sm font-mono">onMouseEnter: Highlight Bar</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-8 right-8 text-lg font-bold text-gray-500 tabular-nums">
        3 / 12
      </div>
    </div>
  );
}
