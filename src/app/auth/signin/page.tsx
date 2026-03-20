"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { MoveRight, Loader2 } from "lucide-react";
import Link from "next/link";


export default function SigninPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden font-body selection:bg-primary selection:text-primary-foreground">
    
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in duration-700">
        {/* Subtle Decorative UI elements - Stylized corner accents */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/40 pointer-events-none" />

        <div className="bg-card/80 border border-border/50 backdrop-blur-2xl p-8 md:p-12 shadow-[20px_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Header section with App Branding */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-label">Secure_Access</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground font-headline leading-none">
                Dev<span className="text-primary">Finder</span>
              </h1>
              <p className="text-muted-foreground text-xs font-body max-w-[280px] leading-relaxed uppercase tracking-widest opacity-80">
                The developer collaboration platform for technical minds.
              </p>
            </div>

            {/* Visual Divider with tech-style label */}
            <div className="w-full relative py-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-border/40"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-label tracking-[0.3em]">
                <span className="bg-[#191a1a] px-4 text-muted-foreground/60">Protocol_Entry</span>
              </div>
            </div>

            {/* Main Authentication Action */}
            <div className="w-full space-y-6 pb-4">
              <button
                onClick={() => {
                  setIsLoading(true);
                  signIn("google", { callbackUrl: "/browse" });
                }}
                disabled={isLoading}
                className="group relative w-full flex items-center gap-4 bg-white hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed text-black font-label uppercase tracking-widest text-[11px] py-4 px-6 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
              >
                <div className="p-2 bg-white rounded-sm ring-1 ring-black/5">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94L5.84 14.1z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                </div>
                <span className="flex-grow text-center mr-8">
                  {isLoading ? "Authenticating..." : "Authenticate with Google"}
                </span>
                {!isLoading && (
                  <MoveRight className="absolute right-6 w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                )}
              </button>
            </div>
            
            <div className="space-y-4 pt-4 w-full">
              <p className="text-[10px] text-muted-foreground/60 font-body leading-relaxed">
                By accessing this terminal, you agree to our 
                <Link href="#" className="mx-1 text-primary/80 hover:text-primary transition-colors underline decoration-primary/20">Terms of Operation</Link> 
                and 
                <Link href="#" className="mx-1 text-primary/80 hover:text-primary transition-colors underline decoration-primary/20">Data Privacy Headers</Link>.
              </p>
            </div>
          </div>
        </div>

        {/* System Info Footer - Extra polish for the landing experience */}
        <div className="mt-12 flex items-center justify-between px-2 opacity-40">
           <Link href="/" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <span className="text-lg">←</span> Return_Home
          </Link>
          <div className="text-[10px] uppercase tracking-[0.2em] font-label text-muted-foreground flex items-center gap-4">
            <span>Uptime: 99.9%</span>
            <span>Cluster: NA-EAST-1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
