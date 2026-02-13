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
import { EcosystemSection } from '@/components/home/EcosystemSection';
import { PresentationsPreview } from '@/components/home/PresentationsPreview';
import { Gen11Banner } from '@/components/home/Gen11Banner';
import { GenerationsQuickGrid } from '@/components/home/GenerationsQuickGrid';
import { CommunityPreview } from '@/components/home/CommunityPreview';
import { motion } from 'framer-motion';

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
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <ActiveGenerationWidget />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <StreakDisplay />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <ContinueLearning />
                  <ChallengesList compact maxChallenges={2} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECCIONES COMPARTIDAS — flujo limpio
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* ━━━ GENERACIONES ━━━ Las 10 generaciones */}
      <GenerationsQuickGrid />

      {/* ━━━ PRESENTACIONES ━━━ Los 4 módulos */}
      <PresentationsPreview />

      {/* ━━━ COMUNIDAD ━━━ Interacción entre participantes */}
      <CommunityPreview isAuthenticated={!!user} />

      {/* ━━━ FEATURES ━━━ Qué ofrece la plataforma */}
      <FeaturesGrid />

      {/* ━━━ WORKFLOWS ━━━ Producto estrella */}
      <WorkflowShowcase />

      {/* ━━━ FILOSOFÍA ━━━ Frases del taller */}
      <TestimonialsSection />

      {/* ━━━ STATS ━━━ Impacto en números */}
      <StatsSection />

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
