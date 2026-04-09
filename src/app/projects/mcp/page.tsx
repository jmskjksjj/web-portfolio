import { getProjectsByCategory } from "@/lib/projects";
import { ProjectList } from "@/components/ProjectList";
import { CategoryHeader } from "@/components/CategoryHeader";

export const metadata = { title: "MCP Servers — Sunjae Kim" };

export default function McpProjectsPage() {
  const projects = getProjectsByCategory("mcp");

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <CategoryHeader category="mcp" count={projects.length} unit="servers" />
      <ProjectList projects={projects} />
    </div>
  );
}
