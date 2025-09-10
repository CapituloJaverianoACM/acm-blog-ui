"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      aria-label="Cambiar tema"
      onClick={toggle}
      className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform duration-200 hover:scale-105 hover:shadow-md dark:border-white/20 dark:bg-white/10"
    >
      {/* Simple icon: half-moon look using CSS */}
      <span
        aria-hidden
        className="block h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white dark:bg-white/80 shadow-[inset_-5px_0_0_0_rgba(0,0,0,0.6)]"
      />
    </button>
  );
}


