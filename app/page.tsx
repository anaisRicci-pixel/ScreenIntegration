import { PromptComposer } from "@/components/home/prompt-composer";
import { SuggestedPrompts } from "@/components/home/suggested-prompts";
import { currentUser } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-3 pb-3 lg:items-center lg:justify-center lg:gap-6 lg:px-8 lg:pt-8 lg:pb-8">
      <h1 className="flex flex-1 items-center justify-center px-3 text-center font-display text-h3 text-heading lg:flex-none lg:text-display">
        <span>
          Bonjour <span className="text-accent">{currentUser.firstName} !</span>
        </span>
      </h1>
      <SuggestedPrompts className="lg:order-3" />
      <PromptComposer className="w-full lg:order-2 lg:max-w-[800px]" />
    </div>
  );
}
