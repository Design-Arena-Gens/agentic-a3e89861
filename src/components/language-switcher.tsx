"use client";

import { useLanguage } from "@/components/language-provider";
import { Globe2 } from "lucide-react";

const localeLabels: Record<string, string> = {
  en: "English",
  te: "తెలుగు",
};

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <Globe2 className="h-4 w-4" />
      {localeLabels[locale]}
    </button>
  );
}
