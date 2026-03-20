"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signIn, signOut, useSession } from "next-auth/react";
import { DeleteIcon, LogOutIcon, Search, User as UserIcon, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { deleteAccountAction } from "./actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-[#0a0a0a] border border-white/10 rounded-sm shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline uppercase text-primary tracking-widest text-sm">Decommission Account?</AlertDialogTitle>
            <AlertDialogDescription className="text-outline/60 text-[11px] font-mono leading-relaxed">
              WARNING: This operation is irreversible. All session logs and associated developer credentials will be purged from the cluster.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-transparent border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-outline hover:bg-white/5 rounded-none p-4">Abort</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#ff4b4b] text-white hover:bg-[#ff4b4b]/90 text-[9px] font-black uppercase tracking-[0.2em] rounded-none p-4"
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Confirm_Purge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 hover:opacity-80 transition-all active:scale-95 group">
            <Avatar className="h-10 w-10 border border-white/10 rounded-none shadow-xl group-hover:border-primary/40 transition-colors">
              <AvatarImage src={session.data?.user?.image ?? ""} className="grayscale-[0.5] group-hover:grayscale-0 transition-all" />
              <AvatarFallback className="bg-[#111111] text-primary"><UserIcon className="w-4 h-4" /></AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 p-2 w-56 rounded-none animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-3 border-b border-white/5 mb-2">
             <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{session.data?.user?.name}</p>
             <p className="text-[8px] font-mono text-outline/40 uppercase tracking-widest mt-1">Active_Node</p>
          </div>
          <DropdownMenuItem
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 focus:bg-white/5 cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] text-outline hover:text-white transition-all rounded-none"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOutIcon className="h-3.5 w-3.5 text-outline group-hover:text-primary transition-colors" />
            <span>Sign Out</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-3 px-4 py-3 hover:bg-[#ff4b4b]/10 focus:bg-[#ff4b4b]/10 cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] text-[#ff4b4b] transition-all rounded-none mt-1"
            onClick={() => setOpen(true)}
          >
            <DeleteIcon className="h-3.5 w-3.5" />
            <span>Delete Account</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}


export function Header({ className, showSearch = false }: { className?: string; showSearch?: boolean }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");

  const isHomePage = pathname === "/";
  const isLoggedIn = !!session;

  useEffect(() => {
    setSearchValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <nav className={`flex justify-between items-center w-full px-8 py-4 bg-surface border-b border-outline-variant/10 z-50 ${className}`}>
      <div className="flex items-center gap-8">
        {isHomePage && (
          <Link href="/" className="text-xl font-black tracking-tighter text-primary font-headline uppercase leading-none">
            DevFinder
          </Link>
        )}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/browse"
            className={`font-label uppercase tracking-[0.2em] text-[10px] transition-colors pb-1 ${
              pathname === "/browse" ? "text-primary border-b-2 border-primary" : "text-outline hover:text-on-surface"
            }`}
          >
            Rooms
          </Link>
          {isLoggedIn && (
            <Link
              href="/your-rooms"
              className={`font-label uppercase tracking-[0.2em] text-[10px] transition-colors pb-1 ${
                pathname === "/your-rooms" ? "text-primary border-b-2 border-primary" : "text-outline hover:text-on-surface"
              }`}
            >
              Your Rooms
            </Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
        {showSearch && (
          <form 
            onSubmit={handleSearch}
            className="relative flex-1 max-w-md hidden sm:block font-mono"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant h-4 w-4" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                const val = e.target.value;
                setSearchValue(val);
                if (val === "") {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("search");
                  router.push(`/browse?${params.toString()}`);
                }
              }}
              placeholder="SEARCH_ACTIVE_..."
              className="w-full bg-surface-container-highest border border-outline-variant/20 px-10 py-2.5 text-[10px] tracking-widest focus:outline-none focus:border-primary/50 text-on-surface uppercase"
            />
          </form>
        )}

        <div className="flex items-center gap-6">
          <Link 
            href="https://github.com/Ethan4582/dev-rooms" 
            target="_blank"
            className="text-outline hover:text-primary transition-colors active:scale-95"
          >
            <Github className="w-5 h-5" />
          </Link>
          {!session ? (
            <button
              onClick={() => signIn()}
              className="emerald-gradient text-on-primary font-bold px-6 py-2.5 transition-all text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95"
            >
              Sign In
            </button>
          ) : (
            <AccountDropdown />
          )}
        </div>
      </div>
    </nav>
  );
}
