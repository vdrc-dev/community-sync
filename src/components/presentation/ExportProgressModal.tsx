import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Presentation, CheckCircle2, Loader2, X, Sparkles, Ban, Clock, HardDrive, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ExportFormat, ExportPhase, ExportQuality } from '@/hooks/useExportStandalone';

interface ExportProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
  format: ExportFormat;
  phase: ExportPhase;
  progress: number;
  totalSlides: number;
  currentCapture: number;
  previewImages: string[];
  quality?: ExportQuality;
  elapsedTime?: number;
  estimatedTimeRemaining?: number | null;
  fileSizeEstimate?: string | null;
}

const phaseLabels: Record<ExportPhase, string> = {
  preparing: 'Preparando slides...',
  rendering: 'Capturando diapositivas...',
  generating: 'Generando archivo...',
  complete: '¡Exportación completada!',
};

const qualityLabels: Record<ExportQuality, string> = {
  draft: 'Borrador · 1x JPEG',
  standard: 'Estándar · 1.5x',
  high: 'Alta · 2x',
  ultra: 'Ultra · 3x',
};

const PHASES: ExportPhase[] = ['preparing', 'rendering', 'generating', 'complete'];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`;
}

function PhaseSteps({ currentPhase }: { currentPhase: ExportPhase }) {
  const stepLabels = ['Preparar', 'Capturar', 'Generar', 'Listo'];
  const currentIdx = PHASES.indexOf(currentPhase);
  
  return (
    <div className="flex items-center gap-1 w-full">
      {stepLabels.map((label, idx) => {
        const isComplete = idx < currentIdx;
        const isCurrent = idx === currentIdx;
        
        return (
          <div key={label} className="flex items-center gap-1 flex-1">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${isComplete ? 'bg-emerald-500/20 text-emerald-400' : ''}
                ${isCurrent ? 'bg-primary/20 text-primary ring-2 ring-primary/30' : ''}
                ${!isComplete && !isCurrent ? 'bg-slate-800 text-slate-600' : ''}
              `}>
                {isComplete ? '✓' : idx + 1}
              </div>
              <span className={`text-[10px] uppercase tracking-wider ${
                isCurrent ? 'text-primary' : isComplete ? 'text-emerald-400/70' : 'text-slate-600'
              }`}>
                {label}
              </span>
            </div>
            {idx < stepLabels.length - 1 && (
              <div className={`h-px flex-1 mb-4 ${
                idx < currentIdx ? 'bg-emerald-500/30' : 'bg-slate-800'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ExportProgressModal({
  isOpen,
  onClose,
  onCancel,
  format,
  phase,
  progress,
  totalSlides,
  currentCapture,
  previewImages,
  quality = 'high',
  elapsedTime = 0,
  estimatedTimeRemaining,
  fileSizeEstimate,
}: ExportProgressModalProps) {
  const progressPercent = phase === 'preparing' 
    ? 8 
    : phase === 'rendering' 
      ? 10 + (currentCapture / totalSlides) * 72
      : phase === 'generating'
        ? 88
        : 100;

  const FormatIcon = format === 'pdf' ? FileText : Presentation;
  const formatColor = format === 'pdf' ? 'text-red-400' : 'text-orange-400';
  const isActive = phase !== 'complete';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl mx-4 bg-slate-900 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-black/50"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5 pointer-events-none" />
            
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className={`p-2.5 rounded-xl ${format === 'pdf' ? 'bg-red-500/10' : 'bg-orange-500/10'}`}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FormatIcon className={`w-6 h-6 ${formatColor}`} />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Exportando a {format.toUpperCase()}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {totalSlides} slides · {qualityLabels[quality]}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {isActive && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-sm font-mono text-slate-400 tabular-nums">
                        {formatTime(elapsedTime)}
                      </span>
                    </div>
                  )}
                  
                  {phase === 'complete' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-6 space-y-5">
              {/* Phase Stepper */}
              <PhaseSteps currentPhase={phase} />
              
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {phase === 'complete' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    )}
                    <span className="text-white text-sm font-medium">
                      {phaseLabels[phase]}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono tabular-nums">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                
                <Progress value={progressPercent} className="h-1.5 bg-slate-800" />

                {/* Stats row under progress */}
                {phase === 'rendering' && (
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      {estimatedTimeRemaining != null && estimatedTimeRemaining > 0 && (
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400" />
                          ~{formatTime(estimatedTimeRemaining)} restante
                        </span>
                      )}
                      {fileSizeEstimate && (
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3 text-slate-500" />
                          {fileSizeEstimate}
                        </span>
                      )}
                    </div>
                    <span className="font-mono tabular-nums">
                      {currentCapture}/{totalSlides}
                    </span>
                  </div>
                )}
              </div>

              {/* Live preview grid */}
              {phase === 'rendering' && previewImages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Vista previa</span>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-1.5">
                    {previewImages.slice(-6).map((img, index) => (
                      <motion.div
                        key={`${previewImages.length - 6 + index}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="aspect-video rounded-md overflow-hidden border border-slate-700/50 bg-slate-800"
                      >
                        <img 
                          src={img} 
                          alt={`Slide preview`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                    
                    {Array.from({ length: Math.max(0, 6 - previewImages.slice(-6).length) }).map((_, i) => (
                      <div 
                        key={`ph-${i}`}
                        className="aspect-video rounded-md border border-slate-700/30 bg-slate-800/30 flex items-center justify-center"
                      >
                        <div className="w-3 h-3 rounded-full border-2 border-slate-700 border-t-slate-500 animate-spin" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success state */}
              {phase === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-3 py-3"
                >
                  <motion.div 
                    className="w-14 h-14 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </motion.div>
                  <div>
                    <p className="text-white font-medium">
                      ¡Descarga completada!
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-1 text-sm text-slate-400">
                      <span>{formatTime(elapsedTime)}</span>
                      {fileSizeEstimate && (
                        <>
                          <span className="text-slate-600">·</span>
                          <span>{fileSizeEstimate}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button onClick={onClose} size="sm" className="mt-3">
                    Cerrar
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {isActive && (
              <div className="relative px-6 py-3 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>1920×1080</span>
                  </div>
                  <span className="text-slate-700">·</span>
                  <span>{qualityLabels[quality]}</span>
                </div>
                
                {onCancel && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onCancel}
                    className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 h-6 px-2 text-xs gap-1"
                  >
                    <Ban className="w-3 h-3" />
                    Cancelar
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
