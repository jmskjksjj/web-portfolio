"use client";

import { useLang } from "./LangProvider";

export function T({ k, fallback }: { k: string; fallback?: string }) {
  const { t } = useLang();
  const result = t(k);
  return <>{result === k && fallback ? fallback : result}</>;
}
