import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock } from 'lucide-react';
import type { Automation } from '@/hooks/useAutomations';

interface ROISavingsChartProps {
  automations: Automation[];
  calculateROI: (automation: { time_before_minutes: number; time_after_minutes: number; frequency_per_week: number; hourly_rate?: number }) => {
    weeklyMinutes: number;
    monthlyValue: number;
    yearlyValue: number;
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  email: 'hsl(var(--primary))',
  research: 'hsl(210, 100%, 60%)',
  writing: 'hsl(150, 60%, 50%)',
  coding: 'hsl(280, 70%, 60%)',
  data: 'hsl(45, 90%, 55%)',
  admin: 'hsl(0, 70%, 60%)',
  creative: 'hsl(320, 70%, 60%)',
  other: 'hsl(var(--muted-foreground))',
};

const CATEGORY_LABELS: Record<string, string> = {
  email: 'Email',
  research: 'Investigación',
  writing: 'Escritura',
  coding: 'Programación',
  data: 'Datos',
  admin: 'Admin',
  creative: 'Creatividad',
  other: 'Otros',
};

export function ROISavingsChart({ automations, calculateROI }: ROISavingsChartProps) {
  // Calculate projected savings over 12 months
  const projectionData = useMemo(() => {
    const monthlyTotal = automations.reduce((sum, a) => {
      const roi = calculateROI(a);
      return sum + roi.monthlyValue;
    }, 0);

    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX', { month: 'short' }),
      value: Math.round(monthlyTotal * (i + 1)),
      monthly: Math.round(monthlyTotal),
    }));
  }, [automations, calculateROI]);

  // Calculate category breakdown
  const categoryData = useMemo(() => {
    const byCategory: Record<string, number> = {};
    
    automations.forEach((a) => {
      const cat = a.category || 'other';
      const roi = calculateROI(a);
      byCategory[cat] = (byCategory[cat] || 0) + roi.weeklyMinutes;
    });

    return Object.entries(byCategory)
      .map(([category, minutes]) => ({
        name: CATEGORY_LABELS[category] || category,
        value: minutes,
        color: CATEGORY_COLORS[category] || CATEGORY_COLORS.other,
      }))
      .sort((a, b) => b.value - a.value);
  }, [automations, calculateROI]);

  const totalWeeklyMinutes = categoryData.reduce((sum, c) => sum + c.value, 0);

  if (automations.length === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Projection Chart */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Proyección de Ahorro Acumulado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="month" 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Acumulado']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#savingsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            Tiempo Ahorrado por Categoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value} min/semana`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {categoryData.slice(0, 5).map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="flex-1 truncate text-muted-foreground">{cat.name}</span>
                  <span className="font-medium">
                    {Math.round((cat.value / totalWeeklyMinutes) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
