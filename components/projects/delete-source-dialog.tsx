"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateSources } from "@/lib/projects-store";
import type { Source } from "@/lib/mock-data";

// Figma "Projet > Sources - Pop in supprimer" (Desktop node 3463:30668 / Mobile node 3475:50749).
export function DeleteSourceDialog({ source, onOpenChange }: { source: Source | null; onOpenChange: (open: boolean) => void }) {
  const handleDelete = () => {
    if (!source) return;
    updateSources((sources) => sources.filter((s) => s.id !== source.id));
    onOpenChange(false);
  };

  return (
    <Dialog open={source !== null} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="flex w-[366px] flex-col items-end gap-6 p-4 lg:w-[576px] lg:gap-8 lg:p-6"
      >
        {source && (
          <>
            <DialogHeader>
              <DialogTitle>Supprimer le fichier</DialogTitle>
            </DialogHeader>

            <p className="w-full text-body-sm text-ink lg:text-body">
              Êtes-vous sur(e) de vouloir supprimer ce fichier des sources du projet ?
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
