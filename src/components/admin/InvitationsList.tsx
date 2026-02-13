import { useInvitations } from '@/hooks/useInvitations';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ListChecks, Clock, CheckCircle2, AlertCircle, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

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

export function InvitationsList() {
  const { invitations, isLoading, error } = useInvitations();

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
                Historial de invitaciones enviadas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
              <ListChecks className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No hay invitaciones todavia</p>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invitation, i) => (
                    <motion.tr
                      key={invitation.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-border/20 hover:bg-muted/20 transition-colors"
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
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
