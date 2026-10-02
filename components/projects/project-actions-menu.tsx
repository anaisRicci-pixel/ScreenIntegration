"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EllipsisVertical, Pencil, Pin, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteProjectDialog } from "@/components/projects/delete-project-dialog";
import { EditProjectDialog } from "@/components/projects/edit-project-dialog";
import { IconButton } from "@/components/ui/button";
import { updateProjects } from "@/lib/projects-store";
import type { Project } from "@/lib/mock-data";

// Figma "⋮" Context Menu on the project detail page (node 3427:27556): Épingler/Désépingler, Modifier,
// Supprimer - same three options and pin toggle as ProjectCardActionsMenu on Liste des projets.
export function ProjectActionsMenu({ project }: { project: Project }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const togglePin = () => {
    updateProjects((projects) => projects.map((p) => (p.id === project.id ? { ...p, pinned: !p.pinned } : p)));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton label={`Actions pour le projet ${project.name}`} className="size-8 lg:size-11">
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
      <DeleteProjectDialog
        project={deleting ? project : null}
        onOpenChange={setDeleting}
        onDeleted={() => router.push("/projects")}
      />
    </>
  );
}
