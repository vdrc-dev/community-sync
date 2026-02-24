import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify("https://xhyzzwjjtlxhdhvauzjx.supabase.co"),
    'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoeXp6d2pqdGx4aGRodmF1emp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNDUwNzcsImV4cCI6MjA4NDYyMTA3N30.5Us4hSmxoCykBsQi6qsRjYk3GW3ORKR03kZwMOPQFtc"),
    'import.meta.env.VITE_SUPABASE_PROJECT_ID': JSON.stringify("xhyzzwjjtlxhdhvauzjx"),
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-recharts': ['recharts'],
          'vendor-mermaid': ['mermaid'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-query': ['@tanstack/react-query'],
        },
      },
    },
  },
}));
