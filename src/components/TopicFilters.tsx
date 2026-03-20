"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function TopicFilters({ tags }: { tags: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") || "All Topics";
  const currentSearch = searchParams.get("search") || "";

  const allTags = ["All Topics", ...tags];

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === "All Topics") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <span className="font-label text-[10px] uppercase tracking-widest text-outline mr-4 flex items-center gap-2">
        <div className="w-1 h-3 bg-primary/40" />
        Filters
      </span>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              "px-4 py-2 text-[10px] font-label font-bold uppercase tracking-wider transition-all active:scale-95 border",
              currentTag === tag
                ? "bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(78,222,163,0.3)]"
                : "bg-surface-container-high text-outline border-outline-variant/20 hover:border-primary/40 hover:text-primary"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
