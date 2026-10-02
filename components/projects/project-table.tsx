import { EllipsisVertical, Pin } from "lucide-react";
import { IconButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProjectTableRow = {
  id: string;
  title: string;
  subtitle: string;
  leading?: React.ReactNode;
  actionLabel: string;
  /** Optional: makes the row clickable (e.g. source preview) via a stretched hit-area, like ProjectCard's title link. */
  onClick?: () => void;
  /** Optional: replaces the inert "⋮" button with a real menu (e.g. Sources' Supprimer, Chats' pin/delete). */
  actions?: React.ReactNode;
  /** Shows a pin indicator in the `spacer` column (Chats only). */
  pinned?: boolean;
};

// Figma "Tableau" / "DataGrid Cell": glass container, rows separated by an inset bottom rule, "⋮" column on the right.
// `spacer`: the Figma chat table's empty 16px middle column, which narrows the title - it's where a pinned chat's pin icon lives.
export function ProjectTable({ rows, label, spacer = false }: { rows: ProjectTableRow[]; label: string; spacer?: boolean }) {
  return (
    <ul aria-label={label} className="flex flex-col rounded-md bg-surface-glass p-2 lg:p-4">
      {rows.map((row) => (
        <li
          key={row.id}
          className="relative flex h-[52px] items-center shadow-[inset_0_-1px_0_0_var(--color-border)] last:shadow-none lg:h-14"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
            {row.leading}
            <div className="min-w-0 flex-1">
              {row.onClick ? (
                <button
                  type="button"
                  onClick={row.onClick}
                  className={cn(
                    "block w-full truncate text-left text-body text-ink outline-none after:absolute after:inset-0",
                    "focus-visible:underline",
                  )}
                >
                  {row.title}
                </button>
              ) : (
                <p className="truncate text-body text-ink">{row.title}</p>
              )}
              <p className="truncate text-caption text-muted">{row.subtitle}</p>
            </div>
          </div>
          {spacer && (
            <span aria-hidden className="flex w-4 shrink-0 items-center justify-center">
              {row.pinned && <Pin className="size-3.5 fill-current text-muted" />}
            </span>
          )}
          <div className="relative z-10 p-2">
            {row.actions ?? (
              // Chat actions (pin, rename, delete) belong to a later screen: the button stays inert for now.
              <IconButton label={row.actionLabel} className="size-6 lg:size-8">
                <EllipsisVertical aria-hidden className="size-4" />
              </IconButton>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
