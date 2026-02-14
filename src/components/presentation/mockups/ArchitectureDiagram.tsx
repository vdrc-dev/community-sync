import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, Monitor, Server, Database, Shield, Zap } from 'lucide-react';

interface ArchitectureDiagramProps {
  variant?: 'simple' | 'detailed';
  animated?: boolean;
  className?: string;
}

export function ArchitectureDiagram({
  variant = 'detailed',
  animated = true,
  className,
}: ArchitectureDiagramProps) {
  const getMotionProps = (delay: number) =>
    animated
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.4 },
        }
      : {};

  return (
    <div className={cn('relative', className)}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-emerald-500/5 rounded-2xl" />
      
      <div className="relative p-6 space-y-4">
        {/* Users Layer */}
        <motion.div 
          className="flex justify-center"
          {...getMotionProps(0)}
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Usuarios</span>
            <div className="flex -space-x-2 ml-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-blue-500/30 border-2 border-background flex items-center justify-center">
                  <span className="text-[8px] text-blue-400">👤</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arrow down */}
        <motion.div 
          className="flex justify-center"
          {...getMotionProps(0.1)}
        >
          <div className="w-px h-8 bg-gradient-to-b from-blue-500/50 to-pink-500/50 relative">
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b border-pink-500/50"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Frontend Layer */}
        <motion.div 
          className="flex justify-center"
          {...getMotionProps(0.2)}
        >
          <div className="relative px-6 py-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
            <div className="absolute -top-2 left-4 px-2 bg-background text-[10px] text-pink-400 font-medium">
              FRONT-END
            </div>
            <div className="flex items-center gap-4">
              <Monitor className="w-5 h-5 text-pink-400" />
              <div>
                <span className="text-sm font-semibold text-pink-400">Lovable</span>
                <p className="text-[10px] text-muted-foreground">React + TypeScript</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Arrow down with label */}
        <motion.div 
          className="flex justify-center items-center gap-2"
          {...getMotionProps(0.3)}
        >
          <div className="w-px h-8 bg-gradient-to-b from-pink-500/50 to-emerald-500/50 relative">
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b border-emerald-500/50"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </div>
          <span className="px-2 py-1 rounded bg-secondary/50 text-[10px] text-muted-foreground">
            API REST
          </span>
        </motion.div>

        {/* Backend Layer */}
        <motion.div 
          className="flex justify-center"
          {...getMotionProps(0.4)}
        >
          <div className="relative px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="absolute -top-2 left-4 px-2 bg-background text-[10px] text-emerald-400 font-medium">
              BACK-END
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-xs font-semibold text-emerald-400">Supabase</span>
                  <p className="text-[10px] text-muted-foreground">PostgreSQL</p>
                </div>
              </div>
              <div className="w-px h-8 bg-emerald-500/20" />
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10">
                  <Database className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px]">DB</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px]">Auth</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10">
                  <Zap className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px]">API</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10">
                  <span className="text-[10px]">RLS</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zero code badge */}
        <motion.div 
          className="flex justify-center pt-2"
          {...getMotionProps(0.5)}
        >
          <motion.div 
            className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            animate={{ boxShadow: ['0 0 0 0 hsl(158 55% 42% / 0)', '0 0 20px 0 hsl(158 55% 42% / 0.3)', '0 0 0 0 hsl(158 55% 42% / 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs font-semibold text-primary">✨ 0 líneas de código backend</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
