
# Plan de Mejora de Practicidad Contextualizada al Modelo VDRC

## Contexto del Negocio

El taller VDRC opera con un modelo iterativo:
- **4 Módulos Fijos**: Higiene Digital, IA & Productividad, Comunicación, Desarrollo
- **10 Generaciones** hasta la fecha (116+ profesionales transformados)
- **Mejora Continua**: Cada generación perfecciona el contenido de la anterior
- **Fechas GEN 10**: Martes 3, 10, 17, 24 de Febrero 2026

---

## 1. Sistema de Módulos Base (Session Templates)

### Problema Actual
Cada generación requiere crear las 4 clases desde cero en la base de datos, duplicando trabajo y perdiendo la trazabilidad de mejoras.

### Solución Propuesta
Crear un sistema de "Módulos Base" (session_templates) que define la estructura canónica de las 4 sesiones, permitiendo:
- Heredar contenido base al crear una nueva generación
- Trackear mejoras entre generaciones
- Comparar cómo evolucionó cada módulo

### Cambios en Base de Datos

```text
Nueva tabla: session_templates
----------------------------------------
| id          | UUID (PK)               |
| module_num  | INTEGER (1-4)           |
| title       | TEXT                    |
| description | TEXT                    |
| tools_stack | TEXT[] (herramientas)   |
| base_outline| TEXT (markdown)         |
| updated_at  | TIMESTAMP               |
----------------------------------------

Nueva columna en classes:
+ session_template_id (FK -> session_templates)
+ improvements_notes (TEXT) - qué mejoró vs versión anterior
```

### UI: Panel de Módulos Base
Nuevo componente `SessionTemplatesManager.tsx` accesible desde admin que permite:
- Ver/editar los 4 módulos base
- Ver historial de cómo evolucionó cada módulo por generación
- "Crear Nueva Generación" con un clic (genera las 4 clases automáticamente)

---

## 2. Dashboard de Generación Activa

### Problema Actual
No hay una vista rápida del estado actual del taller en curso.

### Solución Propuesta
Widget prominente en el Home que muestra:
- **Generación activa** (GEN 09) con cuenta regresiva a próxima clase
- **Próxima generación** (GEN 10) con cuenta regresiva al inicio
- **Módulo actual** (ej: "Clase 4: Desarrollo - HOY 19:30")
- **Acceso rápido** a la grabación de la última clase

### Componentes Nuevos

```text
src/components/dashboard/
├── ActiveGenerationWidget.tsx    # Widget hero para Home
├── NextClassCountdown.tsx        # Cuenta regresiva a próxima sesión
├── GenerationTimeline.tsx        # Timeline visual de las 4 semanas
└── QuickAccessPanel.tsx          # Links rápidos a recursos recientes
```

---

## 3. Comparador de Evolución entre Generaciones

### Problema Actual
No hay forma de ver cómo mejoró un módulo específico entre generaciones.

### Solución Propuesta
Vista de comparación side-by-side que muestra:
- Módulo X en GEN 08 vs GEN 09
- Diferencias en outline, herramientas, duración
- Notas de mejora documentadas
- Feedback agregado de participantes

### UI: Evolution Tracker
Nuevo componente `ModuleEvolutionTracker.tsx`:
- Selector de módulo (1-4)
- Vista diff entre generaciones seleccionadas
- Gráfico de línea de tiempo de cambios

---

## 4. Sistema de Feedback Post-Clase Simplificado

### Problema Actual
No hay un mecanismo para capturar feedback de participantes que alimente mejoras.

### Solución Propuesta
Modal de feedback que aparece:
- 24 horas después de cada clase (basado en `class_date`)
- 3 preguntas simples con rating 1-5 + comentario opcional
- Resultados agregados visibles en admin para informar mejoras

### Cambios en Base de Datos

```text
Nueva tabla: class_feedback
----------------------------------------
| id           | UUID (PK)              |
| class_id     | UUID (FK -> classes)   |
| user_id      | UUID                   |
| clarity_rating | INTEGER (1-5)        |
| usefulness_rating | INTEGER (1-5)     |
| pace_rating  | INTEGER (1-5)          |
| comment      | TEXT (nullable)        |
| created_at   | TIMESTAMP              |
----------------------------------------
```

### Componentes
- `ClassFeedbackModal.tsx` - Modal de 3 preguntas
- `FeedbackReminder.tsx` - Banner sutil que recuerda dar feedback
- `FeedbackSummary.tsx` - Vista admin con ratings agregados

---

## 5. Calendario Inteligente con Recordatorios

### Problema Actual
El calendario existe pero no tiene integración con recordatorios ni contexto de generación.

### Solución Propuesta
Mejorar `CalendarPage.tsx` para mostrar:
- Vista mes con las 4 clases de GEN 10 marcadas
- "Agregar a mi calendario" (Google Calendar / iCal)
- Recordatorios automáticos 1 día antes y 1 hora antes
- Estado de la clase (próxima, completada, perdida)

### Mejoras al Componente
- Integración con notifications table para recordatorios
- Botón "Exportar a Google Calendar" con formato ICS
- Indicadores visuales de progreso personal

---

## 6. Onboarding Contextualizado por Generación

### Problema Actual
El onboarding es genérico, no considera si el usuario es de GEN 09, GEN 10 o veterano.

### Solución Propuesta
Flujo de onboarding adaptativo:
- **Nuevos (GEN 10)**: Tour completo + checklist "Prepárate para el taller"
- **En curso (GEN 09)**: Highlight de nuevas features + "Continúa donde quedaste"
- **Alumni (GEN 01-08)**: "Bienvenido de vuelta" + acceso rápido a recursos

### Cambios en Base de Datos

```text
Nueva columna en profiles:
+ primary_generation_id (FK -> generations) - generación principal del usuario
+ onboarding_completed_at (TIMESTAMP)
```

### Lógica de Detección
- Al registrarse, preguntar "¿De qué generación eres?"
- O inferir automáticamente si se registra durante GEN 10

---

## 7. Quick Actions Mejoradas para Flujo Diario

### Problema Actual
CMD+K tiene acciones limitadas, no hay atajos contextuales.

### Solución Propuesta
Expandir CommandPalette con:
- "Ir a mi clase actual" - navega a la clase en curso de la generación activa
- "Ver grabación de hoy" - abre la grabación más reciente
- "Dar feedback de última clase" - abre modal de feedback
- "Ver mi progreso" - muestra % de completitud
- "Descargar recursos de la semana" - exporta links de Drive

### Modificaciones
Actualizar `CommandPalette.tsx` con nuevos comandos contextuales basados en:
- Generación del usuario
- Clase actual según fecha
- Estado de completitud

---

## 8. Panel de Preparación de Clase (Admin)

### Problema Actual
El sistema de presentaciones existe pero no tiene checklist de preparación.

### Solución Propuesta
Añadir a `PresentationEditor.tsx`:
- Checklist de "Listo para clase" (enlaces verificados, demos probadas, etc.)
- Timer de práctica (ensayo de la presentación)
- Vista de "Lo que cambió desde la última vez" (diff con generación anterior)

### Nuevos Campos

```text
Nueva columna en class_presentations:
+ preparation_checklist (JSONB) - items de checklist marcados
+ last_rehearsed_at (TIMESTAMP) - cuándo se ensayó por última vez
+ previous_version_id (UUID, FK) - referencia a presentación de gen anterior
```

---

## Implementación por Fases

### Fase 1 (Esta semana - Antes de GEN 10)
1. Dashboard de Generación Activa con countdown
2. Calendario mejorado con "Agregar a Google Calendar"
3. Quick Actions en CMD+K contextuales

### Fase 2 (Durante GEN 10 - Semanas 1-2)
4. Sistema de Feedback Post-Clase
5. Onboarding contextualizado por generación
6. Panel de Preparación de Clase

### Fase 3 (Post GEN 10)
7. Sistema de Módulos Base (session_templates)
8. Comparador de Evolución entre Generaciones

---

## Resumen de Archivos

### Archivos a Crear
- `src/components/dashboard/ActiveGenerationWidget.tsx`
- `src/components/dashboard/NextClassCountdown.tsx`
- `src/components/dashboard/GenerationTimeline.tsx`
- `src/components/feedback/ClassFeedbackModal.tsx`
- `src/components/feedback/FeedbackReminder.tsx`
- `src/components/admin/SessionTemplatesManager.tsx`
- `src/components/admin/ModuleEvolutionTracker.tsx`
- `src/components/calendar/CalendarExport.tsx`

### Archivos a Modificar
- `src/pages/Index.tsx` - Agregar ActiveGenerationWidget
- `src/pages/CalendarPage.tsx` - Integrar exportación y recordatorios
- `src/components/command/CommandPalette.tsx` - Nuevos comandos contextuales
- `src/components/admin/PresentationEditor.tsx` - Checklist de preparación
- `src/components/onboarding/OnboardingTour.tsx` - Flujo adaptativo

### Nuevas Tablas de Base de Datos
- `session_templates` - Módulos base del taller
- `class_feedback` - Feedback de participantes

### Modificaciones a Tablas Existentes
- `classes`: + session_template_id, + improvements_notes
- `class_presentations`: + preparation_checklist, + last_rehearsed_at
- `profiles`: + primary_generation_id, + onboarding_completed_at
