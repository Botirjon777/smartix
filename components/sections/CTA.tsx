import type { Dictionary } from "@/i18n/getDictionary";
import { site } from "@/lib/site";
import Reveal from "../Reveal";
import ContactForm from "../ContactForm";
import { TelegramIcon, CheckIcon } from "../icons";

export default function CTA({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/70">
            <div className="grid lg:grid-cols-2">
              {/* Left — pitch + checklist */}
              <div className="relative p-8 sm:p-10 lg:p-12">
                <div className="absolute -left-10 -top-16 h-56 w-56 rounded-full bg-brand/30 blur-[90px]" />
                <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                    {dict.cta.badge}
                  </span>
                  <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                    {dict.cta.title}
                  </h2>
                  <p className="mt-3 text-pretty text-sm text-muted sm:text-base">
                    {dict.cta.subtitle}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {dict.cta.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-600 dark:text-emerald-300">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 text-sm text-muted">
                    {dict.cta.form.or}{" "}
                    <a
                      href={site.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-brand hover:underline"
                    >
                      <TelegramIcon className="h-4 w-4" />
                      {site.telegramHandle}
                    </a>
                  </p>
                </div>
              </div>

              {/* Right — form */}
              <div className="border-t border-line bg-background/40 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}