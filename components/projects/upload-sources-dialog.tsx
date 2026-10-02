"use client";

import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { updateSources } from "@/lib/projects-store";

// Figma "Projet > Sources - Pop in upload" (Desktop node 3441:29122 / Mobile node 3463:31443). Unlike every
// other dialog in the app, both frames use the exact same text size and dropzone padding on mobile and
// desktop, so the dropzone/button content below has no lg: scale-down.
export function UploadSourcesDialog({ projectId, children }: { projectId: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleUpload = () => {
    // SPEC.md §5: fully mocked, no real file picker - always inserts this one fixed file
    // (matches the Figma "Fichier uploadé" state, prepended like a just-added row).
    updateSources((sources) => [
      {
        id: `source-${Date.now()}`,
        projectId,
        name: "Quarterly June-July 2026 analysis (1).xls",
        kind: "excel",
        addedAt: new Date().toISOString(),
      },
      ...sources,
    ]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="flex w-[366px] flex-col items-end gap-6 p-4 lg:w-[576px] lg:gap-8 lg:p-6"
      >
        <DialogHeader>
          <DialogTitle>Ajouter des sources</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center justify-center border border-dashed border-border px-[41px] py-[55px]">
            <div className="flex flex-col items-center gap-4 rounded-md p-4">
              <FileText aria-hidden strokeWidth={1.5} className="size-12 text-ink" />
              <p className="text-body text-ink">Déposer des fichiers</p>
            </div>
          </div>
          <Button onClick={handleUpload}>
            <Plus aria-hidden />
            Charger des fichiers depuis l’appareil
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
