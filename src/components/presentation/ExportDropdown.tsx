import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Presentation, ChevronDown, Settings2, Sparkles, Zap, Star, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import type { ExportQuality } from '@/hooks/useExportStandalone';

interface ExportDropdownProps {
  onExportPDF: () => void;
  onExportPPTX: () => void;
  isExporting: boolean;
  quality?: ExportQuality;
  onQualityChange?: (quality: ExportQuality) => void;
}

const qualityOptions: { value: ExportQuality; label: string; desc: string; icon: typeof Zap }[] = [
  { value: 'draft', label: 'Borrador', desc: '1x JPEG - Ultra rápido', icon: Feather },
  { value: 'standard', label: 'Estándar', desc: '1.5x PNG - Rápido', icon: Zap },
  { value: 'high', label: 'Alta', desc: '2x PNG - Recomendado', icon: Star },
  { value: 'ultra', label: 'Ultra', desc: '3x PNG - Mejor calidad', icon: Sparkles },
];

export function ExportDropdown({
  onExportPDF,
  onExportPPTX,
  isExporting,
  quality = 'high',
  onQualityChange,
}: ExportDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isExporting}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white shadow-lg shadow-primary/20"
            disabled={isExporting}
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exportando...' : 'Exportar'}
            {!isExporting && <ChevronDown className="w-3 h-3 ml-1" />}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-slate-900 border-slate-700">
        {/* Quality Settings FIRST */}
        {onQualityChange && (
          <>
            <DropdownMenuLabel className="text-slate-400 text-xs uppercase tracking-wide flex items-center gap-2">
              <Settings2 className="w-3 h-3" />
              Calidad de exportación
            </DropdownMenuLabel>
            
            <DropdownMenuRadioGroup value={quality} onValueChange={(v) => onQualityChange(v as ExportQuality)}>
              {qualityOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer focus:bg-primary/10"
                >
                  <option.icon className={`w-4 h-4 mr-2 ${
                    quality === option.value ? 'text-primary' : 'text-slate-500'
                  }`} />
                  <div className="flex-1">
                    <span className="text-white">{option.label}</span>
                    <p className="text-xs text-slate-500">{option.desc}</p>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator className="bg-slate-700" />
          </>
        )}

        {/* Format Options */}
        <DropdownMenuLabel className="text-slate-400 text-xs uppercase tracking-wide">
          Descargar como
        </DropdownMenuLabel>
        
        <DropdownMenuItem
          onClick={onExportPDF}
          className="cursor-pointer focus:bg-red-500/10 group"
        >
          <FileText className="w-4 h-4 mr-3 text-red-400" />
          <div className="flex-1">
            <span className="text-white">PDF</span>
            <p className="text-xs text-slate-500 group-hover:text-slate-400">
              Documento portable
            </p>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={onExportPPTX}
          className="cursor-pointer focus:bg-orange-500/10 group"
        >
          <Presentation className="w-4 h-4 mr-3 text-orange-400" />
          <div className="flex-1">
            <span className="text-white">PowerPoint</span>
            <p className="text-xs text-slate-500 group-hover:text-slate-400">
              Editable en Office
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
