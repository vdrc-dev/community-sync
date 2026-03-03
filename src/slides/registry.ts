import { ComponentType, lazy } from 'react';

/**
 * Slide Component Registry
 * 
 * Maps component_name from the database to the actual React component.
 * Uses lazyWithPreload() for code-splitting with preload support.
 * Call Component.preload() to eagerly fetch the chunk before render.
 */

/** Lazy with preload — allows prefetching adjacent slides */
function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): T & { preload: () => Promise<{ default: T }> } {
  let modulePromise: Promise<{ default: T }> | undefined;
  const preload = () => {
    if (!modulePromise) modulePromise = factory();
    return modulePromise;
  };
  const LazyComponent = lazy(() => preload()) as any;
  LazyComponent.preload = preload;
  return LazyComponent;
}

/**
 * Registry mapping component_name (from DB) -> lazy React component
 */
export const SLIDE_REGISTRY: Record<string, ComponentType> = {
  // ============================================
  // Gen 09 (generation_id=1)
  // ============================================
  'gen09:Slide01Cover': lazyWithPreload(() => import('@/generations/gen09/slides/Slide01Cover').then(m => ({ default: m.Slide01Cover }))),
  'gen09:Slide02Context': lazyWithPreload(() => import('@/generations/gen09/slides/Slide02Context').then(m => ({ default: m.Slide02Context }))),
  'gen09:Slide03FrontEnd': lazyWithPreload(() => import('@/generations/gen09/slides/Slide03FrontEnd').then(m => ({ default: m.Slide03FrontEnd }))),
  'gen09:Slide04BackEnd': lazyWithPreload(() => import('@/generations/gen09/slides/Slide04BackEnd').then(m => ({ default: m.Slide04BackEnd }))),
  'gen09:Slide05CRUD': lazyWithPreload(() => import('@/generations/gen09/slides/Slide05CRUD').then(m => ({ default: m.Slide05CRUD }))),
  'gen09:Slide06Gemini': lazyWithPreload(() => import('@/generations/gen09/slides/Slide06Gemini').then(m => ({ default: m.Slide06Gemini }))),
  'gen09:Slide07Lovable': lazyWithPreload(() => import('@/generations/gen09/slides/Slide07Lovable').then(m => ({ default: m.Slide07Lovable }))),
  'gen09:Slide08CursorClaude': lazyWithPreload(() => import('@/generations/gen09/slides/Slide08CursorClaude').then(m => ({ default: m.Slide08CursorClaude }))),
  'gen09:Slide09GitHub': lazyWithPreload(() => import('@/generations/gen09/slides/Slide09GitHub').then(m => ({ default: m.Slide09GitHub }))),
  'gen09:Slide10FlowDiagram': lazyWithPreload(() => import('@/generations/gen09/slides/Slide10FlowDiagram').then(m => ({ default: m.Slide10FlowDiagram }))),
  'gen09:Slide11WhenToUse': lazyWithPreload(() => import('@/generations/gen09/slides/Slide11WhenToUse').then(m => ({ default: m.Slide11WhenToUse }))),
  'gen09:Slide12NextSteps': lazyWithPreload(() => import('@/generations/gen09/slides/Slide12NextSteps').then(m => ({ default: m.Slide12NextSteps }))),

  // ============================================
  // Gen 10 - Semana 1
  // ============================================
  'Slide01Cover': lazyWithPreload(() => import('@/generations/gen10/slides/Slide01Cover').then(m => ({ default: m.Slide01Cover }))),
  'Slide02Context': lazyWithPreload(() => import('@/generations/gen10/slides/Slide02Context').then(m => ({ default: m.Slide02Context }))),
  'Slide03Participants': lazyWithPreload(() => import('@/generations/gen10/slides/Slide03Participants').then(m => ({ default: m.Slide03Participants }))),
  'Slide04Mission': lazyWithPreload(() => import('@/generations/gen10/slides/Slide04Mission').then(m => ({ default: m.Slide04Mission }))),
  'Slide05HowWeWork': lazyWithPreload(() => import('@/generations/gen10/slides/Slide05HowWeWork').then(m => ({ default: m.Slide05HowWeWork }))),
  'Slide06SharpenStory': lazyWithPreload(() => import('@/generations/gen10/slides/Slide06SharpenStory').then(m => ({ default: m.Slide06SharpenStory }))),
  'Slide07SharpenPhilosophy': lazyWithPreload(() => import('@/generations/gen10/slides/Slide07SharpenPhilosophy').then(m => ({ default: m.Slide07SharpenPhilosophy }))),
  'Slide08Podcast': lazyWithPreload(() => import('@/generations/gen10/slides/Slide08Podcast').then(m => ({ default: m.Slide08Podcast }))),
  'Slide09Roadmap': lazyWithPreload(() => import('@/generations/gen10/slides/Slide09Roadmap').then(m => ({ default: m.Slide09Roadmap }))),
  'Slide10InboxZeroTitle': lazyWithPreload(() => import('@/generations/gen10/slides/Slide10InboxZeroTitle').then(m => ({ default: m.Slide10InboxZeroTitle }))),
  'Slide11InboxMetaphor': lazyWithPreload(() => import('@/generations/gen10/slides/Slide11InboxMetaphor').then(m => ({ default: m.Slide11InboxMetaphor }))),
  'Slide12ProcessingAlgorithm': lazyWithPreload(() => import('@/generations/gen10/slides/Slide12ProcessingAlgorithm').then(m => ({ default: m.Slide12ProcessingAlgorithm }))),
  'Slide13BrowsersTitle': lazyWithPreload(() => import('@/generations/gen10/slides/Slide13BrowsersTitle').then(m => ({ default: m.Slide13BrowsersTitle }))),
  'Slide14BrowserProfiles': lazyWithPreload(() => import('@/generations/gen10/slides/Slide14BrowserProfiles').then(m => ({ default: m.Slide14BrowserProfiles }))),
  'Slide15ConfigureProfiles': lazyWithPreload(() => import('@/generations/gen10/slides/Slide15ConfigureProfiles').then(m => ({ default: m.Slide15ConfigureProfiles }))),
  'Slide16ExtensionAnchoring': lazyWithPreload(() => import('@/generations/gen10/slides/Slide16ExtensionAnchoring').then(m => ({ default: m.Slide16ExtensionAnchoring }))),
  'Slide17SecurityTitle': lazyWithPreload(() => import('@/generations/gen10/slides/Slide17SecurityTitle').then(m => ({ default: m.Slide17SecurityTitle }))),
  'Slide18SecurityMatrix': lazyWithPreload(() => import('@/generations/gen10/slides/Slide18SecurityMatrix').then(m => ({ default: m.Slide18SecurityMatrix }))),
  'Slide19SecuritySolutions': lazyWithPreload(() => import('@/generations/gen10/slides/Slide19SecuritySolutions').then(m => ({ default: m.Slide19SecuritySolutions }))),
  'Slide20BitwardenInstall': lazyWithPreload(() => import('@/generations/gen10/slides/Slide20BitwardenInstall').then(m => ({ default: m.Slide20BitwardenInstall }))),
  'Slide21ContextEngineering': lazyWithPreload(() => import('@/generations/gen10/slides/Slide21ContextEngineering').then(m => ({ default: m.Slide21ContextEngineering }))),
  'Slide22ContextProblemSolution': lazyWithPreload(() => import('@/generations/gen10/slides/Slide22ContextProblemSolution').then(m => ({ default: m.Slide22ContextProblemSolution }))),
  'Slide23ManualDigital': lazyWithPreload(() => import('@/generations/gen10/slides/Slide23ManualDigital').then(m => ({ default: m.Slide23ManualDigital }))),
  'Slide24ContextExamples': lazyWithPreload(() => import('@/generations/gen10/slides/Slide24ContextExamples').then(m => ({ default: m.Slide24ContextExamples }))),
  'Slide25OutputFormat': lazyWithPreload(() => import('@/generations/gen10/slides/Slide25OutputFormat').then(m => ({ default: m.Slide25OutputFormat }))),
  'Slide26Markdown': lazyWithPreload(() => import('@/generations/gen10/slides/Slide26Markdown').then(m => ({ default: m.Slide26Markdown }))),
  'Slide27RoadmapVertical': lazyWithPreload(() => import('@/generations/gen10/slides/Slide27RoadmapVertical').then(m => ({ default: m.Slide27RoadmapVertical }))),
  'Slide28WeeklyMission': lazyWithPreload(() => import('@/generations/gen10/slides/Slide28WeeklyMission').then(m => ({ default: m.Slide28WeeklyMission }))),
  'Slide29Closing': lazyWithPreload(() => import('@/generations/gen10/slides/Slide29Closing').then(m => ({ default: m.Slide29Closing }))),

  // ============================================
  // Gen 10 - Semana 2
  // ============================================
  'S2Slide01Cover': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide01Cover').then(m => ({ default: m.S2Slide01Cover }))),
  'S2Slide02YearAgency': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide02YearAgency').then(m => ({ default: m.S2Slide02YearAgency }))),
  'S2Slide02Timeline': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide02YearAgency').then(m => ({ default: m.S2Slide02YearAgency }))),
  'S2Slide03Transition': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide03Transition').then(m => ({ default: m.S2Slide03Transition }))),
  'S2Slide04Adoption': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide04Adoption').then(m => ({ default: m.S2Slide04Adoption }))),
  'S2Slide05Fragmentation': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide05Fragmentation').then(m => ({ default: m.S2Slide05Fragmentation }))),
  'S2Slide06Landscape': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide06Landscape').then(m => ({ default: m.S2Slide06Landscape }))),
  'S2Slide08Metrics': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide08Metrics').then(m => ({ default: m.S2Slide08Metrics }))),
  'S2Slide09ContextWindow': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide09ContextWindow').then(m => ({ default: m.S2Slide09ContextWindow }))),
  'S2Slide10ModelChoice': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide10ModelChoice').then(m => ({ default: m.S2Slide10ModelChoice }))),
  'S2Slide11Prompt': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide11Prompt').then(m => ({ default: m.S2Slide11Prompt }))),
  'S2Slide12Ambiguity': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide12Ambiguity').then(m => ({ default: m.S2Slide12Ambiguity }))),
  'S2Slide12Specificity': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide12Ambiguity').then(m => ({ default: m.S2Slide12Ambiguity }))),
  'S2Slide13Role': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide13Role').then(m => ({ default: m.S2Slide13Role }))),
  'S2Slide14Context': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide14Context').then(m => ({ default: m.S2Slide14Context }))),
  'S2Slide15CROP': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide15CROP').then(m => ({ default: m.S2Slide15CROP }))),
  'S2Slide16PromptEngineering': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide16PromptEngineering').then(m => ({ default: m.S2Slide16PromptEngineering }))),
  'S2Slide16Engineering': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide16PromptEngineering').then(m => ({ default: m.S2Slide16PromptEngineering }))),
  'S2Slide17Revolution': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide17Revolution').then(m => ({ default: m.S2Slide17Revolution }))),
  'S2Slide18Anatomy': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide18Anatomy').then(m => ({ default: m.S2Slide18Anatomy }))),
  'S2Slide19Protagonists': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide19Protagonists').then(m => ({ default: m.S2Slide19Protagonists }))),
  'S2Slide20Infrastructure': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide20Infrastructure').then(m => ({ default: m.S2Slide20Infrastructure }))),
  'S2Slide20MCP': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide20Infrastructure').then(m => ({ default: m.S2Slide20Infrastructure }))),
  'S2Slide21Kit': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide21Kit').then(m => ({ default: m.S2Slide21Kit }))),
  'S2Slide22Closing': lazyWithPreload(() => import('@/generations/gen10/slides-s2/S2Slide22Closing').then(m => ({ default: m.S2Slide22Closing }))),

  // ============================================
  // Gen 10 - Semana 3
  // ============================================
  'S3Slide01Cover': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide01Cover').then(m => ({ default: m.S3Slide01Cover }))),
  'S3Slide02Recap': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide02Recap').then(m => ({ default: m.S3Slide02Recap }))),
  'S3SlideAgenda': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3SlideAgenda').then(m => ({ default: m.S3SlideAgenda }))),
  'S3SlideDivider01Fundamentos': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3SlideDivider01Fundamentos').then(m => ({ default: m.S3SlideDivider01Fundamentos }))),
  'S3Slide03DesignFoundations': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide03DesignFoundations').then(m => ({ default: m.S3Slide03DesignFoundations }))),
  'S3Slide03Canvas': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide03Canvas').then(m => ({ default: m.S3Slide03Canvas }))),
  'S3Slide04VibeCoding': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide04VibeCoding').then(m => ({ default: m.S3Slide04VibeCoding }))),
  'S3SlideDivider02Herramientas': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3SlideDivider02Herramientas').then(m => ({ default: m.S3SlideDivider02Herramientas }))),
  'S3Slide05NotebookLM': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide05NotebookLM').then(m => ({ default: m.S3Slide05NotebookLM }))),
  'S3Slide06ClaudeCode': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide06ClaudeCode').then(m => ({ default: m.S3Slide06ClaudeCode }))),
  'S3Slide07Skills': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide07Skills').then(m => ({ default: m.S3Slide07Skills }))),
  'S3Slide07PresentationAI': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide07PresentationAI').then(m => ({ default: m.S3Slide07PresentationAI }))),
  'S3Slide08Automatizacion': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide08Automatizacion').then(m => ({ default: m.S3Slide08Automatizacion }))),
  'S3SlideDivider03Aplicacion': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3SlideDivider03Aplicacion').then(m => ({ default: m.S3SlideDivider03Aplicacion }))),
  'S3Slide09CRM': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide09CRM').then(m => ({ default: m.S3Slide09CRM }))),
  'S3Slide10MCPvsAPI': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide10MCPvsAPI').then(m => ({ default: m.S3Slide10MCPvsAPI }))),
  'S3Slide11Cursor': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide11Cursor').then(m => ({ default: m.S3Slide11Cursor }))),
  'S3Slide14VideoAI': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide14VideoAI').then(m => ({ default: m.S3Slide14VideoAI }))),
  'S3Slide12Closing': lazyWithPreload(() => import('@/generations/gen10/slides-s3/S3Slide12Closing').then(m => ({ default: m.S3Slide12Closing }))),

  // ============================================
  // Gen 10 - Semana 4
  // ============================================
  'S4Slide01Cover': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide01Cover').then(m => ({ default: m.S4Slide01Cover }))),
  'S4Slide02Recap': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide02Recap').then(m => ({ default: m.S4Slide02Recap }))),
  'S4Slide03Architecture': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide03Architecture').then(m => ({ default: m.S4Slide03Architecture }))),
  'S4Slide04CRUD': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide04CRUD').then(m => ({ default: m.S4Slide04CRUD }))),
  'S4Slide05GeminiCanvas': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide05GeminiCanvas').then(m => ({ default: m.S4Slide05GeminiCanvas }))),
  'S4Slide06Lovable': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide06Lovable').then(m => ({ default: m.S4Slide06Lovable }))),
  'S4Slide07Supabase': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide07Supabase').then(m => ({ default: m.S4Slide07Supabase }))),
  'S4Slide08DataModeling': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide08DataModeling').then(m => ({ default: m.S4Slide08DataModeling }))),
  'S4Slide09GitHub': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide09GitHub').then(m => ({ default: m.S4Slide09GitHub }))),
  'S4Slide10CursorClaude': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide10CursorClaude').then(m => ({ default: m.S4Slide10CursorClaude }))),
  'S4Slide11CompleteFlow': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide11CompleteFlow').then(m => ({ default: m.S4Slide11CompleteFlow }))),
  'S4Slide12DecisionGuide': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide12DecisionGuide').then(m => ({ default: m.S4Slide12DecisionGuide }))),
  'S4Slide13Authentication': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide13Authentication').then(m => ({ default: m.S4Slide13Authentication }))),
  'S4Slide14CaseStudy': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide14CaseStudy').then(m => ({ default: m.S4Slide14CaseStudy }))),
  'S4Slide15Closing': lazyWithPreload(() => import('@/generations/gen10/slides-s4/S4Slide15Closing').then(m => ({ default: m.S4Slide15Closing }))),

  // ============================================
  // Templates Clase 02
  // ============================================
  'tpl02:Slide02Agenda': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide02Agenda').then(m => ({ default: m.Slide02Agenda }))),
  'tpl02:Slide03Mod01Divider': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide03Mod01Divider').then(m => ({ default: m.Slide03Mod01Divider }))),
  'tpl02:Slide05Practicante': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide05Practicante').then(m => ({ default: m.Slide05Practicante }))),
  'tpl02:Slide08MetaPrompting': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide08MetaPrompting').then(m => ({ default: m.Slide08MetaPrompting }))),
  'tpl02:Slide09Mod02Divider': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide09Mod02Divider').then(m => ({ default: m.Slide09Mod02Divider }))),
  'tpl02:Slide10JefeDeObra': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide10JefeDeObra').then(m => ({ default: m.Slide10JefeDeObra }))),
  'tpl02:Slide11Lienzos': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide11Lienzos').then(m => ({ default: m.Slide11Lienzos }))),
  'tpl02:Slide12Mod03Divider': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide12Mod03Divider').then(m => ({ default: m.Slide12Mod03Divider }))),
  'tpl02:Slide13SuiteClaude': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide13SuiteClaude').then(m => ({ default: m.Slide13SuiteClaude }))),
  'tpl02:Slide14NotebookLM': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide14NotebookLM').then(m => ({ default: m.Slide14NotebookLM }))),
  'tpl02:Slide15NanoBanana': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide15NanoBanana').then(m => ({ default: m.Slide15NanoBanana }))),
  'tpl02:Slide16Mod04Divider': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide16Mod04Divider').then(m => ({ default: m.Slide16Mod04Divider }))),
  'tpl02:Slide18Mod05Divider': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide18Mod05Divider').then(m => ({ default: m.Slide18Mod05Divider }))),
  'tpl02:Slide20Manus': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide20Manus').then(m => ({ default: m.Slide20Manus }))),
  'tpl02:Slide21Operator': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide21Operator').then(m => ({ default: m.Slide21Operator }))),
  'tpl02:Slide22Director': lazyWithPreload(() => import('@/templates/clase-02-ia-productividad/slides/Slide22Director').then(m => ({ default: m.Slide22Director }))),

  // ============================================
  // Gen 11 - Semana 1
  // ============================================
  // Cover + Agenda
  'G11S1Slide01Cover': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide01Cover').then(m => ({ default: m.G11S1Slide01Cover }))),
  'G11S1Slide02Participants': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide02Participants').then(m => ({ default: m.G11S1Slide02Participants }))),
  'G11S1Slide02Agenda': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide02Agenda').then(m => ({ default: m.G11S1Slide02Agenda }))),
  // Módulo 01: Contexto y Fundamentos
  'G11S1Slide03Contexto': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide03Contexto').then(m => ({ default: m.G11S1Slide03Contexto }))),
  'G11S1Slide04Bio': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide04Bio').then(m => ({ default: m.G11S1Slide04Bio }))),
  'G11S1Slide05Mission': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide05Mission').then(m => ({ default: m.G11S1Slide05Mission }))),
  'G11S1Slide06SharpenSaw': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide06SharpenSaw').then(m => ({ default: m.G11S1Slide06SharpenSaw }))),
  'G11S1Slide07HowWeWork': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide07HowWeWork').then(m => ({ default: m.G11S1Slide07HowWeWork }))),
  'G11S1Slide08Roadmap': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide08Roadmap').then(m => ({ default: m.G11S1Slide08Roadmap }))),
  // Módulo 02: Inbox Zero
  'G11S1Slide09InboxZeroDivider': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide09InboxZeroDivider').then(m => ({ default: m.G11S1Slide09InboxZeroDivider }))),
  'G11S1Slide10InboxProblems': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide10InboxProblems').then(m => ({ default: m.G11S1Slide10InboxProblems }))),
  'G11S1Slide10bBenefits': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide10bBenefits').then(m => ({ default: m.G11S1Slide10bBenefits }))),
  'G11S1Slide11InboxMethod': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide11InboxMethod').then(m => ({ default: m.G11S1Slide11InboxMethod }))),
  // Módulo 03: Navegadores
  'G11S1Slide12BrowsersDivider': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide12BrowsersDivider').then(m => ({ default: m.G11S1Slide12BrowsersDivider }))),
  'G11S1Slide13BrowserProfiles': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide13BrowserProfiles').then(m => ({ default: m.G11S1Slide13BrowserProfiles }))),
  // Módulo 04: Contraseñas
  'G11S1Slide14SecurityDivider': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide14SecurityDivider').then(m => ({ default: m.G11S1Slide14SecurityDivider }))),
  'G11S1Slide15Bitwarden': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide15Bitwarden').then(m => ({ default: m.G11S1Slide15Bitwarden }))),
  // Módulo 05: Bonus IA Personalizada
  'G11S1Slide16BonusDivider': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide16BonusDivider').then(m => ({ default: m.G11S1Slide16BonusDivider }))),
  'G11S1Slide17CustomInstructions': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide17CustomInstructions').then(m => ({ default: m.G11S1Slide17CustomInstructions }))),
  // Cierre
  'G11S1Slide18Closing': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide18Closing').then(m => ({ default: m.G11S1Slide18Closing }))),
  // Legacy aliases (keep for DB entries that still reference old names)
  'G11S1Slide04PodcastRef': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide04Bio').then(m => ({ default: m.G11S1Slide04Bio }))),
  'G11S1Slide04Roadmap': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide08Roadmap').then(m => ({ default: m.G11S1Slide08Roadmap }))),
  'G11S1Slide05InboxZeroDivider': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide09InboxZeroDivider').then(m => ({ default: m.G11S1Slide09InboxZeroDivider }))),
  'G11S1Slide06InboxZeroMethod': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide11InboxMethod').then(m => ({ default: m.G11S1Slide11InboxMethod }))),
  'G11S1Slide08BrowsersDivider': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide12BrowsersDivider').then(m => ({ default: m.G11S1Slide12BrowsersDivider }))),
  'G11S1Slide09BrowserProfiles': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide13BrowserProfiles').then(m => ({ default: m.G11S1Slide13BrowserProfiles }))),
  'G11S1Slide11SecurityDivider': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide14SecurityDivider').then(m => ({ default: m.G11S1Slide14SecurityDivider }))),
  'G11S1Slide12Bitwarden': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide15Bitwarden').then(m => ({ default: m.G11S1Slide15Bitwarden }))),
  'G11S1Slide13ContextDivider': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide16BonusDivider').then(m => ({ default: m.G11S1Slide16BonusDivider }))),
  'G11S1Slide14ContextMethod': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide17CustomInstructions').then(m => ({ default: m.G11S1Slide17CustomInstructions }))),
  'G11S1Slide15Closing': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide18Closing').then(m => ({ default: m.G11S1Slide18Closing }))),
  'G11S1SlideMission': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide05Mission').then(m => ({ default: m.G11S1Slide05Mission }))),
  'G11S1SlideHowWeWork': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide07HowWeWork').then(m => ({ default: m.G11S1Slide07HowWeWork }))),
  'G11S1SlideSharpenStory': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide06SharpenSaw').then(m => ({ default: m.G11S1Slide06SharpenSaw }))),
  'G11S1SlideSharpenPhilosophy': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide06SharpenSaw').then(m => ({ default: m.G11S1Slide06SharpenSaw }))),
  'G11S1Slide07InboxZeroFilters': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide11InboxMethod').then(m => ({ default: m.G11S1Slide11InboxMethod }))),
  'G11S1Slide10Extensions': lazyWithPreload(() => import('@/generations/gen11/slides-s1/G11S1Slide13BrowserProfiles').then(m => ({ default: m.G11S1Slide13BrowserProfiles }))),
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
