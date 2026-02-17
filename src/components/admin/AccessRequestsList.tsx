import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Clock, Mail, User, MessageSquare, Loader2, ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAccessRequests, AccessRequest } from '@/hooks/useAccessRequests';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="border-yellow-500/30 text-yellow-500 bg-yellow-500/10">
          <Clock className="w-3 h-3 mr-1" />
          Pendiente
        </Badge>
      );
    case 'approved':
      return (
        <Badge variant="outline" className="border-green-500/30 text-green-500 bg-green-500/10">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Aprobada
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="outline" className="border-red-500/30 text-red-500 bg-red-500/10">
          <XCircle className="w-3 h-3 mr-1" />
          Rechazada
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function RequestCard({
  request,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: {
  request: AccessRequest;
  onApprove: (req: AccessRequest) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  isApproving: boolean;
  isRejecting: boolean;
}) {
  const [actionLoading, setActionLoading] = useState<'approve' | 'reject' | null>(null);
  const { toast } = useToast();

  const handleApprove = async () => {
    setActionLoading('approve');
    try {
      await onApprove(request);
      toast({
        title: 'Solicitud aprobada',
        description: `Se envio invitacion a ${request.email}`,
      });
    } catch (err) {
      toast({
        title: 'Error al aprobar',
        description: err instanceof Error ? err.message : 'Error desconocido',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    setActionLoading('reject');
    try {
      await onReject(request.id);
      toast({
        title: 'Solicitud rechazada',
        description: `La solicitud de ${request.email} fue rechazada`,
      });
    } catch (err) {
      toast({
        title: 'Error al rechazar',
        description: err instanceof Error ? err.message : 'Error desconocido',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const isPending = request.status === 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-medium text-sm">{request.full_name}</span>
            </div>
            <StatusBadge status={request.status} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span>{request.email}</span>
          </div>
          {request.message && (
            <div className="flex items-start gap-1.5 text-xs text-muted-foreground mt-2">
              <MessageSquare className="w-3 h-3 mt-0.5 shrink-0" />
              <p className="italic">&ldquo;{request.message}&rdquo;</p>
            </div>
          )}
          <p className="text-[10px] text-muted-foreground/60 mt-1">
            {formatDate(request.created_at)}
            {request.reviewed_at && (
              <> &middot; Revisada {formatDate(request.reviewed_at)}</>
            )}
          </p>
        </div>

        {isPending && (
          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              disabled={isApproving || isRejecting || actionLoading !== null}
              className="h-8 px-3 border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              {actionLoading === 'reject' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <X className="w-3.5 h-3.5" />
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleApprove}
              disabled={isApproving || isRejecting || actionLoading !== null}
              className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white"
            >
              {actionLoading === 'approve' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
              ) : (
                <Check className="w-3.5 h-3.5 mr-1" />
              )}
              Aprobar
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function AccessRequestsList() {
  const {
    pendingRequests,
    reviewedRequests,
    isLoading,
    approveRequest,
    rejectRequest,
    isApproving,
    isRejecting,
  } = useAccessRequests();

  const [showReviewed, setShowReviewed] = useState(false);

  if (isLoading) {
    return (
      <Card className="glass-strong rounded-2xl">
        <CardContent className="py-8 text-center">
          <Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-2">Cargando solicitudes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-strong rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono flex items-center gap-2">
            Solicitudes de acceso
            {pendingRequests.length > 0 && (
              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                {pendingRequests.length} pendiente{pendingRequests.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingRequests.length === 0 && reviewedRequests.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No hay solicitudes de acceso
          </p>
        )}

        <AnimatePresence>
          {pendingRequests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              onApprove={approveRequest}
              onReject={rejectRequest}
              isApproving={isApproving}
              isRejecting={isRejecting}
            />
          ))}
        </AnimatePresence>

        {reviewedRequests.length > 0 && (
          <div className="pt-2">
            <button
              onClick={() => setShowReviewed(!showReviewed)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              {showReviewed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {reviewedRequests.length} solicitud{reviewedRequests.length !== 1 ? 'es' : ''} revisada{reviewedRequests.length !== 1 ? 's' : ''}
            </button>
            <AnimatePresence>
              {showReviewed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 mt-2 overflow-hidden"
                >
                  {reviewedRequests.map((req) => (
                    <RequestCard
                      key={req.id}
                      request={req}
                      onApprove={approveRequest}
                      onReject={rejectRequest}
                      isApproving={isApproving}
                      isRejecting={isRejecting}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
