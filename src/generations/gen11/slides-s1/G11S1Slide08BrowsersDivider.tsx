import { Chrome } from 'lucide-react';
import { G11SectionDivider } from './Shell';
import { G11 } from './theme';

export function G11S1Slide08BrowsersDivider() {
  return (
    <G11SectionDivider
      moduleNumber="02"
      title="Navegadores"
      subtitle="Separar contextos = Separar distracciones"
      icon={Chrome}
      accent={G11.amber}
    />
  );
}
