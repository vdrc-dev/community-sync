
# Plan de Mejora de Practicidad, Utilidad e Intuitividad

## Resumen Ejecutivo
Este plan optimiza la experiencia de usuario en las funciones principales del portal, enfocándose en reducir fricción, aumentar la claridad, y hacer las herramientas más actionables e intuitivas.

---

## 1. Laboratorio de IA (Playground)

### Mejoras al Prompt Playground

**Estado actual:** El playground requiere escribir prompts manualmente y los templates no muestran preview de resultados.

**Mejoras propuestas:**

- **Auto-completado inteligente de variables:** Cuando el usuario carga un template con `{{VARIABLE}}`, mostrar inputs flotantes directamente en el textarea con highlight visual
- **Comparador de modelos side-by-side:** Añadir opción para ejecutar el mismo prompt en 2 modelos simultáneamente y comparar respuestas
- **Botón "Mejorar mi prompt":** Un solo clic para enviar el prompt actual al generador y recibir una versión optimizada
- **Favoritos de prompts ejecutados:** Marcar respuestas específicas como favoritas desde el historial
- **Indicador de tokens estimados:** Mostrar contador de tokens antes de ejecutar

### Mejoras al Generador de Prompts

- **Wizard paso a paso:** Convertir el formulario en un wizard guiado de 3 pasos con progreso visual
- **Ejemplos dinámicos:** Mostrar mini-ejemplos del tipo de prompt que se generará según las opciones seleccionadas
- **"Usar en Playground":** Botón directo para enviar el prompt generado al Playground y probarlo inmediatamente
- **Historial de prompts generados:** Persistir los últimos 10 prompts generados para el usuario

---

## 2. Calculadora ROI

**Estado actual:** Requiere llenar múltiples campos manualmente para cada automatización.

**Mejoras propuestas:**

- **Quick-add simplificado:** Añadir botón "Agregar rápido" con solo 3 campos esenciales (nombre, tiempo ahorrado, frecuencia)
- **Presets de industria:** Templates predefinidos por rol (Marketer, Developer, Manager, etc.)
- **Meta mensual de ahorro:** Permitir al usuario definir una meta y mostrar progreso visual hacia ella
- **Exportar resumen:** Botón para descargar PDF o copiar resumen en texto para compartir logros
- **Comparación mes a mes:** Gráfico que muestre evolución del ahorro vs mes anterior

---

## 3. Workflows Interactivos

**Estado actual:** Los pasos se ejecutan individualmente sin contexto entre ellos.

**Mejoras propuestas:**

- **Flujo continuo:** Opción para que el output de un paso se use como input del siguiente automáticamente
- **Variables globales del workflow:** Definir variables una vez al inicio que se propaguen a todos los pasos
- **Modo "ejecutar todo":** Botón para ejecutar todos los pasos en secuencia
- **Indicador de progreso persistente:** Guardar en qué paso quedó el usuario y permitir continuar después
- **Sugerencias de siguiente workflow:** Al completar, recomendar workflows relacionados

---

## 4. Catálogo de Herramientas

**Estado actual:** El tracking es básico y no hay guía sobre cuándo usar cada herramienta.

**Mejoras propuestas:**

- **Comparador de herramientas:** Seleccionar 2-3 herramientas y ver tabla comparativa (pricing, features, casos de uso)
- **"Para qué es mejor":** Tags de casos de uso específicos (mejor para: emails, código, investigación)
- **Filtro por mi stack:** Mostrar solo herramientas que complementen las que ya uso
- **Notas y tips de la comunidad:** Sección de tips rápidos de otros usuarios sobre cada herramienta
- **Integración con ROI:** Sugerir herramientas basadas en las automatizaciones del usuario

---

## 5. Sistema de Bookmarks

**Estado actual:** Permite guardar con tags pero no hay organización visual.

**Mejoras propuestas:**

- **Colecciones/Carpetas:** Agrupar bookmarks en colecciones temáticas (ej: "Prompts de Marketing", "Tools de Código")
- **Vista Kanban:** Opción de ver bookmarks como board con columnas personalizables
- **Recordatorios:** "Revisar este recurso en 7 días"
- **Estadísticas de uso:** Mostrar cuántas veces se ha accedido a cada bookmark
- **Quick search global:** Buscar en todos los bookmarks desde CMD+K

---

## 6. Perfil y Gamificación

**Estado actual:** El perfil muestra stats básicos sin contexto motivacional.

**Mejoras propuestas:**

- **Dashboard personalizado:** Resumen visual de actividad semanal, racha, y próximos desafíos
- **Badges con progreso:** Mostrar badges bloqueados con % de progreso hacia desbloquearlos
- **Metas semanales personalizables:** El usuario define sus propios objetivos (ej: "Probar 3 workflows")
- **Sharing de logros:** Botón para compartir badges y stats en redes sociales
- **Historial de actividad:** Timeline de las últimas acciones del usuario

---

## 7. Mejoras Transversales de UX

### Onboarding Inteligente

- **Tour guiado para nuevos usuarios:** Highlight interactivo de las funciones principales
- **Checklist de inicio:** "Completa estas 5 acciones para desbloquear tu primera badge"
- **Tooltips contextuales:** Tips que aparecen la primera vez que se usa cada función

### Atajos y Navegación

- **Mejoras al CMD+K:** Añadir acciones rápidas como "Ejecutar último prompt", "Ir a mi workflow en progreso"
- **Breadcrumbs en páginas profundas:** Mejor orientación en workflows y generaciones
- **Historial de navegación reciente:** Quick access a los últimos 5 recursos visitados

### Feedback Visual

- **Loading states consistentes:** Skeletons animados en lugar de spinners genéricos
- **Confirmaciones con undo:** "Bookmark eliminado" con opción de deshacer por 5 segundos
- **Micro-celebraciones:** Confetti sutil al completar workflows o alcanzar metas

---

## Implementación Técnica

### Archivos a Crear
- `src/components/playground/ModelComparator.tsx` - Comparador de modelos side-by-side
- `src/components/playground/PromptEnhancer.tsx` - Botón de mejora automática
- `src/components/roi/QuickAddAutomation.tsx` - Modal de agregado rápido
- `src/components/roi/SavingsGoal.tsx` - Meta de ahorro mensual
- `src/components/tools/ToolComparator.tsx` - Comparador de herramientas (ya existe, mejorar)
- `src/components/bookmarks/BookmarkCollections.tsx` - Sistema de colecciones
- `src/components/onboarding/OnboardingTour.tsx` - Tour guiado inicial
- `src/components/common/UndoToast.tsx` - Toast con opción de deshacer

### Archivos a Modificar
- `src/components/playground/PromptPlayground.tsx` - Añadir token counter, favoritos, mejora automática
- `src/components/playground/PromptGenerator.tsx` - Wizard steps, historial, botón "Usar en Playground"
- `src/components/roi/ROICalculator.tsx` - Quick-add, presets, metas, export
- `src/components/workflows/WorkflowPromptExecutor.tsx` - Flujo continuo, variables globales
- `src/pages/Workflows.tsx` - Modo "ejecutar todo", sugerencias
- `src/pages/Tools.tsx` - Comparador, filtros inteligentes
- `src/pages/Bookmarks.tsx` - Colecciones, vista Kanban
- `src/pages/Profile.tsx` - Dashboard, badges con progreso, metas
- `src/components/command/CommandPalette.tsx` - Nuevas acciones rápidas
- `src/hooks/usePromptPlayground.tsx` - Historial persistido, favoritos

### Nuevas Tablas de Base de Datos
- `prompt_favorites` - Respuestas favoritas del playground
- `bookmark_collections` - Colecciones de bookmarks
- `user_goals` - Metas personalizadas del usuario
- `prompt_generation_history` - Historial de prompts generados

---

## Priorización Recomendada

### Fase 1 (Alto Impacto, Baja Complejidad)
1. Quick-add en ROI Calculator
2. Botón "Usar en Playground" en generador
3. Token counter en Playground
4. Tour de onboarding básico

### Fase 2 (Alto Impacto, Media Complejidad)
5. Comparador de modelos side-by-side
6. Colecciones de bookmarks
7. Variables globales en workflows
8. Dashboard de perfil mejorado

### Fase 3 (Diferenciadores)
9. Comparador de herramientas
10. Flujo continuo en workflows
11. Metas personalizables
12. Sistema de sharing de logros
