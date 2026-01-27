
# Plan: Sistema de Diseño de Presentaciones por Clase (Admin)

## Resumen
Crear una sección interna exclusiva para administradores donde el equipo pueda diseñar, planificar y colaborar en las presentaciones de cada clase. Esta herramienta servirá como "backstage" para preparar el contenido antes de publicarlo a los estudiantes.

---

## Estructura de la Funcionalidad

### 1. Nueva Tabla en Base de Datos: `class_presentations`

Almacenará el contenido de diseño de cada presentación:

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | uuid | Identificador unico |
| class_id | uuid (FK) | Referencia a la clase |
| status | enum | `draft`, `review`, `approved`, `published` |
| outline | text | Estructura/esquema de la presentacion (Markdown) |
| key_points | text[] | Puntos clave a cubrir |
| talking_points | jsonb | Notas del presentador por seccion |
| resources_needed | text[] | Recursos/demos/herramientas necesarias |
| duration_estimate | integer | Duracion estimada en minutos |
| assigned_to | text | Quien prepara esta presentacion |
| review_notes | text | Comentarios de revision del equipo |
| created_at | timestamp | Fecha de creacion |
| updated_at | timestamp | Ultima actualizacion |
| created_by | uuid | Usuario que creo el draft |

**RLS:** Solo usuarios con rol `admin` pueden leer/escribir.

---

### 2. Nueva Pagina: `/admin/presentations`

**Ruta protegida** que solo muestra contenido a usuarios admin. Incluira:

**Vista Principal (Dashboard):**
- Grid de todas las clases agrupadas por generacion
- Indicadores visuales de estado (draft/review/approved/published)
- Filtros por generacion y estado
- Barra de progreso global (ej: "12/18 clases listas")

**Vista de Clase Individual:**
- Editor de outline con soporte Markdown
- Seccion de "Puntos Clave" (lista editable con drag-and-drop)
- Seccion de "Talking Points" por cada slide/seccion
- Checklist de recursos necesarios
- Campo de duracion estimada
- Asignacion de responsable
- Area de comentarios/revision del equipo
- Historial de cambios

---

### 3. Componentes a Crear

```text
src/
  pages/
    AdminPresentations.tsx          -- Pagina principal admin
  components/
    admin/
      PresentationDashboard.tsx     -- Vista general de todas las clases
      PresentationEditor.tsx        -- Editor completo de presentacion
      PresentationStatusBadge.tsx   -- Indicador visual de estado
      PresentationOutlineEditor.tsx -- Editor Markdown para outline
      TalkingPointsEditor.tsx       -- Editor de notas del presentador
      ResourceChecklist.tsx         -- Checklist de recursos
      ReviewCommentsSection.tsx     -- Seccion de comentarios del equipo
  hooks/
    usePresentations.tsx            -- CRUD y logica de presentaciones
```

---

### 4. Flujo de Trabajo del Equipo

```text
  +----------+      +--------+      +----------+      +-----------+
  |  DRAFT   | ---> | REVIEW | ---> | APPROVED | ---> | PUBLISHED |
  +----------+      +--------+      +----------+      +-----------+
       |                |                |
       v                v                v
   Creacion        Feedback         Listo para
   inicial         del equipo       la clase
```

- **Draft:** Borrador inicial, solo visible para el creador
- **Review:** Listo para revision, visible para todo el equipo admin
- **Approved:** Aprobado, listo para usar en clase
- **Published:** Ya se uso/presento (archivo historico)

---

### 5. Integracion con Clases Existentes

La nueva seccion se vinculara con la tabla `classes` existente:
- Desde `GenerationDetail.tsx`, los admins veran un boton "Disenar Presentacion" en cada clase
- Desde el dashboard de presentaciones, podran navegar directamente a la clase relacionada

---

## Detalles Tecnicos

### Migracion SQL

```sql
-- Crear tabla de presentaciones
CREATE TABLE public.class_presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'published')),
  outline TEXT DEFAULT '',
  key_points TEXT[] DEFAULT '{}',
  talking_points JSONB DEFAULT '[]',
  resources_needed TEXT[] DEFAULT '{}',
  duration_estimate INTEGER DEFAULT 60,
  assigned_to TEXT,
  review_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  UNIQUE(class_id) -- Una presentacion por clase
);

-- RLS: Solo admins
ALTER TABLE public.class_presentations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage presentations"
  ON public.class_presentations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Trigger para updated_at
CREATE TRIGGER update_class_presentations_updated_at
  BEFORE UPDATE ON public.class_presentations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Hook `usePresentations.tsx`

```typescript
// Operaciones principales:
- fetchAllPresentations()     // Lista todas las presentaciones
- fetchPresentation(classId)  // Obtiene presentacion de una clase
- createPresentation(classId) // Crea draft inicial
- updatePresentation(id, data) // Actualiza campos
- updateStatus(id, status)    // Cambia estado
- deletePresentation(id)      // Elimina (soft delete opcional)
```

### Pagina `AdminPresentations.tsx`

- Verificacion de `isAdmin` al inicio
- Redirect a `/` si no es admin
- Layout con sidebar de generaciones
- Area principal con grid de clases y sus estados

### Editor de Presentacion

- Textarea con preview Markdown para el outline
- Inputs dinamicos para key points (agregar/eliminar/reordenar)
- Editor JSON visual para talking points
- Checkboxes para recursos
- Select para asignar responsable (lista de admins)
- Textarea para review notes

---

## Archivos a Crear/Modificar

| Archivo | Accion |
|---------|--------|
| `supabase/migrations/xxx_class_presentations.sql` | Crear |
| `src/pages/AdminPresentations.tsx` | Crear |
| `src/components/admin/PresentationDashboard.tsx` | Crear |
| `src/components/admin/PresentationEditor.tsx` | Crear |
| `src/components/admin/PresentationStatusBadge.tsx` | Crear |
| `src/hooks/usePresentations.tsx` | Crear |
| `src/App.tsx` | Modificar (agregar ruta) |
| `src/components/layout/Header.tsx` | Modificar (link admin) |
| `src/pages/GenerationDetail.tsx` | Modificar (boton para admins) |

---

## UI/UX

- Estilo consistente con el resto del portal (glassmorphism, animaciones framer-motion)
- Indicadores de estado con colores distintivos:
  - Draft: gris
  - Review: amarillo/naranja
  - Approved: verde
  - Published: azul
- Auto-guardado cada 3 segundos mientras se edita
- Toast de confirmacion al cambiar estados
- Vista previa del outline en Markdown renderizado
