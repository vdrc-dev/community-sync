import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CommandPalette } from "@/components/command/CommandPalette";
import { QuickNoteButton } from "@/components/quick-notes/QuickNoteButton";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { GlobalNotificationListener } from "@/components/notifications/GlobalNotificationListener";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { KeyboardShortcutsHint } from "@/components/ui/keyboard-shortcuts-hint";
import { ScrollRestoration } from "@/components/layout/ScrollRestoration";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// ─────────────────────────────────────────────────────────────
// Lazy-loaded pages — grouped by domain
// ─────────────────────────────────────────────────────────────

// Core
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Welcome = lazy(() => import("./pages/Welcome"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Generations & Learning
const Generations = lazy(() => import("./pages/Generations"));
const GenerationDetail = lazy(() => import("./pages/GenerationDetail"));

// VDRC Presentation Engine (component-based slides)
const GenerationPage = lazy(() => import("./pages/GenerationPage"));

// Tools & Productivity
const Tools = lazy(() => import("./pages/Tools"));
const MyToolsPage = lazy(() => import("./pages/MyTools"));
const Workflows = lazy(() => import("./pages/Workflows"));
const WorkflowDetail = lazy(() => import("./pages/WorkflowDetail"));
const Playground = lazy(() => import("./pages/Playground"));
const Prompts = lazy(() => import("./pages/Prompts"));
const ROICalculatorPage = lazy(() => import("./pages/ROICalculator"));
const Dictionary = lazy(() => import("./pages/Dictionary"));
const AIPersonalizationGuide = lazy(() => import("./pages/AIPersonalizationGuide"));
const SetupGuide = lazy(() => import("./pages/SetupGuide"));

// Community & Interaction
const Community = lazy(() => import("./pages/Community"));
const CommunitySpace = lazy(() => import("./pages/CommunitySpace"));
const Chat = lazy(() => import("./pages/Chat"));
const Forum = lazy(() => import("./pages/Forum"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));

// Personal
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const QuickNotes = lazy(() => import("./pages/QuickNotes"));

// Admin
const AdminPresentations = lazy(() => import("./pages/AdminPresentations"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));

// ─────────────────────────────────────────────────────────────
// QueryClient — optimized caching
// ─────────────────────────────────────────────────────────────

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always",
      retry: 2,
      retryDelay: (i) => Math.min(1000 * 2 ** i, 30000),
    },
    mutations: { retry: 1 },
  },
});

// Hook wrapper — needs Router context
function KeyboardNavProvider() {
  useKeyboardNav();
  return null;
}

// ─────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <KeyboardNavProvider />
          <ScrollProgress />
          <CommandPalette />
          <QuickNoteButton />
          <KeyboardShortcutsHint />
          <OnboardingTour />
          <GlobalNotificationListener />
          <ScrollRestoration />
          <ScrollToTop />
          <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* ── Public ────────────────────────────── */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/welcome" element={<Welcome />} />

              {/* ── Authenticated ─────────────────────── */}
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              {/* ── Generations & Learning ────────────── */}
              <Route path="/generations" element={<ProtectedRoute><Generations /></ProtectedRoute>} />
              <Route path="/generations/:code" element={<ProtectedRoute><GenerationDetail /></ProtectedRoute>} />

              {/* ── Tools & Productivity ──────────────── */}
              <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
              <Route path="/my-tools" element={<ProtectedRoute><MyToolsPage /></ProtectedRoute>} />
              <Route path="/workflows" element={<ProtectedRoute><Workflows /></ProtectedRoute>} />
              <Route path="/workflows/:id" element={<ProtectedRoute><WorkflowDetail /></ProtectedRoute>} />
              <Route path="/playground" element={<ProtectedRoute><Playground /></ProtectedRoute>} />
              <Route path="/prompts" element={<ProtectedRoute><Prompts /></ProtectedRoute>} />
              <Route path="/roi-calculator" element={<ProtectedRoute><ROICalculatorPage /></ProtectedRoute>} />
              <Route path="/dictionary" element={<ProtectedRoute><Dictionary /></ProtectedRoute>} />
              <Route path="/personalizacion-ia" element={<ProtectedRoute><AIPersonalizationGuide /></ProtectedRoute>} />
              <Route path="/guia-instalacion" element={<ProtectedRoute><SetupGuide /></ProtectedRoute>} />

              {/* ── Community & Interaction ───────────── */}
              <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
              <Route path="/community/:slug" element={<ProtectedRoute><CommunitySpace /></ProtectedRoute>} />
              <Route path="/community/:slug/post/:postId" element={<ProtectedRoute><CommunitySpace /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />

              {/* ── Personal ─────────────────────────── */}
              <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
              <Route path="/quick-notes" element={<ProtectedRoute><QuickNotes /></ProtectedRoute>} />

              {/* ── Admin ────────────────────────────── */}
              <Route path="/admin/presentations" element={<ProtectedRoute adminOnly><AdminPresentations /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />

              {/* ── VDRC Slide Engine (público para compartir) ── */}
              <Route path="/slides/:genId" element={<GenerationPage />} />

              {/* ── Catch-all ────────────────────────── */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
