"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { scriptedPrompt } from "@/lib/mock-data";

type Exchange = {
  question: string;
  status: "loading" | "done";
  scripted: boolean;
};

type ChatSession = {
  exchange: Exchange | null;
  send: (text: string) => void;
};

const ChatSessionContext = createContext<ChatSession | null>(null);

// In-memory only (not localStorage): SPEC.md §5 persists chat *list* metadata, not a live
// transcript, and §3 scopes exactly one loading state, which lives here.
export function ChatSessionProvider({ children }: { children: React.ReactNode }) {
  const [exchange, setExchange] = useState<Exchange | null>(null);

  const send = useCallback((text: string) => {
    const question = text.trim();
    if (!question) return;
    const scripted = question === scriptedPrompt;
    setExchange({ question, status: "loading", scripted });
    const delay = 800 + Math.random() * 700;
    setTimeout(() => setExchange((current) => (current ? { ...current, status: "done" } : current)), delay);
  }, []);

  const value = useMemo(() => ({ exchange, send }), [exchange, send]);
  return <ChatSessionContext.Provider value={value}>{children}</ChatSessionContext.Provider>;
}

export function useChatSession() {
  const ctx = useContext(ChatSessionContext);
  if (!ctx) throw new Error("useChatSession must be used within a ChatSessionProvider");
  return ctx;
}
