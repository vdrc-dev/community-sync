import { Wrench } from 'lucide-react';
import { S3SlideDivider } from './S3SlideDivider';

export function S3SlideDivider02Herramientas() {
  return (
    <S3SlideDivider
      moduleNum="02"
      title="Herramientas de Creación"
      subtitle="Diseña, presenta, graba y automatiza con IA"
      icon={Wrench}
      accentHue={263}
      tools={[
        { label: 'Canva', href: 'https://www.canva.com' },
        { label: 'NotebookLM', href: 'https://notebooklm.google.com' },
        { label: 'Claude Code', href: 'https://claude.ai/download' },
        'Skills',
        { label: 'Gamma', href: 'https://gamma.app' },
        { label: 'Krea.ai', href: 'https://www.krea.ai' },
        'Automatización',
      ]}
    />
  );
}
