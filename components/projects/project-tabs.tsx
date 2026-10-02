"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Figma "Horizontal TabList". Unlike most Figma strokes here, these two add to the height (measured on the reference):
// the tab's 2px underline sits below its padding, and the list's 1px rule sits below the tabs.
export function ProjectTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const base = `/projects/${projectId}`;
  const tabs = [
    { href: base, label: "Chats", active: pathname === base },
    { href: `${base}/sources`, label: "Sources", active: pathname === `${base}/sources` },
  ];

  return (
    <nav aria-label="Sections du projet" className="flex items-center border-b border-border">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          className={cn(
            "rounded-t-sm px-4 py-2 text-body-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset lg:py-3 lg:text-body",
            // Only the active tab carries the underline, so it's 2px taller; the centered inactive tab sits 1px lower, as in Figma.
            tab.active ? "border-b-2 border-accent text-accent" : "text-ink hover:text-heading lg:px-6",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
