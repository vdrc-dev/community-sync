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
import { Gen11Banner } from '@/components/home/Gen11Banner';
import { EcosystemSection } from '@/components/home/EcosystemSection';
import { PresentationsPreview } from '@/components/home/PresentationsPreview';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection isAuthenticated={!!user} />

      {/* Gen 11 Countdown Banner — only for visitors */}
      {!user && <Gen11Banner />}

      {/* Tools Marquee — instant social proof */}
      <ToolsMarquee />

      {/* How It Works — explain value FIRST (visitors only) */}
      {!user && <HowItWorks />}

      {!user && <SectionDivider variant="gradient" />}

      {/* Dashboard — for logged-in users, their personalized content */}
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

      {/* Features Grid — what the platform offers */}
      <FeaturesGrid />

      <SectionDivider variant="dots" />

      {/* Testimonials — social proof early */}
      <TestimonialsSection />

      <SectionDivider variant="glow" />

      {/* Stats — numbers to back up the testimonials */}
      <StatsSection />

      <SectionDivider variant="gradient" />

      {/* Workflow Showcase */}
      <WorkflowShowcase />

      <SectionDivider variant="dots" />

      {/* Presentations Preview */}
      <PresentationsPreview />

      <SectionDivider variant="glow" />

      {/* Ecosystem Section */}
      <EcosystemSection />

      {/* CTA Section */}
      <CTASection isAuthenticated={!!user} />

      {/* Footer */}
      <Footer />
    </Layout>
  );
}
