import { Mail } from 'lucide-react';
import { G11SectionDivider } from './Shell';
import { G11 } from './theme';

export function G11S1Slide09InboxZeroDivider() {
  return (
    <G11SectionDivider
      moduleNumber="02"
      title="Inbox Zero"
      subtitle="Tu bandeja de entrada no debería ser una fuente de estrés. Vamos a arreglar eso."
      icon={Mail}
      accent={G11.blue}
    />
  );
}
