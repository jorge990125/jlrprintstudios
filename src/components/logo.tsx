import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-brand-j">J</span>
        <span className="text-brand-l-red">L</span>
        <span className="text-brand-l-yellow">R</span>
      </span>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          PrintStudios
        </span>
      )}
    </div>
  );
}
