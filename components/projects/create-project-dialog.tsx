"use client";

import { useId, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { updateProjects } from "@/lib/projects-store";

// Figma's own "10/15" and "0/350" vs "82/350" counters disagree with each other and with the
// filled example text on both frames, so they're not real limits — just stale mockup numbers.
// These are real, working maximums sized to comfortably fit the longest seeded project name (43 chars).
const NAME_MAX = 60;
const DESCRIPTION_MAX = 350;

export function CreateProjectDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const nameId = useId();
  const descriptionId = useId();

  const reset = () => {
    setName("");
    setDescription("");
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) reset();
  };

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    updateProjects((projects) => [
      {
        id: `project-${Date.now()}`,
        name: trimmed,
        description: description.trim(),
        updatedAt: new Date().toISOString(),
        pinned: false,
      },
      ...projects,
    ]);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="flex w-[366px] flex-col items-end gap-4 p-4 lg:w-[576px] lg:gap-8 lg:p-6"
      >
        <DialogHeader>
          <DialogTitle>Créer un projet</DialogTitle>
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
          <Button variant="secondary" size="responsive" onClick={() => handleOpenChange(false)}>
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
