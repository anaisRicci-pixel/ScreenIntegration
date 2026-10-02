import Image from "next/image";
import { Copy, RotateCcw, Volume2 } from "lucide-react";
import { SourceBadge } from "@/components/projects/source-badge";
import { scriptedCitations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ChatQuestion({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[270px] rounded-lg bg-surface p-3 text-body-sm text-ink shadow-menu lg:max-w-[550px] lg:p-6 lg:text-body">
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}

function ChatAvatar() {
  return (
    <span className="relative hidden size-[45px] shrink-0 items-center justify-center lg:flex">
      <span aria-hidden className="absolute inset-[7px] rounded-full bg-white/50 blur-[2px]" />
      <Image src="/images/ai-avatar.png" alt="" width={32} height={32} className="relative size-8" />
    </span>
  );
}

// Reactions are decorative (SPEC.md §1: "rendered, not wired to any handler").
function ReactionBar() {
  return (
    <div aria-hidden className="flex items-center gap-2.5 px-3 pt-3 pb-2 text-ink">
      <Copy className="size-4" />
      <RotateCcw className="size-4" />
      <Volume2 className="size-4" />
    </div>
  );
}

function AnswerBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <ChatAvatar />
      <div className="flex min-w-0 max-w-[300px] flex-col lg:max-w-[637px]">
        <div className="rounded-lg bg-surface-glass p-3 text-body-sm text-ink shadow-float lg:p-6 lg:text-body">{children}</div>
        <ReactionBar />
      </div>
    </div>
  );
}

// Loading state (SPEC.md §3): the only loading indicator in the prototype.
export function ChatLoading() {
  return (
    <AnswerBubble>
      <span className="sr-only">Secured ChatGPT réfléchit</span>
      <div aria-hidden className="flex items-center gap-1.5 py-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2 animate-bounce rounded-full bg-muted motion-reduce:animate-none"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </AnswerBubble>
  );
}

export function ChatScriptedAnswer({ onCitationClick }: { onCitationClick: (label: string) => void }) {
  const [aiFluency, description] = scriptedCitations;
  return (
    <AnswerBubble>
      <div className="flex flex-col gap-3 leading-[1.5] whitespace-pre-wrap">
        <p>
          Dans le 4D Framework de l’AI Fluency, les 4 catégories (ou compétences) sont :{" "}
          <strong className="font-bold">Délégation, Description, Discernement, Responsabilité</strong>
        </p>
        <div>
          <p className="font-bold">🧠 En une phrase :</p>
          <p className="font-bold">Delegation → Description → Discernment → Diligence</p>
          <p>
            Que veux-je faire avec l’IA ? → Comment dois-je lui expliquer ? → Puis-je faire confiance au résultat ? → Que
            dois-je faire de ce résultat ?
          </p>
        </div>
        <p>
          Le document précise que ces quatre compétences sont interconnectées et regroupent des savoir-faire,
          connaissances, réflexions et valeurs nécessaires pour interagir avec l’IA de manière{" "}
          <strong className="font-bold">effective, efficace, éthique et sûre.</strong>
        </p>
        <SourceBadge label={aiFluency.label} className="self-start" onClick={() => onCitationClick(aiFluency.label)} />
        <p>
          À noter : dans ton document, Description est elle-même décomposée en{" "}
          <strong className="font-bold">Product Description, Process Description et Performance Description.</strong>
          <br />
          Tu peux l’utiliser comme référence{" "}
          <SourceBadge label={description.label} className="mt-1 align-middle" onClick={() => onCitationClick(description.label)} />
        </p>
      </div>
    </AnswerBubble>
  );
}

export function ChatGenericAnswer({ text }: { text: string }) {
  return (
    <AnswerBubble>
      <p className={cn("whitespace-pre-wrap")}>{text}</p>
    </AnswerBubble>
  );
}
