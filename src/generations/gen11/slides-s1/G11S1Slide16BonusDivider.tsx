/**
 * Slide 16 — Módulo 05: Bonus IA Personalizada
 */
import { Bot } from 'lucide-react';
import { G11SectionDivider } from './Shell';
import { G11 } from './theme';

export function G11S1Slide16BonusDivider() {
  return (
    <G11SectionDivider
      moduleNumber="05"
      title="Bonus: IA Personalizada"
      subtitle="Un adelanto de lo que viene en la Sesión 2. Personaliza tu IA para que trabaje como tú piensas."
      icon={Bot}
      accent={G11.purple}
    />
  );
}
