"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        // Confirmed against the Create-project dialog frames (design.md gap note, now resolved): 50%, not 40%.
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "left",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: "left" | "right" }) {
  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-surface p-3 shadow-hover transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-300",
          side === "left"
            ? "left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
            : "right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn("font-semibold text-heading", className)} {...props} />;
}

function SheetCloseButton({ className, label = "Fermer" }: { className?: string; label?: string }) {
  return (
    <SheetPrimitive.Close
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border border-border bg-surface-glass p-3 text-ink shadow-rest outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
    >
      <XIcon aria-hidden className="size-4" />
      <span className="sr-only">{label}</span>
    </SheetPrimitive.Close>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetCloseButton };
