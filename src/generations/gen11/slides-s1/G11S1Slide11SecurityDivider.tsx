import { Shield } from 'lucide-react';
import { G11SectionDivider } from './Shell';
import { G11 } from './theme';

export function G11S1Slide11SecurityDivider() {
  return <G11SectionDivider moduleNumber="03" title="Seguridad Digital" subtitle="Los hackers no entran a tu notebook, pero sí a tus servicios online" icon={Shield} accent={G11.emerald} />;
}
