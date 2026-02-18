import { motion } from 'framer-motion';
import { Shield, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { UserManagementPanel } from '@/components/admin/UserManagementPanel';
import { InviteUserForm } from '@/components/admin/InviteUserForm';
import { InvitationsList } from '@/components/admin/InvitationsList';

export default function AdminUsers() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Gestionar Usuarios</h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-medium">
                <Shield className="h-3 w-3" />
                Admin
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">
            Administra usuarios, modifica perfiles y gestiona roles
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6 max-w-5xl">
          <InviteUserForm />
          <InvitationsList />
          <UserManagementPanel />
        </div>
      </div>
    </Layout>
  );
}
