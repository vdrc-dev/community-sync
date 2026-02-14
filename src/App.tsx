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

// ─────────────────────────────────────────────────────────────
// Lazy-loaded pages — grouped by domain
// ─────────────────────────────────────────────────────────────

// Core
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Generations & Learning
const Generations = lazy(() => import("./pages/Generations"));
const GenerationDetail = lazy(() => import("./pages/GenerationDetail"));

// Presentations (legacy generic viewer)
const PresentationView = lazy(() => import("./pages/PresentationView"));
const ModulePresentationView = lazy(() => import("./pages/ModulePresentationView"));

// VDRC Presentation Engine (component-based slides)
const GenerationPage = lazy(() => import("./pages/GenerationPage"));
const AlumnosHub = lazy(() => import("./pages/AlumnosHub"));
const AlumnosGeneration = lazy(() => import("./pages/AlumnosGeneration"));

// Tools & Productivity
const Tools = lazy(() => import("./pages/Tools"));
const MyToolsPage = lazy(() => import("./pages/MyTools"));
const Workflows = lazy(() => import("./pages/Workflows"));
const WorkflowDetail = lazy(() => import("./pages/WorkflowDetail"));
const Playground = lazy(() => import("./pages/Playground"));
const Prompts = lazy(() => import("./pages/Prompts"));
const ROICalculatorPage = lazy(() => import("./pages/ROICalculator"));

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
          <CommandPalette />
          <QuickNoteButton />
          <OnboardingTour />
          <GlobalNotificationListener />
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* ── Core ─────────────────────────────── */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />

              {/* ── Generations & Learning ────────────── */}
              <Route path="/generations" element={<Generations />} />
              <Route path="/generations/:code" element={<GenerationDetail />} />

              {/* ── Presentations ─────────────────────── */}
              <Route path="/presentations/module/:number" element={<ModulePresentationView />} />
              <Route path="/presentations/:id?" element={<PresentationView />} />

              {/* ── Tools & Productivity ──────────────── */}
              <Route path="/tools" element={<Tools />} />
              <Route path="/my-tools" element={<MyToolsPage />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/workflows/:id" element={<WorkflowDetail />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/prompts" element={<Prompts />} />
              <Route path="/roi-calculator" element={<ROICalculatorPage />} />

              {/* ── Community & Interaction ───────────── */}
              <Route path="/community" element={<Community />} />
              <Route path="/community/:slug" element={<CommunitySpace />} />
              <Route path="/community/:slug/post/:postId" element={<CommunitySpace />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/calendar" element={<CalendarPage />} />

              {/* ── Personal ─────────────────────────── */}
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/quick-notes" element={<QuickNotes />} />

              {/* ── Admin ────────────────────────────── */}
              <Route path="/admin/presentations" element={<AdminPresentations />} />
              <Route path="/admin/users" element={<AdminUsers />} />

              {/* ── VDRC Slide Engine ─────────────────── */}
              <Route path="/alumnos" element={<AlumnosHub />} />
              <Route path="/alumnos/:genId" element={<AlumnosGeneration />} />
              <Route path="/slides/:genId" element={<GenerationPage />} />

              {/* ── Catch-all ────────────────────────── */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
