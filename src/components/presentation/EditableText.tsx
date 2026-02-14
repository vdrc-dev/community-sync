import { useState, useRef, KeyboardEvent, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  defaultValue: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'p' | 'span';
  onSave?: (value: string) => void;
}

export const EditableText = forwardRef<HTMLElement, EditableTextProps>(
  ({ defaultValue, className, tag: Tag = 'span', onSave }, _forwardedRef) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const ref = useRef<HTMLElement>(null);

    const handleBlur = () => {
      setIsEditing(false);
      if (ref.current) {
        const newValue = ref.current.innerText;
        setValue(newValue);
        onSave?.(newValue);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        ref.current?.blur();
      }
      if (e.key === 'Escape') {
        if (ref.current) {
          ref.current.innerText = value;
        }
        ref.current?.blur();
      }
    };

    return (
      <Tag
        ref={ref as any}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          'outline-none transition-all duration-200 cursor-text',
          'focus:border-b-2 focus:border-amber-500/50',
          'hover:bg-white/5 rounded px-1 -mx-1',
          className
        )}
      >
        {value}
      </Tag>
    );
  }
);

EditableText.displayName = 'EditableText';
