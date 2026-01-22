import { Layout } from '@/components/layout/Layout';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { PointsDisplay } from '@/components/gamification/PointsDisplay';
import { BadgeGrid } from '@/components/gamification/BadgeGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Trophy, Award, Zap } from 'lucide-react';

export default function LeaderboardPage() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">Leaderboard</span> de la Comunidad
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Participa, completa clases y gana puntos para subir en el ranking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Participantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Leaderboard limit={15} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            {user && (
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5 text-primary" />
                    Tu Progreso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PointsDisplay />
                </CardContent>
              </Card>
            )}

            {/* Badges */}
            {user && (
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="w-5 h-5 text-primary" />
                    Tus Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BadgeGrid showLocked />
                </CardContent>
              </Card>
            )}

            {/* How to earn points */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">¿Cómo ganar puntos?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Completar clase</span>
                    <span className="font-mono text-primary">+20</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Crear post</span>
                    <span className="font-mono text-primary">+10</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Comentar</span>
                    <span className="font-mono text-primary">+5</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ver clase</span>
                    <span className="font-mono text-primary">+5</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">RSVP evento</span>
                    <span className="font-mono text-primary">+3</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Login diario</span>
                    <span className="font-mono text-primary">+2</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
