"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateProjects } from "@/lib/projects-store";
import type { Project } from "@/lib/mock-data";

// Figma "Projet 'Copenhague' - Pop in Supprimer un projet" (Desktop node 3427:33645 / Mobile node 3475:... -
// same Popover pattern as DeleteSourceDialog, project name interpolated into the confirmation text.
export function DeleteProjectDialog({
  project,
  onOpenChange,
  onDeleted,
}: {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}) {
  const handleDelete = () => {
    if (!project) return;
    updateProjects((projects) => projects.filter((p) => p.id !== project.id));
    onOpenChange(false);
    onDeleted?.();
  };

  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="flex w-[366px] flex-col items-end gap-6 p-4 lg:w-[576px] lg:gap-8 lg:p-6"
      >
        {project && (
          <>
            <DialogHeader>
              <DialogTitle>Supprimer le projet</DialogTitle>
            </DialogHeader>

            <p className="w-full text-body-sm text-ink lg:text-body">
              Êtes-vous sur(e) de vouloir supprimer le projet {project.name} ?
            </p>

            <div className="flex items-center gap-3">
              <Button variant="secondary" size="responsive" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button size="responsive" onClick={handleDelete}>
                <Trash2 aria-hidden />
                Supprimer
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
