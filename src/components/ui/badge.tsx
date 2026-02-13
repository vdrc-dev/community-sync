import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/90 text-primary-foreground hover:bg-primary/80 shadow-[0_1px_4px_rgba(34,197,94,0.12)]",
        secondary: "border-white/[0.06] bg-white/[0.06] text-secondary-foreground hover:bg-white/[0.1] backdrop-blur-xl",
        destructive: "border-transparent bg-destructive/90 text-destructive-foreground hover:bg-destructive/80",
        outline: "border-white/[0.08] text-foreground backdrop-blur-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
