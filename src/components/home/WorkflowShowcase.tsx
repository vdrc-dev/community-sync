import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  ArrowRight, 
  Zap, 
  Clock, 
  CheckCircle2,
  Workflow,
  Brain,
  Code2,
  BarChart3,
  Globe,
  Database
} from 'lucide-react';

const showcaseWorkflows = [
  {
    title: 'CROP → Metaprompt → Investigar a Fondo',
    icon: Brain,
    steps: 4,
    timeSaved: '45 min',
    category: 'Investigación',
    hue: 263,
    realCase: 'Estudio de mercado agrícola — Gen 10',
  },
  {
    title: 'PRD → Lovable + Supabase + GitHub + Codex',
    icon: Code2,
    steps: 6,
    timeSaved: '4 hrs',
    category: 'Desarrollo',
    hue: 160,
    realCase: 'ERP para administrar talleres VDRC — Clase Gratuita',
  },
  {
    title: 'O3 + Canvas: De CSV a Dashboard interactivo',
    icon: BarChart3,
    steps: 3,
    timeSaved: '2 hrs',
    category: 'Análisis',
    hue: 200,
    realCase: 'Tabla de ventas compleja analizada en clase — Gen 4',
  },
  {
    title: 'Claude en Excel: Modelo Financiero desde cero',
    icon: Zap,
    steps: 4,
    timeSaved: '1.5 hrs',
    category: 'Finanzas',
    hue: 45,
    realCase: 'Evaluación proyecto agrícola — Gen 10',
  },
  {
    title: 'Notebook LM: Conversar con tus documentos',
    icon: Globe,
    steps: 3,
    timeSaved: '3 hrs',
    category: 'Aprendizaje',
    hue: 120,
    realCase: 'Análisis inmobiliario Santiago — Gen 10',
  },
  {
    title: 'Cloud Code + Playwright: Agente en Chrome',
    icon: Database,
    steps: 5,
    timeSaved: '2 días',
    category: 'Agentes',
    hue: 280,
    realCase: 'Integración CRM + ERP — Gen 10',
  },
];

export function WorkflowShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/50 bg-primary/5">
              <Workflow className="w-3 h-3 mr-1" />
              Casos Reales del Taller
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-6">
              Workflows que<br />
              <span className="text-gradient">usamos en clase</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              No son prompts teóricos — son <strong className="text-foreground">flujos probados en vivo</strong>{' '}
              durante las sesiones del taller, con casos reales de los participantes.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'PRD con GPT personalizado → MVP en Lovable → Supabase → Deploy',
                '5 capas ChatGPT: instrucciones, memoria, proyectos, GPTs, acciones',
                'Metaprompting + CROP: la IA mejora tu prompt antes de ejecutar',
                'Context Engineering: PDFs, normativas, planes de cuenta → respuesta precisa',
                'Chunking: resumen exhaustivo → nueva conversación sin pérdida de contexto',
                'Validación cruzada: O3 analiza, otro chat audita — como un practicante senior',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02]">
              <Link to="/workflows">
                Explorar Workflows
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
          
          {/* Right preview cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {showcaseWorkflows.map((workflow, i) => {
              const WfIcon = workflow.icon;
              return (
                <motion.div
                  key={workflow.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group p-5 rounded-2xl glass glass-specular hover:border-white/[0.1] transition-all duration-300 cursor-pointer overflow-hidden relative"
                >
                  {/* Subtle accent left bar */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-500"
                    style={{ background: `hsl(${workflow.hue} 70% 55%)` }}
                  />

                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, hsl(${workflow.hue} 70% 55% / 0.12), hsl(${workflow.hue} 70% 55% / 0.04))`,
                        border: `1px solid hsl(${workflow.hue} 70% 55% / 0.2)`,
                      }}
                    >
                      <WfIcon className="w-6 h-6" style={{ color: `hsl(${workflow.hue} 70% 55%)` }} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {workflow.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" style={{ color: `hsl(${workflow.hue} 70% 55% / 0.6)` }} />
                          {workflow.steps} pasos
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" style={{ color: `hsl(${workflow.hue} 70% 55% / 0.6)` }} />
                          -{workflow.timeSaved}
                        </span>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                          style={{
                            color: `hsl(${workflow.hue} 70% 55%)`,
                            background: `hsl(${workflow.hue} 70% 55% / 0.08)`,
                            border: `1px solid hsl(${workflow.hue} 70% 55% / 0.12)`,
                          }}
                        >
                          {workflow.category}
                        </span>
                      </div>
                      {workflow.realCase && (
                        <p className="text-[10px] text-muted-foreground/50 mt-1.5 font-mono italic">
                          Caso real: {workflow.realCase}
                        </p>
                      )}
                    </div>
                    
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center opacity-30 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: `hsl(${workflow.hue} 70% 55% / 0.08)`,
                        border: `1px solid hsl(${workflow.hue} 70% 55% / 0.15)`,
                      }}
                    >
                      <Play className="w-4 h-4" style={{ color: `hsl(${workflow.hue} 70% 55%)` }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            <Link
              to="/workflows"
              className="group block p-4 rounded-2xl border border-dashed border-white/[0.06] text-center text-primary/70 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
            >
              <span className="text-sm font-mono">Ver todos los workflows del taller</span>
              <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
