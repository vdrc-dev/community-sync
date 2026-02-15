import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Package, ShoppingCart, Activity, ArrowUpRight, ArrowDownRight, Clock, BarChart3, PieChart, Bell, Search, Filter, MoreVertical, ChevronDown, Eye, Settings, Calendar } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';

interface DashboardMockupProps {
  className?: string;
}

export function DashboardMockup({ className }: DashboardMockupProps) {
  const { isExporting } = useExportContext();

  const getMotionProps = (delay: number) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.3 },
        };

  const metrics = [
    { label: 'Ventas', value: '$12,847', change: '+23.5%', trend: 'up', icon: DollarSign, color: '#10B981' },
    { label: 'Pedidos', value: '284', change: '+12.3%', trend: 'up', icon: ShoppingCart, color: '#3B82F6' },
    { label: 'Productos', value: '1,847', change: '-2.1%', trend: 'down', icon: Package, color: '#F59E0B' },
    { label: 'Usuarios', value: '3,421', change: '+15.2%', trend: 'up', icon: Users, color: '#EC4899' },
  ];

  const chartData = [35, 55, 45, 70, 60, 85, 75, 92, 68, 82, 95, 88];
  const pieData = [
    { label: 'Electrónicos', value: 45, color: '#10B981' },
    { label: 'Accesorios', value: 30, color: '#3B82F6' },
    { label: 'Otros', value: 25, color: '#F59E0B' },
  ];

  const recentActivity = [
    { name: 'Ana García', action: 'Nuevo pedido #1284', time: '2m', color: 'bg-purple-500', amount: '$234' },
    { name: 'Luis Pérez', action: 'Stock actualizado', time: '8m', color: 'bg-blue-500', amount: null },
    { name: 'María López', action: 'Nuevo cliente', time: '15m', color: 'bg-orange-500', amount: null },
    { name: 'Carlos Ruiz', action: 'Pago recibido', time: '1h', color: 'bg-emerald-500', amount: '$1,299' },
    { name: 'Sofia Torres', action: 'Pedido enviado', time: '2h', color: 'bg-pink-500', amount: '$567' },
  ];

  const topProducts = [
    { name: 'MacBook Pro 14"', sales: 127, revenue: '$164,973', growth: '+18%' },
    { name: 'iPhone 15 Pro', sales: 89, revenue: '$97,011', growth: '+12%' },
    { name: 'AirPods Pro', sales: 234, revenue: '$58,266', growth: '+28%' },
  ];

  return (
    <div className={`relative w-full h-full flex flex-col ${className || ''}`}>
      {/* Browser Window Frame */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-white/[0.12] bg-[hsl(220,18%,5%)] shadow-2xl">
        {/* Browser Header */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-white/[0.08] bg-[hsl(220,18%,7%)] shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[9px] font-mono text-muted-foreground/70">
              <svg className="w-2.5 h-2.5 text-emerald-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              miapp.vercel.app/dashboard
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-muted-foreground/50" />
            <Settings className="w-3.5 h-3.5 text-muted-foreground/50" />
          </div>
        </div>

        {/* Dashboard Content - fills remaining space */}
        <div className="flex-1 flex flex-col gap-2 p-2.5 bg-[hsl(220,18%,4%)] overflow-hidden min-h-0">
          {/* Top bar */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">Dashboard</h2>
              <span className="px-1.5 py-0.5 rounded bg-primary/20 text-[8px] text-primary font-medium">Pro</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[9px]">
                <Calendar className="w-3 h-3 text-muted-foreground/60" />
                <span className="text-muted-foreground/70">Últimos 30 días</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground/50" />
              </div>
              <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center">
                <Filter className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-4 gap-2 shrink-0">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
                {...getMotionProps(0.05 + i * 0.03)}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div 
                    className="w-7 h-7 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <metric.icon className="w-3.5 h-3.5" style={{ color: metric.color }} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-[9px] font-semibold ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {metric.change}
                  </div>
                </div>
                <div className="text-base font-bold text-foreground">{metric.value}</div>
                <div className="text-[9px] text-muted-foreground/60">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main content grid - fills remaining */}
          <div className="flex-1 grid grid-cols-4 gap-2 min-h-0">
            {/* Chart - 2 cols */}
            <motion.div
              className="col-span-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex flex-col"
              {...getMotionProps(0.2)}
            >
              <div className="flex items-center justify-between mb-2 shrink-0">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-semibold text-foreground">Ventas Mensuales</span>
                </div>
                <div className="flex gap-0.5">
                  {['1D', '1S', '1M', '1A'].map((label) => (
                    <span
                      key={label}
                      className={`px-1.5 py-0.5 rounded text-[8px] font-medium cursor-pointer ${
                        label === '1M' 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-muted-foreground/50 hover:bg-white/[0.05]'
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Chart area - fills remaining */}
              <div className="flex-1 flex items-end gap-1 min-h-0 pt-1">
                {chartData.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary/70 to-primary/30 rounded-t hover:from-primary/90 hover:to-primary/50 transition-colors cursor-pointer"
                    style={{ height: `${h}%` }}
                    initial={isExporting ? {} : { height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.25 + i * 0.02, duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Pie + Stats - 1 col */}
            <motion.div
              className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex flex-col"
              {...getMotionProps(0.25)}
            >
              <div className="flex items-center gap-1.5 mb-2 shrink-0">
                <PieChart className="w-3.5 h-3.5 text-muted-foreground/60" />
                <span className="text-[10px] font-semibold">Por Categoría</span>
              </div>
              {/* Pie visualization */}
              <div className="flex-1 flex items-center justify-center min-h-0">
                <div className="w-16 h-16 rounded-full relative" style={{
                  background: `conic-gradient(#10B981 0% 45%, #3B82F6 45% 75%, #F59E0B 75% 100%)`
                }}>
                  <div className="absolute inset-2 rounded-full bg-[hsl(220,18%,5%)]" />
                </div>
              </div>
              {/* Legend */}
              <div className="space-y-1 shrink-0">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[8px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground/70">{item.label}</span>
                    </div>
                    <span className="font-semibold" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity - 1 col */}
            <motion.div
              className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex flex-col"
              {...getMotionProps(0.3)}
            >
              <div className="flex items-center justify-between mb-2 shrink-0">
                <span className="text-[10px] font-semibold text-foreground">Actividad</span>
                <Clock className="w-3.5 h-3.5 text-muted-foreground/50" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5 min-h-0 overflow-hidden">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={activity.name}
                    className="flex items-center gap-2"
                    initial={isExporting ? {} : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                  >
                    <div className={`w-5 h-5 rounded-md ${activity.color} flex items-center justify-center text-[8px] font-bold text-white shrink-0`}>
                      {activity.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-medium leading-tight truncate">{activity.name}</p>
                      <p className="text-[8px] text-muted-foreground/50 truncate">{activity.action}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {activity.amount && <p className="text-[8px] font-semibold text-emerald-400">{activity.amount}</p>}
                      <p className="text-[7px] text-muted-foreground/40">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom section - Top products */}
          <motion.div
            className="shrink-0 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08]"
            {...getMotionProps(0.4)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-semibold">Top Productos</span>
              </div>
              <Eye className="w-3.5 h-3.5 text-muted-foreground/50" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {topProducts.map((product, i) => (
                <div key={i} className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-medium truncate flex-1">{product.name}</span>
                    <span className="text-[8px] text-emerald-400 font-semibold ml-1">{product.growth}</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px]">
                    <span className="text-muted-foreground/60">{product.sales} ventas</span>
                    <span className="font-semibold text-foreground/80">{product.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
