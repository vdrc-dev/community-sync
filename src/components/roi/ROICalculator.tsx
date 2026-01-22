import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAutomations, AutomationInsert } from '@/hooks/useAutomations';
import { ROITemplates, type AutomationTemplate } from './ROITemplates';
import { ROISavingsChart } from './ROISavingsChart';
import { ROIAchievements } from './ROIAchievements';
import { Calculator, Clock, DollarSign, TrendingUp, Zap, Trash2, Plus, Sparkles } from 'lucide-react';

const categories = [
  { value: 'email', label: '📧 Email y comunicación' },
  { value: 'research', label: '🔍 Investigación' },
  { value: 'writing', label: '✍️ Escritura y contenido' },
  { value: 'coding', label: '💻 Programación' },
  { value: 'data', label: '📊 Análisis de datos' },
  { value: 'admin', label: '📋 Tareas administrativas' },
  { value: 'creative', label: '🎨 Diseño y creatividad' },
  { value: 'other', label: '🔧 Otros' },
];

const defaultForm: AutomationInsert = {
  task_name: '',
  category: '',
  time_before_minutes: 30,
  time_after_minutes: 5,
  frequency_per_week: 5,
  hourly_rate: 25,
  tool_used: '',
};

export function ROICalculator() {
  const { automations, roiSummary, addAutomation, deleteAutomation, calculateROI, isLoading } = useAutomations();
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<ReturnType<typeof calculateROI> | null>(null);
  const [form, setForm] = useState<AutomationInsert>(defaultForm);

  const handleInputChange = useCallback((field: keyof AutomationInsert, value: string | number) => {
    setForm(prev => {
      const newForm = { ...prev, [field]: value };
      
      // Update preview
      if (newForm.time_before_minutes > 0 && newForm.frequency_per_week > 0) {
        setPreview(calculateROI(newForm));
      }
      
      return newForm;
    });
  }, [calculateROI]);

  const handleSelectTemplate = useCallback((template: AutomationTemplate) => {
    const newForm: AutomationInsert = {
      task_name: template.name,
      category: template.category,
      time_before_minutes: template.time_before,
      time_after_minutes: template.time_after,
      frequency_per_week: template.frequency,
      hourly_rate: 25,
      tool_used: template.tool,
    };
    setForm(newForm);
    setPreview(calculateROI(newForm));
    setShowForm(true);
  }, [calculateROI]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAutomation.mutateAsync(form);
    setForm(defaultForm);
    setShowForm(false);
    setPreview(null);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roiSummary?.total_automations || 0}</p>
                <p className="text-xs text-muted-foreground">Automatizaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatTime(roiSummary?.weekly_minutes_saved || 0)}
                </p>
                <p className="text-xs text-muted-foreground">Ahorrado/semana</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatMoney(roiSummary?.monthly_value_saved || 0)}
                </p>
                <p className="text-xs text-muted-foreground">Valor/mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {formatMoney(roiSummary?.yearly_value_saved || 0)}
                </p>
                <p className="text-xs text-muted-foreground">Valor/año</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Only show when there are automations */}
      {(automations?.length ?? 0) > 0 && (
        <ROISavingsChart automations={automations || []} calculateROI={calculateROI} />
      )}

      {/* Achievements */}
      <ROIAchievements roiSummary={roiSummary} totalAutomations={automations?.length || 0} />

      {/* Templates */}
      <ROITemplates onSelectTemplate={handleSelectTemplate} />

      {/* Add Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Mis Automatizaciones</h3>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          {showForm ? (
            <>Cancelar</>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Manual
            </>
          )}
        </Button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="glass border-primary/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Nueva Automatización
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre de la tarea</Label>
                      <Input
                        placeholder="Ej: Escribir emails de seguimiento"
                        value={form.task_name}
                        onChange={(e) => handleInputChange('task_name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Categoría</Label>
                      <Select 
                        value={form.category} 
                        onValueChange={(v) => handleInputChange('category', v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Tiempo antes (min)</Label>
                      <Input
                        type="number"
                        min={1}
                        value={form.time_before_minutes}
                        onChange={(e) => handleInputChange('time_before_minutes', parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tiempo después (min)</Label>
                      <Input
                        type="number"
                        min={0}
                        value={form.time_after_minutes}
                        onChange={(e) => handleInputChange('time_after_minutes', parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Frecuencia/semana</Label>
                      <Input
                        type="number"
                        min={1}
                        value={form.frequency_per_week}
                        onChange={(e) => handleInputChange('frequency_per_week', parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tu $/hora</Label>
                      <Input
                        type="number"
                        min={1}
                        value={form.hourly_rate}
                        onChange={(e) => handleInputChange('hourly_rate', parseInt(e.target.value) || 25)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Herramienta usada (opcional)</Label>
                    <Input
                      placeholder="Ej: ChatGPT, Claude, Perplexity..."
                      value={form.tool_used || ''}
                      onChange={(e) => handleInputChange('tool_used', e.target.value)}
                    />
                  </div>

                  {/* Live Preview */}
                  {preview && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-primary/10 border border-green-500/20"
                    >
                      <p className="text-sm font-medium mb-2">📊 Preview del ahorro:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Reducción</p>
                          <p className="text-lg font-bold text-green-500">{preview.percentageReduction}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Semanal</p>
                          <p className="text-lg font-bold">{formatTime(preview.weeklyMinutes)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Mensual</p>
                          <p className="text-lg font-bold">{formatMoney(preview.monthlyValue)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Anual</p>
                          <p className="text-lg font-bold text-primary">{formatMoney(preview.yearlyValue)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={addAutomation.isPending}>
                      {addAutomation.isPending ? 'Guardando...' : 'Guardar Automatización'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Automations List */}
      <div className="space-y-3">
        {automations?.length === 0 && !isLoading && (
          <Card className="glass border-dashed border-muted-foreground/30">
            <CardContent className="p-8 text-center">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                Aún no has registrado ninguna automatización.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Agrega las tareas que has optimizado con IA para calcular tu ROI.
              </p>
            </CardContent>
          </Card>
        )}

        {automations?.map((automation, index) => {
          const roi = calculateROI(automation);
          const category = categories.find(c => c.value === automation.category);
          
          return (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{category?.label.split(' ')[0] || '🔧'}</span>
                        <h4 className="font-medium truncate">{automation.task_name}</h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>{automation.time_before_minutes} min → {automation.time_after_minutes} min</span>
                        <span>•</span>
                        <span>{automation.frequency_per_week}x/semana</span>
                        {automation.tool_used && (
                          <>
                            <span>•</span>
                            <span className="text-primary">{automation.tool_used}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-green-500 font-medium">-{roi.percentageReduction}%</p>
                        <p className="text-xs text-muted-foreground">{formatMoney(roi.yearlyValue)}/año</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => deleteAutomation.mutate(automation.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
