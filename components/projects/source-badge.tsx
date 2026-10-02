import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

// Figma "Badge" (Filled): opens the same file-preview dialog used in Sources (Journey 3 steps 13-14).
export function SourceBadge({ label, className, onClick }: { label: string; className?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-border px-2 py-1 text-caption text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
    >
      <Paperclip aria-hidden className="size-3.5 shrink-0" />
      {label}
    </button>
  );
}
