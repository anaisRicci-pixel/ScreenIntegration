"use client";

import { useId } from "react";
import { Library, Mic, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectComposerProps = {
  className?: string;
  /** Omitted on the Sources tab: the field stays typeable but decorative, as before. */
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

// Figma "Zone de prompt" (project variant). Controlled only on the Chats tab (ChatSessionProvider),
// where Enter sends the scripted or generic reply (SPEC.md §4); elsewhere purely visual.
export function ProjectComposer({ className, value, onChange, onSubmit }: ProjectComposerProps) {
  const id = useId();
  const controlled = onSubmit !== undefined;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!onSubmit || e.key !== "Enter" || e.shiftKey) return;
    e.preventDefault();
    const text = e.currentTarget.value;
    if (text.trim()) onSubmit(text);
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-6 rounded-lg bg-surface px-4 pt-4 pb-3 shadow-composer ring-1 ring-border ring-inset focus-within:ring-2 lg:rounded-prompt lg:pt-6 lg:pb-4">
        <div className="relative px-2 lg:pr-0 lg:pl-3">
          <label htmlFor={id} className="sr-only">
            Votre message
          </label>
          {/* Placeholder differs per viewport in Figma, so it's rendered as text hidden once the field has content. */}
          <textarea
            id={id}
            rows={1}
            placeholder=" "
            value={controlled ? value : undefined}
            onChange={controlled ? (e) => onChange?.(e.target.value) : undefined}
            onKeyDown={controlled ? handleKeyDown : undefined}
            className="peer block w-full resize-none bg-transparent text-body-sm text-ink outline-none lg:text-body"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-2 text-body-sm text-ink peer-[:not(:placeholder-shown)]:hidden lg:hidden"
          >
            Que puis-je pour vous aujourd’hui ?
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-3 hidden text-body text-ink peer-[:not(:placeholder-shown)]:hidden lg:block"
          >
            Message Secured ChatGPT
          </span>
        </div>
        <div className="flex items-end justify-between lg:items-center">
          <span aria-hidden className="flex items-center justify-center rounded-sm p-2 text-accent lg:size-11">
            <Plus className="size-4 scale-[1.4] lg:size-5" />
          </span>
          <div className="flex items-center gap-2 lg:gap-3">
            <span aria-hidden className="flex items-center rounded-md bg-border p-0.5 text-caption lg:p-[3px] lg:text-body-sm">
              <span className="rounded-segment bg-accent px-2 py-0.5 font-medium text-on-accent lg:px-3 lg:py-[3px]">Rapide</span>
              <span className="rounded-segment px-2 py-0.5 text-muted lg:px-3 lg:py-[3px]">Avancé</span>
            </span>
            <span aria-hidden className="hidden size-11 items-center justify-center text-accent lg:flex">
              <Library className="size-5" />
            </span>
            {controlled ? (
              <button
                type="button"
                aria-label="Envoyer le message"
                disabled={!value?.trim()}
                onClick={() => value && onSubmit(value)}
                className="flex items-center justify-center rounded-sm bg-accent p-2 text-on-accent outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 lg:rounded-md lg:p-3"
              >
                <Mic aria-hidden className="size-4 lg:size-5" />
              </button>
            ) : (
              <span className={cn("flex items-center justify-center rounded-sm bg-accent p-2 text-on-accent lg:rounded-md lg:p-3")}>
                <Mic aria-hidden className="size-4 lg:size-5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
