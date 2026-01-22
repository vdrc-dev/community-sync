import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useBookmarks, ResourceType } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  resourceType: ResourceType;
  resourceId: string;
  size?: 'sm' | 'default';
  variant?: 'ghost' | 'outline';
  showLabel?: boolean;
  className?: string;
}

export function BookmarkButton({
  resourceType,
  resourceId,
  size = 'sm',
  variant = 'ghost',
  showLabel = false,
  className,
}: BookmarkButtonProps) {
  const { user } = useAuth();
  const { isBookmarked, getBookmark, toggleBookmark, updateBookmark, allTags } = useBookmarks();
  const [isOpen, setIsOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const bookmarked = isBookmarked(resourceType, resourceId);
  const bookmark = getBookmark(resourceType, resourceId);

  const handleToggle = () => {
    if (!bookmarked) {
      setIsOpen(true);
    }
    toggleBookmark({ type: resourceType, resourceId });
  };

  const handleAddTag = () => {
    if (!newTag.trim() || !bookmark) return;
    
    const currentTags = bookmark.tags || [];
    if (!currentTags.includes(newTag.trim())) {
      updateBookmark({
        bookmarkId: bookmark.id,
        tags: [...currentTags, newTag.trim()],
      });
    }
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    if (!bookmark) return;
    updateBookmark({
      bookmarkId: bookmark.id,
      tags: bookmark.tags.filter(t => t !== tag),
    });
  };

  if (!user) return null;

  return (
    <Popover open={isOpen && bookmarked} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={handleToggle}
          className={cn(
            "gap-1.5 transition-all",
            bookmarked && "text-primary",
            className
          )}
        >
          <motion.div
            initial={false}
            animate={bookmarked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {bookmarked ? (
              <BookmarkCheck className={cn("h-4 w-4", size === 'sm' && "h-3.5 w-3.5")} />
            ) : (
              <Bookmark className={cn("h-4 w-4", size === 'sm' && "h-3.5 w-3.5")} />
            )}
          </motion.div>
          {showLabel && (
            <span className="hidden sm:inline text-xs">
              {bookmarked ? 'Guardado' : 'Guardar'}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-3" align="end">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-4 w-4" />
              Etiquetas
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Current tags */}
          <AnimatePresence mode="popLayout">
            <div className="flex flex-wrap gap-1.5">
              {bookmark?.tags.map((tag) => (
                <motion.div
                  key={tag}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Badge
                    variant="secondary"
                    className="gap-1 pr-1 cursor-pointer hover:bg-destructive/20"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag}
                    <X className="h-3 w-3" />
                  </Badge>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Add new tag */}
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Nueva etiqueta..."
              className="h-8 text-sm"
            />
            <Button size="sm" className="h-8" onClick={handleAddTag}>
              +
            </Button>
          </div>

          {/* Suggested tags */}
          {allTags.length > 0 && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Sugerencias</p>
              <div className="flex flex-wrap gap-1">
                {allTags.slice(0, 6).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer text-xs hover:bg-accent"
                    onClick={() => {
                      setNewTag(tag);
                      handleAddTag();
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
