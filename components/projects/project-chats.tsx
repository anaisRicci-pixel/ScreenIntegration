"use client";

import { MessageSquare } from "lucide-react";
import { ChatActionsMenu } from "@/components/projects/chat-actions-menu";
import { ChatTranscript } from "@/components/projects/chat-transcript";
import { useChatSession } from "@/components/projects/chat-session-context";
import { ProjectTable } from "@/components/projects/project-table";
import { formatUpdatedAt } from "@/lib/format-date";
import { useChats } from "@/lib/projects-store";

export function ProjectChats({ projectId }: { projectId: string }) {
  const { exchange } = useChatSession();
  const chats = useChats().filter((c) => c.projectId === projectId);
  const ordered = [...chats.filter((c) => c.pinned), ...chats.filter((c) => !c.pinned)];

  // Sending a message (Figma "Lancer un chat") replaces the list with the active exchange.
  if (exchange) return <ChatTranscript />;

  // Empty state as shown in the Figma "Projet Copenhague" frames (SPEC.md §3).
  if (ordered.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <MessageSquare aria-hidden className="size-6 text-ink" />
        <p className="text-body text-ink">Vous n’avez pas de chat pour ce projet</p>
      </div>
    );
  }

  return (
    <ProjectTable
      label="Chats du projet"
      spacer
      rows={ordered.map((c) => ({
        id: c.id,
        title: c.title,
        subtitle: formatUpdatedAt(c.updatedAt),
        actionLabel: `Actions pour le chat ${c.title}`,
        pinned: c.pinned,
        actions: <ChatActionsMenu chat={c} />,
      }))}
    />
  );
}
