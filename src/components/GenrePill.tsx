"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type GenrePillProps = {
  active?: boolean;
  label: string;
  onClick?: () => void;
  className?: string;
};

export function GenrePill({ active, label, onClick, className }: GenrePillProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <Badge
      variant={active ? "default" : "outline"}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center",
        "rounded-[19px]",
        "h-[38px]",
        "px-8",
        "genre-pill", // Force Inter-Regular (400) for genre pills
        active && "border-transparent bg-[rgba(0,114,100,1)] text-white",
        !active && "border-transparent bg-[rgba(24,24,24,1)] text-white",
        className
      )}
    >
      {label}
    </Badge>
  );
}
