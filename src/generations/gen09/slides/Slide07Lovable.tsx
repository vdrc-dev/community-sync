import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { 
  Heart, Code2, Database, Globe, BookOpen, ArrowRight,
  DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown
} from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { SLIDES_DATA } from '../config';

const slideData = SLIDES_DATA[6];
const premiumEase = [0.22, 1, 0.36, 1];

// Dashboard data
const kpis = [
  { label: 'Ventas', value: '$12,847', change: '+23.5%', positive: true, icon: DollarSign },
  { label: 'Pedidos', value: '284', change: '+12.3%', positive: true, icon: ShoppingCart },
  { label: 'Productos', value: '1,847', change: '-2.1%', positive: false, icon: Package },
  { label: 'Usuarios', value: '3,421', change: '+15.2%', positive: true, icon: Users },
];

const activity = [
  { name: 'Ana García', action: 'Nuevo pedido #1284', amount: '$234', time: '2m', colorBg: 'rgba(236,72,153,0.15)', colorText: '#f472b6' },
  { name: 'Luis Pérez', action: 'Stock actualizado', amount: null, time: '8m', colorBg: 'rgba(59,130,246,0.15)', colorText: '#60a5fa' },
  { name: 'María López', action: 'Nuevo cliente', amount: null, time: '15m', colorBg: 'rgba(34,197,94,0.15)', colorText: '#4ade80' },
  { name: 'Carlos Ruiz', action: 'Pago recibido', amount: '$1,299', time: '1h', colorBg: 'rgba(249,115,22,0.15)', colorText: '#fb923c' },
];

const features = [
  { icon: Code2, title: 'Código modular', subtitle: 'Componentes React profesionales' },
  { icon: Database, title: 'Backend 1-click', subtitle: 'Supabase integrado' },
  { icon: Globe, title: 'Deploy instantáneo', subtitle: 'URL pública con HTTPS' },
];

const workflowSteps = ['Describe tu idea', 'Lovable genera', 'Itera con chat', 'Publica'];

export function Slide07Lovable() {
  const { isExporting } = useExportContext();
  const { config } = useGeneration();

  const getMotionProps = (delay: number) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
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
      {/* Lovable Aurora Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!isExporting ? (
          <>
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.20) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 40% at 85% 50%, rgba(139,92,246,0.15) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 50% at 15% 80%, rgba(236,72,153,0.18) 0%, transparent 50%)
                `
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
          </>
        ) : (
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}
          />
        )}
      </div>

      {/* Main Content - Split View */}
      <div className="relative h-full flex gap-6 min-h-0">
        
        {/* Left Column - Educational Content (42%) */}
        <motion.div 
          className="w-[42%] flex flex-col justify-center"
          {...getMotionProps(0.1)}
        >
          {/* Header with Badge */}
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="p-3 rounded-xl"
              style={{ 
                background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                boxShadow: '0 8px 32px rgba(236,72,153,0.35)'
              }}
            >
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <span 
              className="px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(249,115,22,0.15) 100%)',
                color: '#f472b6',
                border: '1px solid rgba(236,72,153,0.3)'
              }}
            >
              Herramienta Principal
            </span>
          </div>

          {/* Visual Formula */}
          <motion.div 
            className="flex items-center gap-3 mb-3"
            {...getMotionProps(0.15)}
          >
            <span className="text-2xl font-black text-pink-400">Lovable</span>
            <span className="text-xl text-slate-500">=</span>
            <span className="text-xl text-slate-400">Prompt</span>
            <ArrowRight className="w-5 h-5 text-pink-400" />
            <span className="text-xl text-slate-400">App</span>
          </motion.div>

          {/* Title - Lovable Style */}
          <h2 className="text-4xl font-black mb-3 leading-tight text-foreground">
            Build something
            <br />
            <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #f472b6 0%, #fb923c 50%, #f472b6 100%)',
                backgroundSize: '200% 100%'
              }}
            >
              Lovable
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
            Describe en español lo que quieres y genera{' '}
            <strong className="text-foreground">apps web funcionales en 30 segundos</strong>.
            No necesitas programar.
          </p>

          {/* Feature Pills with Subtitles */}
          <div className="space-y-2 mb-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex items-center gap-3 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                {...getMotionProps(0.2 + i * 0.05)}
              >
                <feature.icon className="w-5 h-5 text-pink-400 shrink-0" />
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-foreground font-semibold">{feature.title}</span>
                  <span className="text-xs text-muted-foreground">— {feature.subtitle}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Instructor Note */}
          <motion.div
            className="p-4 rounded-xl mb-4"
            style={{
              backgroundColor: 'rgba(251,191,36,0.08)',
              borderLeft: '4px solid #fbbf24'
            }}
            {...getMotionProps(0.35)}
          >
            <div className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lovable genera <span className="text-foreground font-semibold">código profesional</span>, 
                no proyectos de juguete. Puedes exportar a GitHub. — <span className="text-amber-400 font-semibold">{config.instructor}</span>
              </p>
            </div>
          </motion.div>

          {/* Workflow Steps */}
          <motion.div 
            className="flex flex-wrap items-center gap-2"
            {...getMotionProps(0.4)}
          >
            <span className="text-xs text-muted-foreground uppercase tracking-widest mr-1">Proceso:</span>
            {workflowSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <span 
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'rgba(236,72,153,0.2)',
                      color: '#f472b6'
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-300">{step}</span>
                </div>
                {i < workflowSteps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Dashboard Mockup (58%) */}
        <motion.div 
          className="w-[58%] flex items-center"
          {...getMotionProps(0.15)}
        >
          {/* Browser Mockup with Dashboard */}
          <div 
            className="w-full rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 80px -20px rgba(0,0,0,0.5)'
            }}
          >
            {/* Browser Header */}
            <div 
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: 'rgba(30,41,59,0.6)',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div 
                  className="px-4 py-1 rounded-lg text-sm font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.5)'
                  }}
                >
                  miapp.lovable.app/dashboard
                </div>
              </div>
              <span 
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  background: 'rgba(34,197,94,0.2)',
                  color: '#4ade80'
                }}
              >
                Pro
              </span>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 space-y-3">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-semibold text-foreground">Dashboard</span>
                <span className="text-xs text-muted-foreground">Últimos 30 días</span>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-4 gap-2">
                {kpis.map((kpi, i) => (
                  <motion.div 
                    key={kpi.label} 
                    className="p-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                    {...getMotionProps(0.25 + i * 0.05)}
                  >
                    <kpi.icon className="w-4 h-4 text-slate-500 mb-1.5" />
                    <p className="text-lg font-bold text-foreground">{kpi.value}</p>
                    <div className="flex items-center gap-1 mb-0.5">
                      <span style={{ color: kpi.positive ? '#4ade80' : '#f87171', fontSize: '11px', fontWeight: 600 }}>
                        {kpi.change}
                      </span>
                      {kpi.positive ? (
                        <TrendingUp size={10} style={{ color: '#4ade80' }} />
                      ) : (
                        <TrendingDown size={10} style={{ color: '#f87171' }} />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts + Activity Row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Sales Chart */}
                <motion.div 
                  className="p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                  {...getMotionProps(0.4)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-400 font-medium">Ventas Mensuales</p>
                    <div className="flex gap-1">
                      {['1D', '1S', '1M', '1A'].map((period, i) => (
                        <span 
                          key={period} 
                          className="px-1.5 py-0.5 rounded text-[10px]"
                          style={{
                            background: i === 2 ? 'rgba(236,72,153,0.2)' : 'transparent',
                            color: i === 2 ? '#f472b6' : 'rgba(255,255,255,0.4)'
                          }}
                        >
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-14">
                    {[35, 55, 40, 70, 60, 85, 75, 65, 80, 90, 70, 75].map((h, i) => (
                      <motion.div 
                        key={i} 
                        className="flex-1 rounded-t"
                        style={{ 
                          height: `${h}%`,
                          background: 'linear-gradient(to top, #ec4899, #8b5cf6)'
                        }}
                        {...(isExporting ? {} : {
                          initial: { height: 0 },
                          animate: { height: `${h}%` },
                          transition: { delay: 0.5 + i * 0.03, duration: 0.4, ease: premiumEase }
                        })}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Activity Feed */}
                <motion.div 
                  className="p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                  {...getMotionProps(0.45)}
                >
                  <p className="text-sm text-slate-400 font-medium mb-2">Actividad</p>
                  <div className="space-y-1.5">
                    {activity.map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-2"
                        {...getMotionProps(0.5 + i * 0.05)}
                      >
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: item.colorBg }}
                        >
                          <span style={{ color: item.colorText, fontSize: '10px', fontWeight: 700 }}>
                            {item.name[0]}
                          </span>
                        </div>
                        <div className="flex-1 truncate text-xs text-slate-400">{item.action}</div>
                        {item.amount && (
                          <span className="text-xs font-medium" style={{ color: '#4ade80' }}>{item.amount}</span>
                        )}
                        <span className="text-[10px] text-slate-600">{item.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ConsultingSlideLayout>
  );
}
