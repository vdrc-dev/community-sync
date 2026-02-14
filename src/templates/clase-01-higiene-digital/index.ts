// Clase 01: Higiene Digital
// Stack: ChatGPT, Bitwarden, Chrome, Edge

import { CoverSlide } from './slides/CoverSlide';
import { RoadmapSlide } from './slides/RoadmapSlide';
import { InboxZeroSlide } from './slides/InboxZeroSlide';
import { BrowsersSlide } from './slides/BrowsersSlide';
import { SecuritySlide } from './slides/SecuritySlide';
import { ClosingSlide } from './slides/ClosingSlide';

export const clase01Config = {
  numero: 1,
  nombre: 'Higiene Digital',
  descripcion: 'Cimientos digitales: email, navegadores, contraseñas y contexto IA',
  stack: ['ChatGPT', 'Bitwarden', 'Chrome', 'Edge'],
  temas: [
    { id: 'inbox', nombre: 'Inbox Zero', slides: [3] },
    { id: 'browsers', nombre: 'Navegadores', slides: [4] },
    { id: 'security', nombre: 'Seguridad', slides: [5] },
  ],
};

export const clase01Slides = [
  CoverSlide,
  RoadmapSlide,
  InboxZeroSlide,
  BrowsersSlide,
  SecuritySlide,
  ClosingSlide,
];

export { CoverSlide, RoadmapSlide, InboxZeroSlide, BrowsersSlide, SecuritySlide, ClosingSlide };
