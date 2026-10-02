import { ProjectFrame } from "@/components/projects/project-frame";

export default async function ProjectLayout({ children, params }: LayoutProps<"/projects/[projectId]">) {
  const { projectId } = await params;
  return <ProjectFrame projectId={projectId}>{children}</ProjectFrame>;
}
