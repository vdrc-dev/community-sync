import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { X, ArrowRight, ArrowLeft, Sparkles, BookOpen, Calculator, Zap, FlaskConical, CheckCircle, Globe, Presentation, Users } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  target?: string; // CSS selector for highlighting
  position: 'center' | 'top' | 'bottom';
  action?: {
    label: string;
    href: string;
  };
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Bienvenido al Portal VDRC',
    description: 'Este es tu hub central para el Taller de Productividad Digital con IA — Generacion 11. Te mostramos las funciones principales.',
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    position: 'center',
  },
  {
    id: 'ecosystem',
    title: 'Ecosistema VDRC',
    description: 'El taller tiene 3 plataformas conectadas: vdrc.cl (info e inscripciones), este portal (comunidad y recursos), y vdrc.lovable.app (presentaciones de clase).',
    icon: <Globe className="w-8 h-8 text-accent" />,
    position: 'center',
  },
  {
    id: 'generations',
    title: 'Explora las Generaciones',
    description: 'Accede a grabaciones de clases, materiales, presentaciones y recursos organizados por cohorte. Todo el contenido del programa en un solo lugar.',
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    position: 'center',
    action: {
      label: 'Ver Generaciones',
      href: '/generations',
    },
  },
  {
    id: 'workflows',
    title: 'Workflows de Automatizacion',
    description: 'Descubre workflows paso a paso para automatizar tareas comunes. Ejecuta cada paso directamente con IA integrada.',
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    position: 'center',
    action: {
      label: 'Ver Workflows',
      href: '/workflows',
    },
  },
  {
    id: 'playground',
    title: 'Laboratorio de IA',
    description: 'Prueba prompts en tiempo real con diferentes modelos de IA. Compara respuestas y optimiza tus prompts antes de usarlos.',
    icon: <FlaskConical className="w-8 h-8 text-purple-500" />,
    position: 'center',
    action: {
      label: 'Abrir Laboratorio',
      href: '/playground',
    },
  },
  {
    id: 'community',
    title: 'Comunidad',
    description: 'Conecta con otros participantes del taller en los espacios de discusion. Comparte recursos, haz preguntas y aprende junto a la comunidad.',
    icon: <Users className="w-8 h-8 text-accent" />,
    position: 'center',
    action: {
      label: 'Ir a Comunidad',
      href: '/community',
    },
  },
  {
    id: 'roi',
    title: 'Mide tu Productividad',
    description: 'Registra las tareas que has automatizado y visualiza cuanto tiempo y dinero estas ahorrando cada semana.',
    icon: <Calculator className="w-8 h-8 text-green-500" />,
    position: 'center',
    action: {
      label: 'Calcular ROI',
      href: '/roi-calculator',
    },
  },
  {
    id: 'complete',
    title: 'Listo para comenzar',
    description: 'Usa CMD+K (o Ctrl+K) para acceder rapidamente a cualquier seccion. Tambien puedes ver las presentaciones en vdrc.lovable.app. Buena suerte en tu viaje con IA.',
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    position: 'center',
  },
];

const TOUR_COMPLETED_KEY = 'onboarding_tour_completed';

export function OnboardingTour() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  // Check if tour should be shown
  useEffect(() => {
    const checkTourStatus = async () => {
      if (!user) {
        setHasCheckedStorage(true);
        return;
      }

      // Check local storage first for quick response
      const localCompleted = localStorage.getItem(`${TOUR_COMPLETED_KEY}_${user.id}`);
      if (localCompleted === 'true') {
        setHasCheckedStorage(true);
        return;
      }

      // Check user preferences in DB
      const { data } = await supabase
        .from('user_preferences')
        .select('discovered_easter_eggs')
        .eq('user_id', user.id)
        .maybeSingle();

      const completedEggs = data?.discovered_easter_eggs || [];
      if (completedEggs.includes('onboarding_tour')) {
        localStorage.setItem(`${TOUR_COMPLETED_KEY}_${user.id}`, 'true');
      } else {
        // Show tour for new users after a short delay
        setTimeout(() => setIsOpen(true), 1500);
      }
      
      setHasCheckedStorage(true);
    };

    checkTourStatus();
  }, [user]);

  const handleComplete = useCallback(async () => {
    setIsOpen(false);
    
    if (user) {
      localStorage.setItem(`${TOUR_COMPLETED_KEY}_${user.id}`, 'true');
      
      // Update DB to mark tour as completed
      const { data } = await supabase
        .from('user_preferences')
        .select('discovered_easter_eggs')
        .eq('user_id', user.id)
        .maybeSingle();

      const currentEggs = data?.discovered_easter_eggs || [];
      if (!currentEggs.includes('onboarding_tour')) {
        await supabase
          .from('user_preferences')
          .upsert({
            user_id: user.id,
            discovered_easter_eggs: [...currentEggs, 'onboarding_tour'],
          });
      }
    }
  }, [user]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const step = TOUR_STEPS[currentStep];
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100;

  if (!hasCheckedStorage || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleSkip();
        }}
      >
        <motion.div
          key={step.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <Card className="w-full max-w-md glass border-primary/20 shadow-2xl">
            <CardContent className="p-6">
              {/* Close button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar tour"
                title="Cerrar tour"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Paso {currentStep + 1} de {TOUR_STEPS.length}</span>
                  <button 
                    onClick={handleSkip}
                    className="hover:text-foreground transition-colors"
                  >
                    Saltar tour
                  </button>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
                >
                  {step.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Action button */}
              {step.action && (
                <Button
                  variant="outline"
                  className="w-full mb-4"
                  onClick={() => {
                    window.location.href = step.action!.href;
                    handleComplete();
                  }}
                >
                  {step.action.label}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Anterior
                </Button>

                <Button
                  onClick={handleNext}
                  size="sm"
                  className="flex-1"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? (
                    <>
                      ¡Comenzar!
                      <Sparkles className="ml-2 w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to manually trigger the tour
export function useTriggerTour() {
  const triggerTour = useCallback(() => {
    const event = new CustomEvent('trigger-onboarding-tour');
    window.dispatchEvent(event);
  }, []);

  return triggerTour;
}
