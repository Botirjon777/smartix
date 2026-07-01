"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { GlobeIcon } from "./icons";

export default function LanguageSwitcher() {
  const { locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;

    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;

    const segments = pathname.split("/");
    // segments[0] is "" because pathname starts with "/"
    segments[1] = next;
    const nextPath = segments.join("/") || `/${next}`;
    router.push(nextPath);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-foreground transition hover:border-brand/50 hover:bg-white/10"
      >
        <GlobeIcon className="h-4 w-4 text-brand" />
        <span className="hidden sm:inline">{localeFlags[locale]}</span>
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-surface-2/95 p-1.5 shadow-2xl backdrop-blur-xl">
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => switchTo(code)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                code === locale
                  ? "bg-brand/15 text-foreground"
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <span className="text-base">{localeFlags[code]}</span>
              <span>{localeNames[code]}</span>
              {code === locale && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
