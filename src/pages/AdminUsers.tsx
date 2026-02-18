import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, UserPlus, ListChecks } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { UserManagementPanel } from '@/components/admin/UserManagementPanel';
import { AdminInviteTab } from '@/components/admin/AdminInviteTab';

export default function AdminUsers() {
  const { isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<'users' | 'invite'>('users');

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

  const tabs = [
    { id: 'users' as const, label: 'Usuarios', icon: Users },
    { id: 'invite' as const, label: 'Invitar', icon: UserPlus },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Header + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Usuarios</h1>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-medium">
              <Shield className="h-3 w-3" />
              Admin
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/30 border border-border/30 w-fit">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  tab === t.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'users' ? <UserManagementPanel /> : <AdminInviteTab />}
        </motion.div>
      </div>
    </Layout>
  );
}
