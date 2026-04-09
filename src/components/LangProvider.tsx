"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ko";

const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}>({ lang: "en", toggle: () => {}, t: (k) => k });

export function useLang() {
  return useContext(LangContext);
}

const translations: Record<string, Record<Lang, string>> = {
  // Hero
  "hero.subtitle": { en: "AI Systems Architect", ko: "AI Systems Architect" },
  "hero.title.1": { en: "Design and Build", ko: "Design and Build" },
  "hero.title.bold": { en: "Entire Ecosystems", ko: "Entire Ecosystems" },
  "hero.title.2": { en: "", ko: "" },
  "hero.title.3": { en: "", ko: "" },
  "hero.desc.1": {
    en: "Ontology · 3D Visualization · MCP Servers",
    ko: "Ontology · 3D Visualization · MCP Servers",
  },
  "hero.desc.1b": {
    en: "Pipeline · Web Design · Application",
    ko: "Pipeline · Web Design · Application",
  },
  "hero.desc.2": {
    en: "End-to-end automation for industries that need them",
    ko: "End-to-end automation for industries that need them",
  },
  "hero.desc.3": {
    en: "All solo",
    ko: "All solo",
  },
  "hero.cta": { en: "View Projects", ko: "프로젝트 보기" },
  "hero.scroll": { en: "Scroll", ko: "스크롤" },

  // Stats
  "stats.projects": { en: "Projects", ko: "프로젝트" },
  "stats.mcp": { en: "MCP Servers", ko: "MCP 서버" },
  "stats.phases": { en: "Pipeline Phases", ko: "파이프라인 단계" },
  "stats.tools": { en: "AI Tools", ko: "AI 도구" },

  // Quick links
  "cat.web.count": { en: "5 projects", ko: "5개 프로젝트" },
  "cat.web.desc": {
    en: "Full-stack platforms and applications",
    ko: "풀스택 플랫폼 및 웹 애플리케이션",
  },
  "cat.app.count": { en: "2 projects", ko: "2개 프로젝트" },
  "cat.app.desc": {
    en: "Desktop and mobile applications",
    ko: "데스크톱 및 모바일 애플리케이션",
  },
  "cat.mcp.count": { en: "5 servers", ko: "5개 서버" },
  "cat.mcp.desc": {
    en: "Model Context Protocol servers",
    ko: "모델 컨텍스트 프로토콜 서버",
  },
  "cat.other.count": { en: "2 projects", ko: "2개 프로젝트" },
  "cat.other.desc": { en: "Miscellaneous projects", ko: "기타 프로젝트" },

  // Project detail
  "detail.overview": { en: "Overview", ko: "개요" },
  "detail.metrics": { en: "Metrics", ko: "지표" },
  "detail.stack": { en: "Stack", ko: "기술 스택" },

  // Category pages
  "catpage.web": {
    en: "Full-stack web applications and platforms",
    ko: "풀스택 웹 애플리케이션 및 플랫폼",
  },
  "catpage.app": {
    en: "Desktop and mobile applications",
    ko: "데스크톱 및 모바일 애플리케이션",
  },
  "catpage.mcp": {
    en: "Model Context Protocol servers for the TAI ecosystem",
    ko: "TAI 에코시스템을 위한 모델 컨텍스트 프로토콜 서버",
  },
  "catpage.other": { en: "Miscellaneous projects", ko: "기타 프로젝트" },
  "catpage.projects": { en: "projects", ko: "개 프로젝트" },
  "catpage.servers": { en: "servers", ko: "개 서버" },
};

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored) setLang(stored);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = lang === "en" ? "ko" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = (key: string) => {
    return translations[key]?.[lang] ?? key;
  };

  if (!mounted) return <>{children}</>;

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}
