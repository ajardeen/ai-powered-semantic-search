"use client";
import AISearch from "@/components/AISearch";
import { useState, useEffect } from "react";
import { useSearch } from "@/hooks/useSearch";
import { useDebounce } from "use-debounce";
import ProductCard from "@/components/ProductCard";
import { useHotkey } from "@tanstack/react-hotkeys";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  tags: string[];
  score?: number;
}

export default function Home() {
  const [enableAiSearch, setEnableAiSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Debounce the search query by 500ms
  // This prevents calling the backend/Hugging Face on every single keystroke
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  // 2. Hotkey Implementation (Ctrl + / or Cmd + / to toggle AI Search)
  useHotkey("Mod+/", () => setEnableAiSearch((prev) => !prev));

  // 3. TanStack Query Logic (Uses the DEBOUNCED query now)
  const {
    data: products,
    isLoading,
    isError,
  } = useSearch(debouncedQuery, enableAiSearch);

  const getMatchMetric = (score: number) => {
    const percentage = (score * 100).toFixed(1);
    if (score > 0.8)
      return {
        label: "Strong Match",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        pct: percentage,
      };
    if (score > 0.6)
      return {
        label: "Moderate Match",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        pct: percentage,
      };
    return {
      label: "Partial Match",
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      pct: percentage,
    };
  };

  return (
    <div className="min-h-screen overflow-auto bg-slate-50 text-slate-900 p-2 sm:p-20 dark:bg-[#0F1114] dark:text-white transition-colors duration-500">
      <div className="w-full max-w-2xl mx-auto p-1">
        <div className="mb-4 text-center">
          <span className=" inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[10px]  text-slate-500  dark:border-white/10 dark:bg-white/5 dark:text-gray-500">
            <kbd className="rounded border border-slate-300 bg-slate-100 px-1 font-bold text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-blue-400">
              Ctrl + /
            </kbd>
            to toggle AI
          </span>
        </div>

        <AISearch
          enableAiSearch={enableAiSearch}
          setEnableAiSearch={setEnableAiSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {!isLoading && products && products.length > 0 && (
          <div className="mt-6 flex items-center justify-between border-b border-slate-200 pb-2 text-xs uppercase tracking-widest text-slate-500 dark:border-white/5 dark:text-gray-500">
            <span>Found {products.length} results</span>

            <span
              className={
                enableAiSearch
                  ? "font-bold text-blue-500 animate-pulse dark:text-blue-400"
                  : ""
              }
            >
              Mode: {enableAiSearch ? "🧠 AI Semantic" : "🔍 Regular"}
            </span>
          </div>
        )}
      </div>
      <div className="mt-8 space-y-4">
        {isLoading && (
          <div className="flex flex-col items-center gap-2 py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent dark:border-blue-400" />
            <p className="text-sm text-slate-500 animate-pulse dark:text-gray-400">
              {enableAiSearch ? "AI is thinking..." : "Searching catalogs..."}
            </p>
          </div>
        )}

        {isError && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-600 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400">
            Check backend connection. Hugging Face might be busy.
          </p>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-1 lg:grid-cols-4">
          {products?.map((product: Product) => {
            const metric = product.score ? getMatchMetric(product.score) : null;

            return (
              <ProductCard
                key={product._id}
                product={product}
                enableAiSearch={enableAiSearch}
                metric={metric}
              />
            );
          })}
        </div>

        {!isLoading && products?.length === 0 && debouncedQuery && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
            <p className="text-slate-500 dark:text-gray-500">
              No matches for "{debouncedQuery}"
            </p>

            {!enableAiSearch && (
              <button
                onClick={() => setEnableAiSearch(true)}
                className="mt-3 text-sm font-semibold text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Enable AI to search by intent →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
