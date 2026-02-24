import { Plug } from 'lucide-react';
import { S3SlideDivider } from './S3SlideDivider';

export function S3SlideDivider03Aplicacion() {
  return (
    <S3SlideDivider
      moduleNum="03"
      title="Conexiones y Aplicación"
      subtitle="Conecta datos reales y crea productos de verdad"
      icon={Plug}
      accentHue={38}
      accentSat={85}
      tools={[
        'Automatización',
        'CRM + MCP',
        'MCP vs API',
        { label: 'Cursor', href: 'https://cursor.com' },
      ]}
    />
  );
}
