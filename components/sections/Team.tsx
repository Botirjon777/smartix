"use client";

import { useI18n } from "@/i18n/I18nProvider";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "../icons";

const meta = [
  {
    initials: "BS",
    gradient: "from-brand to-brand-2",
    socials: { github: "#", linkedin: "#", telegram: "#" },
  },
  {
    initials: "IA",
    gradient: "from-brand-2 to-accent",
    socials: { github: "#", linkedin: "#", telegram: "#" },
  },
  {
    initials: "DA",
    gradient: "from-accent to-brand",
    socials: { github: "#", linkedin: "#", telegram: "#" },
  },
];

export default function Team() {
  const { dict } = useI18n();

  return (
    <section id="team" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          badge={dict.team.badge}
          title={dict.team.title}
          subtitle={dict.team.subtitle}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.team.members.map((member, i) => {
            const m = meta[i] ?? meta[0];
            return (
              <Reveal key={member.name} delay={i * 110}>
                <article className="group card-hover relative h-full overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-7 text-center">
                  <div
                    className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${m.gradient} opacity-15 blur-2xl transition group-hover:opacity-30`}
                  />
                  <div className="relative">
                    <div
                      className={`mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br ${m.gradient} text-2xl font-bold text-white shadow-xl ring-4 ring-white/10 transition-transform duration-500 group-hover:scale-105`}
                    >
                      {m.initials}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{member.name}</h3>
                    <p className="mt-1 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {member.bio}
                    </p>

                    <div className="mt-6 flex items-center justify-center gap-2">
                      {[
                        { Icon: GithubIcon, href: m.socials.github, label: "GitHub" },
                        { Icon: LinkedinIcon, href: m.socials.linkedin, label: "LinkedIn" },
                        { Icon: TelegramIcon, href: m.socials.telegram, label: "Telegram" },
                      ].map(({ Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={`${member.name} — ${label}`}
                          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:border-brand/50 hover:text-foreground"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
