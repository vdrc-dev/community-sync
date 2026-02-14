import { GenerationConfig, SlideData } from '../types';

export const GEN_CONFIG: GenerationConfig = {
  name: 'Taller Intensivo de Productividad Digital',
  generation: 9,
  week: 4,
  totalWeeks: 4,
  module: 'DESARROLLO',
  date: '27 de Enero 2026',
  instructor: 'Vicente Donoso R.',
  stack: ['Lovable', 'Supabase', 'Cursor'],
  previousWeeks: [
    { week: 1, name: 'Higiene Digital', stack: ['ChatGPT', 'Bitwarden', 'Chrome', 'Edge'] },
    { week: 2, name: 'IA & Productividad', stack: ['Claude', 'Gemini', 'Perplexity', 'NotebookLM'] },
    { week: 3, name: 'Comunicación', stack: ['Gamma', 'Manus', 'Cursor'] },
  ],
};

export const SLIDES_DATA: SlideData[] = [
  { id: 1, section: 'Contexto', sectionNumber: 1, title: 'De Consumidor a Creador', storyline: 'En 90 minutos, tu primera app funcionando con datos reales.', componentName: 'Slide01Cover' },
  { id: 2, section: 'Contexto', sectionNumber: 1, title: 'Conectando Todo', storyline: '3 semanas de preparación te trajeron hasta aquí. Hoy conectamos todo.', componentName: 'Slide02Context' },
  { id: 3, section: 'Fundamentos', sectionNumber: 2, title: 'Front-End: La Tienda', storyline: 'Lo que ven tus usuarios. La fachada de tu negocio digital.', componentName: 'Slide03FrontEnd' },
  { id: 4, section: 'Fundamentos', sectionNumber: 2, title: 'Back-End: La Bodega', storyline: 'Donde viven tus datos. Invisible pero esencial.', componentName: 'Slide04BackEnd' },
  { id: 5, section: 'Fundamentos', sectionNumber: 2, title: 'CRUD: El Lenguaje Universal', storyline: 'Las 4 operaciones que toda app necesita. Más potente que Excel.', componentName: 'Slide05CRUD' },
  { id: 6, section: 'Stack', sectionNumber: 3, title: 'Gemini: Diseña Gratis', storyline: 'Tu copiloto de diseño. Ahorra tokens, itera rápido.', componentName: 'Slide06Gemini' },
  { id: 7, section: 'Stack', sectionNumber: 3, title: 'Lovable: La Magia', storyline: 'De prompt a app en minutos. Backend incluido.', componentName: 'Slide07Lovable' },
  { id: 8, section: 'Stack', sectionNumber: 3, title: 'Cursor + Claude', storyline: 'Para cuando necesitas el 80% extra de control.', componentName: 'Slide08CursorClaude' },
  { id: 9, section: 'Stack', sectionNumber: 3, title: 'GitHub: Tu Seguro', storyline: 'Máquina del tiempo para tu código. Deshaz cualquier error.', componentName: 'Slide09GitHub' },
  { id: 10, section: 'Aplicación', sectionNumber: 4, title: 'El Flujo Completo', storyline: 'Gemini → Lovable → Supabase → GitHub → Cursor. 90 minutos.', componentName: 'Slide10FlowDiagram' },
  { id: 11, section: 'Aplicación', sectionNumber: 4, title: 'Tu Guía de Decisión', storyline: 'Cada herramienta tiene su momento. Esta es la guía.', componentName: 'Slide11WhenToUse' },
  { id: 12, section: 'Cierre', sectionNumber: 5, title: 'Tu Turno', storyline: 'El poder está en tus manos. Gen 09, es hora de crear.', componentName: 'Slide12NextSteps' },
];
