"use client";

import { useEffect, useState } from "react";
import { ChatGenericAnswer, ChatLoading, ChatQuestion, ChatScriptedAnswer } from "@/components/projects/chat-bubbles";
import { useChatSession } from "@/components/projects/chat-session-context";
import { SourcePreviewDialog } from "@/components/projects/source-preview-dialog";
import { genericReply } from "@/lib/mock-data";
import type { Source } from "@/lib/mock-data";
import { useSources } from "@/lib/projects-store";

export function ChatTranscript() {
  const { exchange } = useChatSession();
  const sources = useSources();
  const [previewing, setPreviewing] = useState<Source | null>(null);

  // Sending can happen while scrolled deep into a long chat list; the shorter transcript view
  // needs a sane starting scroll position rather than whatever offset the list left behind.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!exchange) return null;

  // Citation badges cite a source by filename (Journey 3 steps 13-14): same file-preview dialog as Sources.
  const openCitation = (label: string) => {
    const source = sources.find((s) => s.name === label);
    if (source) setPreviewing(source);
  };

  return (
    <div className="flex flex-col gap-6 py-3">
      <ChatQuestion text={exchange.question} />
      {exchange.status === "loading" ? (
        <ChatLoading />
      ) : exchange.scripted ? (
        <ChatScriptedAnswer onCitationClick={openCitation} />
      ) : (
        <ChatGenericAnswer text={genericReply} />
      )}
      <SourcePreviewDialog source={previewing} onOpenChange={(open) => !open && setPreviewing(null)} />
    </div>
  );
}
