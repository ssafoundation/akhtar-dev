import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  tilt = false
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  return (
    <div
      data-tilt-card={tilt ? true : undefined}
      className={cn("glass premium-border rounded-[8px] p-6", className)}
    >
      {children}
    </div>
  );
}
