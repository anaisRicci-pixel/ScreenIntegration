"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChatSessionProvider, useChatSession } from "@/components/projects/chat-session-context";
import { ProjectActionsMenu } from "@/components/projects/project-actions-menu";
import { ProjectComposer } from "@/components/projects/project-composer";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/persistent-store";
import { useProjects } from "@/lib/projects-store";
import type { Project } from "@/lib/mock-data";

export function ProjectFrame({ projectId, children }: { projectId: string; children: React.ReactNode }) {
  const project = useProjects().find((p) => p.id === projectId);
  const hydrated = useHydrated();

  // Projects created during the demo only exist in localStorage: wait for hydration before declaring "not found".
  if (!project) {
    if (!hydrated) return null;
    return (
      <div className="mx-auto flex w-full max-w-[956px] flex-col items-start gap-4 px-3 py-6 lg:px-8 lg:pt-8">
        <h1 className="text-h4 font-semibold text-heading lg:text-h2">Projet introuvable</h1>
        <Link href="/projects" className="text-body text-ink underline underline-offset-4 hover:text-heading">
          Retour à la liste des projets
        </Link>
      </div>
    );
  }

  return (
    <ChatSessionProvider>
      <ProjectFrameContent projectId={projectId} project={project}>
        {children}
      </ProjectFrameContent>
    </ChatSessionProvider>
  );
}

function ProjectFrameContent({
  projectId,
  project,
  children,
}: {
  projectId: string;
  project: Project;
  children: React.ReactNode;
}) {
  // Sending is only meaningful on the Chats tab (Figma "Lancer un chat"); Sources keeps the decorative composer as-is.
  const onChatsTab = usePathname() === `/projects/${projectId}`;
  const { exchange, send } = useChatSession();
  const [draft, setDraft] = useState("");
  // Figma hides the title, "⋮" menu and tabs once a conversation starts (full-bleed chat, like the reference "Lancer un chat" frames).
  const chatMode = onChatsTab && exchange !== null;

  const handleSubmit = (text: string) => {
    send(text);
    setDraft("");
  };

  const composer = (
    <div
      className={cn(
        "-mx-3 flex flex-col gap-2 bg-page p-3 lg:static lg:m-0 lg:bg-transparent lg:p-0",
        // List mode: sticky on mobile so the composer stays reachable below a long chat list; `order-last` +
        // `lg:order-none` visually moves it after the table on mobile while keeping its DOM position (right
        // after the title) for desktop, where it's static and belongs above the tabs.
        // Chat mode: composer is declared after the transcript in JSX already (see below), so plain `static`
        // is correct on both viewports — no sticky, since a sticky bar here would float over the messages
        // instead of reserving its own space (no nested scroll region for this screen).
        chatMode ? "static" : "sticky bottom-0 order-last lg:order-none",
      )}
    >
      <ProjectComposer {...(onChatsTab ? { value: draft, onChange: setDraft, onSubmit: handleSubmit } : {})} />
      {chatMode && (
        <p className="px-3 text-center text-body-sm text-muted lg:text-caption">
          SecuredChatGPT est un outil IA interne développé par Safran, le contenu généré peut être incorrect -{" "}
          {/* Static decoration, like every other not-yet-built destination (SPEC.md §1): a real link would navigate nowhere. */}
          <span className="text-[#4d97dd] underline underline-offset-2">Conditions d’utilisation</span>
        </p>
      )}
    </div>
  );

  return (
    <div className="mx-auto flex w-full max-w-[956px] flex-1 flex-col gap-6 px-3 pt-3 lg:gap-8 lg:px-8 lg:pt-8 lg:pb-8">
      {!chatMode && (
        <div className="flex items-center gap-6 lg:gap-8">
          <h1 className="min-w-0 flex-1 text-h4 font-semibold text-heading lg:text-h2">{project.name}</h1>
          <ProjectActionsMenu project={project} />
        </div>
      )}

      {!chatMode && composer}

      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        {!chatMode && <ProjectTabs projectId={projectId} />}
        {children}
      </div>

      {chatMode && composer}
    </div>
  );
}
