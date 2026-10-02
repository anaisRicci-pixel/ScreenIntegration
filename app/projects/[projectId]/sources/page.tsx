import type { Metadata } from "next";
import { ProjectSources } from "@/components/projects/project-sources";

export const metadata: Metadata = { title: "Sources du projet · Secured ChatGPT" };

export default async function ProjectSourcesPage({ params }: PageProps<"/projects/[projectId]/sources">) {
  const { projectId } = await params;
  return <ProjectSources projectId={projectId} />;
}
