import type { SourceKind } from "@/lib/mock-data";

// File-type thumbnails are image assets from the Figma file (not UI icons); Figma reuses the JSON one for .md.
// Shared between the Sources table (small) and the preview dialog (large placeholder for non-image kinds).
export const SOURCE_KINDS: Record<SourceKind, { label: string; thumbnail: string }> = {
  excel: { label: "Excel", thumbnail: "/images/files/excel.png" },
  pdf: { label: "PDF", thumbnail: "/images/files/pdf.png" },
  image: { label: "Image", thumbnail: "/images/files/gartner-adoption-graph.png" },
  docx: { label: "Docx", thumbnail: "/images/files/word.png" },
  md: { label: "Md", thumbnail: "/images/files/json.png" },
  json: { label: "JSON", thumbnail: "/images/files/json.png" },
};
