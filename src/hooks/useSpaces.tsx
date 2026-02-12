import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Space {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_emoji: string | null;
  cover_image_url: string | null;
  space_type: string;
  is_private: boolean;
  is_default: boolean;
  sort_order: number;
  member_count: number;
  post_count: number;
  created_at: string;
}

export interface SpacePost {
  id: string;
  space_id: string;
  author_id: string;
  title: string | null;
  content: string;
  post_type: string;
  is_pinned: boolean;
  is_locked: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  author?: { full_name: string | null; avatar_url: string | null };
}

export interface SpaceComment {
  id: string;
  post_id: string;
  author_id: string;
  parent_comment_id: string | null;
  content: string;
  likes_count: number;
  created_at: string;
  author?: { full_name: string | null; avatar_url: string | null };
}

export function useSpaces() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: spaces, isLoading: spacesLoading } = useQuery({
    queryKey: ['spaces'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data as Space[];
    },
  });

  return { spaces, spacesLoading };
}

export function useSpacePosts(spaceId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['space-posts', spaceId],
    queryFn: async () => {
      if (!spaceId) return [];
      const { data, error } = await supabase
        .from('space_posts')
        .select('*')
        .eq('space_id', spaceId)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;

      // Fetch author profiles
      const authorIds = [...new Set((data || []).map(p => p.author_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', authorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      return (data || []).map(post => ({
        ...post,
        author: profileMap.get(post.author_id) || { full_name: null, avatar_url: null },
      })) as SpacePost[];
    },
    enabled: !!spaceId,
  });

  const createPost = useMutation({
    mutationFn: async ({ title, content, postType }: { title?: string; content: string; postType?: string }) => {
      if (!user || !spaceId) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('space_posts')
        .insert({
          space_id: spaceId,
          author_id: user.id,
          title: title || null,
          content,
          post_type: postType || 'discussion',
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['space-posts', spaceId] });
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
      toast.success('Post publicado');
    },
    onError: () => toast.error('Error al publicar'),
  });

  return { posts, isLoading, createPost };
}

export function usePostComments(postId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ['post-comments', postId],
    queryFn: async () => {
      if (!postId) return [];
      const { data, error } = await supabase
        .from('space_post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at');
      if (error) throw error;

      const authorIds = [...new Set((data || []).map(c => c.author_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', authorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      return (data || []).map(comment => ({
        ...comment,
        author: profileMap.get(comment.author_id) || { full_name: null, avatar_url: null },
      })) as SpaceComment[];
    },
    enabled: !!postId,
  });

  const addComment = useMutation({
    mutationFn: async ({ content, parentId }: { content: string; parentId?: string }) => {
      if (!user || !postId) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('space_post_comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content,
          parent_comment_id: parentId || null,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['space-posts'] });
    },
    onError: () => toast.error('Error al comentar'),
  });

  return { comments, isLoading, addComment };
}

export function usePostLikes(postId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: userLiked } = useQuery({
    queryKey: ['post-like', postId, user?.id],
    queryFn: async () => {
      if (!user || !postId) return false;
      const { data } = await supabase
        .from('space_post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();
      return !!data;
    },
    enabled: !!user && !!postId,
  });

  const toggleLike = useMutation({
    mutationFn: async () => {
      if (!user || !postId) throw new Error('Not authenticated');
      if (userLiked) {
        const { error } = await supabase
          .from('space_post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('space_post_likes')
          .insert({ post_id: postId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-like', postId] });
      queryClient.invalidateQueries({ queryKey: ['space-posts'] });
    },
  });

  return { userLiked: !!userLiked, toggleLike };
}
