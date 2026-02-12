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
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection isAuthenticated={!!user} />

      {/* Tools Marquee - Social proof of tools */}
      <ToolsMarquee />

      {/* Active Generation Dashboard (for logged in users) */}
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

      {/* User Dashboard Section (for logged in users) */}
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

      {/* Stats Section */}
      <StatsSection />

      <SectionDivider variant="gradient" />

      {/* How It Works */}
      {!user && <HowItWorks />}

      <SectionDivider variant="dots" />

      {/* Features Grid */}
      <FeaturesGrid />

      <SectionDivider variant="glow" />

      {/* Workflow Showcase */}
      <WorkflowShowcase />

      <SectionDivider variant="gradient" />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection isAuthenticated={!!user} />

      {/* Footer */}
      <Footer />
    </Layout>
  );
}
