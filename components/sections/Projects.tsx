import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ProjectCard from "../ProjectCard";
import { ArrowRightIcon } from "../icons";
import { getAllProjects } from "@/lib/projects";

export default function Projects({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const projects = getAllProjects();

  return (
    <section id="projects" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-24">
        <SectionHeading
          badge={dict.projects.badge}
          title={dict.projects.title}
          subtitle={dict.projects.subtitle}
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 110}>
              <ProjectCard
                project={p}
                locale={locale}
                label={dict.projects.view}
                categoryLabel={dict.projects.category[p.category]}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-fill px-6 py-3 text-sm font-medium transition hover:border-line-strong hover:bg-fill-strong"
          >
            {dict.projects.seeAll}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}