
# Enriquecer Presentación S4 — Gen 10 con Transcripción Real

## Diagnóstico: Lo que tiene la transcripción que falta en los slides

Después de leer las 1820 líneas de transcripción completa, hay una riqueza de contenido concreto, analogías y citas textuales que harán la presentación mucho más útil y cercana. Los cambios se organizan por slide:

---

## Cambios Específicos por Slide

### 1. `S4Slide07Supabase.tsx` — Backend

**Nuevas citas directas de clase para agregar:**
- "Supabase es el Excel por detrás. Lovable es como el Power BI encima." — Vicente (ya existe, confirmar)
- **NUEVO:** "Uno de los grandes problemas con Excel es que al final la data queda difícil de navegar. Con Supabase, cualquier IA se conecta y te da respuestas sin que le expliques un mamotreto de 70 páginas."

**Contenido nuevo para el tab "AI Assistant":**
- Agregar el flujo de documentación: pedir a Lovable "documenta las tablas y columnas con lenguaje natural"
- Antes: tabla sin descripción → Después: "Tabla ingresos: registro de ingresos de la cervecería. Cada fila = una venta."
- Tip de Edge Functions: "Para conectar Shopify, Book, APIs externas → Edge Functions en Supabase"

**Advertencia más específica del "Lovable Cloud Trap":**
- Cita textual de Vicente: "Es una maldición. Mucha gente termina haciendo todo el backend en Lovable. Le pongo 'never allow' pero igual lo mete." → más impacto visual

**Tip de organización con roles:**
- Plan Pro $20: todos en la org ven TODOS los proyectos → no invites a un analista junior si no quieres que vea sueldos
- Plan Enterprise $600: permisos granulares por proyecto

---

### 2. `S4Slide09GitHub.tsx` — Control de Versiones

**Nuevas citas:**
- "Si la embarras, restauras cualquier versión con un clic" → ya existe
- **NUEVO:** "Lo más importante: el código le pertenece a la empresa, no a la persona. Si alguien se va, el código queda."
- "Lovable actualiza el README automáticamente pero genérico. Pídele: 'Actualiza el README con lenguaje claro y útil.'"

**Paso 4 nuevo: Documentar el repositorio**
- Agregar paso extra en el tab Setup: "Pide documentación: 'Documenta las tablas y columnas en Supabase con lenguaje natural.' Esto hace el código legible para cualquier IA futura."

**Distinción importante:**
- Flujo Setup (una sola vez): GitHub Org → Lovable → Supabase → GitHub connect
- Flujo Recurrente (cada proyecto nuevo): Lovable prompt → conectar Supabase → deploy Vercel

---

### 3. `S4Slide08DataModeling.tsx` — Modelado de Datos

**Dato real del Excel de Diego:**
- Cita: "Limpié las ventas, costos y clientes con Claude y lo automaticé. El dashboard se actualiza cada hora."
- El Excel de Diego: ventas línea por línea con listas desplegables, conectado a base datos clientes y costeo
- Añadir una columna "comentario" en el mockup de tablas que muestre la documentación generada por IA

**Nuevo bloque: "Estrategia de modelado" (pregunta real de Pablo):**
- ¿Partes del Excel o de Lovable? → Depende: si tienes Excel ordenado → limpia + sube. Si es un caos → modela desde Lovable y adapta el Excel.
- Advertencia: leer siempre el SQL que propone Lovable antes de aprobar → puede borrar datos

**Caso práctico de tablas documentadas:**
- Mostrar el "antes" sin descripción vs "después" con comentarios IA en cada columna (ej: `proveedor_id` = "Proveedor asociado al gasto, ejemplo: compra de lúpulo")

---

### 4. `S4Slide11CompleteFlow.tsx` — Flujo Completo

**Agregar Vercel como paso 6:**
- El flujo real en clase fue: Lovable → Supabase → GitHub → **Vercel (deploy)**
- La URL de Lovable es temporal, el custom domain conecta a Vercel → madcharlies.cl

**Mejorar tips de cada paso con frases reales:**
- Lovable: "Usa el botón Plan antes de lanzar. Lovable se 'auto-promptea'. 80% del tiempo trabaja con plan prendido."
- Lovable: "Visual Edits: selecciona un elemento y pide cambios puntuales. Mucho mejor contexto."
- Supabase: "Documenta siempre. Pídele: 'Documenta tablas y columnas.' Cualquier IA futura lo entenderá."
- GitHub: "README genérico → pídele 'Actualiza el README con lenguaje claro.'"

**Cita de Pablo para el slide:**
- "Better done than perfect. Láncense y rompan cosas. Lo peligroso es solo cuando ya lo usa todo el equipo."

---

### 5. `S4Slide10CursorClaude.tsx` — Cursor + Claude Code

**Dato concreto nuevo del Cowork vs Claude Code:**
- Cita: "Cowork puede lanzar varios agentes en paralelo. Uno mira el Excel, otro mira Supabase. Por eso chupa tantos créditos."
- Distinción Cowork vs Claude Code: "Para carga masiva de datos, Cowork tiene límites de MCP. Claude Code es mejor para un millón de filas."
- Respuesta a Jaime: "Una vez que sabes conectarte vía GitHub y Supabase, da lo mismo la herramienta. Lo importante es que el código esté en GitHub y la base de datos en Supabase."

**Agregar Cowork como herramienta intermedia:**
- Cowork (Claude para Windows): tapa Windows, multirramienta, multicarpeta, conector nativo de Supabase → excelente para cargar Excel masivo

---

### 6. `S4Slide14CaseStudy.tsx` — Caso Real Mad Charlies

**Datos más ricos del flujo real:**
- El Excel de Diego: ventas con listas desplegables, conectado a tabla clientes y costeo, dashboard que se actualiza cada hora
- Módulo elegido en clase: Finanzas y Reportes (no inventario)
- Claude cayó en la clase → el flujo igual funcionó, mostrando la importancia del backup
- Cita de Diego: "Yo quería contratar un CFO remoto, huevón" → el ERP lo reemplaza
- Cita de Vicente: "Si lo hacéis bien al principio, cuando la empresa sea gigante, no tenéis un equipo de administración de 90 personas planillando."

**Agregar una sección "Próximos pasos Mad Charlies":**
- Conectar Shopify API (ya planeado por Diego en clase)
- Conectar servicio de despacho API
- Edge Functions para automatizar reportes

---

## Archivos a Modificar

1. `src/generations/gen10/slides-s4/S4Slide07Supabase.tsx` — Agregar documentación IA, Edge Functions tip, advertencia Lovable Cloud más específica, modelo de permisos
2. `src/generations/gen10/slides-s4/S4Slide09GitHub.tsx` — Agregar paso documentación, distinguir flujo setup vs flujo recurrente, README tip
3. `src/generations/gen10/slides-s4/S4Slide08DataModeling.tsx` — Mostrar tablas documentadas, estrategia de modelado (Excel vs Lovable-first), SQL warning
4. `src/generations/gen10/slides-s4/S4Slide11CompleteFlow.tsx` — Agregar Vercel como paso 6, mejorar tips con frases reales, cita "Better done than perfect"
5. `src/generations/gen10/slides-s4/S4Slide10CursorClaude.tsx` — Agregar Cowork como herramienta, distinción Cowork vs Claude Code, cita de Jaime
6. `src/generations/gen10/slides-s4/S4Slide14CaseStudy.tsx` — Datos reales del Excel Diego, módulo Finanzas elegido, próximos pasos Shopify, cita del CFO

## Principio Guía

Cada cambio debe hacer la presentación **más útil como material de estudio**. Las citas textuales de Vicente generan identificación y confianza. Los datos concretos de Mad Charlies (listas desplegables, dashboard cada hora, CFO) hacen el caso de estudio creíble y aspiracional. Los warnings precisos (Lovable Cloud Trap, leer el SQL, no invitar al analista junior) protegen a los estudiantes de errores reales.
