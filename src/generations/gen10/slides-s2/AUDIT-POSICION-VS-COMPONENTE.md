# Auditoría: Posición en deck vs nombre de componente — Gen10 S2

**Presentación:** Gen10 Semana 2 · La Era Agéntica  
**Total slides:** 37  
**Fuente:** `supabase/migrations/20260211180000_combine_gen10_s2_with_templates.sql`

---

## Regla de referencia

- **Posición** = orden en la presentación (1 a 37). Es lo que ve el usuario al avanzar.
- **Componente** = nombre técnico (`S2Slide04Adoption`, `tpl02:Slide09Mod02Divider`, etc.).
- **Incoherencia:** cuando el número en el nombre del componente **no coincide** con la posición (ej.: `S2Slide04` en posición 6).

---

## Tabla completa: posición → componente → título

| # | component_name | title (DB) | ¿Coincide # ↔ nombre? |
|---|----------------|------------|------------------------|
| 1 | S2Slide01Cover | La Era Agéntica | ✅ 01 = 1 |
| 2 | tpl02:Slide02Agenda | Agenda | ✅ 02 = 2 |
| 3 | tpl02:Slide03Mod01Divider | Los Nuevos Fundamentos | ✅ 03 = 3 |
| 4 | **S2Slide02YearAgency** | 2026: El Año de la Agencia | ⚠️ **02 ≠ 4** |
| 5 | **S2Slide03Transition** | La Transición | ⚠️ **03 ≠ 5** |
| 6 | **S2Slide04Adoption** | Adopción Masiva | ⚠️ **04 ≠ 6** |
| 7 | **S2Slide05Fragmentation** | La Fragmentación | ⚠️ **05 ≠ 7** |
| 8 | tpl02:Slide05Practicante | El Practicante | ⚠️ 05 ≠ 8 |
| 9 | **S2Slide09ContextWindow** | Ventana de Contexto | ⚠️ **09 ≠ 9** |
| 10 | **S2Slide11Prompt** | Prompt vs Resultado | ⚠️ **11 ≠ 10** |
| 11 | **S2Slide12Ambiguity** | El Problema de la Ambigüedad | ⚠️ **12 ≠ 11** |
| 12 | **S2Slide13Role** | Define tu Rol | ⚠️ **13 ≠ 12** |
| 13 | **S2Slide14Context** | El Contexto es el Rey | ⚠️ **14 ≠ 13** |
| 14 | **S2Slide15CROP** | Framework C.R.O.P. | ⚠️ **15 ≠ 14** |
| 15 | **S2Slide16PromptEngineering** | Ingeniería de Prompts | ⚠️ **16 ≠ 15** |
| 16 | tpl02:Slide08MetaPrompting | Meta-Prompting | ⚠️ 08 ≠ 16 |
| 17 | tpl02:Slide09Mod02Divider | El Nuevo Rol: Orquestador | ⚠️ 09 ≠ 17 |
| 18 | tpl02:Slide10JefeDeObra | Del Maestro Chasquilla al Jefe de Obra | ⚠️ 10 ≠ 18 |
| 19 | tpl02:Slide11Lienzos | Lienzos Digitales | ⚠️ 11 ≠ 19 |
| 20 | tpl02:Slide12Mod03Divider | La Suite Claude en Acción | ⚠️ 12 ≠ 20 |
| 21 | tpl02:Slide13SuiteClaude | Tres Herramientas, Un Ecosistema | ⚠️ 13 ≠ 21 |
| 22 | tpl02:Slide14NotebookLM | NotebookLM: Síntesis Inteligente | ⚠️ 14 ≠ 22 |
| 23 | tpl02:Slide15NanoBanana | Nano Banana: Diseño y Renders | ⚠️ 15 ≠ 23 |
| 24 | tpl02:Slide16Mod04Divider | El Paisaje de Modelos | ⚠️ 16 ≠ 24 |
| 25 | **S2Slide06Landscape** | Paisaje de Modelos | ⚠️ **06 ≠ 25** |
| 26 | **S2Slide08Metrics** | Cómo Piensa una IA | ⚠️ **08 ≠ 26** |
| 27 | **S2Slide10ModelChoice** | Las 3 Preguntas | ⚠️ **10 ≠ 27** |
| 28 | tpl02:Slide18Mod05Divider | Agentes y Ejecución | ⚠️ 18 ≠ 28 |
| 29 | **S2Slide17Revolution** | La Revolución Agéntica | ⚠️ **17 ≠ 29** |
| 30 | **S2Slide18Anatomy** | Anatomía de un Agente | ⚠️ **18 ≠ 30** |
| 31 | **S2Slide19Protagonists** | Los Protagonistas | ⚠️ **19 ≠ 31** |
| 32 | tpl02:Slide20Manus | Delegación: Manus AI | ⚠️ 20 ≠ 32 |
| 33 | tpl02:Slide21Operator | Supervisión: Operator | ⚠️ 21 ≠ 33 |
| 34 | tpl02:Slide22Director | De Orquestador a Director | ⚠️ 22 ≠ 34 |
| 35 | **S2Slide20Infrastructure** | Infraestructura MCP | ⚠️ **20 ≠ 35** |
| 36 | **S2Slide21Kit** | Tu Kit Personal | ⚠️ **21 ≠ 36** |
| 37 | **S2Slide22Closing** | Cierre | ⚠️ **22 ≠ 37** |

---

## Resumen de incoherencias

### Por qué no coinciden

- **S2SlideXX** fueron pensados como un **set propio** (Cover, YearAgency, Transition, Adoption, …). Sus números (01, 02, 03, 04…) reflejan el orden **dentro de ese set**, no la posición en la presentación final.
- La presentación final **mezcla**:
  - slides de ese set (S2Slide01… S2Slide22),
  - slides de plantilla (tpl02:Slide02Agenda, Slide03Mod01Divider, Slide05Practicante, etc.).
- El **orden en BD** (slide_number 1…37) es el que define la posición; el nombre del componente **no** indica esa posición.

### Casos que más confunden

| Si alguien dice… | En la presentación es… | Componente real |
|------------------|------------------------|------------------|
| "Slide 4" (posición) | Evolución / Año de la Agencia | S2Slide**02**YearAgency |
| "Slide 4" (por nombre) | Adopción / Brecha Digital | S2Slide**04**Adoption (está en **posición 6**) |
| "Slide 6" (posición) | Adopción Masiva | S2Slide**04**Adoption |
| "Slide 9" (posición) | Ventana de Contexto | S2Slide**09**ContextWindow ✅ (único que coincide) |

---

## Recomendación para evitar malentendidos

1. **En conversación / tickets:** usar siempre **posición en el deck** (1–37) o el **título en BD** (ej. "2026: El Año de la Agencia", "Adopción Masiva").
2. **En código:** el orden real lo da la tabla `slides` (slide_number, generation_id, week); no asumir que `S2Slide0N` está en posición N.
3. **Opcional:** añadir en el footer de cada slide el título de la BD (o un slug) además del "XX / 37" para que quede claro qué slide es al revisar.

---

*Auditoría generada a partir del orden definido en la migración Gen10 S2 (37 slides).*
