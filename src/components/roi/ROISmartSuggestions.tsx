import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Zap, TrendingUp, Sparkles } from 'lucide-react';
import type { AutomationTemplate } from './ROITemplates';
import type { Automation } from '@/hooks/useAutomations';

// All available templates - exported from here to share with ROITemplates
export const allTemplates: AutomationTemplate[] = [
  {
    id: 'email-drafts',
    name: 'Redactar emails de seguimiento',
    category: 'email',
    emoji: '📧',
    time_before: 15,
    time_after: 3,
    frequency: 10,
    tool: 'ChatGPT',
    description: 'Usa IA para generar borradores de emails basados en contexto y tono.',
    difficulty: 'easy',
  },
  {
    id: 'email-inbox',
    name: 'Clasificar y priorizar inbox',
    category: 'email',
    emoji: '📬',
    time_before: 20,
    time_after: 5,
    frequency: 7,
    tool: 'ChatGPT',
    description: 'Usa IA para clasificar emails por urgencia y generar respuestas rápidas.',
    difficulty: 'easy',
  },
  {
    id: 'meeting-notes',
    name: 'Resumir notas de reuniones',
    category: 'admin',
    emoji: '📝',
    time_before: 20,
    time_after: 5,
    frequency: 5,
    tool: 'Claude',
    description: 'Transcribe y resume automáticamente grabaciones de reuniones.',
    difficulty: 'easy',
  },
  {
    id: 'calendar-planning',
    name: 'Planificación semanal',
    category: 'admin',
    emoji: '📅',
    time_before: 30,
    time_after: 10,
    frequency: 2,
    tool: 'Claude',
    description: 'Genera agenda semanal basada en prioridades y deadlines.',
    difficulty: 'easy',
  },
  {
    id: 'research-summary',
    name: 'Investigación y síntesis',
    category: 'research',
    emoji: '🔍',
    time_before: 60,
    time_after: 15,
    frequency: 3,
    tool: 'Perplexity',
    description: 'Investiga temas complejos y genera resúmenes estructurados.',
    difficulty: 'medium',
  },
  {
    id: 'research-competitor',
    name: 'Análisis de competencia',
    category: 'research',
    emoji: '🕵️',
    time_before: 90,
    time_after: 20,
    frequency: 2,
    tool: 'Perplexity',
    description: 'Genera reportes comparativos de competidores automáticamente.',
    difficulty: 'medium',
  },
  {
    id: 'code-review',
    name: 'Revisión de código',
    category: 'coding',
    emoji: '💻',
    time_before: 30,
    time_after: 10,
    frequency: 8,
    tool: 'GitHub Copilot',
    description: 'Analiza código en busca de bugs, mejoras y documentación.',
    difficulty: 'medium',
  },
  {
    id: 'code-refactor',
    name: 'Refactorización de código',
    category: 'coding',
    emoji: '🔧',
    time_before: 45,
    time_after: 15,
    frequency: 4,
    tool: 'Claude',
    description: 'Mejora estructura, rendimiento y legibilidad del código.',
    difficulty: 'advanced',
  },
  {
    id: 'documentation',
    name: 'Escribir documentación técnica',
    category: 'coding',
    emoji: '📄',
    time_before: 45,
    time_after: 15,
    frequency: 3,
    tool: 'Claude',
    description: 'Genera READMEs, guías de usuario y documentación de API.',
    difficulty: 'medium',
  },
  {
    id: 'data-analysis',
    name: 'Análisis de datos en Excel',
    category: 'data',
    emoji: '📊',
    time_before: 45,
    time_after: 10,
    frequency: 4,
    tool: 'ChatGPT + Code Interpreter',
    description: 'Genera fórmulas, scripts y visualizaciones automáticamente.',
    difficulty: 'advanced',
  },
  {
    id: 'data-reporting',
    name: 'Generación de reportes',
    category: 'data',
    emoji: '📈',
    time_before: 60,
    time_after: 15,
    frequency: 2,
    tool: 'ChatGPT',
    description: 'Crea reportes ejecutivos con insights y visualizaciones.',
    difficulty: 'medium',
  },
  {
    id: 'social-content',
    name: 'Crear contenido para redes',
    category: 'writing',
    emoji: '✍️',
    time_before: 30,
    time_after: 8,
    frequency: 7,
    tool: 'Claude',
    description: 'Genera posts, captions y threads adaptados a cada plataforma.',
    difficulty: 'easy',
  },
  {
    id: 'blog-writing',
    name: 'Redacción de artículos',
    category: 'writing',
    emoji: '📰',
    time_before: 120,
    time_after: 40,
    frequency: 2,
    tool: 'Claude',
    description: 'Genera borradores de blog posts y artículos estructurados.',
    difficulty: 'medium',
  },
  {
    id: 'image-editing',
    name: 'Edición de imágenes',
    category: 'creative',
    emoji: '🎨',
    time_before: 25,
    time_after: 5,
    frequency: 5,
    tool: 'Midjourney / DALL-E',
    description: 'Genera y edita imágenes para presentaciones y marketing.',
    difficulty: 'medium',
  },
  {
    id: 'presentation-design',
    name: 'Diseño de presentaciones',
    category: 'creative',
    emoji: '🖼️',
    time_before: 60,
    time_after: 20,
    frequency: 3,
    tool: 'Gamma / Beautiful.ai',
    description: 'Genera slides profesionales desde texto o notas.',
    difficulty: 'easy',
  },
];

const categoryLabels: Record<string, string> = {
  email: '📧 Email',
  research: '🔍 Investigación',
  writing: '✍️ Escritura',
  coding: '💻 Programación',
  data: '📊 Datos',
  admin: '📋 Admin',
  creative: '🎨 Creatividad',
  other: '🔧 Otros',
};

interface ROISmartSuggestionsProps {
  automations: Automation[] | undefined;
  onSelectTemplate: (template: AutomationTemplate) => void;
}

export function ROISmartSuggestions({ automations, onSelectTemplate }: ROISmartSuggestionsProps) {
  const suggestions = useMemo(() => {
    if (!automations || automations.length === 0) return null;

    // Count category frequency
    const categoryCount: Record<string, number> = {};
    automations.forEach((a) => {
      if (a.category) {
        categoryCount[a.category] = (categoryCount[a.category] || 0) + 1;
      }
    });

    // Get top 3 categories
    const topCategories = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);

    if (topCategories.length === 0) return null;

    // Get existing task names for deduplication
    const existingNames = new Set(automations.map((a) => a.task_name.toLowerCase()));

    // Filter templates matching top categories that aren't already added
    const recommendedTemplates = allTemplates
      .filter((t) => 
        topCategories.includes(t.category) && 
        !existingNames.has(t.name.toLowerCase())
      )
      .slice(0, 3);

    if (recommendedTemplates.length === 0) return null;

    return {
      topCategories,
      templates: recommendedTemplates,
      topCategory: topCategories[0],
    };
  }, [automations]);

  if (!suggestions) return null;

  const calculateSavings = (template: AutomationTemplate) => {
    const minutesSaved = (template.time_before - template.time_after) * template.frequency * 4;
    return Math.round(minutesSaved / 60);
  };

  const calculateYearlyValue = (template: AutomationTemplate, hourlyRate = 25) => {
    const minutesSaved = (template.time_before - template.time_after) * template.frequency;
    return Math.round((minutesSaved / 60) * hourlyRate * 52);
  };

  return (
    <Card className="glass border-primary/30 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Sugerencias Inteligentes</h3>
            <p className="text-xs text-muted-foreground">
              Basado en tu uso frecuente de {categoryLabels[suggestions.topCategory] || suggestions.topCategory}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {suggestions.templates.map((template, index) => (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectTemplate(template)}
                className="group w-full text-left p-3 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {template.name}
                      </p>
                      <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30 text-primary shrink-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Recomendado
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-green-500" />
                        {calculateSavings(template)}h/mes
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        ~${calculateYearlyValue(template).toLocaleString()}/año
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {suggestions.topCategories.length > 1 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Tus categorías más usadas:{' '}
              {suggestions.topCategories.map((cat, i) => (
                <span key={cat}>
                  <span className="text-foreground font-medium">{categoryLabels[cat] || cat}</span>
                  {i < suggestions.topCategories.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
