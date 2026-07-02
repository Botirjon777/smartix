"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(
      document.documentElement.classList.contains("light") ? "light" : "dark"
    );
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const el = document.documentElement;
    el.classList.remove("dark", "light");
    el.classList.add(next);
    el.style.colorScheme = next;
    document.cookie = `theme=${next};path=/;max-age=31536000;samesite=lax`;
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-fill text-foreground transition hover:border-brand/50 hover:bg-fill-strong"
    >
      {mounted && theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-brand" />
      ) : (
        <MoonIcon className="h-5 w-5 text-brand" />
      )}
    </button>
  );
}