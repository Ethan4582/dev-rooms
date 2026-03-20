import { getRooms } from "@/data-access/room";
import { RoomCard } from "@/components/RoomCard";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { DashboardShell } from "@/components/DashboardShell";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  unstable_noStore();

  const search = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;
  
  const rooms = await getRooms(search);

  const actions = (
    <Link 
      href="/create-room"
      className="bg-surface-container-highest border border-primary/40 text-primary px-6 py-3 font-label font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary/10 transition-all flex items-center gap-2 active:scale-95"
    >
      <Plus className="h-4 w-4" />
      Initialize_New_Room
    </Link>
  );

  return (
    <DashboardShell 
      title="Active Rooms" 
      description="System operational // 1,402 clusters active"
      actions={actions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-outline-variant/20">
        {rooms.length === 0 ? (
          <div className="col-span-full py-20 border-r border-b border-outline-variant/20 flex flex-col items-center justify-center text-center bg-surface-container-low/50">
            <div className="w-24 h-24 mb-6 opacity-20 grayscale grayscale-100">
               <Image
                 src="/no-data_.svg"
                 alt="No rooms found"
                 width={200}
                 height={200}
               />
            </div>
            <p className="font-headline text-on-surface-variant uppercase tracking-widest text-sm">No Active Nodes Found</p>
            <p className="text-outline text-xs mt-2">Initialize a new room to start collaborating</p>
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
