import { Mic, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Home's composer is non-functional (SPEC.md §2): the field is typeable, controls are visual only.
export function PromptComposer({ className }: { className?: string }) {
  return (
    <div className={cn("px-3 lg:px-0", className)}>
      <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface px-4 pt-4 pb-3 shadow-composer focus-within:ring-2 focus-within:ring-border lg:gap-12 lg:rounded-composer lg:border-surface lg:pt-6 lg:pb-4">
        <label htmlFor="home-prompt" className="sr-only">
          Votre message
        </label>
        <textarea
          id="home-prompt"
          rows={1}
          placeholder="Que puis-je pour vous aujourd’hui ?"
          className="w-full resize-none bg-transparent px-2 text-body-sm text-ink outline-none placeholder:text-ink lg:px-3 lg:text-body"
        />
        <div aria-hidden className="flex items-end justify-between lg:items-center">
          <span className="flex items-center justify-center rounded-sm p-2 text-accent lg:size-11">
            <Plus className="size-4 lg:size-5" />
          </span>
          <div className="flex items-center gap-2 lg:gap-3">
            <span className="flex items-center rounded-md bg-border p-0.5 text-caption lg:p-[3px] lg:text-body-sm">
              <span className="rounded-segment bg-accent px-2 py-0.5 font-medium text-on-accent lg:px-3 lg:py-[3px]">Rapide</span>
              <span className="rounded-segment px-2 py-0.5 text-muted lg:px-3 lg:py-[3px]">Avancé</span>
            </span>
            <span className="flex items-center justify-center rounded-sm bg-accent p-2 text-on-accent lg:rounded-md lg:p-3">
              <Mic className="size-4 lg:size-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
