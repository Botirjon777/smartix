"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { site } from "@/lib/site";
import Logo from "../Logo";
import {
  MailIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
} from "../icons";

export default function Footer() {
  const { dict } = useI18n();
  const year = 2026;

  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#why", label: dict.nav.why },
    { href: "#team", label: dict.nav.team },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <footer className="relative mt-auto border-t border-line bg-surface/40">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-24 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: TelegramIcon, href: site.telegram },
                { Icon: GithubIcon, href: "#" },
                { Icon: LinkedinIcon, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label="SmartIX social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-fill text-muted transition hover:border-brand/50 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {dict.footer.quickLinks}
            </h4>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {dict.footer.contact}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition hover:text-foreground"
                >
                  <TelegramIcon className="h-4 w-4 text-brand" />
                  {site.telegramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${dict.cta.email}`}
                  className="flex items-center gap-2.5 transition hover:text-foreground"
                >
                  <MailIcon className="h-4 w-4 text-brand" />
                  {dict.cta.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPinIcon className="h-4 w-4 text-brand" />
                {dict.footer.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            © {year} SmartIX. {dict.footer.rights}
          </p>
          <p className="flex items-center gap-1.5">
            {dict.footer.madeWith}
            <span className="text-brand-2">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
