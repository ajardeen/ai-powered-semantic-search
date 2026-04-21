import Image from "next/image";
import React from "react";

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
  return (
    
    <div className="relative overflow-hidden rounded-[2rem] p-[1.5px]">
      {/* The Animated Sweep (Search Bar Only) */}
      {enableAiSearch && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="gemini-container">
            <div className="gemini-gradient" />
          </div>
          <div className="gemini-container filter blur-xl opacity-40">
            <div className="gemini-gradient" />
          </div>
        </div>
      )}

      {/* Default Static Border */}
      <div
        className={`absolute inset-0 border border-white/10 rounded-[2rem] transition-opacity duration-500 ${enableAiSearch ? "opacity-0" : "opacity-100"}`}
      />

      {/* Inner Body */}
      <div className="relative flex items-center bg-[#1e1f20] rounded-[2rem] px-5 py-3.5 gap-4">
        {/* Icon Morph */}
        <div className="relative w-6 h-6">
          <Image
            src="/Search icon.svg"
            alt="Search"
            fill
            className={`transition-all duration-500 ${enableAiSearch ? "opacity-0 scale-50" : "opacity-40"}`}
          />
          <Image
            src="/Search ai icon.svg"
            alt="AI"
            fill
            className={`transition-all duration-500 ${enableAiSearch ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
          />
        </div>

        <input
          type="text"
          placeholder={enableAiSearch ? "Search with AI..." : "Search"}
          className={`flex-1 caret-blue-400 bg-transparent font-semibold border-none outline-none text-lg transition-colors duration-500 ${
            enableAiSearch
              ? "text-blue-100 placeholder-blue-300/40"
              : "text-white placeholder-gray-500"
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* AI Button with Active Border Effect */}
        <button
          onClick={() => setEnableAiSearch(!enableAiSearch)}
          className={`
                  relative p-[1.5px] rounded-full transition-all duration-500 active:scale-90
                  ${enableAiSearch ? "btn-active-border shadow-[0_0_15px_rgba(66,133,244,0.2)]" : "bg-transparent"}
                `}
        >
          <div
            className={`
                  relative px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-500
                  ${
                    enableAiSearch
                      ? "bg-[#1e1f20] text-white"
                      : "bg-white/[0.03] text-gray-400 border border-white/10 hover:bg-white/10"
                  }
                `}
          >
            <span
              className={
                enableAiSearch
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent"
                  : ""
              }
            >
              AI
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default AISearch;
