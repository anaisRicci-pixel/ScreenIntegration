"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Source } from "@/lib/mock-data";
import { SOURCE_KINDS } from "@/lib/source-kinds";

// Figma "Pop in Visualiser - Aperçu JPG,PNG": only .jpg/.png get a real image render (SPEC.md §5);
// every other kind reuses the same dialog with its file-type icon centered as a generic placeholder.
export function SourcePreviewDialog({ source, onOpenChange }: { source: Source | null; onOpenChange: (open: boolean) => void }) {
  const isImage = source?.kind === "image";

  return (
    <Dialog open={source !== null} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="flex w-[358px] flex-col items-center gap-6 p-4 lg:w-[874px] lg:items-end lg:gap-8 lg:p-6"
      >
        {source && (
          <>
            <DialogHeader>
              <DialogTitle>{source.name}</DialogTitle>
            </DialogHeader>

            <div className="relative h-[221px] w-[326px] overflow-hidden rounded-sm bg-border lg:h-[552px] lg:w-[814px]">
              {isImage ? (
                <Image src={SOURCE_KINDS[source.kind].thumbnail} alt="" fill sizes="874px" priority className="object-cover" />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-3">
                  <Image
                    src={SOURCE_KINDS[source.kind].thumbnail}
                    alt=""
                    width={64}
                    height={64}
                    className="size-12 lg:size-16"
                  />
                  <p className="max-w-[80%] truncate text-body-sm text-muted lg:text-body">{source.name}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end">
              {/* Real content only exists for the seeded image; every other kind is mocked metadata with
                  nothing to download, so the button stays inert for them. */}
              {isImage ? (
                <Button asChild size="responsive">
                  <a href={SOURCE_KINDS[source.kind].thumbnail} download={source.name}>
                    <Download aria-hidden className="scale-90" />
                    Télécharger
                  </a>
                </Button>
              ) : (
                <Button size="responsive" disabled>
                  <Download aria-hidden className="scale-90" />
                  Télécharger
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
