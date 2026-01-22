import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CommandPalette } from "@/components/command/CommandPalette";
import { EasterEggManager } from "@/components/easter-eggs/EasterEggManager";
import { QuickNoteButton } from "@/components/quick-notes/QuickNoteButton";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Generations from "./pages/Generations";
import GenerationDetail from "./pages/GenerationDetail";
import Tools from "./pages/Tools";
import Forum from "./pages/Forum";
import CalendarPage from "./pages/CalendarPage";
import Profile from "./pages/Profile";
import LeaderboardPage from "./pages/LeaderboardPage";
import Prompts from "./pages/Prompts";
import Bookmarks from "./pages/Bookmarks";
import QuickNotes from "./pages/QuickNotes";
import ROICalculatorPage from "./pages/ROICalculator";
import MyToolsPage from "./pages/MyTools";
import Playground from "./pages/Playground";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CommandPalette />
          <EasterEggManager />
          <QuickNoteButton />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
