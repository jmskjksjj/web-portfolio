"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { useLang } from "./LangProvider";

export function ProjectList({ projects }: { projects: Project[] }) {
  const { lang } = useLang();
  const isKo = lang === "ko";

  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-2 md:gap-6 items-start py-6 border-b border-border hover:bg-hover-bg hover:mx-[-16px] hover:px-4 hover:rounded-lg transition-all"
        >
          <div>
            <div className="text-[15px] font-medium text-text-primary">
              {project.name}
            </div>
            <div className="font-mono text-[11px] text-text-muted mt-1 tracking-wide">
              {isKo ? (project.typeKo || project.type) : project.type}
            </div>
          </div>

          <div className="text-sm text-text-secondary font-light leading-relaxed">
            {isKo ? (project.descriptionKo || project.description) : project.description}
          </div>

          <div className="flex flex-wrap gap-1.5 md:justify-end md:min-w-[140px]">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2 py-0.5 bg-tag-bg text-tag-text rounded border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
