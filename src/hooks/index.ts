/**
 * ═══════════════════════════════════════════════════
 * VDRC PORTAL — Hooks Architecture
 * ═══════════════════════════════════════════════════
 *
 * Organized by domain. Import directly from the hook file:
 *   import { useAuth } from '@/hooks/useAuth';
 *
 * ── Core ─────────────────────────────────────────
 * useAuth          — Authentication, session, admin role check
 * use-mobile       — Mobile viewport detection
 * use-toast        — Toast notifications (shadcn)
 * usePerformance   — Debounce, throttle, intersection observer
 * usePrefetcher    — Route prefetch on hover
 *
 * ── Generations & Learning ───────────────────────
 * useGenerations   — Fetch generations, create, delete
 * useProgress      — Class completion tracking
 * useActivityResume— Track last viewed resource
 * useChallenges    — Weekly/daily challenges
 * useStreaks       — Login streaks & multipliers
 *
 * ── Presentations ────────────────────────────────
 * usePresentations         — CRUD class presentations
 * usePresentationState     — Slide navigation state
 * usePresentationKeyboard  — Keyboard shortcuts for slides
 *
 * ── Tools & Productivity ─────────────────────────
 * useToolLogs              — Tool usage tracking
 * useAutomations           — ROI automations
 * useWorkflows             — Workflow templates
 * useWorkflowExecutions    — Workflow execution history
 * usePrompts               — Prompt library
 * usePromptPlayground      — AI playground state
 *
 * ── Community & Interaction ──────────────────────
 * useSpaces         — Community spaces & posts
 * useChat           — Real-time chat channels & messages
 * useChatNotifications — Chat notification sounds
 * usePresence       — Online users tracking
 * useNotifications  — Push notifications
 * useGamification   — Points, badges, levels
 *
 * ── Personal ─────────────────────────────────────
 * useBookmarks      — Saved resources
 * useNotes          — Class notes per user
 * useQuickNotes     — Quick notes widget
 *
 * ── Admin ────────────────────────────────────────
 * useInvitations    — Admin invitation system
 */

// This file serves as documentation only.
// Import hooks directly from their files.
export {};
