import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Eye, EyeOff, ShoppingBag, Warehouse, LayoutDashboard, Palette, MousePointer, Database, Lock, Zap } from 'lucide-react';
import bgArchitecture from '@/assets/gen10-s4/bg-architecture.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const FRONTEND_ITEMS = [
  { icon: LayoutDashboard, label: 'Estructura', desc: 'Botones, formularios, tablas. El esqueleto de la tienda.' },
  { icon: Palette, label: 'Estilo', desc: 'Colores, tipografía, espaciado. La decoración.' },
  { icon: MousePointer, label: 'Interacción', desc: 'Clicks, navegación, animaciones. La atención al cliente.' },
];

const BACKEND_ITEMS = [
  { icon: Database, label: 'Base de Datos', desc: 'PostgreSQL. Donde viven tus registros.' },
  { icon: Lock, label: 'Autenticación', desc: 'Login, permisos, seguridad por usuario.' },
  { icon: Zap, label: 'APIs', desc: 'Automatizaciones, notificaciones, cálculos.' },
];

export function S4Slide03Architecture() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [side, setSide] = useState<'front' | 'back'>('front');
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };
  const items = side === 'front' ? FRONTEND_ITEMS : BACKEND_ITEMS;
  const accent = side === 'front' ? 'hsl(185 70% 50%)' : 'hsl(38 90% 55%)';

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgArchitecture} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/40 to-[#04030a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(185_60%_40%_/_0.08),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full" style={{ background: accent }} />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Fundamentos</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Front-End y Back-End</h1>
            </div>
          </div>
          <p className="text-white/40 text-sm ml-5 pl-1" style={{ color: `${accent.replace(')', ' / 0.6)')}` }}>La tienda y la bodega. Lo que ves y lo que no ves.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {/* Toggle cards */}
          {[
            { key: 'front' as const, title: 'Front-End', subtitle: 'La Tienda (Fachada)', icon: ShoppingBag, vis: Eye, color: 'hsl(185 70% 50%)', desc: 'La parte visible de tu aplicación. Lo que tus usuarios tocan.' },
            { key: 'back' as const, title: 'Back-End', subtitle: 'La Bodega (Cocina)', icon: Warehouse, vis: EyeOff, color: 'hsl(38 90% 55%)', desc: 'Donde viven tus datos. Invisible pero esencial. Como la cocina de un restaurante.' },
          ].map((panel, i) => {
            const Icon = panel.icon;
            const Vis = panel.vis;
            const active = side === panel.key;
            return (
              <motion.button key={panel.key} {...m(0.15 + i * 0.1)} onClick={() => setSide(panel.key)}
                className={`relative p-6 rounded-2xl border text-left transition-all duration-300 ${active ? 'bg-white/[0.04] border-white/[0.12]' : 'bg-white/[0.01] border-white/[0.04] opacity-60'}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 rounded-b-full" style={{ background: panel.color, opacity: active ? 0.8 : 0.15 }} />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${panel.color.replace(')', ' / 0.1)')}`, border: `1px solid ${panel.color.replace(')', ' / 0.25)')}` }}>
                    <Icon className="w-6 h-6" style={{ color: panel.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{panel.title}</p>
                    <p className="text-xs text-white/40">{panel.subtitle}</p>
                  </div>
                  <Vis className="w-4 h-4 text-white/20 ml-auto" />
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{panel.desc}</p>

                {active && (
                  <div className="mt-5 space-y-3">
                    {(panel.key === 'front' ? FRONTEND_ITEMS : BACKEND_ITEMS).map((item, j) => {
                      const ItemIcon = item.icon;
                      return (
                        <motion.div key={j} {...(isExporting ? {} : { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 * j } })}
                          className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.02]">
                          <ItemIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: panel.color }} />
                          <div>
                            <p className="text-xs font-bold text-white/70">{item.label}</p>
                            <p className="text-[11px] text-white/35">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Analogy callout */}
        <motion.div {...m(0.5)} className="mt-6 p-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] flex items-center gap-4 max-w-3xl mx-auto">
          <Monitor className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs text-white/50">
            <span className="text-amber-400/80 font-bold">Nota del Instructor:</span>{' '}
            Un buen Back-End (Supabase) con tablas y reglas de negocio es más importante que el Front-End. El front se puede reconstruir rápidamente si el backend está bien hecho.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(185 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">FUNDAMENTOS</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
