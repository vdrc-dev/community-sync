import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptPlayground } from '@/components/playground/PromptPlayground';
import { PromptGenerator } from '@/components/playground/PromptGenerator';
import { Sparkles, Wand2 } from 'lucide-react';

export default function Playground() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Laboratorio de IA</h1>
          <p className="text-muted-foreground">
            Experimenta con prompts en tiempo real y genera prompts optimizados con técnicas avanzadas
          </p>
        </div>

        <Tabs defaultValue="playground" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="playground" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Playground
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
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
      </div>
    </Layout>
  );
}
