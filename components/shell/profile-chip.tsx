import Image from "next/image";
import { Menu } from "lucide-react";
import { currentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Same crop as the Figma frame: photo at 133.3% of the circle's height, nudged up 1.19%.
function Avatar() {
  return (
    <span className="relative block size-10 shrink-0 overflow-hidden rounded-full">
      <Image
        src={currentUser.avatar}
        alt={currentUser.fullName}
        width={40}
        height={53}
        className="absolute top-[-1.19%] left-0 h-[133.3%] w-full max-w-none"
      />
    </span>
  );
}

// Account menu is out of scope (SPEC.md §1): the chip is visual only.
// Figma strokes sit inside the box and above the photo, so the ring is an overlay rather than a CSS border.
export function ProfileChip({ compact, className }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <div
        className={cn(
          "relative shrink-0 rounded-full shadow-rest after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-border",
          className,
        )}
      >
        <Avatar />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center gap-3 rounded-lg bg-surface-glass px-4 shadow-rest ring-1 ring-border ring-inset",
        className,
      )}
    >
      <Avatar />
      <Menu aria-hidden className="size-5 text-ink" />
    </div>
  );
}
