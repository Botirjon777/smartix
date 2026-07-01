import Reveal from "./Reveal";

export default function SectionHeading({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {badge}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-4 text-pretty text-base text-muted sm:text-lg">
          {subtitle}
        </p>
      </Reveal>
    </div>
  );
}
