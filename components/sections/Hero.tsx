import type { Dictionary } from "@/i18n/getDictionary";
import { site } from "@/lib/site";
import Reveal from "../Reveal";
import CountUp from "../CountUp";
import { ArrowRightIcon, BoltIcon, TelegramIcon } from "../icons";

const stats = [
  { key: "projects", end: 40, suffix: "+" },
  { key: "clients", end: 25, suffix: "+" },
  { key: "years", end: 5, suffix: "+" },
  { key: "support", end: 24, suffix: "/7" },
] as const;

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-fill px-4 py-1.5 text-xs font-medium text-muted">
                <BoltIcon className="h-3.5 w-3.5 text-accent" />
                {dict.hero.badge}
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {dict.hero.titlePre}{" "}
                <span className="text-shimmer">{dict.hero.titleHighlight}</span>{" "}
                {dict.hero.titlePost}
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg lg:mx-0">
                {dict.hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand/30 transition hover:shadow-brand/50 sm:w-auto"
                >
                  <TelegramIcon className="h-4 w-4" />
                  {dict.hero.ctaPrimary}
                </a>
                <a
                  href="#board"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-fill px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-line-strong hover:bg-fill-strong sm:w-auto"
                >
                  {dict.hero.ctaSecondary}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={330}>
              <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.key} className="text-center lg:text-left">
                    <dt className="text-3xl font-bold text-gradient sm:text-4xl">
                      <CountUp end={stat.end} suffix={stat.suffix} />
                    </dt>
                    <dd className="mt-1 text-xs text-muted sm:text-sm">
                      {dict.hero.stats[stat.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right — code window mockup */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/30 via-brand-2/20 to-accent/20 blur-2xl" />
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e1e] text-[#e7e9f5] shadow-2xl backdrop-blur">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-3 font-mono text-xs text-[#9aa0c3]">
                    smartix.ts
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                  <code>
                    <span className="text-brand-2">const</span>{" "}
                    <span className="text-accent">smartix</span> = {"{"}
                    {"\n"}
                    {"  "}mission:{" "}
                    <span className="text-emerald-300">
                      &apos;build the future&apos;
                    </span>
                    ,{"\n"}
                    {"  "}stack: [
                    <span className="text-emerald-300">&apos;next&apos;</span>,{" "}
                    <span className="text-emerald-300">&apos;node&apos;</span>,{" "}
                    <span className="text-emerald-300">&apos;cloud&apos;</span>
                    ],{"\n"}
                    {"  "}
                    <span className="text-brand">async</span>{" "}
                    <span className="text-yellow-200">deliver</span>() {"{"}
                    {"\n"}
                    {"    "}
                    <span className="text-brand-2">return</span>{" "}
                    <span className="text-emerald-300">
                      &apos;🚀 shipped&apos;
                    </span>
                    ;{"\n"}
                    {"  "}
                    {"}"},{"\n"}
                    {"}"};
                  </code>
                </pre>
              </div>

              {/* floating badge */}
              <div className="absolute -right-3 -top-3 hidden animate-float rounded-2xl border border-line bg-surface-2/90 px-4 py-2.5 shadow-xl backdrop-blur sm:block">
                <p className="text-xs text-muted">Deploy</p>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                  ● Live
                </p>
              </div>
              <div className="absolute -bottom-4 -left-4 hidden animate-float-slow rounded-2xl border border-line bg-surface-2/90 px-4 py-2.5 shadow-xl backdrop-blur sm:block">
                <p className="text-xs text-muted">Performance</p>
                <p className="text-sm font-semibold text-gradient">99 / 100</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Trust row */}
        <Reveal delay={120}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted lg:justify-start">
            {dict.hero.trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
