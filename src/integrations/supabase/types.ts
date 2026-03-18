export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      access_requests: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          message: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          message?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          message?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      automation_workflows: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          last_run_at: string | null
          name: string
          run_count: number | null
          steps: Json | null
          trigger_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name: string
          run_count?: number | null
          steps?: Json | null
          trigger_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name?: string
          run_count?: number | null
          steps?: Json | null
          trigger_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_channel_members: {
        Row: {
          channel_id: string
          id: string
          joined_at: string
          last_read_at: string | null
          role: string
          user_id: string
        }
        Insert: {
          channel_id: string
          id?: string
          joined_at?: string
          last_read_at?: string | null
          role?: string
          user_id: string
        }
        Update: {
          channel_id?: string
          id?: string
          joined_at?: string
          last_read_at?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_channel_members_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "chat_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_channels: {
        Row: {
          channel_type: string
          created_at: string
          created_by: string | null
          description: string | null
          icon_emoji: string | null
          id: string
          is_archived: boolean | null
          is_default: boolean | null
          is_private: boolean | null
          last_message_at: string | null
          name: string
          slug: string | null
          sort_order: number | null
          space_id: string | null
        }
        Insert: {
          channel_type?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_emoji?: string | null
          id?: string
          is_archived?: boolean | null
          is_default?: boolean | null
          is_private?: boolean | null
          last_message_at?: string | null
          name: string
          slug?: string | null
          sort_order?: number | null
          space_id?: string | null
        }
        Update: {
          channel_type?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_emoji?: string | null
          id?: string
          is_archived?: boolean | null
          is_default?: boolean | null
          is_private?: boolean | null
          last_message_at?: string | null
          name?: string
          slug?: string | null
          sort_order?: number | null
          space_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          author_id: string
          channel_id: string
          content: string
          created_at: string
          id: string
          is_deleted: boolean | null
          is_edited: boolean | null
          message_type: string | null
          reactions: Json | null
          reply_to_id: string | null
          sender_id: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          channel_id: string
          content: string
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          message_type?: string | null
          reactions?: Json | null
          reply_to_id?: string | null
          sender_id?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          channel_id?: string
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          message_type?: string | null
          reactions?: Json | null
          reply_to_id?: string | null
          sender_id?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "chat_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      class_presentations: {
        Row: {
          class_id: string
          created_at: string
          duration_estimate: number | null
          id: string
          key_points: string[] | null
          notes: string | null
          outline: string | null
          resources_needed: string[] | null
          slide_template: string | null
          status: string
          talking_points: string[] | null
          updated_at: string
        }
        Insert: {
          class_id: string
          created_at?: string
          duration_estimate?: number | null
          id?: string
          key_points?: string[] | null
          notes?: string | null
          outline?: string | null
          resources_needed?: string[] | null
          slide_template?: string | null
          status?: string
          talking_points?: string[] | null
          updated_at?: string
        }
        Update: {
          class_id?: string
          created_at?: string
          duration_estimate?: number | null
          id?: string
          key_points?: string[] | null
          notes?: string | null
          outline?: string | null
          resources_needed?: string[] | null
          slide_template?: string | null
          status?: string
          talking_points?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_presentations_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: true
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          class_date: string | null
          class_number: number
          created_at: string
          description: string | null
          generation_id: string
          id: string
          is_published: boolean | null
          recording_url: string | null
          resources_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          class_date?: string | null
          class_number: number
          created_at?: string
          description?: string | null
          generation_id: string
          id?: string
          is_published?: boolean | null
          recording_url?: string | null
          resources_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          class_date?: string | null
          class_number?: number
          created_at?: string
          description?: string | null
          generation_id?: string
          id?: string
          is_published?: boolean | null
          recording_url?: string | null
          resources_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_generation_id_fkey"
            columns: ["generation_id"]
            isOneToOne: false
            referencedRelation: "generations"
            referencedColumns: ["id"]
          },
        ]
      }
      generation_weeks: {
        Row: {
          generation_id: number
          id: string
          name: string | null
          stack: string[] | null
          week: number
        }
        Insert: {
          generation_id: number
          id?: string
          name?: string | null
          stack?: string[] | null
          week: number
        }
        Update: {
          generation_id?: number
          id?: string
          name?: string | null
          stack?: string[] | null
          week?: number
        }
        Relationships: [
          {
            foreignKeyName: "generation_weeks_generation_id_fkey"
            columns: ["generation_id"]
            isOneToOne: false
            referencedRelation: "slide_generations"
            referencedColumns: ["id"]
          },
        ]
      }
      generations: {
        Row: {
          code: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          start_date: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string | null
          id: string
          invited_by: string | null
          role: string | null
          status: string | null
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          role?: string | null
          status?: string | null
          token?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          role?: string | null
          status?: string | null
          token?: string
        }
        Relationships: []
      }
      leaderboard_scores: {
        Row: {
          badges: string[] | null
          id: string
          level: number | null
          rank: number | null
          updated_at: string
          user_id: string
          xp_total: number | null
        }
        Insert: {
          badges?: string[] | null
          id?: string
          level?: number | null
          rank?: number | null
          updated_at?: string
          user_id: string
          xp_total?: number | null
        }
        Update: {
          badges?: string[] | null
          id?: string
          level?: number | null
          rank?: number | null
          updated_at?: string
          user_id?: string
          xp_total?: number | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_pinned: boolean | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          link: string | null
          message: string | null
          metadata: Json | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          metadata?: Json | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          metadata?: Json | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      prompt_library: {
        Row: {
          category: string | null
          copy_count: number | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          prompt: string
          prompt_text: string | null
          tags: string[] | null
          title: string
          tool_id: string | null
          updated_at: string
          use_count: number | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          copy_count?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          prompt: string
          prompt_text?: string | null
          tags?: string[] | null
          title: string
          tool_id?: string | null
          updated_at?: string
          use_count?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          copy_count?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          prompt?: string
          prompt_text?: string | null
          tags?: string[] | null
          title?: string
          tool_id?: string | null
          updated_at?: string
          use_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_library_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      quick_notes: {
        Row: {
          color: string | null
          content: string
          context_id: string | null
          context_type: string | null
          context_url: string | null
          created_at: string
          id: string
          is_processed: boolean | null
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          content: string
          context_id?: string | null
          context_type?: string | null
          context_url?: string | null
          created_at?: string
          id?: string
          is_processed?: boolean | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          content?: string
          context_id?: string | null
          context_type?: string | null
          context_url?: string | null
          created_at?: string
          id?: string
          is_processed?: boolean | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sections: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      slide_generations: {
        Row: {
          created_at: string
          date: string | null
          generation_number: number
          id: number
          instructor: string | null
          is_active: boolean | null
          module: string | null
          name: string
          stack: string[] | null
          total_weeks: number | null
          week: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          generation_number: number
          id?: number
          instructor?: string | null
          is_active?: boolean | null
          module?: string | null
          name: string
          stack?: string[] | null
          total_weeks?: number | null
          week?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          generation_number?: number
          id?: number
          instructor?: string | null
          is_active?: boolean | null
          module?: string | null
          name?: string
          stack?: string[] | null
          total_weeks?: number | null
          week?: number | null
        }
        Relationships: []
      }
      slides: {
        Row: {
          component_name: string
          content: Json | null
          created_at: string
          generation_id: number
          id: string
          section_id: string | null
          section_number: number | null
          slide_number: number
          storyline: string | null
          title: string | null
          updated_at: string
          week: number | null
        }
        Insert: {
          component_name: string
          content?: Json | null
          created_at?: string
          generation_id: number
          id?: string
          section_id?: string | null
          section_number?: number | null
          slide_number: number
          storyline?: string | null
          title?: string | null
          updated_at?: string
          week?: number | null
        }
        Update: {
          component_name?: string
          content?: Json | null
          created_at?: string
          generation_id?: number
          id?: string
          section_id?: string | null
          section_number?: number | null
          slide_number?: number
          storyline?: string | null
          title?: string | null
          updated_at?: string
          week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "slides_generation_id_fkey"
            columns: ["generation_id"]
            isOneToOne: false
            referencedRelation: "slide_generations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slides_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      space_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          likes_count: number | null
          parent_comment_id: string | null
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "space_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "space_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      space_members: {
        Row: {
          id: string
          joined_at: string
          role: string
          space_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          space_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          space_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_members_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_post_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          likes_count: number | null
          parent_comment_id: string | null
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_post_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "space_post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "space_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      space_post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "space_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      space_posts: {
        Row: {
          author_id: string
          comments_count: number | null
          content: string
          created_at: string
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          likes_count: number | null
          post_type: string
          space_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          comments_count?: number | null
          content: string
          created_at?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          likes_count?: number | null
          post_type?: string
          space_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          comments_count?: number | null
          content?: string
          created_at?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          likes_count?: number | null
          post_type?: string
          space_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_posts_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string | null
          icon_emoji: string | null
          id: string
          is_default: boolean | null
          is_private: boolean | null
          member_count: number | null
          name: string
          post_count: number | null
          slug: string
          sort_order: number | null
          space_type: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          is_default?: boolean | null
          is_private?: boolean | null
          member_count?: number | null
          name: string
          post_count?: number | null
          slug: string
          sort_order?: number | null
          space_type?: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          is_default?: boolean | null
          is_private?: boolean | null
          member_count?: number | null
          name?: string
          post_count?: number | null
          slug?: string
          sort_order?: number | null
          space_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          best_for: string | null
          category: string | null
          cons: string[] | null
          created_at: string
          description: string | null
          icon_emoji: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          name: string
          pricing: string | null
          pros: string[] | null
          rating: number | null
          slug: string
          sort_order: number | null
          updated_at: string
          url: string | null
          use_cases: string[] | null
        }
        Insert: {
          best_for?: string | null
          category?: string | null
          cons?: string[] | null
          created_at?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          name: string
          pricing?: string | null
          pros?: string[] | null
          rating?: number | null
          slug: string
          sort_order?: number | null
          updated_at?: string
          url?: string | null
          use_cases?: string[] | null
        }
        Update: {
          best_for?: string | null
          category?: string | null
          cons?: string[] | null
          created_at?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          name?: string
          pricing?: string | null
          pros?: string[] | null
          rating?: number | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
          url?: string | null
          use_cases?: string[] | null
        }
        Relationships: []
      }
      user_activity_resume: {
        Row: {
          created_at: string
          id: string
          last_accessed_at: string
          resource_id: string
          resource_meta: Json | null
          resource_title: string | null
          resource_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_accessed_at?: string
          resource_id: string
          resource_meta?: Json | null
          resource_title?: string | null
          resource_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_accessed_at?: string
          resource_id?: string
          resource_meta?: Json | null
          resource_title?: string | null
          resource_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_automations: {
        Row: {
          category: string | null
          created_at: string
          frequency: string | null
          frequency_per_week: number | null
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          notes: string | null
          task_name: string
          time_after_minutes: number | null
          time_before_minutes: number | null
          tool_used: string | null
          tools_used: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          frequency?: string | null
          frequency_per_week?: number | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          task_name: string
          time_after_minutes?: number | null
          time_before_minutes?: number | null
          tool_used?: string | null
          tools_used?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          frequency?: string | null
          frequency_per_week?: number | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          task_name?: string
          time_after_minutes?: number | null
          time_before_minutes?: number | null
          tool_used?: string | null
          tools_used?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_type: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_type: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_type?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_bookmarks: {
        Row: {
          created_at: string
          id: string
          note: string | null
          resource_id: string
          resource_type: string
          tags: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          resource_id: string
          resource_type: string
          tags?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          resource_id?: string
          resource_type?: string
          tags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      user_challenge_progress: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string
          current_count: number | null
          id: string
          status: string | null
          submission: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string
          current_count?: number | null
          id?: string
          status?: string | null
          submission?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string
          current_count?: number | null
          id?: string
          status?: string | null
          submission?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "weekly_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notes: {
        Row: {
          class_id: string | null
          content: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          class_id?: string | null
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          class_id?: string | null
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          id: string
          level: number | null
          points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          level?: number | null
          points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          level?: number | null
          points?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          discovered_easter_eggs: string[] | null
          id: string
          keyboard_shortcuts: boolean | null
          language: string | null
          notifications_enabled: boolean | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          preferences: Json | null
          theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          discovered_easter_eggs?: string[] | null
          id?: string
          keyboard_shortcuts?: boolean | null
          language?: string | null
          notifications_enabled?: boolean | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          preferences?: Json | null
          theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          discovered_easter_eggs?: string[] | null
          id?: string
          keyboard_shortcuts?: boolean | null
          language?: string | null
          notifications_enabled?: boolean | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          preferences?: Json | null
          theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          class_id: string | null
          completed_at: string
          id: string
          user_id: string
        }
        Insert: {
          class_id?: string | null
          completed_at?: string
          id?: string
          user_id: string
        }
        Update: {
          class_id?: string | null
          completed_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_saved_prompts: {
        Row: {
          created_at: string
          id: string
          prompt_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prompt_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prompt_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_prompts_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompt_library"
            referencedColumns: ["id"]
          },
        ]
      }
      user_streaks: {
        Row: {
          created_at: string
          current_streak: number | null
          id: string
          last_activity_at: string | null
          last_activity_date: string | null
          longest_streak: number | null
          multiplier: number | null
          streak_freezes: number | null
          total_days: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_activity_at?: string | null
          last_activity_date?: string | null
          longest_streak?: number | null
          multiplier?: number | null
          streak_freezes?: number | null
          total_days?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_activity_at?: string | null
          last_activity_date?: string | null
          longest_streak?: number | null
          multiplier?: number | null
          streak_freezes?: number | null
          total_days?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tool_logs: {
        Row: {
          first_tried_at: string
          id: string
          notes: string | null
          rating: number | null
          status: string
          tool_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          first_tried_at?: string
          id?: string
          notes?: string | null
          rating?: number | null
          status?: string
          tool_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          first_tried_at?: string
          id?: string
          notes?: string | null
          rating?: number | null
          status?: string
          tool_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tool_logs_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_challenges: {
        Row: {
          badge_reward: string | null
          challenge: string
          challenge_type: string | null
          created_at: string
          description: string | null
          end_date: string | null
          icon_emoji: string | null
          id: string
          is_active: boolean | null
          points_reward: number | null
          start_date: string | null
          target_count: number | null
          title: string
          week_number: number | null
          xp_reward: number | null
          year: number | null
        }
        Insert: {
          badge_reward?: string | null
          challenge: string
          challenge_type?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          icon_emoji?: string | null
          id?: string
          is_active?: boolean | null
          points_reward?: number | null
          start_date?: string | null
          target_count?: number | null
          title: string
          week_number?: number | null
          xp_reward?: number | null
          year?: number | null
        }
        Update: {
          badge_reward?: string | null
          challenge?: string
          challenge_type?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          icon_emoji?: string | null
          id?: string
          is_active?: boolean | null
          points_reward?: number | null
          start_date?: string | null
          target_count?: number | null
          title?: string
          week_number?: number | null
          xp_reward?: number | null
          year?: number | null
        }
        Relationships: []
      }
      workflow_executions: {
        Row: {
          ai_response: string | null
          completed_at: string | null
          created_at: string
          execution_time_ms: number | null
          id: string
          logs: Json | null
          model_used: string | null
          prompt_used: string | null
          result: Json | null
          started_at: string
          status: string | null
          step_number: number | null
          tokens_used: number | null
          user_id: string
          variables: Json | null
          workflow_id: string
        }
        Insert: {
          ai_response?: string | null
          completed_at?: string | null
          created_at?: string
          execution_time_ms?: number | null
          id?: string
          logs?: Json | null
          model_used?: string | null
          prompt_used?: string | null
          result?: Json | null
          started_at?: string
          status?: string | null
          step_number?: number | null
          tokens_used?: number | null
          user_id: string
          variables?: Json | null
          workflow_id: string
        }
        Update: {
          ai_response?: string | null
          completed_at?: string | null
          created_at?: string
          execution_time_ms?: number | null
          id?: string
          logs?: Json | null
          model_used?: string | null
          prompt_used?: string | null
          result?: Json | null
          started_at?: string
          status?: string | null
          step_number?: number | null
          tokens_used?: number | null
          user_id?: string
          variables?: Json | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          definition: Json | null
          description: string | null
          id: string
          is_active: boolean | null
          last_run_at: string | null
          name: string
          run_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          definition?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name: string
          run_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          definition?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name?: string
          run_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      admin_users: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          user_id: string | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_user_points: {
        Args: {
          _action: string
          _points: number
          _resource_id?: string
          _resource_type?: string
          _user_id: string
        }
        Returns: undefined
      }
      award_badge: {
        Args: { _badge_type: string; _user_id: string }
        Returns: boolean
      }
      calculate_user_roi: {
        Args: { p_user_id: string }
        Returns: {
          monthly_minutes_saved: number
          monthly_value_saved: number
          total_automations: number
          weekly_minutes_saved: number
          weekly_value_saved: number
          yearly_minutes_saved: number
          yearly_value_saved: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_challenge_progress: {
        Args: { _challenge_type: string; _user_id: string }
        Returns: {
          challenge_id: string
          completed: boolean
          current: number
          target: number
          title: string
        }[]
      }
      increment_prompt_copy: {
        Args: { _prompt_id: string }
        Returns: undefined
      }
      track_activity: {
        Args: {
          p_resource_id: string
          p_resource_meta?: Json
          p_resource_title?: string
          p_resource_type: string
          p_user_id: string
        }
        Returns: undefined
      }
      update_user_streak: { Args: { _user_id: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
