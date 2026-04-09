"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NebulaScene, type HeroLine } from "@/components/NebulaScene";
import { useLang } from "@/components/LangProvider";

export default function Home() {
  const { t, lang } = useLang();

  const heroLines: HeroLine[] = [
    { text: "AI SYSTEMS ARCHITECT", y: 2.6, size: 0.15, opacity: 0.6, letterSpacing: 0.12 },
    { text: "Design and Build", y: 1.5, size: 0.65, bold: true },
    { text: "Entire Ecosystems", y: 0.6, size: 0.65, bold: true },
    { text: t("hero.desc.1"), y: -0.5, size: 0.20, opacity: 0.6 },
    { text: t("hero.desc.1b"), y: -0.9, size: 0.20, opacity: 0.6 },
    { text: "End-to-end automation for industries that need them", y: -1.4, size: 0.15, opacity: 0.6, letterSpacing: 0.12 },
    { text: "All solo", y: -1.8, size: 0.15, opacity: 0.6, letterSpacing: 0.12 },
  ];

  return (
    <>
      {/* Hero with 3D */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <NebulaScene heroLines={heroLines} />

        {/* CTA button */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10">
          <Link
            href="/projects/web"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-primary border border-border hover:border-border-hover px-5 py-2.5 rounded-lg transition-colors"
          >
            {t("hero.cta")}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-mono">
            {t("hero.scroll")}
          </span>
          <div className="w-px h-8 bg-border" />
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "6", label: t("stats.mcp") },
            { value: "9", label: t("stats.phases") },
            { value: "14", label: t("stats.projects") },
            { value: "19", label: t("stats.tools") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-mono font-medium tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-text-muted mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            {
              href: "/projects/web",
              title: "Web",
              count: t("cat.web.count"),
              desc: t("cat.web.desc"),
            },
            {
              href: "/projects/app",
              title: "App",
              count: t("cat.app.count"),
              desc: t("cat.app.desc"),
            },
            {
              href: "/projects/mcp",
              title: "MCP",
              count: t("cat.mcp.count"),
              desc: t("cat.mcp.desc"),
            },
            {
              href: "/projects/other",
              title: "Other",
              count: t("cat.other.count"),
              desc: t("cat.other.desc"),
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-bg p-8 hover:bg-hover-bg transition-colors"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <span className="text-xs font-mono text-text-muted">
                  {item.count}
                </span>
              </div>
              <p className="text-sm text-text-secondary font-light">
                {item.desc}
              </p>
              <ArrowRight
                size={14}
                className="mt-4 text-text-muted group-hover:text-text-primary transition-colors"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center">
          <span className="text-xs text-text-muted">
            &copy; 2026 Sunjae Kim
          </span>
          <div className="flex gap-6">
            <a href="mailto:jmskjksjj@gmail.com" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
              Email
            </a>
            <a href="https://github.com/jmskjksjj" target="_blank" rel="noopener noreferrer" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
