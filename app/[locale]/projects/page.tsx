import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typed = isLocale(locale) ? locale : "uz";
  const dict = getDictionary(typed);

  return {
    title: dict.projects.title,
    description: dict.projects.subtitle,
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const projects = getAllProjects();

  return (
    <section className="relative pt-28 md:pt-32 pb-24">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-24">
        <SectionHeading
          badge={dict.projects.badge}
          title={dict.projects.title}
          subtitle={dict.projects.subtitle}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              locale={locale}
              label={dict.projects.view}
              categoryLabel={dict.projects.category[p.category]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}