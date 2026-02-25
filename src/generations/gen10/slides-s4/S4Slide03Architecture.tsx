import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Eye, EyeOff, ShoppingBag, Warehouse, LayoutDashboard, Palette, MousePointer, Database, Lock, Zap, ArrowLeftRight } from 'lucide-react';
import bgArchitecture from '@/assets/gen10-s4/bg-architecture.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S4Footer } from './S4Footer';
import { S4TeachingRibbon } from './S4TeachingRibbon';

const PANELS = [
  {
    key: 'front' as const,
    title: 'Front-End',
    subtitle: 'La Tienda — Lo que Ves',
    icon: ShoppingBag,
    vis: Eye,
    color: 'hsl(185 70% 50%)',
    hue: 185,
    desc: 'La parte visible de tu app. Lo que tus usuarios tocan, ven e interactúan.',
    analogy: '🏪 La fachada de la tienda',
    items: [
      { icon: LayoutDashboard, label: 'Estructura (HTML)', desc: 'Botones, formularios, tablas. El esqueleto de la tienda.' },
      { icon: Palette, label: 'Estilo (CSS/Tailwind)', desc: 'Colores, tipografía, espaciado. La decoración visual.' },
      { icon: MousePointer, label: 'Interacción (JS/React)', desc: 'Clicks, navegación, animaciones. La atención al cliente.' },
    ],
  },
  {
    key: 'back' as const,
    title: 'Back-End',
    subtitle: 'La Bodega — Lo que No Ves',
    icon: Warehouse,
    vis: EyeOff,
    color: 'hsl(38 90% 55%)',
    hue: 38,
    desc: 'Donde viven tus datos. Invisible pero esencial. Como la cocina de un restaurante.',
    analogy: '🏭 La bodega y cocina',
    items: [
      { icon: Database, label: 'Base de Datos (PostgreSQL)', desc: 'Tablas, relaciones, consultas. Donde viven tus registros.' },
      { icon: Lock, label: 'Autenticación (Auth)', desc: 'Login, permisos, seguridad por usuario y por fila.' },
      { icon: Zap, label: 'APIs automáticas (REST)', desc: 'CRUD sin escribir endpoints. Generadas automáticamente.' },
    ],
  },
];

export function S4Slide03Architecture() {
  const { isExporting } = useExportContext();
  const [side, setSide] = useState<'front' | 'back'>('front');
  const active = PANELS.find(p => p.key === side)!;
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgArchitecture} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.15]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/50 to-[#04030a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-15%,_hsl(185_60%_40%_/_0.1),_transparent_60%)]" />
        <div className="absolute top-[5%] left-[3%] text-[18vw] font-black text-white/[0.02] leading-none select-none pointer-events-none">F/B</div>
      </div>
      <S4TeachingRibbon
        isExporting={isExporting}
        hue={185}
        objective="Comprender que el valor de una app depende de un front claro y un backend solido."
        deliverable="Mapa mental de responsabilidades Front-End vs Back-End aplicable a cualquier proyecto."
        qualityGate="Cada alumno debe poder decidir en que capa resolver un problema antes de implementarlo."
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full" style={{ background: `linear-gradient(180deg, hsl(185 70% 55%), hsl(38 90% 55%))` }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Fundamentos · Arquitectura Web</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Front-End & Back-End</h1>
            </div>
          </div>
          <p className="text-white/80 text-sm ml-5 pl-1 font-medium">La tienda y la bodega. Lo visible y lo esencial.</p>
        </motion.div>

        {/* Toggle selector */}
        <motion.div {...m(0.1)} className="flex items-center gap-3 mb-7">
          {PANELS.map(p => {
            const Icon = p.icon;
            const isActive = side === p.key;
            return (
              <button key={p.key} onClick={() => setSide(p.key)}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border transition-all duration-300"
                style={{
                  borderColor: isActive ? `hsl(${p.hue} 60% 50% / 0.4)` : 'hsl(0 0% 100% / 0.06)',
                  background: isActive ? `hsl(${p.hue} 60% 45% / 0.1)` : 'transparent',
                  boxShadow: isActive ? `0 0 20px hsl(${p.hue} 60% 50% / 0.1)` : 'none',
                }}>
                <Icon className="w-4 h-4" style={{ color: isActive ? p.color : 'hsl(0 0% 100% / 0.3)' }} />
                <span className={`text-sm font-black ${isActive ? 'text-white' : 'text-white/90'}`}>{p.title}</span>
              </button>
            );
          })}
          <ArrowLeftRight className="mx-1 h-4 w-4 text-white/85" />
          <span className="text-xs text-white/70 font-medium italic">Haz clic para explorar</span>
        </motion.div>

        {/* Main grid */}
        <AnimatePresence mode="wait">
          <motion.div key={side}
            initial={isExporting ? {} : { opacity: 0, x: side === 'front' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-5 gap-6">

            {/* Left: overview */}
            <div className="col-span-2 p-6 rounded-2xl border relative overflow-hidden"
              style={{ borderColor: `hsl(${active.hue} 60% 50% / 0.2)`, background: `hsl(${active.hue} 60% 40% / 0.05)`, boxShadow: `0 0 40px hsl(${active.hue} 60% 40% / 0.08) inset` }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${active.color.replace(')', ' / 0.6)')}, transparent)` }} />
              <div className="absolute bottom-3 right-3 text-[60px] font-black leading-none select-none pointer-events-none" style={{ color: `hsl(${active.hue} 50% 50% / 0.05)` }}>{active.key === 'front' ? 'FE' : 'BE'}</div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `hsl(${active.hue} 60% 45% / 0.15)`, border: `1px solid hsl(${active.hue} 60% 50% / 0.3)`, boxShadow: `0 0 30px hsl(${active.hue} 60% 50% / 0.15)` }}>
                  {<active.icon className="w-7 h-7" style={{ color: active.color }} />}
                </div>
                <div>
                  <p className="text-xl font-black text-white">{active.title}</p>
                  <p className="text-xs font-bold" style={{ color: `hsl(${active.hue} 60% 60% / 0.7)` }}>{active.subtitle}</p>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-white/85">{active.desc}</p>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: `hsl(${active.hue} 60% 45% / 0.08)`, border: `1px solid hsl(${active.hue} 60% 50% / 0.15)` }}>
                <span className="text-xs font-black" style={{ color: `hsl(${active.hue} 60% 65%)` }}>{active.analogy}</span>
              </div>
            </div>

            {/* Right: items */}
            <div className="col-span-3 space-y-3">
              {active.items.map((item, j) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div key={j}
                    {...(isExporting ? {} : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + j * 0.1, ease: [0.22, 1, 0.36, 1] } })}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] group hover:border-white/[0.1] transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `hsl(${active.hue} 60% 45% / 0.12)`, border: `1px solid hsl(${active.hue} 60% 50% / 0.2)` }}>
                      <ItemIcon className="w-5 h-5" style={{ color: active.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white/80 mb-1">{item.label}</p>
                      <p className="text-xs text-white/85 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Instructor note */}
        <motion.div {...m(0.5)} className="mt-5 p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex items-start gap-3 max-w-4xl">
          <Monitor className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-amber-400/90 font-black text-xs">Nota del Instructor: </span>
            <span className="text-xs leading-relaxed text-white/90">Un buen Back-End (Supabase) con tablas y reglas de negocio bien modeladas es más importante que el Front-End. El front se puede reconstruir en minutos si el backend está bien hecho.</span>
          </div>
        </motion.div>
      </div>
      <S4Footer
        sectionLabel="Fundamentos"
        contextHint="Arquitectura de dos capas"
        hue={185}
        session="S4"
      />
    </div>
  );
}
