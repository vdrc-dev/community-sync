import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Home,
  BookOpen,
  Wrench,
  Users,
  Calendar,
  User,
  LogOut,
  Trophy,
  Sparkles,
  Bookmark,
  PenLine,
  Calculator,
  Settings,
  FlaskConical,
  Zap,
  GraduationCap,
  PlayCircle,
  MessageSquare,
  Target,
  Clock,
} from 'lucide-react';
import { isToday, isBefore, parseISO, isAfter } from 'date-fns';

interface Generation {
  id: string;
  code: string;
  name: string;
  is_active: boolean | null;
  start_date: string | null;
  end_date: string | null;
}

interface ClassData {
  id: string;
  title: string;
  class_number: number;
  class_date: string | null;
  recording_url: string | null;
  generation_id: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Fetch searchable data
  const { data: generations } = useQuery({
    queryKey: ['cmd-generations'],
    queryFn: async () => {
      const { data } = await supabase.from('generations').select('*').order('start_date', { ascending: false }).limit(10);
      return (data || []) as Generation[];
    },
    enabled: open,
  });

  const { data: tools } = useQuery({
    queryKey: ['cmd-tools'],
    queryFn: async () => {
      const { data } = await supabase.from('tools').select('id, name, icon_emoji').limit(20);
      return data || [];
    },
    enabled: open,
  });

  // Fetch classes for active generation
  const activeGeneration = useMemo(() => {
    if (!generations?.length) return null;
    const now = new Date();
    return generations.find(g => 
      g.is_active || 
      (g.start_date && g.end_date && 
        isAfter(now, parseISO(g.start_date)) && 
        isBefore(now, parseISO(g.end_date)))
    ) || generations[0];
  }, [generations]);

  const { data: activeClasses } = useQuery({
    queryKey: ['cmd-active-classes', activeGeneration?.id],
    queryFn: async () => {
      if (!activeGeneration) return [];
      const { data } = await supabase
        .from('classes')
        .select('id, title, class_number, class_date, recording_url, generation_id')
        .eq('generation_id', activeGeneration.id)
        .order('class_number', { ascending: true });
      return (data || []) as ClassData[];
    },
    enabled: open && !!activeGeneration,
  });

  // Calculate contextual actions
  const contextualActions = useMemo(() => {
    const actions: Array<{
      id: string;
      label: string;
      description?: string;
      icon: React.ReactNode;
      action: () => void;
    }> = [];

    if (!activeClasses?.length || !activeGeneration) return actions;

    const now = new Date();
    
    // Find today's class
    const todayClass = activeClasses.find(c => c.class_date && isToday(parseISO(c.class_date)));
    if (todayClass) {
      actions.push({
        id: 'today-class',
        label: `Clase de hoy: ${todayClass.title}`,
        description: `Clase ${todayClass.class_number} de ${activeGeneration.code}`,
        icon: <Clock className="mr-2 h-4 w-4 text-primary" />,
        action: () => navigate(`/generations/${activeGeneration.code}`),
      });
    }

    // Find next class
    const nextClass = activeClasses.find(c => 
      c.class_date && isAfter(parseISO(c.class_date), now) && !isToday(parseISO(c.class_date))
    );
    if (nextClass) {
      actions.push({
        id: 'next-class',
        label: `Próxima clase: ${nextClass.title}`,
        description: `Clase ${nextClass.class_number}`,
        icon: <Target className="mr-2 h-4 w-4 text-muted-foreground" />,
        action: () => navigate(`/generations/${activeGeneration.code}`),
      });
    }

    // Find last recording
    const lastRecording = [...activeClasses]
      .filter(c => c.recording_url && c.class_date && isBefore(parseISO(c.class_date), now))
      .pop();
    if (lastRecording?.recording_url) {
      actions.push({
        id: 'last-recording',
        label: 'Ver última grabación',
        description: `${lastRecording.title}`,
        icon: <PlayCircle className="mr-2 h-4 w-4 text-primary" />,
        action: () => window.open(lastRecording.recording_url!, '_blank'),
      });
    }

    // Current generation shortcut
    actions.push({
      id: 'current-gen',
      label: `Ir a ${activeGeneration.name}`,
      description: activeGeneration.code,
      icon: <GraduationCap className="mr-2 h-4 w-4 text-primary" />,
      action: () => navigate(`/generations/${activeGeneration.code}`),
    });

    return actions;
  }, [activeClasses, activeGeneration, navigate]);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar paginas, herramientas, clases..." />
      <CommandList>
        <CommandEmpty>
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">No se encontraron resultados.</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Intenta con otro termino de busqueda</p>
          </div>
        </CommandEmpty>

        {/* Contextual Actions (when logged in) */}
        {user && contextualActions.length > 0 && (
          <>
            <CommandGroup heading="Acceso Rápido">
              {contextualActions.map((action) => (
                <CommandItem key={action.id} onSelect={() => runCommand(action.action)}>
                  {action.icon}
                  <div className="flex flex-col">
                    <span>{action.label}</span>
                    {action.description && (
                      <span className="text-xs text-muted-foreground">{action.description}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Navigation */}
        <CommandGroup heading="Navegación">
          <CommandItem onSelect={() => runCommand(() => navigate('/'))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Inicio</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/generations'))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Generaciones</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/tools'))}>
            <Wrench className="mr-2 h-4 w-4" />
            <span>Herramientas IA</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/prompts'))}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Biblioteca de Prompts</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/forum'))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Comunidad</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/calendar'))}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendario</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/leaderboard'))}>
            <Trophy className="mr-2 h-4 w-4" />
            <span>Leaderboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/bookmarks'))}>
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Mis Favoritos</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/quick-notes'))}>
            <PenLine className="mr-2 h-4 w-4" />
            <span>Notas Rápidas</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/roi-calculator'))}>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculadora de ROI</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/dictionary'))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Diccionario Digital</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/personalizacion-ia'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Guia Personalizacion IA</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/guia-instalacion'))}>
            <Wrench className="mr-2 h-4 w-4" />
            <span>Guia de Instalacion</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/my-tools'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Mi Stack de Herramientas</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/playground'))}>
            <FlaskConical className="mr-2 h-4 w-4" />
            <span>Laboratorio de IA</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/workflows'))}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Workflows de Automatización</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Generations */}
        {generations && generations.length > 0 && (
          <CommandGroup heading="Generaciones">
            {generations.slice(0, 5).map((gen) => (
              <CommandItem
                key={gen.code}
                onSelect={() => runCommand(() => navigate(`/generations/${gen.code}`))}
              >
                <GraduationCap className="mr-2 h-4 w-4 text-primary" />
                <span>{gen.name}</span>
                <span className="ml-2 text-xs text-muted-foreground font-mono">{gen.code}</span>
                {gen.is_active && (
                  <span className="ml-auto text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                    Activa
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Tools */}
        {tools && tools.length > 0 && (
          <CommandGroup heading="Herramientas">
            {tools.slice(0, 8).map((tool) => (
              <CommandItem
                key={tool.id}
                onSelect={() => runCommand(() => navigate('/tools'))}
              >
                <span className="mr-2">{tool.icon_emoji}</span>
                <span>{tool.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandSeparator />

        {/* User actions */}
        {user && (
          <CommandGroup heading="Cuenta">
            <CommandItem onSelect={() => runCommand(() => navigate('/profile'))}>
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(handleSignOut)}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>

      {/* Footer with keyboard navigation hints */}
      <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2 text-[10px] text-muted-foreground/50 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <kbd className="kbd text-[10px] min-w-[16px] text-center">↑</kbd>
            <kbd className="kbd text-[10px] min-w-[16px] text-center">↓</kbd>
            navegar
          </span>
          <span className="flex items-center gap-1">
            <kbd className="kbd text-[10px] min-w-[16px] text-center">↵</kbd>
            seleccionar
          </span>
          <span className="flex items-center gap-1">
            <kbd className="kbd text-[10px] min-w-[28px] text-center">esc</kbd>
            cerrar
          </span>
        </div>
        <span className="hidden sm:inline">? para ver mas atajos</span>
      </div>
    </CommandDialog>
  );
}
