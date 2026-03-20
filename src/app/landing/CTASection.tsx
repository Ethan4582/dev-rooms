'use client';
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-surface-container-lowest">
      <div className="max-w-4xl mx-auto text-center border border-primary/20 p-12 relative overflow-hidden">
        {/* Background visual */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#4edea3 1px, transparent 1px), linear-gradient(90deg, #4edea3 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-8 relative z-10 text-on-surface">Ready to build together?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <Link href="/browse" className="emerald-gradient text-on-primary font-bold px-10 py-5 transition-all active:scale-95 flex items-center justify-center gap-3 group">
            <span className="font-label uppercase tracking-[0.2em]">Browse All Rooms</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">rocket_launch</span>
          </Link>
          <button className="bg-surface text-on-surface ghost-border px-10 py-5 transition-all hover:bg-surface-container-high active:scale-95 font-label uppercase tracking-[0.2em]">
            Sign Up Now
          </button>
        </div>
        <div className="mt-12 flex justify-center gap-8 text-on-surface-variant font-mono text-[10px] uppercase tracking-widest opacity-60">
          <span>Direct Access</span>
          <span>No Middleware</span>
          <span>Developer First</span>
        </div>
      </div>
    </section>
  );
}