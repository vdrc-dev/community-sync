-- =====================================================
-- PERFORMANCE OPTIMIZATION: DATABASE INDEXES
-- Aggressive indexing for zero-latency queries
-- =====================================================

-- Activity Log indexes for leaderboard and user queries
CREATE INDEX IF NOT EXISTS idx_activity_log_user_created 
ON public.activity_log(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_log_action 
ON public.activity_log(action, created_at DESC);

-- User Points indexes for leaderboard ranking
CREATE INDEX IF NOT EXISTS idx_user_points_ranking 
ON public.user_points(points DESC, level DESC);

CREATE INDEX IF NOT EXISTS idx_user_points_user 
ON public.user_points(user_id);

-- User Progress indexes for completion tracking
CREATE INDEX IF NOT EXISTS idx_user_progress_user_class 
ON public.user_progress(user_id, class_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_completed 
ON public.user_progress(completed_at DESC);

-- Classes indexes for generation queries
CREATE INDEX IF NOT EXISTS idx_classes_generation_number 
ON public.classes(generation_id, class_number);

CREATE INDEX IF NOT EXISTS idx_classes_date 
ON public.classes(class_date DESC);

-- Tools indexes for category filtering
CREATE INDEX IF NOT EXISTS idx_tools_category_featured 
ON public.tools(category, is_featured DESC);

CREATE INDEX IF NOT EXISTS idx_tools_name_search 
ON public.tools USING gin(to_tsvector('spanish', name || ' ' || COALESCE(description, '')));

-- Prompts indexes for library browsing
CREATE INDEX IF NOT EXISTS idx_prompts_category_featured 
ON public.prompt_library(category, is_featured DESC, copy_count DESC);

CREATE INDEX IF NOT EXISTS idx_prompts_public 
ON public.prompt_library(is_public, created_at DESC) WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_prompts_search 
ON public.prompt_library USING gin(to_tsvector('spanish', title || ' ' || COALESCE(description, '') || ' ' || prompt_text));

-- Workflows indexes for catalog
CREATE INDEX IF NOT EXISTS idx_workflows_category_difficulty 
ON public.automation_workflows(category, difficulty);

CREATE INDEX IF NOT EXISTS idx_workflows_published_featured 
ON public.automation_workflows(is_published, is_featured DESC) WHERE is_published = true;

-- User Workflow Progress for tracking
CREATE INDEX IF NOT EXISTS idx_workflow_progress_user 
ON public.user_workflow_progress(user_id, workflow_id);

-- Forum indexes for browsing and search
CREATE INDEX IF NOT EXISTS idx_forum_posts_category_pinned 
ON public.forum_posts(category_id, is_pinned DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_forum_posts_author 
ON public.forum_posts(author_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_forum_comments_post 
ON public.forum_comments(post_id, created_at);

-- Notifications index for user inbox
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread 
ON public.notifications(user_id, is_read, created_at DESC);

-- User Streaks index
CREATE INDEX IF NOT EXISTS idx_user_streaks_user 
ON public.user_streaks(user_id);

-- Bookmarks indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_type 
ON public.user_bookmarks(user_id, resource_type, created_at DESC);

-- Quick Notes indexes
CREATE INDEX IF NOT EXISTS idx_quick_notes_user 
ON public.quick_notes(user_id, created_at DESC);

-- Calendar Events indexes
CREATE INDEX IF NOT EXISTS idx_calendar_events_date 
ON public.calendar_events(event_date);

CREATE INDEX IF NOT EXISTS idx_calendar_events_generation 
ON public.calendar_events(generation_id, event_date);

-- User Tool Logs
CREATE INDEX IF NOT EXISTS idx_tool_logs_user_status 
ON public.user_tool_logs(user_id, status);

-- Generations index
CREATE INDEX IF NOT EXISTS idx_generations_active_code 
ON public.generations(is_active, code);

-- User Activity Resume for "continue learning"
CREATE INDEX IF NOT EXISTS idx_activity_resume_user_recent 
ON public.user_activity_resume(user_id, last_accessed_at DESC);

-- Challenge Progress
CREATE INDEX IF NOT EXISTS idx_challenge_progress_user 
ON public.user_challenge_progress(user_id, challenge_id);

-- Weekly Challenges
CREATE INDEX IF NOT EXISTS idx_challenges_active_dates 
ON public.weekly_challenges(is_active, start_date, end_date);