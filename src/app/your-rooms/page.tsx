import { getUserRooms } from "@/data-access/room";
import { unstable_noStore } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { YourRoomsList } from "./YourRoomsList";
import { DashboardShell } from "@/components/DashboardShell";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function YourRoomPage() {
  unstable_noStore(); 

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect(`/api/auth/signin?callbackUrl=/your-rooms`);
  }

  const rooms = await getUserRooms(); 
  
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
      title="User Repositories" 
      description={`User: ${session.user.name} // ${rooms.length} active nodes`}
      actions={actions}
    >
      {rooms.length === 0 ? (
        <div className="py-20 border border-outline-variant/20 flex flex-col items-center justify-center text-center bg-surface-container-low/50">
          <div className="w-24 h-24 mb-6 opacity-20 grayscale grayscale-100">
             <Image
               src="/no-data_.svg"
               alt="No rooms found"
               width={200}
               height={200}
             />
          </div>
          <p className="font-headline text-on-surface-variant uppercase tracking-widest text-sm">Vault Empty</p>
          <p className="text-outline text-xs mt-2">Create your first room to manage your persistent clusters</p>
          <Link 
            href="/create-room"
            className="mt-6 border border-primary/20 hover:bg-primary/5 text-primary px-6 py-2 text-[10px] font-label font-bold uppercase tracking-widest transition-all"
          >
            Create Your First Room
          </Link>
        </div>
      ) : (
        <YourRoomsList rooms={rooms} />
      )}
    </DashboardShell>
  );
}
