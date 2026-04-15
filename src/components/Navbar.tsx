"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LangProvider";
import { Menu, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  // SeonJ logo → hero page (/). Splash is only shown on the very first visit
  // ever (tracked via localStorage in app/page.tsx), so clicking the logo
  // should NOT re-trigger the splash. On /, scroll to top instead of reloading.
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // else: let <Link> client-navigate to /
  };

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-nav-bg backdrop-blur-xl border-b border-border">
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 items-center h-full px-12">
          <div className="flex items-center gap-2">
            <Link href="/" onClick={handleLogoClick} className="text-sm font-medium text-text-primary tracking-tight cursor-pointer">
              SeonJ
            </Link>
            <span className="text-border">—</span>
            <Link href="/on" className={`text-[13px] transition-colors ${pathname === "/on" ? "text-text-primary font-medium" : "text-text-secondary hover:text-text-primary"}`}>on</Link>
            <span className="text-border">—</span>
            <Link href="/off" className={`text-[13px] transition-colors ${pathname === "/off" ? "text-text-primary font-medium" : "text-text-secondary hover:text-text-primary"}`}>off</Link>
          </div>

          <div className="flex items-center justify-center gap-8">
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
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between h-full px-5">
          <div className="flex items-center gap-2">
            <Link href="/" onClick={handleLogoClick} className="text-sm font-medium text-text-primary tracking-tight cursor-pointer">
              SeonJ
            </Link>
            <span className="text-border">—</span>
            <Link href="/on" className={`text-[13px] transition-colors ${pathname === "/on" ? "text-text-primary font-medium" : "text-text-secondary hover:text-text-primary"}`}>on</Link>
            <span className="text-border">—</span>
            <Link href="/off" className={`text-[13px] transition-colors ${pathname === "/off" ? "text-text-primary font-medium" : "text-text-secondary hover:text-text-primary"}`}>off</Link>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-bg/98 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-6 py-8">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[15px] py-3 transition-colors ${
                    pathname?.startsWith(link.href)
                      ? "text-text-primary font-medium"
                      : "text-text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-border mt-4 pt-6 flex gap-6">
              <button
                onClick={toggleLang}
                className="font-mono text-xs font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Toggle language"
              >
                {lang === "en" ? "한국어" : "English"}
              </button>
              <button
                onClick={toggle}
                className="font-mono text-xs font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
