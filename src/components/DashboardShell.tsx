"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "@/app/header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DashboardShell({ children, title, description, actions, requireAuth = true }: { 
  children: ReactNode, 
  title?: string, 
  description?: string, 
  actions?: ReactNode,
  requireAuth?: boolean
}) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

 
  const showSidebar = status === "authenticated";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (requireAuth && status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface relative">
      {/* Sidebar - only shown if authenticated */}
      {showSidebar && isSidebarOpen && (
         <Sidebar onToggle={() => setIsSidebarOpen(false)} />
      )}

      {/* Main content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header className="relative" showSearch={true} />
        
        {/* Sidebar Toggle Button (Floating) */}
        {showSidebar && (
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className={`fixed left-2 bottom-8 z-[60] bg-surface-container-highest border border-outline-variant/30 p-2 text-primary hover:text-white transition-all active:scale-95 shadow-2xl ${!isSidebarOpen ? "translate-x-0" : "hidden md:flex translate-x-[240px] opacity-0 group-hover:opacity-100"}`}
             title="Toggle Sidebar (Ctrl + B)"
           >
             {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
           </button>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {/* Dashboard Sub-Header */}
          <div className="px-8 py-8 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0 font-headline">
            <div>
              {title && (
                <h2 className="text-4xl font-bold tracking-tighter text-on-surface leading-none mb-3 uppercase">
                  {title}
                </h2>
              )}
              {description && (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary animate-pulse"></div>
                  <span className="text-[10px] font-label uppercase tracking-widest text-outline">
                    {description}
                  </span>
                </div>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-3">
                {actions}
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 px-8 pb-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
