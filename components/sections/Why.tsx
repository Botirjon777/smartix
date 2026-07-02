import type { Dictionary } from "@/i18n/getDictionary";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { BoltIcon, ShieldIcon, ChatIcon, LifeBuoyIcon } from "../icons";

const icons = [BoltIcon, ShieldIcon, ChatIcon, LifeBuoyIcon];

export default function Why({ dict }: { dict: Dictionary }) {
  return (
    <section id="why" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-24">
        <SectionHeading
          badge={dict.why.badge}
          title={dict.why.title}
          subtitle={dict.why.subtitle}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dict.why.items.map((item, i) => {
            const Icon = icons[i] ?? BoltIcon;
            return (
              <Reveal key={item.title} delay={(i % 2) * 100}>
                <article className="card-hover flex h-full items-start gap-5 rounded-2xl border border-line bg-surface/60 p-6 sm:p-7">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand/20 to-brand-2/20 text-brand ring-1 ring-line">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-brand/70">
                        0{i + 1}
                      </span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
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
