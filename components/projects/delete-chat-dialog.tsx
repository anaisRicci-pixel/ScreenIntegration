"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateChats } from "@/lib/projects-store";
import type { Chat } from "@/lib/mock-data";

// Figma "Projet > Chat - Pop in Supprimer un chat" (Desktop node 3475:52672 / Mobile node 3525:46513).
// Unlike DeleteProjectDialog/DeleteSourceDialog, the confirmation text here is static - no chat title.
export function DeleteChatDialog({ chat, onOpenChange }: { chat: Chat | null; onOpenChange: (open: boolean) => void }) {
  const handleDelete = () => {
    if (!chat) return;
    updateChats((chats) => chats.filter((c) => c.id !== chat.id));
    onOpenChange(false);
  };

  return (
    <Dialog open={chat !== null} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="flex w-[366px] flex-col items-end gap-6 p-4 lg:w-[576px] lg:gap-8 lg:p-6"
      >
        {chat && (
          <>
            <DialogHeader>
              <DialogTitle>Supprimer le chat</DialogTitle>
            </DialogHeader>

            <p className="w-full text-body-sm text-ink lg:text-body">Êtes-vous sur(e) de vouloir supprimer ce chat ?</p>

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
