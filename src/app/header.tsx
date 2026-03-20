"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
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
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import { usePathname } from "next/navigation";


function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
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
          <button className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors font-headline">
            <Avatar className="h-8 w-8 ghost-border">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{session.data?.user?.name}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-surface-container shadow-xl border-outline-variant">
          <DropdownMenuItem
            className="hover:bg-primary/10 cursor-pointer"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2 h-4 w-4" /> Sign Out
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-error hover:bg-error/10 cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2 h-4 w-4" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
} 

export function Header() {
   const session = useSession();
   const isLoggedIn = !!session.data;
   const pathname = usePathname();

   return (
      <nav className="bg-[#0e0e0e] flex justify-between items-center w-full px-6 py-4 mx-auto fixed top-0 z-50 border-b-0">
         <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-[#4edea3] font-headline">
               DevFinder
            </Link>
            
            <div className="hidden md:flex gap-6">
               <Link 
                  href="/browse" 
                  className={`${pathname === '/browse' ? 'text-[#4edea3] font-bold border-b-2 border-[#4edea3]' : 'text-gray-400 hover:text-white'} pb-1 font-headline tracking-tight transition-colors`}
               >
                  Browse
               </Link>
               {isLoggedIn && (
                  <Link 
                     href="/your-rooms" 
                     className={`${pathname === '/your-rooms' ? 'text-[#4edea3] font-bold border-b-2 border-[#4edea3]' : 'text-gray-400 hover:text-white'} pb-1 font-headline tracking-tight transition-colors`}
                  >
                     Your Rooms
                  </Link>
               )}
            </div>
         </div>

         <div className="flex items-center gap-4">
            {!session.data ? (
               <>
                  <button 
                     onClick={() => signIn()}
                     className="text-gray-400 hover:text-white transition-colors font-headline text-sm uppercase tracking-widest px-4 py-2"
                  >
                     Sign In
                  </button>
                  <button 
                     onClick={() => signIn()}
                     className="emerald-gradient text-on-primary font-bold px-6 py-2 transition-all duration-200 active:scale-95 font-headline text-sm uppercase tracking-widest"
                  >
                     Get Started
                  </button>
               </>
            ) : (
               <div className="flex items-center gap-4">
                  <AccountDropdown />
                  <ModeToggle />
               </div>
            )}
         </div>
      </nav>
   )
}
