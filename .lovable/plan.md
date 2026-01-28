
# Plan: Integración del Visor Interactivo de Presentaciones

## Objetivo

Integrar un visor de presentaciones interactivo al portal VDRC, permitiendo que los administradores puedan crear presentaciones en el editor actual y luego visualizarlas/presentarlas en modo slides con todas las funcionalidades del proyecto referenciado.

---

## Funcionalidades a Implementar

Del visor compartido, se integrarán:

1. **Navegacion de Slides**: Flechas, teclado, swipe tactil
2. **Contador**: "Slide 3 de 17"
3. **Vista Cuadricula**: Ver todas las slides en miniatura
4. **Pantalla Completa**: Tecla F, modo inmersivo
5. **Exportar PDF**: Descarga de la presentacion completa
6. **Barra de Progreso**: Indicadores visuales del avance
7. **Modo Presentador**: Vista dual con notas y siguiente slide

---

## Arquitectura de la Solucion

### Modelo de Datos

El esquema actual de `class_presentations` ya tiene campos utiles:
- `outline` (texto Markdown) - estructura de la presentacion
- `key_points[]` - puntos clave por seccion
- `talking_points` (JSON) - notas del presentador

**Nueva estructura para slides (JSON en campo `slides`):**

```typescript
interface Slide {
  id: string;
  type: 'title' | 'content' | 'split' | 'image' | 'code' | 'bullets';
  title?: string;
  subtitle?: string;
  content?: string;
  bullets?: string[];
  image?: string;
  speakerNotes?: string;
  tags?: string[];
}

// Ejemplo de presentacion
const slides: Slide[] = [
  { id: '1', type: 'title', title: 'Vibe Coding 2026', subtitle: 'De la Idea a la Aplicacion', tags: ['IA Generativa', 'Deploy instantaneo'] },
  { id: '2', type: 'bullets', title: 'Agenda', bullets: ['Intro', 'Demo', 'Practica', 'Q&A'] },
  { id: '3', type: 'content', title: 'Capitulo 1', content: 'Fundamentos de IA...' },
];
```

---

## Componentes a Crear

### 1. PresentationViewer.tsx (Pagina Principal)
Ruta: `/presentations/:id` o `/presentations/:id/view`

```text
+--------------------------------------------------+
|  1/17  [<] [>] [Grid] [Speaker] [Fullscreen] [PDF]|
+--------------------------------------------------+
|                                                   |
|            [CONTENIDO DE LA SLIDE]                |
|                                                   |
|                                                   |
+--------------------------------------------------+
|  [o][o][o][o][o][o][o][o][o][o][o][o][o][o][o][o]|
+--------------------------------------------------+
```

### 2. SlideRenderer.tsx
Renderiza cada tipo de slide:
- `TitleSlide`: Titulo grande, subtitulo, tags/badges
- `ContentSlide`: Titulo + contenido markdown
- `BulletsSlide`: Titulo + lista animada
- `SplitSlide`: Dos columnas (texto/imagen)
- `ImageSlide`: Imagen fullscreen
- `CodeSlide`: Bloque de codigo con syntax highlighting

### 3. SlideControls.tsx
Controles de navegacion:
- Botones prev/next
- Contador de slides
- Shortcuts de teclado
- Indicadores de progreso

### 4. SlideGridView.tsx
Vista de cuadricula:
- Miniaturas de todas las slides
- Click para navegar
- Indicador de posicion actual

### 5. SpeakerView.tsx
Modo presentador:
- Slide actual (grande)
- Siguiente slide (pequena)
- Notas del presentador
- Timer/reloj

### 6. SlideEditor.tsx (Extension del editor actual)
Agregar al PresentationEditor:
- Editor visual de slides (drag-and-drop)
- Previsualizacion en tiempo real
- Convertir outline a slides automaticamente

---

## Migracion de Base de Datos

Agregar campo `slides` a la tabla `class_presentations`:

```sql
ALTER TABLE class_presentations 
ADD COLUMN slides jsonb DEFAULT '[]'::jsonb;
```

---

## Archivos a Crear

```text
src/pages/PresentationView.tsx              # Pagina del visor
src/components/presentation/
  PresentationViewer.tsx                    # Componente principal
  SlideRenderer.tsx                         # Renderiza cada slide
  slides/
    TitleSlide.tsx                          # Slide de titulo
    ContentSlide.tsx                        # Slide de contenido
    BulletsSlide.tsx                        # Slide con bullets
    SplitSlide.tsx                          # Slide dividida
  SlideControls.tsx                         # Navegacion
  SlideGridView.tsx                         # Vista cuadricula
  SlideProgress.tsx                         # Barra de progreso
  SpeakerView.tsx                           # Vista presentador
  SlideEditor.tsx                           # Editor de slides
  SlideParticles.tsx                        # Fondo animado
  usePresentationKeyboard.tsx               # Hook teclado
  usePresentationState.tsx                  # Hook estado
```

## Archivos a Modificar

```text
src/App.tsx                                 # Nueva ruta
src/components/admin/PresentationEditor.tsx # Agregar editor slides
src/components/admin/PresentationDashboard.tsx # Boton "Presentar"
```

---

## Flujo de Usuario

### Admin creando presentacion:
```text
1. Navega a /admin/presentations
   ↓
2. Selecciona clase → Abre editor
   ↓
3. Escribe outline en Markdown
   ↓
4. Click "Generar Slides" → Convierte outline a slides
   ↓
5. Ajusta slides individualmente (reordenar, editar)
   ↓
6. Click "Previsualizar" → Abre visor en nueva pestaña
   ↓
7. Presenta con [F] fullscreen + notas de presentador
```

### Participante viendo presentacion publicada:
```text
1. Navega a /generations/GEN-10
   ↓
2. Click en "Ver Presentacion" de una clase
   ↓
3. Ve slides en modo inmersivo
   ↓
4. Navega con ← → o touch
   ↓
5. Descarga PDF si lo necesita
```

---

## Seccion Tecnica

### Conversion de Outline a Slides (IA asistida)

```typescript
// Usar edge function con modelo de IA
const convertOutlineToSlides = async (outline: string): Promise<Slide[]> => {
  // Parsear Markdown
  // Identificar secciones (## = nueva slide)
  // Identificar tipo por contenido:
  //   - Primera seccion con # = TitleSlide
  //   - Listas con - = BulletsSlide
  //   - Parrafos = ContentSlide
  // Retornar array de slides
};
```

### Keyboard Shortcuts

```typescript
const SHORTCUTS = {
  ArrowRight: 'next',
  ArrowLeft: 'prev',
  'f': 'fullscreen',
  'g': 'grid',
  's': 'speaker',
  'Escape': 'exit',
  Home: 'first',
  End: 'last',
};
```

### Exportar PDF

Usar `html2canvas` + `jsPDF` para generar documento:
```typescript
const exportToPDF = async (slides: Slide[]) => {
  // Renderizar cada slide como imagen
  // Compilar en PDF
  // Descargar
};
```

---

## Diseno Visual

Mantener consistencia con el visor compartido:
- Fondo oscuro con gradientes (igual que el portal actual)
- Particulas animadas sutiles
- Tipografia grande y legible
- Badges/tags con colores vibrantes
- Animaciones suaves de transicion (framer-motion)

---

## Resumen de Implementacion

| Prioridad | Componente | Descripcion |
|-----------|------------|-------------|
| 1 | DB: slides jsonb | Campo para almacenar estructura de slides |
| 2 | PresentationViewer | Pagina principal del visor |
| 3 | SlideRenderer | Componentes para cada tipo de slide |
| 4 | SlideControls | Navegacion y shortcuts |
| 5 | SlideEditor | Extension del editor admin |
| 6 | SpeakerView | Vista dual para presentador |
| 7 | PDF Export | Descarga de presentaciones |

---

## Beneficios

- **Admin**: Crea presentaciones visualmente atractivas sin salir del portal
- **Presentador**: Usa el visor directamente, con notas y timer
- **Participantes**: Acceden a slides interactivas (cuando estan publicadas)
- **Escalabilidad**: Estructura JSON permite futuras mejoras (animaciones, embeds, etc.)
