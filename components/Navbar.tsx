"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { site } from "@/lib/site";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon, CloseIcon, TelegramIcon } from "./icons";

export default function Navbar() {
  const { dict, locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `/${locale}#services`, label: dict.nav.services },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}#why`, label: dict.nav.why },
    { href: `/${locale}#team`, label: dict.nav.team },
    { href: `/${locale}#contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full items-center justify-between px-5 sm:px-8 md:h-18 lg:px-16 xl:px-24">
        <a href={`/${locale}`} className="shrink-0" aria-label="SmartIX home">
          <Logo priority />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-brand-2 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:shadow-brand/40 sm:inline-flex"
          >
            <TelegramIcon className="h-4 w-4" />
            {dict.nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-fill text-foreground md:hidden"
          >
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`overflow-hidden border-b border-line bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 px-5 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-muted transition hover:bg-fill hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-2 px-4 py-3 text-base font-semibold text-white"
            >
              <TelegramIcon className="h-4 w-4" />
              {dict.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
