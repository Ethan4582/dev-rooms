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
          <div className="relative w-full aspect-video md:aspect-square group">
            
            <div className="absolute inset-0 bg-surface-container-lowest ghost-border overflow-hidden shadow-2xl shadow-primary/10">
              <img 
                src="/hero.png" 
                alt="DevFinder Interface" 
                className="w-full h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
            </div>

           
           
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.7 }}
               className="absolute bottom-8 -left-8 bg-surface-container-highest border border-outline-variant/30 backdrop-blur-md p-4 shadow-2xl z-20 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 flex items-center justify-center text-primary ghost-border">
                  <span className="material-symbols-outlined text-sm">code</span>
                </div>
                <div>
                  <div className="text-[10px] font-black font-headline uppercase tracking-widest text-on-surface">Refactor/Auth_Module</div>
                  <div className="text-[8px] font-mono text-outline/60 mt-0.5 uppercase tracking-widest leading-none">Status: Active_Session</div>
                </div>
              </div>
            </motion.div>

            
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary/20 pointer-events-none z-10" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary/20 pointer-events-none z-10" />
          </div>
          
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #484848 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
      </div>
    </section>
  );
}
