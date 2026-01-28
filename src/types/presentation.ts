// Slide types for the presentation viewer
export type SlideType = 'title' | 'content' | 'split' | 'image' | 'code' | 'bullets';

export interface Slide {
  id: string;
  type: SlideType;
  title?: string;
  subtitle?: string;
  content?: string;
  bullets?: string[];
  image?: string;
  code?: string;
  codeLanguage?: string;
  speakerNotes?: string;
  tags?: string[];
}

export interface PresentationSettings {
  theme?: 'dark' | 'light';
  showProgress?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// Keyboard shortcuts configuration
export const PRESENTATION_SHORTCUTS = {
  ArrowRight: 'next',
  ArrowLeft: 'prev',
  Space: 'next',
  f: 'fullscreen',
  g: 'grid',
  s: 'speaker',
  Escape: 'exit',
  Home: 'first',
  End: 'last',
} as const;

export type ShortcutAction = typeof PRESENTATION_SHORTCUTS[keyof typeof PRESENTATION_SHORTCUTS];
