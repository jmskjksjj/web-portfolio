import { getProjectsByCategory } from "@/lib/projects";
import { ProjectList } from "@/components/ProjectList";
import { CategoryHeader } from "@/components/CategoryHeader";

export const metadata = { title: "App Projects — SeonJ" };

export default function AppProjectsPage() {
  const projects = getProjectsByCategory("app");

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-6 py-16 md:py-20">
      <CategoryHeader category="app" count={projects.length} unit="projects" />
      <ProjectList projects={projects} />
    </div>
  );
}
