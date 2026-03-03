import { Mail } from 'lucide-react';
import { G11SectionDivider } from './Shell';
import { G11 } from './theme';

export function G11S1Slide05InboxZeroDivider() {
  return <G11SectionDivider moduleNumber="01" title="Inbox Zero" subtitle="Tu inbox es solo una mesa de trámites, no un almacén" icon={Mail} accent={G11.blue} />;
}
