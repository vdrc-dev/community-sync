import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ChevronDown, ChevronUp, Zap } from 'lucide-react';

export interface AutomationTemplate {
  id: string;
  name: string;
  category: string;
  emoji: string;
  time_before: number;
  time_after: number;
  frequency: number;
  tool: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

const templates: AutomationTemplate[] = [
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
];

const difficultyColors = {
  easy: 'bg-green-500/10 text-green-500 border-green-500/30',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  advanced: 'bg-red-500/10 text-red-500 border-red-500/30',
};

const difficultyLabels = {
  easy: 'Fácil',
  medium: 'Intermedio',
  advanced: 'Avanzado',
};

interface ROITemplatesProps {
  onSelectTemplate: (template: AutomationTemplate) => void;
}

export function ROITemplates({ onSelectTemplate }: ROITemplatesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedTemplates = isExpanded ? templates : templates.slice(0, 4);

  const calculateSavings = (template: AutomationTemplate) => {
    const minutesSaved = (template.time_before - template.time_after) * template.frequency * 4;
    return Math.round(minutesSaved / 60);
  };

  return (
    <Card className="glass border-border/50 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Templates Populares</h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            Clic para agregar
          </Badge>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {displayedTemplates.map((template, index) => (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectTemplate(template)}
                className="group text-left p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{template.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {template.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className={`${difficultyColors[template.difficulty]} text-xs py-0`}>
                        {difficultyLabels[template.difficulty]}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-green-500" />
                        ~{calculateSavings(template)}h/mes
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {templates.length > 4 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Ver {templates.length - 4} más
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
