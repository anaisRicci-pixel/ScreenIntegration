import { Library } from "lucide-react";
import { suggestedPrompts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Suggestions are static on Home; the prompt library is out of scope (SPEC.md §1).
export function SuggestedPrompts({ className }: { className?: string }) {
  return (
    <section aria-label="Prompts suggérés" className={cn("flex items-end lg:justify-center lg:gap-4 lg:px-6", className)}>
      <ul className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto px-3 py-2 lg:grid lg:flex-none lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:p-0">
        {suggestedPrompts.map((p) => (
          <li
            key={p.id}
            className="flex w-[126px] shrink-0 flex-col gap-1.5 rounded-md bg-surface-glass p-2 shadow-rest backdrop-blur-[8px] lg:w-[200px] lg:px-4 lg:py-3"
          >
            <p className="hidden truncate font-display text-body-sm text-heading lg:block">{p.title}</p>
            <p className="line-clamp-2 text-caption text-ink">{p.text}</p>
          </li>
        ))}
        <li className="w-[88px] shrink-0 p-2 text-caption text-ink lg:hidden">Ma bibliothèque de prompts</li>
      </ul>
      <span aria-hidden className="hidden size-11 items-center justify-center text-accent lg:flex">
        <Library className="size-5" />
      </span>
    </section>
  );
}
