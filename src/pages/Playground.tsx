import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptPlayground } from '@/components/playground/PromptPlayground';
import { PromptGenerator } from '@/components/playground/PromptGenerator';
import { Sparkles, Wand2, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Playground() {
  return (
    <Layout>
      <div className="page-container section-py relative">
        {/* Clean background */}

        <PageHeader
          title={<>Laboratorio de <span className="text-gradient">IA</span></>}
          description="Experimenta con prompts en tiempo real y genera prompts optimizados con tecnicas avanzadas"
          badge={{ label: 'Lab IA', icon: <FlaskConical className="w-3 h-3" /> }}
          breadcrumbs={[{ label: 'Lab IA' }]}
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="playground" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/30 border border-border/30 p-1 rounded-xl">
              <TabsTrigger
                value="playground"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 rounded-lg transition-all duration-300 font-mono text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Playground
              </TabsTrigger>
              <TabsTrigger
                value="generator"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 rounded-lg transition-all duration-300 font-mono text-sm"
              >
                <Wand2 className="h-4 w-4" />
                Generador
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playground">
              <PromptPlayground />
            </TabsContent>

            <TabsContent value="generator">
              <PromptGenerator />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
}
