import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSpaces } from '@/hooks/useSpaces';
import { CommunityLayout } from '@/components/community/CommunityLayout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Community() {
  const { spaces, spacesLoading } = useSpaces();
  const navigate = useNavigate();

  // Auto-redirect to first space on desktop
  useEffect(() => {
    if (spaces && spaces.length > 0 && window.innerWidth >= 768) {
      const defaultSpace = spaces.find(s => s.is_default) || spaces[0];
      navigate(`/community/${defaultSpace.slug}`, { replace: true });
    }
  }, [spaces, navigate]);

  if (spacesLoading) {
    return (
      <CommunityLayout>
        <LoadingSpinner fullScreen />
      </CommunityLayout>
    );
  }

  // Mobile view: show all spaces as cards
  return (
    <CommunityLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-mono font-bold text-foreground">Comunidad</h1>
          <p className="text-sm text-muted-foreground mt-1">Explora los espacios de la comunidad</p>
        </div>

        <div className="grid gap-3">
          {spaces?.map((space, i) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/community/${space.slug}`}>
                <Card className="border-border/50 hover:border-primary/30 transition-all duration-200">
                  <CardContent className="p-4 flex items-center gap-4">
                    <span className="text-3xl">{space.icon_emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{space.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{space.description}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div>{space.post_count} posts</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </CommunityLayout>
  );
}
