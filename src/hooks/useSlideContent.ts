 import { useGeneration } from '@/contexts/GenerationContext';
 
 // Type definitions for slide content
 export interface StatItem {
   value: string;
   label: string;
   color: string;
   versus?: string;
   arrow?: string;
   metric?: string;
   badge?: string;
 }
 
 export interface TierItem {
   name: string;
   desc: string;
   color: string;
 }
 
 export interface CriteriaItem {
   icon: string;
   label: string;
   desc: string;
   color: string;
 }
 
export interface MetricItem {
  icon: string;
  label: string;
  sublabel: string;
  desc: string;
  color: string;
}

export interface RecommendationItem {
  icon: string;
  need: string;
  model: string;
  spec: string;
  color?: string;
}

export interface FrameworkItem {
  letter: string;
  name: string;
  question: string;
  color: string;
}

export interface ComponentItem {
  name: string;
  icon: string;
  desc: string;
  examples: string[];
  color: string;
}

export interface AgentItem {
  name: string;
  icon: string;
  capability: string;
  useCase: string;
  color: string;
}

export interface StructureItem {
  layer: string;
  icon: string;
  tools: string[];
  purpose: string;
  color: string;
}

export interface ChecklistItem {
  item: string;
  example: string;
}

export interface RoleExample {
  role: string;
  context: string;
}

 export interface TimelineItem {
   year: string;
   era: string;
   quote: string;
   color: string;
 }
 
 export interface WorkflowStep {
   step: number;
   actor: string;
   action: string;
   models?: string;
   icon: string;
   color: string;
 }
 
 export interface CaseStudy {
   before: string;
   after: string;
 }
 
 export interface GlobalStats {
   northGlobal: string;
   southGlobal: string;
   leaders: { country: string; percentage: string }[];
   stagnation: { country: string; rank: string };
 }
 
 export interface SpecializationItem {
   task: string;
   model: string;
   color: string;
 }
 
 export interface ContextLayer {
   name: string;
   desc: string;
   icon: string;
   color: string;
 }
 
 export interface NotebookLM {
   input: string;
   process: string;
   output: string[];
   tagline: string;
 }
 
 export interface BrandingSkill {
   name: string;
   content: string;
   result: string;
 }
 
 export interface DeepResearch {
   name: string;
   capabilities: string[];
   insight: string;
 }
 
 export interface ClaudeCode {
   name: string;
   capabilities: string[];
   role: string;
 }
 
export interface ClosingContent {
  paradigm: string;
  role: string;
  definition: string;
  callToAction: string;
}

// Gen10 S1 specific interfaces
export interface ParticipantItem {
  name: string;
  emoji: string;
  role: string;
}

export interface StatusItem {
  icon: string;
  label: string;
  status: string;
}

export interface EducationItem {
  title: string;
  institution: string;
  icon: string;
}

export interface ExperienceData {
  companies: string[];
  currentPartner: { role: string; company: string };
  philosophy: { title: string; quote: string; attribution: string };
}

export interface PreparationItem {
  num: number;
  title: string;
  desc: string;
  icon: string;
  emoji: string;
}

export interface SupportInfo {
  phone: string;
  message: string;
  note: string;
}

export interface PodcastInfo {
  videoId: string;
  title: string;
  description: string;
  ctaText: string;
}

export interface ExtensionStep {
  num: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export interface ContextExampleItem {
  title: string;
  icon: string;
  desc: string;
  label: string;
  color: string;
}

export interface OutputQuadrant {
  title: string;
  icons: string[];
  desc: string;
  color: string;
}

export interface MissionItem {
  num: number;
  title: string;
  icon: string;
  tasks: string[];
  color: string;
}
 
 // Storage URL base for presentation assets
 export const STORAGE_BASE_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets';
 
 /**
  * Get the storage URL for an image
  */
 export function getStorageImageUrl(path: string): string {
   return `${STORAGE_BASE_URL}/${path}`;
 }
 
export interface SlideContent {
    sectionLabel?: string;
    title?: string;
    subtitle?: string;
    source?: string;
    footnote?: string;
    stats?: StatItem[];
    tiers?: TierItem[];
    criteria?: CriteriaItem[];
   metrics?: MetricItem[];
   recommendations?: RecommendationItem[];
   framework?: FrameworkItem[];
   components?: ComponentItem[];
   agents?: AgentItem[];
   structure?: StructureItem[];
   checklist?: ChecklistItem[];
   examples?: RoleExample[];
   analogy?: string;
   insight?: string;
   goldenRule?: string;
   warning?: string;
   proTips?: string[];
   proTip?: string;
   definition?: string;
   problem?: string;
   actionItems?: string[];
   callToAction?: string;
   paradigmShift?: string;
   keyTakeaways?: string[];
   closing?: string;
   gartnerStat?: string;
   question?: string;
   misconception?: { title: string; desc: string };
   reality?: { title: string; desc: string };
   contrast?: {
     vague?: { label: string; example: string; result: string };
     specific?: { label: string; example: string; result: string };
     generativa?: { label: string; example: string; limitation?: string };
     agentica?: { label: string; example: string; power?: string };
   };
   example?: Record<string, string>;
   mcp?: { name: string; fullName: string; analogy: string; definition: string; examples: string[]; icon: string; color: string };
   ceaas?: { name: string; fullName: string; definition: string; examples: string[]; icon: string; color: string };
   nextSession?: { title: string; topic: string };
    timeline?: TimelineItem[];
    workflow?: WorkflowStep[];
    caseStudy?: CaseStudy;
    globalStats?: GlobalStats;
    specializations?: SpecializationItem[];
    layers?: ContextLayer[];
    notebookLM?: NotebookLM;
    brandingSkill?: BrandingSkill;
    deepResearch?: DeepResearch;
    claudeCode?: ClaudeCode;
    workflowSteps?: string[];
    closingContent?: ClosingContent;
    imageUrl?: string;
    coverImageUrl?: string;
    // Gen10 S1 specific properties
    participants?: ParticipantItem[];
    statusItems?: StatusItem[];
    welcomeMessage?: string;
    education?: EducationItem[];
    experience?: ExperienceData;
    preparations?: PreparationItem[];
    supportInfo?: SupportInfo;
    podcastInfo?: PodcastInfo;
    extensionSteps?: ExtensionStep[];
    contextExamples?: ContextExampleItem[];
    outputQuadrants?: OutputQuadrant[];
    missions?: MissionItem[];
    headerText?: string;
    [key: string]: unknown;
  }
 
 /**
  * Hook to access the content of a specific slide by its number.
  * Returns the structured content stored in the database.
  */
 export function useSlideContent(slideNumber: number): SlideContent {
   const { slidesData } = useGeneration();
   
   const slide = slidesData.find(s => s.id === slideNumber);
   return (slide?.content as SlideContent) || {};
 }
 
 /**
  * Get color classes based on color name from database
  */
 export function getColorClasses(color: string): { text: string; bg: string; border: string } {
   const colorMap: Record<string, { text: string; bg: string; border: string }> = {
     amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
     violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
     emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
     red: { text: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/20' },
     blue: { text: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/20' },
     cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    pink: { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
     gray: { text: 'text-white/60', bg: 'bg-white/5', border: 'border-white/10' },
   };
   return colorMap[color] || colorMap.gray;
 }