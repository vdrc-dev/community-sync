import { ComponentType } from 'react';

/**
 * Unified Presentation System Types
 * Phase 1 of the PresentationLayout unification plan
 */

// ============================================
// Section Configuration
// ============================================

/**
 * Defines a logical section within a presentation
 * Used for navigation sidebar and progress indicators
 */
export interface PresentationSection {
  id: string;           // Unique identifier (e.g., "intro", "security")
  title: string;        // Display name (e.g., "Introducción", "Seguridad")
  slides: number[];     // Array of slide numbers in this section [1, 2, 3]
}

// ============================================
// Presentation Configuration
// ============================================

/**
 * Core presentation metadata and branding
 */
export interface PresentationConfig {
  name: string;                 // Presentation title (e.g., "La Era Agéntica")
  badge?: string;               // Badge text (e.g., "Clase 02", "Gen 10")
  badgeColor?: string;          // Badge background color (hex or HSL)
  footer?: string;              // Footer text (e.g., "Vibe Coding 2026")
  footerLink?: string;          // Optional link in footer
}

// ============================================
// Export Configuration
// ============================================

/**
 * Configuration for PDF/PPTX export functionality
 */
export interface ExportConfig {
  filename: string;             // Base filename pattern (without extension)
  title: string;                // Document title metadata
  author?: string;              // Document author metadata
  subject?: string;             // Document subject/description
}

// ============================================
// Feature Flags
// ============================================

/**
 * Toggleable features for PresentationLayout
 * Allows gradual activation of functionality
 */
export interface PresentationFeatures {
  galleryMode?: boolean;        // Enable gallery/preview mode before presenting
  export?: boolean;             // Enable PDF/PPTX export functionality
  editableContent?: boolean;    // Enable live content editing (future)
  sidebar?: boolean;            // Enable navigation sidebar
  thumbnails?: boolean;         // Enable thumbnail grid view
  keyboardShortcuts?: boolean;  // Enable keyboard navigation
  fullscreen?: boolean;         // Enable fullscreen toggle
  progressBar?: boolean;        // Enable slide progress indicator
}

// ============================================
// Slide Metadata (Optional)
// ============================================

/**
 * Optional metadata for individual slides
 * Used for sidebar labels and thumbnails
 */
export interface SlideMetadata {
  id: number;                   // Slide number (1-indexed)
  title: string;                // Display title for navigation
  description?: string;         // Optional tooltip/preview text
}

// ============================================
// PresentationLayout Props
// ============================================

/**
 * Main props interface for the unified PresentationLayout component
 */
export interface GenerationNavInfo {
  generationNumber: number;
  currentWeek: number;
  totalWeeks: number;
  availableWeeks?: number[];
}

export interface PresentationLayoutProps {
  // Content
  slides: ComponentType[];                    // Array of slide components
  sections: PresentationSection[];            // Section configuration
  slideMetadata?: SlideMetadata[];            // Optional slide labels
  
  // Configuration
  config: PresentationConfig;                 // Presentation metadata
  
  // Features (all optional with sensible defaults)
  features?: PresentationFeatures;
  
  // Export (only used if features.export = true)
  exportConfig?: ExportConfig;
  
  // Gallery mode header (only if features.galleryMode = true)
  galleryHeader?: React.ReactNode;
  
  // Navigation context (for student materials flow)
  backUrl?: string;                           // URL to return to materials hub
  generationInfo?: GenerationNavInfo;         // Week navigation context
  
  // External state control
  initialSlide?: number;                      // Starting slide (default: 1)
  onSlideChange?: (slide: number) => void;    // Callback when slide changes
}

// ============================================
// Default Feature Configuration
// ============================================

export const DEFAULT_FEATURES: PresentationFeatures = {
  galleryMode: false,
  export: false,
  editableContent: false,
  sidebar: true,
  thumbnails: true,
  keyboardShortcuts: true,
  fullscreen: true,
  progressBar: true,
};
