import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, UserPlus, Loader2, CheckCircle2, Clock, RotateCw, Copy, Shield, User, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInvitations } from '@/hooks/useInvitations';
import { useToast } from '@/hooks/use-toast';

export function AdminInviteTab() {
  const { invitations, isLoading, refetch, inviteUser, isInviting } = useInvitations();
  const { toast } = useToast();

  // Form state
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'participant' | 'admin'>('participant');
  const [resendingId, setResendingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isInviting) return;
    try {
      await inviteUser({ email: email.trim(), full_name: fullName.trim() || undefined, role });
      toast({ title: '✓ Invitación enviada', description: email.trim() });
      setEmail('');
      setFullName('');
      setRole('participant');
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Error desconocido', variant: 'destructive' });
    }
  };

  const handleResend = async (inv: { id: string; email: string; full_name: string | null; role: 'admin' | 'participant' }) => {
    setResendingId(inv.id);
    try {
      await inviteUser({ email: inv.email, full_name: inv.full_name || undefined, role: inv.role });
      toast({ title: 'Reenviada', description: inv.email });
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Error', variant: 'destructive' });
    } finally {
      setResendingId(null);
    }
  };

  const handleCopyLink = (invEmail: string) => {
    const link = `${window.location.origin}/auth?mode=signup&email=${encodeURIComponent(invEmail)}`;
    navigator.clipboard.writeText(link);
    toast({ title: 'Enlace copiado' });
  };

  return (
    <div className="space-y-6">
      {/* Invite form — compact */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Enviar invitación</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="email@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-muted/30"
              required
              disabled={isInviting}
            />
            <Input
              type="text"
              placeholder="Nombre (opcional)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="sm:w-48 bg-muted/30"
              disabled={isInviting}
            />
            <Select value={role} onValueChange={(v) => setRole(v as 'participant' | 'admin')} disabled={isInviting}>
              <SelectTrigger className="sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="participant">Participante</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isInviting || !email.trim()} className="gap-2 shrink-0">
              {isInviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              Invitar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Invitations table */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-lg">Invitaciones enviadas</CardTitle>
              {!isLoading && (
                <Badge variant="secondary" className="text-xs">{invitations.length}</Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={() => refetch()} className="gap-1 text-xs">
              <RotateCw className="w-3.5 h-3.5" />
              Actualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : invitations.length === 0 ? (
            <p className="text-center py-8 text-sm text-muted-foreground">No hay invitaciones todavía</p>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {invitations.map((inv, i) => (
                  <motion.div
                    key={inv.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:bg-muted/20 transition-colors group"
                  >
                    {/* Status dot */}
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      inv.status === 'accepted' ? 'bg-green-500' :
                      inv.status === 'pending' ? 'bg-yellow-500' : 'bg-destructive'
                    }`} />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium truncate">{inv.email}</span>
                        {inv.full_name && (
                          <span className="text-xs text-muted-foreground">({inv.full_name})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {inv.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          {inv.role === 'admin' ? 'Admin' : 'Participante'}
                        </span>
                        <span>·</span>
                        <span>{new Date(inv.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span>·</span>
                        <Badge variant="outline" className={`text-[10px] py-0 h-5 ${
                          inv.status === 'accepted' ? 'border-green-500/30 text-green-500' :
                          inv.status === 'pending' ? 'border-yellow-500/30 text-yellow-500' : 'border-destructive/30 text-destructive'
                        }`}>
                          {inv.status === 'accepted' ? 'Aceptada' : inv.status === 'pending' ? 'Pendiente' : inv.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {inv.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleResend(inv)}
                          disabled={resendingId === inv.id}
                        >
                          {resendingId === inv.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCw className="w-3 h-3" />}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => handleCopyLink(inv.email)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
