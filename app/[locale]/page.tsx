import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import Hero from "@/components/sections/Hero";
import Board from "@/components/sections/Board";
import Services from "@/components/sections/Services";
import Why from "@/components/sections/Why";
import Team from "@/components/sections/Team";
import Projects from "@/components/sections/Projects";
import CTA from "@/components/sections/CTA";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "uz";
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Hero dict={dict} />
      <Board dict={dict} />
      <Services dict={dict} />
      <Why dict={dict} />
      <Team dict={dict} />
      <Projects dict={dict} locale={typedLocale} />
      <CTA dict={dict} />
    </>
  );
}