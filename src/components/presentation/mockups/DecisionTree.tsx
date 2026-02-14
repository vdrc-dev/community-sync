import { cn } from '@/lib/utils';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface TreeNode {
  question?: string;
  answer?: string;
  icon?: LucideIcon;
  color?: 'blue' | 'pink' | 'emerald' | 'orange' | 'gray';
  children?: TreeNode[];
}

interface DecisionTreeProps {
  root: TreeNode;
  className?: string;
}

const colorMap = {
  blue: 'bg-blue-500/15 border-blue-500/25 text-blue-400',
  pink: 'bg-pink-500/15 border-pink-500/25 text-pink-400',
  emerald: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400',
  orange: 'bg-orange-500/15 border-orange-500/25 text-orange-400',
  gray: 'bg-gray-500/15 border-gray-500/25 text-gray-400',
};

function TreeNodeComponent({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const color = node.color || 'gray';
  const Icon = node.icon;

  return (
    <div className={cn('space-y-2', depth > 0 && 'ml-6 border-l border-border/30 pl-4')}>
      {node.question ? (
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
          <p className="text-sm font-medium">{node.question}</p>
        </div>
      ) : node.answer ? (
        <div className={cn(
          'flex items-center gap-2 p-3 rounded-lg border',
          colorMap[color]
        )}>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span className="text-sm font-medium">{node.answer}</span>
        </div>
      ) : null}

      {node.children && node.children.length > 0 && (
        <div className="space-y-2">
          {node.children.map((child, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground/40 mt-3 shrink-0" />
              <div className="flex-1">
                <TreeNodeComponent node={child} depth={depth + 1} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DecisionTree({ root, className }: DecisionTreeProps) {
  return (
    <div className={cn('', className)}>
      <TreeNodeComponent node={root} />
    </div>
  );
}
