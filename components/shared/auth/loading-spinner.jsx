import { cn } from "@/lib/utils";

export function LoadingSpinner({
  size = "sm",
  className,
  text
}) {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-current border-t-transparent",
          sizeClasses[size]
        )}
      />
      {text && (
        <span className="text-sm text-current">{text}</span>
      )}
    </div>
  );
}

export function SkeletonLoader({ className }) {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-10 bg-muted rounded w-full"></div>
      <div className="h-10 bg-muted rounded w-full"></div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" className="text-primary" />
        <p className="text-sm text-muted-foreground">Memuat...</p>
      </div>
    </div>
  );
}