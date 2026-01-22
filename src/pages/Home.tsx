import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ContinueLearning } from '@/components/resume/ContinueLearning';
import { ChallengesList } from '@/components/challenges/ChallengesList';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Wrench, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Play,
  Folder,
  FileText
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Biblioteca de Recursos',
    description: 'Accede a grabaciones, presentaciones y materiales de cada clase organizado por generación.',
    href: '/generations',
    color: 'primary',
  },
  {
    icon: Wrench,
    title: 'Herramientas IA',
    description: 'Catálogo completo de herramientas de inteligencia artificial mencionadas en los talleres.',
    href: '/tools',
    color: 'accent',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Conecta con otros participantes, comparte proyectos y resuelve dudas juntos.',
    href: '/forum',
    color: 'primary',
  },
  {
    icon: Calendar,
    title: 'Calendario',
    description: 'Mantente al día con las próximas sesiones y eventos del taller.',
    href: '/calendar',
    color: 'accent',
  },
];

const stats = [
  { value: '10+', label: 'Generaciones' },
  { value: '50+', label: 'Clases' },
  { value: '30+', label: 'Herramientas' },
  { value: '200+', label: 'Participantes' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Taller Productividad Digital</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold mb-6 leading-tight">
              <span className="text-foreground">Portal de</span>
              <br />
              <span className="text-gradient glow-text">Participantes</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Tu hub exclusivo para acceder a todos los recursos, materiales y conectar 
              con la comunidad del Taller de Productividad Digital VDRC.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold px-8">
                  <Link to="/generations">
                    Explorar Recursos <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold px-8">
                    <Link to="/auth?mode=signup">
                      Unirse al Portal <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-border hover:border-primary/50 hover:bg-muted/50">
                    <Link to="/auth">
                      Iniciar Sesión
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4">
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-primary glow-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-xs font-mono">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </section>

      {/* Continue Learning + Challenges (for logged in users) */}
      {user && (
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Continue Learning */}
              <ContinueLearning />
              
              {/* Active Challenges */}
              <ChallengesList compact maxChallenges={2} />
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
              Todo lo que <span className="text-gradient">necesitas</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Un espacio centralizado para acceder a todos los recursos del taller
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.href}
                className="group relative p-6 rounded-xl glass border-border/50 hover:border-primary/30 transition-all hover-lift"
              >
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 border border-${feature.color}/30 flex items-center justify-center mb-4 group-hover:glow-${feature.color} transition-all`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>
                <span className="inline-flex items-center text-sm text-primary font-medium">
                  Explorar <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Types Preview */}
      <section className="py-24 relative border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
              Recursos por <span className="text-gradient">clase</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Cada sesión incluye todo lo que necesitas para repasar y practicar
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              { icon: Play, label: 'Grabación', color: 'text-red-400' },
              { icon: Folder, label: 'Carpeta Drive', color: 'text-yellow-400' },
              { icon: FileText, label: 'Slides', color: 'text-blue-400' },
              { icon: BookOpen, label: 'Apuntes', color: 'text-green-400' },
              { icon: Wrench, label: 'Herramientas', color: 'text-purple-400' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-5 py-3 rounded-lg glass border-border/50"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-2xl glass border-primary/20 glow-primary">
              <h2 className="text-2xl sm:text-3xl font-mono font-bold mb-4">
                ¿Participaste en el taller?
              </h2>
              <p className="text-muted-foreground mb-8">
                Crea tu cuenta para acceder a todos los recursos exclusivos, conectar con la comunidad 
                y mantenerte actualizado con las próximas sesiones.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Link to="/auth?mode=signup">
                  Crear mi cuenta <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-mono font-bold text-primary text-sm">VD</span>
              </div>
              <span className="text-sm text-muted-foreground">
                VDRC Workshop Portal © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                vdrc.cl
              </a>
              <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Talleres
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
