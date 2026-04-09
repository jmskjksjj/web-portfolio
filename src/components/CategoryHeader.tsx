"use client";

import { useLang } from "./LangProvider";
import {
  categoryDescriptions,
  categoryDescriptionsKo,
  type ProjectCategory,
} from "@/lib/projects";

export function CategoryHeader({
  category,
  count,
  unit,
}: {
  category: ProjectCategory;
  count: number;
  unit: "projects" | "servers";
}) {
  const { lang } = useLang();
  const isKo = lang === "ko";
  const desc = isKo
    ? categoryDescriptionsKo[category]
    : categoryDescriptions[category];
  const unitText = isKo
    ? `${count}개 ${unit === "servers" ? "서버" : "프로젝트"}`
    : `${count} ${unit}`;

  return (
    <div className="flex justify-between items-baseline mb-8 md:mb-10 pb-4 border-b border-border">
      <div>
        <h1 className="text-sm md:text-[13px] uppercase tracking-[0.08em] text-text-muted font-medium">
          {category.toUpperCase()}
        </h1>
        <p className="text-[14px] md:text-sm text-text-secondary mt-1.5 font-light">{desc}</p>
      </div>
      <span className="font-mono text-xs text-text-muted">{unitText}</span>
    </div>
  );
}
