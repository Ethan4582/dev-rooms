import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { unstable_noStore } from "next/cache";
import { getRoom } from "@/data-access/room";
import TagList from "@/components/tag-list";
import { DevfinderVideo } from "./video-player";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RoomPage(props: { params: Promise<{ roomid: string }> }) {
  unstable_noStore();
  const session = await getServerSession(authOptions);
  
  const { roomid } = await props.params;

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/rooms/${roomid}`);
  }

  const room = await getRoom(roomid);

  if (!room) return <div>No room of this ID found</div>;

  const roomData = room as any;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0e0e0e]">
      <DevfinderVideo room={roomData} />
    </div>
  );
}


