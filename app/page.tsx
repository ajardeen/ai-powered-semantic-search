"use client";
import AISearch from "@/components/AISearch";
import { useState, useEffect } from "react";
import { useSearch } from "@/hooks/useSearch";
import { useDebounce } from "use-debounce";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  tags?: string[];
  score?: number;
}

export default function Home() {
  const [enableAiSearch, setEnableAiSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 1. Debounce the search query by 500ms
  // This prevents calling the backend/Hugging Face on every single keystroke
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  // 2. Hotkey Implementation (Ctrl + A)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl + A (or Cmd + A on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
        event.preventDefault(); // Prevent "Select All" browser behavior
        setEnableAiSearch((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 3. TanStack Query Logic (Uses the DEBOUNCED query now)
  const {
    data: products,
    isLoading,
    isError,
  } = useSearch(debouncedQuery, enableAiSearch);

  const getMatchMetric = (score: number) => {
    const percentage = (score * 100).toFixed(1);
    if (score > 0.8) return { label: "Strong Match", color: "text-blue-400", bg: "bg-blue-400/10", pct: percentage };
    if (score > 0.6) return { label: "Moderate Match", color: "text-yellow-400", bg: "bg-yellow-400/10", pct: percentage };
    return { label: "Partial Match", color: "text-gray-400", bg: "bg-gray-400/10", pct: percentage };
  };

  return (
    <div className="p-20 flex flex-col items-center bg-[#0F1114] text-white min-h-screen">
      <div className="w-full max-w-2xl">
        <div className="mb-4 text-center">
          <span className="text-[10px] bg-white/5 border-b border-white/10 px-2 py-1 rounded text-gray-500 uppercase tracking-tighter">
            Hotkey: <kbd className="text-blue-400 font-bold px-1 bg-white/5 border border-white/10 rounded">Ctrl + A</kbd> to toggle AI
          </span>
        </div>

        <AISearch
          enableAiSearch={enableAiSearch}
          setEnableAiSearch={setEnableAiSearch}
          searchQuery={searchQuery} // Component stays responsive with immediate state
          setSearchQuery={setSearchQuery}
        />

        {/* Search Metadata */}
        {!isLoading && products && products.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
            <span>Found {products.length} results</span>
            <span className={enableAiSearch ? "text-blue-400 animate-pulse font-bold" : ""}>
              Mode: {enableAiSearch ? "🧠 AI Semantic" : "🔍 Regular"}
            </span>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {isLoading && (
            <div className="flex flex-col items-center gap-2 py-10">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm animate-pulse">
                {enableAiSearch ? "AI is thinking..." : "Searching catalogs..."}
              </p>
            </div>
          )}

          {isError && (
            <p className="text-red-400 text-center bg-red-400/10 p-4 rounded-xl border border-red-400/20">
              Check backend connection. Hugging Face might be busy.
            </p>
          )}

          {products?.map((product: Product) => {
            const metric = product.score ? getMatchMetric(product.score) : null;
            
            return (
              <div
                key={product._id}
                className="relative p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group overflow-hidden"
              >
                {enableAiSearch && metric && (
                  <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold rounded-bl-lg ${metric.bg} ${metric.color} flex items-center gap-1.5`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${metric.color.replace('text', 'bg')} animate-pulse`} />
                    {metric.label} ({metric.pct}%)
                  </div>
                )}

                <div className="flex justify-between items-start pr-20">
                  <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-green-400 font-mono font-bold">₹{product.price}</span>
                </div>

                <p className="text-gray-400 text-sm mt-2 leading-relaxed italic">
                  "{product.description}"
                </p>

                <div className="flex items-center gap-2 mt-4">
                  {product.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500 uppercase font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {!isLoading && products?.length === 0 && debouncedQuery && (
            <div className="text-center p-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <p className="text-gray-500">No matches for "{debouncedQuery}"</p>
              {!enableAiSearch && (
                <button 
                  onClick={() => setEnableAiSearch(true)}
                  className="mt-3 text-blue-400 text-sm hover:text-blue-300 transition-colors font-semibold"
                >
                  Enable AI to search by intent →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}