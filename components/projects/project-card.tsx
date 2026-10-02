import Link from "next/link";
import { Folder, Pin } from "lucide-react";
import { ProjectCardActionsMenu } from "@/components/projects/project-card-actions-menu";
import { IconButton } from "@/components/ui/button";
import { formatUpdatedAt } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import { updateProjects } from "@/lib/projects-store";
import type { Project } from "@/lib/mock-data";

// The title link's ::after covers the card so the whole card is clickable,
// while the "⋮" button sits above it (a button can't be nested inside a link).
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex min-w-0 flex-col justify-end gap-4 rounded-md bg-surface-glass p-4 shadow-rest ring-inset backdrop-blur-[8px] transition-colors hover:bg-surface hover:shadow-hover hover:ring-1 hover:ring-accent has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <Folder aria-hidden className="size-3.5 shrink-0 text-ink lg:size-4" />
          <h2 className="min-w-0 flex-1 truncate text-body-sm leading-normal font-semibold text-ink lg:text-body">
            <Link href={`/projects/${project.id}`} className="outline-none after:absolute after:inset-0 after:rounded-md">
              {project.name}
            </Link>
          </h2>
          {/* Figma "Projet / Hover": a quick-pin button appears next to "⋮" on hover/focus when unpinned;
              once pinned it stays visible as a persistent badge (also a quick-unpin shortcut). */}
          <IconButton
            label={project.pinned ? `Désépingler le projet ${project.name}` : `Épingler le projet ${project.name}`}
            onClick={() =>
              updateProjects((projects) => projects.map((p) => (p.id === project.id ? { ...p, pinned: !p.pinned } : p)))
            }
            className={cn(
              "relative z-10 size-6 lg:size-8",
              project.pinned ? "inline-flex" : "hidden group-focus-within:inline-flex group-hover:inline-flex",
            )}
          >
            <Pin aria-hidden className={cn("size-3.5", project.pinned && "fill-current")} />
          </IconButton>
          <ProjectCardActionsMenu project={project} />
        </div>
        {/* -mr-1: Figma lets the ellipsis overhang the text box by ~1px, Chrome doesn't; this reproduces its "and…" cut. */}
        {project.description && <p className="-mr-1 hidden text-body text-muted lg:line-clamp-3">{project.description}</p>}
      </div>
      <p className="text-caption text-muted">{formatUpdatedAt(project.updatedAt)}</p>
    </article>
  );
}
