"use client";

import { useState } from "react";
import { EllipsisVertical, Pencil, Pin, Trash2 } from "lucide-react";
import { DeleteProjectDialog } from "@/components/projects/delete-project-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditProjectDialog } from "@/components/projects/edit-project-dialog";
import { IconButton } from "@/components/ui/button";
import { updateProjects } from "@/lib/projects-store";
import type { Project } from "@/lib/mock-data";

// Figma "⋮" Context Menu on a project card (Liste des projets): Épingler/Désépingler, Modifier, Supprimer
// (Desktop nodes 3434:10690 / 3434:13344; a different menu from ProjectActionsMenu's Modifier/Supprimer-only
// one on the project detail page, which has no pin option).
export function ProjectCardActionsMenu({ project }: { project: Project }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const togglePin = () => {
    updateProjects((projects) => projects.map((p) => (p.id === project.id ? { ...p, pinned: !p.pinned } : p)));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton label={`Actions pour le projet ${project.name}`} className="relative z-10 size-6 lg:size-8">
            <EllipsisVertical aria-hidden className="size-4" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={togglePin}>
            <Pin aria-hidden className="size-4" />
            {project.pinned ? "Désépingler" : "Épingler"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <Pencil aria-hidden className="size-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDeleting(true)}>
            <Trash2 aria-hidden className="size-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditProjectDialog project={project} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteProjectDialog project={deleting ? project : null} onOpenChange={(open) => setDeleting(open)} />
    </>
  );
}
