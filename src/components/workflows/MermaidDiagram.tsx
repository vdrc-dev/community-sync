import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid with theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#8b5cf6',
    primaryTextColor: '#fff',
    primaryBorderColor: '#7c3aed',
    lineColor: '#6b7280',
    secondaryColor: '#1f2937',
    tertiaryColor: '#111827',
    background: '#0a0a0a',
    mainBkg: '#1f2937',
    nodeBorder: '#7c3aed',
    clusterBkg: '#1f2937',
    clusterBorder: '#374151',
    titleColor: '#f9fafb',
    edgeLabelBackground: '#1f2937',
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
  },
});

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current || !chart) return;

      try {
        // Clear previous content
        containerRef.current.innerHTML = '';

        // Render the diagram
        const { svg } = await mermaid.render(idRef.current, chart);
        containerRef.current.innerHTML = svg;

        // Style the SVG
        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = '100%';
          svgElement.style.height = 'auto';
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        containerRef.current.innerHTML = `
          <div class="text-muted-foreground text-sm p-4 text-center">
            Error al renderizar el diagrama
          </div>
        `;
      }
    };

    renderDiagram();
  }, [chart]);

  if (!chart) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto ${className}`}
    />
  );
}
