import { Shield } from 'lucide-react';
import { G11SectionDivider } from './Shell';
import { G11 } from './theme';

export function G11S1Slide14SecurityDivider() {
  return (
    <G11SectionDivider
      moduleNumber="04"
      title="Contraseñas y Seguridad"
      subtitle="Si usas la misma contraseña en más de un sitio, este módulo es especialmente para ti."
      icon={Shield}
      accent={G11.emerald}
    />
  );
}
