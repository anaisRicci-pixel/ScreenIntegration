import Image from "next/image";
import { cn } from "@/lib/utils";

// The source PNG has generous padding; this crop matches the Figma framing.
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-[4/1] overflow-hidden", className)}>
      <Image
        src="/images/logo_FD_BLANC_SCGPT%201.png"
        alt="Secured ChatGPT"
        width={1500}
        height={500}
        priority={priority}
        className="absolute top-[-17.16%] left-[-5%] h-[142.5%] w-[107.37%] max-w-none"
      />
    </div>
  );
}
