import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading, adminLoading, isAdmin } = useAuth();

  if (loading || (adminOnly && adminLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
