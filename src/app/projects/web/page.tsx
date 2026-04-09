import { getProjectsByCategory } from "@/lib/projects";
import { ProjectList } from "@/components/ProjectList";
import { CategoryHeader } from "@/components/CategoryHeader";

export const metadata = { title: "Web Projects — Sunjae Kim" };

export default function WebProjectsPage() {
  const projects = getProjectsByCategory("web");

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <CategoryHeader category="web" count={projects.length} unit="projects" />
      <ProjectList projects={projects} />
    </div>
  );
}
