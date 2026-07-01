"use client";

import { useI18n } from "@/i18n/I18nProvider";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import {
  CodeIcon,
  MobileIcon,
  ServerIcon,
  DesignIcon,
  CloudIcon,
  ChatIcon,
} from "../icons";

const icons = [
  CodeIcon,
  MobileIcon,
  ServerIcon,
  DesignIcon,
  CloudIcon,
  ChatIcon,
];

export default function Services() {
  const { dict } = useI18n();

  return (
    <section id="services" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          badge={dict.services.badge}
          title={dict.services.title}
          subtitle={dict.services.subtitle}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.services.items.map((item, i) => {
            const Icon = icons[i] ?? CodeIcon;
            return (
              <Reveal key={item.title} delay={(i % 3) * 90}>
                <article className="group card-hover relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-6">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/10 blur-2xl transition group-hover:bg-brand/25" />
                  <div className="relative">
                    <span className="inline-grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent text-brand transition group-hover:scale-110 group-hover:text-accent">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-brand to-accent transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
