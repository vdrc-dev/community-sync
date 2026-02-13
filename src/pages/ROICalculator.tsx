import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { ROICalculator as ROICalc } from '@/components/roi/ROICalculator';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Calculator, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ROICalculatorPage() {
  const { user, loading } = useAuth();

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
          title={<>Calculadora de <span className="text-gradient">ROI</span></>}
          description="Mide el impacto real de la IA en tu productividad. Registra las tareas que has automatizado y visualiza cuanto tiempo y dinero estas ahorrando."
          badge={{ label: 'ROI', icon: <Calculator className="w-3 h-3" /> }}
          breadcrumbs={[{ label: 'ROI Calculator' }]}
        />

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-green-500/5 border border-primary/20 backdrop-blur-sm"
        >
          <h3 className="font-mono font-medium flex items-center gap-2 mb-2 text-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            Consejos para maximizar tu ROI
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Se especifico:</strong> "Escribir emails de seguimiento" es mejor que "Emails"</li>
            <li>• <strong>Mide antes y despues:</strong> Cronometra la tarea antes y despues de usar IA</li>
            <li>• <strong>Incluye tareas pequenas:</strong> Los ahorros de 5-10 minutos se acumulan</li>
            <li>• <strong>Actualiza tu $/hora:</strong> Usa tu tarifa real para calculos precisos</li>
          </ul>
        </motion.div>

        <ROICalc />
      </div>
    </Layout>
  );
}
