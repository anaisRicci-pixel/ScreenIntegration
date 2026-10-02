import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

// Variants mirror the Figma "Bouton" component (design.md): Primary/Secondary × Large/Small.
// Figma strokes sit inside the box, so the 1px border is an inset ring: it must not add to the button's size.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-control font-medium whitespace-nowrap ring-1 ring-inset transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-on-accent ring-accent hover:bg-accent-hover hover:ring-accent-hover disabled:bg-border disabled:text-ink disabled:ring-border",
        secondary: "text-ink ring-transparent hover:bg-border disabled:ring-border",
      },
      size: {
        lg: "px-4 py-2.5 text-body [&_svg]:size-4",
        sm: "px-3 py-2 text-body-sm [&_svg]:size-3.5",
        responsive: "px-3 py-2 text-body-sm lg:px-4 lg:py-2.5 lg:text-body [&_svg]:size-3.5 lg:[&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

// Square icon-only button (Figma "BoutonIcone"), e.g. the "⋮" menu on cards.
function IconButton({ className, label, ...props }: React.ComponentProps<"button"> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-sm text-ink transition-colors outline-none hover:bg-border focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      {...props}
    />
  );
}

export { Button, IconButton, buttonVariants };
