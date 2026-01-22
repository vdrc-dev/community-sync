import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CommandPalette } from "@/components/command/CommandPalette";

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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
