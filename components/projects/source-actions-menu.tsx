"use client";

import { Download, EllipsisVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/button";
import type { Source } from "@/lib/mock-data";

// Figma "⋮" Context Menu on a source row (Desktop node 3463:30456 / Mobile node 3475:50512): Télécharger /
// Supprimer. Only Supprimer is in scope for this build (the Pop in supprimer); Télécharger stays a real,
// focusable, unwired option like every other not-yet-built action.
export function SourceActionsMenu({ source, onDelete }: { source: Source; onDelete: (source: Source) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton label={`Actions pour la source ${source.name}`} className="size-6 lg:size-8">
          <EllipsisVertical aria-hidden className="size-4" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Download aria-hidden className="size-4" />
          Télécharger
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onDelete(source)}>
          <Trash2 aria-hidden className="size-4" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
