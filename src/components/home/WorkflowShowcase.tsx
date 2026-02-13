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
  Workflow
} from 'lucide-react';

const showcaseWorkflows = [
  {
    title: 'Metaprompt + Investigación a Fondo',
    emoji: '🧠',
    steps: 4,
    timeSaved: '45 min',
    category: 'Investigación',
    color: 'from-purple-500/20 to-pink-500/10',
  },
  {
    title: 'Vibe Coding: App con Lovable + Supabase',
    emoji: '💻',
    steps: 6,
    timeSaved: '4 hrs',
    category: 'Desarrollo',
    color: 'from-primary/20 to-accent/10',
  },
  {
    title: 'Presentación Profesional con Gama',
    emoji: '📊',
    steps: 5,
    timeSaved: '2 hrs',
    category: 'Presentaciones',
    color: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    title: 'Análisis Financiero con Claude en Excel',
    emoji: '📈',
    steps: 3,
    timeSaved: '30 min',
    category: 'Finanzas',
    color: 'from-orange-500/20 to-yellow-500/10',
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
                'Metaprompts: pide a la IA que escriba el prompt perfecto',
                'Separar investigación de estrategia en flujos distintos',
                'Variables dinámicas: {{EMPRESA}}, {{INDUSTRIA}}, {{OBJETIVO}}',
                'Lanzar el mismo prompt en ChatGPT, Gemini y Manus para comparar',
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
            {showcaseWorkflows.map((workflow, i) => (
              <motion.div
                key={workflow.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group p-5 rounded-xl glass border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${workflow.color} border border-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {workflow.emoji}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {workflow.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {workflow.steps} pasos
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        -{workflow.timeSaved}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center opacity-30 group-hover:opacity-100 group-hover:bg-primary/20 transition-all duration-300">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
            
            <Link
              to="/workflows"
              className="group block p-4 rounded-xl border border-dashed border-primary/20 text-center text-primary/70 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
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
