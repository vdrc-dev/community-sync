import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  fullScreen = false,
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const spinner = (
    <Loader2 
      className={cn(
        "animate-spin text-primary",
        sizeClasses[size],
        className
      )} 
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center circuit-bg">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-muted-foreground text-sm animate-pulse">Cargando...</p>
        </div>
      </div>
    );
  }

  return spinner;
}
