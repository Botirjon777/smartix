"use client";

import { useI18n } from "@/i18n/I18nProvider";
import Reveal from "../Reveal";
import { MailIcon, ArrowRightIcon } from "../icons";

export default function CTA() {
  const { dict } = useI18n();

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface/70 px-6 py-14 text-center sm:px-12 sm:py-20">
            {/* glow */}
            <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/30 blur-[100px]" />
            <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                {dict.cta.badge}
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {dict.cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted sm:text-lg">
                {dict.cta.subtitle}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${dict.cta.email}`}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand/30 transition hover:shadow-brand/50 sm:w-auto"
                >
                  {dict.cta.button}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={`mailto:${dict.cta.email}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-white/30 hover:bg-white/10 sm:w-auto"
                >
                  <MailIcon className="h-4 w-4 text-brand" />
                  {dict.cta.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
