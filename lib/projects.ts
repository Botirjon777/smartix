import type { Locale } from "@/i18n/config";

export type ProjectCategory = "website" | "platform";

export type ProjectContent = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

export type Project = {
  slug: string;
  category: ProjectCategory;
  /** Tailwind gradient classes for the cover, e.g. "from-brand to-accent" */
  accent: string;
  /** Optional cover image in /public; falls back to a gradient cover */
  cover?: string;
  liveUrl?: string;
  demoUrl?: string;
  tech: string[];
  year: string;
  /** true when the project is SmartIX's own product */
  ownProduct?: boolean;
  content: Record<Locale, ProjectContent>;
};

export const projects: Project[] = [
  {
    slug: "safir-hotel",
    category: "website",
    accent: "from-cyan-400 via-brand to-brand-2",
    cover: "/projects/safir-hotel/hotel-day.webp",
    liveUrl: "https://safirhotel.uz/",
    tech: ["Next.js", "React", "Tailwind CSS", "SEO"],
    year: "2026",
    content: {
      uz: {
        name: "Safir Hotel",
        tagline: "Zamonaviy mehmonxona veb-sayti",
        description:
          "Safir Hotel uchun tez, chiroyli va bron qilishga qulay veb-sayt. Mehmonlar xonalarni ko‘rib, narxlarni bilib, to‘g‘ridan-to‘g‘ri bog‘lanishlari mumkin. Mobil qurilmalarga to‘liq moslashgan va Google’da yaxshi chiqadigan qilib optimallashtirilgan.",
        features: [
          "Xonalar katalogi va narxlar",
          "Bron qilish uchun qulay interfeys",
          "Mobilga to‘liq moslashgan dizayn",
          "SEO optimizatsiya — Google’da chiqadi",
          "Tez ochiladigan sahifalar",
        ],
      },
      ru: {
        name: "Safir Hotel",
        tagline: "Современный сайт для отеля",
        description:
          "Быстрый, красивый и удобный для бронирования сайт для Safir Hotel. Гости могут посмотреть номера, узнать цены и связаться напрямую. Полностью адаптирован под мобильные устройства и оптимизирован для Google.",
        features: [
          "Каталог номеров и цены",
          "Удобный интерфейс для бронирования",
          "Полностью адаптивный дизайн",
          "SEO-оптимизация — виден в Google",
          "Быстрая загрузка страниц",
        ],
      },
      en: {
        name: "Safir Hotel",
        tagline: "A modern hotel website",
        description:
          "A fast, beautiful and booking-friendly website for Safir Hotel. Guests can browse rooms, check prices and get in touch directly. Fully responsive on mobile and optimized to rank well on Google.",
        features: [
          "Rooms catalog and pricing",
          "Booking-friendly interface",
          "Fully responsive design",
          "SEO optimized — ranks on Google",
          "Fast-loading pages",
        ],
      },
    },
  },
  {
    slug: "hospitality-platform",
    category: "platform",
    accent: "from-brand-2 via-brand to-accent",
    cover: "/projects/hospitality/banner.webp",
    demoUrl: "https://tv-app-five-eosin.vercel.app/safir/101",
    ownProduct: true,
    tech: [
      "Next.js",
      "Node.js",
      "POS",
      "Telegram Bot API",
      "PostgreSQL",
      "TV App",
    ],
    year: "2026",
    content: {
      uz: {
        name: "Hospitality Platform",
        tagline: "Mehmonxona va restoranlar uchun yagona platforma",
        description:
          "SmartIX’ning o‘z mahsuloti — mehmonxona va restoranlar uchun to‘liq ekotizim. Bitta platforma ichida: mehmon xonasidagi TV ilova, xonalar va stollar uchun QR-menyu sayti, buyurtmalarni qabul qiluvchi POS tizim, menejerlar uchun admin panel va Telegram bot integratsiyasi. Barcha buyurtmalar real vaqtda boshqariladi.",
        features: [
          "Mehmonxonalar uchun TV ilova",
          "Xonalar va stollar uchun QR-menyu sayti",
          "Buyurtmalarni qabul qiluvchi POS platforma",
          "Menejerlar uchun admin panel",
          "Telegram bot integratsiyasi",
          "Real vaqtli buyurtma boshqaruvi",
        ],
      },
      ru: {
        name: "Hospitality Platform",
        tagline: "Единая платформа для отелей и ресторанов",
        description:
          "Собственный продукт SmartIX — полноценная экосистема для отелей и ресторанов. В одной платформе: TV-приложение в номере гостя, сайт QR-меню для номеров и столов, POS-система приёма заказов, админ-панель для менеджеров и интеграция с Telegram-ботом. Все заказы управляются в реальном времени.",
        features: [
          "TV-приложение для отелей",
          "Сайт QR-меню для номеров и столов",
          "POS-платформа приёма заказов",
          "Админ-панель для менеджеров",
          "Интеграция с Telegram-ботом",
          "Управление заказами в реальном времени",
        ],
      },
      en: {
        name: "Hospitality Platform",
        tagline: "One platform for hotels & restaurants",
        description:
          "SmartIX's own product — a complete ecosystem for hotels and restaurants. One platform includes: an in-room TV app for hotels, a QR-menu website for rooms and tables, a POS system that receives orders, an admin panel for managers, and Telegram bot integration. All orders are managed in real time.",
        features: [
          "In-room TV app for hotels",
          "QR-menu website for rooms & tables",
          "POS platform that receives orders",
          "Admin panel for managers",
          "Telegram bot integration",
          "Real-time order management",
        ],
      },
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}