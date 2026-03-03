import { Globe } from 'lucide-react';
import { G11SectionDivider } from './Shell';
import { G11 } from './theme';

export function G11S1Slide12BrowsersDivider() {
  return (
    <G11SectionDivider
      moduleNumber="03"
      title="Navegadores y Perfiles"
      subtitle="Tu navegador es tu escritorio digital. Vamos a organizarlo como se merece."
      icon={Globe}
      accent={G11.amber}
    />
  );
}
