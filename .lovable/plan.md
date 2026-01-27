
# Plan: Flujo Completo de Creación de Generaciones, Clases y Presentaciones

## Problema Identificado

El sistema de presentaciones tiene la lógica de backend pero **no hay interfaz para crear datos iniciales**:
1. La tabla `generations` está vacía
2. Sin generaciones, no hay clases
3. Sin clases, no se pueden crear presentaciones
4. El dashboard muestra "No hay presentaciones" sin opción de crear

## Solución Propuesta

Implementar un flujo de administración completo que permita:
1. **Crear nuevas generaciones** (GEN 09, GEN 10)
2. **Auto-generar las 4 clases** del taller con un clic
3. **Crear presentaciones** directamente desde el dashboard

---

## Componentes a Crear

### 1. GenerationManager.tsx
Panel de administración de generaciones con:
- Lista de generaciones existentes
- Botón "Nueva Generación" que abre modal
- Formulario: código (GEN-10), nombre, fechas inicio/fin, descripción
- Botón "Generar 4 clases" que crea automáticamente las sesiones del taller

### 2. CreateGenerationModal.tsx
Modal para crear nueva generación:
- Input: Código (ej: GEN-10)
- Input: Nombre (ej: "Febrero 2026")
- Date picker: Fecha inicio (3 Feb 2026)
- Checkbox: Marcar como activa
- Toggle: "Auto-crear las 4 clases" con fechas automáticas (cada martes)

### 3. ClassCreatorWizard.tsx
Wizard para crear las 4 clases de una generación:
- Muestra los 4 módulos predefinidos:
  1. Higiene Digital
  2. IA & Productividad  
  3. Comunicación Digital
  4. Desarrollo Personal
- Permite editar títulos/descripciones
- Calcula fechas automáticamente (martes consecutivos)

---

## Modificaciones al Dashboard de Presentaciones

### PresentationDashboard.tsx - Mejorar
Añadir:
- **Botón "Gestionar Generaciones"** que abre el panel
- **Lista de clases sin presentación** con botón (+) para crear
- **Indicador visual** de clases pendientes por generación

### AdminPresentations.tsx - Mejorar
Añadir:
- Vista alternativa cuando no hay datos: "Primero crea una generación"
- Integración con GenerationManager

---

## Hook Nuevo: useGenerations.tsx

```typescript
// Funciones:
- fetchGenerations() - lista todas
- createGeneration(data) - crea nueva
- updateGeneration(id, data) - actualiza
- deleteGeneration(id) - elimina
- createClassesForGeneration(generationId, dates[]) - crea las 4 clases
- getClassesWithoutPresentation(generationId) - clases sin presentación
```

---

## Datos Predefinidos (4 Módulos del Taller)

```typescript
const WORKSHOP_MODULES = [
  {
    number: 1,
    title: "Higiene Digital",
    description: "Fundamentos de productividad y organización digital"
  },
  {
    number: 2,
    title: "IA & Productividad",
    description: "Herramientas de inteligencia artificial para el trabajo"
  },
  {
    number: 3,
    title: "Comunicación Digital",
    description: "Escritura efectiva y comunicación profesional"
  },
  {
    number: 4,
    title: "Desarrollo Personal",
    description: "Crecimiento profesional y planificación de carrera"
  }
];
```

---

## Flujo de Usuario (Admin)

```text
1. Admin navega a /admin/presentations
   ↓
2. Ve mensaje "No hay generaciones creadas"
   ↓
3. Clic en "Crear Primera Generación"
   ↓
4. Modal: Ingresa "GEN-10", "Febrero 2026", fecha 3 Feb
   ↓
5. Marca "Auto-crear 4 clases" → calcula 3, 10, 17, 24 Feb
   ↓
6. Confirma → Se crean: 1 generación + 4 clases
   ↓
7. Dashboard muestra 4 clases SIN presentación
   ↓
8. Clic en (+) en clase → Crea presentación → Abre editor
   ↓
9. Admin diseña la presentación
```

---

## Archivos a Crear

```text
src/components/admin/GenerationManager.tsx      # Panel principal
src/components/admin/CreateGenerationModal.tsx  # Modal de creación
src/components/admin/ClassCreatorWizard.tsx     # Wizard para clases
src/components/admin/ClassWithoutPresentation.tsx # Lista de clases sin pres.
src/hooks/useGenerations.tsx                    # Hook de datos
```

## Archivos a Modificar

```text
src/pages/AdminPresentations.tsx     # Integrar GenerationManager
src/components/admin/PresentationDashboard.tsx  # Añadir botón crear
```

---

## Detalle Técnico: CreateGenerationModal

```tsx
// Al marcar "Auto-crear clases":
const calculateClassDates = (startDate: Date) => {
  // Encuentra el próximo martes si no es martes
  const firstTuesday = getNextTuesday(startDate);
  return [
    firstTuesday,                    // Clase 1
    addDays(firstTuesday, 7),        // Clase 2
    addDays(firstTuesday, 14),       // Clase 3
    addDays(firstTuesday, 21),       // Clase 4
  ];
};

// Crear generación + clases en una transacción:
const createWithClasses = async () => {
  // 1. Crear generación
  const gen = await supabase.from('generations').insert({...}).select().single();
  
  // 2. Crear las 4 clases
  const classesData = WORKSHOP_MODULES.map((mod, i) => ({
    generation_id: gen.id,
    class_number: mod.number,
    title: mod.title,
    description: mod.description,
    class_date: classDates[i],
  }));
  
  await supabase.from('classes').insert(classesData);
};
```

---

## Detalle Técnico: ClassWithoutPresentation

```tsx
// Query para obtener clases sin presentación:
const { data: classesWithoutPres } = useQuery({
  queryKey: ['classes-without-presentation', generationId],
  queryFn: async () => {
    // Obtener todas las clases de la generación
    const { data: classes } = await supabase
      .from('classes')
      .select('*, class_presentations(*)')
      .eq('generation_id', generationId);
    
    // Filtrar las que NO tienen presentación
    return classes?.filter(c => !c.class_presentations) || [];
  }
});

// UI: Lista con botón (+)
{classesWithoutPres.map(cls => (
  <div key={cls.id} className="flex items-center gap-2">
    <span>Clase {cls.class_number}: {cls.title}</span>
    <Button onClick={() => createPresentation(cls.id)}>
      <Plus /> Crear Presentación
    </Button>
  </div>
))}
```

---

## Vista Final del Dashboard

```text
┌─────────────────────────────────────────────────────────────┐
│ 📊 Diseño de Presentaciones                      [Admin]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Gestionar Generaciones]                                    │
│                                                             │
│ ┌─ GEN-10 (Febrero 2026) ─────────────────────────────────┐│
│ │                                                          ││
│ │  ⚠️ 4 clases sin presentación                           ││
│ │                                                          ││
│ │  [1] Higiene Digital - 3 Feb      [+ Crear]             ││
│ │  [2] IA & Productividad - 10 Feb  [+ Crear]             ││
│ │  [3] Comunicación - 17 Feb        [+ Crear]             ││
│ │  [4] Desarrollo - 24 Feb          [+ Crear]             ││
│ │                                                          ││
│ └──────────────────────────────────────────────────────────┘│
│                                                             │
│ ┌─ GEN-09 (Enero 2026) ───────────────────────────────────┐│
│ │  ✅ 4/4 presentaciones creadas                          ││
│ │  [Clase 1] ██████ Publicado                             ││
│ │  [Clase 2] ██████ Publicado                             ││
│ │  [Clase 3] ██████ Aprobado                              ││
│ │  [Clase 4] ████░░ En Revisión  ← HOY                    ││
│ └──────────────────────────────────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Resumen de Implementación

| Prioridad | Componente | Descripción |
|-----------|------------|-------------|
| 1 | useGenerations.tsx | Hook con CRUD de generaciones y clases |
| 2 | CreateGenerationModal.tsx | Modal para crear gen + auto-clases |
| 3 | GenerationManager.tsx | Panel de gestión integrado |
| 4 | PresentationDashboard.tsx | Mostrar clases sin presentación |
| 5 | AdminPresentations.tsx | Estado vacío mejorado |
