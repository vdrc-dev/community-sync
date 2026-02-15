import { Wrench } from 'lucide-react';
import { S3SlideDivider } from './S3SlideDivider';

export function S3SlideDivider02Herramientas() {
  return (
    <S3SlideDivider
      moduleNum="02"
      title="Herramientas de Creación"
      subtitle="Sintetiza, presenta y automatiza con IA"
      icon={Wrench}
      accentHue={263}
      tools={['NotebookLM', 'Claude Code', 'Skills', 'Gamma', 'Napkin']}
    />
  );
}
