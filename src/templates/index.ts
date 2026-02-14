// Plantillas de Presentación Independientes
// 4 clases del curso sin dependencias de generación

import * as Clase01 from './clase-01-higiene-digital';
import * as Clase02 from './clase-02-ia-productividad';
import * as Clase03 from './clase-03-comunicacion';
import * as Clase04 from './clase-04-desarrollo';

// Export as namespaces to avoid conflicts
export { Clase01, Clase02, Clase03, Clase04 };

// Export configs directly
export { clase01Config, clase01Slides } from './clase-01-higiene-digital';
export { clase02Config, clase02Slides } from './clase-02-ia-productividad';
export { clase03Config, clase03Slides } from './clase-03-comunicacion';
export { clase04Config, clase04Slides } from './clase-04-desarrollo';

// Tipos compartidos
export interface SlideTemplate {
  id: number;
  title: string;
  section: string;
  component: React.ComponentType;
}

export interface ClaseTemplate {
  numero: number;
  nombre: string;
  descripcion: string;
  stack: string[];
  slides: SlideTemplate[];
}

// All templates in one array
export const allTemplates = [
  { ...Clase01.clase01Config, slides: Clase01.clase01Slides },
  { ...Clase02.clase02Config, slides: Clase02.clase02Slides },
  { ...Clase03.clase03Config, slides: Clase03.clase03Slides },
  { ...Clase04.clase04Config, slides: Clase04.clase04Slides },
];
