import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

interface InvitePreviewProps {
  email: string;
  name: string;
  role: 'participant' | 'admin';
}

export function InvitePreview({ email, name, role }: InvitePreviewProps) {
  const displayName = name || email.split('@')[0] || 'usuario';
  const hasEmail = email.length > 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="sticky top-8"
    >
      <div className="text-xs font-mono tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
        <Mail className="w-3 h-3" />
        VISTA PREVIA DEL EMAIL
      </div>

      <div className="relative rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm overflow-hidden">
        {/* Email header mock */}
        <div className="px-4 py-3 border-b border-border/20 bg-muted/10">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate text-[11px]">Portal VDRC</p>
              <p className="text-muted-foreground truncate text-[10px]">noreply@vdrc.cl</p>
            </div>
          </div>
        </div>

        {/* Email body mock */}
        <div className="p-4 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayName}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-sm font-semibold">
                Hola{' '}
                <span className="text-primary">
                  {hasEmail ? displayName : '...'}
                </span>
                ,
              </h3>
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Has sido invitado a unirte al{' '}
            <span className="text-foreground font-medium">Portal VDRC</span>{' '}
            como{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={role}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`font-medium ${
                  role === 'admin' ? 'text-yellow-500' : 'text-primary'
                }`}
              >
                {role === 'admin' ? 'administrador' : 'participante'}
              </motion.span>
            </AnimatePresence>
            .
          </p>

          {/* Feature preview cards */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Clases', emoji: '🎓' },
              { label: 'Workflows', emoji: '⚡' },
              { label: 'Comunidad', emoji: '🤝' },
              { label: 'Herramientas', emoji: '🛠️' },
            ].map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="p-2 rounded-lg bg-muted/20 border border-border/20 text-center"
              >
                <span className="text-base">{feat.emoji}</span>
                <p className="text-[10px] text-muted-foreground mt-0.5">{feat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA button mock */}
          <div className="pt-2">
            <div className="w-full py-2 px-4 rounded-lg bg-primary/20 border border-primary/30 text-center">
              <span className="text-xs font-medium text-primary flex items-center justify-center gap-1.5">
                Crear mi cuenta
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Recipient line */}
          <AnimatePresence>
            {hasEmail && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[10px] text-muted-foreground/50 text-center pt-1 border-t border-border/10"
              >
                Se enviará a{' '}
                <span className="text-muted-foreground">{email}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle shimmer overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, hsl(var(--primary) / 0.03) 50%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
