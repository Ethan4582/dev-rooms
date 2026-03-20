'use client';
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#000000] flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 gap-4 border-t-0">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-[#4edea3] font-black font-headline tracking-widest text-xl">DevFinder</span>
        <p className="text-gray-500 font-headline text-xs uppercase tracking-widest">© 2024 DevFinder. Structural Precision.</p>
      </div>
      <div className="flex gap-8">
        <Link className="text-gray-500 hover:text-[#4edea3] transition-colors font-headline text-xs uppercase tracking-widest opacity-80 hover:opacity-100" href="#">Documentation</Link>
        <Link className="text-gray-500 hover:text-[#4edea3] transition-colors font-headline text-xs uppercase tracking-widest opacity-80 hover:opacity-100" href="#">Changelog</Link>
        <Link className="text-gray-500 hover:text-[#4edea3] transition-colors font-headline text-xs uppercase tracking-widest opacity-80 hover:opacity-100" href="#">Status</Link>
        <Link className="text-gray-500 hover:text-[#4edea3] transition-colors font-headline text-xs uppercase tracking-widest opacity-80 hover:opacity-100" href="#">Privacy</Link>
      </div>
    </footer>
  );
}