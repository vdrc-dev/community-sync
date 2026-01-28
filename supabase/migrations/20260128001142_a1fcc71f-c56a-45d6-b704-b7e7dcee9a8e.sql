-- Add slides column to class_presentations table
ALTER TABLE class_presentations 
ADD COLUMN IF NOT EXISTS slides jsonb DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN class_presentations.slides IS 'Array of slide objects with structure: {id, type, title, subtitle, content, bullets, image, speakerNotes, tags}';