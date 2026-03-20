"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export function TopicFilters({ tags, topTags }: { tags: string[], topTags: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") || "All Topics";
  
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === "All Topics") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  const filteredTags = tags.filter(t => 
    t.toLowerCase().includes(filterText.toLowerCase()) && t !== "All Topics"
  );

  return (
    <div className="flex flex-col gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-label text-[10px] uppercase tracking-widest text-[#4edea3] font-bold flex items-center gap-2 mr-2">
          <div className="w-1 h-3 bg-[#4edea3]" />
          Top_Tech
        </span>
        
        <button
          onClick={() => handleTagClick("All Topics")}
          className={cn(
            "px-4 py-2 text-[10px] font-label font-bold uppercase tracking-wider transition-all active:scale-95 border",
            currentTag === "All Topics"
              ? "bg-[#4edea3] text-[#004a31] border-[#4edea3] shadow-[0_0_15px_rgba(78,222,163,0.3)]"
              : "bg-[#1a1b1b] text-[#767575] border-[#484848]/20 hover:border-[#4edea3]/40 hover:text-[#4edea3]"
          )}
        >
          All Nodes
        </button>

        {topTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              "px-4 py-2 text-[10px] font-label font-bold uppercase tracking-wider transition-all active:scale-95 border",
              currentTag === tag
                ? "bg-[#4edea3] text-[#004a31] border-[#4edea3] shadow-[0_0_15px_rgba(78,222,163,0.3)]"
                : "bg-[#1a1b1b] text-[#767575] border-[#484848]/20 hover:border-[#4edea3]/40 hover:text-[#4edea3]"
            )}
          >
            {tag}
          </button>
        ))}

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "px-4 py-2 text-[10px] font-label font-bold uppercase tracking-wider transition-all flex items-center gap-2 border",
              !topTags.includes(currentTag) && currentTag !== "All Topics"
              ? "bg-[#4edea3] text-[#004a31] border-[#4edea3]"
              : "bg-[#1a1b1b] text-[#767575] border-[#484848]/20 hover:border-primary/40"
            )}
          >
            {(!topTags.includes(currentTag) && currentTag !== "All Topics") ? currentTag : "More Hubs"}
            <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#111111] border border-[#484848]/40 shadow-2xl z-50 p-2 animate-in zoom-in-95 duration-200">
              <div className="relative mb-2">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#767575]" />
                 <input 
                   type="text"
                   placeholder="Search tags..."
                   className="w-full bg-[#0a0a0a] border border-[#484848]/20 pl-8 pr-3 py-2 text-[10px] text-white focus:outline-none focus:border-[#4edea3]/40 uppercase tracking-widest font-mono"
                   value={filterText}
                   onChange={(e) => setFilterText(e.target.value)}
                   autoFocus
                 />
              </div>
              <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-1">
                {filteredTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="w-full text-left px-3 py-2 text-[9px] uppercase tracking-widest font-bold text-[#767575] hover:bg-[#1a1b1b] hover:text-[#4edea3] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
                {filteredTags.length === 0 && (
                  <div className="text-[9px] text-[#767575]/40 text-center py-4 uppercase font-mono tracking-tighter">No_Matches</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
