import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CommunityLayout } from '@/components/community/CommunityLayout';
import { SpaceFeed } from '@/components/community/SpaceFeed';
import { PostDetail } from '@/components/community/PostDetail';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Space, SpacePost } from '@/hooks/useSpaces';

export default function CommunitySpace() {
  const { slug, postId } = useParams();

  // Fetch the space by slug
  const { data: space, isLoading: spaceLoading } = useQuery({
    queryKey: ['space', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data as Space;
    },
    enabled: !!slug,
  });

  // If viewing a specific post, fetch it
  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['space-post', postId],
    queryFn: async () => {
      if (!postId) return null;
      const { data, error } = await supabase
        .from('space_posts')
        .select('*')
        .eq('id', postId)
        .single();
      if (error) throw error;

      // Fetch author
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .eq('user_id', data.author_id)
        .single();

      return {
        ...data,
        author: profile || { full_name: null, avatar_url: null },
      } as SpacePost;
    },
    enabled: !!postId,
  });

  if (spaceLoading) {
    return (
      <CommunityLayout>
        <LoadingSpinner fullScreen />
      </CommunityLayout>
    );
  }

  if (!space) {
    return (
      <CommunityLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <span className="text-5xl mb-4 block">🔍</span>
            <h2 className="text-lg font-mono font-bold">Espacio no encontrado</h2>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout>
      {postId && post ? (
        <PostDetail post={post} spaceSlug={space.slug} />
      ) : (
        <SpaceFeed space={space} />
      )}
    </CommunityLayout>
  );
}
