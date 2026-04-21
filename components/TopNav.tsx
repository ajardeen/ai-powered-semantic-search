
"use client";

import { useTheme } from "next-themes";
import { Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            <Search className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Semantic AI Search
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Intelligent search powered by embeddings
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}

export default TopNav;


