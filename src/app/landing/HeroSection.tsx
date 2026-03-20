'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden bg-surface pt-20">
      <div className="grid md:grid-cols-12 gap-12 w-full max-w-7xl mx-auto">
        <div className="md:col-span-7 flex flex-col justify-center gap-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high ghost-border w-fit">
            <span className="material-symbols-outlined text-primary text-sm">terminal</span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">System Status: Operational</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none text-on-surface">
            Find your next <span className="text-primary">pair-programming</span> partner.
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed border-l-2 border-primary/20 pl-6">
            The architectural core for real-time remote collaboration. Discover, create, and join coding rooms instantly.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/browse" className="emerald-gradient text-on-primary font-bold px-8 py-4 flex items-center gap-2 transition-all active:scale-95">
              <span className="font-label uppercase tracking-widest">Browse Rooms</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link href="/create-room" className="ghost-border bg-surface-container-low text-on-surface font-bold px-8 py-4 hover:bg-surface-container-high transition-all active:scale-95">
              <span className="font-label uppercase tracking-widest">Create a Room</span>
            </Link>
          </div>
        </div>
        <div className="md:col-span-5 relative flex items-center justify-center">
          {/* Technical UI Mockup */}
          <div className="w-full bg-surface-container-lowest ghost-border p-4 font-mono text-[11px] leading-tight relative shadow-2xl shadow-primary/5">
            <div className="flex items-center justify-between mb-4 border-b border-outline-variant/30 pb-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-error/40"></div>
                <div className="w-2.5 h-2.5 bg-tertiary-dim/40"></div>
                <div className="w-2.5 h-2.5 bg-primary/40"></div>
              </div>
              <span className="text-on-surface-variant opacity-50">dev_finder_v1.0.4</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-surface-container p-2">
                <div className="w-8 h-8 bg-primary/20 flex items-center justify-center text-primary ghost-border">
                  <span className="material-symbols-outlined text-sm">code</span>
                </div>
                <div>
                  <div className="text-primary font-bold">Refactor/Auth_Module</div>
                  <div className="text-on-surface-variant">2/4 Developers Joined</div>
                  <div className="flex gap-2 mt-1 font-mono">
                    <span className="bg-surface-container-highest px-1 border border-outline-variant/20 italic">TypeScript</span>
                    <span className="bg-surface-container-highest px-1 border border-outline-variant/20 italic">Node.js</span>
                  </div>
                </div>
              </div>
              <div className="text-on-surface-variant/40 pl-2">-- fetching active_sessions...</div>
              <div className="flex items-start gap-3 bg-surface-container p-2">
                <div className="w-8 h-8 bg-tertiary/20 flex items-center justify-center text-tertiary ghost-border">
                  <span className="material-symbols-outlined text-sm">terminal</span>
                </div>
                <div>
                  <div className="text-tertiary font-bold">Kernel_Optimization</div>
                  <div className="text-on-surface-variant">1/2 Developers Joined</div>
                  <div className="flex gap-2 mt-1 font-mono">
                    <span className="bg-surface-container-highest px-1 border border-outline-variant/20 italic">Rust</span>
                    <span className="bg-surface-container-highest px-1 border border-outline-variant/20 italic">Wasm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative background grid */}
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #484848 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
      </div>
    </section>
  );
}