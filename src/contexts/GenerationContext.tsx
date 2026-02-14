import React, { createContext, useContext, ReactNode, Suspense, useMemo } from 'react';
import { useGenerationByNumber, useActiveGeneration, parseGenUrl } from '@/hooks/useGenerationData';
import type { GenerationConfig, SlideData, SlideSection } from '@/generations/types';
import { GEN_CONFIG as FALLBACK_CONFIG, SLIDES_DATA as FALLBACK_SLIDES } from '@/generations/gen09/config';
import { resolveSlides } from '@/slides/registry';
import type { ComponentType } from 'react';

interface GenerationContextType {
  config: GenerationConfig;
  slidesData: SlideData[];
  resolvedSlides: ComponentType[];
  computedSections: SlideSection[];
  isLoading: boolean;
  isFromDatabase: boolean;
  generationNumber: number;
  currentWeek: number;
  generationId: number | undefined;
}

const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

interface GenerationProviderProps {
  children: ReactNode;
  genId?: string;
}

export function GenerationProvider({ children, genId }: GenerationProviderProps) {
  const parsed = genId ? parseGenUrl(genId) : { generation: undefined, week: undefined };
  
  const specificGen = useGenerationByNumber(parsed.generation, parsed.week);
  const activeGen = useActiveGeneration();
  
  const { data, isLoading, isError } = parsed.generation ? specificGen : activeGen;

  const config = data?.config || FALLBACK_CONFIG;
  const slidesData = data?.slidesData || FALLBACK_SLIDES;
  const computedSections = data?.computedSections || [];
  const isFromDatabase = !!data && !isError;
  const generationNumber = config.generation;
  const currentWeek = data?.currentWeek || config.week;
  const generationId = data?.generationId;

  // Resolve slide components from the registry based on DB component_names
  const resolvedSlides = useMemo(() => {
    const componentNames = slidesData.map(s => s.componentName).filter(Boolean);
    if (componentNames.length === 0) return [];
    return resolveSlides(componentNames, generationId);
  }, [slidesData, generationId]);

  return (
    <GenerationContext.Provider value={{ 
      config, 
      slidesData,
      resolvedSlides,
      computedSections,
      isLoading, 
      isFromDatabase, 
      generationNumber,
      currentWeek,
      generationId,
    }}>
      {children}
    </GenerationContext.Provider>
  );
}

const DEFAULT_CONTEXT: GenerationContextType = {
  config: FALLBACK_CONFIG,
  slidesData: FALLBACK_SLIDES,
  resolvedSlides: [],
  computedSections: [],
  isLoading: true,
  isFromDatabase: false,
  generationNumber: 0,
  currentWeek: 1,
  generationId: undefined,
};

export function useGeneration() {
  const context = useContext(GenerationContext);
  if (!context) {
    // During HMR, context can be temporarily undefined — return safe defaults
    return DEFAULT_CONTEXT;
  }
  return context;
}
