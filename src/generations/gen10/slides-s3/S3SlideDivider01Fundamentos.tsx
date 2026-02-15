import { Palette } from 'lucide-react';
import { S3SlideDivider } from './S3SlideDivider';

export function S3SlideDivider01Fundamentos() {
  return (
    <S3SlideDivider
      moduleNum="01"
      title="Fundamentos Visuales"
      subtitle="Colores, tipografía y diseño con propósito"
      icon={Palette}
      accentHue={330}
      tools={['Coolors.co', 'Fontjoy', 'Canvas', 'VibeCoding']}
    />
  );
}
