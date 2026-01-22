import { useEffect, useState, useCallback } from 'react';
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
} from 'lucide-react';

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
      const { data } = await supabase.from('generations').select('code, name').limit(10);
      return data || [];
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

  const { data: classes } = useQuery({
    queryKey: ['cmd-classes'],
    queryFn: async () => {
      const { data } = await supabase
        .from('classes')
        .select('id, title, generation_id')
        .limit(20);
      return data || [];
    },
    enabled: open,
  });

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
      <CommandInput placeholder="Buscar páginas, herramientas, clases..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>

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
            {generations.map((gen) => (
              <CommandItem
                key={gen.code}
                onSelect={() => runCommand(() => navigate(`/generations/${gen.code}`))}
              >
                <BookOpen className="mr-2 h-4 w-4 text-primary" />
                <span>{gen.name}</span>
                <span className="ml-2 text-xs text-muted-foreground font-mono">{gen.code}</span>
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
    </CommandDialog>
  );
}
