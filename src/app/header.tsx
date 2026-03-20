"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signIn, signOut, useSession } from "next-auth/react";
import { DeleteIcon, LogOutIcon, Search, User as UserIcon } from "lucide-react";
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
        <AlertDialogContent className="bg-surface-container-high border-outline-variant/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline uppercase">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-on-surface-variant text-xs font-body">
              This action cannot be undone. This will permanently remove your account and any associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-outline-variant text-[10px] font-label uppercase tracking-widest text-on-surface">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-error text-on-error hover:bg-error/90 text-[10px] font-label uppercase tracking-widest"
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Avatar className="h-8 w-8 ghost-border rounded-none">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback><UserIcon /></AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-surface-container-high shadow-xl border-outline-variant/30 font-headline">
          <DropdownMenuItem
            className="hover:bg-primary/10 cursor-pointer text-xs uppercase tracking-widest text-on-surface"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOutIcon className="mr-2 h-3 w-3" /> Sign Out
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-error hover:bg-error/10 cursor-pointer text-xs uppercase tracking-widest"
            onClick={() => setOpen(true)}
          >
            <DeleteIcon className="mr-2 h-3 w-3" /> Delete Account
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
    if (searchValue) {
      router.push(`/browse?search=${searchValue}`);
    } else {
      router.push("/browse");
    }
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
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="SEARCH_ACTIVE_CLUSTERS..."
              className="w-full bg-surface-container-highest border border-outline-variant/20 px-10 py-2.5 text-[10px] tracking-widest focus:outline-none focus:border-primary/50 text-on-surface uppercase"
            />
          </form>
        )}

        <div className="flex items-center gap-4">
          {!session ? (
            <button
              onClick={() => signIn()}
              className="emerald-gradient text-on-primary font-bold px-6 py-2.5 transition-all text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95"
            >
              Initialize_Shell
            </button>
          ) : (
            <AccountDropdown />
          )}
        </div>
      </div>
    </nav>
  );
}
