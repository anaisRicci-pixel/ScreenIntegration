"use client";

import { useId, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { updateProjects } from "@/lib/projects-store";
import type { Project } from "@/lib/mock-data";

// Same stale-counter situation as Create ("10/15" vs the 20-char seeded name, "0/350"/"82/350" vs the filled
// description on the two frames): not real limits, just mockup numbers. Reusing Create's maximums keeps both
// project forms internally consistent since they edit the same field set.
const NAME_MAX = 60;
const DESCRIPTION_MAX = 350;

export function EditProjectDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const nameId = useId();
  const descriptionId = useId();

  // Re-seed the fields from the current project on every open (adjusting state during render, not an
  // effect, per https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
  const [wasOpen, setWasOpen] = useState(open);
  if (open && !wasOpen) {
    setWasOpen(true);
    setName(project.name);
    setDescription(project.description);
  } else if (!open && wasOpen) {
    setWasOpen(false);
  }

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    updateProjects((projects) =>
      projects.map((p) =>
        p.id === project.id
          ? { ...p, name: trimmed, description: description.trim(), updatedAt: new Date().toISOString() }
          : p,
      ),
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="flex w-[366px] flex-col items-start gap-6 p-4 lg:w-[576px] lg:gap-8 lg:p-6"
      >
        <DialogHeader>
          <DialogTitle>Modifier un projet</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-2 lg:gap-0.5">
            <label htmlFor={nameId} className="font-display text-body-sm font-semibold text-ink lg:text-body">
              Nom du projet
            </label>
            <input
              id={nameId}
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, NAME_MAX))}
              className="h-[42px] w-full rounded-control border border-border bg-white p-3 text-body text-ink outline-none focus:border-2 lg:h-auto"
            />
            <p className="text-caption text-muted">
              {name.length}/{NAME_MAX}
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:gap-0.5">
            <label htmlFor={descriptionId} className="font-display text-body-sm font-semibold text-ink lg:text-body">
              Description du projet
            </label>
            <textarea
              id={descriptionId}
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, DESCRIPTION_MAX))}
              className={cn(
                "h-[140px] w-full resize-none rounded-control border border-border bg-white p-3 text-body text-ink outline-none",
                "focus:border-2 lg:h-[200px]",
              )}
            />
            <p className="text-caption text-muted">
              {description.length}/{DESCRIPTION_MAX}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="responsive" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button size="responsive" disabled={!name.trim()} onClick={handleSubmit}>
            <Save aria-hidden />
            Enregistrer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
