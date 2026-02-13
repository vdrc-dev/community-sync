import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { PointsDisplay } from '@/components/gamification/PointsDisplay';
import { BadgeGrid } from '@/components/gamification/BadgeGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Trophy, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="page-container section-py relative">
        {/* Clean background */}

        <PageHeader
          title={<><span className="text-gradient">Leaderboard</span> de la Comunidad</>}
          description="Participa, completa clases y gana puntos para subir en el ranking"
          badge={{ label: 'Ranking', icon: <Trophy className="w-3 h-3" /> }}
          breadcrumbs={[{ label: 'Leaderboard' }]}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="glass border-border/30 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Participantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Leaderboard limit={15} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            {user && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass border-border/30 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-mono">
                      <Zap className="w-5 h-5 text-primary" />
                      Tu Progreso
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PointsDisplay />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Badges */}
            {user && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="glass border-border/30 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-mono">
                      <Award className="w-5 h-5 text-primary" />
                      Tus Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BadgeGrid showLocked />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* How to earn points */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="glass border-border/30">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Como ganar puntos?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-sm">
                    {[
                      { label: 'Completar clase', points: '+20' },
                      { label: 'Crear post', points: '+10' },
                      { label: 'Comentar', points: '+5' },
                      { label: 'Ver clase', points: '+5' },
                      { label: 'RSVP evento', points: '+3' },
                      { label: 'Login diario', points: '+2' },
                    ].map(item => (
                      <li key={item.label} className="flex items-center justify-between group">
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                        <span className="font-mono text-primary text-xs px-2 py-0.5 rounded-md bg-primary/10">{item.points}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
