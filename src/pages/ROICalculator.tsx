import { Layout } from '@/components/layout/Layout';
import { ROICalculator as ROICalc } from '@/components/roi/ROICalculator';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Calculator, TrendingUp } from 'lucide-react';

export default function ROICalculatorPage() {
  const { user, loading } = useAuth();

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
            <Calculator className="w-8 h-8 text-primary" />
            Calculadora de <span className="text-gradient">ROI</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Mide el impacto real de la IA en tu productividad. Registra las tareas que has automatizado 
            y visualiza cuánto tiempo y dinero estás ahorrando cada semana, mes y año.
          </p>
        </div>

        {/* Tips */}
        <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-green-500/5 border border-primary/20">
          <h3 className="font-medium flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Consejos para maximizar tu ROI
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Sé específico:</strong> "Escribir emails de seguimiento" es mejor que "Emails"</li>
            <li>• <strong>Mide antes y después:</strong> Cronometra la tarea antes y después de usar IA</li>
            <li>• <strong>Incluye tareas pequeñas:</strong> Los ahorros de 5-10 minutos se acumulan</li>
            <li>• <strong>Actualiza tu $/hora:</strong> Usa tu tarifa real para cálculos precisos</li>
          </ul>
        </div>

        <ROICalc />
      </div>
    </Layout>
  );
}
