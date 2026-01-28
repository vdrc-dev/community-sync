
# Plan: Identificar Presentaciones con su Generación

## Problema Actual

Actualmente el visor de presentaciones (`/presentations/:id`) muestra los slides pero **no indica a qué generación ni clase pertenece**. Esto genera confusión cuando hay múltiples generaciones con presentaciones similares.

## Solución

Añadir contexto de generación en múltiples puntos del sistema:

---

## 1. Mostrar Información de Generación en el Visor

### Modificar PresentationView.tsx

Cargar información completa de la presentación incluyendo la clase y generación:

```typescript
// Antes: solo carga slides
.select('slides, outline, key_points')

// Después: carga relación completa
.select(`
  slides, outline, key_points,
  classes (
    id, title, class_number,
    generations (id, name, code)
  )
`)
```

### Modificar PresentationViewer.tsx

Añadir props para mostrar título con contexto:
- `title`: "Clase 1: Higiene Digital"
- `subtitle`: "GEN-10 • Febrero 2026"

Mostrar un header informativo en la barra de controles:

```text
┌────────────────────────────────────────────────────────────┐
│ [GEN-10] Clase 1: Higiene Digital     1/17  [<] [>] [G][S] │
└────────────────────────────────────────────────────────────┘
```

---

## 2. Mostrar Badge de Generación en el Dashboard

### Modificar GenerationManager.tsx

Añadir visual claro de qué generación está seleccionada con código de colores:
- GEN-09: Un color
- GEN-10: Otro color

Cada tarjeta de clase/presentación mostrará:
```text
┌─────────────────────────────────────┐
│ [GEN-10]  Clase 1: Higiene Digital  │
│ ████████░░ En revisión              │
│ Fecha: 3 Feb 2026                   │
└─────────────────────────────────────┘
```

---

## 3. Acceso Público a Presentaciones Publicadas

### Añadir a GenerationDetail.tsx

Cuando una presentación está en estado "published", los participantes (no solo admins) pueden verla:

```typescript
{/* Para participantes: ver presentación publicada */}
{classPresentation?.status === 'published' && (
  <Link to={`/presentations/${classPresentation.id}`}>
    <Button variant="outline">
      <Play /> Ver Presentación
    </Button>
  </Link>
)}
```

---

## 4. Nueva Ruta con Contexto de Generación

Añadir rutas alternativas más descriptivas:

```typescript
// Rutas adicionales (opcionales, más SEO-friendly)
/generations/:code/presentations/:classNumber
// Ejemplo: /generations/GEN-10/presentations/1
```

Esto permite acceder directamente a "la presentación de la clase 1 de GEN-10".

---

## Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `PresentationView.tsx` | Cargar info de clase/generación, pasar a Viewer |
| `PresentationViewer.tsx` | Aceptar `title`, `generationCode` como props |
| `SlideControls.tsx` | Mostrar título de presentación junto a controles |
| `GenerationDetail.tsx` | Botón "Ver Presentación" para participantes |
| `App.tsx` | (Opcional) Nueva ruta con código de generación |

---

## Detalle Técnico: PresentationView.tsx Mejorado

```typescript
const fetchPresentation = async () => {
  const { data, error } = await supabase
    .from('class_presentations')
    .select(`
      slides, 
      outline, 
      key_points,
      status,
      classes (
        id, 
        title, 
        class_number,
        generations (
          id, 
          name, 
          code
        )
      )
    `)
    .eq('id', id)
    .single();

  // Construir título descriptivo
  const title = `Clase ${data.classes.class_number}: ${data.classes.title}`;
  const subtitle = `${data.classes.generations.code} • ${data.classes.generations.name}`;
  
  setMetadata({ title, subtitle, generationCode: data.classes.generations.code });
  setSlides(data.slides);
};

return (
  <PresentationViewer
    slides={slides}
    title={metadata.title}
    subtitle={metadata.subtitle}
    onExit={handleExit}
  />
);
```

---

## Detalle Técnico: SlideControls.tsx con Título

```typescript
interface SlideControlsProps {
  // ... props existentes
  title?: string;
  generationCode?: string;
}

// En el JSX, añadir sección izquierda:
<div className="flex items-center gap-3">
  {generationCode && (
    <Badge variant="outline" className="text-primary border-primary">
      {generationCode}
    </Badge>
  )}
  {title && (
    <span className="text-sm font-medium text-muted-foreground truncate max-w-[200px]">
      {title}
    </span>
  )}
</div>
```

---

## Vista Final del Visor

```text
┌────────────────────────────────────────────────────────────────┐
│ [GEN-10] Clase 1: Higiene Digital   1/17  [<][>] [G][S][F][X] │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    [CONTENIDO DEL SLIDE]                        │
│                                                                 │
│                                                                 │
├────────────────────────────────────────────────────────────────┤
│                    [●][○][○][○][○][○][○]                       │
└────────────────────────────────────────────────────────────────┘
```

---

## Beneficios

1. **Claridad**: Siempre se sabe qué presentación se está viendo
2. **Navegación**: Los participantes pueden acceder a presentaciones publicadas desde su generación
3. **Contexto**: El presentador ve claramente qué clase está presentando
4. **Organización**: El dashboard muestra agrupación clara por generación
