import { getRoom } from "@/data-access/room";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ roomid: string }>; 
}) {
  unstable_noStore();
  
  const { roomid } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect(`/api/auth/signin?callbackUrl=/edit-room/${roomid}`);
  }
  
  const room = await getRoom(roomid);
  
  if (!room) {
    return <DashboardShell><div className="p-8">Room not found</div></DashboardShell>;
  }
 
  if (room.userId !== session.user.id) {
    return redirect("/your-rooms");
  }

  return (
    <DashboardShell 
      title="Modify Node" 
      description={`Updating cluster // ID: ${roomid}`}
    >
      <div className="max-w-2xl mx-auto">
        <Card className="bg-surface-dim border-outline-variant/30 shadow-2xl shadow-primary/5">
          <CardHeader className="border-b border-outline-variant/10 pb-6">
            <CardTitle className="font-headline text-2xl font-bold tracking-tighter uppercase text-primary">
              System Configuration
            </CardTitle>
            <CardDescription className="font-label text-xs uppercase tracking-widest text-outline">
              Adjusting parameters for existing collaboration thread
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <EditRoomForm room={room} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}