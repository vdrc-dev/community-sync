import type { Slide } from '@/types/presentation';

export interface ExportMetadata {
  title: string;
  generationCode: string;
  classNumber: number;
  author?: string;
}

export interface ExportOptions {
  includeSpeakerNotes?: boolean;
  includeWatermark?: boolean;
  quality?: 'standard' | 'high';
}

// Colors for export (matching premium theme)
const COLORS = {
  background: '0A0F1C',
  primary: '4ADE80',
  secondary: '3B82F6',
  text: 'FFFFFF',
  muted: '9CA3AF',
  accent: '8B5CF6',
};

/**
 * Export presentation to PPTX format (for Canva editing)
 */
export async function exportToPPTX(
  slides: Slide[],
  metadata: ExportMetadata,
  options: ExportOptions = {}
): Promise<void> {
  const { includeSpeakerNotes = true } = options;
  
  // Dynamic import to reduce bundle size
  const pptxgen = (await import('pptxgenjs')).default;
  const pptx = new pptxgen();
  
  // Global configuration
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = metadata.author || 'VDRC Workshop Portal';
  pptx.title = metadata.title;
  pptx.subject = `Generación ${metadata.generationCode} - Clase ${metadata.classNumber}`;
  pptx.company = 'Vibe Coding Workshop';
  
  // Define master slide with dark background
  pptx.defineSlideMaster({
    title: 'VDRC_DARK',
    background: { color: COLORS.background },
  });
  
  // Process each slide
  slides.forEach((slide, index) => {
    const pptSlide = pptx.addSlide({ masterName: 'VDRC_DARK' });
    
    // Add slide number
    pptSlide.addText(`${index + 1}`, {
      x: '95%',
      y: '93%',
      w: '4%',
      h: '5%',
      fontSize: 10,
      color: COLORS.muted,
      align: 'right',
    });
    
    switch (slide.type) {
      case 'title':
        renderTitleSlide(pptSlide, slide);
        break;
      case 'bullets':
        renderBulletsSlide(pptSlide, slide);
        break;
      case 'content':
        renderContentSlide(pptSlide, slide);
        break;
      case 'split':
        renderSplitSlide(pptSlide, slide);
        break;
      case 'code':
        renderCodeSlide(pptSlide, slide);
        break;
      case 'image':
        renderImageSlide(pptSlide, slide);
        break;
      default:
        renderContentSlide(pptSlide, slide);
    }
    
    // Add speaker notes if enabled
    if (includeSpeakerNotes && slide.speakerNotes) {
      pptSlide.addNotes(slide.speakerNotes);
    }
    
    // Add tags as footer if present
    if (slide.tags && slide.tags.length > 0) {
      pptSlide.addText(slide.tags.join(' • '), {
        x: '5%',
        y: '93%',
        w: '70%',
        h: '5%',
        fontSize: 9,
        color: COLORS.muted,
        align: 'left',
      });
    }
  });
  
  // Generate filename
  const fileName = `${metadata.generationCode}_Clase${metadata.classNumber}_VibeCoding.pptx`;
  
  // Download file
  await pptx.writeFile({ fileName });
}

function renderTitleSlide(pptSlide: any, slide: Slide) {
  // Main title
  if (slide.title) {
    pptSlide.addText(slide.title, {
      x: '5%',
      y: '30%',
      w: '90%',
      h: '20%',
      fontSize: 48,
      color: COLORS.text,
      bold: true,
      align: 'center',
      fontFace: 'Arial',
    });
  }
  
  // Subtitle
  if (slide.subtitle) {
    pptSlide.addText(slide.subtitle, {
      x: '5%',
      y: '52%',
      w: '90%',
      h: '15%',
      fontSize: 28,
      color: COLORS.primary,
      align: 'center',
      fontFace: 'Arial',
    });
  }
  
  // Decorative line
  pptSlide.addShape('rect', {
    x: '35%',
    y: '70%',
    w: '30%',
    h: '0.5%',
    fill: { color: COLORS.primary },
  });
}

function renderBulletsSlide(pptSlide: any, slide: Slide) {
  // Title
  if (slide.title) {
    pptSlide.addText(slide.title, {
      x: '5%',
      y: '5%',
      w: '90%',
      h: '12%',
      fontSize: 36,
      color: COLORS.primary,
      bold: true,
      fontFace: 'Arial',
    });
  }
  
  // Bullets
  if (slide.bullets && slide.bullets.length > 0) {
    const bulletItems = slide.bullets.map(bullet => ({
      text: bullet,
      options: {
        bullet: { type: 'bullet', color: COLORS.primary },
        color: COLORS.text,
        fontSize: 22,
        breakLine: true,
        paraSpaceAfter: 12,
      },
    }));
    
    pptSlide.addText(bulletItems, {
      x: '8%',
      y: '20%',
      w: '84%',
      h: '70%',
      valign: 'top',
      fontFace: 'Arial',
    });
  }
}

function renderContentSlide(pptSlide: any, slide: Slide) {
  // Title
  if (slide.title) {
    pptSlide.addText(slide.title, {
      x: '5%',
      y: '5%',
      w: '90%',
      h: '12%',
      fontSize: 36,
      color: COLORS.primary,
      bold: true,
      fontFace: 'Arial',
    });
  }
  
  // Content
  if (slide.content) {
    pptSlide.addText(slide.content, {
      x: '5%',
      y: '20%',
      w: '90%',
      h: '70%',
      fontSize: 20,
      color: COLORS.text,
      valign: 'top',
      fontFace: 'Arial',
    });
  }
}

function renderSplitSlide(pptSlide: any, slide: Slide) {
  // Title
  if (slide.title) {
    pptSlide.addText(slide.title, {
      x: '5%',
      y: '5%',
      w: '90%',
      h: '12%',
      fontSize: 36,
      color: COLORS.primary,
      bold: true,
      fontFace: 'Arial',
    });
  }
  
  // Left column - Content
  if (slide.content) {
    pptSlide.addText(slide.content, {
      x: '5%',
      y: '20%',
      w: '42%',
      h: '70%',
      fontSize: 18,
      color: COLORS.text,
      valign: 'top',
      fontFace: 'Arial',
    });
  }
  
  // Right column - Bullets
  if (slide.bullets && slide.bullets.length > 0) {
    const bulletItems = slide.bullets.map(bullet => ({
      text: bullet,
      options: {
        bullet: { type: 'bullet', color: COLORS.secondary },
        color: COLORS.text,
        fontSize: 18,
        breakLine: true,
        paraSpaceAfter: 8,
      },
    }));
    
    pptSlide.addText(bulletItems, {
      x: '52%',
      y: '20%',
      w: '43%',
      h: '70%',
      valign: 'top',
      fontFace: 'Arial',
    });
  }
  
  // Vertical divider
  pptSlide.addShape('rect', {
    x: '49%',
    y: '20%',
    w: '0.3%',
    h: '70%',
    fill: { color: COLORS.muted },
  });
}

function renderCodeSlide(pptSlide: any, slide: Slide) {
  // Title
  if (slide.title) {
    pptSlide.addText(slide.title, {
      x: '5%',
      y: '5%',
      w: '90%',
      h: '10%',
      fontSize: 32,
      color: COLORS.primary,
      bold: true,
      fontFace: 'Arial',
    });
  }
  
  // Code block background
  pptSlide.addShape('rect', {
    x: '5%',
    y: '18%',
    w: '90%',
    h: '72%',
    fill: { color: '1A1F2E' },
    line: { color: COLORS.muted, pt: 1 },
  });
  
  // Language badge
  if (slide.codeLanguage) {
    pptSlide.addText(slide.codeLanguage.toUpperCase(), {
      x: '7%',
      y: '20%',
      w: '15%',
      h: '5%',
      fontSize: 10,
      color: COLORS.accent,
      bold: true,
      fontFace: 'Consolas',
    });
  }
  
  // Code content
  if (slide.code) {
    pptSlide.addText(slide.code, {
      x: '7%',
      y: '27%',
      w: '86%',
      h: '60%',
      fontSize: 14,
      color: COLORS.text,
      fontFace: 'Consolas',
      valign: 'top',
    });
  }
}

function renderImageSlide(pptSlide: any, slide: Slide) {
  // Title (smaller for image slides)
  if (slide.title) {
    pptSlide.addText(slide.title, {
      x: '5%',
      y: '3%',
      w: '90%',
      h: '8%',
      fontSize: 28,
      color: COLORS.primary,
      bold: true,
      align: 'center',
      fontFace: 'Arial',
    });
  }
  
  // Image placeholder (note: actual images need URL or base64)
  if (slide.image) {
    // If it's a URL, try to add it
    if (slide.image.startsWith('http')) {
      pptSlide.addImage({
        path: slide.image,
        x: '10%',
        y: '15%',
        w: '80%',
        h: '75%',
      });
    } else {
      // Placeholder for local images
      pptSlide.addShape('rect', {
        x: '10%',
        y: '15%',
        w: '80%',
        h: '75%',
        fill: { color: '1A1F2E' },
        line: { color: COLORS.muted, pt: 2, dashType: 'dash' },
      });
      pptSlide.addText('📷 Imagen: ' + slide.image, {
        x: '10%',
        y: '45%',
        w: '80%',
        h: '10%',
        fontSize: 16,
        color: COLORS.muted,
        align: 'center',
      });
    }
  }
  
  // Content below image
  if (slide.content) {
    pptSlide.addText(slide.content, {
      x: '5%',
      y: '92%',
      w: '90%',
      h: '6%',
      fontSize: 14,
      color: COLORS.muted,
      align: 'center',
      fontFace: 'Arial',
    });
  }
}

/**
 * Export presentation to PDF format (multi-page, high quality)
 */
export async function exportToPDF(
  containerRef: HTMLElement,
  slides: Slide[],
  metadata: ExportMetadata,
  options: ExportOptions = {},
  onProgress?: (percent: number) => void
): Promise<void> {
  const { quality = 'high' } = options;
  const scale = quality === 'high' ? 2 : 1.5;
  
  // Dynamic imports
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);
  
  // Create PDF in landscape
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [1920, 1080],
  });
  
  const slideElements = containerRef.querySelectorAll('[data-slide-export]');
  const totalSlides = slideElements.length || slides.length;
  
  for (let i = 0; i < totalSlides; i++) {
    const slideEl = slideElements[i] as HTMLElement;
    
    if (slideEl) {
      // Capture slide
      const canvas = await html2canvas(slideEl, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0A0F1C',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      if (i > 0) {
        pdf.addPage([1920, 1080], 'landscape');
      }
      
      pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
    }
    
    // Report progress
    if (onProgress) {
      onProgress(Math.round(((i + 1) / totalSlides) * 100));
    }
  }
  
  // Generate filename
  const fileName = `${metadata.generationCode}_Clase${metadata.classNumber}_VibeCoding.pdf`;
  
  // Download
  pdf.save(fileName);
}

/**
 * Export to both formats
 */
export async function exportBoth(
  containerRef: HTMLElement,
  slides: Slide[],
  metadata: ExportMetadata,
  options: ExportOptions = {},
  onProgress?: (percent: number, format: 'pptx' | 'pdf') => void
): Promise<void> {
  // Export PPTX first (faster)
  await exportToPPTX(slides, metadata, options);
  onProgress?.(50, 'pptx');
  
  // Then export PDF
  await exportToPDF(containerRef, slides, metadata, options, (p) => {
    onProgress?.(50 + p / 2, 'pdf');
  });
}
