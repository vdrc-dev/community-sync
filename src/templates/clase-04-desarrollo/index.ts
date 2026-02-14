// Clase 04: Desarrollo
// Stack: Lovable, Supabase, Cursor

import { CoverSlide } from './slides/CoverSlide';
import { ContentSlide } from './slides/ContentSlide';
import { ClosingSlide } from './slides/ClosingSlide';

export const clase04Config = {
  numero: 4,
  nombre: 'Desarrollo',
  descripcion: 'Creación de aplicaciones web con IA y herramientas no-code',
  stack: ['Lovable', 'Supabase', 'Cursor'],
  temas: [
    { id: 'nocode', nombre: 'No-Code con IA', slides: [2] },
    { id: 'backend', nombre: 'Backend Simplificado', slides: [3] },
  ],
};

export const clase04Slides = [
  CoverSlide,
  ContentSlide,
  ClosingSlide,
];

export { CoverSlide, ContentSlide, ClosingSlide };
