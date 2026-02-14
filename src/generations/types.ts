// Tipos compartidos para todas las generaciones

export interface GenerationConfig {
  generation: number;
  date: string;
  module: string;
  week: number;
  totalWeeks: number;
  name: string;
  instructor: string;
  stack: string[];
  previousWeeks: Array<{
    week: number;
    name: string;
    stack: string[];
  }>;
  // Metadatos opcionales para tracking de cambios
  changes?: string[];
  baseGeneration?: number;
}

export interface SlideSection {
  id: string;
  title: string;
  slides: number[];
}

export interface SlideData {
  id: number;
  section: string;
  sectionId?: string;
  sectionNumber: number;
  title: string;
  storyline: string;
  componentName: string;
  content?: Record<string, unknown>;
}

// Note: Sections are now computed dynamically from the database
// See computeSectionsFromSlides() in useGenerationData.ts
