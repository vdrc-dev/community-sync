import { ComponentType, lazy } from 'react';

/**
 * Slide Component Registry
 * 
 * Maps component_name from the database to the actual React component.
 * Uses lazy() for code-splitting - only loads slides that are needed.
 * 
 * To add a new slide:
 * 1. Create the React component file
 * 2. Add an entry here mapping its DB name to the lazy import
 */

/**
 * Registry mapping component_name (from DB) -> lazy React component
 */
export const SLIDE_REGISTRY: Record<string, ComponentType> = {
  // ============================================
  // Gen 09 (generation_id=1) - prefixed to avoid collision with Gen10 S1
  // ============================================
  'gen09:Slide01Cover': lazy(() => import('@/generations/gen09/slides/Slide01Cover').then(m => ({ default: m.Slide01Cover }))),
  'gen09:Slide02Context': lazy(() => import('@/generations/gen09/slides/Slide02Context').then(m => ({ default: m.Slide02Context }))),
  'gen09:Slide03FrontEnd': lazy(() => import('@/generations/gen09/slides/Slide03FrontEnd').then(m => ({ default: m.Slide03FrontEnd }))),
  'gen09:Slide04BackEnd': lazy(() => import('@/generations/gen09/slides/Slide04BackEnd').then(m => ({ default: m.Slide04BackEnd }))),
  'gen09:Slide05CRUD': lazy(() => import('@/generations/gen09/slides/Slide05CRUD').then(m => ({ default: m.Slide05CRUD }))),
  'gen09:Slide06Gemini': lazy(() => import('@/generations/gen09/slides/Slide06Gemini').then(m => ({ default: m.Slide06Gemini }))),
  'gen09:Slide07Lovable': lazy(() => import('@/generations/gen09/slides/Slide07Lovable').then(m => ({ default: m.Slide07Lovable }))),
  'gen09:Slide08CursorClaude': lazy(() => import('@/generations/gen09/slides/Slide08CursorClaude').then(m => ({ default: m.Slide08CursorClaude }))),
  'gen09:Slide09GitHub': lazy(() => import('@/generations/gen09/slides/Slide09GitHub').then(m => ({ default: m.Slide09GitHub }))),
  'gen09:Slide10FlowDiagram': lazy(() => import('@/generations/gen09/slides/Slide10FlowDiagram').then(m => ({ default: m.Slide10FlowDiagram }))),
  'gen09:Slide11WhenToUse': lazy(() => import('@/generations/gen09/slides/Slide11WhenToUse').then(m => ({ default: m.Slide11WhenToUse }))),
  'gen09:Slide12NextSteps': lazy(() => import('@/generations/gen09/slides/Slide12NextSteps').then(m => ({ default: m.Slide12NextSteps }))),

  // ============================================
  // Gen 10 - Semana 1 (Higiene Digital)
  // ============================================
  'Slide01Cover': lazy(() => import('@/generations/gen10/slides/Slide01Cover').then(m => ({ default: m.Slide01Cover }))),
  'Slide02Context': lazy(() => import('@/generations/gen10/slides/Slide02Context').then(m => ({ default: m.Slide02Context }))),
  'Slide03Participants': lazy(() => import('@/generations/gen10/slides/Slide03Participants').then(m => ({ default: m.Slide03Participants }))),
  'Slide04Mission': lazy(() => import('@/generations/gen10/slides/Slide04Mission').then(m => ({ default: m.Slide04Mission }))),
  'Slide05HowWeWork': lazy(() => import('@/generations/gen10/slides/Slide05HowWeWork').then(m => ({ default: m.Slide05HowWeWork }))),
  'Slide06SharpenStory': lazy(() => import('@/generations/gen10/slides/Slide06SharpenStory').then(m => ({ default: m.Slide06SharpenStory }))),
  'Slide07SharpenPhilosophy': lazy(() => import('@/generations/gen10/slides/Slide07SharpenPhilosophy').then(m => ({ default: m.Slide07SharpenPhilosophy }))),
  'Slide08Podcast': lazy(() => import('@/generations/gen10/slides/Slide08Podcast').then(m => ({ default: m.Slide08Podcast }))),
  'Slide09Roadmap': lazy(() => import('@/generations/gen10/slides/Slide09Roadmap').then(m => ({ default: m.Slide09Roadmap }))),
  'Slide10InboxZeroTitle': lazy(() => import('@/generations/gen10/slides/Slide10InboxZeroTitle').then(m => ({ default: m.Slide10InboxZeroTitle }))),
  'Slide11InboxMetaphor': lazy(() => import('@/generations/gen10/slides/Slide11InboxMetaphor').then(m => ({ default: m.Slide11InboxMetaphor }))),
  'Slide12ProcessingAlgorithm': lazy(() => import('@/generations/gen10/slides/Slide12ProcessingAlgorithm').then(m => ({ default: m.Slide12ProcessingAlgorithm }))),
  'Slide13BrowsersTitle': lazy(() => import('@/generations/gen10/slides/Slide13BrowsersTitle').then(m => ({ default: m.Slide13BrowsersTitle }))),
  'Slide14BrowserProfiles': lazy(() => import('@/generations/gen10/slides/Slide14BrowserProfiles').then(m => ({ default: m.Slide14BrowserProfiles }))),
  'Slide15ConfigureProfiles': lazy(() => import('@/generations/gen10/slides/Slide15ConfigureProfiles').then(m => ({ default: m.Slide15ConfigureProfiles }))),
  'Slide16ExtensionAnchoring': lazy(() => import('@/generations/gen10/slides/Slide16ExtensionAnchoring').then(m => ({ default: m.Slide16ExtensionAnchoring }))),
  'Slide17SecurityTitle': lazy(() => import('@/generations/gen10/slides/Slide17SecurityTitle').then(m => ({ default: m.Slide17SecurityTitle }))),
  'Slide18SecurityMatrix': lazy(() => import('@/generations/gen10/slides/Slide18SecurityMatrix').then(m => ({ default: m.Slide18SecurityMatrix }))),
  'Slide19SecuritySolutions': lazy(() => import('@/generations/gen10/slides/Slide19SecuritySolutions').then(m => ({ default: m.Slide19SecuritySolutions }))),
  'Slide20BitwardenInstall': lazy(() => import('@/generations/gen10/slides/Slide20BitwardenInstall').then(m => ({ default: m.Slide20BitwardenInstall }))),
  'Slide21ContextEngineering': lazy(() => import('@/generations/gen10/slides/Slide21ContextEngineering').then(m => ({ default: m.Slide21ContextEngineering }))),
  'Slide22ContextProblemSolution': lazy(() => import('@/generations/gen10/slides/Slide22ContextProblemSolution').then(m => ({ default: m.Slide22ContextProblemSolution }))),
  'Slide23ManualDigital': lazy(() => import('@/generations/gen10/slides/Slide23ManualDigital').then(m => ({ default: m.Slide23ManualDigital }))),
  'Slide24ContextExamples': lazy(() => import('@/generations/gen10/slides/Slide24ContextExamples').then(m => ({ default: m.Slide24ContextExamples }))),
  'Slide25OutputFormat': lazy(() => import('@/generations/gen10/slides/Slide25OutputFormat').then(m => ({ default: m.Slide25OutputFormat }))),
  'Slide26Markdown': lazy(() => import('@/generations/gen10/slides/Slide26Markdown').then(m => ({ default: m.Slide26Markdown }))),
  'Slide27RoadmapVertical': lazy(() => import('@/generations/gen10/slides/Slide27RoadmapVertical').then(m => ({ default: m.Slide27RoadmapVertical }))),
  'Slide28WeeklyMission': lazy(() => import('@/generations/gen10/slides/Slide28WeeklyMission').then(m => ({ default: m.Slide28WeeklyMission }))),
  'Slide29Closing': lazy(() => import('@/generations/gen10/slides/Slide29Closing').then(m => ({ default: m.Slide29Closing }))),

  // ============================================
  // Gen 10 - Semana 2 (La Era Agéntica)
  // ============================================
  'S2Slide01Cover': lazy(() => import('@/generations/gen10/slides-s2/S2Slide01Cover').then(m => ({ default: m.S2Slide01Cover }))),
  'S2Slide02YearAgency': lazy(() => import('@/generations/gen10/slides-s2/S2Slide02YearAgency').then(m => ({ default: m.S2Slide02YearAgency }))),
  'S2Slide02Timeline': lazy(() => import('@/generations/gen10/slides-s2/S2Slide02YearAgency').then(m => ({ default: m.S2Slide02YearAgency }))),
  'S2Slide03Transition': lazy(() => import('@/generations/gen10/slides-s2/S2Slide03Transition').then(m => ({ default: m.S2Slide03Transition }))),
  'S2Slide04Adoption': lazy(() => import('@/generations/gen10/slides-s2/S2Slide04Adoption').then(m => ({ default: m.S2Slide04Adoption }))),
  'S2Slide05Fragmentation': lazy(() => import('@/generations/gen10/slides-s2/S2Slide05Fragmentation').then(m => ({ default: m.S2Slide05Fragmentation }))),
  'S2Slide06Landscape': lazy(() => import('@/generations/gen10/slides-s2/S2Slide06Landscape').then(m => ({ default: m.S2Slide06Landscape }))),
  'S2Slide08Metrics': lazy(() => import('@/generations/gen10/slides-s2/S2Slide08Metrics').then(m => ({ default: m.S2Slide08Metrics }))),
  'S2Slide09ContextWindow': lazy(() => import('@/generations/gen10/slides-s2/S2Slide09ContextWindow').then(m => ({ default: m.S2Slide09ContextWindow }))),
  'S2Slide10ModelChoice': lazy(() => import('@/generations/gen10/slides-s2/S2Slide10ModelChoice').then(m => ({ default: m.S2Slide10ModelChoice }))),
  'S2Slide11Prompt': lazy(() => import('@/generations/gen10/slides-s2/S2Slide11Prompt').then(m => ({ default: m.S2Slide11Prompt }))),
  'S2Slide12Ambiguity': lazy(() => import('@/generations/gen10/slides-s2/S2Slide12Ambiguity').then(m => ({ default: m.S2Slide12Ambiguity }))),
  'S2Slide12Specificity': lazy(() => import('@/generations/gen10/slides-s2/S2Slide12Ambiguity').then(m => ({ default: m.S2Slide12Ambiguity }))),
  'S2Slide13Role': lazy(() => import('@/generations/gen10/slides-s2/S2Slide13Role').then(m => ({ default: m.S2Slide13Role }))),
  'S2Slide14Context': lazy(() => import('@/generations/gen10/slides-s2/S2Slide14Context').then(m => ({ default: m.S2Slide14Context }))),
  'S2Slide15CROP': lazy(() => import('@/generations/gen10/slides-s2/S2Slide15CROP').then(m => ({ default: m.S2Slide15CROP }))),
  'S2Slide16PromptEngineering': lazy(() => import('@/generations/gen10/slides-s2/S2Slide16PromptEngineering').then(m => ({ default: m.S2Slide16PromptEngineering }))),
  'S2Slide16Engineering': lazy(() => import('@/generations/gen10/slides-s2/S2Slide16PromptEngineering').then(m => ({ default: m.S2Slide16PromptEngineering }))),
  'S2Slide17Revolution': lazy(() => import('@/generations/gen10/slides-s2/S2Slide17Revolution').then(m => ({ default: m.S2Slide17Revolution }))),
  'S2Slide18Anatomy': lazy(() => import('@/generations/gen10/slides-s2/S2Slide18Anatomy').then(m => ({ default: m.S2Slide18Anatomy }))),
  'S2Slide19Protagonists': lazy(() => import('@/generations/gen10/slides-s2/S2Slide19Protagonists').then(m => ({ default: m.S2Slide19Protagonists }))),
  'S2Slide20Infrastructure': lazy(() => import('@/generations/gen10/slides-s2/S2Slide20Infrastructure').then(m => ({ default: m.S2Slide20Infrastructure }))),
  'S2Slide20MCP': lazy(() => import('@/generations/gen10/slides-s2/S2Slide20Infrastructure').then(m => ({ default: m.S2Slide20Infrastructure }))),
  'S2Slide21Kit': lazy(() => import('@/generations/gen10/slides-s2/S2Slide21Kit').then(m => ({ default: m.S2Slide21Kit }))),
  'S2Slide22Closing': lazy(() => import('@/generations/gen10/slides-s2/S2Slide22Closing').then(m => ({ default: m.S2Slide22Closing }))),

  // ============================================
  // Gen 10 - Semana 3 (Comunicación y Creación Digital)
  // Orden lógico: 01 Cover → 02 Recap → 03 Design → 04 Canvas → 05 VibeCoding →
  //   06 NotebookLM → 07 ClaudeCode → 08 Skills → 09 PresentationAI →
  //   10 Automatizacion → 11 CRM → 12 MCPvsAPI → 13 Cursor → 14 VideoAI → 15 Closing
  // ============================================
  'S3Slide01Cover': lazy(() => import('@/generations/gen10/slides-s3/S3Slide01Cover').then(m => ({ default: m.S3Slide01Cover }))),
  'S3Slide02Recap': lazy(() => import('@/generations/gen10/slides-s3/S3Slide02Recap').then(m => ({ default: m.S3Slide02Recap }))),
  'S3Slide03DesignFoundations': lazy(() => import('@/generations/gen10/slides-s3/S3Slide03DesignFoundations').then(m => ({ default: m.S3Slide03DesignFoundations }))),
  'S3Slide03Canvas': lazy(() => import('@/generations/gen10/slides-s3/S3Slide03Canvas').then(m => ({ default: m.S3Slide03Canvas }))),
  'S3Slide04VibeCoding': lazy(() => import('@/generations/gen10/slides-s3/S3Slide04VibeCoding').then(m => ({ default: m.S3Slide04VibeCoding }))),
  'S3Slide05NotebookLM': lazy(() => import('@/generations/gen10/slides-s3/S3Slide05NotebookLM').then(m => ({ default: m.S3Slide05NotebookLM }))),
  'S3Slide06ClaudeCode': lazy(() => import('@/generations/gen10/slides-s3/S3Slide06ClaudeCode').then(m => ({ default: m.S3Slide06ClaudeCode }))),
  'S3Slide07Skills': lazy(() => import('@/generations/gen10/slides-s3/S3Slide07Skills').then(m => ({ default: m.S3Slide07Skills }))),
  'S3Slide07PresentationAI': lazy(() => import('@/generations/gen10/slides-s3/S3Slide07PresentationAI').then(m => ({ default: m.S3Slide07PresentationAI }))),
  'S3Slide08Automatizacion': lazy(() => import('@/generations/gen10/slides-s3/S3Slide08Automatizacion').then(m => ({ default: m.S3Slide08Automatizacion }))),
  'S3Slide09CRM': lazy(() => import('@/generations/gen10/slides-s3/S3Slide09CRM').then(m => ({ default: m.S3Slide09CRM }))),
  'S3Slide10MCPvsAPI': lazy(() => import('@/generations/gen10/slides-s3/S3Slide10MCPvsAPI').then(m => ({ default: m.S3Slide10MCPvsAPI }))),
  'S3Slide11Cursor': lazy(() => import('@/generations/gen10/slides-s3/S3Slide11Cursor').then(m => ({ default: m.S3Slide11Cursor }))),
  'S3Slide14VideoAI': lazy(() => import('@/generations/gen10/slides-s3/S3Slide14VideoAI').then(m => ({ default: m.S3Slide14VideoAI }))),
  'S3Slide12Closing': lazy(() => import('@/generations/gen10/slides-s3/S3Slide12Closing').then(m => ({ default: m.S3Slide12Closing }))),

  // ============================================
  // Gen 10 - Semana 4 (Desarrollo / VibeCoding)
  // ============================================
  'S4Slide01Cover': lazy(() => import('@/generations/gen10/slides-s4/S4Slide01Cover').then(m => ({ default: m.S4Slide01Cover }))),
  'S4Slide02Recap': lazy(() => import('@/generations/gen10/slides-s4/S4Slide02Recap').then(m => ({ default: m.S4Slide02Recap }))),
  'S4Slide03Architecture': lazy(() => import('@/generations/gen10/slides-s4/S4Slide03Architecture').then(m => ({ default: m.S4Slide03Architecture }))),
  'S4Slide04CRUD': lazy(() => import('@/generations/gen10/slides-s4/S4Slide04CRUD').then(m => ({ default: m.S4Slide04CRUD }))),
  'S4Slide05GeminiCanvas': lazy(() => import('@/generations/gen10/slides-s4/S4Slide05GeminiCanvas').then(m => ({ default: m.S4Slide05GeminiCanvas }))),
  'S4Slide06Lovable': lazy(() => import('@/generations/gen10/slides-s4/S4Slide06Lovable').then(m => ({ default: m.S4Slide06Lovable }))),
  'S4Slide07Supabase': lazy(() => import('@/generations/gen10/slides-s4/S4Slide07Supabase').then(m => ({ default: m.S4Slide07Supabase }))),
  'S4Slide08DataModeling': lazy(() => import('@/generations/gen10/slides-s4/S4Slide08DataModeling').then(m => ({ default: m.S4Slide08DataModeling }))),
  'S4Slide09GitHub': lazy(() => import('@/generations/gen10/slides-s4/S4Slide09GitHub').then(m => ({ default: m.S4Slide09GitHub }))),
  'S4Slide10CursorClaude': lazy(() => import('@/generations/gen10/slides-s4/S4Slide10CursorClaude').then(m => ({ default: m.S4Slide10CursorClaude }))),
  'S4Slide11CompleteFlow': lazy(() => import('@/generations/gen10/slides-s4/S4Slide11CompleteFlow').then(m => ({ default: m.S4Slide11CompleteFlow }))),
  'S4Slide12DecisionGuide': lazy(() => import('@/generations/gen10/slides-s4/S4Slide12DecisionGuide').then(m => ({ default: m.S4Slide12DecisionGuide }))),
  'S4Slide13Authentication': lazy(() => import('@/generations/gen10/slides-s4/S4Slide13Authentication').then(m => ({ default: m.S4Slide13Authentication }))),
  'S4Slide14CaseStudy': lazy(() => import('@/generations/gen10/slides-s4/S4Slide14CaseStudy').then(m => ({ default: m.S4Slide14CaseStudy }))),
  'S4Slide15Closing': lazy(() => import('@/generations/gen10/slides-s4/S4Slide15Closing').then(m => ({ default: m.S4Slide15Closing }))),

  // ============================================
  // Templates Clase 02 (used in combined gen10 S2)
  // Prefixed with tpl02: to avoid name collisions
  // ============================================
  'tpl02:Slide02Agenda': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide02Agenda').then(m => ({ default: m.Slide02Agenda }))),
  'tpl02:Slide03Mod01Divider': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide03Mod01Divider').then(m => ({ default: m.Slide03Mod01Divider }))),
  'tpl02:Slide05Practicante': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide05Practicante').then(m => ({ default: m.Slide05Practicante }))),
  'tpl02:Slide08MetaPrompting': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide08MetaPrompting').then(m => ({ default: m.Slide08MetaPrompting }))),
  'tpl02:Slide09Mod02Divider': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide09Mod02Divider').then(m => ({ default: m.Slide09Mod02Divider }))),
  'tpl02:Slide10JefeDeObra': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide10JefeDeObra').then(m => ({ default: m.Slide10JefeDeObra }))),
  'tpl02:Slide11Lienzos': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide11Lienzos').then(m => ({ default: m.Slide11Lienzos }))),
  'tpl02:Slide12Mod03Divider': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide12Mod03Divider').then(m => ({ default: m.Slide12Mod03Divider }))),
  'tpl02:Slide13SuiteClaude': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide13SuiteClaude').then(m => ({ default: m.Slide13SuiteClaude }))),
  'tpl02:Slide14NotebookLM': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide14NotebookLM').then(m => ({ default: m.Slide14NotebookLM }))),
  'tpl02:Slide15NanoBanana': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide15NanoBanana').then(m => ({ default: m.Slide15NanoBanana }))),
  'tpl02:Slide16Mod04Divider': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide16Mod04Divider').then(m => ({ default: m.Slide16Mod04Divider }))),
  'tpl02:Slide18Mod05Divider': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide18Mod05Divider').then(m => ({ default: m.Slide18Mod05Divider }))),
  'tpl02:Slide20Manus': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide20Manus').then(m => ({ default: m.Slide20Manus }))),
  'tpl02:Slide21Operator': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide21Operator').then(m => ({ default: m.Slide21Operator }))),
  'tpl02:Slide22Director': lazy(() => import('@/templates/clase-02-ia-productividad/slides/Slide22Director').then(m => ({ default: m.Slide22Director }))),
};

/**
 * Resolves an array of component_names from the DB into React components.
 * Returns only the components that exist in the registry.
 */
export function resolveSlides(
  componentNames: string[],
  generationId?: number
): ComponentType[] {
  return componentNames
    .map(name => {
      // For gen09 (id=1), try prefixed version first to avoid collision
      if (generationId === 1) {
        return SLIDE_REGISTRY[`gen09:${name}`] || SLIDE_REGISTRY[name];
      }
      return SLIDE_REGISTRY[name];
    })
    .filter((c): c is ComponentType => !!c);
}
