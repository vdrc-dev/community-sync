import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-mono font-bold mb-2">Algo salio mal</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ocurrio un error inesperado. Puedes intentar recargar la pagina o volver al inicio.
              </p>
            </div>
            {this.state.error && (
              <details className="text-left">
                <summary className="text-xs text-muted-foreground/60 cursor-pointer hover:text-muted-foreground transition-colors">
                  Detalles tecnicos
                </summary>
                <pre className="mt-2 text-[10px] text-red-400/70 bg-red-500/5 rounded-lg p-3 overflow-x-auto border border-red-500/10 font-mono">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={this.handleGoHome}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Ir al inicio
              </Button>
              <Button
                size="sm"
                onClick={this.handleReload}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Recargar pagina
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
