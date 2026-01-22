import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MyToolStack } from '@/components/tools/MyToolStack';
import { ToolComparator } from '@/components/tools/ToolComparator';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Sparkles, Scale, Wrench } from 'lucide-react';

export default function MyToolsPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('stack');

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-muted/50 rounded" />
            <div className="h-4 w-96 bg-muted/50 rounded" />
            <div className="h-48 bg-muted/50 rounded-lg" />
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
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-4 flex items-center gap-3">
            <Wrench className="w-8 h-8 text-primary" />
            Mis <span className="text-gradient">Herramientas</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Tu stack personal de herramientas de IA. Registra qué has probado, 
            compara opciones y construye tu conjunto ideal de productividad.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="stack" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Mi Stack
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2">
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
      </div>
    </Layout>
  );
}
