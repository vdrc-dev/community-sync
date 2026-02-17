import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useInvitations } from '@/hooks/useInvitations';
import { Loader2, Mail, UserPlus, X, Users, User, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvitePreview } from './InvitePreview';

interface EmailChip {
  email: string;
  valid: boolean;
  status: 'idle' | 'sending' | 'sent' | 'error';
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseEmails(raw: string): string[] {
  return raw
    .split(/[,;\n\r]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0);
}

export function InviteUserForm() {
  const [mode, setMode] = useState<'single' | 'batch'>('single');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'participant' | 'admin'>('participant');
  const [batchText, setBatchText] = useState('');
  const [chips, setChips] = useState<EmailChip[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successEmails, setSuccessEmails] = useState<string[]>([]);
  const { inviteUser, isInviting } = useInvitations();
  const { toast } = useToast();
  const isSendingRef = useRef(false);

  const addChipsFromText = useCallback((text: string) => {
    const emails = parseEmails(text);
    if (emails.length === 0) return;

    setChips((prev) => {
      const existing = new Set(prev.map((c) => c.email));
      const newChips = emails
        .filter((e) => !existing.has(e))
        .map((e) => ({ email: e, valid: EMAIL_REGEX.test(e), status: 'idle' as const }));
      return [...prev, ...newChips];
    });
    setBatchText('');
  }, []);

  const removeChip = (email: string) => {
    setChips((prev) => prev.filter((c) => c.email !== email));
  };

  const handleBatchPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    addChipsFromText(pasted);
  };

  const handleBatchKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && batchText.trim()) {
      e.preventDefault();
      addChipsFromText(batchText);
    }
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSendingRef.current) return;

    isSendingRef.current = true;
    try {
      await inviteUser({
        email: email.trim(),
        full_name: fullName.trim() || undefined,
        role,
      });
      setSuccessEmails([email.trim()]);
      setShowSuccess(true);
      setEmail('');
      setFullName('');
      setRole('participant');
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (error) {
      toast({
        title: 'Error al invitar',
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: 'destructive',
      });
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleBatchSubmit = async () => {
    const validChips = chips.filter((c) => c.valid && c.status === 'idle');
    if (validChips.length === 0 || isSendingRef.current) return;

    isSendingRef.current = true;
    const sentEmails: string[] = [];

    for (let i = 0; i < validChips.length; i++) {
      const chip = validChips[i];
      setChips((prev) =>
        prev.map((c) => (c.email === chip.email ? { ...c, status: 'sending' } : c))
      );

      try {
        await inviteUser({ email: chip.email, role });
        setChips((prev) =>
          prev.map((c) => (c.email === chip.email ? { ...c, status: 'sent' } : c))
        );
        sentEmails.push(chip.email);
      } catch {
        setChips((prev) =>
          prev.map((c) => (c.email === chip.email ? { ...c, status: 'error' } : c))
        );
      }

      if (i < validChips.length - 1) {
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    if (sentEmails.length > 0) {
      setSuccessEmails(sentEmails);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setChips((prev) => prev.filter((c) => c.status !== 'sent'));
      }, 4000);
    }

    isSendingRef.current = false;
  };

  const validChipCount = chips.filter((c) => c.valid && c.status === 'idle').length;
  const currentEmail = mode === 'single' ? email : chips[0]?.email || '';
  const currentName = mode === 'single' ? fullName : '';

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="glass-strong border-primary/10 relative overflow-hidden">
          {/* Success overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-xl"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">
                    {successEmails.length === 1 ? 'Invitación enviada' : `${successEmails.length} invitaciones enviadas`}
                  </h3>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {successEmails.map((em, i) => (
                      <motion.div
                        key={em}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        className="flex items-center gap-2 justify-center text-sm text-muted-foreground"
                      >
                        <Sparkles className="w-3 h-3 text-green-500" />
                        <span>{em}</span>
                      </motion.div>
                    ))}
                  </div>
                  {/* Particle burst */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        background: ['hsl(160 70% 55%)', 'hsl(185 70% 60%)', 'hsl(263 60% 65%)', 'hsl(38 80% 60%)'][i % 4],
                        left: '50%',
                        top: '40%',
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos((i * Math.PI * 2) / 12) * (80 + Math.random() * 60),
                        y: Math.sin((i * Math.PI * 2) / 12) * (80 + Math.random() * 60),
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Invitar Usuarios</CardTitle>
                  <CardDescription>
                    {mode === 'single'
                      ? 'Envía una invitación individual por email'
                      : 'Pega una lista de emails para invitar en lote'}
                  </CardDescription>
                </div>
              </div>

              {/* Mode toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/30 border border-border/30">
                <button
                  type="button"
                  onClick={() => setMode('single')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    mode === 'single'
                      ? 'bg-primary/15 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <User className="w-3 h-3" />
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setMode('batch')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    mode === 'batch'
                      ? 'bg-primary/15 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  Lote
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {mode === 'single' ? (
                <motion.form
                  key="single"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSingleSubmit}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="invite-email" className="font-mono text-xs tracking-wider">
                        Email *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="invite-email"
                          type="email"
                          placeholder="usuario@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-muted/30 border-border/50 focus:border-primary/50"
                          disabled={isInviting}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-name" className="font-mono text-xs tracking-wider">
                        Nombre completo
                      </Label>
                      <Input
                        id="invite-name"
                        type="text"
                        placeholder="Nombre del invitado"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-muted/30 border-border/50 focus:border-primary/50"
                        disabled={isInviting}
                      />
                    </div>
                  </div>

                  <div className="flex items-end gap-4">
                    <div className="space-y-2 w-48">
                      <Label className="font-mono text-xs tracking-wider">Rol</Label>
                      <Select
                        value={role}
                        onValueChange={(v) => setRole(v as 'participant' | 'admin')}
                        disabled={isInviting}
                      >
                        <SelectTrigger className="bg-muted/30 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="participant">Participante</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      disabled={isInviting || !email.trim()}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono transition-all duration-300 hover:scale-[1.02]"
                    >
                      {isInviting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar Invitación
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="batch"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Email chips */}
                  {chips.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-border/30 bg-muted/10 min-h-[48px]">
                      <AnimatePresence>
                        {chips.map((chip) => (
                          <motion.div
                            key={chip.email}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                              chip.status === 'sent'
                                ? 'bg-green-500/10 border-green-500/30 text-green-500'
                                : chip.status === 'sending'
                                  ? 'bg-primary/10 border-primary/30 text-primary animate-pulse'
                                  : chip.status === 'error'
                                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                    : chip.valid
                                      ? 'bg-muted/30 border-border/50 text-foreground'
                                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                            }`}
                          >
                            {chip.status === 'sent' ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : chip.status === 'sending' ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : chip.status === 'error' ? (
                              <AlertCircle className="w-3 h-3" />
                            ) : !chip.valid ? (
                              <AlertCircle className="w-3 h-3" />
                            ) : (
                              <Mail className="w-3 h-3 opacity-50" />
                            )}
                            <span>{chip.email}</span>
                            {chip.status === 'idle' && (
                              <button
                                type="button"
                                onClick={() => removeChip(chip.email)}
                                className="ml-0.5 hover:text-foreground transition-colors"
                                title={`Quitar ${chip.email}`}
                                aria-label={`Quitar ${chip.email}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Paste area */}
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-wider">
                      Pega emails (separados por coma, punto y coma, o línea nueva)
                    </Label>
                    <Textarea
                      value={batchText}
                      onChange={(e) => setBatchText(e.target.value)}
                      onPaste={handleBatchPaste}
                      onKeyDown={handleBatchKeyDown}
                      placeholder="romina@vdrc.cl, vicente@vdrc.cl, catalina@vdrc.cl"
                      className="bg-muted/30 border-border/50 focus:border-primary/50 min-h-[80px] resize-none"
                      disabled={isSendingRef.current}
                    />
                    {batchText.trim() && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addChipsFromText(batchText)}
                        className="text-xs"
                      >
                        Agregar {parseEmails(batchText).length} email{parseEmails(batchText).length !== 1 ? 's' : ''}
                      </Button>
                    )}
                  </div>

                  <div className="flex items-end gap-4">
                    <div className="space-y-2 w-48">
                      <Label className="font-mono text-xs tracking-wider">Rol para todos</Label>
                      <Select
                        value={role}
                        onValueChange={(v) => setRole(v as 'participant' | 'admin')}
                        disabled={isSendingRef.current}
                      >
                        <SelectTrigger className="bg-muted/30 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="participant">Participante</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      onClick={handleBatchSubmit}
                      disabled={validChipCount === 0 || isSendingRef.current}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono transition-all duration-300 hover:scale-[1.02]"
                    >
                      {isSendingRef.current ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar {validChipCount} invitaci{validChipCount !== 1 ? 'ones' : 'ón'}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Live preview */}
      <div className="hidden lg:block">
        <InvitePreview email={currentEmail} name={currentName} role={role} />
      </div>
    </div>
  );
}
