// Clase 03: Comunicación
// Stack: Gamma, Manus, Cursor

import { CoverSlide } from './slides/CoverSlide';
import { ContentSlide } from './slides/ContentSlide';
import { ClosingSlide } from './slides/ClosingSlide';

export const clase03Config = {
  numero: 3,
  nombre: 'Comunicación',
  descripcion: 'Presentaciones, documentos y comunicación asistida por IA',
  stack: ['Gamma', 'Manus', 'Cursor'],
  temas: [
    { id: 'presentations', nombre: 'Presentaciones con IA', slides: [2] },
    { id: 'documents', nombre: 'Documentos Inteligentes', slides: [3] },
  ],
};

export const clase03Slides = [
  CoverSlide,
  ContentSlide,
  ClosingSlide,
];

export { CoverSlide, ContentSlide, ClosingSlide };
