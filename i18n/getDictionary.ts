import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/uz";
import uz from "./dictionaries/uz";
import ru from "./dictionaries/ru";
import en from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { uz, ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? uz;
}

export type { Dictionary };
