"use client";

import { DashboardShell } from "@/components/DashboardShell";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardShell 
      title="System Settings" 
      description="System Version 0.8.2-beta // Kernel config active"
    >
      <div className="flex flex-col items-center justify-center py-32 border border-dashed border-outline-variant/30 bg-surface-container-low/20">
        <div className="w-16 h-16 bg-surface-container-highest flex items-center justify-center mb-6">
          <Settings className="text-outline-variant h-8 w-8" />
        </div>
        <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-on-surface">Configuration Locked</h3>
        <p className="text-outline text-sm mt-2 font-body">Manage global settings and UI preferences for your terminal shell.</p>
        <button className="mt-8 px-6 py-3 bg-surface-container-highest border border-outline-variant/40 text-xs font-label uppercase tracking-widest text-outline grayscale opacity-50 cursor-not-allowed">
           Edit_Kernel_Config
        </button>
      </div>    </DashboardShell>
  );
}
