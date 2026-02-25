import { motion } from 'framer-motion';
import { Target, PackageCheck, ShieldCheck } from 'lucide-react';
import { s4Motion } from './theme';

interface S4TeachingRibbonProps {
  objective: string;
  deliverable: string;
  qualityGate: string;
  hue?: number;
  isExporting: boolean;
}

export function S4TeachingRibbon({
  objective,
  deliverable,
  qualityGate,
  hue = 185,
  isExporting,
}: S4TeachingRibbonProps) {
  return (
    <motion.aside
      {...s4Motion(0.22, isExporting)}
      className="absolute top-6 right-8 z-20 w-[340px] rounded-2xl border border-white/[0.1] bg-black/30 p-4 backdrop-blur-lg"
      style={{ boxShadow: `0 0 36px hsl(${hue} 65% 52% / 0.12)` }}
    >
      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/85">
        Marco Pedagogico
      </p>
      <div className="space-y-2.5">
        <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5">
          <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
          <div>
            <p className="text-[11px] font-semibold text-white/90">Objetivo</p>
            <p className="text-[11px] leading-relaxed text-white/75">{objective}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5">
          <PackageCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
          <div>
            <p className="text-[11px] font-semibold text-white/90">Entregable</p>
            <p className="text-[11px] leading-relaxed text-white/75">{deliverable}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
          <div>
            <p className="text-[11px] font-semibold text-white/90">Criterio de calidad</p>
            <p className="text-[11px] leading-relaxed text-white/75">{qualityGate}</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
