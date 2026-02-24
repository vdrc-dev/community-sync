import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { GenerationConfig, SlideData, SlideSection } from '@/generations/types';
import { WORKSHOP_MODULES } from '@/hooks/useGenerations';


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

// Canonical section title corrections (DB values may be outdated)
const SECTION_TITLE_OVERRIDES: Record<string, string> = {
  'Pair Programming con IA': 'Herramientas de Creación',
  'Comunicación y Creación Digital': 'Presentaciones con IA',
};

/**
 * Computes sections dynamically by grouping slides by section_id
 */
function computeSectionsFromSlides(slides: SlideData[], sections: SectionRow[]): SlideSection[] {
  const sectionOrderMap = new Map(sections.map(s => [s.id, s.display_order]));
  const sectionTitleMap = new Map(
    sections.map(s => [s.id, SECTION_TITLE_OVERRIDES[s.title] || s.title])
  );
  
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

  // Parallel fetch: weeks, slides, and sections at the same time
  const [weeksResult, slidesResult, sectionsResult] = await Promise.all([
    supabase
      .from('generation_weeks')
      .select('week, name, stack')
      .eq('generation_id', generation.id)
      .order('week', { ascending: true }),
    supabase
      .from('slides')
      .select('slide_number, section_id, section_number, title, storyline, component_name')
      .eq('generation_id', generation.id)
      .eq('week', displayWeek)
      .order('slide_number', { ascending: true }),
    supabase
      .from('sections')
      .select('id, title, display_order')
      .order('display_order', { ascending: true }),
  ]);

  if (weeksResult.error) throw weeksResult.error;
  if (slidesResult.error) throw slidesResult.error;
  if (sectionsResult.error) throw sectionsResult.error;

  const weeks = weeksResult.data as GenerationWeekRow[];
  const slidesData = slidesResult.data;
  const sectionsData = sectionsResult.data;
  
  // Get the specific week's data
  const currentWeekData = weeks.find(w => w.week === displayWeek);
  
  // Get previous weeks (before displayWeek)
  const previousWeeks = weeks.filter(w => w.week < displayWeek);

  const sections = (sectionsData || []) as SectionRow[];
  const sectionMap = new Map(
    sections.map(s => [s.id, SECTION_TITLE_OVERRIDES[s.title] || s.title])
  );

  // Get the actual class date from the classes table (handles rescheduled classes)
  const genCode = `GEN-${String(generationNumber).padStart(3, '0')}`;
  const { data: mainGen } = await supabase
    .from('generations')
    .select('id, start_date')
    .eq('code', genCode)
    .maybeSingle();

  let dateStr: string;
  // First try to get the real class_date from classes table
  if (mainGen?.id) {
    const { data: classRow } = await supabase
      .from('classes')
      .select('class_date')
      .eq('generation_id', mainGen.id)
      .eq('class_number', displayWeek)
      .maybeSingle();

    if (classRow?.class_date) {
      dateStr = new Date(classRow.class_date + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
    } else if (mainGen.start_date) {
      const startDate = new Date(mainGen.start_date + 'T12:00:00');
      const classDate = new Date(startDate);
      classDate.setDate(classDate.getDate() + (displayWeek - 1) * 7);
      dateStr = classDate.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
    } else {
      dateStr = new Date(generation.date + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  } else {
    dateStr = new Date(generation.date + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Use canonical module names from WORKSHOP_MODULES, falling back to DB data
  const canonicalModule = WORKSHOP_MODULES.find(m => m.number === displayWeek);
  const weekName = canonicalModule?.title || currentWeekData?.name || generation.name;

  // Build config with the specific week's data
  const config: GenerationConfig = {
    generation: generation.generation_number,
    name: weekName,
    module: generation.module,
    week: displayWeek,
    totalWeeks: generation.total_weeks,
    date: dateStr,
    instructor: generation.instructor,
    stack: currentWeekData?.stack || generation.stack,
    previousWeeks: previousWeeks.map(w => ({
      week: w.week,
      name: w.name,
      stack: w.stack,
    })),
  };

  // Build slides data (content field excluded from query for speed)
  const slides: SlideData[] = ((slidesData || []) as SlideRow[]).map(s => ({
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
