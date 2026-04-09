"use client";

import { useLang } from "./LangProvider";
import type { McpTool } from "@/lib/projects";

export function McpToolsSection({ tools }: { tools: McpTool[] }) {
  const { lang } = useLang();
  const isKo = lang === "ko";

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface">
        <span className="text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium">
          {isKo ? "도구 및 기능" : "Tools & Capabilities"}
        </span>
        <span className="font-mono text-[11px] text-text-muted">
          {tools.length} {isKo ? "개 도구" : tools.length === 1 ? "tool" : "tools"}
        </span>
      </div>

      <div className="divide-y divide-border">
        {tools.map((tool) => (
          <div key={tool.name} className="px-5 py-5">
            {/* Tool name */}
            <div className="font-mono text-sm text-text-primary mb-2.5">
              {tool.name}
            </div>

            {/* Description */}
            <p className="text-[13px] text-text-secondary font-light leading-[1.75] mb-4">
              {isKo ? (tool.descriptionKo || tool.description) : tool.description}
            </p>

            {/* Input / Output — compact row with background */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 bg-surface rounded px-4 py-3 text-[12px]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted leading-5">
                Input
              </span>
              <span className="text-text-secondary font-light leading-5">
                {isKo ? (tool.inputKo || tool.input) : tool.input}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted leading-5">
                Output
              </span>
              <span className="text-text-secondary font-light leading-5">
                {isKo ? (tool.outputKo || tool.output) : tool.output}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
