import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { ContinueLearning } from '@/components/resume/ContinueLearning';
import { ChallengesList } from '@/components/challenges/ChallengesList';
import { StreakDisplay } from '@/components/streaks/StreakDisplay';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { WorkflowShowcase } from '@/components/home/WorkflowShowcase';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { Footer } from '@/components/home/Footer';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ToolsMarquee } from '@/components/home/ToolsMarquee';
import { ActiveGenerationWidget } from '@/components/dashboard/ActiveGenerationWidget';
import { RecentlyVisited } from '@/components/dashboard/RecentlyVisited';
import { EcosystemSection } from '@/components/home/EcosystemSection';
import { Gen11Banner } from '@/components/home/Gen11Banner';
import { GenerationsQuickGrid } from '@/components/home/GenerationsQuickGrid';
import { CommunityPreview } from '@/components/home/CommunityPreview';
import { LearningRoadmap } from '@/components/home/LearningRoadmap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, Workflow, BookOpen, Sparkles, Library, Users, ArrowRight, Lightbulb, GraduationCap, Target, Zap, Layers, Download } from 'lucide-react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return 'Buenas noches';
  if (hour < 12) return 'Buenos dias';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

function getDayContext() {
  const day = new Date().getDay();
  const msgs = [
    'Domingo perfecto para explorar nuevas herramientas',
    'Semana nueva — ¿que vas a automatizar hoy?',
    'Martes de taller — revisa tu generacion activa',
    'Mitad de semana, buen momento para practicar prompts',
    'Jueves de productividad — prueba un workflow nuevo',
    'Viernes — consolida lo aprendido esta semana',
    'Sabado para experimentar con vibe coding',
  ];
  return msgs[day];
}

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* ━━━ HERO ━━━ Primera impresión */}
      <HeroSection isAuthenticated={!!user} />

      {/* ━━━ TOOLS MARQUEE ━━━ Prueba social */}
      <ToolsMarquee />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VISITANTE: Explicar → Mostrar → Convencer
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {!user && <HowItWorks />}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          AUTENTICADO: Dashboard personalizado
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {user && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Personalized greeting */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold">
                    {getGreeting()}, {user.user_metadata?.full_name?.split(' ')[0] || 'participante'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {getDayContext()}
                  </p>
                </div>
                <kbd
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-muted-foreground bg-muted/50 rounded-lg border border-border/40 cursor-pointer hover:bg-muted/70 hover:text-foreground transition-colors"
                  onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                  title="Buscar rapido"
                >
                  <span className="text-[10px] opacity-60">⌘</span>K buscar
                </kbd>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <ActiveGenerationWidget />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <StreakDisplay />
              </motion.div>

              {/* Quick access grid */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[
                    { href: '/workflows', label: 'Workflows', icon: Workflow, hue: 160 },
                    { href: '/tools', label: 'Herramientas', icon: Wrench, hue: 45 },
                    { href: '/community', label: 'Comunidad', icon: Users, hue: 200 },
                    { href: '/playground', label: 'Lab IA', icon: Sparkles, hue: 340 },
                    { href: '/dictionary', label: 'Diccionario', icon: Library, hue: 195 },
                    { href: '/personalizacion-ia', label: 'Personalizar IA', icon: Layers, hue: 263 },
                    { href: '/guia-instalacion', label: 'Instalacion', icon: Download, hue: 280 },
                    { href: '/generations', label: 'Generaciones', icon: BookOpen, hue: 185 },
                  ].map((link, i) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="group flex flex-col items-center gap-2 p-3 rounded-xl glass hover:border-white/[0.1] transition-all duration-300 active:scale-[0.97] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)]"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_12px_-2px_var(--glow)]"
                        style={{
                          background: `hsl(${link.hue} 70% 55% / 0.08)`,
                          border: `1px solid hsl(${link.hue} 70% 55% / 0.15)`,
                          ['--glow' as string]: `hsl(${link.hue} 70% 55% / 0.3)`,
                        }}
                      >
                        <link.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" style={{ color: `hsl(${link.hue} 70% 55%)` }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Daily Learning Nudge */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {(() => {
                  const nudges = [
                    { icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-500/5 border-yellow-500/10', title: 'Tip: Usa CROP en todo', text: 'Contexto + Rol + Objetivo + Pasos. Probalo hoy en tu proxima conversacion con IA.', link: '/dictionary', linkText: 'Ver en Diccionario' },
                    { icon: Target, color: 'text-red-400', bg: 'bg-red-500/5 border-red-500/10', title: 'Desafio: Inbox Zero', text: '¿Puedes vaciar tu bandeja hoy? Usa Clean Email para borrar suscripciones innecesarias.', link: '/tools', linkText: 'Ver herramientas' },
                    { icon: Zap, color: 'text-primary', bg: 'bg-primary/5 border-primary/10', title: 'Micro-ejercicio: Metaprompting', text: 'En vez de pedirle algo directo a ChatGPT, dile: "Diseña el mejor prompt para [tu tarea]."', link: '/playground', linkText: 'Ir al Lab' },
                    { icon: GraduationCap, color: 'text-purple-400', bg: 'bg-purple-500/5 border-purple-500/10', title: '¿Sabias que...?', text: 'Claude puede procesar 200K tokens (≈150 paginas) en una sola conversacion. Ideal para analizar documentos largos.', link: '/dictionary', linkText: 'Explorar conceptos' },
                    { icon: Sparkles, color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/10', title: 'Explora: Vibe Coding', text: 'Describe una app en lenguaje natural y Lovable la construye en 60 segundos. Sin saber programar.', link: '/workflows', linkText: 'Ver workflows' },
                  ];
                  const today = nudges[new Date().getDate() % nudges.length];
                  return (
                    <div className={`rounded-2xl p-4 border ${today.bg} flex items-start gap-3 card-edge-highlight relative overflow-hidden group/nudge`}>
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover/nudge:opacity-30 transition-opacity" style={{ background: 'currentColor' }} />
                      <today.icon className={`w-5 h-5 ${today.color} shrink-0 mt-0.5`} />
                      <div className="flex-1 min-w-0 relative">
                        <h4 className="text-sm font-semibold">{today.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{today.text}</p>
                      </div>
                      <Link to={today.link} className="shrink-0 text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 mt-1 group/link">
                        {today.linkText}
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  );
                })()}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <ContinueLearning />
                  <ChallengesList compact maxChallenges={2} />
                </div>
              </motion.div>

              {/* Recently visited pages */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <RecentlyVisited />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECCIONES COMPARTIDAS — flujo limpio
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* ━━━ GENERACIONES ━━━ Las 11 generaciones */}
      <GenerationsQuickGrid />

      <div className="divider-epic mx-auto max-w-5xl" />

      {/* ━━━ COMUNIDAD ━━━ Interacción entre participantes */}
      <CommunityPreview isAuthenticated={!!user} />

      {/* ━━━ RUTA DE APRENDIZAJE ━━━ Los 4 módulos */}
      <LearningRoadmap />

      <div className="divider-epic mx-auto max-w-5xl" />

      {/* ━━━ FEATURES ━━━ Qué ofrece la plataforma */}
      <FeaturesGrid />

      {/* ━━━ WORKFLOWS ━━━ Producto estrella */}
      <WorkflowShowcase />

      <div className="divider-epic mx-auto max-w-5xl" />

      {/* ━━━ FILOSOFÍA ━━━ Frases del taller */}
      <TestimonialsSection />

      {/* ━━━ STATS ━━━ Impacto en números */}
      <StatsSection />

      <div className="divider-epic mx-auto max-w-5xl" />

      {/* ━━━ GEN 11 ━━━ Próxima generación */}
      <Gen11Banner />

      {/* ━━━ ECOSISTEMA ━━━ Plataformas conectadas */}
      <EcosystemSection />

      {/* ━━━ CTA ━━━ Llamada a la acción */}
      <CTASection isAuthenticated={!!user} />

      {/* ━━━ FOOTER ━━━ */}
      <Footer />
    </Layout>
  );
}
