"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  BarChart3, 
  Code2, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  Plus,
  PanelLeftClose
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/browse", icon: BarChart3 },
  { name: "Repositories", href: "/your-rooms", icon: Code2 },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ onToggle }: { onToggle?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="hidden md:flex flex-col h-full w-64 bg-[#000000] border-r border-outline-variant/20 py-6 shrink-0 font-headline">
      <div className="px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-primary font-black text-lg tracking-tight leading-none">DEV_FINDER</h1>
        </div>
        {onToggle && (
          <button 
            onClick={onToggle}
            className="text-outline-variant hover:text-primary transition-colors p-1"
            title="Close Sidebar (Ctrl + B)"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <div className="px-3 mb-2">
          <p className="text-[10px] font-label uppercase tracking-[0.2em] text-outline-variant">Main Menu</p>
        </div>
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 transition-colors text-sm tracking-tight ${
                isActive 
                  ? "bg-surface-container-low text-primary border-l-4 border-primary font-bold" 
                  : "text-outline hover:bg-surface-container-low/50 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-6">
        <Link 
          href="/create-room"
          className="w-full emerald-gradient text-on-primary py-3 font-bold text-xs uppercase tracking-widest active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Room
        </Link>
      </div>

      <div className="mt-auto px-3 space-y-1">
        <Link 
          href="/help"
          className="flex items-center gap-3 px-3 py-2 text-outline hover:bg-surface-container-low/50 hover:text-white transition-colors text-sm tracking-tight"
        >
        
         
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2 text-outline hover:bg-surface-container-low/50 hover:text-white transition-colors text-sm tracking-tight"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {session?.user && (
        <div className="px-6 mt-4 pt-4 border-t border-outline-variant/10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 ghost-border overflow-hidden">
                <img src={session.user.image ?? ""} alt={session.user.name ?? ""} className="w-full h-full object-cover" />
             </div>
             <div className="overflow-hidden">
                <p className="text-xs font-bold text-on-surface truncate">{session.user.name}</p>
                <p className="text-[10px] text-on-surface-variant truncate">Developer</p>
             </div>
          </div>
        </div>
      )}
    </aside>
  );
}
