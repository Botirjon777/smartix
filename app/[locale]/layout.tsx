import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { I18nProvider } from "@/i18n/I18nProvider";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://smartix.uz";

const ogLocaleMap: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typed = isLocale(locale) ? locale : "uz";
  const dict = getDictionary(typed);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: "%s | SmartIX",
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: "SmartIX",
    authors: [{ name: "SmartIX" }],
    creator: "SmartIX",
    publisher: "SmartIX",
    alternates: {
      canonical: `/${typed}`,
      languages: {
        uz: "/uz",
        ru: "/ru",
        en: "/en",
        "x-default": "/uz",
      },
    },
    openGraph: {
      type: "website",
      siteName: "SmartIX",
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE_URL}/${typed}`,
      locale: ogLocaleMap[typed],
      alternateLocale: locales
        .filter((l) => l !== typed)
        .map((l) => ogLocaleMap[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  const theme = "dark";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SmartIX",
    url: `${SITE_URL}/${typedLocale}`,
    logo: `${SITE_URL}/assets/logo/logo-square.png`,
    description: dict.meta.description,
    email: dict.cta.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    member: dict.team.members.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
    })),
    sameAs: [] as string[],
  };

  const themeInit = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(dark|light)/);var th=m?m[1]:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');var el=document.documentElement;el.classList.remove('dark','light');el.classList.add(th);el.style.colorScheme=th;if(!m){document.cookie='theme='+th+';path=/;max-age=31536000;samesite=lax';}}catch(e){}})();`;

  return (
    <html
      lang={typedLocale}
      className={`${theme} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider locale={typedLocale} dict={dict}>
          <Background />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer dict={dict} locale={typedLocale} />
        </I18nProvider>
      </body>
    </html>
  );
}
