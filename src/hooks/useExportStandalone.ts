import { useState, useCallback, useRef, ComponentType } from 'react';
import { toast } from 'sonner';
import type { ExportConfig } from '@/components/presentation/types';

export type ExportFormat = 'pdf' | 'pptx';
export type ExportPhase = 'preparing' | 'rendering' | 'generating' | 'complete';
export type ExportQuality = 'draft' | 'standard' | 'high' | 'ultra';

interface UseExportStandaloneOptions {
  slides: ComponentType[];
  exportConfig: ExportConfig;
}

interface QualityConfig {
  scale: number;
  delay: number;
  format: 'png' | 'jpeg';
  jpegQuality: number;
  label: string;
}

const QUALITY_SETTINGS: Record<ExportQuality, QualityConfig> = {
  draft:    { scale: 1,   delay: 0,   format: 'jpeg', jpegQuality: 0.72, label: 'Borrador' },
  standard: { scale: 1.5, delay: 40,  format: 'png',  jpegQuality: 1,    label: 'Estándar' },
  high:     { scale: 2,   delay: 80,  format: 'png',  jpegQuality: 1,    label: 'Alta' },
  ultra:    { scale: 3,   delay: 120, format: 'png',  jpegQuality: 1,    label: 'Ultra' },
};

const MAX_RETRIES = 2;

/**
 * Premium Export System v3
 * - Real-time preview & progress tracking
 * - Quality tiers (draft→ultra)
 * - Per-slide retry logic
 * - ETA estimation
 * - File size tracking
 * - Memory cleanup
 * - Robust HSL atmospheric sanitization
 */
export function useExportStandalone({ slides, exportConfig }: UseExportStandaloneOptions) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportPhase, setExportPhase] = useState<ExportPhase>('preparing');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [showExportSlides, setShowExportSlides] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [currentCapture, setCurrentCapture] = useState(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [quality, setQuality] = useState<ExportQuality>('high');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number | null>(null);
  const [fileSizeEstimate, setFileSizeEstimate] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const captureStartRef = useRef(0);

  const totalSlides = slides.length;

  // ── Timer ──────────────────────────────────────
  const startTimer = () => {
    setElapsedTime(0);
    setEstimatedTimeRemaining(null);
    timerRef.current = setInterval(() => setElapsedTime(t => t + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // ── File Size Helper ──────────────────────────
  const estimateFileSize = (images: string[]): string => {
    const totalBytes = images.reduce((sum, img) => {
      // base64 data URL: ~75% of string length = raw bytes
      const base64Part = img.split(',')[1] || '';
      return sum + Math.ceil(base64Part.length * 0.75);
    }, 0);

    if (totalBytes < 1024 * 1024) {
      return `${(totalBytes / 1024).toFixed(0)} KB`;
    }
    return `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ── Export CSS ─────────────────────────────────
  const getExportStyles = () => `
    *, *::before, *::after {
      animation: none !important;
      animation-delay: 0s !important;
      animation-duration: 0s !important;
      animation-iteration-count: 1 !important;
      animation-play-state: paused !important;
      transition: none !important;
      transition-delay: 0s !important;
      transition-duration: 0s !important;
    }
    
    body, html, * {
      font-family: Inter, system-ui, -apple-system, sans-serif !important;
      -webkit-font-smoothing: antialiased !important;
      text-rendering: optimizeLegibility !important;
    }
    
    .export-slide, .export-slide * {
      opacity: 1 !important;
      visibility: visible !important;
    }
    
    .glass-card, .glass-premium, .glass-ultra, 
    .card-premium, .tech-card, .feature-card, 
    .slide-frame, .quote-card,
    [class*="backdrop-blur"] {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      background-color: hsl(240 30% 8%) !important;
    }
    
    h1, h2, h3, h4, h5, h6, p, span, div, li {
      overflow: visible !important;
    }
    
    [class*="bg-clip-text"],
    [class*="text-transparent"],
    .gradient-text-hero, 
    .gradient-text, 
    .text-gradient-elegant {
      -webkit-background-clip: initial !important;
      background-clip: initial !important;
      -webkit-text-fill-color: #fafafa !important;
      color: #fafafa !important;
      background: none !important;
    }
  `;

  // ── DOM Sanitization ───────────────────────────
  const sanitizeClonedDocument = (clonedDoc: Document, element: HTMLElement) => {
    // Inject export styles
    const style = clonedDoc.createElement('style');
    style.textContent = getExportStyles();
    clonedDoc.head.appendChild(style);
    
    clonedDoc.body.classList.add('export-mode');
    element.classList.add('export-mode');
    
    // ── Remove atmospheric/decorative elements ──
    const removeSelectors = [
      '.texture-grain',
      '.ambient-orb',
      '.ambient-orb-primary',
      '.ambient-orb-accent',
      '.floating-particle',
      '.slide-bg-mesh',
      '[class*="blur-3xl"]',
      '[class*="blur-2xl"]',
    ];
    
    removeSelectors.forEach(sel => {
      try { clonedDoc.querySelectorAll(sel).forEach(el => el.remove()); } catch {}
    });
    
    // Remove SVG noise/grain filters (fractalNoise, feTurbulence)
    clonedDoc.querySelectorAll('svg filter').forEach(filterEl => {
      const hasTurbulence = filterEl.querySelector('feTurbulence');
      if (hasTurbulence) {
        // Remove the parent SVG if it only contains the filter
        const parentSvg = filterEl.closest('svg');
        if (parentSvg && parentSvg.children.length <= 2) {
          parentSvg.remove();
        } else {
          filterEl.remove();
        }
      }
    });
    
    // Remove elements referencing noise filters (the overlay divs)
    clonedDoc.querySelectorAll('[style*="filter: url(#"]').forEach(el => {
      const style = (el as HTMLElement).getAttribute('style') || '';
      if (style.includes('noise') || style.includes('grain') || style.includes('Turbulence')) {
        el.remove();
      }
    });
    
    // Remove noise/grain applied via backgroundImage with inline SVG data URLs
    clonedDoc.querySelectorAll('[style*="backgroundImage"], [style*="background-image"]').forEach(el => {
      const htmlEl = el as HTMLElement;
      const style = htmlEl.getAttribute('style') || '';
      if (
        style.includes('feTurbulence') || 
        style.includes('fractalNoise') || 
        style.includes('noise') ||
        (style.includes('data:image/svg+xml') && style.includes('filter'))
      ) {
        htmlEl.remove();
      }
    });
    
    // Remove atmospheric gradient orbs by style pattern (large blur + absolute)
    clonedDoc.querySelectorAll('[style*="blur("]').forEach(el => {
      const htmlEl = el as HTMLElement;
      const blurMatch = htmlEl.style.filter?.match(/blur\((\d+)/);
      if (blurMatch && parseInt(blurMatch[1]) >= 60) {
        htmlEl.remove();
        return;
      }
      htmlEl.style.filter = 'none';
    });
    
    // ── Sanitize animate- classes (SVG-safe) ──
    clonedDoc.querySelectorAll('[class*="animate-"]').forEach(el => {
      const classStr = el.getAttribute('class') || '';
      const filtered = classStr.split(' ').filter(c => !c.startsWith('animate-')).join(' ');
      el.setAttribute('class', filtered);
    });
    
    // ── Fix inline styles ──
    clonedDoc.querySelectorAll('*').forEach(el => {
      const htmlEl = el as HTMLElement;
      const inlineStyle = htmlEl.getAttribute('style') || '';
      
      if (inlineStyle.includes('-webkit-text-fill-color') && inlineStyle.includes('transparent')) {
        htmlEl.style.background = 'none';
        htmlEl.style.backgroundImage = 'none';
        htmlEl.style.webkitBackgroundClip = 'initial';
        htmlEl.style.backgroundClip = 'initial';
        htmlEl.style.webkitTextFillColor = '#fafafa';
        htmlEl.style.color = '#fafafa';
      }
    });
    
    // ── Glass/backdrop elements ──
    const glassSelectors = '.glass-card, .glass-premium, .glass-ultra, .card-premium, .tech-card, .feature-card, .slide-frame, .quote-card';
    clonedDoc.querySelectorAll(glassSelectors).forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.backdropFilter = 'none';
      (htmlEl.style as any).webkitBackdropFilter = 'none';
      htmlEl.style.backgroundColor = 'hsl(240, 30%, 8%)';
    });
    
    clonedDoc.querySelectorAll('[class*="backdrop-blur"]').forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.backdropFilter = 'none';
      (htmlEl.style as any).webkitBackdropFilter = 'none';
      htmlEl.style.backgroundColor = 'hsl(240, 30%, 8%)';
    });
    
    // ── Fix opacity ──
    clonedDoc.querySelectorAll('[class*="opacity-"]').forEach(el => {
      (el as HTMLElement).style.opacity = '1';
    });
    
    // ── Color mappings ──
    const colorMappings: { selector: string; color?: string; bg?: string }[] = [
      { selector: '.text-primary', color: '#10B981' },
      { selector: '.bg-primary', bg: '#10B981' },
      { selector: '.text-blue-400', color: '#60a5fa' },
      { selector: '.text-blue-300', color: '#93c5fd' },
      { selector: '.text-pink-400', color: '#f472b6' },
      { selector: '.text-purple-400', color: '#c084fc' },
      { selector: '.text-emerald-400', color: '#34d399' },
      { selector: '.text-orange-400', color: '#fb923c' },
      { selector: '.text-amber-400', color: '#fbbf24' },
      { selector: '.text-amber-300', color: '#fcd34d' },
      { selector: '.text-red-400', color: '#f87171' },
      { selector: '.text-rose-400', color: '#fb7185' },
      { selector: '.text-sky-400', color: '#38bdf8' },
      { selector: '.text-cyan-400', color: '#22d3ee' },
      { selector: '.text-violet-400', color: '#a78bfa' },
      { selector: '.text-indigo-400', color: '#818cf8' },
      { selector: '.text-lime-400', color: '#a3e635' },
      { selector: '.text-teal-400', color: '#2dd4bf' },
      { selector: '.text-fuchsia-400', color: '#e879f9' },
      { selector: '.text-slate-300', color: '#cbd5e1' },
      { selector: '.text-slate-400', color: '#94a3b8' },
      { selector: '.text-slate-500', color: '#64748b' },
      { selector: '.text-gray-300', color: '#d1d5db' },
      { selector: '.text-gray-400', color: '#9ca3af' },
      { selector: '.text-gray-500', color: '#6b7280' },
      { selector: '.text-white', color: '#ffffff' },
      { selector: '.text-white\\/90', color: '#e6e6e6' },
      { selector: '.text-white\\/80', color: '#cccccc' },
      { selector: '.text-white\\/70', color: '#b3b3b3' },
      { selector: '.text-white\\/60', color: '#999999' },
      { selector: '.text-white\\/50', color: '#808080' },
      { selector: '.text-white\\/40', color: '#666666' },
      { selector: '.text-muted-foreground', color: '#9ca3af' },
      { selector: '.text-foreground', color: '#fafafa' },
    ];
    
    colorMappings.forEach(({ selector, color, bg }) => {
      try {
        clonedDoc.querySelectorAll(selector).forEach(el => {
          const htmlEl = el as HTMLElement;
          if (color) htmlEl.style.color = color;
          if (bg) htmlEl.style.backgroundColor = bg;
        });
      } catch {}
    });
    
    // ── Slide container backgrounds ──
    clonedDoc.querySelectorAll('.slide-container, .export-slide').forEach(el => {
      (el as HTMLElement).style.background = 'linear-gradient(180deg, #0a0914 0%, #04030a 100%)';
    });
  };

  // ── Capture Engine ─────────────────────────────
  const captureSlides = async (
    onProgress: (index: number, preview?: string) => void
  ): Promise<string[]> => {
    const container = containerRef.current;
    if (!container) throw new Error('Container not found');

    const slideElements = container.querySelectorAll('.export-slide');
    if (slideElements.length === 0) throw new Error('No slides found');

    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default;
    
    const qs = QUALITY_SETTINGS[quality];
    const images: string[] = [];

    // Wait for fonts + images
    await document.fonts.ready;
    
    // Preload: wait for all images in container to load
    const imgElements = container.querySelectorAll('img');
    await Promise.allSettled(
      Array.from(imgElements).map(img =>
        img.complete ? Promise.resolve() : new Promise(r => {
          img.onload = r;
          img.onerror = r;
        })
      )
    );

    captureStartRef.current = Date.now();

    for (let i = 0; i < slideElements.length; i++) {
      if (abortRef.current) break;
      
      const slide = slideElements[i] as HTMLElement;
      let lastError: Error | null = null;

      // Retry loop per slide
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          if (qs.delay > 0) {
            await new Promise(r => setTimeout(r, qs.delay));
          }
          
          const canvas = await html2canvas(slide, {
            scale: qs.scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#04030a',
            width: 1920,
            height: 1080,
            windowWidth: 1920,
            windowHeight: 1080,
            imageTimeout: 30000,
            allowTaint: true,
            foreignObjectRendering: false,
            removeContainer: false,
            onclone: sanitizeClonedDocument,
          });

          const imgFormat = qs.format === 'jpeg' ? 'image/jpeg' : 'image/png';
          const dataUrl = canvas.toDataURL(imgFormat, qs.format === 'jpeg' ? qs.jpegQuality : 1.0);
          images.push(dataUrl);
          
          // Thumbnail for preview
          const thumbCanvas = document.createElement('canvas');
          thumbCanvas.width = 192;
          thumbCanvas.height = 108;
          const ctx = thumbCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(canvas, 0, 0, 192, 108);
            onProgress(i + 1, thumbCanvas.toDataURL('image/jpeg', 0.6));
          } else {
            onProgress(i + 1);
          }

          // ETA calculation
          const elapsed = (Date.now() - captureStartRef.current) / 1000;
          const avgPerSlide = elapsed / (i + 1);
          const remaining = Math.ceil(avgPerSlide * (slideElements.length - i - 1));
          setEstimatedTimeRemaining(remaining);

          // Running file size
          setFileSizeEstimate(estimateFileSize(images));

          lastError = null;
          break; // success
        } catch (error) {
          lastError = error as Error;
          console.warn(`Slide ${i + 1} attempt ${attempt + 1} failed:`, error);
          if (attempt < MAX_RETRIES) {
            await new Promise(r => setTimeout(r, 200 * (attempt + 1)));
          }
        }
      }

      if (lastError) {
        console.error(`Slide ${i + 1} failed after ${MAX_RETRIES + 1} attempts`);
        throw lastError;
      }
    }

    return images;
  };

  // ── Reset Helper ───────────────────────────────
  const resetState = () => {
    stopTimer();
    setIsExporting(false);
    setExportProgress(0);
    setShowExportSlides(false);
    setShowProgressModal(false);
    setExportPhase('preparing');
    setPreviewImages([]);
    setEstimatedTimeRemaining(null);
    setFileSizeEstimate(null);
  };

  // ── Export to PDF ──────────────────────────────
  const exportToPDF = useCallback(async () => {
    if (isExporting) return;

    abortRef.current = false;
    setIsExporting(true);
    setExportProgress(0);
    setExportPhase('preparing');
    setExportFormat('pdf');
    setShowExportSlides(true);
    setShowProgressModal(true);
    setCurrentCapture(0);
    setPreviewImages([]);
    setFileSizeEstimate(null);
    setEstimatedTimeRemaining(null);
    startTimer();

    const prepDelay = quality === 'draft' ? 600 : 2000;
    await new Promise(r => setTimeout(r, prepDelay));

    try {
      setExportPhase('rendering');

      const images = await captureSlides((progress, preview) => {
        setExportProgress(progress);
        setCurrentCapture(progress);
        if (preview) setPreviewImages(prev => [...prev, preview]);
      });

      if (abortRef.current) throw new Error('Export cancelled');

      setExportPhase('generating');
      setEstimatedTimeRemaining(null);
      await new Promise(r => setTimeout(r, 200));

      const { jsPDF } = await import('jspdf');
      const qs = QUALITY_SETTINGS[quality];

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080],
        hotfixes: ['px_scaling'],
        compress: true,
      });

      pdf.setProperties({
        title: exportConfig.title,
        author: exportConfig.author || 'VDRC',
        subject: exportConfig.subject || '',
        creator: 'VDRC Export System v3',
      });

      const imgType = qs.format === 'jpeg' ? 'JPEG' : 'PNG';
      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage([1920, 1080], 'landscape');
        pdf.addImage(images[i], imgType, 0, 0, 1920, 1080);
      }

      const date = new Date().toISOString().split('T')[0];
      const qualitySuffix = quality === 'draft' ? '-borrador' : '';
      const filename = `${exportConfig.filename}${qualitySuffix}-${date}.pdf`;
      pdf.save(filename);

      setExportPhase('complete');
      setFileSizeEstimate(estimateFileSize(images));
      
      toast.success('PDF exportado', {
        description: `${filename} · ${images.length} slides · ${estimateFileSize(images)}`,
      });

      await new Promise(r => setTimeout(r, 2500));
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      if (!abortRef.current) {
        toast.error('Error al exportar PDF', {
          description: 'Intenta de nuevo. Si persiste, contacta soporte.',
        });
      }
    } finally {
      resetState();
    }
  }, [isExporting, exportConfig, quality]);

  // ── Export to PPTX ─────────────────────────────
  const exportToPPTX = useCallback(async () => {
    if (isExporting) return;

    abortRef.current = false;
    setIsExporting(true);
    setExportProgress(0);
    setExportPhase('preparing');
    setExportFormat('pptx');
    setShowExportSlides(true);
    setShowProgressModal(true);
    setCurrentCapture(0);
    setPreviewImages([]);
    setFileSizeEstimate(null);
    setEstimatedTimeRemaining(null);
    startTimer();

    const prepDelay = quality === 'draft' ? 600 : 2000;
    await new Promise(r => setTimeout(r, prepDelay));

    try {
      setExportPhase('rendering');

      const images = await captureSlides((progress, preview) => {
        setExportProgress(progress);
        setCurrentCapture(progress);
        if (preview) setPreviewImages(prev => [...prev, preview]);
      });

      if (abortRef.current) throw new Error('Export cancelled');

      setExportPhase('generating');
      setEstimatedTimeRemaining(null);
      await new Promise(r => setTimeout(r, 200));

      const PptxGenJS = (await import('pptxgenjs')).default;
      const pptx = new PptxGenJS();

      pptx.layout = 'LAYOUT_16x9';
      pptx.author = exportConfig.author || 'VDRC';
      pptx.title = exportConfig.title;
      pptx.subject = exportConfig.subject || '';
      pptx.company = 'VDRC';

      for (const imgData of images) {
        const slide = pptx.addSlide();
        slide.addImage({ data: imgData, x: 0, y: 0, w: '100%', h: '100%' });
      }

      const date = new Date().toISOString().split('T')[0];
      const qualitySuffix = quality === 'draft' ? '-borrador' : '';
      const filename = `${exportConfig.filename}${qualitySuffix}-${date}.pptx`;
      await pptx.writeFile({ fileName: filename });

      setExportPhase('complete');
      setFileSizeEstimate(estimateFileSize(images));
      
      toast.success('PPTX exportado', {
        description: `${filename} · ${images.length} slides · ${estimateFileSize(images)}`,
      });

      await new Promise(r => setTimeout(r, 2500));
      
    } catch (error) {
      console.error('Error exporting PPTX:', error);
      if (!abortRef.current) {
        toast.error('Error al exportar PPTX', {
          description: 'Intenta de nuevo. Si persiste, contacta soporte.',
        });
      }
    } finally {
      resetState();
    }
  }, [isExporting, exportConfig, quality]);

  // ── Cancel ─────────────────────────────────────
  const cancelExport = useCallback(() => {
    abortRef.current = true;
    stopTimer();
    setShowProgressModal(false);
    setShowExportSlides(false);
    setIsExporting(false);
    toast.info('Exportación cancelada');
  }, []);

  // ── Close Modal ────────────────────────────────
  const closeProgressModal = useCallback(() => {
    if (exportPhase === 'complete' || !isExporting) {
      setShowProgressModal(false);
    }
  }, [exportPhase, isExporting]);

  return {
    // State
    isExporting,
    exportProgress,
    exportPhase,
    exportFormat,
    showExportSlides,
    showProgressModal,
    totalSlides,
    currentCapture,
    previewImages,
    quality,
    elapsedTime,
    estimatedTimeRemaining,
    fileSizeEstimate,
    
    // Refs
    containerRef,
    
    // Actions
    exportToPDF,
    exportToPPTX,
    cancelExport,
    closeProgressModal,
    setQuality,
  };
}
