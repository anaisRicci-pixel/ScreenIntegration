"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { SidebarNav } from "@/components/nav/sidebar-nav";
import { ProfileChip } from "@/components/shell/profile-chip";
import { Sheet, SheetCloseButton, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Figma "Header / Small / Scroll": once content scrolls under it, the header turns solid white with a bottom rule.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between p-3 transition-colors motion-reduce:transition-none lg:hidden",
        scrolled && "bg-surface shadow-[inset_0_-1px_0_0_var(--color-border)]",
      )}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Ouvrir le menu"
          className="flex size-[35px] items-center justify-center rounded-sm bg-surface p-2 text-ink shadow-float outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Menu aria-hidden className="size-4" />
        </SheetTrigger>
        <SheetContent aria-describedby={undefined} className="gap-4">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex items-center justify-between">
            <Logo className="w-[121px]" />
            <SheetCloseButton label="Fermer le menu" />
          </div>
          <SidebarNav size="sm" onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <Link href="/" aria-label="Accueil" className="outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <Logo className="w-[121px]" priority />
      </Link>
      <ProfileChip compact />
    </header>
  );
}
