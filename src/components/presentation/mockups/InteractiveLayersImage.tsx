import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2 } from 'lucide-react';
import slideContextLayers from '@/assets/clase02/slide-context-layers-centered.webp';

interface Hotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  emoji: string;
  title: string;
  description: string;
  details: string[];
}

const hotspots: Hotspot[] = [
  {
    id: 'titulo',
    label: 'Ingeniería de Contexto',
    x: 10,
    y: 2,
    w: 80,
    h: 12,
    emoji: '🧠',
    title: 'Tesis Central',
    description: 'Ingeniería de Contexto > Ingeniería de Prompts',
    details: [
      'El prompt es solo la punta del iceberg',
      'El verdadero poder está en las capas inferiores',
      'Contexto bien diseñado = resultados consistentes',
      'La diferencia entre amateur y profesional',
    ],
  },
  {
    id: 'instruccion',
    label: 'Instrucción',
    x: 22,
    y: 16,
    w: 56,
    h: 22,
    emoji: '🌱',
    title: 'Capa de Instrucción',
    description: 'El Prompt - Lo único que veías antes',
    details: [
      'La superficie visible de la interacción',
      'Cada mensaje es una instrucción individual',
      'Sin contexto, la IA empieza de cero cada vez',
      'Ideal solo para preguntas simples y aisladas',
    ],
  },
  {
    id: 'proyecto',
    label: 'Proyecto / Archivos',
    x: 22,
    y: 38,
    w: 56,
    h: 16,
    emoji: '📁',
    title: 'Capa de Proyecto',
    description: 'Contexto Circunscrito - Carpetas con instrucciones',
    details: [
      'Define la "Context Window" activa',
      'Incluye archivos y conversaciones previas',
      'Permite entender el contexto específico',
      'RAG para búsqueda de información relevante',
    ],
  },
  {
    id: 'memoria',
    label: 'Memoria',
    x: 22,
    y: 54,
    w: 56,
    h: 44,
    emoji: '🪨',
    title: 'Capa de Memoria',
    description: 'Persistencia - No repetir quién eres',
    details: [
      'Memoria de Trabajo: sesión actual',
      'Historial Antiguo: persiste entre sesiones',
      'Evita repetir preferencias e identidad',
      'El "cerebro" que diferencia calculadora de asistente',
    ],
  },
];

export function InteractiveLayersImage() {
  const [activeId, setActiveId] = useState<string>('titulo');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [calibrateMode, setCalibrateMode] = useState(false);

  const activeHotspot = hotspots.find((h) => h.id === activeId) || hotspots[0];

  return (
    <div className="grid grid-cols-[1fr_280px] gap-4 w-full h-full min-h-[300px]">
      {/* Image Container - 16:9 */}
      <div className="relative bg-slate-950 rounded-xl overflow-hidden">
        {/* Background Image */}
        <img
          src={slideContextLayers}
          alt="Ingeniería de Contexto - Capas"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Hotspots Overlay */}
        {hotspots.map((hotspot) => {
          const isHovered = hoveredId === hotspot.id;
          const isActive = activeId === hotspot.id;

          return (
            <motion.button
              key={hotspot.id}
              className={`
                absolute cursor-pointer transition-all duration-200 rounded-md
                ${calibrateMode ? 'border-2 border-red-500' : ''}
                ${isHovered || isActive ? 'border border-amber-400/50 backdrop-blur-[2px]' : 'border border-transparent'}
                ${isActive ? 'bg-amber-500/5' : ''}
              `}
              style={{
                top: `${hotspot.y}%`,
                left: `${hotspot.x}%`,
                width: `${hotspot.w}%`,
                height: `${hotspot.h}%`,
              }}
              onMouseEnter={() => setHoveredId(hotspot.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setActiveId(hotspot.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Calibration Label */}
              {calibrateMode && (
                <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] px-1 rounded-br font-mono">
                  {hotspot.id}: {hotspot.x},{hotspot.y} {hotspot.w}x{hotspot.h}
                </span>
              )}

              {/* Hover Label */}
              <AnimatePresence>
                {isHovered && !calibrateMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                      px-2.5 py-1 rounded-md whitespace-nowrap z-50
                      bg-slate-900/95 border border-amber-500/30
                      text-amber-400 text-xs font-medium
                      shadow-lg shadow-black/20"
                  >
                    {hotspot.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Calibrate Toggle */}
        <button
          onClick={() => setCalibrateMode(!calibrateMode)}
          className={`
            absolute top-3 right-3 p-2 rounded-lg transition-all z-50
            ${calibrateMode 
              ? 'bg-red-500/20 border border-red-500/50 text-red-400' 
              : 'bg-slate-800/60 border border-white/10 text-white/50 hover:text-white/80'}
          `}
          title="Toggle calibration mode"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      {/* Right Side Panel */}
      <motion.div
        key={activeId}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex flex-col"
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-b from-amber-500/5 to-transparent">
          <div className="text-3xl mb-2">{activeHotspot.emoji}</div>
          <h3 className="text-base font-bold text-amber-400">
            {activeHotspot.title}
          </h3>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">
            {activeHotspot.description}
          </p>
        </div>

        {/* Panel Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h4 className="text-white/30 text-[10px] uppercase tracking-wider font-semibold mb-2">
            Detalles
          </h4>
          <ul className="space-y-2">
            {activeHotspot.details.map((detail, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2"
              >
                <div className="w-1 h-1 rounded-full mt-1.5 bg-amber-500/60 flex-shrink-0" />
                <span className="text-white/70 text-xs leading-relaxed">{detail}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mini Navigation */}
        <div className="p-3 border-t border-white/10 bg-slate-950/50">
          <div className="flex gap-1.5 justify-center">
            {hotspots.map((hotspot, index) => (
              <button
                key={hotspot.id}
                onClick={() => setActiveId(hotspot.id)}
                className={`
                  w-7 h-7 rounded-lg text-xs font-medium transition-all
                  ${activeId === hotspot.id
                    ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                    : 'bg-slate-800/50 border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'}
                `}
                title={hotspot.label}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
