import type { Metadata } from "next";
import { ProjectsList } from "@/components/projects/projects-list";

export const metadata: Metadata = { title: "Projets · Secured ChatGPT" };

export default function ProjectsPage() {
  return <ProjectsList />;
}
