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
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy loaded pages for optimal code splitting
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Generations = lazy(() => import("./pages/Generations"));
const GenerationDetail = lazy(() => import("./pages/GenerationDetail"));
const Tools = lazy(() => import("./pages/Tools"));
const Forum = lazy(() => import("./pages/Forum"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const Profile = lazy(() => import("./pages/Profile"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));
const Prompts = lazy(() => import("./pages/Prompts"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const QuickNotes = lazy(() => import("./pages/QuickNotes"));
const ROICalculatorPage = lazy(() => import("./pages/ROICalculator"));
const MyToolsPage = lazy(() => import("./pages/MyTools"));
const Playground = lazy(() => import("./pages/Playground"));
const Workflows = lazy(() => import("./pages/Workflows"));
const WorkflowDetail = lazy(() => import("./pages/WorkflowDetail"));
const AdminPresentations = lazy(() => import("./pages/AdminPresentations"));
const PresentationView = lazy(() => import("./pages/PresentationView"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient with aggressive caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
      gcTime: 1000 * 60 * 30, // 30 minutes - cache retention
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnReconnect: 'always',
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

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
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/generations" element={<Generations />} />
              <Route path="/generations/:code" element={<GenerationDetail />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/prompts" element={<Prompts />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/quick-notes" element={<QuickNotes />} />
              <Route path="/roi-calculator" element={<ROICalculatorPage />} />
              <Route path="/my-tools" element={<MyToolsPage />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/workflows/:id" element={<WorkflowDetail />} />
              <Route path="/admin/presentations" element={<AdminPresentations />} />
              <Route path="/presentations/:id?" element={<PresentationView />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
