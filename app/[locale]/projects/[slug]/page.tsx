import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getProject, getAllProjects } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import BookServiceButton from "@/components/BookingForm";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

type PageParams = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((l) =>
    getAllProjects().map((p) => ({ locale: l, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(slug);
  if (!project) return {};
  const c = project.content[locale];
  return { title: c.name, description: c.tagline };
}

export default async function ProjectDetailPage({ params }: PageParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const c = project.content[locale];
  const p = dict.projects;

  return (
    <section className="relative pt-28 pb-24 md:pt-32">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-24">
        {/* Back link */}
        <Reveal>
          <a
            href={`/${locale}/projects`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-foreground"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
            {p.back}
          </a>
        </Reveal>

        {/* Hero cover */}
        <Reveal delay={60}>
          <div
            className={`relative mt-6 aspect-[16/7] w-full overflow-hidden rounded-3xl bg-gradient-to-br ${project.accent}`}
          >
            {project.cover && (
              <Image
                src={project.cover}
                alt={c.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            {/* Overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
            {/* Badges */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
              <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {p.category[project.category]}
              </span>
              <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {project.year}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Title + tagline */}
        <Reveal delay={100}>
          <div className="mt-10 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {c.name}
            </h1>
            <p className="mt-4 text-lg text-muted sm:text-xl">{c.tagline}</p>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          {/* Left: description + features */}
          <div className="min-w-0">
            <Reveal delay={120}>
              <p className="max-w-2xl text-base leading-relaxed text-foreground/90">
                {c.description}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-foreground">
                  {p.features}
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {c.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right: sticky action card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={140}>
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  {p.tech}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-fill px-3 py-1 text-xs text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-line pt-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:shadow-brand/50"
                    >
                      {p.live}
                      <ArrowRightIcon className="h-4 w-4 -rotate-45 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-line bg-fill px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-line-strong hover:bg-fill-strong"
                    >
                      {p.demo}
                      <ArrowRightIcon className="h-4 w-4 -rotate-45" />
                    </a>
                  )}

                  <BookServiceButton
                    projectName={c.name}
                    projectSlug={project.slug}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}