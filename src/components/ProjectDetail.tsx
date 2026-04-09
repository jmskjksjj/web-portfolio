"use client";

import { useLang } from "./LangProvider";
import type { Project } from "@/lib/projects";

export function ProjectType({ project }: { project: Project }) {
  const { lang } = useLang();
  return <>{lang === "ko" ? (project.typeKo || project.type) : project.type}</>;
}

export function ProjectDescription({ project }: { project: Project }) {
  const { lang } = useLang();
  return (
    <>{lang === "ko" ? (project.descriptionKo || project.description) : project.description}</>
  );
}

export function ProjectDetailText({ project }: { project: Project }) {
  const { lang } = useLang();
  return (
    <>{lang === "ko" ? (project.detailKo || project.detail) : project.detail}</>
  );
}

export function MetricLabel({ label, labelKo }: { label: string; labelKo?: string }) {
  const { lang } = useLang();
  return <>{lang === "ko" && labelKo ? labelKo : label}</>;
}
