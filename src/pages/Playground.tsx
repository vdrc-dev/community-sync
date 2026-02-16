import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptPlayground } from '@/components/playground/PromptPlayground';
import { PromptGenerator } from '@/components/playground/PromptGenerator';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Wand2, FlaskConical, BookOpen, ArrowRight, Lightbulb, Target, Copy, Check, Zap, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const QUICK_PROMPTS = [
  {
    category: 'CROP',
    icon: Target,
    color: 'text-green-400',
    prompts: [
      { label: 'Analisis de datos', text: 'Contexto: soy [tu rol] en [tu empresa]. Rol: actua como analista de datos senior. Objetivo: analiza estos datos y entrega insights accionables. Pasos: 1) resume tendencias, 2) identifica anomalias, 3) sugiere 3 acciones concretas.' },
      { label: 'Estrategia de contenido', text: 'Contexto: empresa de [industria] con [X] seguidores en redes. Rol: estratega de contenido digital. Objetivo: crear un calendario de contenido para 2 semanas. Pasos: 1) define pilares de contenido, 2) asigna formatos, 3) escribe los copies.' },
    ],
  },
  {
    category: 'Metaprompting',
    icon: Brain,
    color: 'text-purple-400',
    prompts: [
      { label: 'Diseñar prompt optimo', text: 'Antes de responder, diseña el prompt mas efectivo para lograr lo siguiente: [describe tu objetivo]. Muestra el prompt diseñado y luego ejecutalo.' },
      { label: 'Auditar mi prompt', text: 'Analiza este prompt y mejoralo aplicando CROP (Contexto, Rol, Objetivo, Pasos). Prompt original: [pega tu prompt]. Entrega la version mejorada y explica cada cambio.' },
    ],
  },
  {
    category: 'Productividad',
    icon: Zap,
    color: 'text-yellow-400',
    prompts: [
      { label: 'Resumen ejecutivo', text: 'Resume este documento en formato ejecutivo: 1) Hallazgos clave (3-5 bullets), 2) Implicaciones, 3) Recomendaciones, 4) Proximos pasos. Documento: [pega texto]' },
      { label: 'Email profesional', text: 'Escribe un email profesional y conciso. Tono: [formal/cercano]. Objetivo: [que quieres lograr]. Destinatario: [quien es]. Contexto adicional: [info relevante]. Maximo 150 palabras.' },
    ],
  },
];

const TIPS = [
  'Siempre dale contexto a la IA — quien eres, que haces, que esperas.',
  'Usa "Pasos:" para forzar respuestas estructuradas.',
  'Si la respuesta no es buena, el prompt es el problema, no el modelo.',
  'Pide formato especifico: bullets, tabla, codigo, JSON.',
  'Metaprompting: pide que diseñe el mejor prompt antes de ejecutar.',
  'Chunking: divide tareas grandes en pasos secuenciales.',
  'Siempre audita: "como validar el trabajo de un practicante."',
];

export default function Playground() {
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);
  const [tipIdx] = useState(() => Math.floor(Math.random() * TIPS.length));

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(id);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <Layout>
      <div className="page-container section-py relative">
        <PageHeader
          title={<>Laboratorio de <span className="text-gradient">IA</span></>}
          description="Experimenta con prompts en tiempo real. Aplica CROP, metaprompting y chunking para obtener resultados profesionales."
          badge={{ label: 'Lab IA', icon: <FlaskConical className="w-3 h-3" /> }}
          breadcrumbs={[{ label: 'Lab IA' }]}
        />

        {/* Educational tip banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="flex-1 glass rounded-2xl p-4 flex items-start gap-3 border-yellow-500/10 bg-yellow-500/[0.02]">
            <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono text-yellow-400/60 uppercase tracking-wider">Tip del lab</span>
              <p className="text-xs text-foreground/70 mt-0.5">{TIPS[tipIdx]}</p>
            </div>
          </div>
          <Link
            to="/dictionary"
            className="group inline-flex items-center gap-2 px-4 py-3 rounded-xl glass-pill text-xs text-muted-foreground hover:text-foreground transition-all shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            Diccionario
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </motion.div>

        {/* Main tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="playground" className="space-y-6">
            <TabsList className="grid w-full max-w-lg grid-cols-3 bg-muted/30 border border-border/30 p-1 rounded-xl">
              <TabsTrigger
                value="playground"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 rounded-lg transition-all duration-300 font-mono text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Playground
              </TabsTrigger>
              <TabsTrigger
                value="generator"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 rounded-lg transition-all duration-300 font-mono text-sm"
              >
                <Wand2 className="h-4 w-4" />
                Generador
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 rounded-lg transition-all duration-300 font-mono text-sm"
              >
                <Target className="h-4 w-4" />
                Plantillas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playground">
              <PromptPlayground />
            </TabsContent>

            <TabsContent value="generator">
              <PromptGenerator />
            </TabsContent>

            <TabsContent value="templates">
              <div className="space-y-6">
                <div className="glass rounded-2xl p-5 border-primary/5">
                  <h3 className="font-mono font-semibold text-sm mb-1">Prompts listos para usar</h3>
                  <p className="text-xs text-muted-foreground">Copia, personaliza con tus datos, y pega en ChatGPT, Claude o cualquier modelo. Todos usan metodologia CROP.</p>
                </div>

                {QUICK_PROMPTS.map((group) => (
                  <div key={group.category}>
                    <div className="flex items-center gap-2 mb-3">
                      <group.icon className={cn('w-4 h-4', group.color)} />
                      <h3 className="font-mono font-semibold text-sm">{group.category}</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {group.prompts.map((prompt, pi) => {
                        const id = `${group.category}-${pi}`;
                        return (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: pi * 0.05 }}
                            className="glass rounded-2xl p-4 group hover:border-primary/15 transition-all"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5">{prompt.label}</Badge>
                              <button
                                onClick={() => handleCopy(prompt.text, id)}
                                className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-md hover:bg-primary/10"
                                title="Copiar prompt"
                              >
                                {copiedIdx === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                              {prompt.text}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
}
