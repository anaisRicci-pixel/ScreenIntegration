"use client";

import { FolderPlus, Plus } from "lucide-react";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/projects-store";

export function ProjectsList() {
  const projects = useProjects();

  return (
    <div className="mx-auto flex w-full max-w-[956px] flex-col gap-6 px-3 py-6 lg:gap-8 lg:px-8 lg:pt-8">
      <div className="flex items-center gap-6 lg:gap-8">
        <h1 className="min-w-0 flex-1 truncate text-h3 font-semibold text-heading lg:text-h1">Projets</h1>
        <CreateProjectDialog>
          <Button size="responsive">
            <Plus aria-hidden className="scale-[1.4]" />
            Projet
          </Button>
        </CreateProjectDialog>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-md bg-surface-glass px-4 py-12 text-center shadow-rest backdrop-blur-[8px]">
          <FolderPlus aria-hidden className="size-6 text-muted" />
          <p className="text-body font-semibold text-ink">Aucun projet pour le moment</p>
          <p className="max-w-sm text-body-sm text-muted">
            Créez un projet pour regrouper vos documents et vos discussions au même endroit.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {projects.map((project) => (
            <li key={project.id} className="grid min-w-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
