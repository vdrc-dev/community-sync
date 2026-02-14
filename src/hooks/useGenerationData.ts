import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { GenerationConfig, SlideData, SlideSection } from '@/generations/types';

interface GenerationRow {
  id: number;
  generation_number: number;
  name: string;
  module: string;
  week: number;
  total_weeks: number;
  date: string;
  instructor: string;
  stack: string[];
  is_active: boolean;
}

interface GenerationWeekRow {
  week: number;
  name: string;
  stack: string[];
}

interface SlideRow {
  slide_number: number;
  section_id: string;
  section_number: number;
  title: string;
  storyline: string | null;
  component_name: string;
  content: Record<string, unknown> | null;
}

interface SectionRow {
  id: string;
  title: string;
  display_order: number;
}

// Parse URL format: "gen9" or "gen9s4" -> { generation: 9, week: undefined | 4 }
export function parseGenUrl(genId: string): { generation: number; week?: number } {
  const match = genId.match(/^gen(\d+)(?:s(\d+))?$/i);
  if (!match) {
    return { generation: parseInt(genId.replace(/\D/g, ''), 10) || 0 };
  }
  return {
    generation: parseInt(match[1], 10),
    week: match[2] ? parseInt(match[2], 10) : undefined,
  };
}

/**
 * Computes sections dynamically by grouping slides by section_id
 */
function computeSectionsFromSlides(slides: SlideData[], sections: SectionRow[]): SlideSection[] {
  const sectionOrderMap = new Map(sections.map(s => [s.id, s.display_order]));
  const sectionTitleMap = new Map(sections.map(s => [s.id, s.title]));
  
  // Group slide numbers by section_id
  const groups = new Map<string, number[]>();
  for (const slide of slides) {
    const sectionId = slide.sectionId || '';
    if (!groups.has(sectionId)) groups.set(sectionId, []);
    groups.get(sectionId)!.push(slide.id);
  }
  
  // Convert to SlideSection array, sorted by display_order
  return Array.from(groups.entries())
    .map(([id, slideNums]) => ({
      id,
      title: sectionTitleMap.get(id) || id,
      slides: slideNums.sort((a, b) => a - b),
      _order: sectionOrderMap.get(id) ?? 999,
    }))
    .sort((a, b) => a._order - b._order)
    .map(({ _order, ...rest }) => rest);
}

async function fetchGenerationData(
  generationNumber: number,
  weekNumber?: number
): Promise<{ config: GenerationConfig; slidesData: SlideData[]; currentWeek: number; generationId: number; computedSections: SlideSection[] } | null> {
  // Fetch generation by number
  const { data: genData, error: genError } = await supabase
    .from('slide_generations')
    .select('*')
    .eq('generation_number', generationNumber)
    .maybeSingle();

  if (genError) throw genError;
  if (!genData) return null;

  const generation = genData as GenerationRow;
  
  // Determine which week to display (URL week or generation's current week)
  const displayWeek = weekNumber || generation.week;

  // Fetch all weeks for this generation
  const { data: weeksData, error: weeksError } = await supabase
    .from('generation_weeks')
    .select('week, name, stack')
    .eq('generation_id', generation.id)
    .order('week', { ascending: true });

  if (weeksError) throw weeksError;

  const weeks = weeksData as GenerationWeekRow[];
  
  // Get the specific week's data
  const currentWeekData = weeks.find(w => w.week === displayWeek);
  
  // Get previous weeks (before displayWeek)
  const previousWeeks = weeks.filter(w => w.week < displayWeek);

  // Fetch slides for this generation and week
  const { data: slidesData, error: slidesError } = await supabase
    .from('slides')
    .select('slide_number, section_id, section_number, title, storyline, component_name, content')
    .eq('generation_id', generation.id)
    .eq('week', displayWeek)
    .order('slide_number', { ascending: true });

  if (slidesError) throw slidesError;

  // Fetch sections for titles
  const { data: sectionsData, error: sectionsError } = await supabase
    .from('sections')
    .select('id, title, display_order')
    .order('display_order', { ascending: true });

  if (sectionsError) throw sectionsError;

  const sections = sectionsData as SectionRow[];
  const sectionMap = new Map(sections.map(s => [s.id, s.title]));

  // Build config with the specific week's data
  const config: GenerationConfig = {
    generation: generation.generation_number,
    name: currentWeekData?.name || generation.name,
    module: generation.module,
    week: displayWeek,
    totalWeeks: generation.total_weeks,
    date: new Date(generation.date + 'T12:00:00').toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    instructor: generation.instructor,
    stack: currentWeekData?.stack || generation.stack,
    previousWeeks: previousWeeks.map(w => ({
      week: w.week,
      name: w.name,
      stack: w.stack,
    })),
  };

  // Build slides data
  const slides: SlideData[] = (slidesData as SlideRow[]).map(s => ({
    id: s.slide_number,
    section: sectionMap.get(s.section_id) || s.section_id,
    sectionId: s.section_id,
    sectionNumber: s.section_number,
    title: s.title,
    storyline: s.storyline || '',
    componentName: s.component_name,
    content: s.content || {},
  }));

  // Compute sections dynamically from slides + sections table
  const computedSections = computeSectionsFromSlides(slides, sections);

  return { config, slidesData: slides, currentWeek: displayWeek, generationId: generation.id, computedSections };
}

export function useGenerationByNumber(generationNumber: number | undefined, weekNumber?: number) {
  return useQuery({
    queryKey: ['generation', generationNumber, weekNumber],
    queryFn: () => fetchGenerationData(generationNumber!, weekNumber),
    enabled: !!generationNumber,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useActiveGeneration() {
  return useQuery({
    queryKey: ['active-generation'],
    queryFn: async (): Promise<{ config: GenerationConfig; slidesData: SlideData[]; currentWeek: number; generationId: number; computedSections: SlideSection[] } | null> => {
      // Fetch active generation
      const { data: genData, error: genError } = await supabase
        .from('slide_generations')
        .select('generation_number, week')
        .eq('is_active', true)
        .maybeSingle();

      if (genError) throw genError;
      if (!genData) return null;

      return fetchGenerationData(genData.generation_number, genData.week);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useGenerations() {
  return useQuery({
    queryKey: ['generations-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slide_generations')
        .select('id, generation_number, name, module, week, total_weeks, date, is_active')
        .order('generation_number', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useGenerationWeeks(generationId: number) {
  return useQuery({
    queryKey: ['generation-weeks', generationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generation_weeks')
        .select('*')
        .eq('generation_id', generationId)
        .order('week', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!generationId,
  });
}
