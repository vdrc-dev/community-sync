import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  X, 
  Check,
  Loader2,
  MessageSquare,
  Stamp
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Slide } from '@/types/presentation';
import { 
  exportToPPTX, 
  exportToPDF, 
  exportBoth,
  type ExportMetadata,
  type ExportOptions 
} from '@/lib/exportPresentation';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: Slide[];
  metadata: ExportMetadata;
  containerRef?: React.RefObject<HTMLElement>;
}

type ExportFormat = 'pptx' | 'pdf' | 'both';
type ExportStatus = 'idle' | 'exporting' | 'success' | 'error';

export function ExportModal({
  open,
  onOpenChange,
  slides,
  metadata,
  containerRef,
}: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('both');
  const [includeSpeakerNotes, setIncludeSpeakerNotes] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(false);
  const [status, setStatus] = useState<ExportStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [currentFormat, setCurrentFormat] = useState<'pptx' | 'pdf'>('pptx');

  const handleExport = async () => {
    setStatus('exporting');
    setProgress(0);

    const options: ExportOptions = {
      includeSpeakerNotes,
      includeWatermark,
      quality: 'high',
    };

    try {
      if (selectedFormat === 'pdf' && containerRef?.current) {
        await exportToPDF(
          containerRef.current,
          slides,
          metadata,
          options,
          setProgress
        );
      } else if (selectedFormat === 'both' && containerRef?.current) {
        await exportBoth(
          containerRef.current,
          slides,
          metadata,
          options,
          (p, format) => {
            setProgress(p);
            setCurrentFormat(format);
          }
        );
      } else if (selectedFormat === 'pptx') {
        // PPTX only, no container needed
        await exportToPPTX(slides, metadata, options);
        setProgress(100);
      }

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      console.error('Export error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const formatOptions = [
    {
      id: 'pptx' as const,
      icon: FileSpreadsheet,
      label: 'PPTX',
      description: 'Editable en Canva',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
    {
      id: 'pdf' as const,
      icon: FileText,
      label: 'PDF',
      description: 'Alta calidad',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
    {
      id: 'both' as const,
      icon: Download,
      label: 'Ambos',
      description: 'PPTX + PDF',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Exportar Presentación
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Formato de Exportación
            </label>
            <div className="grid grid-cols-3 gap-3">
              {formatOptions.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  disabled={status === 'exporting'}
                  className={cn(
                    'relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all',
                    selectedFormat === format.id
                      ? `${format.borderColor} ${format.bgColor}`
                      : 'border-border/50 hover:border-border',
                    status === 'exporting' && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <format.icon className={cn('h-8 w-8', format.color)} />
                  <span className="text-sm font-medium">{format.label}</span>
                  <span className="text-xs text-muted-foreground text-center">
                    {format.description}
                  </span>
                  {selectedFormat === format.id && (
                    <motion.div
                      layoutId="selected-format"
                      className="absolute -top-1 -right-1"
                    >
                      <div className={cn('rounded-full p-0.5', format.bgColor)}>
                        <Check className={cn('h-3 w-3', format.color)} />
                      </div>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Opciones
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={includeSpeakerNotes}
                  onCheckedChange={(checked) => setIncludeSpeakerNotes(!!checked)}
                  disabled={status === 'exporting' || selectedFormat === 'pdf'}
                />
                <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className={cn(
                  'text-sm',
                  selectedFormat === 'pdf' && 'text-muted-foreground line-through'
                )}>
                  Incluir notas del presentador
                </span>
                {selectedFormat === 'pdf' && (
                  <span className="text-xs text-muted-foreground">(solo PPTX)</span>
                )}
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={includeWatermark}
                  onCheckedChange={(checked) => setIncludeWatermark(!!checked)}
                  disabled={status === 'exporting'}
                />
                <Stamp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm">Agregar marca de agua</span>
              </label>
            </div>
          </div>

          {/* Progress */}
          <AnimatePresence mode="wait">
            {status === 'exporting' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generando {currentFormat.toUpperCase()}...
                  </span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 py-3 text-primary"
              >
                <Check className="h-5 w-5" />
                <span className="font-medium">¡Exportación completada!</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 py-3 text-destructive"
              >
                <X className="h-5 w-5" />
                <span className="font-medium">Error al exportar</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info */}
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
            <p>
              <strong>Archivo:</strong> {metadata.generationCode}_Clase{metadata.classNumber}_VibeCoding
            </p>
            <p className="mt-1">
              <strong>Slides:</strong> {slides.length} diapositivas
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={status === 'exporting'}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            disabled={status === 'exporting' || status === 'success'}
            className="gap-2"
          >
            {status === 'exporting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Exportar {selectedFormat === 'both' ? 'Ambos' : selectedFormat.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
