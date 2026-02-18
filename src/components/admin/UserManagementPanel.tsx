import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserCog, Trash2, Shield, ShieldCheck, Pencil, X, Check, Loader2, RefreshCw, Users, Mail, Calendar, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useAdminUsers, AdminUser } from '@/hooks/useAdminUsers';
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

function UserRow({ user, onEdit, onRoleChange, onDelete, isSelf }: {
  user: AdminUser;
  onEdit: (user: AdminUser) => void;
  onRoleChange: (userId: string, role: string) => void;
  onDelete: (userId: string) => void;
  isSelf: boolean;
}) {
  const isAdmin = user.roles.includes('admin');
  const confirmedAt = user.email_confirmed_at;
  const lastSignIn = user.last_sign_in_at;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        {user.avatar_url ? (
          <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-sm font-bold text-primary">
            {(user.full_name || user.email)?.[0]?.toUpperCase() || '?'}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium truncate">{user.full_name || 'Sin nombre'}</span>
          {isAdmin && (
            <Badge variant="outline" className="text-[10px] border-yellow-500/30 text-yellow-500 gap-1">
              <ShieldCheck className="w-3 h-3" />
              Admin
            </Badge>
          )}
          {isSelf && (
            <Badge variant="secondary" className="text-[10px]">Tú</Badge>
          )}
          {!confirmedAt && (
            <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-500">
              No confirmado
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5 flex-wrap">
          <span className="flex items-center gap-1 truncate">
            <Mail className="w-3 h-3 shrink-0" />
            {user.email}
          </span>
          {user.generation_code && (
            <span className="text-primary/70 font-mono">{user.generation_code}</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60 mt-1 flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Creado {format(new Date(user.created_at), 'dd MMM yyyy', { locale: es })}
          </span>
          {lastSignIn && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Último acceso {formatDistanceToNow(new Date(lastSignIn), { addSuffix: true, locale: es })}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <Select
          value={isAdmin ? 'admin' : 'participant'}
          onValueChange={(val) => onRoleChange(user.user_id, val)}
          disabled={isSelf}
        >
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="participant">Participante</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(user)}>
          <Pencil className="w-3.5 h-3.5" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isSelf}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
              <AlertDialogDescription>
                Se eliminará permanentemente a <strong>{user.full_name || user.email}</strong> y todos sus datos. Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(user.user_id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
}

function EditUserDialog({ user, onSave, onClose }: {
  user: AdminUser;
  onSave: (data: { user_id: string; full_name: string; generation_code?: string }) => Promise<void>;
  onClose: () => void;
}) {
  const [fullName, setFullName] = useState(user.full_name || '');
  const [genCode, setGenCode] = useState(user.generation_code || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ user_id: user.user_id, full_name: fullName, generation_code: genCode || undefined });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Editar usuario</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-muted-foreground">Nombre completo</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-muted-foreground">Código de generación</label>
              <Input value={genCode} onChange={(e) => setGenCode(e.target.value)} placeholder="ej: GEN-10" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onClose} size="sm">Cancelar</Button>
              <Button onClick={handleSave} disabled={saving} size="sm">
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Check className="w-4 h-4 mr-1" />}
                Guardar
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function UserManagementPanel() {
  const { users, isLoading, refetch, updateProfile, setRole, deleteUser } = useAdminUsers();
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const { toast } = useToast();

  const filtered = users.filter((u) => {
    const matchSearch = !search ||
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.generation_code?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' ||
      (roleFilter === 'admin' && u.roles.includes('admin')) ||
      (roleFilter === 'participant' && !u.roles.includes('admin'));
    return matchSearch && matchRole;
  });

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.roles.includes('admin')).length,
    confirmed: users.filter((u) => u.email_confirmed_at).length,
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await setRole({ user_id: userId, role });
      toast({ title: 'Rol actualizado' });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser({ user_id: userId });
      toast({ title: 'Usuario eliminado' });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleEditSave = async (data: { user_id: string; full_name: string; generation_code?: string }) => {
    try {
      await updateProfile(data);
      toast({ title: 'Perfil actualizado' });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <UserCog className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Usuarios registrados</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1">
            <RefreshCw className="w-3.5 h-3.5" />
            Actualizar
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{stats.total}</span>
            <span className="text-muted-foreground">total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{stats.admins}</span>
            <span className="text-muted-foreground">admins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="font-medium">{stats.confirmed}</span>
            <span className="text-muted-foreground">confirmados</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o generación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-muted/30"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los roles</SelectItem>
              <SelectItem value="admin">Administradores</SelectItem>
              <SelectItem value="participant">Participantes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No se encontraron usuarios</p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((u) => (
                <UserRow
                  key={u.user_id}
                  user={u}
                  onEdit={setEditingUser}
                  onRoleChange={handleRoleChange}
                  onDelete={handleDelete}
                  isSelf={u.user_id === currentUser?.id}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>

      {/* Edit modal */}
      <AnimatePresence>
        {editingUser && (
          <EditUserDialog
            user={editingUser}
            onSave={handleEditSave}
            onClose={() => setEditingUser(null)}
          />
        )}
      </AnimatePresence>
    </Card>
  );
}
