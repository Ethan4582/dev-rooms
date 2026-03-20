import { getRooms } from "@/data-access/room";
import { RoomCard } from "@/components/RoomCard";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { DashboardShell } from "@/components/DashboardShell";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { TopicFilters } from "@/components/TopicFilters";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  unstable_noStore();

  const session = await getServerSession(authOptions);

  const search = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;
  
  const tag = Array.isArray(searchParams.tag)
    ? searchParams.tag[0]
    : searchParams.tag;
  
  // Calculate tag counts for "top used" logic
  const allRooms = await getRooms();
  const tagCounts: Record<string, number> = {};
  allRooms.forEach(r => {
    String(r.language).split(",").forEach(t => {
      const clean = t.trim();
      if (clean) tagCounts[clean] = (tagCounts[clean] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);

  const topTags = sortedTags.slice(0, 5);
  const otherTags = sortedTags.slice(5).sort();
  const allDistinctTags = ["All Topics", ...sortedTags].sort();

  // Get filtered rooms
  const rooms = await getRooms(search as string, tag as string);

  const actions = session ? (
    <Link 
      href="/create-room"
      className="bg-primary text-on-primary border border-primary px-6 py-4 font-label font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(78,222,163,0.2)] hover:shadow-[0_0_30px_rgba(78,222,163,0.4)] transition-all flex items-center gap-2 active:scale-95"
    >
      <Plus className="h-5 w-5" />
      Initialize_New_Room
    </Link>
  ) : null;

  return (
    <DashboardShell 
      title="Active Grid" 
      description={`System operational // ${rooms.length} nodes online`}
      actions={actions}
      requireAuth={false}
    >
      <TopicFilters tags={allDistinctTags} topTags={topTags} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
        {rooms.length === 0 ? (
          <div className="col-span-full py-40 border border-outline-variant/10 flex flex-col items-center justify-center text-center bg-surface-dim shadow-inner">
            <div className="w-24 h-24 mb-8 grayscale opacity-10">
               <Image
                 src="/no-data_.svg"
                 alt="No rooms found"
                 width={200}
                 height={200}
               />
            </div>
            <p className="font-headline text-on-surface uppercase tracking-[0.4em] text-sm font-black mb-2 opacity-50">Filter_Mismatch</p>
            <p className="text-outline text-xs tracking-widest uppercase opacity-40">No active nodes match current parameters</p>
            <Link href="/browse" className="mt-8 text-primary font-label text-[10px] uppercase tracking-widest border-b border-primary/20 hover:border-primary transition-colors"> Reset All Filters </Link>
          </div>
        ) : (
          rooms.map((room) => (
            <RoomCard key={String(room.id)} room={room} />
          ))
        )}
      </div>
    </DashboardShell>
  );
}
