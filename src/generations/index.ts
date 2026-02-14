// Sistema de Versionado de Presentaciones VDRC
// La resolución de slides y secciones es ahora 100% dinámica vía:
// - SLIDE_REGISTRY (src/slides/registry.ts) para componentes
// - Base de datos (slides.section_id + sections table) para secciones
// Este archivo mantiene solo exports mínimos para compatibilidad

import type { SlideSection } from './types';

// Tipos y constantes compartidas
export * from './types';

// Lista de generaciones disponibles (para referencia, ya no se usa para routing)
export const availableGenerations = [9, 10];
