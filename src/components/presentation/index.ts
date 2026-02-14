// ============================================
// Unified Presentation System Exports
// ============================================

// Type definitions (Phase 1 unification)
export type {
  PresentationSection,
  PresentationConfig,
  ExportConfig,
  PresentationFeatures,
  SlideMetadata,
  PresentationLayoutProps,
} from './types';
export { DEFAULT_FEATURES } from './types';

// Unified components (Phase 1 & 2 unification)
export { UnifiedSidebarNav } from './UnifiedSidebarNav';
export { PresentationLayout } from './PresentationLayout';

// Layout component exports
export { ConsultingSlideLayout, itemVariants } from './ConsultingSlideLayout';
export { SlideWrapper, containerVariants } from './SlideWrapper';
export { ExportSlideWrapper } from './ExportSlideWrapper';
export { ThumbnailsView } from './ThumbnailsView';
export { KeyboardShortcuts } from './KeyboardShortcuts';
export { ExportDropdown } from './ExportDropdown';
export { ExportProgressModal } from './ExportProgressModal';
export { EditableText } from './EditableText';

// Note: Slides are now exported from src/generations/
// Import them using: import { slides, GEN_CONFIG } from '@/generations';
