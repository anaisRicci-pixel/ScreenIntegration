"use client";

import { useState } from "react";
import { EllipsisVertical, Pin, Trash2 } from "lucide-react";
import { DeleteChatDialog } from "@/components/projects/delete-chat-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/button";
import { updateChats } from "@/lib/projects-store";
import type { Chat } from "@/lib/mock-data";

// Figma "⋮" Context Menu on a chat row (Desktop nodes 3475:51516/3475:51910/3475:52471, Mobile equivalents):
// Épingler/Désépingler, Supprimer.
export function ChatActionsMenu({ chat }: { chat: Chat }) {
  const [deleting, setDeleting] = useState(false);

  const togglePin = () => {
    updateChats((chats) => chats.map((c) => (c.id === chat.id ? { ...c, pinned: !c.pinned } : c)));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton label={`Actions pour le chat ${chat.title}`} className="size-6 lg:size-8">
            <EllipsisVertical aria-hidden className="size-4" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={togglePin}>
            <Pin aria-hidden className="size-4" />
            {chat.pinned ? "Désépingler" : "Épingler"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDeleting(true)}>
            <Trash2 aria-hidden className="size-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteChatDialog chat={deleting ? chat : null} onOpenChange={setDeleting} />
    </>
  );
}
