import { useState } from 'react';
import { useInvitations } from '@/hooks/useInvitations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import {
  ListChecks, Clock, CheckCircle2, AlertCircle, Shield, User,
  RotateCw, Copy, Users, Mail, TrendingUp, Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-500 gap-1">
          <Clock className="w-3 h-3" />
          Pendiente
        </Badge>
      );
    case 'accepted':
      return (
        <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-500 gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Aceptada
        </Badge>
      );
    case 'expired':
      return (
        <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-500 gap-1">
          <AlertCircle className="w-3 h-3" />
          Expirada
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-muted-foreground">
          {status}
        </Badge>
      );
  }
}

function RoleBadge({ role }: { role: string }) {
  if (role === 'admin') {
    return (
      <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary gap-1">
        <Shield className="w-3 h-3" />
        Admin
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-muted/50 border-border/50 text-muted-foreground gap-1">
      <User className="w-3 h-3" />
      Participante
    </Badge>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  delay: number;
}

function StatCard({ icon: Icon, label, value, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`flex items-center gap-3 p-3 rounded-xl border border-border/20 bg-muted/10`}
    >
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <motion.p
          className="text-xl font-bold tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {value}
        </motion.p>
        <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">{label}</p>
      </div>
    </motion.div>
  );
}

export function InvitationsList() {
  const { invitations, isLoading, error, inviteUser, isInviting } = useInvitations();
  const { toast } = useToast();
  const [resendingId, setResendingId] = useState<string | null>(null);

  const stats = {
    total: invitations.length,
    pending: invitations.filter((i) => i.status === 'pending').length,
    accepted: invitations.filter((i) => i.status === 'accepted').length,
    expired: invitations.filter((i) => i.status === 'expired').length,
  };

  const handleResend = async (invitation: { email: string; full_name: string | null; role: 'admin' | 'participant'; id: string }) => {
    setResendingId(invitation.id);
    try {
      await inviteUser({
        email: invitation.email,
        full_name: invitation.full_name || undefined,
        role: invitation.role,
      });
      toast({
        title: 'Reenviada',
        description: `Se reenvió la invitación a ${invitation.email}`,
      });
    } catch (err) {
      toast({
        title: 'Error al reenviar',
        description: err instanceof Error ? err.message : 'Error desconocido',
        variant: 'destructive',
      });
    } finally {
      setResendingId(null);
    }
  };

  const handleCopyLink = (email: string) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/auth?mode=signup&email=${encodeURIComponent(email)}`;
    navigator.clipboard.writeText(link);
    toast({
      title: 'Enlace copiado',
      description: 'El enlace de invitación se copió al portapapeles',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="glass-strong border-primary/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <ListChecks className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Invitaciones</CardTitle>
              <CardDescription>
                Historial y estado de las invitaciones enviadas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats row */}
          {!isLoading && invitations.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard icon={Users} label="Total" value={stats.total} color="bg-primary/10 text-primary" delay={0} />
              <StatCard icon={Clock} label="Pendientes" value={stats.pending} color="bg-yellow-500/10 text-yellow-500" delay={0.05} />
              <StatCard icon={CheckCircle2} label="Aceptadas" value={stats.accepted} color="bg-green-500/10 text-green-500" delay={0.1} />
              <StatCard icon={TrendingUp} label="Tasa" value={stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0} color="bg-cyan-500/10 text-cyan-500" delay={0.15} />
            </div>
          )}

          {/* Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="w-8 h-8 mx-auto mb-3 text-destructive/50" />
              <p className="text-sm">Error al cargar invitaciones</p>
            </div>
          ) : invitations.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Mail className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No hay invitaciones todavía</p>
              <p className="text-xs mt-1 opacity-60">Usa el formulario de arriba para enviar la primera</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="font-mono text-xs tracking-wider">Email</TableHead>
                    <TableHead className="font-mono text-xs tracking-wider">Nombre</TableHead>
                    <TableHead className="font-mono text-xs tracking-wider">Rol</TableHead>
                    <TableHead className="font-mono text-xs tracking-wider">Estado</TableHead>
                    <TableHead className="font-mono text-xs tracking-wider">Fecha</TableHead>
                    <TableHead className="font-mono text-xs tracking-wider text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {invitations.map((invitation, i) => (
                      <motion.tr
                        key={invitation.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-border/20 group hover:bg-muted/20 transition-colors"
                      >
                        <TableCell className="font-medium text-sm">
                          {invitation.email}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {invitation.full_name || '—'}
                        </TableCell>
                        <TableCell>
                          <RoleBadge role={invitation.role} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={invitation.status} />
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">
                          {formatDate(invitation.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {invitation.status === 'pending' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-primary"
                                onClick={() => handleResend(invitation)}
                                disabled={resendingId === invitation.id || isInviting}
                              >
                                {resendingId === invitation.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <RotateCw className="w-3 h-3" />
                                )}
                                Reenviar
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-primary"
                              onClick={() => handleCopyLink(invitation.email)}
                            >
                              <Copy className="w-3 h-3" />
                              Enlace
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
