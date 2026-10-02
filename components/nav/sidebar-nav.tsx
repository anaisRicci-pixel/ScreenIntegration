"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlarmClock, ChevronUp, EllipsisVertical, Folder, Library, MessageSquare, Plus } from "lucide-react";
import { Collapsible } from "radix-ui";
import { cn } from "@/lib/utils";
import { discussions, pinnedDiscussions, type Discussion } from "@/lib/mock-data";

type Size = "lg" | "sm";

const row = {
  lg: "h-12 gap-2 pl-3 pr-2 text-body",
  sm: "h-10 gap-2 p-2 text-body-sm",
};
const icon = { lg: "size-4", sm: "size-3.5" };

// Only "Projets" is functional; every other entry is static chrome (SPEC.md §1).
export function SidebarNav({ size, onNavigate }: { size: Size; onNavigate?: () => void }) {
  const pathname = usePathname();
  const projetsActive = pathname.startsWith("/projects");

  return (
    <nav aria-label="Navigation principale" className="flex flex-col gap-4">
      <ul className="flex flex-col">
        <li className={cn("flex items-center rounded-md font-semibold text-accent", row[size], size === "lg" && "h-[43px]")}>
          {/* Lucide's plus fills ~58% of its box, Figma's ~90%: scale (no layout impact) to match the glyph. */}
          <Plus aria-hidden className={cn(icon[size], "shrink-0 scale-[1.4]")} />
          <span className="truncate">Nouvelle discussion</span>
        </li>
        <li className={cn("flex items-center rounded-md", row[size], size === "lg" && "h-[43px]")}>
          <Library aria-hidden className={cn(icon[size], "shrink-0")} />
          <span className="truncate">Bibliothèque de prompts</span>
        </li>
        <li>
          <Link
            href="/projects"
            onClick={onNavigate}
            aria-current={projetsActive ? "page" : undefined}
            className={cn(
              "flex items-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              row[size],
              size === "lg" && "h-[43px]",
              projetsActive ? "bg-accent text-on-accent" : "hover:bg-border",
            )}
          >
            <Folder aria-hidden className={cn(icon[size], "shrink-0")} />
            <span className="flex-1 truncate">Projets</span>
            {size === "sm" && <Plus aria-hidden className="mx-[5px] size-3.5 shrink-0" />}
          </Link>
        </li>
      </ul>

      <DiscussionGroup title="Epinglés" items={pinnedDiscussions} size={size} />
      <DiscussionGroup title="Discussions" items={discussions} size={size} />
    </nav>
  );
}

function DiscussionGroup({ title, items, size }: { title: string; items: Discussion[]; size: Size }) {
  const list = (
    <ul className="flex flex-col">
      {items.map((d) => {
        const Icon = d.ephemeral ? AlarmClock : MessageSquare;
        return (
          <li key={d.id} className={cn("flex items-center", row[size], size === "sm" && "gap-1")}>
            <Icon aria-hidden className={cn(icon[size], "shrink-0")} />
            <span className="flex-1 truncate">{d.title}</span>
            {size === "sm" && <EllipsisVertical aria-hidden className="size-6 shrink-0 p-[5px]" />}
          </li>
        );
      })}
    </ul>
  );

  return (
    <Collapsible.Root defaultOpen asChild>
      <section aria-label={title} className="flex flex-col">
        <h2>
          <Collapsible.Trigger
            className={cn(
              "group flex w-full items-center rounded-md font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent",
              row[size],
            )}
          >
            <span className="flex-1 truncate text-left">{title}</span>
            <ChevronUp
              aria-hidden
              className="size-4 shrink-0 -translate-y-px scale-[1.25] transition-transform group-data-[state=closed]:rotate-180 motion-reduce:transition-none"
            />
          </Collapsible.Trigger>
        </h2>
        <Collapsible.Content>{list}</Collapsible.Content>
      </section>
    </Collapsible.Root>
  );
}
