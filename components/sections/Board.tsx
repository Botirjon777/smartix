"use client";

import { useI18n } from "@/i18n/I18nProvider";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ProgressBar from "../ProgressBar";
import CountUp from "../CountUp";
import { TrendUpIcon, CheckIcon, ArrowRightIcon } from "../icons";

// language-independent config, matched to dict.board.rows by index
const rowConfig = [
  { id: "SMX-101", color: "#818cf8", assignee: "IA", metric: { prefix: "+", value: 70, unit: "%" } },
  { id: "SMX-102", color: "#22d3ee", assignee: "BS", metric: { prefix: "+", value: 150, unit: "%" } },
  { id: "SMX-103", color: "#c084fc", assignee: "BS", metric: { prefix: "", value: 2, unit: "x" } },
  { id: "SMX-104", color: "#34d399", assignee: "IA", metric: { prefix: "", value: 5, unit: "x" } },
];

function StageLabel({
  label,
  dot,
  text,
}: {
  label: string;
  dot: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span className={`text-[11px] font-semibold uppercase tracking-wider ${text}`}>
        {label}
      </span>
    </div>
  );
}

// small arrow sitting on the divider between two stages (desktop only)
function FlowArrow() {
  return (
    <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:grid">
      <span className="grid h-6 w-6 place-items-center rounded-full border border-line bg-surface text-brand shadow-lg">
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </span>
    </span>
  );
}

export default function Board() {
  const { dict } = useI18n();
  const { board } = dict;

  return (
    <section id="board" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-24">
        <SectionHeading
          badge={board.badge}
          title={board.title}
          subtitle={board.subtitle}
        />

        <div className="mt-10 space-y-4">
          {board.rows.map((row, i) => {
            const cfg = rowConfig[i] ?? rowConfig[0];
            return (
              <Reveal key={cfg.id} delay={i * 80}>
                <article className="card-hover overflow-hidden rounded-2xl border border-line bg-surface/60">
                  {/* row header: ticket id + priority + assignee */}
                  <div className="flex items-center justify-between border-b border-line bg-fill px-5 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="font-mono text-xs font-semibold"
                        style={{ color: cfg.color }}
                      >
                        {cfg.id}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-rose-400/10 px-2 py-0.5 text-[11px] font-medium text-rose-600 dark:text-rose-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                        {board.priority}
                      </span>
                    </div>
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: cfg.color }}
                    >
                      {cfg.assignee}
                    </span>
                  </div>

                  {/* 4 stages, connected left -> right */}
                  <div className="grid divide-y divide-line md:grid-cols-4 md:divide-x md:divide-y-0">
                    {/* Problem */}
                    <div className="relative p-5">
                      <StageLabel
                        label={board.columns.problem}
                        dot="bg-rose-400"
                        text="text-rose-600 dark:text-rose-300"
                      />
                      <h3 className="mt-3 text-sm font-semibold leading-snug">
                        {row.problem}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {row.problemDesc}
                      </p>
                      <FlowArrow />
                    </div>

                    {/* Solution */}
                    <div className="relative p-5">
                      <StageLabel
                        label={board.columns.solution}
                        dot="bg-brand"
                        text="text-brand"
                      />
                      <h3 className="mt-3 text-sm font-semibold leading-snug">
                        {row.solution}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {row.solutionDesc}
                      </p>
                      <FlowArrow />
                    </div>

                    {/* Development */}
                    <div className="relative flex flex-col p-5">
                      <StageLabel
                        label={board.columns.development}
                        dot="bg-accent"
                        text="text-cyan-600 dark:text-accent"
                      />
                      <div className="mt-auto space-y-2 pt-4">
                        <ProgressBar value={100} />
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-600 dark:text-accent">
                          <CheckIcon className="h-3.5 w-3.5" />
                          {board.deployed}
                        </div>
                      </div>
                      <FlowArrow />
                    </div>

                    {/* Result */}
                    <div className="flex flex-col bg-emerald-400/[0.05] p-5">
                      <StageLabel
                        label={board.columns.result}
                        dot="bg-emerald-400"
                        text="text-emerald-600 dark:text-emerald-300"
                      />
                      <div className="mt-auto pt-4">
                        <div className="flex items-center gap-2">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/15 text-emerald-600 dark:text-emerald-300">
                            <TrendUpIcon className="h-4 w-4" />
                          </span>
                          <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">
                            <CountUp
                              end={cfg.metric.value}
                              prefix={cfg.metric.prefix}
                              suffix={cfg.metric.unit}
                            />
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-muted">
                          {row.resultCaption}
                        </p>
                      </div>
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