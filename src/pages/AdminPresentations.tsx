import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Presentation } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/layout/Layout';
import { PresentationDashboard } from '@/components/admin/PresentationDashboard';
import { PresentationEditor } from '@/components/admin/PresentationEditor';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { usePresentations, type PresentationWithClass } from '@/hooks/usePresentations';

export default function AdminPresentations() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { createPresentation } = usePresentations();
  
  const [selectedPresentation, setSelectedPresentation] = useState<PresentationWithClass | null>(null);

  // Redirect non-admins
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleCreatePresentation = async (classId: string) => {
    const newPresentation = await createPresentation(classId);
    // Could navigate to editor here if needed
  };

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
        <AnimatePresence mode="wait">
          {selectedPresentation ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PresentationEditor
                presentation={selectedPresentation}
                onBack={() => setSelectedPresentation(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Presentation className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">Diseño de Presentaciones</h1>
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-medium">
                      <Shield className="h-3 w-3" />
                      Admin
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Planifica y diseña las presentaciones de cada clase antes de publicarlas
                </p>
              </div>

              <PresentationDashboard
                onSelectPresentation={setSelectedPresentation}
                onCreatePresentation={handleCreatePresentation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
