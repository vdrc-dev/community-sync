import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Terminal, AlertTriangle } from "lucide-react";

function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-primary/30 z-0"
        animate={{ x: [0, -2, 3, 0], y: [0, 1, -1, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-accent/20 z-0"
        animate={{ x: [0, 3, -2, 0], y: [0, -1, 2, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4, delay: 0.15 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function TerminalLine({ text, delay, className = '' }: { text: string; delay: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`font-mono text-sm ${className}`}
    >
      {text}
    </motion.div>
  );
}

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        {/* Error code */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="text-8xl sm:text-9xl font-mono font-bold leading-none">
            <GlitchText text="404" className="text-primary" />
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-px w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-strong rounded-xl p-5 border-red-500/20 mb-8"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="text-muted-foreground/60 text-xs ml-2 font-mono">vdrc://error</span>
          </div>
          <div className="space-y-1.5">
            <TerminalLine
              text={`$ cd ${location.pathname}`}
              delay={400}
              className="text-muted-foreground"
            />
            <TerminalLine
              text="[ERROR] Ruta no encontrada"
              delay={900}
              className="text-red-400"
            />
            <TerminalLine
              text={`> La ruta "${location.pathname}" no existe en el portal`}
              delay={1400}
              className="text-yellow-400"
            />
            <TerminalLine
              text="> Sugerencia: vuelve al inicio o navega usando el menu"
              delay={1900}
              className="text-muted-foreground"
            />
            <TerminalLine
              text="$ _"
              delay={2400}
              className="text-primary"
            />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-6"
        >
          <div>
            <h2 className="text-xl font-mono font-bold mb-2">Pagina no encontrada</h2>
            <p className="text-sm text-muted-foreground">
              Esta ruta no existe en el Portal VDRC. Puede que el enlace haya cambiado o que hayas escrito mal la URL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-mono group">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                VOLVER AL INICIO
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-mono border-border/50 hover:border-primary/50">
              <a onClick={() => window.history.back()} className="cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                PAGINA ANTERIOR
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
