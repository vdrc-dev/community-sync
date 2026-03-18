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
          category: string | null
          created_at: string
          description: string | null
          icon_emoji: string | null
          id: string
          is_published: boolean | null
          name: string
          slug: string
          sort_order: number | null
          updated_at: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          is_published?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          is_published?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string
          url?: string | null
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
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
