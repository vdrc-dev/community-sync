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
import { SectionDivider } from '@/components/home/SectionDivider';
import { ActiveGenerationWidget } from '@/components/dashboard/ActiveGenerationWidget';
import { EcosystemSection } from '@/components/home/EcosystemSection';
import { PresentationsPreview } from '@/components/home/PresentationsPreview';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* ─── 1. HERO — Primera impresión ─── */}
      <HeroSection isAuthenticated={!!user} />

      {/* ─── 2. TOOLS MARQUEE — Prueba social inmediata ─── */}
      <ToolsMarquee />

      {/* ═══════════════════════════════════════════════════
          VISITOR FLOW: Explicar valor → mostrar producto → convencer
          ═══════════════════════════════════════════════════ */}

      {/* ─── 3. CÓMO FUNCIONA — Los 4 módulos (solo visitantes) ─── */}
      {!user && <HowItWorks />}

      {/* ═══════════════════════════════════════════════════
          AUTHENTICATED FLOW: Dashboard personalizado
          ═══════════════════════════════════════════════════ */}

      {user && (
        <section className="py-8 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <ActiveGenerationWidget />
            </motion.div>
          </div>
        </section>
      )}

      {user && (
        <section className="py-8 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="mb-6">
                <StreakDisplay />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <ContinueLearning />
                <ChallengesList compact maxChallenges={2} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SHARED SECTIONS: Contenido para todos
          ═══════════════════════════════════════════════════ */}

      {/* ─── 4. FEATURES — Qué ofrece la plataforma ─── */}
      <FeaturesGrid />

      <SectionDivider variant="gradient" />

      {/* ─── 5. WORKFLOWS — Mostrar el producto estrella ─── */}
      <WorkflowShowcase />

      <SectionDivider variant="dots" />

      {/* ─── 6. PRESENTACIONES — Material de cada módulo ─── */}
      <PresentationsPreview />

      <SectionDivider variant="glow" />

      {/* ─── 7. FILOSOFÍA — Frases clave del taller ─── */}
      <TestimonialsSection />

      {/* ─── 8. STATS — Números de impacto ─── */}
      <StatsSection />

      <SectionDivider variant="gradient" />

      {/* ─── 9. ECOSISTEMA — Las 3 plataformas conectadas ─── */}
      <EcosystemSection />

      {/* ─── 10. CTA — Llamada a la acción final ─── */}
      <CTASection isAuthenticated={!!user} />

      {/* ─── 11. FOOTER ─── */}
      <Footer />
    </Layout>
  );
}
