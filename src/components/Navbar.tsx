"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LangProvider";

const links = [
  { href: "/projects/web", label: "Web" },
  { href: "/projects/app", label: "App" },
  { href: "/projects/mcp", label: "MCP" },
  { href: "/projects/other", label: "Other" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 grid grid-cols-3 items-center px-6 md:px-12 bg-nav-bg backdrop-blur-xl border-b border-border">
      <Link
        href="/"
        className="text-sm font-medium text-text-primary tracking-tight"
      >
        SeonJ
      </Link>

      <div className="flex items-center justify-center gap-6 md:gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] transition-colors ${
              pathname?.startsWith(link.href)
                ? "text-text-primary font-medium"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          onClick={toggleLang}
          className="font-mono text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Toggle language"
        >
          {lang === "en" ? "KR" : "EN"}
        </button>

        <button
          onClick={toggle}
          className="font-mono text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "LIGHT" : "DARK"}
        </button>
      </div>
    </nav>
  );
}
