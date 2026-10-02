import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom font-size tokens must be declared, otherwise tailwind-merge treats `text-body` as a color and drops it.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["caption", "body-sm", "body", "h5", "h4", "h3", "h2", "h1", "display"],
      radius: ["sm", "control", "segment", "md", "lg", "composer", "prompt", "full"],
      shadow: ["rest", "hover", "menu", "float", "composer"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
