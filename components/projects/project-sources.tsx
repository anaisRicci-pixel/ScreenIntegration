"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import { DeleteSourceDialog } from "@/components/projects/delete-source-dialog";
import { ProjectTable } from "@/components/projects/project-table";
import { SourceActionsMenu } from "@/components/projects/source-actions-menu";
import { SourcePreviewDialog } from "@/components/projects/source-preview-dialog";
import { UploadSourcesDialog } from "@/components/projects/upload-sources-dialog";
import { Button } from "@/components/ui/button";
import { formatUpdatedAt } from "@/lib/format-date";
import type { Source } from "@/lib/mock-data";
import { useSources } from "@/lib/projects-store";
import { SOURCE_KINDS } from "@/lib/source-kinds";

export function ProjectSources({ projectId }: { projectId: string }) {
  const sources = useSources().filter((s) => s.projectId === projectId);
  const [previewing, setPreviewing] = useState<Source | null>(null);
  const [deleting, setDeleting] = useState<Source | null>(null);

  return (
    <>
      <UploadSourcesDialog projectId={projectId}>
        <Button size="responsive" className="self-start">
          <Plus aria-hidden className="scale-[1.4]" />
          Source
        </Button>
      </UploadSourcesDialog>
      {sources.length > 0 && (
        <ProjectTable
          label="Sources du projet"
          rows={sources.map((s) => ({
            id: s.id,
            title: s.name,
            subtitle: `${SOURCE_KINDS[s.kind].label} - ${formatUpdatedAt(s.addedAt)}`,
            actionLabel: `Actions pour la source ${s.name}`,
            onClick: () => setPreviewing(s),
            actions: <SourceActionsMenu source={s} onDelete={setDeleting} />,
            leading: (
              <Image
                src={SOURCE_KINDS[s.kind].thumbnail}
                alt=""
                width={32}
                height={32}
                className="size-6 shrink-0 rounded-sm object-cover lg:size-8"
              />
            ),
          }))}
        />
      )}
      <SourcePreviewDialog source={previewing} onOpenChange={(open) => !open && setPreviewing(null)} />
      <DeleteSourceDialog source={deleting} onOpenChange={(open) => !open && setDeleting(null)} />
    </>
  );
}
