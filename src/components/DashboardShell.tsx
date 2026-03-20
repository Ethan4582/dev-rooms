"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "@/app/header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export function DashboardShell({ children, title, description, actions }: { 
  children: ReactNode, 
  title?: string, 
  description?: string, 
  actions?: ReactNode 
}) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header className="relative" showSearch={true} />
        
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
