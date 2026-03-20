import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in duration-500">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-2 border-primary/40 rounded-full animate-spin [animation-duration:1.5s]"></div>
        <div className="absolute inset-4 border-l-2 border-primary/20 rounded-full animate-spin [animation-duration:2s]"></div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary animate-pulse">Syncing_Nodes</span>
        <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-outline/40">Fetching telemetry from active hubs...</span>
      </div>
    </div>
  );
}
