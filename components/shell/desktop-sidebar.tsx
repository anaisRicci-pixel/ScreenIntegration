"use client";

import { useEffect, useRef, useState } from "react";
import { Library, PanelLeft, Plus, Search } from "lucide-react";
import { SidebarNav } from "@/components/nav/sidebar-nav";
import { cn } from "@/lib/utils";

const focusRing = "outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function DesktopSidebar() {
  const [open, setOpen] = useState(true);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const toggled = useRef(false);

  // The clicked toggle unmounts on swap; move focus to its counterpart so keyboard users don't land on <body>.
  useEffect(() => {
    if (toggled.current) toggleRef.current?.focus();
  }, [open]);

  const toggle = (next: boolean) => {
    toggled.current = true;
    setOpen(next);
  };

  return (
    <aside
      id="desktop-sidebar"
      className={cn(
        "hidden shrink-0 overflow-x-hidden overflow-y-auto bg-surface-glass py-6 transition-[width] duration-300 ease-in-out motion-reduce:transition-none lg:block",
        open ? "w-[300px] px-3" : "w-[76px] px-4",
      )}
    >
      {open ? (
        <div className="flex w-[276px] flex-col gap-4">
          <div className="flex justify-end gap-3 text-muted">
            {/* Search is static chrome (SPEC.md §1). */}
            <span aria-hidden className="flex size-8 items-center justify-center">
              <Search className="size-[17px]" />
            </span>
            <button
              type="button"
              ref={toggleRef}
              onClick={() => toggle(false)}
              aria-expanded
              aria-controls="desktop-sidebar"
              aria-label="Fermer le menu latéral"
              className={cn("flex size-8 items-center justify-center rounded-md transition-colors hover:bg-border", focusRing)}
            >
              <PanelLeft aria-hidden className="size-[19px]" />
            </button>
          </div>
          <SidebarNav size="lg" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            ref={toggleRef}
            onClick={() => toggle(true)}
            aria-expanded={false}
            aria-controls="desktop-sidebar"
            aria-label="Ouvrir le menu latéral"
            className={cn(
              "flex size-11 items-center justify-center rounded-lg border border-border bg-surface-glass text-ink shadow-rest transition-colors hover:bg-surface",
              focusRing,
            )}
          >
            <PanelLeft aria-hidden className="size-4" />
          </button>
          {/* Collapsed shortcuts mirror the Figma rail; they are static chrome like their expanded counterparts. */}
          <div aria-hidden className="flex flex-col items-center gap-2.5">
            <span className="flex size-11 items-center justify-center text-ink">
              <Search className="size-4" />
            </span>
            <span className="flex size-11 items-center justify-center text-accent">
              <Plus className="size-4" />
            </span>
            <span className="flex size-11 items-center justify-center text-ink">
              <Library className="size-4" />
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
