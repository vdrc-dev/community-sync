import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MyToolStack } from '@/components/tools/MyToolStack';
import { ToolComparator } from '@/components/tools/ToolComparator';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Sparkles, Scale, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyToolsPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('stack');

  if (loading) {
    return (
      <Layout>
        <div className="page-container section-py">
          <div className="space-y-4">
            <div className="h-8 w-64 skeleton-shimmer rounded" />
            <div className="h-4 w-96 skeleton-shimmer rounded" />
            <div className="h-48 skeleton-shimmer rounded-lg" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Layout>
      <div className="page-container section-py relative">
        {/* Clean background */}

        <PageHeader
          title={<>Mis <span className="text-gradient">Herramientas</span></>}
          description="Tu stack personal de herramientas de IA. Registra que has probado, compara opciones y construye tu conjunto ideal de productividad."
          badge={{ label: 'Mi Stack', icon: <Wrench className="w-3 h-3" /> }}
          breadcrumbs={[{ label: 'Mis Herramientas' }]}
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 bg-muted/30 border border-border/30 p-1 rounded-xl">
              <TabsTrigger
                value="stack"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 rounded-lg transition-all duration-300 font-mono text-sm"
              >
                <Sparkles className="w-4 h-4" />
                Mi Stack
              </TabsTrigger>
              <TabsTrigger
                value="compare"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 rounded-lg transition-all duration-300 font-mono text-sm"
              >
                <Scale className="w-4 h-4" />
                Comparador
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stack">
              <MyToolStack />
            </TabsContent>

            <TabsContent value="compare">
              <ToolComparator />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
}
