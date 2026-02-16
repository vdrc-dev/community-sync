import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';
import { addDays, nextTuesday, isTuesday, format } from 'date-fns';

export type Generation = Tables<'generations'>;
export type ClassRow = Tables<'classes'>;

export interface ClassWithPresentation extends ClassRow {
  class_presentations: Tables<'class_presentations'> | null;
}

export interface GenerationWithClasses extends Generation {
  classes: ClassWithPresentation[];
}

// 4 módulos predefinidos del taller
export const WORKSHOP_MODULES = [
  {
    number: 1,
    title: "Higiene Digital",
    description: "Inbox Zero, Bitwarden, perfiles de navegador, Granola y rutinas digitales productivas."
  },
  {
    number: 2,
    title: "IA & Productividad",
    description: "ChatGPT, Claude, Gemini, Perplexity, Manus. Metaprompts, automatización con Zapier y App Script."
  },
  {
    number: 3,
    title: "Presentaciones con IA",
    description: "Gamma, Beautiful.ai, Napkin, Canva, Coolors y Font Joy. De idea a presentación profesional."
  },
  {
    number: 4,
    title: "Vibe Coding",
    description: "Lovable + Supabase + GitHub. Airtable, Faces App, Codex y Cursor. De prompt a software funcional."
  }
] as const;

// Calcular fechas de clases (martes consecutivos)
export function calculateClassDates(startDate: Date): Date[] {
  const firstTuesday = isTuesday(startDate) ? startDate : nextTuesday(startDate);
  return [
    firstTuesday,
    addDays(firstTuesday, 7),
    addDays(firstTuesday, 14),
    addDays(firstTuesday, 21),
  ];
}

export function useGenerations() {
  const queryClient = useQueryClient();

  // Fetch all generations with their classes and presentations
  const { data: generations, isLoading, error } = useQuery({
    queryKey: ['generations-with-classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select(`
          *,
          classes (
            *,
            class_presentations (*)
          )
        `)
        .order('start_date', { ascending: false });

      if (error) throw error;
      
      // Transform data to match our interface
      return (data || []).map(gen => ({
        ...gen,
        classes: (gen.classes || []).map(cls => ({
          ...cls,
          class_presentations: Array.isArray(cls.class_presentations) 
            ? cls.class_presentations[0] || null 
            : cls.class_presentations
        })).sort((a, b) => a.class_number - b.class_number)
      })) as GenerationWithClasses[];
    },
  });

  // Create generation mutation
  const createGenerationMutation = useMutation({
    mutationFn: async (data: {
      code: string;
      name: string;
      startDate: Date;
      isActive: boolean;
      autoCreateClasses: boolean;
    }) => {
      const classDates = calculateClassDates(data.startDate);
      const endDate = classDates[3]; // Last class date

      // 1. Create generation
      const { data: generation, error: genError } = await supabase
        .from('generations')
        .insert({
          code: data.code,
          name: data.name,
          start_date: format(data.startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
          is_active: data.isActive,
        })
        .select()
        .single();

      if (genError) throw genError;

      // 2. Create 4 classes if auto-create is enabled
      if (data.autoCreateClasses) {
        const classesData = WORKSHOP_MODULES.map((mod, i) => ({
          generation_id: generation.id,
          class_number: mod.number,
          title: mod.title,
          description: mod.description,
          class_date: format(classDates[i], 'yyyy-MM-dd'),
        }));

        const { error: classError } = await supabase
          .from('classes')
          .insert(classesData);

        if (classError) throw classError;
      }

      return generation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generations-with-classes'] });
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      toast({
        title: "Generación creada",
        description: "La generación y sus clases han sido creadas exitosamente.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al crear",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Create presentation for a class
  const createPresentationMutation = useMutation({
    mutationFn: async (classId: string) => {
      const { data, error } = await supabase
        .from('class_presentations')
        .insert({
          class_id: classId,
          status: 'draft',
          outline: '',
          key_points: [],
          talking_points: [],
          resources_needed: [],
          duration_estimate: 60,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generations-with-classes'] });
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      toast({
        title: "Presentación creada",
        description: "La presentación ha sido creada en modo borrador.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al crear presentación",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete generation
  const deleteGenerationMutation = useMutation({
    mutationFn: async (generationId: string) => {
      const { error } = await supabase
        .from('generations')
        .delete()
        .eq('id', generationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generations-with-classes'] });
      toast({
        title: "Generación eliminada",
        description: "La generación ha sido eliminada.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al eliminar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Get classes without presentations
  const getClassesWithoutPresentation = (generationId?: string) => {
    if (!generations) return [];
    
    const gen = generationId 
      ? generations.find(g => g.id === generationId)
      : generations[0];
    
    if (!gen) return [];
    
    return gen.classes.filter(cls => !cls.class_presentations);
  };

  // Get presentation statistics
  const getStats = () => {
    if (!generations) {
      return { 
        totalGenerations: 0, 
        totalClasses: 0, 
        classesWithPresentation: 0,
        classesWithoutPresentation: 0 
      };
    }

    let totalClasses = 0;
    let classesWithPresentation = 0;

    generations.forEach(gen => {
      gen.classes.forEach(cls => {
        totalClasses++;
        if (cls.class_presentations) classesWithPresentation++;
      });
    });

    return {
      totalGenerations: generations.length,
      totalClasses,
      classesWithPresentation,
      classesWithoutPresentation: totalClasses - classesWithPresentation,
    };
  };

  return {
    generations,
    isLoading,
    error,
    createGeneration: createGenerationMutation.mutateAsync,
    isCreating: createGenerationMutation.isPending,
    createPresentation: createPresentationMutation.mutateAsync,
    isCreatingPresentation: createPresentationMutation.isPending,
    deleteGeneration: deleteGenerationMutation.mutateAsync,
    isDeleting: deleteGenerationMutation.isPending,
    getClassesWithoutPresentation,
    getStats,
  };
}
