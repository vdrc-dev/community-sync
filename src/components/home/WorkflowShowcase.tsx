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
    title: 'Email a Cliente desde Reunión',
    emoji: '📧',
    steps: 4,
    timeSaved: '15 min',
    category: 'Comunicación',
  },
  {
    title: 'Análisis de Competencia',
    emoji: '🔍',
    steps: 5,
    timeSaved: '45 min',
    category: 'Investigación',
  },
  {
    title: 'Documentación de Código',
    emoji: '💻',
    steps: 3,
    timeSaved: '30 min',
    category: 'Desarrollo',
  },
];

export function WorkflowShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>
      
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
              Nuevo
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-6">
              Workflows<br />
              <span className="text-gradient">Interactivos</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              No solo leas los prompts — <strong className="text-foreground">ejecútalos</strong>. 
              Nuestros workflows te permiten probar cada paso con variables personalizables 
              y ver resultados de IA en tiempo real.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Variables dinámicas como {{TEMA}} o {{EMPRESA}}',
                'Ejecución en tiempo real con múltiples modelos IA',
                'Historial de ejecuciones guardado automáticamente',
                'Copia prompts optimizados con un clic',
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
            
            <Button asChild size="lg" className="glow-primary">
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
                className="group p-5 rounded-xl glass border-border/50 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
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
                  
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
            
            <Link
              to="/workflows"
              className="block p-4 rounded-xl border border-dashed border-primary/30 text-center text-primary hover:bg-primary/5 transition-colors"
            >
              Ver todos los workflows →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
