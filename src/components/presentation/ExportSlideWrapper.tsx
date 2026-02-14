import { ReactNode } from 'react';

interface ExportSlideWrapperProps {
  children: ReactNode;
}

/**
 * Static wrapper for export (PDF/PPTX) - no animations, fixed dimensions
 * Uses the cinematic HSL base (#04030a) for perfect rendering
 * CRITICAL: Must have .export-slide class for selector in useExport
 */
export function ExportSlideWrapper({ children }: ExportSlideWrapperProps) {
  return (
    <div
      className="export-slide"
      style={{
        width: '1920px',
        height: '1080px',
        minWidth: '1920px',
        minHeight: '1080px',
        maxWidth: '1920px',
        maxHeight: '1080px',
        overflow: 'hidden',
        position: 'relative',
        // Cinematic HSL base matching the atmospheric system
        background: 'linear-gradient(180deg, #0a0914 0%, #04030a 100%)',
        // Crisp text rendering
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        // Kill animations
        animationPlayState: 'paused',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </div>
  );
}
