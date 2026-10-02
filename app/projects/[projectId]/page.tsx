import type { Metadata } from "next";
import { ProjectChats } from "@/components/projects/project-chats";

export const metadata: Metadata = { title: "Chats du projet · Secured ChatGPT" };

export default async function ProjectChatsPage({ params }: PageProps<"/projects/[projectId]">) {
  const { projectId } = await params;
  return <ProjectChats projectId={projectId} />;
}
