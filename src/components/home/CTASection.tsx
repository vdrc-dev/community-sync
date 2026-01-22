import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Users } from 'lucide-react';

interface CTASectionProps {
  isAuthenticated: boolean;
}

export function CTASection({ isAuthenticated }: CTASectionProps) {
  if (isAuthenticated) return null;

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-xl" />
          
          <div className="relative p-8 sm:p-12 lg:p-16 rounded-2xl glass border-primary/30 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-6">
                ¿Listo para<br />
                <span className="text-gradient">transformar tu productividad?</span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Únete a más de 200 profesionales que ya dominan las herramientas de IA 
                para trabajar de forma más inteligente, no más dura.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {[
                  { icon: Zap, text: 'Workflows interactivos' },
                  { icon: Users, text: 'Comunidad activa' },
                  { icon: Sparkles, text: 'Recursos exclusivos' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-10 text-lg glow-primary">
                  <Link to="/auth?mode=signup">
                    Crear mi cuenta gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Sin tarjeta de crédito • Acceso inmediato
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
