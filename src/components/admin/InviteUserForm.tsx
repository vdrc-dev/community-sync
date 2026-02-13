import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useInvitations } from '@/hooks/useInvitations';
import { Loader2, Mail, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export function InviteUserForm() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'participant' | 'admin'>('participant');
  const { inviteUser, isInviting } = useInvitations();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: 'Email requerido',
        description: 'Ingresa el email de la persona que quieres invitar.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await inviteUser({
        email: email.trim(),
        full_name: fullName.trim() || undefined,
        role,
      });

      toast({
        title: 'Invitacion enviada',
        description: `Se envio un email de invitacion a ${email}`,
      });

      // Reset form
      setEmail('');
      setFullName('');
      setRole('participant');
    } catch (error) {
      toast({
        title: 'Error al invitar',
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass-strong border-primary/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Invitar Usuario</CardTitle>
              <CardDescription>
                Envia una invitacion por email para unirse al portal
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="invite-role" className="font-mono text-xs tracking-wider">
                  Rol
                </Label>
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
                    Enviar Invitacion
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
