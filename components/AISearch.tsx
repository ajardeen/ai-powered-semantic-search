import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

function AISearch({
  enableAiSearch,
  setEnableAiSearch,
  searchQuery,
  setSearchQuery,
}: {
  enableAiSearch: boolean;
  setEnableAiSearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [caretColorIndex, setCaretColorIndex] = useState(0);

  const caretColors = ["#3b82f6", "#ef4444", "#eab308", "#22c55e"]; // Blue, Red, Yellow, Green

  useEffect(() => {
    inputRef.current?.focus();
  }, [enableAiSearch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaretColorIndex((prev) => (prev + 1) % caretColors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const aiSuggestions = [
    "Outdoor security cameras with night vision",
    "Ergonomic office chairs for back support",
    "Best 4K camera drones for photography",
    "High refresh rate gaming monitors",
    "Smart home lighting with voice control",
    "Noise cancelling wireless earbuds",
    "Fast USB-C chargers for laptops",
    "HEPA air purifiers for home cooling",
  ];

  const regularSuggestions = [
    "Smart Door Lock",
    "Mechanical Keyboard",
    "Electric Scooter",
    "Portable Speaker",
  ];

  const suggestions = enableAiSearch ? aiSuggestions : regularSuggestions;

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4">
      <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] p-[1.5px]">
        {/* Animated Border */}
        {enableAiSearch && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="gemini-container">
              <div className="gemini-gradient" />
            </div>
            <div className="gemini-container blur-xl opacity-20 dark:opacity-40">
              <div className="gemini-gradient" />
            </div>
          </div>
        )}

        {/* Default Border */}
        <div
          className={`absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] border transition-opacity duration-500 ${
            enableAiSearch
              ? "opacity-0"
              : "opacity-100 border-black/10 dark:border-white/10"
          }`}
        />

        {/* Search Body */}
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-[1.5rem] sm:rounded-[2rem] px-4 sm:px-5 py-4 bg-white dark:bg-[#1e1f20] border border-black/5 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors duration-500 sm:h-[52px] sm:min-h-[65px]">
          <div className="flex items-center gap-3 flex-1 w-full">
            {/* Search / AI Icon */}
            <div className="relative h-5 w-5 sm:h-6 sm:w-6 shrink-0">
              <Image
                src="/Search icon.svg"
                alt="Search"
                fill
                className={`transition-all duration-500 ${
                  enableAiSearch
                    ? "opacity-0 scale-50"
                    : "opacity-60 dark:opacity-40"
                }`}
              />

              <Image
                src="/Search ai icon.svg"
                alt="AI"
                fill
                className={`transition-all duration-500 ${
                  enableAiSearch
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }`}
              />
            </div>

            <input
              ref={inputRef}
              type="text"
              aria-expanded
              placeholder={enableAiSearch ? "Search with AI..." : "Search"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{ caretColor: caretColors[caretColorIndex] }}
              className={`flex-1 border-none bg-transparent text-sm sm:text-base lg:text-lg outline-none transition-colors duration-500 ${
                enableAiSearch
                  ? "text-slate-800 placeholder:text-slate-500/50 dark:text-blue-100"
                  : "text-slate-800 placeholder:text-slate-500/50 dark:text-white"
              }`}
            />
          </div>

          <button
            onClick={() => setEnableAiSearch(!enableAiSearch)}
            className={`w-full sm:w-auto relative rounded-full p-[1.5px] transition-all duration-500 active:scale-90 cursor-pointer ${
              enableAiSearch
                ? "btn-active-border shadow-[0_0_15px_rgba(66,133,244,0.15)]"
                : "bg-transparent"
            }`}
          >
            <div
              className={`relative rounded-full px-2 py-1 sm:px-5 sm:py-2 text-sm font-bold transition-all duration-500 text-center w-full sm:w-auto ${
                enableAiSearch
                  ? "bg-white text-slate-900 dark:bg-[#1e1f20] dark:text-white"
                  : "border border-black/10 bg-black/[0.03] text-slate-600 hover:bg-black/[0.06] dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/10"
              }`}
            >
              <span
                className={
                  enableAiSearch
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent"
                    : ""
                }
              >
                <span className="sm:hidden">Enable AI</span>
                <span className="hidden sm:inline">AI</span>
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Suggestions */}
      {searchQuery === "" && (
        <div className="mt-3 flex flex-col gap-2 sm:gap-3 animate-in fade-in duration-300 pointer-none:">
          <p className="px-2 py-0.5 text-sm border-b border-slate-300 dark:border-white/10 text-slate-500 dark:text-gray-500">
            Suggestion
          </p>

          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(suggestion)}
              className="w-fit flex items-center gap-2 text-left rounded-lg border border-transparent hover:border-slate-500! bg-slate-50 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-600 hover:bg-slate-100 dark:hover:border-white/10 dark:bg-transparent dark:text-gray-400 dark:hover:bg-white/10! transition-colors cursor-pointer wrap-break-word"
            >
              <ArrowUpRight size={14} />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AISearch;
