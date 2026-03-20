"use client";

import { DashboardShell } from "@/components/DashboardShell";
import { Users } from "lucide-react";

export default function TeamsPage() {
  return (
    <DashboardShell 
      title="Teams" 
      description="Initialize sub-clusters and manage organizational access"
    >
      <div className="flex flex-col items-center justify-center py-32 border border-dashed border-outline-variant/30 bg-surface-container-low/20">
        <div className="w-16 h-16 bg-surface-container-highest flex items-center justify-center mb-6">
          <Users className="text-outline-variant h-8 w-8" />
        </div>
        <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-on-surface">No Active Teams</h3>
        <p className="text-outline text-sm mt-2 font-body">Teams module is currently under encryption. Check back soon.</p>
        <button className="mt-8 px-6 py-3 bg-surface-container-highest border border-outline-variant/40 text-xs font-label uppercase tracking-widest text-outline grayscale opacity-50 cursor-not-allowed">
           Initialize_Team_Protocol
        </button>
      </div>
    </DashboardShell>
  );
}
