import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/lib/projects";
import { ArrowRightIcon } from "./icons";

export default function ProjectCard({
  project,
  locale,
  label,
  categoryLabel,
}: {
  project: Project;
  locale: Locale;
  label: string;
  categoryLabel: string;
}) {
  const content = project.content[locale];
  const chips = project.tech.slice(0, 4);

  return (
    <a
      href={`/${locale}/projects/${project.slug}`}
      className="group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/60"
    >
      <div className="relative aspect-video overflow-hidden">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={content.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.accent} transition-transform duration-500 group-hover:scale-105`}
          >
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <span className="text-balance text-center text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                {content.name}
              </span>
            </div>
            <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
              SmartIX
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            {categoryLabel}
          </span>
          <span className="text-xs text-muted">{project.year}</span>
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight">
          {content.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {content.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {chips.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-fill px-2.5 py-1 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition group-hover:gap-2.5">
          {label}
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}